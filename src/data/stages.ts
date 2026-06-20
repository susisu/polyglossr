import type { Stage } from "./stage.js";

/**
 * Curated stages. Authored by hand against the generated dataset; `stages.test.ts`
 * checks every source code resolves and that each stage has enough distinct
 * logical languages. More stages are added later.
 */
export const STAGES: readonly Stage[] = [
  {
    id: "first-steps",
    name: "First Steps",
    description: "A gentle start: widely spoken languages with distinctive scripts.",
    theme: "difficulty",
    difficulty: 1,
    sourceCodes: ["eng", "spa", "fra", "deu_1996", "rus", "jpn", "arb", "hin"],
  },
  {
    id: "scripts-of-the-world",
    name: "Scripts of the World",
    description: "One language per writing system — guess it by the script alone.",
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
      "hye", // Armenian
      "kat", // Georgian
      "amh", // Ethiopic (Ge'ez)
    ],
  },
];

/** Look up a stage by its id. */
export function getStage(id: string): Stage | undefined {
  return STAGES.find((stage) => stage.id === id);
}
