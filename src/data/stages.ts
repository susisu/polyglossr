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
    id: "latin-lookalikes",
    name: { en: "Latin Lookalikes", ja: "紛らわしいラテン文字" },
    description: {
      en: "Languages that share the Latin alphabet — read the diacritics for clues.",
      ja: "ラテン文字を共有する言語たち — 発音区別符号を手がかりに。",
    },
    theme: "difficulty",
    difficulty: 5,
    sourceCodes: ["pol", "ces", "hun", "tur", "vie", "hrv", "ron_2006", "lit", "slv", "cym"],
  },
  {
    id: "geoguessr",
    name: { en: "Languages of GeoGuessr", ja: "GeoGuessr の言語" },
    description: {
      en: "Languages you meet roaming the map — Serbian shows up in both scripts.",
      ja: "マップを歩いて出会う言語たち — セルビア語は両方の文字で登場。",
    },
    theme: "themed",
    difficulty: 3,
    sourceCodes: [
      "eng",
      "spa",
      "fra",
      "deu_1996",
      "rus",
      "jpn",
      "kor",
      "tur",
      "tha",
      "ind",
      "nld",
      "pol",
      "srp_cyrl",
      "srp_latn",
      "ell_monotonic",
      "swe",
      "ron_2006",
      "fin",
    ],
  },
];

/** Look up a stage by its id. */
export function getStage(id: string): Stage | undefined {
  return STAGES.find((stage) => stage.id === id);
}
