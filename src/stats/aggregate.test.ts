import { describe, expect, it } from "vitest";
import type { AnswerRecord, GameState } from "../engine/game.js";
import { emptyStats, rebuildStats, recordGame, toGameRecord } from "./aggregate.js";

function ans(optionId: string, correct: boolean, i: number): AnswerRecord {
  return {
    questionIndex: i,
    sourceCode: `${optionId}-s`,
    optionId,
    pickedOptionId: correct ? optionId : "zzz",
    correct,
  };
}

function finished(opts: {
  stageId: string;
  seed: number;
  total: number;
  status: "won" | "lost";
  answers: AnswerRecord[];
}): GameState {
  const correct = opts.answers.filter((a) => a.correct).length;
  return {
    config: { stageId: opts.stageId, totalQuestions: opts.total, maxMistakes: 3, seed: opts.seed },
    status: opts.status,
    questions: [],
    current: opts.answers.length,
    answers: opts.answers,
    mistakes: opts.answers.length - correct,
    correct,
  };
}

describe("toGameRecord", () => {
  it("summarizes a finished game with a per-option tally", () => {
    const state = finished({
      stageId: "first-steps",
      seed: 42,
      total: 30,
      status: "won",
      answers: [ans("eng", true, 0), ans("eng", false, 1), ans("fra", true, 2)],
    });
    const record = toGameRecord(state, 1_700_000_000_000);

    expect(record.stageId).toBe("first-steps");
    expect(record.status).toBe("won");
    expect(record.correct).toBe(2);
    expect(record.mistakes).toBe(1);
    expect(record.total).toBe(30);
    expect(record.finishedAt).toBe(new Date(1_700_000_000_000).toISOString());
    expect(record.options).toEqual([
      { optionId: "eng", seen: 2, correct: 1 },
      { optionId: "fra", seen: 1, correct: 1 },
    ]);
  });
});

describe("recordGame", () => {
  it("folds a record into empty stats", () => {
    const record = toGameRecord(
      finished({
        stageId: "s",
        seed: 1,
        total: 30,
        status: "won",
        answers: [ans("eng", true, 0), ans("fra", false, 1)],
      }),
      1000,
    );
    const stats = recordGame(emptyStats(), record);

    expect(stats.gamesPlayed).toBe(1);
    expect(stats.gamesWon).toBe(1);
    expect(stats.perStage["s"]?.bestCorrect).toBe(1);
    expect(stats.perStage["s"]?.bestGameId).toBe(record.id);
    expect(stats.perStage["s"]?.options["eng"]).toEqual({ optionId: "eng", seen: 1, correct: 1 });
    expect(stats.perStage["s"]?.options["fra"]).toEqual({ optionId: "fra", seen: 1, correct: 0 });
  });

  it("scopes per-option stats to their stage", () => {
    const easy = toGameRecord(
      finished({
        stageId: "easy",
        seed: 1,
        total: 30,
        status: "won",
        answers: [ans("spa", true, 0), ans("spa", true, 1)],
      }),
      1000,
    );
    const hard = toGameRecord(
      finished({
        stageId: "hard",
        seed: 2,
        total: 30,
        status: "lost",
        answers: [ans("spa", false, 0), ans("spa", true, 1)],
      }),
      2000,
    );
    const stats = recordGame(recordGame(emptyStats(), easy), hard);

    // Spanish is tracked separately per stage (different confusion sets).
    expect(stats.perStage["easy"]?.options["spa"]).toEqual({
      optionId: "spa",
      seen: 2,
      correct: 2,
    });
    expect(stats.perStage["hard"]?.options["spa"]).toEqual({
      optionId: "spa",
      seen: 2,
      correct: 1,
    });
  });

  it("keeps the best result and updates bestGameId only on improvement", () => {
    const low = toGameRecord(
      finished({
        stageId: "s",
        seed: 1,
        total: 30,
        status: "lost",
        answers: [ans("eng", true, 0)],
      }),
      1000,
    );
    const high = toGameRecord(
      finished({
        stageId: "s",
        seed: 2,
        total: 30,
        status: "won",
        answers: [ans("eng", true, 0), ans("fra", true, 1)],
      }),
      2000,
    );
    const stats = recordGame(recordGame(emptyStats(), low), high);

    expect(stats.gamesPlayed).toBe(2);
    expect(stats.perStage["s"]?.bestCorrect).toBe(2);
    expect(stats.perStage["s"]?.bestGameId).toBe(high.id);
    expect(stats.perStage["s"]?.options["eng"]).toEqual({ optionId: "eng", seen: 2, correct: 2 });
  });

  it("rebuildStats equals folding the records one by one", () => {
    const records = [
      toGameRecord(
        finished({
          stageId: "s",
          seed: 1,
          total: 30,
          status: "won",
          answers: [ans("eng", true, 0)],
        }),
        1000,
      ),
      toGameRecord(
        finished({
          stageId: "s",
          seed: 2,
          total: 30,
          status: "lost",
          answers: [ans("fra", false, 0)],
        }),
        2000,
      ),
    ];
    const folded = records.reduce(recordGame, emptyStats());
    expect(rebuildStats(records)).toEqual(folded);
  });
});
