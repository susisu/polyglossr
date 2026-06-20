import { describe, expect, it } from "vitest";
import { makeFixture } from "./fixture.js";
import {
  answerQuestion,
  createGame,
  startGame,
  MAX_MISTAKES,
  TOTAL_QUESTIONS,
  type GameConfig,
  type GameState,
} from "./game.js";
import type { Question } from "./question.js";

const CONFIG: GameConfig = { stageId: "t", totalQuestions: 5, maxMistakes: 3, seed: 1 };

function question(index: number, langId: string): Question {
  return {
    index,
    sourceCode: `${langId}-src`,
    answerLangId: langId,
    snippet: `s${index}`,
    direction: "ltr",
  };
}

function gameOf(langIds: readonly string[]): GameState {
  const questions = langIds.map((langId, i) => question(i, langId));
  return startGame({ ...CONFIG, totalQuestions: questions.length }, questions);
}

/** Answer the current question correctly. */
function answerRight(state: GameState): GameState {
  const q = state.questions[state.current];
  return answerQuestion(state, q?.answerLangId ?? "");
}

describe("startGame", () => {
  it("starts playing at question 0", () => {
    const state = gameOf(["eng", "fra"]);
    expect(state.status).toBe("playing");
    expect(state.current).toBe(0);
    expect(state.mistakes).toBe(0);
    expect(state.correct).toBe(0);
  });

  it("is immediately won with no questions", () => {
    expect(startGame(CONFIG, []).status).toBe("won");
  });
});

describe("answerQuestion", () => {
  it("records a correct answer and advances", () => {
    const state = answerQuestion(gameOf(["eng", "fra"]), "eng");
    expect(state.correct).toBe(1);
    expect(state.mistakes).toBe(0);
    expect(state.current).toBe(1);
    expect(state.answers).toHaveLength(1);
    expect(state.answers[0]?.correct).toBe(true);
  });

  it("counts a wrong answer as a mistake", () => {
    const state = answerQuestion(gameOf(["eng", "fra"]), "deu");
    expect(state.correct).toBe(0);
    expect(state.mistakes).toBe(1);
    expect(state.answers[0]?.correct).toBe(false);
    expect(state.answers[0]?.pickedLangId).toBe("deu");
  });

  it("accepts any script of the answer language (langId match)", () => {
    // The question's source is a specific script, but the answer is the langId.
    const questions: Question[] = [
      { index: 0, sourceCode: "sr_l", answerLangId: "srp", snippet: "x", direction: "ltr" },
    ];
    const state = answerQuestion(startGame({ ...CONFIG, totalQuestions: 1 }, questions), "srp");
    expect(state.status).toBe("won");
    expect(state.correct).toBe(1);
  });

  it("ends in defeat at exactly maxMistakes", () => {
    let state = gameOf(["eng", "fra", "deu", "rus", "spa"]);
    state = answerQuestion(state, "wrong");
    expect(state.status).toBe("playing");
    state = answerQuestion(state, "wrong");
    expect(state.status).toBe("playing");
    expect(state.mistakes).toBe(2);
    state = answerQuestion(state, "wrong");
    expect(state.mistakes).toBe(MAX_MISTAKES);
    expect(state.status).toBe("lost");
  });

  it("wins after answering every question", () => {
    let state = gameOf(["eng", "fra", "deu"]);
    state = answerRight(state);
    state = answerRight(state);
    expect(state.status).toBe("playing");
    state = answerRight(state);
    expect(state.status).toBe("won");
    expect(state.correct).toBe(3);
  });

  it("is a no-op once the game is over", () => {
    let state = gameOf(["eng"]);
    state = answerRight(state);
    expect(state.status).toBe("won");
    const after = answerQuestion(state, "anything");
    expect(after).toBe(state);
  });
});

describe("createGame", () => {
  it("wires a real run from the fixture and is deterministic", () => {
    const { sources, snippets, stage } = makeFixture();
    const a = createGame({ stage, sources, snippets, seed: 7 });
    const b = createGame({ stage, sources, snippets, seed: 7 });
    expect(a.questions).toEqual(b.questions);
    expect(a.questions).toHaveLength(TOTAL_QUESTIONS);
    expect(a.status).toBe("playing");
    expect(a.config.maxMistakes).toBe(MAX_MISTAKES);
  });
});
