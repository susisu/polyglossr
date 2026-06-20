import type { Stage } from "./stage.js";

/**
 * Curated stages. Authored by hand against the generated dataset; `stages.test.ts`
 * checks every source code resolves and that each stage has enough distinct
 * logical languages. The runtime dataset is pruned to exactly the languages
 * these stages reference.
 */
export const STAGES: readonly Stage[] = [
  {
    id: "first-steps",
    name: { en: "First Steps", ja: "はじめの一歩" },
    description: {
      en: "A gentle start: widely spoken languages with distinctive scripts.",
      ja: "まずはここから。特徴的な文字を持つ、広く使われている言語たち。",
    },
    theme: "difficulty",
    difficulty: 1,
    sourceCodes: ["eng", "spa", "fra", "deu_1996", "rus", "cmn_hans", "jpn", "arb", "hin"],
  },
  {
    id: "scripts-of-the-world-easy",
    name: { en: "Scripts of the World (Easy)", ja: "世界の文字（初級）" },
    description: {
      en: "One language per writing system — guess it by the script alone.",
      ja: "書記体系ごとに1言語。文字だけで当ててみよう。",
    },
    theme: "themed",
    difficulty: 2,
    sourceCodes: [
      "eng", // Latin
      "rus", // Cyrillic
      "ell_monotonic", // Greek
      "arb", // Arabic
      "heb", // Hebrew
      "hin", // Devanagari
      "cmn_hans", // Han
      "kor", // Hangul
      "tha", // Thai
    ],
  },
  {
    id: "europe-easy",
    name: { en: "Europe (Easy)", ja: "ヨーロッパ（初級）" },
    description: {
      en: "Telling apart the languages of Europe.",
      ja: "ヨーロッパの言語を見分けよう。",
    },
    theme: "region",
    difficulty: 3,
    sourceCodes: [
      "eng",
      "spa",
      "fra",
      "ita",
      "por_PT",
      "deu_1996",
      "nld",
      "pol",
      "ces",
      "swe",
      "ell_monotonic",
    ],
  },
  {
    id: "east-southeast-asia",
    name: { en: "East & Southeast Asia", ja: "東・東南アジア" },
    description: {
      en: "Han, kana, hangul and the scripts of mainland Southeast Asia.",
      ja: "漢字・かな・ハングルと、大陸部東南アジアの文字。",
    },
    theme: "region",
    difficulty: 3,
    sourceCodes: ["cmn_hans", "jpn", "kor", "tha", "lao", "khm", "vie", "mya"],
  },
  {
    id: "geoguessr-hard",
    name: { en: "Languages of GeoGuessr (Hard)", ja: "GeoGuessr で出会う言語（上級）" },
    description: {
      en: "Languages you meet roaming the map.",
      ja: "マップを歩いて出会う言語たち。",
    },
    theme: "themed",
    difficulty: 5,
    sourceCodes: [
      // Western Europe
      "eng",
      "fra",
      "nld",
      "deu_1996",
      "spa",
      "por_PT",
      "por_BR",
      "cat",
      "eus",
      // Celtic
      "gle",
      "gla",
      "cym",
      "bre",
      // Nordic
      "isl",
      "dan",
      "nob",
      "swe",
      "fin",
      // Baltic
      "est",
      "lav",
      "lit",
      // Central Europe
      "pol",
      "ces",
      "slk",
      "slv",
      "hun",
      // Balkans
      "hrv",
      // Bosnian (Latin) is omitted: its UDHR translation is near-identical to Croatian
      // (many snippets are word-for-word the same), so even an expert cannot reliably tell
      // them apart. Serbian stays distinguishable (Ekavian reflex: čoveka vs čovjeka).
      // "bos_latn",
      "srp_cyrl",
      "srp_latn",
      "als",
      "ron_2006",
      "ell_monotonic",
      "mkd",
      "bul",
      // East Slavic
      "rus",
      "ukr",
      "bel",
      // Caucasus
      "kat",
      // Turkic & Central Asia
      "tur",
      "kaz",
      "kir",
      // Mongolia
      "khk",
      // East Asia
      "cmn_hans",
      "cmn_hant",
      "jpn",
      "kor",
      // Southeast Asia
      "tha",
      "lao",
      "khm",
      "vie",
      "ind",
      "mly_latn",
      // Mediterranean
      "mlt",
      // Middle East
      "arb",
      "heb",
      // Arctic North America
      "ike",
      // Himalaya
      "dzo",
      "nep",
      // South Asia
      "hin",
      "urd",
      "ben",
      "guj",
      "tam",
      "tel",
      "kan",
      "mal",
      "sin",
    ],
  },
];

/** Look up a stage by its id. */
export function getStage(id: string): Stage | undefined {
  return STAGES.find((stage) => stage.id === id);
}
