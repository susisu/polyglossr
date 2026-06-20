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
 * One balanced pass over all unique draws: round-robin across a shuffled option
 * order, taking one draw per option per round (each option's draws shuffled).
 * Spreads options out and visits every unique draw exactly once.
 */
function balancedPass(byOption: ReadonlyArray<readonly Draw[]>, seed: number): Draw[] {
  const rng = mulberry32(seed);
  const queues = shuffle(
    Array.from(byOption, (draws) => shuffle(draws, rng)),
    rng,
  );
  const result: Draw[] = [];
  let progressed = true;
  while (progressed) {
    progressed = false;
    for (const queue of queues) {
      const draw = queue.pop();
      if (draw !== undefined) {
        result.push(draw);
        progressed = true;
      }
    }
  }
  return result;
}

/**
 * Generate a deterministic 30-question run for a stage. The whole run is a pure
 * function of the seed. No (source, snippet) pair repeats until every unique
 * pair has been shown; if the stage is too small for that many uniques, further
 * passes (reshuffled) are appended as a fallback.
 */
export function generateRun(input: GenerateRunInput): Question[] {
  const byOption = drawsByOption(input);
  if (byOption.length === 0) return [];

  const questions: Question[] = [];
  let pass = 0;
  while (questions.length < input.totalQuestions) {
    // Vary each fallback pass by perturbing the seed.
    const draws = balancedPass(byOption, input.seed + pass);
    if (draws.length === 0) break;
    for (const draw of draws) {
      if (questions.length >= input.totalQuestions) break;
      questions.push({
        index: questions.length,
        sourceCode: draw.sourceCode,
        optionId: draw.optionId,
        snippet: draw.snippet,
        direction: draw.direction,
      });
    }
    pass += 1;
  }
  return questions;
}
