import { describe, expect, it } from "vitest";
import type { AnswerRecord, GameState } from "../engine/game.js";
import {
  emptyStats,
  rebuildStats,
  recordGame,
  strongLanguages,
  toGameRecord,
  weakLanguages,
} from "./aggregate.js";
import type { Stats } from "./stats.js";

function ans(langId: string, correct: boolean, i: number): AnswerRecord {
  return {
    questionIndex: i,
    sourceCode: `${langId}-s`,
    answerLangId: langId,
    pickedLangId: correct ? langId : "zzz",
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
  it("summarizes a finished game with a per-language tally", () => {
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
    expect(record.languages).toEqual([
      { langId: "eng", seen: 2, correct: 1 },
      { langId: "fra", seen: 1, correct: 1 },
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
    expect(stats.perLanguage["eng"]).toEqual({ langId: "eng", seen: 1, correct: 1 });
    expect(stats.perStage["s"]?.bestCorrect).toBe(1);
    expect(stats.perStage["s"]?.bestGameId).toBe(record.id);
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
    expect(stats.perLanguage["eng"]).toEqual({ langId: "eng", seen: 2, correct: 2 });
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

describe("strongLanguages / weakLanguages", () => {
  const stats: Stats = {
    schemaVersion: 1,
    gamesPlayed: 0,
    gamesWon: 0,
    perLanguage: {
      eng: { langId: "eng", seen: 10, correct: 9 }, // 0.9
      fra: { langId: "fra", seen: 10, correct: 4 }, // 0.4
      deu: { langId: "deu", seen: 5, correct: 3 }, // 0.6
      rus: { langId: "rus", seen: 2, correct: 0 }, // below MIN_SEEN
    },
    perStage: {},
  };

  it("ranks strong by accuracy and ignores under-seen languages", () => {
    const strong = strongLanguages(stats, 3);
    expect(strong.map((s) => s.langId)).toEqual(["eng", "deu", "fra"]);
    expect(strong.some((s) => s.langId === "rus")).toBe(false);
  });

  it("ranks weak by lowest accuracy", () => {
    const weak = weakLanguages(stats, 2);
    expect(weak.map((s) => s.langId)).toEqual(["fra", "deu"]);
  });

  it("excludes perfectly-answered languages from weak", () => {
    const withPerfect: Stats = {
      ...stats,
      perLanguage: {
        ...stats.perLanguage,
        spa: { langId: "spa", seen: 5, correct: 5 }, // 1.0
      },
    };
    const weak = weakLanguages(withPerfect, 5);
    expect(weak.some((s) => s.langId === "spa")).toBe(false);
    // Perfect languages still count as strong.
    const strong = strongLanguages(withPerfect, 1);
    expect(strong.map((s) => s.langId)).toEqual(["spa"]);
  });
});
