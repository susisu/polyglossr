/**
 * Build-time data pipeline: turn the `udhr` package (UDHR translations) into the
 * committed dataset the app consumes at runtime.
 *
 * Input  : `udhr` metadata array + `declaration/${code}.html` text files.
 * Output : `data/languages.generated.json` (the dataset) and
 *          `data/manifest.generated.json` (kept/dropped entries + warnings).
 *
 * The runtime never touches `udhr` or HTML — it imports the generated JSON only.
 * Output is deterministic (no timestamps, stable ordering) so `generate:check`
 * can diff it in CI.
 *
 * Run with `pnpm generate`.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { fromHtml } from "hast-util-from-html";
import { toText } from "hast-util-to-text";
import type { Element, ElementContent, RootContent } from "hast";
import { udhr } from "udhr";

/** Schema version of the emitted dataset; bump when the shape changes. */
const SCHEMA_VERSION = 1;
/** Minimum udhr encoding stage (1–5) to include; lower stages are poorly encoded. */
const MIN_STAGE = 3;
/** A language needs at least this many snippets to be usable (30-question no-repeat). */
const MIN_SNIPPETS = 6;
/** Cap snippets per language to keep the dataset small. */
const MAX_SNIPPETS = 20;
/**
 * Codes to drop manually — a curated, by-name list (no general pattern).
 * Multiple sources per iso6393 are otherwise fine (the logical-language model
 * groups them); these are specific variants we don't want to present:
 * - `mal_chillus`: alternate Malayalam orthography (keep plain `mal`).
 * - `ven2`: a second copy of Venda (keep `ven`).
 * - `deu_1901`: pre-reform German orthography (keep modern `deu_1996`).
 * - `ell_polytonic`: historical polytonic Greek (keep modern `ell_monotonic`).
 */
const MANUAL_EXCLUDE = new Set<string>(["mal_chillus", "ven2", "deu_1901", "ell_polytonic"]);

/** Segmentation knobs per script class, calibrated so reading effort ≈ 10–20 words. */
type ScriptClass = "cjk" | "abugida" | "spaced";
interface SegConfig {
  unit: "grapheme" | "word";
  min: number;
  target: number;
}
const SEG: Record<ScriptClass, SegConfig> = {
  // Logographic / syllabic (Han, kana, Tibetan): ~1 char per word-ish unit.
  cjk: { unit: "grapheme", min: 16, target: 24 },
  // Spaceless alphabets (Thai, Lao, Khmer, Myanmar): several graphemes per word.
  abugida: { unit: "grapheme", min: 32, target: 48 },
  // Space-delimited scripts: count words directly.
  spaced: { unit: "word", min: 10, target: 14 },
};

/** Emitted dataset entry (one udhr code = one language × script). */
interface GeneratedSource {
  code: string;
  iso6393: string;
  name: string;
  baseName: string;
  scriptLabel: string | null;
  bcp47: string;
  direction: "ltr" | "rtl";
  encodingStage: 1 | 2 | 3 | 4 | 5;
  snippets: string[];
}

/** Resolve the on-disk `declaration/` directory of the installed `udhr` package. */
function resolveDeclarationDir(): string {
  const require = createRequire(import.meta.url);
  // udhr's exports map blocks `udhr/package.json`, so resolve the main entry
  // (`index.js`) and walk up to the package root.
  const indexPath = require.resolve("udhr");
  return join(dirname(indexPath), "declaration");
}

/** Collapse whitespace and NFC-normalize a text run. */
function normalizeText(text: string): string {
  return text.replace(/\s+/gu, " ").trim().normalize("NFC");
}

/** Visit every `<p>` element under the given hast nodes (without recursing into `<p>`). */
function eachParagraph(
  nodes: ReadonlyArray<RootContent | ElementContent>,
  visit: (p: Element) => void,
): void {
  for (const node of nodes) {
    if (node.type !== "element") continue;
    if (node.tagName === "p") {
      visit(node);
    } else {
      eachParagraph(node.children, visit);
    }
  }
}

/** Extract the normalized paragraph texts (preamble + articles) from a declaration HTML. */
function extractParagraphs(html: string): string[] {
  const tree = fromHtml(html, { fragment: false });
  const paragraphs: string[] = [];
  eachParagraph(tree.children, (p) => {
    const text = normalizeText(toText(p));
    if (text.length > 0) paragraphs.push(text);
  });
  return paragraphs;
}

const CJK_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x3000, 0x30ff], // CJK symbols/punctuation, Hiragana, Katakana
  [0x3400, 0x4dbf], // CJK Extension A
  [0x4e00, 0x9fff], // CJK Unified Ideographs
  [0xf900, 0xfaff], // CJK Compatibility Ideographs
  [0x0f00, 0x0fff], // Tibetan (tsheg-delimited syllables)
];
const ABUGIDA_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0e00, 0x0e7f], // Thai
  [0x0e80, 0x0eff], // Lao
  [0x1000, 0x109f], // Myanmar
  [0x1200, 0x139f], // Ethiopic (Ge'ez) — syllabic, often uses the ፡ wordspace, not ASCII spaces
  [0x1780, 0x17ff], // Khmer
];

function inRanges(cp: number, ranges: ReadonlyArray<readonly [number, number]>): boolean {
  return ranges.some(([lo, hi]) => cp >= lo && cp <= hi);
}

/** Classify a language's script from a sample of its text, to pick a segmentation mode. */
function detectScriptClass(sample: string): ScriptClass {
  let cjk = 0;
  let abugida = 0;
  let total = 0;
  for (const ch of sample) {
    if (/\s/u.test(ch)) continue;
    const cp = ch.codePointAt(0);
    if (cp === undefined) continue;
    total += 1;
    if (inRanges(cp, CJK_RANGES)) cjk += 1;
    else if (inRanges(cp, ABUGIDA_RANGES)) abugida += 1;
  }
  if (total === 0) return "spaced";
  if (cjk / total > 0.3) return "cjk";
  if (abugida / total > 0.3) return "abugida";
  return "spaced";
}

/** Cut one paragraph into non-overlapping snippets per the script-class config. */
function cutParagraph(text: string, cls: ScriptClass, locale: string): string[] {
  const cfg = SEG[cls];
  const out: string[] = [];
  if (cfg.unit === "word") {
    const words = text.split(/\s+/u).filter((w) => w.length > 0);
    for (let i = 0; i < words.length; i += cfg.target) {
      const chunk = words.slice(i, i + cfg.target);
      if (chunk.length >= cfg.min) out.push(chunk.join(" "));
    }
  } else {
    const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    const graphemes = Array.from(segmenter.segment(text), (s) => s.segment);
    for (let i = 0; i < graphemes.length; i += cfg.target) {
      const chunk = graphemes.slice(i, i + cfg.target);
      if (chunk.length >= cfg.min) out.push(chunk.join(""));
    }
  }
  return out;
}

/** Build the snippet pool for a language from its paragraphs (deduped, capped). */
function buildSnippets(paragraphs: string[], bcp47: string): string[] {
  const sample = paragraphs.join(" ").slice(0, 2000);
  const cls = detectScriptClass(sample);
  const seen = new Set<string>();
  const snippets: string[] = [];
  for (const paragraph of paragraphs) {
    for (const snippet of cutParagraph(paragraph, cls, bcp47)) {
      if (seen.has(snippet)) continue;
      seen.add(snippet);
      snippets.push(snippet);
      if (snippets.length >= MAX_SNIPPETS) return snippets;
    }
  }
  return snippets;
}

/** Split a udhr `name` into a base language name and an optional script/variant label. */
function splitName(name: string): { baseName: string; scriptLabel: string | null } {
  const match = /^(.*?)\s*\(([^()]*)\)\s*$/u.exec(name);
  if (match?.[1] !== undefined && match[2] !== undefined) {
    return { baseName: match[1].trim(), scriptLabel: match[2].trim() };
  }
  return { baseName: name.trim(), scriptLabel: null };
}

interface DropRecord {
  code: string;
  name: string;
  reason: string;
}

/** udhr entries, after metadata-only filters (cheap, no file I/O yet). */
type Entry = (typeof udhr)[number];

/** Read a declaration file, or null if it's missing. */
async function readDeclaration(dir: string, code: string): Promise<string | null> {
  try {
    return await readFile(join(dir, `${code}.html`), "utf8");
  } catch {
    return null;
  }
}

async function main(): Promise<void> {
  const declarationDir = resolveDeclarationDir();
  const sources: GeneratedSource[] = [];
  const dropped: DropRecord[] = [];

  // Phase 1: metadata-only filtering.
  const candidates: Entry[] = [];
  for (const entry of udhr) {
    if (entry.stage < MIN_STAGE) {
      dropped.push({ code: entry.code, name: entry.name, reason: `stage<${MIN_STAGE}` });
    } else if (entry.iso6393 === "und") {
      dropped.push({ code: entry.code, name: entry.name, reason: "undetermined-iso6393" });
    } else if (entry.direction === "ttb") {
      dropped.push({ code: entry.code, name: entry.name, reason: "ttb-direction" });
    } else if (MANUAL_EXCLUDE.has(entry.code)) {
      dropped.push({ code: entry.code, name: entry.name, reason: "manual-exclude" });
    } else {
      candidates.push(entry);
    }
  }

  // Phase 2: read all surviving declarations in parallel, then segment.
  const declarations = await Promise.all(
    candidates.map(async (entry) => ({
      entry,
      html: await readDeclaration(declarationDir, entry.code),
    })),
  );

  for (const { entry, html } of declarations) {
    if (html === null) {
      dropped.push({ code: entry.code, name: entry.name, reason: "no-declaration-file" });
      continue;
    }
    if (entry.direction === "ttb") continue; // unreachable (filtered above); narrows the type.

    const paragraphs = extractParagraphs(html);
    const snippets = buildSnippets(paragraphs, entry.bcp47);
    if (snippets.length < MIN_SNIPPETS) {
      dropped.push({
        code: entry.code,
        name: entry.name,
        reason: `too-few-snippets(${snippets.length})`,
      });
      continue;
    }

    const { baseName, scriptLabel } = splitName(entry.name);
    sources.push({
      code: entry.code,
      iso6393: entry.iso6393,
      name: entry.name,
      baseName,
      scriptLabel,
      bcp47: entry.bcp47,
      direction: entry.direction,
      encodingStage: entry.stage,
      snippets,
    });
  }

  sources.sort((a, b) => a.code.localeCompare(b.code, "en"));

  // Warn on base-name disagreements within an iso6393 group, and on same-script collisions.
  const warnings: string[] = [];
  const byIso = new Map<string, GeneratedSource[]>();
  for (const source of sources) {
    const group = byIso.get(source.iso6393) ?? [];
    group.push(source);
    byIso.set(source.iso6393, group);
  }
  for (const [iso, group] of byIso) {
    const baseNames = new Set(group.map((s) => s.baseName));
    if (baseNames.size > 1) {
      warnings.push(`iso6393 ${iso}: differing baseNames ${[...baseNames].join(" | ")}`);
    }
    const scripts = group.map((s) => s.scriptLabel ?? "—");
    const dupScript = scripts.find((s, i) => scripts.indexOf(s) !== i);
    if (dupScript !== undefined) {
      warnings.push(`iso6393 ${iso}: multiple sources share scriptLabel "${dupScript}"`);
    }
  }

  const dataset = {
    schemaVersion: SCHEMA_VERSION,
    udhrVersion: "6.0.0",
    sources,
  };
  const manifest = {
    schemaVersion: SCHEMA_VERSION,
    keptCount: sources.length,
    droppedCount: dropped.length,
    kept: sources.map((s) => ({
      code: s.code,
      iso6393: s.iso6393,
      name: s.name,
      baseName: s.baseName,
      scriptLabel: s.scriptLabel,
      direction: s.direction,
      encodingStage: s.encodingStage,
      snippetCount: s.snippets.length,
    })),
    dropped: dropped.sort((a, b) => a.code.localeCompare(b.code, "en")),
    warnings,
  };

  const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "data");
  await mkdir(outDir, { recursive: true });
  await writeFile(
    join(outDir, "languages.generated.json"),
    JSON.stringify(dataset, null, 2) + "\n",
    "utf8",
  );
  await writeFile(
    join(outDir, "manifest.generated.json"),
    JSON.stringify(manifest, null, 2) + "\n",
    "utf8",
  );

  const isoCount = byIso.size;
  process.stdout.write(
    `Generated ${String(sources.length)} sources (${String(isoCount)} logical languages), `
      + `dropped ${String(dropped.length)}, ${String(warnings.length)} warnings.\n`,
  );
}

await main();
