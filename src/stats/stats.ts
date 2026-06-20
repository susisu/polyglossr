/** Schema version of persisted stats/history; bump when shapes change. */
export const STATS_SCHEMA_VERSION = 1;

/** Aggregate performance for one logical language (across scripts). */
export interface LanguageStat {
  langId: string;
  seen: number;
  correct: number;
}

/** Aggregate performance for one stage, including its best result. */
export interface StageStat {
  played: number;
  won: number;
  /** Highest correct-count achieved on this stage. */
  bestCorrect: number;
  /** Id of the game that set {@link StageStat.bestCorrect}, or null. */
  bestGameId: string | null;
  lastPlayedAt: string;
}

/** Derived aggregate stats. Rebuildable from the game history (the source of truth). */
export interface Stats {
  schemaVersion: number;
  gamesPlayed: number;
  gamesWon: number;
  perLanguage: Record<string, LanguageStat>;
  perStage: Record<string, StageStat>;
}

/** Per-language tally for a single game, stored on the record so stats rebuild. */
export interface GameLanguageResult {
  langId: string;
  seen: number;
  correct: number;
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
  /** Per-language results within this game (seen/correct), for rebuilding stats. */
  languages: readonly GameLanguageResult[];
}
