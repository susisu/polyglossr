import { describe, expect, it } from "vitest";
import { makeFixture } from "./fixture.js";
import { generateRun, type Question } from "./question.js";
import type { Stage } from "../data/stage.js";

function runWith(
  overrides: { totalQuestions?: number; seed?: number; stage?: Stage } = {},
): Question[] {
  const { sources, snippets, stage } = makeFixture();
  return generateRun({
    stage: overrides.stage ?? stage,
    sources,
    snippets,
    totalQuestions: overrides.totalQuestions ?? 12,
    seed: overrides.seed ?? 1,
  });
}

function drawKey(q: { sourceCode: string; snippet: string }): string {
  return `${q.sourceCode}::${q.snippet}`;
}

describe("generateRun", () => {
  it("is deterministic for the same seed", () => {
    expect(runWith()).toEqual(runWith());
  });

  it("differs for different seeds", () => {
    expect(runWith({ seed: 1 })).not.toEqual(runWith({ seed: 2 }));
  });

  it("produces exactly totalQuestions questions", () => {
    expect(runWith({ totalQuestions: 8 })).toHaveLength(8);
    expect(runWith({ totalQuestions: 12 })).toHaveLength(12);
  });

  it("indexes questions 0..n-1", () => {
    const run = runWith({ totalQuestions: 10 });
    expect(run.map((q) => q.index)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("does not repeat a (source, snippet) pair until all uniques are shown", () => {
    // 12 unique draws exist; the first 12 questions must all be distinct.
    const run = runWith({ totalQuestions: 12 });
    const keys = run.map(drawKey);
    expect(new Set(keys).size).toBe(12);
  });

  it("falls back to repeats only after exhausting uniques (small stage)", () => {
    const run = runWith({ totalQuestions: 20 });
    expect(run).toHaveLength(20);
    const firstPass = run.slice(0, 12).map(drawKey);
    expect(new Set(firstPass).size).toBe(12);
  });

  it("labels every question with its source's logical language (option id)", () => {
    // In the fixture each option's id is the source's langId.
    const { sources } = makeFixture();
    for (const q of runWith()) {
      expect(sources.get(q.sourceCode)?.langId).toBe(q.optionId);
    }
  });

  it("draws both scripts of a multi-script option under one answer", () => {
    const run = runWith({ totalQuestions: 12 });
    const serbianSources = new Set(
      run.filter((q) => q.optionId === "srp").map((q) => q.sourceCode),
    );
    expect(serbianSources).toEqual(new Set(["sr_c", "sr_l"]));
  });

  it("returns no questions when no source resolves", () => {
    const { sources, snippets } = makeFixture();
    const stage = {
      id: "empty",
      name: { en: "", ja: "" },
      description: { en: "", ja: "" },
      category: "language" as const,
      regions: ["world"] as const,
      difficulty: 1 as const,
      options: [{ id: "missing", sourceCodes: ["missing"] }],
    };
    expect(generateRun({ stage, sources, snippets, totalQuestions: 5, seed: 1 })).toEqual([]);
  });
});
