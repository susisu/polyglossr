/** Schema version of persisted stats/history; bump when shapes change. */
export const STATS_SCHEMA_VERSION = 2;

/**
 * Aggregate performance for one stage option (seen/correct). Scoped to its
 * stage, since identification difficulty depends on the stage's other options.
 */
export interface OptionStat {
  optionId: string;
  seen: number;
  correct: number;
}

/** Aggregate performance for one stage, including its best result and per-option tally. */
export interface StageStat {
  played: number;
  won: number;
  /** Highest correct-count achieved on this stage. */
  bestCorrect: number;
  /** Id of the game that set {@link StageStat.bestCorrect}, or null. */
  bestGameId: string | null;
  lastPlayedAt: string;
  /** Per-option seen/correct within this stage, keyed by option id. */
  options: Record<string, OptionStat>;
}

/** Derived aggregate stats. Rebuildable from the game history (the source of truth). */
export interface Stats {
  schemaVersion: number;
  gamesPlayed: number;
  gamesWon: number;
  perStage: Record<string, StageStat>;
}

/** A finished game, the append-only unit of history. */
export interface GameRecord {
  /** Unique, sortable id derived from finish time + seed. */
  id: string;
  stageId: string;
  /** ISO timestamp when the game finished. */
  finishedAt: string;
  status: "won" | "lost";
  correct: number;
  mistakes: number;
  total: number;
  seed: number;
  /** Per-option results within this game (seen/correct), for rebuilding stats. */
  options: readonly OptionStat[];
}
