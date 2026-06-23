import { mulberry32 } from "../shared/rng.js";
import { shuffle } from "../shared/shuffle.js";
import type { SnippetPool, SourceEntry, Direction } from "../data/source.js";
import type { Stage } from "../data/stage.js";

/**
 * A single question: a snippet from one source (language × script) that the
 * player must identify. The correct answer is the stage option the snippet was
 * drawn from ({@link Question.optionId}) — for a language option, any of its
 * scripts counts. Answer candidates are not stored here — the UI offers the
 * stage's options as free-input suggestions.
 */
export interface Question {
  /** Position in the run, 0-based. */
  index: number;
  /** udhr source code the snippet came from (carries the script). */
  sourceCode: string;
  /** Correct answer: the stage option id the snippet was drawn from. */
  optionId: string;
  /** The text to display. */
  snippet: string;
  /** Rendering direction for the snippet. */
  direction: Direction;
}

/** Inputs for generating a question run. */
export interface GenerateRunInput {
  stage: Stage;
  sources: ReadonlyMap<string, SourceEntry>;
  snippets: SnippetPool;
  totalQuestions: number;
  seed: number;
}

/** One drawable item: a specific snippet from a specific source. */
interface Draw {
  sourceCode: string;
  optionId: string;
  snippet: string;
  direction: Direction;
}

/** Collect the drawable (source, snippet) pairs of each stage option. */
function drawsByOption(input: GenerateRunInput): Draw[][] {
  const byOption: Draw[][] = [];
  for (const option of input.stage.options) {
    const draws: Draw[] = [];
    for (const code of option.sourceCodes) {
      const source = input.sources.get(code);
      const snippets = input.snippets.get(code);
      if (source === undefined || snippets === undefined) continue;
      for (const snippet of snippets) {
        draws.push({
          sourceCode: code,
          optionId: option.id,
          snippet,
          direction: source.direction,
        });
      }
    }
    if (draws.length > 0) byOption.push(draws);
  }
  return byOption;
}

/**
 * Generate a deterministic run of `totalQuestions` questions for a stage, as a
 * pure function of the seed.
 *
 * - **Balanced options.** Each option gets an equal share of the run; any
 *   leftover questions go to a random subset of options.
 * - **No repeated example.** Each pass through an option's unique (source,
 *   snippet) draws is a fresh shuffle, so every example is shown once before any
 *   repeats, and a repeat never reuses the previous pass's order.
 * - **Random order.** The run is shuffled as a whole, so the same option may
 *   fall on consecutive questions — that is fine as long as the run stays
 *   balanced overall.
 */
export function generateRun(input: GenerateRunInput): Question[] {
  const byOption = drawsByOption(input);
  if (byOption.length === 0) return [];

  const rng = mulberry32(input.seed);
  const total = input.totalQuestions;
  const optionCount = byOption.length;

  // Even split across options, with the remainder handed to a random subset.
  const base = Math.floor(total / optionCount);
  const remainder = total % optionCount;
  const withExtra = new Set(
    shuffle(
      byOption.map((_, i) => i),
      rng,
    ).slice(0, remainder),
  );

  // Pull each option's share. Each pass through its examples is a fresh shuffle,
  // so once the uniques run out the repeats never reuse the previous order.
  const picked: Draw[] = [];
  for (const [i, draws] of byOption.entries()) {
    const count = base + (withExtra.has(i) ? 1 : 0);
    let bag: Draw[] = [];
    for (let j = 0; j < count; j++) {
      if (bag.length === 0) bag = shuffle(draws, rng);
      const draw = bag.pop();
      if (draw !== undefined) picked.push(draw);
    }
  }

  // Random order across the whole run; balance is already fixed by the shares.
  return shuffle(picked, rng).map((draw, index) => ({
    index,
    sourceCode: draw.sourceCode,
    optionId: draw.optionId,
    snippet: draw.snippet,
    direction: draw.direction,
  }));
}
