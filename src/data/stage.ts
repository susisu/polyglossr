import type { Localized } from "../shared/locale.js";
import type { Difficulty } from "./difficulty.js";
import type { Region } from "./region.js";

/**
 * What a stage's *options* are made of — describes the answers, not the stage's
 * editorial theme. `"language"`: each option is one logical language (this
 * covers family-themed stages like Romance too, since their options are still
 * individual languages). `"family"`: each option is a language family / branch
 * (you name the family — no such stage exists yet). `"script"`: each option is a
 * writing system (the Scripts of the World stage). Orthogonal to
 * {@link Stage.regions}.
 */
export type StageCategory = "language" | "family" | "script";

/**
 * One choice a question can be drawn from. Generating a question first picks an
 * option at random, then picks one of its `sourceCodes`; so every option carries
 * equal weight regardless of how many codes it bundles. Codes that are different
 * scripts/variants of the same logical language are grouped into one option
 * (e.g. Serbian Cyrillic + Latin), which keeps that language weighted as one.
 * Later this is also how a stage groups by writing system or language family.
 */
export interface StageOption {
  /**
   * Answer + stats key. Must be unique among the stage's options and stable
   * across releases. Currently an ISO 639-3 code, since every option is one
   * logical language; script/family options will use their own ids.
   */
  id: string;
  /**
   * Display name and free-text match aliases. Optional when the option is a
   * single logical language — it then falls back to that language's localized
   * name; required once an option spans multiple languages (a script or family).
   */
  label?: Localized<string>;
  /** udhr source codes this option can draw from; one is picked per question. */
  sourceCodes: readonly string[];
}

/**
 * A curated set of options to play. Each option bundles one or more udhr source
 * `code`s; the same logical language may appear under multiple scripts (e.g.
 * Serbian Cyrillic and Latin). The answer candidates are the distinct logical
 * languages among all options.
 */
export interface Stage {
  /** Stable slug; used as the stats key. */
  id: string;
  name: Localized<string>;
  description: Localized<string>;
  /** What the options are made of; see {@link StageCategory}. */
  category: StageCategory;
  /**
   * Geographic tags used to group stages for display. A stage may carry several;
   * `"world"` is exclusive (never combined with a geographic region). See
   * {@link Region}.
   */
  regions: readonly Region[];
  /** Overall difficulty of the stage. */
  difficulty: Difficulty;
  /** The choices a question is drawn from; see {@link StageOption}. */
  options: readonly StageOption[];
}
