import type { GameState } from "../engine/game.js";
import {
  STATS_SCHEMA_VERSION,
  type GameRecord,
  type OptionStat,
  type StageStat,
  type Stats,
} from "./stats.js";

/** A fresh, empty stats aggregate. */
export function emptyStats(): Stats {
  return {
    schemaVersion: STATS_SCHEMA_VERSION,
    gamesPlayed: 0,
    gamesWon: 0,
    perStage: {},
  };
}

/** Tally per-option seen/correct from a finished game's answers. */
function tallyOptions(state: GameState): OptionStat[] {
  const byOption = new Map<string, OptionStat>();
  for (const answer of state.answers) {
    const prev = byOption.get(answer.optionId) ?? {
      optionId: answer.optionId,
      seen: 0,
      correct: 0,
    };
    byOption.set(answer.optionId, {
      optionId: answer.optionId,
      seen: prev.seen + 1,
      correct: prev.correct + (answer.correct ? 1 : 0),
    });
  }
  return Array.from(byOption.values()).sort((a, b) => a.optionId.localeCompare(b.optionId, "en"));
}

/** Summarize a finished game into a history record. `now` is epoch milliseconds. */
export function toGameRecord(state: GameState, now: number): GameRecord {
  return {
    id: `${now.toString(36)}-${(state.config.seed >>> 0).toString(36)}`,
    stageId: state.config.stageId,
    finishedAt: new Date(now).toISOString(),
    status: state.status === "won" ? "won" : "lost",
    correct: state.correct,
    mistakes: state.mistakes,
    total: state.config.totalQuestions,
    seed: state.config.seed,
    options: tallyOptions(state),
  };
}

/** Fold one game record into the aggregate stats, returning a new Stats. */
export function recordGame(stats: Stats, record: GameRecord): Stats {
  const won = record.status === "won";
  const prevStage: StageStat = stats.perStage[record.stageId] ?? {
    played: 0,
    won: 0,
    bestCorrect: 0,
    bestGameId: null,
    lastPlayedAt: record.finishedAt,
    options: {},
  };

  const options: Record<string, OptionStat> = { ...prevStage.options };
  for (const result of record.options) {
    const prev = options[result.optionId] ?? { optionId: result.optionId, seen: 0, correct: 0 };
    options[result.optionId] = {
      optionId: result.optionId,
      seen: prev.seen + result.seen,
      correct: prev.correct + result.correct,
    };
  }

  const isBest = record.correct > prevStage.bestCorrect;
  const perStage: Record<string, StageStat> = {
    ...stats.perStage,
    [record.stageId]: {
      played: prevStage.played + 1,
      won: prevStage.won + (won ? 1 : 0),
      bestCorrect: Math.max(prevStage.bestCorrect, record.correct),
      bestGameId: isBest ? record.id : prevStage.bestGameId,
      lastPlayedAt: record.finishedAt,
      options,
    },
  };

  return {
    schemaVersion: STATS_SCHEMA_VERSION,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (won ? 1 : 0),
    perStage,
  };
}

/** Rebuild the aggregate stats from the full history (the source of truth). */
export function rebuildStats(records: Iterable<GameRecord>): Stats {
  let stats = emptyStats();
  for (const record of records) stats = recordGame(stats, record);
  return stats;
}

/** Minimum times an option must be seen before it ranks as strong/weak. */
export const MIN_SEEN = 1;

/** A stage option ranked by accuracy, for the strong/weak lists. */
export interface RankedOption extends OptionStat {
  accuracy: number;
}

function rankedOptions(stage: StageStat): RankedOption[] {
  return Object.values(stage.options)
    .filter((option) => option.seen >= MIN_SEEN)
    .map((option) => ({ ...option, accuracy: option.correct / option.seen }));
}

/** A stage's top `n` options by accuracy (ties broken by most-seen). */
export function strongOptions(stage: StageStat, n: number): RankedOption[] {
  return rankedOptions(stage)
    .sort((a, b) => b.accuracy - a.accuracy || b.seen - a.seen)
    .slice(0, n);
}

/**
 * A stage's bottom `n` options by accuracy (ties broken by most-seen). Options
 * answered perfectly (100% accuracy) are excluded — they don't need work.
 */
export function weakOptions(stage: StageStat, n: number): RankedOption[] {
  return rankedOptions(stage)
    .filter((option) => option.accuracy < 1)
    .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen)
    .slice(0, n);
}
