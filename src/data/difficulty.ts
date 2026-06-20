/** Gameplay difficulty of a language, 1 (easy to recognize) – 5 (expert). */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** Difficulty used for languages without an explicit editorial rating. */
const DEFAULT_DIFFICULTY: Difficulty = 3;

/**
 * Editorial per-language difficulty, keyed by ISO 639-3 (the logical language).
 * Kept here so a language shared across stages carries a consistent rating.
 * Languages absent from this map fall back to {@link DEFAULT_DIFFICULTY}.
 */
const LANGUAGE_DIFFICULTY: ReadonlyMap<string, Difficulty> = new Map([
  // Globally familiar, distinctive scripts or very common languages.
  ["eng", 1],
  ["spa", 1],
  ["fra", 2],
  ["deu", 2],
  ["rus", 2],
  ["jpn", 2],
  ["arb", 2],
  ["hin", 2],
  ["cmn", 2],
  ["kor", 2],
  ["ell", 2],
  // Distinctive scripts, less ubiquitous.
  ["heb", 3],
  ["tha", 3],
  ["hye", 3],
  ["kat", 3],
  ["amh", 3],
  // Latin-script European languages — harder to tell apart.
  ["ita", 2],
  ["por", 3],
  ["nld", 3],
  ["swe", 3],
  ["pol", 3],
  ["ces", 4],
  ["ron", 3],
  ["hrv", 4],
  ["srp", 3],
  ["tur", 3],
  ["hun", 4],
  ["lit", 4],
  ["est", 4],
  ["cym", 4],
  // Southeast Asian abugidas.
  ["vie", 3],
  ["lao", 4],
  ["khm", 4],
  ["mya", 4],
]);

/** The gameplay difficulty for a logical language (by ISO 639-3 code). */
export function difficultyFor(langId: string): Difficulty {
  return LANGUAGE_DIFFICULTY.get(langId) ?? DEFAULT_DIFFICULTY;
}
