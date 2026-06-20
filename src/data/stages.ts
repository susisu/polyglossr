import type { Stage } from "./stage.js";

/**
 * Curated stages. Authored by hand against the generated dataset; `stages.test.ts`
 * checks every source code resolves and that each stage has enough distinct
 * options. The runtime dataset is pruned to exactly the languages these stages
 * reference.
 *
 * Each stage lists its options; a question first picks an option, then a code
 * within it. An option's `id` is its answer + stats key (ISO 639-3 here, since
 * every current option is one logical language). Multiple scripts/variants of
 * the same language share one option (e.g. Serbian Cyrillic + Latin) so that
 * language stays weighted as one. Options carry no `label` yet, so they display
 * by language name; script/family labels come in a later reorganization.
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
    options: [
      { id: "eng", sourceCodes: ["eng"] },
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "cmn", sourceCodes: ["cmn_hans"] },
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "arb", sourceCodes: ["arb"] },
      { id: "hin", sourceCodes: ["hin"] },
    ],
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
    options: [
      { id: "eng", sourceCodes: ["eng"] }, // Latin
      { id: "rus", sourceCodes: ["rus"] }, // Cyrillic
      { id: "ell", sourceCodes: ["ell_monotonic"] }, // Greek
      { id: "arb", sourceCodes: ["arb"] }, // Arabic
      { id: "heb", sourceCodes: ["heb"] }, // Hebrew
      { id: "hin", sourceCodes: ["hin"] }, // Devanagari
      { id: "cmn", sourceCodes: ["cmn_hans"] }, // Han
      { id: "kor", sourceCodes: ["kor"] }, // Hangul
      { id: "tha", sourceCodes: ["tha"] }, // Thai
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
    options: [
      { id: "eng", sourceCodes: ["eng"] },
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "ell", sourceCodes: ["ell_monotonic"] },
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
    options: [
      { id: "cmn", sourceCodes: ["cmn_hans"] },
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
      { id: "tha", sourceCodes: ["tha"] },
      { id: "lao", sourceCodes: ["lao"] },
      { id: "khm", sourceCodes: ["khm"] },
      { id: "vie", sourceCodes: ["vie"] },
      { id: "mya", sourceCodes: ["mya"] },
    ],
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
    options: [
      // Romance
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "cat", sourceCodes: ["cat"] },
      { id: "glg", sourceCodes: ["glg"] },
      { id: "oci", sourceCodes: ["prv"] }, // Occitan
      { id: "roh", sourceCodes: ["roh"] }, // Romansch
      // Germanic
      { id: "eng", sourceCodes: ["eng"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "nob", sourceCodes: ["nob"] },
      { id: "nno", sourceCodes: ["nno"] }, // Norwegian Nynorsk — distinguished from Bokmål by function words (eg/ikkje vs jeg/ikke)
      { id: "isl", sourceCodes: ["isl"] },
      { id: "fao", sourceCodes: ["fao"] },
      { id: "ltz", sourceCodes: ["ltz"] },
      // Celtic
      { id: "gle", sourceCodes: ["gle"] },
      { id: "gla", sourceCodes: ["gla"] },
      { id: "cym", sourceCodes: ["cym"] },
      { id: "bre", sourceCodes: ["bre"] },
      // Slavic
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "slk", sourceCodes: ["slk"] },
      { id: "slv", sourceCodes: ["slv"] },
      { id: "hrv", sourceCodes: ["hrv"] },
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
      { id: "srp", sourceCodes: ["srp_cyrl", "srp_latn"] },
      { id: "mkd", sourceCodes: ["mkd"] },
      { id: "bul", sourceCodes: ["bul"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bel", sourceCodes: ["bel"] },
      { id: "hsb", sourceCodes: ["hsb"] }, // Upper Sorbian
      // Baltic
      { id: "lit", sourceCodes: ["lit"] },
      { id: "lvs", sourceCodes: ["lav"] },
      // Uralic
      { id: "fin", sourceCodes: ["fin"] },
      { id: "ekk", sourceCodes: ["est"] },
      { id: "hun", sourceCodes: ["hun"] },
      { id: "sme", sourceCodes: ["sme"] }, // North Saami
      // Other European families
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      { id: "als", sourceCodes: ["als"] },
      { id: "eus", sourceCodes: ["eus"] },
      { id: "mlt", sourceCodes: ["mlt"] },
      // Eastern edge (transcontinental)
      { id: "kat", sourceCodes: ["kat"] }, // Georgia
      { id: "hye", sourceCodes: ["hye"] }, // Armenia
      { id: "tur", sourceCodes: ["tur"] }, // Turkey
      { id: "azj", sourceCodes: ["azj_latn"] }, // Azerbaijani (Latin)
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
    options: [
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "cat", sourceCodes: ["cat"] },
      { id: "glg", sourceCodes: ["glg"] },
      { id: "oci", sourceCodes: ["prv"] }, // Occitan
      { id: "roh", sourceCodes: ["roh"] }, // Romansch
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
    options: [
      { id: "eng", sourceCodes: ["eng"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "nob", sourceCodes: ["nob"] },
      { id: "nno", sourceCodes: ["nno"] }, // Norwegian Nynorsk — distinguished from Bokmål by function words (eg/ikkje vs jeg/ikke)
      { id: "isl", sourceCodes: ["isl"] },
      { id: "fao", sourceCodes: ["fao"] },
      { id: "ltz", sourceCodes: ["ltz"] },
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
    options: [
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "slk", sourceCodes: ["slk"] },
      { id: "slv", sourceCodes: ["slv"] },
      { id: "hrv", sourceCodes: ["hrv"] },
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
      { id: "srp", sourceCodes: ["srp_cyrl", "srp_latn"] },
      { id: "mkd", sourceCodes: ["mkd"] },
      { id: "bul", sourceCodes: ["bul"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bel", sourceCodes: ["bel"] },
      { id: "hsb", sourceCodes: ["hsb"] }, // Upper Sorbian
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
    options: [
      { id: "hin", sourceCodes: ["hin"] },
      { id: "urd", sourceCodes: ["urd"] },
      { id: "ben", sourceCodes: ["ben"] },
      { id: "guj", sourceCodes: ["guj"] },
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      { id: "sin", sourceCodes: ["sin"] },
      { id: "npi", sourceCodes: ["nep"] },
      { id: "dzo", sourceCodes: ["dzo"] },
    ],
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
    options: [
      { id: "gle", sourceCodes: ["gle"] }, // Irish
      { id: "gla", sourceCodes: ["gla"] }, // Scottish Gaelic
      { id: "cym", sourceCodes: ["cym"] }, // Welsh
      { id: "bre", sourceCodes: ["bre"] }, // Breton
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
    options: [
      { id: "kaz", sourceCodes: ["kaz"] }, // Kazakh (Cyrillic)
      { id: "kir", sourceCodes: ["kir"] }, // Kyrgyz (Cyrillic)
      { id: "uzn", sourceCodes: ["uzn_cyrl", "uzn_latn"] }, // Uzbek (Cyrillic + Latin)
      { id: "tuk", sourceCodes: ["tuk_cyrl", "tuk_latn"] }, // Turkmen (Cyrillic + Latin)
      { id: "tgk", sourceCodes: ["tgk"] }, // Tajik — Persian in Cyrillic
      { id: "uig", sourceCodes: ["uig_arab"] }, // Uyghur (Arabic)
      { id: "khk", sourceCodes: ["khk"] }, // Halh Mongolian (Cyrillic)
      { id: "tat", sourceCodes: ["tat"] }, // Tatar (Cyrillic)
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
    options: [
      { id: "arb", sourceCodes: ["arb"] }, // Standard Arabic
      { id: "pes", sourceCodes: ["pes_1"] }, // Western Farsi (Persian)
      { id: "heb", sourceCodes: ["heb"] }, // Hebrew
      { id: "tur", sourceCodes: ["tur"] }, // Turkish
      { id: "ckb", sourceCodes: ["ckb"] }, // Central Kurdish (Sorani, Arabic script)
      { id: "kmr", sourceCodes: ["kmr"] }, // Northern Kurdish (Kurmanji, Latin script)
      { id: "pbu", sourceCodes: ["pbu"] }, // Northern Pashto
      { id: "kab", sourceCodes: ["071"] }, // Kabyle (Berber, Latin)
      { id: "tzm", sourceCodes: ["tzm"] }, // Central Atlas Tamazight (Berber, Latin)
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
    options: [
      // West Africa
      { id: "hau", sourceCodes: ["hau_3"] }, // Hausa
      { id: "yor", sourceCodes: ["yor"] }, // Yoruba
      { id: "ibo", sourceCodes: ["ibo"] }, // Igbo
      { id: "wol", sourceCodes: ["wol"] }, // Wolof
      { id: "bam", sourceCodes: ["bam"] }, // Bambara
      { id: "twi", sourceCodes: ["aka_asante"] }, // Twi (Asante)
      { id: "ewe", sourceCodes: ["ewe"] }, // Ewe
      // Bantu (Central, East & Southern Africa)
      { id: "swh", sourceCodes: ["swh"] }, // Swahili
      { id: "lin", sourceCodes: ["lin"] }, // Lingala
      { id: "kng", sourceCodes: ["kng"] }, // Kongo
      { id: "lug", sourceCodes: ["lug"] }, // Ganda
      { id: "kin", sourceCodes: ["kin"] }, // Kinyarwanda — Kirundi (run) omitted as near-identical
      { id: "sna", sourceCodes: ["sna"] }, // Shona
      { id: "zul", sourceCodes: ["zul"] }, // Zulu
      { id: "xho", sourceCodes: ["xho"] }, // Xhosa
      { id: "nso", sourceCodes: ["nso"] }, // Northern Sotho
      { id: "sot", sourceCodes: ["sot"] }, // Southern Sotho
      { id: "tsn", sourceCodes: ["tsn"] }, // Tswana
      { id: "ven", sourceCodes: ["ven"] }, // Venda
      { id: "tso", sourceCodes: ["tso_ZW"] }, // Tsonga
      { id: "ssw", sourceCodes: ["ssw"] }, // Swati
      { id: "nya", sourceCodes: ["nya_chinyanja"] }, // Nyanja
      { id: "umb", sourceCodes: ["umb"] }, // Umbundu
      // Horn of Africa
      { id: "amh", sourceCodes: ["amh"] }, // Amharic (Ge'ez script)
      { id: "tir", sourceCodes: ["tir"] }, // Tigrinya (Ge'ez script)
      { id: "som", sourceCodes: ["som"] }, // Somali
      { id: "aar", sourceCodes: ["aar"] }, // Afar
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
    options: [
      { id: "nav", sourceCodes: ["nav"] }, // Navajo (Latin)
      { id: "chr", sourceCodes: ["chr_cased"] }, // Cherokee (Cherokee syllabary)
      { id: "cic", sourceCodes: ["cic"] }, // Chickasaw (Latin)
      { id: "ike", sourceCodes: ["ike"] }, // Eastern Canadian Inuktitut (syllabics)
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
    options: [
      { id: "nhn", sourceCodes: ["nhn"] }, // Central Nahuatl
      { id: "quc", sourceCodes: ["quc"] }, // K'iche'
      { id: "kek", sourceCodes: ["kek"] }, // Q'eqchi'
      { id: "cak", sourceCodes: ["cak"] }, // Kaqchikel
      { id: "mam", sourceCodes: ["mam"] }, // Mam
      { id: "tzo", sourceCodes: ["tzc"] }, // Tzotzil
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
    options: [
      { id: "quz", sourceCodes: ["quz"] }, // Cusco Quechua
      { id: "ayr", sourceCodes: ["ayr"] }, // Central Aymara
      { id: "gug", sourceCodes: ["gug"] }, // Paraguayan Guaraní
      { id: "arn", sourceCodes: ["arn"] }, // Mapudungun
      { id: "jiv", sourceCodes: ["jiv"] }, // Shuar
      { id: "shp", sourceCodes: ["shp"] }, // Shipibo-Conibo
      { id: "cni", sourceCodes: ["cni"] }, // Asháninka
      { id: "huu", sourceCodes: ["huu"] }, // Murui Huitoto
      { id: "yad", sourceCodes: ["yad"] }, // Yagua
      { id: "cof", sourceCodes: ["cof"] }, // Tsafiki (Colorado)
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
    options: [
      // Western Europe
      { id: "eng", sourceCodes: ["eng"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "spa", sourceCodes: ["spa"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      { id: "cat", sourceCodes: ["cat"] },
      { id: "eus", sourceCodes: ["eus"] },
      // Celtic
      { id: "gle", sourceCodes: ["gle"] },
      { id: "gla", sourceCodes: ["gla"] },
      { id: "cym", sourceCodes: ["cym"] },
      { id: "bre", sourceCodes: ["bre"] },
      // Nordic
      { id: "isl", sourceCodes: ["isl"] },
      { id: "fao", sourceCodes: ["fao"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "nob", sourceCodes: ["nob"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "fin", sourceCodes: ["fin"] },
      // Baltic
      { id: "ekk", sourceCodes: ["est"] },
      { id: "lvs", sourceCodes: ["lav"] },
      { id: "lit", sourceCodes: ["lit"] },
      // Central Europe
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "slk", sourceCodes: ["slk"] },
      { id: "slv", sourceCodes: ["slv"] },
      { id: "hun", sourceCodes: ["hun"] },
      // Balkans
      { id: "hrv", sourceCodes: ["hrv"] },
      // Bosnian and Montenegrin are omitted: their UDHR translations are near-identical to
      // Croatian, so even an expert cannot reliably tell them apart. Serbian stays
      // distinguishable (Ekavian reflex: čoveka vs čovjeka).
      { id: "srp", sourceCodes: ["srp_cyrl", "srp_latn"] },
      { id: "als", sourceCodes: ["als"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      { id: "mkd", sourceCodes: ["mkd"] },
      { id: "bul", sourceCodes: ["bul"] },
      // East Slavic
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bel", sourceCodes: ["bel"] },
      // Caucasus
      { id: "kat", sourceCodes: ["kat"] },
      // Turkic & Central Asia
      { id: "tur", sourceCodes: ["tur"] },
      { id: "kaz", sourceCodes: ["kaz"] },
      { id: "kir", sourceCodes: ["kir"] },
      // Mongolia
      { id: "khk", sourceCodes: ["khk"] },
      // East Asia
      { id: "cmn", sourceCodes: ["cmn_hans", "cmn_hant"] },
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
      // Southeast Asia
      { id: "tha", sourceCodes: ["tha"] },
      { id: "lao", sourceCodes: ["lao"] },
      { id: "khm", sourceCodes: ["khm"] },
      { id: "vie", sourceCodes: ["vie"] },
      { id: "ind", sourceCodes: ["ind"] },
      { id: "zlm", sourceCodes: ["mly_latn"] },
      { id: "tgl", sourceCodes: ["tgl"] },
      // Mediterranean
      { id: "mlt", sourceCodes: ["mlt"] },
      // Middle East
      { id: "arb", sourceCodes: ["arb"] },
      { id: "heb", sourceCodes: ["heb"] },
      // Arctic North America
      { id: "ike", sourceCodes: ["ike"] },
      // Himalaya
      { id: "dzo", sourceCodes: ["dzo"] },
      { id: "npi", sourceCodes: ["nep"] },
      // South Asia
      { id: "hin", sourceCodes: ["hin"] },
      { id: "urd", sourceCodes: ["urd"] },
      { id: "ben", sourceCodes: ["ben"] },
      { id: "guj", sourceCodes: ["guj"] },
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      { id: "sin", sourceCodes: ["sin"] },
    ],
  },
];

/** Look up a stage by its id. */
export function getStage(id: string): Stage | undefined {
  return STAGES.find((stage) => stage.id === id);
}
