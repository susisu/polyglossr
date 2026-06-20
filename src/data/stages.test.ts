import { describe, expect, it } from "vitest";
import { dataset } from "./dataset.js";
import { REGION_ORDER } from "./region.js";
import { STAGES } from "./stages.js";

describe("stages", () => {
  it("has unique ids", () => {
    const ids = STAGES.map((stage) => stage.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("references only existing source codes", () => {
    for (const stage of STAGES) {
      for (const option of stage.options) {
        for (const code of option.sourceCodes) {
          expect(dataset.sources.has(code), `${stage.id}: ${code}`).toBe(true);
        }
      }
    }
  });

  it("has unique option ids within each stage", () => {
    for (const stage of STAGES) {
      const ids = stage.options.map((option) => option.id);
      expect(new Set(ids).size, stage.id).toBe(ids.length);
    }
  });

  it("tags every stage with at least one known region", () => {
    for (const stage of STAGES) {
      expect(stage.regions.length, stage.id).toBeGreaterThan(0);
      for (const region of stage.regions) {
        expect(REGION_ORDER, stage.id).toContain(region);
      }
    }
  });

  it("never combines the world region with a geographic one", () => {
    for (const stage of STAGES) {
      if (stage.regions.includes("world")) {
        expect(stage.regions, stage.id).toEqual(["world"]);
      }
    }
  });

  it("labels any option that spans multiple logical languages", () => {
    // Without a label an option is named by its single language; one spanning
    // several languages (a script/family) would have no well-defined name.
    for (const stage of STAGES) {
      for (const option of stage.options) {
        const langIds = new Set(
          option.sourceCodes
            .map((code) => dataset.sources.get(code)?.langId)
            .filter((id): id is string => id !== undefined),
        );
        if (langIds.size > 1) {
          expect(option.label, `${stage.id}: ${option.id}`).toBeDefined();
        }
      }
    }
  });
});
