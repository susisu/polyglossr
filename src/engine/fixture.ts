import type { SnippetPool, SourceEntry } from "../data/source.js";
import type { Stage } from "../data/stage.js";

/**
 * Small synthetic dataset for engine tests: three logical languages, one of
 * which (Serbian) has two scripts, plus an RTL language. 12 unique draws total.
 */
export function makeFixture(): {
  sources: ReadonlyMap<string, SourceEntry>;
  snippets: SnippetPool;
  stage: Stage;
} {
  const sources = new Map<string, SourceEntry>([
    [
      "en",
      {
        code: "en",
        langId: "eng",
        name: "English",
        baseName: "English",
        scriptLabel: null,
        bcp47: "en",
        direction: "ltr",
      },
    ],
    [
      "sr_c",
      {
        code: "sr_c",
        langId: "srp",
        name: "Serbian (Cyrillic)",
        baseName: "Serbian",
        scriptLabel: "Cyrillic",
        bcp47: "sr-Cyrl",
        direction: "ltr",
      },
    ],
    [
      "sr_l",
      {
        code: "sr_l",
        langId: "srp",
        name: "Serbian (Latin)",
        baseName: "Serbian",
        scriptLabel: "Latin",
        bcp47: "sr-Latn",
        direction: "ltr",
      },
    ],
    [
      "ar",
      {
        code: "ar",
        langId: "arb",
        name: "Arabic",
        baseName: "Arabic",
        scriptLabel: null,
        bcp47: "ar",
        direction: "rtl",
      },
    ],
  ]);
  const snippets = new Map<string, readonly string[]>([
    ["en", ["en1", "en2", "en3", "en4"]],
    ["sr_c", ["src1", "src2"]],
    ["sr_l", ["srl1", "srl2"]],
    ["ar", ["ar1", "ar2", "ar3", "ar4"]],
  ]);
  const stage: Stage = {
    id: "test-stage",
    name: { en: "Test Stage", ja: "テストステージ" },
    description: { en: "", ja: "" },
    category: "language",
    regions: ["world"],
    options: [
      { id: "eng", sourceCodes: ["en"] },
      { id: "srp", sourceCodes: ["sr_c", "sr_l"] },
      { id: "arb", sourceCodes: ["ar"] },
    ],
  };
  return { sources, snippets, stage };
}
