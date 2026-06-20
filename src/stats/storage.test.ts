import { IDBFactory } from "fake-indexeddb";
import { describe, expect, it } from "vitest";
import type { AnswerRecord, GameState } from "../engine/game.js";
import { rebuildStats } from "./aggregate.js";
import { createStatsStore, type StatsStore } from "./storage.js";

function finishedGame(stageId: string, seed: number, correct: number): GameState {
  const answers: AnswerRecord[] = Array.from({ length: 5 }, (_, i) => ({
    questionIndex: i,
    sourceCode: "eng-s",
    optionId: "eng",
    pickedOptionId: i < correct ? "eng" : "zzz",
    correct: i < correct,
  }));
  return {
    config: { stageId, totalQuestions: 5, maxMistakes: 3, seed },
    status: "won",
    questions: [],
    current: 5,
    answers,
    mistakes: 5 - correct,
    correct,
  };
}

describe("IndexedDbStatsStore", () => {
  it("round-trips a recorded game into stats and history", async () => {
    const store = await createStatsStore(new IDBFactory());
    const { stats } = await store.record(finishedGame("first-steps", 1, 4), 1000);

    expect(stats.gamesPlayed).toBe(1);
    expect(stats.perStage["first-steps"]?.bestCorrect).toBe(4);

    const history = await store.loadHistory();
    expect(history).toHaveLength(1);
    expect(history[0]?.stageId).toBe("first-steps");
  });

  it("orders history newest-first", async () => {
    const store = await createStatsStore(new IDBFactory());
    await store.record(finishedGame("s", 1, 1), 1000);
    await store.record(finishedGame("s", 2, 2), 2000);
    const history = await store.loadHistory();
    expect(history.map((r) => r.seed)).toEqual([2, 1]);
  });

  it("persists across store instances on the same database", async () => {
    const factory = new IDBFactory();
    const first = await createStatsStore(factory);
    await first.record(finishedGame("s", 1, 3), 1000);

    const second = await createStatsStore(factory);
    const stats = await second.loadStats();
    expect(stats.gamesPlayed).toBe(1);
  });

  it("keeps the stats cache consistent with a rebuild from history", async () => {
    const store: StatsStore = await createStatsStore(new IDBFactory());
    await store.record(finishedGame("a", 1, 5), 1000);
    await store.record(finishedGame("b", 2, 2), 2000);

    const cached = await store.loadStats();
    const rebuilt = rebuildStats(await store.loadHistory());
    expect(cached).toEqual(rebuilt);
  });
});
