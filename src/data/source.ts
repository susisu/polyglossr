/** Writing direction of a text source. udhr contains no `ttb` entries. */
export type Direction = "ltr" | "rtl";

/**
 * A single text source = one udhr `code` = one (language × script/variant).
 * Supplies snippets, rendering direction, and the display metadata used when
 * reviewing a finished game. The answer the player gives is keyed on `langId`
 * (the logical language), not on `code`.
 */
export interface SourceEntry {
  /** udhr code; unique per source, the snippet-pool key. */
  code: string;
  /** ISO 639-3 code = the logical language this source belongs to. */
  langId: string;
  /** Full udhr name, e.g. "Serbian (Cyrillic)" — shown in the post-game review. */
  name: string;
  /** Base language name with the script/variant suffix stripped, e.g. "Serbian". */
  baseName: string;
  /** Script/variant label parsed from the name, e.g. "Cyrillic"; null if none. */
  scriptLabel: string | null;
  /** BCP 47 tag, used for the `lang` attribute when rendering snippets. */
  bcp47: string;
  /** Rendering direction. */
  direction: Direction;
}

/** Snippet pools keyed by source `code`. */
export type SnippetPool = ReadonlyMap<string, readonly string[]>;
