import { describe, expect, it } from "vitest";
import { dataset } from "./dataset.js";
import { STAGES } from "./stages.js";

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
});
