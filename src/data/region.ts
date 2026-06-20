import type { Localized } from "../shared/locale.js";

/**
 * A geographic tag attached to a stage. These are tags, not a partition: a
 * stage may carry several (e.g. the Middle East & North Africa stage is both
 * Asia and Africa). `"world"` marks stages with no particular home — global
 * mixes and writing-system stages — and is exclusive: it is never combined with
 * a geographic tag. Finer tags (e.g. an eventual `"east-asia"`) can be added
 * here without disturbing existing stages.
 */
export type Region = "world" | "europe" | "asia" | "africa" | "americas" | "oceania";

/** The order regions are shown in when stages are grouped for display. */
export const REGION_ORDER: readonly Region[] = [
  "world",
  "europe",
  "asia",
  "africa",
  "americas",
  "oceania",
];

/** Localized display name for each region. */
export const REGION_LABELS: Readonly<Record<Region, Localized<string>>> = {
  world: { en: "World", ja: "世界" },
  europe: { en: "Europe", ja: "ヨーロッパ" },
  asia: { en: "Asia", ja: "アジア" },
  africa: { en: "Africa", ja: "アフリカ" },
  americas: { en: "Americas", ja: "アメリカ" },
  oceania: { en: "Oceania", ja: "オセアニア" },
};
