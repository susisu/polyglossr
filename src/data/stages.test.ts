import { describe, expect, it } from "vitest";
import { dataset } from "./dataset.js";
import { STAGES } from "./stages.js";

/** A stage needs at least this many distinct logical languages for fair play. */
const MIN_LANGUAGES_PER_STAGE = 5;

describe("stages", () => {
  it("has unique ids", () => {
    const ids = STAGES.map((stage) => stage.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references only existing source codes", () => {
    for (const stage of STAGES) {
      for (const code of stage.sourceCodes) {
        expect(dataset.sources.has(code), `${stage.id}: ${code}`).toBe(true);
      }
    }
  });

  it("has enough distinct logical languages per stage", () => {
    for (const stage of STAGES) {
      const langIds = new Set(stage.sourceCodes.map((code) => dataset.sources.get(code)?.langId));
      expect(langIds.size, stage.id).toBeGreaterThanOrEqual(MIN_LANGUAGES_PER_STAGE);
    }
  });
});
