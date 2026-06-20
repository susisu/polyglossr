import * as v from "valibot";

/** Valibot schema for a persisted {@link import("./stats.js").Stats} blob. */
export const StatsSchema = v.object({
  schemaVersion: v.number(),
  gamesPlayed: v.number(),
  gamesWon: v.number(),
  perLanguage: v.record(
    v.string(),
    v.object({ langId: v.string(), seen: v.number(), correct: v.number() }),
  ),
  perStage: v.record(
    v.string(),
    v.object({
      played: v.number(),
      won: v.number(),
      bestCorrect: v.number(),
      bestGameId: v.nullable(v.string()),
      lastPlayedAt: v.string(),
    }),
  ),
});

/** Valibot schema for a persisted {@link import("./stats.js").GameRecord}. */
export const GameRecordSchema = v.object({
  id: v.string(),
  stageId: v.string(),
  finishedAt: v.string(),
  status: v.union([v.literal("won"), v.literal("lost")]),
  correct: v.number(),
  mistakes: v.number(),
  total: v.number(),
  seed: v.number(),
  languages: v.array(v.object({ langId: v.string(), seen: v.number(), correct: v.number() })),
});
