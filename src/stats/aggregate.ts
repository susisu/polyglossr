import type { GameState } from "../engine/game.js";
import {
  STATS_SCHEMA_VERSION,
  type GameLanguageResult,
  type GameRecord,
  type LanguageStat,
  type StageStat,
  type Stats,
} from "./stats.js";

/** Minimum times a language must be seen before it ranks as strong/weak. */
export const MIN_SEEN = 3;

/** A fresh, empty stats aggregate. */
export function emptyStats(): Stats {
  return {
    schemaVersion: STATS_SCHEMA_VERSION,
    gamesPlayed: 0,
    gamesWon: 0,
    perLanguage: {},
    perStage: {},
  };
}

/** Tally per-language seen/correct from a finished game's answers. */
function tallyLanguages(state: GameState): GameLanguageResult[] {
  const byLang = new Map<string, GameLanguageResult>();
  for (const answer of state.answers) {
    const prev = byLang.get(answer.answerLangId) ?? {
      langId: answer.answerLangId,
      seen: 0,
      correct: 0,
    };
    byLang.set(answer.answerLangId, {
      langId: answer.answerLangId,
      seen: prev.seen + 1,
      correct: prev.correct + (answer.correct ? 1 : 0),
    });
  }
  return Array.from(byLang.values()).sort((a, b) => a.langId.localeCompare(b.langId, "en"));
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
    languages: tallyLanguages(state),
  };
}

/** Fold one game record into the aggregate stats, returning a new Stats. */
export function recordGame(stats: Stats, record: GameRecord): Stats {
  const perLanguage: Record<string, LanguageStat> = { ...stats.perLanguage };
  for (const result of record.languages) {
    const prev = perLanguage[result.langId] ?? { langId: result.langId, seen: 0, correct: 0 };
    perLanguage[result.langId] = {
      langId: result.langId,
      seen: prev.seen + result.seen,
      correct: prev.correct + result.correct,
    };
  }

  const won = record.status === "won";
  const prevStage: StageStat = stats.perStage[record.stageId] ?? {
    played: 0,
    won: 0,
    bestCorrect: 0,
    bestGameId: null,
    lastPlayedAt: record.finishedAt,
  };
  const isBest = record.correct > prevStage.bestCorrect;
  const perStage: Record<string, StageStat> = {
    ...stats.perStage,
    [record.stageId]: {
      played: prevStage.played + 1,
      won: prevStage.won + (won ? 1 : 0),
      bestCorrect: Math.max(prevStage.bestCorrect, record.correct),
      bestGameId: isBest ? record.id : prevStage.bestGameId,
      lastPlayedAt: record.finishedAt,
    },
  };

  return {
    schemaVersion: STATS_SCHEMA_VERSION,
    gamesPlayed: stats.gamesPlayed + 1,
    gamesWon: stats.gamesWon + (won ? 1 : 0),
    perLanguage,
    perStage,
  };
}

/** Rebuild the aggregate stats from the full history (the source of truth). */
export function rebuildStats(records: Iterable<GameRecord>): Stats {
  let stats = emptyStats();
  for (const record of records) stats = recordGame(stats, record);
  return stats;
}

/** A language ranked by accuracy, used for strong/weak lists. */
export interface RankedLanguage extends LanguageStat {
  accuracy: number;
}

function ranked(stats: Stats): RankedLanguage[] {
  return Object.values(stats.perLanguage)
    .filter((stat) => stat.seen >= MIN_SEEN)
    .map((stat) => ({ ...stat, accuracy: stat.correct / stat.seen }));
}

/** Top `n` languages by accuracy (ties broken by most-seen). */
export function strongLanguages(stats: Stats, n: number): RankedLanguage[] {
  return ranked(stats)
    .sort((a, b) => b.accuracy - a.accuracy || b.seen - a.seen)
    .slice(0, n);
}

/** Bottom `n` languages by accuracy (ties broken by most-seen). */
export function weakLanguages(stats: Stats, n: number): RankedLanguage[] {
  return ranked(stats)
    .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen)
    .slice(0, n);
}
