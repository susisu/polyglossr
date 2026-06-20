import type { SnippetPool, SourceEntry } from "../data/source.js";
import type { Stage } from "../data/stage.js";
import { generateRun, type Question } from "./question.js";

/** Number of questions in a game. */
export const TOTAL_QUESTIONS = 20;
/** Wrong answers allowed before game over. */
export const MAX_MISTAKES = 3;

/** Lifecycle of a game. `status` is the discriminant the UI renders on. */
export type GameStatus = "playing" | "won" | "lost";

/** Fixed parameters of a single game. */
export interface GameConfig {
  readonly stageId: string;
  readonly totalQuestions: number;
  readonly maxMistakes: number;
  readonly seed: number;
}

/** One answered question, kept for the post-game review and stats. */
export interface AnswerRecord {
  readonly questionIndex: number;
  /** Source shown (carries the script/variant). */
  readonly sourceCode: string;
  /** Correct answer: the stage option the snippet was drawn from. */
  readonly optionId: string;
  /** The stage option the player chose. */
  readonly pickedOptionId: string;
  readonly correct: boolean;
}

/** Immutable snapshot of a game in progress or finished. */
export interface GameState {
  readonly config: GameConfig;
  readonly status: GameStatus;
  readonly questions: readonly Question[];
  /** Index of the active question while playing; past the end once finished. */
  readonly current: number;
  readonly answers: readonly AnswerRecord[];
  readonly mistakes: number;
  readonly correct: number;
}

/** Begin a game from a pre-generated question run. */
export function startGame(config: GameConfig, questions: readonly Question[]): GameState {
  return {
    config,
    status: questions.length > 0 ? "playing" : "won",
    questions,
    current: 0,
    answers: [],
    mistakes: 0,
    correct: 0,
  };
}

/** Inputs for {@link createGame}. */
export interface CreateGameInput {
  stage: Stage;
  sources: ReadonlyMap<string, SourceEntry>;
  snippets: SnippetPool;
  seed: number;
  totalQuestions?: number;
  maxMistakes?: number;
}

/** Generate a run and start a game in one step. */
export function createGame(input: CreateGameInput): GameState {
  const totalQuestions = input.totalQuestions ?? TOTAL_QUESTIONS;
  const maxMistakes = input.maxMistakes ?? MAX_MISTAKES;
  const config: GameConfig = {
    stageId: input.stage.id,
    totalQuestions,
    maxMistakes,
    seed: input.seed,
  };
  const questions = generateRun({
    stage: input.stage,
    sources: input.sources,
    snippets: input.snippets,
    totalQuestions,
    seed: input.seed,
  });
  return startGame(config, questions);
}

/**
 * Apply the player's answer (a stage option id) to the current question and
 * return the next immutable state. A no-op once the game is over.
 */
export function answerQuestion(state: GameState, pickedOptionId: string): GameState {
  if (state.status !== "playing") return state;
  const question = state.questions[state.current];
  if (question === undefined) return state;

  const correct = question.optionId === pickedOptionId;
  const answers: AnswerRecord[] = [
    ...state.answers,
    {
      questionIndex: question.index,
      sourceCode: question.sourceCode,
      optionId: question.optionId,
      pickedOptionId,
      correct,
    },
  ];
  const mistakes = state.mistakes + (correct ? 0 : 1);
  const correctCount = state.correct + (correct ? 1 : 0);
  const next = state.current + 1;

  const status: GameStatus =
    mistakes >= state.config.maxMistakes ? "lost"
    : next >= state.questions.length ? "won"
    : "playing";

  return { ...state, status, current: next, answers, mistakes, correct: correctCount };
}
