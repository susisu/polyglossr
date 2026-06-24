import type { Stage } from "./stage.js";

/**
 * Curated stages. Authored by hand against the generated dataset; `stages.test.ts`
 * checks every source code resolves and that each stage has enough distinct
 * options. The runtime dataset is pruned to exactly the languages these stages
 * reference.
 *
 * Each stage lists its options; a question first picks an option, then a code
 * within it. An option's `id` is its answer + stats key. For a single-language
 * option this is its ISO 639-3 code, and it displays by language name. An option
 * that groups several languages by writing system (e.g. the "Scripts of the
 * World" stage) keys on a script id and must carry a `label`; multiple
 * scripts/variants of one language likewise share a single option (e.g. Serbian
 * Cyrillic + Latin) so that language stays weighted as one.
 */
export const STAGES: readonly Stage[] = [
  {
    id: "first-steps",
    name: { en: "First Steps", ja: "はじめの一歩" },
    description: {
      en: "A gentle start: widely spoken languages with distinctive scripts.",
      ja: "まずはここから。特徴的な文字を持つ、広く使われている言語たち。",
    },
    category: "language",
    regions: ["world"],
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
      en: "Name the writing system, not the language — the major scripts of the world.",
      ja: "言語ではなく書記体系を答えよう。世界のメジャーな文字たち。",
    },
    category: "script",
    regions: ["world"],
    // Options are writing systems, not languages: the answer is the script, and
    // each script draws snippets from several major languages that use it.
    options: [
      {
        id: "latn",
        label: { en: "Latin", ja: "ラテン文字" },
        sourceCodes: ["eng", "spa", "fra", "deu_1996", "por_PT", "ita", "nld"],
      },
      {
        id: "cyrl",
        label: { en: "Cyrillic", ja: "キリル文字" },
        sourceCodes: ["rus", "ukr", "bul", "srp_cyrl"],
      },
      {
        id: "grek",
        label: { en: "Greek", ja: "ギリシャ文字" },
        sourceCodes: ["ell_monotonic"],
      },
      {
        id: "arab",
        label: { en: "Arabic", ja: "アラビア文字" },
        sourceCodes: ["arb", "pes_1", "urd"],
      },
      {
        id: "hebr",
        label: { en: "Hebrew", ja: "ヘブライ文字" },
        sourceCodes: ["heb"],
      },
      {
        id: "deva",
        label: { en: "Devanagari", ja: "デーヴァナーガリー文字" },
        sourceCodes: ["hin", "nep", "mar"],
      },
      {
        id: "hani",
        label: { en: "Han", ja: "漢字" },
        // Chinese only — Japanese sets itself apart by mixing kana into its Han,
        // so it gets its own option below.
        sourceCodes: ["cmn_hans", "cmn_hant"],
      },
      {
        id: "jpan",
        label: { en: "Kanji + Kana", ja: "漢字仮名交じり" },
        sourceCodes: ["jpn"],
      },
      {
        id: "hang",
        label: { en: "Hangul", ja: "ハングル" },
        sourceCodes: ["kor"],
      },
      {
        id: "thai",
        label: { en: "Thai", ja: "タイ文字" },
        sourceCodes: ["tha"],
      },
    ],
  },
  {
    id: "scripts-of-the-world-medium",
    name: { en: "Scripts of the World (Medium)", ja: "世界の文字（中級）" },
    description: {
      en: "Past the familiar few — more of the world's writing systems, each its own.",
      ja: "見慣れた文字の先へ。世界の書記体系をもっと見分けよう。",
    },
    // Options are writing systems. Beyond the easy stage's ten: the major scripts
    // that are still unmistakable on sight. Sister scripts that are easily confused
    // (Telugu/Kannada, Lao vs Thai) and the rare ones are held back for the hard
    // stage.
    category: "script",
    regions: ["world"],
    options: [
      // Europe
      {
        id: "latn",
        label: { en: "Latin", ja: "ラテン文字" },
        sourceCodes: ["eng", "spa", "fra", "deu_1996", "ita", "nld"],
      },
      {
        id: "cyrl",
        label: { en: "Cyrillic", ja: "キリル文字" },
        sourceCodes: ["rus", "ukr", "bul", "srp_cyrl"],
      },
      { id: "grek", label: { en: "Greek", ja: "ギリシャ文字" }, sourceCodes: ["ell_monotonic"] },
      // Middle East
      {
        id: "arab",
        label: { en: "Arabic", ja: "アラビア文字" },
        sourceCodes: ["arb", "pes_1", "urd"],
      },
      { id: "hebr", label: { en: "Hebrew", ja: "ヘブライ文字" }, sourceCodes: ["heb"] },
      // Caucasus
      { id: "armn", label: { en: "Armenian", ja: "アルメニア文字" }, sourceCodes: ["hye"] },
      { id: "geor", label: { en: "Georgian", ja: "ジョージア文字" }, sourceCodes: ["kat"] },
      // South Asia
      {
        id: "deva",
        label: { en: "Devanagari", ja: "デーヴァナーガリー文字" },
        sourceCodes: ["hin", "nep", "mar"],
      },
      { id: "beng", label: { en: "Bengali", ja: "ベンガル文字" }, sourceCodes: ["ben"] },
      { id: "taml", label: { en: "Tamil", ja: "タミル文字" }, sourceCodes: ["tam"] },
      { id: "mlym", label: { en: "Malayalam", ja: "マラヤーラム文字" }, sourceCodes: ["mal"] },
      { id: "sinh", label: { en: "Sinhala", ja: "シンハラ文字" }, sourceCodes: ["sin"] },
      // Southeast Asia
      { id: "thai", label: { en: "Thai", ja: "タイ文字" }, sourceCodes: ["tha"] },
      { id: "khmr", label: { en: "Khmer", ja: "クメール文字" }, sourceCodes: ["khm"] },
      { id: "mymr", label: { en: "Myanmar", ja: "ミャンマー文字" }, sourceCodes: ["mya"] },
      // Africa
      { id: "ethi", label: { en: "Ethiopic", ja: "エチオピア文字" }, sourceCodes: ["amh", "tir"] },
      // East Asia
      { id: "hani", label: { en: "Han", ja: "漢字" }, sourceCodes: ["cmn_hans", "cmn_hant"] },
      {
        id: "jpan",
        label: { en: "Kanji + Kana", ja: "漢字仮名交じり" },
        sourceCodes: ["jpn"],
      },
      { id: "hang", label: { en: "Hangul", ja: "ハングル" }, sourceCodes: ["kor"] },
    ],
  },
  {
    id: "scripts-of-the-world-hard",
    name: { en: "Scripts of the World (Hard)", ja: "世界の文字（上級）" },
    description: {
      en: "From sister scripts to the rare and remote — every writing system in the game.",
      ja: "姉妹文字から希少な文字まで、世界のあらゆる書記体系を見分けよう。",
    },
    // Everything the dataset can show: the medium-tier scripts plus the easily
    // confused sisters (Telugu/Kannada, Lao alongside Thai) and the rare scripts
    // (Thaana, Syriac, Adlam, Vai, Chakma, Cherokee, Canadian syllabics).
    category: "script",
    regions: ["world"],
    options: [
      // Europe
      {
        id: "latn",
        label: { en: "Latin", ja: "ラテン文字" },
        sourceCodes: ["eng", "spa", "fra", "deu_1996", "ita", "nld"],
      },
      {
        id: "cyrl",
        label: { en: "Cyrillic", ja: "キリル文字" },
        sourceCodes: ["rus", "ukr", "bul", "srp_cyrl"],
      },
      { id: "grek", label: { en: "Greek", ja: "ギリシャ文字" }, sourceCodes: ["ell_monotonic"] },
      // Middle East & other right-to-left scripts
      {
        id: "arab",
        label: { en: "Arabic", ja: "アラビア文字" },
        sourceCodes: ["arb", "pes_1", "urd"],
      },
      { id: "hebr", label: { en: "Hebrew", ja: "ヘブライ文字" }, sourceCodes: ["heb"] },
      { id: "syrc", label: { en: "Syriac", ja: "シリア文字" }, sourceCodes: ["aii"] },
      { id: "thaa", label: { en: "Thaana", ja: "ターナ文字" }, sourceCodes: ["div"] },
      { id: "adlm", label: { en: "Adlam", ja: "アドラム文字" }, sourceCodes: ["fuf_adlm"] },
      // South Asia — northern Brahmic
      {
        id: "deva",
        label: { en: "Devanagari", ja: "デーヴァナーガリー文字" },
        sourceCodes: ["hin", "nep", "mar"],
      },
      { id: "beng", label: { en: "Bengali", ja: "ベンガル文字" }, sourceCodes: ["ben"] },
      { id: "guru", label: { en: "Gurmukhi", ja: "グルムキー文字" }, sourceCodes: ["pan"] },
      { id: "gujr", label: { en: "Gujarati", ja: "グジャラート文字" }, sourceCodes: ["guj"] },
      // South Asia — Dravidian, Sinhala, Chakma
      { id: "taml", label: { en: "Tamil", ja: "タミル文字" }, sourceCodes: ["tam"] },
      { id: "telu", label: { en: "Telugu", ja: "テルグ文字" }, sourceCodes: ["tel"] },
      { id: "knda", label: { en: "Kannada", ja: "カンナダ文字" }, sourceCodes: ["kan"] },
      { id: "mlym", label: { en: "Malayalam", ja: "マラヤーラム文字" }, sourceCodes: ["mal"] },
      { id: "sinh", label: { en: "Sinhala", ja: "シンハラ文字" }, sourceCodes: ["sin"] },
      { id: "cakm", label: { en: "Chakma", ja: "チャクマ文字" }, sourceCodes: ["ccp"] },
      // Southeast Asia & Tibetan
      { id: "thai", label: { en: "Thai", ja: "タイ文字" }, sourceCodes: ["tha"] },
      { id: "laoo", label: { en: "Lao", ja: "ラオ文字" }, sourceCodes: ["lao"] },
      { id: "khmr", label: { en: "Khmer", ja: "クメール文字" }, sourceCodes: ["khm"] },
      { id: "mymr", label: { en: "Myanmar", ja: "ミャンマー文字" }, sourceCodes: ["mya"] },
      { id: "tibt", label: { en: "Tibetan", ja: "チベット文字" }, sourceCodes: ["bod", "dzo"] },
      // Caucasus
      { id: "armn", label: { en: "Armenian", ja: "アルメニア文字" }, sourceCodes: ["hye"] },
      { id: "geor", label: { en: "Georgian", ja: "ジョージア文字" }, sourceCodes: ["kat"] },
      // Africa
      { id: "ethi", label: { en: "Ethiopic", ja: "エチオピア文字" }, sourceCodes: ["amh", "tir"] },
      { id: "vaii", label: { en: "Vai", ja: "ヴァイ文字" }, sourceCodes: ["vai"] },
      // East Asia
      { id: "hani", label: { en: "Han", ja: "漢字" }, sourceCodes: ["cmn_hans", "cmn_hant"] },
      {
        id: "jpan",
        label: { en: "Kanji + Kana", ja: "漢字仮名交じり" },
        sourceCodes: ["jpn"],
      },
      { id: "hang", label: { en: "Hangul", ja: "ハングル" }, sourceCodes: ["kor"] },
      // Indigenous North America
      { id: "cher", label: { en: "Cherokee", ja: "チェロキー文字" }, sourceCodes: ["chr_cased"] },
      {
        id: "cans",
        label: { en: "Canadian Aboriginal", ja: "カナダ先住民文字" },
        sourceCodes: ["ike"],
      },
    ],
  },
  {
    id: "europe-easy",
    name: { en: "Europe (Easy)", ja: "ヨーロッパ（初級）" },
    description: {
      en: "Telling apart the languages of Europe.",
      ja: "ヨーロッパの言語を見分けよう。",
    },
    category: "language",
    regions: ["europe"],
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
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ell", sourceCodes: ["ell_monotonic"] },
    ],
  },
  {
    id: "east-asia",
    name: { en: "East Asia", ja: "東アジア" },
    description: {
      en: "Tell apart the Han-written Chinese tongues — Mandarin, Cantonese, Hokkien and more — alongside Japanese and Korean.",
      ja: "同じ漢字で書かれる中国諸語を見分けよう。日本語・韓国語も。",
    },
    // The Sinitic options (Mandarin, Cantonese, Min Nan, Hakka, Wu) are all written
    // in simplified Han here, so they cannot be told apart by script — only by
    // vernacular vocabulary and particles (Cantonese 嘅/唔, Min Nan 合/即, Hakka
    // 个/系, Wu 脱仔/拉). Mandarin stays simplified-only (cmn_hans): adding the
    // traditional source would make "traditional = Mandarin" a giveaway. Japanese
    // and Korean are then unmistakable by script. Tibetan, Mongolian and Uyghur
    // are deliberately left out — by script and geography they sit with South Asia
    // (bod, with dzo) and Central Asia (khk, uig), not the Sinosphere.
    category: "language",
    regions: ["asia"],
    options: [
      { id: "cmn", sourceCodes: ["cmn_hans"] }, // Mandarin (Simplified)
      { id: "yue", sourceCodes: ["yue"] }, // Cantonese
      { id: "nan", sourceCodes: ["nan"] }, // Min Nan (Hokkien)
      { id: "hak", sourceCodes: ["hak"] }, // Hakka
      { id: "wuu", sourceCodes: ["wuu"] }, // Wu
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
    ],
  },
  {
    id: "southeast-asia-mainland",
    name: { en: "Southeast Asia (Mainland)", ja: "東南アジア（大陸部）" },
    description: {
      en: "Mainland Southeast Asia: Vietnamese alongside the distinctive scripts of Thai, Lao, Khmer and Burmese.",
      ja: "大陸部東南アジア。ベトナム語と、タイ・ラオ・クメール・ビルマの個性的な文字たち。",
    },
    category: "language",
    regions: ["asia"],
    options: [
      { id: "tha", sourceCodes: ["tha"] }, // Thai
      { id: "lao", sourceCodes: ["lao"] }, // Lao
      { id: "khm", sourceCodes: ["khm"] }, // Khmer
      { id: "mya", sourceCodes: ["mya"] }, // Burmese
      { id: "vie", sourceCodes: ["vie"] }, // Vietnamese (Latin)
      { id: "shn", sourceCodes: ["shn"] }, // Shan
      { id: "mnw", sourceCodes: ["mnw"] }, // Mon
    ],
  },
  {
    id: "southeast-asia-maritime",
    name: { en: "Southeast Asia (Maritime)", ja: "東南アジア（島嶼部）" },
    description: {
      en: "Island Southeast Asia: a sea of Austronesian languages, from Indonesian and Malay to the tongues of the Philippines.",
      ja: "島嶼部東南アジア。インドネシア語・マレー語からフィリピンの言語まで広がるオーストロネシア諸語の海。",
    },
    // Almost all Latin-script Austronesian, so this is a look-alike discrimination
    // stage: Indonesian vs Malay are near-twins, the Philippine languages
    // (Tagalog/Cebuano/Ilocano/Hiligaynon) cluster tightly, and the regional
    // languages of Indonesia round it out. Malay stays Latin-only (mly_latn):
    // its Jawi (Arabic) source would be the lone Arabic script and give it away.
    category: "language",
    regions: ["asia"],
    options: [
      // Malay world
      { id: "ind", sourceCodes: ["ind"] }, // Indonesian
      { id: "zlm", sourceCodes: ["mly_latn"] }, // Malay (Latin)
      // Philippines
      { id: "tgl", sourceCodes: ["tgl"] }, // Tagalog
      { id: "ceb", sourceCodes: ["ceb"] }, // Cebuano
      { id: "ilo", sourceCodes: ["ilo"] }, // Ilocano
      { id: "hil", sourceCodes: ["hil"] }, // Hiligaynon
      // Regional languages of Indonesia
      { id: "jav", sourceCodes: ["jav"] }, // Javanese (Latin)
      { id: "sun", sourceCodes: ["sun"] }, // Sundanese
      { id: "ban", sourceCodes: ["ban"] }, // Balinese
      { id: "min", sourceCodes: ["min"] }, // Minangkabau
      { id: "ace", sourceCodes: ["ace"] }, // Acehnese
      { id: "bug", sourceCodes: ["bug"] }, // Buginese
      { id: "mad", sourceCodes: ["mad"] }, // Madurese
      // Timor
      { id: "tet", sourceCodes: ["tet"] }, // Tetun
    ],
  },
  {
    id: "europe-medium",
    name: { en: "Europe (Medium)", ja: "ヨーロッパ（中級）" },
    description: {
      en: "A step beyond the basics: the national languages of Europe.",
      ja: "初級の一歩先へ。ヨーロッパ各国の言語を見分けよう。",
    },
    // A middle tier between europe-easy and europe-hard: the europe-hard set with
    // the regional/minority languages, the smallest speaker counts, and the
    // hardest-to-tell-apart look-alikes pruned. Languages that are small but
    // unmistakable in writing (Icelandic, Greek, Georgian, Armenian) are kept —
    // they are points an intermediate player can actually earn.
    category: "language",
    regions: ["europe"],
    options: [
      // Romance — regional Catalan/Galician/Occitan/Romansch dropped
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      // Germanic — Danish keeps the Danish/Norwegian near-twin slot (also avoids
      // Norwegian's Bokmål/Nynorsk split); Faroese and Luxembourgish dropped as
      // small/look-alike. Icelandic kept: tiny but unmistakable (þ/ð).
      { id: "eng", sourceCodes: ["eng"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "isl", sourceCodes: ["isl"] },
      // Slavic — one representative per look-alike cluster: Czech (not Slovak),
      // Croatian (not Serbian/Slovene/Bosnian), Bulgarian (not Macedonian),
      // Russian + Ukrainian (not Belarusian). Sorbian dropped as regional.
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "hrv", sourceCodes: ["hrv"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bul", sourceCodes: ["bul"] },
      // Baltic — both national, told apart by Latvian's macrons
      { id: "lit", sourceCodes: ["lit"] },
      { id: "lvs", sourceCodes: ["lav"] },
      // Uralic — Estonian (look-alike of Finnish) and Saami (regional) dropped
      { id: "fin", sourceCodes: ["fin"] },
      { id: "hun", sourceCodes: ["hun"] },
      // Other branches, each unmistakable
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      { id: "als", sourceCodes: ["als"] }, // Albanian
      // Eastern edge — Turkish kept; Azerbaijani dropped as a Turkish look-alike.
      // Georgian and Armenian kept for their unique scripts.
      { id: "tur", sourceCodes: ["tur"] },
      { id: "kat", sourceCodes: ["kat"] }, // Georgia
      { id: "hye", sourceCodes: ["hye"] }, // Armenia
    ],
  },
  {
    id: "europe-hard",
    name: { en: "Europe (Hard)", ja: "ヨーロッパ（上級）" },
    description: {
      en: "Deeper into Europe: regional and minority languages alongside the nationals.",
      ja: "ヨーロッパの奥へ。国家語に加え、地域語・少数言語も見分けよう。",
    },
    category: "language",
    regions: ["europe"],
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
      { id: "sco", sourceCodes: ["sco"] }, // Scots
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nds", sourceCodes: ["nds"] }, // Low Saxon (Low German)
      { id: "nld", sourceCodes: ["nld"] },
      { id: "fry", sourceCodes: ["fri"] }, // West Frisian
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
    id: "europe-branches",
    name: { en: "Branches of Europe", ja: "ヨーロッパの語派" },
    description: {
      en: "Don't name the language — name its branch. Romance, Germanic, Slavic, Celtic and the rest of Europe's family tree.",
      ja: "言語ではなく語派を答えよう。ロマンス・ゲルマン・スラヴ・ケルトなど、ヨーロッパに枝分かれした語派たち。",
    },
    // Options are language branches, not languages: each bundles every Europe
    // (Hard) language belonging to it. The languages mirror the europe-hard
    // stage; the Indo-European branches each get an option, and everything
    // outside Indo-European is collected into a single "Other" option.
    category: "family",
    regions: ["europe"],
    options: [
      {
        id: "romance",
        label: { en: "Romance", ja: "ロマンス語派" },
        sourceCodes: ["spa", "fra", "ita", "por_PT", "ron_2006", "cat", "glg", "prv", "roh"],
      },
      {
        id: "germanic",
        label: { en: "Germanic", ja: "ゲルマン語派" },
        sourceCodes: [
          "eng",
          "sco",
          "deu_1996",
          "nds",
          "nld",
          "fri",
          "swe",
          "dan",
          "nob",
          "nno",
          "isl",
          "fao",
          "ltz",
        ],
      },
      {
        id: "slavic",
        label: { en: "Slavic", ja: "スラヴ語派" },
        sourceCodes: [
          "pol",
          "ces",
          "slk",
          "slv",
          "hrv",
          "srp_cyrl",
          "srp_latn",
          "mkd",
          "bul",
          "rus",
          "ukr",
          "bel",
          "hsb",
        ],
      },
      {
        id: "celtic",
        label: { en: "Celtic", ja: "ケルト語派" },
        sourceCodes: ["gle", "gla", "cym", "bre"],
      },
      {
        id: "baltic",
        label: { en: "Baltic", ja: "バルト語派" },
        sourceCodes: ["lit", "lav"],
      },
      {
        id: "hellenic",
        label: { en: "Hellenic", ja: "ギリシャ語派" },
        sourceCodes: ["ell_monotonic"],
      },
      {
        id: "albanian",
        label: { en: "Albanian", ja: "アルバニア語派" },
        sourceCodes: ["als"],
      },
      {
        id: "armenian",
        label: { en: "Armenian", ja: "アルメニア語派" },
        sourceCodes: ["hye"],
      },
      {
        id: "other",
        label: { en: "Other (non-Indo-European)", ja: "その他（非印欧語族）" },
        // Uralic (Finnish, Estonian, Hungarian, North Saami), Basque (isolate),
        // Turkic (Turkish, Azerbaijani), Kartvelian (Georgian) and Semitic (Maltese).
        sourceCodes: ["fin", "est", "hun", "sme", "eus", "tur", "azj_latn", "kat", "mlt"],
      },
    ],
  },
  {
    id: "romance-easy",
    name: { en: "Romance (Easy)", ja: "ロマンス諸語（初級）" },
    description: {
      en: "Spanish, French and the other national languages that grew out of Latin.",
      ja: "スペイン語・フランス語など、ラテン語から育った国の言語たち。",
    },
    // The national Romance languages; the regional/minority members (Catalan,
    // Galician, Occitan, Romansch) are held back for the hard stage.
    category: "language",
    regions: ["europe"],
    options: [
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
    ],
  },
  {
    id: "romance",
    name: { en: "Romance (Hard)", ja: "ロマンス諸語（上級）" },
    description: {
      en: "The Romance languages of Europe, from the big national tongues to the regional ones of Spain, southern France and the Alps.",
      ja: "ヨーロッパのロマンス諸語。主要な国の言語から、スペイン・南フランス・アルプスの地域語まで。",
    },
    category: "language",
    regions: ["europe"],
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
    id: "germanic-easy",
    name: { en: "Germanic (Easy)", ja: "ゲルマン語派（初級）" },
    description: {
      en: "English, German, Dutch and the major languages of the Nordic countries.",
      ja: "英語・ドイツ語・オランダ語と、北欧の主要な言語。",
    },
    // The well-known national Germanic languages; the regional/minority members
    // (Scots, Low Saxon, Frisian, Afrikaans, Faroese, Luxembourgish) and the
    // Norwegian written standards are held back for the hard stage.
    category: "language",
    regions: ["europe"],
    options: [
      { id: "eng", sourceCodes: ["eng"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "isl", sourceCodes: ["isl"] },
    ],
  },
  {
    id: "germanic",
    name: { en: "Germanic (Hard)", ja: "ゲルマン語派（上級）" },
    description: {
      en: "Every branch of Germanic, including the close cousins of English and Dutch and the two written forms of Norwegian.",
      ja: "ゲルマン語派の全域。英語やオランダ語に近い言語や、二つの書記形式を持つノルウェー語まで。",
    },
    category: "language",
    regions: ["europe"],
    options: [
      { id: "eng", sourceCodes: ["eng"] },
      { id: "sco", sourceCodes: ["sco"] }, // Scots
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nds", sourceCodes: ["nds"] }, // Low Saxon (Low German)
      { id: "nld", sourceCodes: ["nld"] },
      { id: "fry", sourceCodes: ["fri"] }, // West Frisian
      { id: "afr", sourceCodes: ["afr"] }, // Afrikaans — South African daughter of Dutch
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
    id: "slavic-easy",
    name: { en: "Slavic (Easy)", ja: "スラヴ語派（初級）" },
    description: {
      en: "The most widely spoken Slavic languages, in both Latin and Cyrillic script.",
      ja: "広く話されるスラヴ諸語。ラテン文字とキリル文字、二つの文字が使われる。",
    },
    // One well-known representative per look-alike cluster; the smaller and
    // hardest-to-tell-apart members (Slovak, Slovene, Serbian, Macedonian,
    // Belarusian, Sorbian) are held back for the hard stage.
    category: "language",
    regions: ["europe"],
    options: [
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "hrv", sourceCodes: ["hrv"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bul", sourceCodes: ["bul"] },
    ],
  },
  {
    id: "slavic",
    name: { en: "Slavic (Hard)", ja: "スラヴ語派（上級）" },
    description: {
      en: "A wide range of Slavic languages, and the challenge of telling the closest relatives apart.",
      ja: "幅広いスラヴ諸語。よく似た近縁どうしを見分ける難関。",
    },
    category: "language",
    regions: ["europe"],
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
    category: "language",
    regions: ["asia"],
    options: [
      { id: "hin", sourceCodes: ["hin"] },
      { id: "urd", sourceCodes: ["urd"] },
      { id: "mar", sourceCodes: ["mar"] }, // Marathi (Devanagari)
      { id: "ben", sourceCodes: ["ben"] },
      { id: "ccp", sourceCodes: ["ccp"] }, // Chakma
      { id: "pan", sourceCodes: ["pan"] }, // Punjabi (Gurmukhi)
      { id: "guj", sourceCodes: ["guj"] },
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      { id: "sin", sourceCodes: ["sin"] },
      { id: "div", sourceCodes: ["div"] }, // Maldivian / Dhivehi (Thaana)
      { id: "npi", sourceCodes: ["nep"] },
      { id: "bod", sourceCodes: ["bod"] }, // Tibetan — Tibetan script, with Dzongkha
      { id: "dzo", sourceCodes: ["dzo"] },
    ],
  },
  {
    id: "south-asia-scripts",
    name: { en: "Scripts of South Asia", ja: "南アジアの文字" },
    description: {
      en: "Name the writing system, not the language — the scripts of the Indian subcontinent and its neighbours.",
      ja: "言語ではなく書記体系を答えよう。インド亜大陸とその周辺の文字たち。",
    },
    // Options are writing systems, not languages. The South Asia portion of the
    // Scripts of the World stage, gathered on its own: northern Brahmic (Devanagari,
    // Bengali, Gurmukhi, Gujarati), the Dravidian quartet (Tamil, Telugu — Kannada's
    // close sister — and Malayalam), Sinhala and Chakma, plus Thaana (Maldives) and
    // Tibetan (Bhutan/Himalaya) at the edges. The Perso-Arabic script of Urdu is the
    // lone non-Brahmic member — the outlier that stands out by script alone.
    category: "script",
    regions: ["asia"],
    options: [
      // Northern Brahmic
      {
        id: "deva",
        label: { en: "Devanagari", ja: "デーヴァナーガリー文字" },
        sourceCodes: ["hin", "nep", "mar"],
      },
      { id: "beng", label: { en: "Bengali", ja: "ベンガル文字" }, sourceCodes: ["ben"] },
      { id: "guru", label: { en: "Gurmukhi", ja: "グルムキー文字" }, sourceCodes: ["pan"] },
      { id: "gujr", label: { en: "Gujarati", ja: "グジャラート文字" }, sourceCodes: ["guj"] },
      // Dravidian, Sinhala, Chakma
      { id: "taml", label: { en: "Tamil", ja: "タミル文字" }, sourceCodes: ["tam"] },
      { id: "telu", label: { en: "Telugu", ja: "テルグ文字" }, sourceCodes: ["tel"] },
      { id: "knda", label: { en: "Kannada", ja: "カンナダ文字" }, sourceCodes: ["kan"] },
      { id: "mlym", label: { en: "Malayalam", ja: "マラヤーラム文字" }, sourceCodes: ["mal"] },
      { id: "sinh", label: { en: "Sinhala", ja: "シンハラ文字" }, sourceCodes: ["sin"] },
      { id: "cakm", label: { en: "Chakma", ja: "チャクマ文字" }, sourceCodes: ["ccp"] },
      // Edges
      { id: "thaa", label: { en: "Thaana", ja: "ターナ文字" }, sourceCodes: ["div"] },
      { id: "tibt", label: { en: "Tibetan", ja: "チベット文字" }, sourceCodes: ["bod", "dzo"] },
      // Perso-Arabic — the lone non-Brahmic script
      { id: "arab", label: { en: "Arabic", ja: "アラビア文字" }, sourceCodes: ["urd"] },
    ],
  },
  {
    id: "celtic",
    name: { en: "Celtic", ja: "ケルト語派" },
    description: {
      en: "The Celtic languages still alive in the British Isles and Brittany.",
      ja: "ブリテン諸島とブルターニュに今も生きるケルトの言語たち。",
    },
    category: "language",
    regions: ["europe"],
    options: [
      { id: "gle", sourceCodes: ["gle"] }, // Irish
      { id: "gla", sourceCodes: ["gla"] }, // Scottish Gaelic
      { id: "glv", sourceCodes: ["glv"] }, // Manx
      { id: "cym", sourceCodes: ["cym"] }, // Welsh
      { id: "bre", sourceCodes: ["bre"] }, // Breton
    ],
  },
  {
    id: "caucasus",
    name: { en: "The Caucasus", ja: "コーカサス" },
    description: {
      en: "Between the Black and Caspian seas: Georgian and Armenian, each with its own alphabet, alongside the languages of the North Caucasus.",
      ja: "黒海とカスピ海のあいだ。独自の文字を持つジョージア語・アルメニア語と、北コーカサスの言語たち。",
    },
    // Georgian and Armenian are unmistakable by their own unique scripts; the
    // rest are a Cyrillic look-alike set — the Circassian sisters Adyghe and
    // Kabardian are especially close, Abkhaz stands out by its unusually long
    // alphabet, and Ossetian is an Iranian language written in Cyrillic.
    category: "language",
    regions: ["asia", "europe"],
    options: [
      { id: "kat", sourceCodes: ["kat"] }, // Georgian (Georgian script)
      { id: "hye", sourceCodes: ["hye"] }, // Armenian (Armenian script)
      { id: "abk", sourceCodes: ["abk"] }, // Abkhaz (Cyrillic)
      { id: "ady", sourceCodes: ["ady"] }, // Adyghe / West Circassian (Cyrillic)
      { id: "kbd", sourceCodes: ["kbd"] }, // Kabardian / East Circassian (Cyrillic)
      { id: "oss", sourceCodes: ["oss"] }, // Ossetian (Cyrillic, Iranian)
    ],
  },
  {
    id: "central-asia",
    name: { en: "Central Asia", ja: "中央アジア" },
    description: {
      en: "The Turkic and Iranian languages of the steppe and the Silk Road.",
      ja: "草原とシルクロードのテュルク諸語・イラン諸語。",
    },
    category: "language",
    regions: ["asia"],
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
    id: "north-asia",
    name: { en: "North Asia", ja: "北アジア" },
    description: {
      en: "Across Siberia and the Russian Far East: Turkic, Tungusic and Samoyedic languages and the Paleosiberian isolates.",
      ja: "シベリアからロシア極東まで。テュルク・ツングース・サモエードの言語と、古シベリアの孤立した言語たち。",
    },
    category: "language",
    regions: ["asia"],
    options: [
      // Turkic — Siberian
      { id: "sah", sourceCodes: ["sah"] }, // Yakut (Sakha)
      { id: "tyv", sourceCodes: ["tyv"] }, // Tuvan
      { id: "kjh", sourceCodes: ["kjh"] }, // Khakas
      { id: "alt", sourceCodes: ["alt"] }, // Southern Altai
      { id: "cjs", sourceCodes: ["cjs"] }, // Shor
      // Tungusic
      { id: "evn", sourceCodes: ["evn"] }, // Evenki
      { id: "eve", sourceCodes: ["eve"] }, // Even
      { id: "gld", sourceCodes: ["gld"] }, // Nanai
      { id: "oaa", sourceCodes: ["oaa"] }, // Orok (Uilta)
      // Samoyedic (Uralic)
      { id: "yrk", sourceCodes: ["yrk"] }, // Nenets
      { id: "nio", sourceCodes: ["nio"] }, // Nganasan
      // Paleosiberian isolates
      { id: "niv", sourceCodes: ["niv"] }, // Nivkh (Gilyak)
      { id: "ykg", sourceCodes: ["ykg"] }, // Northern Yukaghir
    ],
  },
  {
    id: "west-asia-north-africa",
    name: { en: "West Asia & North Africa", ja: "西アジア・北アフリカ" },
    description: {
      en: "From the Maghreb to the Gulf: Semitic, Iranian and Berber languages.",
      ja: "マグリブから湾岸まで。セム諸語・イラン諸語・ベルベル諸語。",
    },
    category: "language",
    regions: ["asia", "africa"],
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
    category: "language",
    regions: ["africa"],
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
      // Southern Africa — the lone Indo-European (Germanic) language here, a
      // daughter of Dutch, set apart from the Bantu languages around it.
      { id: "afr", sourceCodes: ["afr"] }, // Afrikaans
      // Madagascar — geographically African, but the lone Austronesian language
      // here (its closest relatives are in Borneo), which sets it apart on sight.
      { id: "plt", sourceCodes: ["plt"] }, // Plateau Malagasy
    ],
  },
  {
    id: "north-america-indigenous",
    name: { en: "Indigenous North America", ja: "北アメリカ先住民の言語" },
    description: {
      en: "Native languages of North America, from the Arctic to the Southwest.",
      ja: "北極圏から南西部まで、北アメリカ先住民の言語たち。",
    },
    category: "language",
    regions: ["americas"],
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
    category: "language",
    regions: ["americas"],
    options: [
      { id: "nhn", sourceCodes: ["nhn"] }, // Central Nahuatl
      { id: "quc", sourceCodes: ["quc"] }, // K'iche'
      { id: "kek", sourceCodes: ["kek"] }, // Q'eqchi'
      { id: "cak", sourceCodes: ["cak"] }, // Kaqchikel
      { id: "mam", sourceCodes: ["mam"] }, // Mam
      { id: "tzo", sourceCodes: ["tzc"] }, // Tzotzil
      { id: "yua", sourceCodes: ["yua"] }, // Yucatec Maya
    ],
  },
  {
    id: "south-america-indigenous",
    name: { en: "Indigenous South America", ja: "南アメリカ先住民の言語" },
    description: {
      en: "From the Andes to the Amazon: the native languages of South America.",
      ja: "アンデスからアマゾンまで、南アメリカ先住民の言語たち。",
    },
    category: "language",
    regions: ["americas"],
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
    id: "polynesia",
    name: { en: "Polynesia", ja: "ポリネシア" },
    description: {
      en: "The closely related languages of the Polynesian triangle, from Māori and Samoan to Hawaiian and Tahitian.",
      ja: "ポリネシアン・トライアングルに広がる近縁の言語たち。マオリ語・サモア語からハワイ語・タヒチ語まで。",
    },
    // Closely related Oceanic languages, all Latin script: a look-alike stage
    // told apart by sound-change reflexes and orthography (Hawaiian's k/w and
    // ʻokina, Samoan g = ŋ, Māori wh/ng and macrons, Tahitian's ʻeta).
    category: "language",
    regions: ["oceania"],
    options: [
      { id: "mri", sourceCodes: ["mri"] }, // Māori
      { id: "smo", sourceCodes: ["smo"] }, // Samoan
      { id: "ton", sourceCodes: ["ton"] }, // Tongan
      { id: "tah", sourceCodes: ["tah"] }, // Tahitian
      { id: "haw", sourceCodes: ["haw"] }, // Hawaiian
      { id: "niu", sourceCodes: ["niu"] }, // Niuean
      { id: "rar", sourceCodes: ["rar"] }, // Rarotongan (Cook Islands Māori)
    ],
  },
  {
    id: "melanesia",
    name: { en: "Melanesia", ja: "メラネシア" },
    description: {
      en: "Melanesia: the English-based pidgins of Papua New Guinea, Vanuatu and Solomon Islands, alongside Fijian.",
      ja: "メラネシア。パプアニューギニア・バヌアツ・ソロモン諸島の英語ベースのピジンと、フィジー語。",
    },
    // Tok Pisin, Bislama and Pijin are sibling English-lexified creoles and read
    // almost alike — the core challenge — with Fijian (Austronesian) as the outlier.
    category: "language",
    regions: ["oceania"],
    options: [
      { id: "tpi", sourceCodes: ["tpi"] }, // Tok Pisin (Papua New Guinea)
      { id: "bis", sourceCodes: ["bis"] }, // Bislama (Vanuatu)
      { id: "pis", sourceCodes: ["pis"] }, // Pijin (Solomon Islands)
      { id: "fij", sourceCodes: ["fij"] }, // Fijian
    ],
  },
  {
    id: "micronesia",
    name: { en: "Micronesia", ja: "ミクロネシア" },
    description: {
      en: "Micronesia: Chamorro and Palauan with the languages of the Caroline and Marshall Islands.",
      ja: "ミクロネシア。チャモロ語・パラオ語と、カロリン諸島・マーシャル諸島の言語たち。",
    },
    category: "language",
    regions: ["oceania"],
    options: [
      { id: "cha", sourceCodes: ["cha"] }, // Chamorro (Marianas)
      { id: "pau", sourceCodes: ["pau"] }, // Palauan
      { id: "yap", sourceCodes: ["yap"] }, // Yapese
      { id: "chk", sourceCodes: ["chk"] }, // Chuukese
      { id: "pon", sourceCodes: ["pon"] }, // Pohnpeian
      { id: "mah", sourceCodes: ["mah"] }, // Marshallese
    ],
  },
  {
    id: "creoles",
    name: { en: "Creoles of the World", ja: "世界のクレオール語" },
    description: {
      en: "Contact languages born of trade and empire — French-, Portuguese- and English-lexified creoles from the Caribbean to the Indian Ocean.",
      ja: "交易と帝国が生んだ接触言語たち。カリブ海からインド洋まで、フランス語・ポルトガル語・英語をもとにしたクレオール語。",
    },
    // Grouped by lexifier (the language that gave most of the vocabulary):
    // creoles sharing one are sibling look-alikes — the core challenge — while
    // the lexifier families mark the broad divisions. Latin script throughout,
    // so identification rests on vocabulary and spelling, not script.
    category: "language",
    regions: ["world"],
    options: [
      // French-lexified
      { id: "hat", sourceCodes: ["hat_kreyol", "hat_popular"] }, // Haitian Creole
      { id: "mfe", sourceCodes: ["052"] }, // Morisyen (Mauritius)
      { id: "crs", sourceCodes: ["crs"] }, // Seselwa (Seychelles)
      { id: "acf", sourceCodes: ["056"] }, // Saint Lucian Creole
      // Portuguese-lexified
      { id: "kea", sourceCodes: ["kea"] }, // Kabuverdianu (Cape Verde)
      { id: "cri", sourceCodes: ["007"] }, // Sãotomense (São Tomé)
      // English-lexified
      { id: "jam", sourceCodes: ["055"] }, // Jamaican Creole (Patois)
      { id: "pcm", sourceCodes: ["pcm"] }, // Nigerian Pidgin
      { id: "kri", sourceCodes: ["kri"] }, // Krio (Sierra Leone)
      // Iberian-lexified, Dutch-influenced
      { id: "pap", sourceCodes: ["pap"] }, // Papiamentu (ABC islands)
    ],
  },
  {
    id: "geoguessr-easy",
    name: { en: "Languages of GeoGuessr (Easy)", ja: "GeoGuessr で出会う言語（初級）" },
    description: {
      en: "The languages you run into most, easy to tell apart.",
      ja: "マップでよく出会う、見分けやすい言語たち。",
    },
    // The most frequently seen, visually distinctive languages — roughly one per
    // script or region, so the broad area is readable at a glance. Minority and
    // regional languages are left out entirely, and each look-alike cluster keeps
    // just one representative (so any Cyrillic reads as Russian here, etc.).
    category: "language",
    regions: ["world"],
    options: [
      // Western Europe
      { id: "eng", sourceCodes: ["eng"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "spa", sourceCodes: ["spa"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      // Nordic — Swedish stands in for Scandinavian; Finnish is unmistakable
      { id: "swe", sourceCodes: ["swe"] },
      { id: "fin", sourceCodes: ["fin"] },
      // Central Europe
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "hun", sourceCodes: ["hun"] },
      // Southeast Europe
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      // East Slavic — Russian stands in for all Cyrillic here
      { id: "rus", sourceCodes: ["rus"] },
      // Anatolia
      { id: "tur", sourceCodes: ["tur"] },
      // East Asia
      { id: "cmn", sourceCodes: ["cmn_hans", "cmn_hant"] },
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
      // Southeast Asia
      { id: "tha", sourceCodes: ["tha"] },
      { id: "vie", sourceCodes: ["vie"] },
      { id: "ind", sourceCodes: ["ind"] },
      // Middle East
      { id: "arb", sourceCodes: ["arb"] },
      { id: "heb", sourceCodes: ["heb"] },
      // South Asia — the two most distinctive scripts of the subcontinent
      { id: "hin", sourceCodes: ["hin"] },
      { id: "sin", sourceCodes: ["sin"] },
    ],
  },
  {
    id: "geoguessr-medium",
    name: { en: "Languages of GeoGuessr (Medium)", ja: "GeoGuessr で出会う言語（中級）" },
    description: {
      en: "A wider range of the languages you meet on the map.",
      ja: "マップで出会う、より多くの言語を見分けよう。",
    },
    // Broader than the easy stage: regional languages that are distinctive on
    // sight come back. What stays out is the same-script look-alikes — for each
    // cluster a single member is kept (Hindi not Marathi, Irish not Scottish
    // Gaelic, Indonesian not Malay, and so on).
    category: "language",
    regions: ["world"],
    options: [
      // Western Europe
      { id: "eng", sourceCodes: ["eng"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "nld", sourceCodes: ["nld"] },
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "spa", sourceCodes: ["spa"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      // Celtic — Irish (Goidelic) and Welsh (Brythonic); Scottish Gaelic and
      // Breton dropped as look-alikes of those two.
      { id: "gle", sourceCodes: ["gle"] },
      { id: "cym", sourceCodes: ["cym"] },
      // Nordic — Danish stands in for the Danish/Norwegian twin; Faroese dropped
      { id: "isl", sourceCodes: ["isl"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "swe", sourceCodes: ["swe"] },
      { id: "fin", sourceCodes: ["fin"] },
      // Baltic — Estonian kept; its õ and double vowels set it apart from Finnish
      { id: "ekk", sourceCodes: ["est"] },
      { id: "lvs", sourceCodes: ["lav"] },
      { id: "lit", sourceCodes: ["lit"] },
      // Central Europe — Slovak (≈Czech) and Slovene dropped
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "hun", sourceCodes: ["hun"] },
      // Balkans — Croatian for the Latin Serbo-Croatian, Bulgarian for the
      // Cyrillic; Serbian and Macedonian dropped as look-alikes.
      { id: "hrv", sourceCodes: ["hrv"] },
      { id: "als", sourceCodes: ["als"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      { id: "bul", sourceCodes: ["bul"] },
      // East Slavic — Belarusian (≈Russian/Ukrainian) dropped
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      // Caucasus
      { id: "kat", sourceCodes: ["kat"] },
      // Turkic & Mongolia — Kazakh and Kyrgyz dropped as Cyrillic look-alikes
      { id: "tur", sourceCodes: ["tur"] },
      { id: "khk", sourceCodes: ["khk"] },
      // East Asia
      { id: "cmn", sourceCodes: ["cmn_hans", "cmn_hant"] },
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
      // Southeast Asia — Malay (≈Indonesian), Tagalog, and Lao (≈Thai) dropped
      { id: "tha", sourceCodes: ["tha"] },
      { id: "khm", sourceCodes: ["khm"] },
      { id: "vie", sourceCodes: ["vie"] },
      { id: "ind", sourceCodes: ["ind"] },
      // Mediterranean
      { id: "mlt", sourceCodes: ["mlt"] },
      // Middle East
      { id: "arb", sourceCodes: ["arb"] },
      { id: "heb", sourceCodes: ["heb"] },
      // Arctic North America
      { id: "ike", sourceCodes: ["ike"] },
      { id: "kal", sourceCodes: ["kal"] },
      // Himalaya
      { id: "dzo", sourceCodes: ["dzo"] },
      // South Asia — one per script; Marathi and Nepali dropped (≈Hindi), and
      // Urdu dropped (Arabic script, too close to Arabic above)
      { id: "hin", sourceCodes: ["hin"] },
      { id: "ben", sourceCodes: ["ben"] },
      { id: "guj", sourceCodes: ["guj"] },
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      { id: "sin", sourceCodes: ["sin"] },
    ],
  },
  {
    id: "geoguessr-hard",
    name: { en: "Languages of GeoGuessr (Hard)", ja: "GeoGuessr で出会う言語（上級）" },
    description: {
      en: "From regional tongues to deceptive look-alikes — every language on the map.",
      ja: "地域語から紛らわしい隣人まで、マップのすべての言語を見分けよう。",
    },
    category: "language",
    regions: ["world"],
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
      { id: "kal", sourceCodes: ["kal"] },
      // Himalaya
      { id: "dzo", sourceCodes: ["dzo"] },
      { id: "npi", sourceCodes: ["nep"] },
      // South Asia
      { id: "hin", sourceCodes: ["hin"] },
      { id: "urd", sourceCodes: ["urd"] },
      { id: "ben", sourceCodes: ["ben"] },
      { id: "guj", sourceCodes: ["guj"] },
      { id: "mar", sourceCodes: ["mar"] },
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      { id: "sin", sourceCodes: ["sin"] },
    ],
  },
  {
    id: "true-polyglot",
    name: { en: "True Polyglot", ja: "真のポリグロット" },
    description: {
      en: "The ultimate challenge.",
      ja: "最終到達点。",
    },
    // The catch-all final stage: every distinct language any other stage can show,
    // each as a single language option. This is the union of all language-stage
    // options plus the languages that otherwise appear only inside the script and
    // family stages (Assyrian Neo-Aramaic, Tibetan, Chakma, Maldivian, Pular,
    // Punjabi, Vai) and a handful that appear in no other stage at all (Esperanto,
    // Latin, Sanskrit, Yiddish) — so a player here must name them all. Grouped
    // geographically for authoring; multi-code options bundle the scripts/variants
    // of one language (e.g. Serbian Cyrillic + Latin) so it stays weighted as one.
    category: "language",
    regions: ["world"],
    options: [
      // Europe — Romance
      { id: "spa", sourceCodes: ["spa"] },
      { id: "fra", sourceCodes: ["fra"] },
      { id: "ita", sourceCodes: ["ita"] },
      { id: "por", sourceCodes: ["por_PT", "por_BR"] },
      { id: "ron", sourceCodes: ["ron_2006"] },
      { id: "cat", sourceCodes: ["cat"] },
      { id: "glg", sourceCodes: ["glg"] },
      { id: "oci", sourceCodes: ["prv"] },
      { id: "roh", sourceCodes: ["roh"] },
      { id: "lat", sourceCodes: ["lat"] }, // Latin
      // Europe — Germanic
      { id: "eng", sourceCodes: ["eng"] },
      { id: "sco", sourceCodes: ["sco"] }, // Scots
      { id: "deu", sourceCodes: ["deu_1996"] },
      { id: "nds", sourceCodes: ["nds"] }, // Low Saxon (Low German)
      { id: "nld", sourceCodes: ["nld"] },
      { id: "fry", sourceCodes: ["fri"] }, // West Frisian
      { id: "swe", sourceCodes: ["swe"] },
      { id: "dan", sourceCodes: ["dan"] },
      { id: "nob", sourceCodes: ["nob"] },
      { id: "nno", sourceCodes: ["nno"] },
      { id: "isl", sourceCodes: ["isl"] },
      { id: "fao", sourceCodes: ["fao"] },
      { id: "ltz", sourceCodes: ["ltz"] },
      { id: "ydd", sourceCodes: ["ydd"] }, // Yiddish
      // Europe — Celtic
      { id: "gle", sourceCodes: ["gle"] },
      { id: "gla", sourceCodes: ["gla"] },
      { id: "glv", sourceCodes: ["glv"] },
      { id: "cym", sourceCodes: ["cym"] },
      { id: "bre", sourceCodes: ["bre"] },
      // Europe — Slavic
      { id: "pol", sourceCodes: ["pol"] },
      { id: "ces", sourceCodes: ["ces"] },
      { id: "slk", sourceCodes: ["slk"] },
      { id: "slv", sourceCodes: ["slv"] },
      { id: "hrv", sourceCodes: ["hrv"] },
      { id: "srp", sourceCodes: ["srp_cyrl", "srp_latn"] },
      { id: "mkd", sourceCodes: ["mkd"] },
      { id: "bul", sourceCodes: ["bul"] },
      { id: "rus", sourceCodes: ["rus"] },
      { id: "ukr", sourceCodes: ["ukr"] },
      { id: "bel", sourceCodes: ["bel"] },
      { id: "hsb", sourceCodes: ["hsb"] },
      // Europe — Baltic
      { id: "lit", sourceCodes: ["lit"] },
      { id: "lvs", sourceCodes: ["lav"] },
      // Europe — Uralic
      { id: "fin", sourceCodes: ["fin"] },
      { id: "ekk", sourceCodes: ["est"] },
      { id: "hun", sourceCodes: ["hun"] },
      { id: "sme", sourceCodes: ["sme"] },
      // Europe — other (Hellenic, Albanian, Basque, Maltese)
      { id: "ell", sourceCodes: ["ell_monotonic"] },
      { id: "als", sourceCodes: ["als"] },
      { id: "eus", sourceCodes: ["eus"] },
      { id: "mlt", sourceCodes: ["mlt"] },
      // Constructed
      { id: "epo", sourceCodes: ["epo"] }, // Esperanto
      // Caucasus
      { id: "kat", sourceCodes: ["kat"] },
      { id: "hye", sourceCodes: ["hye"] },
      { id: "abk", sourceCodes: ["abk"] }, // Abkhaz (Cyrillic)
      { id: "ady", sourceCodes: ["ady"] }, // Adyghe (Cyrillic)
      { id: "kbd", sourceCodes: ["kbd"] }, // Kabardian (Cyrillic)
      { id: "oss", sourceCodes: ["oss"] }, // Ossetian (Cyrillic, Iranian)
      // Middle East & West Asia — Semitic
      { id: "arb", sourceCodes: ["arb"] },
      { id: "heb", sourceCodes: ["heb"] },
      { id: "aii", sourceCodes: ["aii"] }, // Assyrian Neo-Aramaic (Syriac script)
      // Middle East & Central Asia — Iranian
      { id: "pes", sourceCodes: ["pes_1"] },
      { id: "ckb", sourceCodes: ["ckb"] },
      { id: "kmr", sourceCodes: ["kmr"] },
      { id: "pbu", sourceCodes: ["pbu"] },
      { id: "tgk", sourceCodes: ["tgk"] },
      // Central & West Asia — Turkic
      { id: "tur", sourceCodes: ["tur"] },
      { id: "azj", sourceCodes: ["azj_latn"] },
      { id: "kaz", sourceCodes: ["kaz"] },
      { id: "kir", sourceCodes: ["kir"] },
      { id: "uzn", sourceCodes: ["uzn_cyrl", "uzn_latn"] },
      { id: "tuk", sourceCodes: ["tuk_cyrl", "tuk_latn"] },
      { id: "tat", sourceCodes: ["tat"] },
      { id: "uig", sourceCodes: ["uig_arab"] },
      // Mongolic
      { id: "khk", sourceCodes: ["khk"] },
      // South Asia — Indo-Aryan
      { id: "hin", sourceCodes: ["hin"] },
      { id: "urd", sourceCodes: ["urd"] },
      { id: "ben", sourceCodes: ["ben"] },
      { id: "guj", sourceCodes: ["guj"] },
      { id: "mar", sourceCodes: ["mar"] },
      { id: "pan", sourceCodes: ["pan"] }, // Punjabi (Gurmukhi)
      { id: "npi", sourceCodes: ["nep"] },
      { id: "sin", sourceCodes: ["sin"] },
      { id: "div", sourceCodes: ["div"] }, // Maldivian (Thaana)
      { id: "san", sourceCodes: ["san"] }, // Sanskrit
      // South Asia — Dravidian
      { id: "tam", sourceCodes: ["tam"] },
      { id: "tel", sourceCodes: ["tel"] },
      { id: "kan", sourceCodes: ["kan"] },
      { id: "mal", sourceCodes: ["mal"] },
      // South Asia — Tibetic & other
      { id: "bod", sourceCodes: ["bod"] }, // Tibetan
      { id: "dzo", sourceCodes: ["dzo"] },
      { id: "ccp", sourceCodes: ["ccp"] }, // Chakma
      // Southeast Asia — mainland
      { id: "tha", sourceCodes: ["tha"] },
      { id: "lao", sourceCodes: ["lao"] },
      { id: "khm", sourceCodes: ["khm"] },
      { id: "mya", sourceCodes: ["mya"] },
      { id: "vie", sourceCodes: ["vie"] },
      { id: "shn", sourceCodes: ["shn"] }, // Shan
      { id: "mnw", sourceCodes: ["mnw"] }, // Mon
      // Southeast Asia — maritime (Austronesian)
      { id: "ind", sourceCodes: ["ind"] },
      { id: "zlm", sourceCodes: ["mly_latn"] },
      { id: "tgl", sourceCodes: ["tgl"] },
      { id: "ceb", sourceCodes: ["ceb"] }, // Cebuano
      { id: "ilo", sourceCodes: ["ilo"] }, // Ilocano
      { id: "hil", sourceCodes: ["hil"] }, // Hiligaynon
      { id: "jav", sourceCodes: ["jav"] }, // Javanese
      { id: "sun", sourceCodes: ["sun"] }, // Sundanese
      { id: "ban", sourceCodes: ["ban"] }, // Balinese
      { id: "min", sourceCodes: ["min"] }, // Minangkabau
      { id: "ace", sourceCodes: ["ace"] }, // Acehnese
      { id: "bug", sourceCodes: ["bug"] }, // Buginese
      { id: "mad", sourceCodes: ["mad"] }, // Madurese
      { id: "tet", sourceCodes: ["tet"] }, // Tetun
      // East Asia — Sinitic (all Han) plus Japanese and Korean
      { id: "cmn", sourceCodes: ["cmn_hans", "cmn_hant"] },
      { id: "yue", sourceCodes: ["yue"] }, // Cantonese
      { id: "nan", sourceCodes: ["nan"] }, // Min Nan (Hokkien)
      { id: "hak", sourceCodes: ["hak"] }, // Hakka
      { id: "wuu", sourceCodes: ["wuu"] }, // Wu
      { id: "jpn", sourceCodes: ["jpn"] },
      { id: "kor", sourceCodes: ["kor"] },
      // North Asia — Siberia & the Russian Far East
      { id: "sah", sourceCodes: ["sah"] }, // Yakut (Sakha)
      { id: "tyv", sourceCodes: ["tyv"] }, // Tuvan
      { id: "kjh", sourceCodes: ["kjh"] }, // Khakas
      { id: "alt", sourceCodes: ["alt"] }, // Southern Altai
      { id: "cjs", sourceCodes: ["cjs"] }, // Shor
      { id: "evn", sourceCodes: ["evn"] }, // Evenki
      { id: "eve", sourceCodes: ["eve"] }, // Even
      { id: "gld", sourceCodes: ["gld"] }, // Nanai
      { id: "oaa", sourceCodes: ["oaa"] }, // Orok (Uilta)
      { id: "yrk", sourceCodes: ["yrk"] }, // Nenets
      { id: "nio", sourceCodes: ["nio"] }, // Nganasan
      { id: "niv", sourceCodes: ["niv"] }, // Nivkh (Gilyak)
      { id: "ykg", sourceCodes: ["ykg"] }, // Northern Yukaghir
      // Africa — Berber
      { id: "kab", sourceCodes: ["071"] },
      { id: "tzm", sourceCodes: ["tzm"] },
      // Africa — West Africa
      { id: "hau", sourceCodes: ["hau_3"] },
      { id: "yor", sourceCodes: ["yor"] },
      { id: "ibo", sourceCodes: ["ibo"] },
      { id: "wol", sourceCodes: ["wol"] },
      { id: "bam", sourceCodes: ["bam"] },
      { id: "twi", sourceCodes: ["aka_asante"] },
      { id: "ewe", sourceCodes: ["ewe"] },
      { id: "fuf", sourceCodes: ["fuf_adlm"] }, // Pular (Adlam)
      { id: "vai", sourceCodes: ["vai"] }, // Vai
      // Africa — Bantu
      { id: "swh", sourceCodes: ["swh"] },
      { id: "lin", sourceCodes: ["lin"] },
      { id: "kng", sourceCodes: ["kng"] },
      { id: "lug", sourceCodes: ["lug"] },
      { id: "kin", sourceCodes: ["kin"] },
      { id: "sna", sourceCodes: ["sna"] },
      { id: "zul", sourceCodes: ["zul"] },
      { id: "xho", sourceCodes: ["xho"] },
      { id: "nso", sourceCodes: ["nso"] },
      { id: "sot", sourceCodes: ["sot"] },
      { id: "tsn", sourceCodes: ["tsn"] },
      { id: "ven", sourceCodes: ["ven"] },
      { id: "tso", sourceCodes: ["tso_ZW"] },
      { id: "ssw", sourceCodes: ["ssw"] },
      { id: "nya", sourceCodes: ["nya_chinyanja"] },
      { id: "umb", sourceCodes: ["umb"] },
      // Africa — Horn of Africa
      { id: "amh", sourceCodes: ["amh"] },
      { id: "tir", sourceCodes: ["tir"] },
      { id: "som", sourceCodes: ["som"] },
      { id: "aar", sourceCodes: ["aar"] },
      // Africa — Southern Africa (Germanic)
      { id: "afr", sourceCodes: ["afr"] }, // Afrikaans
      // Africa — Madagascar (Austronesian)
      { id: "plt", sourceCodes: ["plt"] },
      // Americas — North America
      { id: "nav", sourceCodes: ["nav"] },
      { id: "chr", sourceCodes: ["chr_cased"] },
      { id: "cic", sourceCodes: ["cic"] },
      { id: "ike", sourceCodes: ["ike"] },
      { id: "kal", sourceCodes: ["kal"] },
      // Americas — Mesoamerica
      { id: "nhn", sourceCodes: ["nhn"] },
      { id: "quc", sourceCodes: ["quc"] },
      { id: "kek", sourceCodes: ["kek"] },
      { id: "cak", sourceCodes: ["cak"] },
      { id: "mam", sourceCodes: ["mam"] },
      { id: "tzo", sourceCodes: ["tzc"] },
      { id: "yua", sourceCodes: ["yua"] },
      // Americas — South America
      { id: "quz", sourceCodes: ["quz"] },
      { id: "ayr", sourceCodes: ["ayr"] },
      { id: "gug", sourceCodes: ["gug"] },
      { id: "arn", sourceCodes: ["arn"] },
      { id: "jiv", sourceCodes: ["jiv"] },
      { id: "shp", sourceCodes: ["shp"] },
      { id: "cni", sourceCodes: ["cni"] },
      { id: "huu", sourceCodes: ["huu"] },
      { id: "yad", sourceCodes: ["yad"] },
      { id: "cof", sourceCodes: ["cof"] },
      // Oceania — Polynesia
      { id: "mri", sourceCodes: ["mri"] }, // Māori
      { id: "smo", sourceCodes: ["smo"] }, // Samoan
      { id: "ton", sourceCodes: ["ton"] }, // Tongan
      { id: "tah", sourceCodes: ["tah"] }, // Tahitian
      { id: "haw", sourceCodes: ["haw"] }, // Hawaiian
      { id: "niu", sourceCodes: ["niu"] }, // Niuean
      { id: "rar", sourceCodes: ["rar"] }, // Rarotongan
      // Oceania — Melanesia
      { id: "tpi", sourceCodes: ["tpi"] }, // Tok Pisin
      { id: "bis", sourceCodes: ["bis"] }, // Bislama
      { id: "pis", sourceCodes: ["pis"] }, // Pijin
      { id: "fij", sourceCodes: ["fij"] }, // Fijian
      // Oceania — Micronesia
      { id: "cha", sourceCodes: ["cha"] }, // Chamorro
      { id: "pau", sourceCodes: ["pau"] }, // Palauan
      { id: "yap", sourceCodes: ["yap"] }, // Yapese
      { id: "chk", sourceCodes: ["chk"] }, // Chuukese
      { id: "pon", sourceCodes: ["pon"] }, // Pohnpeian
      { id: "mah", sourceCodes: ["mah"] }, // Marshallese
      // Creoles — cross-regional contact languages, grouped by lexifier
      { id: "hat", sourceCodes: ["hat_kreyol", "hat_popular"] }, // Haitian Creole (French)
      { id: "mfe", sourceCodes: ["052"] }, // Morisyen (French)
      { id: "crs", sourceCodes: ["crs"] }, // Seselwa (French)
      { id: "acf", sourceCodes: ["056"] }, // Saint Lucian Creole (French)
      { id: "kea", sourceCodes: ["kea"] }, // Kabuverdianu (Portuguese)
      { id: "cri", sourceCodes: ["007"] }, // Sãotomense (Portuguese)
      { id: "jam", sourceCodes: ["055"] }, // Jamaican Creole (English)
      { id: "pcm", sourceCodes: ["pcm"] }, // Nigerian Pidgin (English)
      { id: "kri", sourceCodes: ["kri"] }, // Krio (English)
      { id: "pap", sourceCodes: ["pap"] }, // Papiamentu (Iberian)
    ],
  },
];

/** Look up a stage by its id. */
export function getStage(id: string): Stage | undefined {
  return STAGES.find((stage) => stage.id === id);
}
