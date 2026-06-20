import * as v from "valibot";
import rawData from "../../data/languages.generated.json" with { type: "json" };
import { buildLanguages, type Language } from "./language.js";
import type { SnippetPool, SourceEntry } from "./source.js";

/** Schema for one generated source row. Unknown keys (e.g. encodingStage) are ignored. */
const SourceSchema = v.object({
  code: v.string(),
  iso6393: v.string(),
  name: v.string(),
  baseName: v.string(),
  scriptLabel: v.nullable(v.string()),
  bcp47: v.string(),
  direction: v.union([v.literal("ltr"), v.literal("rtl")]),
  snippets: v.array(v.string()),
});

/** Schema for the whole generated dataset file. */
const DatasetSchema = v.object({
  schemaVersion: v.number(),
  udhrVersion: v.string(),
  sources: v.array(SourceSchema),
});

/** The runtime view of the generated dataset. */
export interface Dataset {
  /** Source entries by udhr `code`. */
  readonly sources: ReadonlyMap<string, SourceEntry>;
  /** Snippet pools by udhr `code`. */
  readonly snippets: SnippetPool;
  /** Logical languages by ISO 639-3 id. */
  readonly languages: ReadonlyMap<string, Language>;
}

function buildDataset(): Dataset {
  const parsed = v.parse(DatasetSchema, rawData);
  const sources = new Map<string, SourceEntry>();
  const snippets = new Map<string, readonly string[]>();
  for (const row of parsed.sources) {
    sources.set(row.code, {
      code: row.code,
      langId: row.iso6393,
      name: row.name,
      baseName: row.baseName,
      scriptLabel: row.scriptLabel,
      bcp47: row.bcp47,
      direction: row.direction,
    });
    snippets.set(row.code, row.snippets);
  }
  return { sources, snippets, languages: buildLanguages(sources.values()) };
}

/** The loaded, validated dataset. Built once at module load. */
export const dataset: Dataset = buildDataset();
