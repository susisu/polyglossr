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
    id: "celtic",
    name: { en: "Celtic", ja: "ケルト語派" },
    description: {
      en: "The surviving Celtic languages of the British Isles and Brittany.",
      ja: "ブリテン諸島とブルターニュに受け継がれるケルトの言語たち。",
    },
    theme: "themed",
    difficulty: 4,
    sourceCodes: [
      "gle", // Irish
      "gla", // Scottish Gaelic
      "cym", // Welsh
      "bre", // Breton
    ],
  },
  {
    id: "central-asia",
    name: { en: "Central Asia", ja: "中央アジア" },
    description: {
      en: "The Turkic and Iranian languages of the steppe and the Silk Road.",
      ja: "草原とシルクロードのテュルク諸語・イラン諸語。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      "kaz", // Kazakh (Cyrillic)
      "kir", // Kyrgyz (Cyrillic)
      "uzn_cyrl", // Uzbek (Cyrillic)
      "uzn_latn", // Uzbek (Latin)
      "tuk_cyrl", // Turkmen (Cyrillic)
      "tuk_latn", // Turkmen (Latin)
      "tgk", // Tajik — Persian in Cyrillic
      "uig_arab", // Uyghur (Arabic)
      "khk", // Halh Mongolian (Cyrillic)
      "tat", // Tatar (Cyrillic)
    ],
  },
  {
    id: "middle-east-north-africa",
    name: { en: "Middle East & North Africa", ja: "中東・北アフリカ" },
    description: {
      en: "From the Maghreb to the Gulf: Semitic, Iranian and Berber languages.",
      ja: "マグリブから湾岸まで。セム諸語・イラン諸語・ベルベル諸語。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      "arb", // Standard Arabic
      "pes_1", // Western Farsi (Persian)
      "heb", // Hebrew
      "tur", // Turkish
      "ckb", // Central Kurdish (Sorani, Arabic script)
      "kmr", // Northern Kurdish (Kurmanji, Latin script)
      "pbu", // Northern Pashto
      "071", // Kabyle (Berber, Latin)
      "tzm", // Central Atlas Tamazight (Berber, Latin)
    ],
  },
  {
    id: "sub-saharan-africa",
    name: { en: "Sub-Saharan Africa", ja: "サブサハラ・アフリカ" },
    description: {
      en: "A wide sweep below the Sahara: West African, Bantu and Horn of Africa languages.",
      ja: "サハラ以南を広く巡る。西アフリカ・バントゥー・アフリカの角の言語たち。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      // West Africa
      "hau_3", // Hausa
      "yor", // Yoruba
      "ibo", // Igbo
      "wol", // Wolof
      "bam", // Bambara
      "aka_asante", // Twi (Asante)
      "ewe", // Ewe
      // Bantu (Central, East & Southern Africa)
      "swh", // Swahili
      "lin", // Lingala
      "kng", // Kongo
      "lug", // Ganda
      "kin", // Kinyarwanda — Kirundi (run) omitted as near-identical
      "sna", // Shona
      "zul", // Zulu
      "xho", // Xhosa
      "nso", // Northern Sotho
      "sot", // Southern Sotho
      "tsn", // Tswana
      "ven", // Venda
      "tso_ZW", // Tsonga
      "ssw", // Swati
      "nya_chinyanja", // Nyanja
      "umb", // Umbundu
      // Horn of Africa
      "amh", // Amharic (Ge'ez script)
      "tir", // Tigrinya (Ge'ez script)
      "som", // Somali
      "aar", // Afar
    ],
  },
  {
    id: "north-america-indigenous",
    name: { en: "Indigenous North America", ja: "北アメリカ先住民の言語" },
    description: {
      en: "Native languages of North America, from the Arctic to the Southwest.",
      ja: "北極圏から南西部まで、北アメリカ先住民の言語たち。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      "nav", // Navajo (Latin)
      "chr_cased", // Cherokee (Cherokee syllabary)
      "cic", // Chickasaw (Latin)
      "ike", // Eastern Canadian Inuktitut (syllabics)
    ],
  },
  {
    id: "mesoamerica",
    name: { en: "Mesoamerica", ja: "メソアメリカ" },
    description: {
      en: "Nahuatl and the Mayan languages of Mexico and Guatemala.",
      ja: "ナワトル語と、メキシコ・グアテマラのマヤ諸語。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      "nhn", // Central Nahuatl
      "quc", // K'iche'
      "kek", // Q'eqchi'
      "cak", // Kaqchikel
      "mam", // Mam
      "tzc", // Tzotzil
    ],
  },
  {
    id: "south-america-indigenous",
    name: { en: "Indigenous South America", ja: "南アメリカ先住民の言語" },
    description: {
      en: "From the Andes to the Amazon: the native languages of South America.",
      ja: "アンデスからアマゾンまで、南アメリカ先住民の言語たち。",
    },
    theme: "region",
    difficulty: 5,
    sourceCodes: [
      "quz", // Cusco Quechua
      "ayr", // Central Aymara
      "gug", // Paraguayan Guaraní
      "arn", // Mapudungun
      "jiv", // Shuar
      "shp", // Shipibo-Conibo
      "cni", // Asháninka
      "huu", // Murui Huitoto
      "yad", // Yagua
      "cof", // Tsafiki (Colorado)
    ],
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
