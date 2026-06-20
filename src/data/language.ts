import { difficultyFor, type Difficulty } from "./difficulty.js";
import type { SourceEntry } from "./source.js";

/**
 * A logical language = the answer unit of the game. One language groups all its
 * text sources (scripts/variants) under a single ISO 639-3 id, so guessing
 * "Serbian" is correct whether the snippet was Cyrillic or Latin.
 */
export interface Language {
  /** ISO 639-3 code. The answer/stats key. */
  id: string;
  /** Base display name, e.g. "Serbian". */
  name: string;
  /** Gameplay difficulty. */
  difficulty: Difficulty;
  /** The udhr source codes that belong to this language (one per script/variant). */
  sourceCodes: readonly string[];
}

/** Group source entries into logical languages, keyed by ISO 639-3 id. */
export function buildLanguages(sources: Iterable<SourceEntry>): Map<string, Language> {
  const groups = new Map<string, SourceEntry[]>();
  for (const source of sources) {
    const group = groups.get(source.langId) ?? [];
    group.push(source);
    groups.set(source.langId, group);
  }

  const languages = new Map<string, Language>();
  for (const [id, group] of groups) {
    languages.set(id, {
      id,
      // Sources of one language agree on baseName (generate-time warnings flag any
      // mismatch); take the first deterministically.
      name: group[0]?.baseName ?? id,
      difficulty: difficultyFor(id),
      sourceCodes: group.map((source) => source.code),
    });
  }
  return languages;
}
