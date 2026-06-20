import { describe, expect, it } from "vitest";
import { dataset } from "./dataset.js";

/** Mirrors MIN_SNIPPETS in scripts/generate-data.ts. */
const MIN_SNIPPETS = 6;

describe("dataset", () => {
  it("loads and validates a non-empty dataset", () => {
    expect(dataset.sources.size).toBeGreaterThan(0);
    expect(dataset.languages.size).toBeGreaterThan(0);
  });

  it("gives every source a snippet pool of at least MIN_SNIPPETS", () => {
    for (const [code] of dataset.sources) {
      const snippets = dataset.snippets.get(code) ?? [];
      expect(snippets.length, code).toBeGreaterThanOrEqual(MIN_SNIPPETS);
    }
  });

  it("groups every language onto sources that share its id", () => {
    for (const language of dataset.languages.values()) {
      expect(language.sourceCodes.length, language.id).toBeGreaterThan(0);
      for (const code of language.sourceCodes) {
        expect(dataset.sources.get(code)?.langId, code).toBe(language.id);
      }
    }
  });

  it("maps Serbian's two scripts onto one logical language", () => {
    const serbian = dataset.languages.get("srp");
    expect(serbian?.sourceCodes).toEqual(expect.arrayContaining(["srp_cyrl", "srp_latn"]));
  });
});
