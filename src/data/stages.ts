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
    id: "europe-hard",
    name: { en: "Europe (Hard)", ja: "ヨーロッパ（上級）" },
    description: {
      en: "Deeper into Europe: regional and minority languages alongside the nationals.",
      ja: "ヨーロッパの奥へ。国家語に加え、地域語・少数言語も見分けよう。",
    },
    theme: "region",
    difficulty: 4,
    sourceCodes: [
      // Romance
      "spa",
      "fra",
      "ita",
      "por_PT",
      "ron_2006",
      "cat",
      "glg",
      "prv", // Occitan
      "roh", // Romansch
      // Germanic
      "eng",
      "deu_1996",
      "nld",
      "swe",
      "dan",
      "nob",
      "nno", // Norwegian Nynorsk — distinguished from Bokmål by function words (eg/ikkje vs jeg/ikke)
      "isl",
      "fao",
      "ltz",
      // Celtic
      "gle",
      "gla",
      "cym",
      "bre",
      // Slavic
      "pol",
      "ces",
      "slk",
      "slv",
      "hrv",
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
      "srp_cyrl",
      "srp_latn",
      "mkd",
      "bul",
      "rus",
      "ukr",
      "bel",
      "hsb", // Upper Sorbian
      // Baltic
      "lit",
      "lav",
      // Uralic
      "fin",
      "est",
      "hun",
      "sme", // North Saami
      // Other European families
      "ell_monotonic",
      "als",
      "eus",
      "mlt",
      // Eastern edge (transcontinental)
      "kat", // Georgia
      "hye", // Armenia
      "tur", // Turkey
      "azj_latn", // Azerbaijani (Latin)
    ],
  },
  {
    id: "romance",
    name: { en: "Romance", ja: "ロマンス諸語" },
    description: {
      en: "Sister languages of the Latin world — Spanish, Portuguese, Italian and their neighbours.",
      ja: "ラテン世界の姉妹言語たち。スペイン語・ポルトガル語・イタリア語とその隣人。",
    },
    theme: "themed",
    difficulty: 4,
    sourceCodes: [
      "spa",
      "fra",
      "ita",
      "por_PT",
      "por_BR",
      "ron_2006",
      "cat",
      "glg",
      "prv", // Occitan
      "roh", // Romansch
    ],
  },
  {
    id: "germanic",
    name: { en: "Germanic", ja: "ゲルマン語派" },
    description: {
      en: "From English and German to the languages of the North.",
      ja: "英語・ドイツ語から、北欧の言語まで。",
    },
    theme: "themed",
    difficulty: 4,
    sourceCodes: [
      "eng",
      "deu_1996",
      "nld",
      "swe",
      "dan",
      "nob",
      "nno", // Norwegian Nynorsk — distinguished from Bokmål by function words (eg/ikkje vs jeg/ikke)
      "isl",
      "fao",
      "ltz",
    ],
  },
  {
    id: "slavic",
    name: { en: "Slavic", ja: "スラヴ語派" },
    description: {
      en: "The Slavic languages, written in both Latin and Cyrillic.",
      ja: "ラテン文字とキリル文字、両方で書かれるスラヴ語派。",
    },
    theme: "themed",
    difficulty: 4,
    sourceCodes: [
      "pol",
      "ces",
      "slk",
      "slv",
      "hrv",
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
      "srp_cyrl",
      "srp_latn",
      "mkd",
      "bul",
      "rus",
      "ukr",
      "bel",
      "hsb", // Upper Sorbian
    ],
  },
  {
    id: "south-asia",
    name: { en: "South Asia", ja: "南アジア" },
    description: {
      en: "The scripts and languages of the Indian subcontinent.",
      ja: "インド亜大陸の文字と言語たち。",
    },
    theme: "region",
    difficulty: 4,
    sourceCodes: ["hin", "urd", "ben", "guj", "tam", "tel", "kan", "mal", "sin", "nep", "dzo"],
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
      "fao",
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
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
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
      "tgl",
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
