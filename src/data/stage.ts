import type { Localized } from "../shared/locale.js";
import type { Difficulty } from "./difficulty.js";

/** How a stage's language set is curated. */
export type StageTheme = "region" | "difficulty" | "themed";

/**
 * A curated set of languages to play. Defined by udhr source `code`s; the same
 * logical language may appear under multiple scripts (e.g. Serbian Cyrillic and
 * Latin). The answer candidates are the distinct logical languages among them.
 */
export interface Stage {
  /** Stable slug; used as the stats key. */
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  theme: StageTheme;
  /** Overall difficulty of the stage. */
  difficulty: Difficulty;
  /** udhr source codes that can be drawn for questions. */
  sourceCodes: readonly string[];
}
