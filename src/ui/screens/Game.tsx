import clsx from "clsx";
import { useEffect, useMemo, useReducer, useRef, useState, type ReactElement } from "react";
import { dataset } from "../../data/dataset.js";
import { languageName, sourceFor, stageLanguages } from "../../data/selectors.js";
import type { Stage } from "../../data/stage.js";
import { answerQuestion, createGame, type GameState } from "../../engine/game.js";
import { LanguagePicker } from "../components/LanguagePicker.js";
import { SnippetPanel } from "../components/SnippetPanel.js";
import { useMessages } from "../i18n/index.js";
import type { Messages } from "../i18n/messages.js";
import styles from "./Game.module.css";

interface Props {
  stage: Stage;
  seed: number;
  onFinish: (state: GameState) => void;
  onQuit: () => void;
}

type Action = { type: "answer"; langId: string };

function reducer(state: GameState, action: Action): GameState {
  return answerQuestion(state, action.langId);
}

/** Label a source as "Language · Script", e.g. "Serbian · Cyrillic". */
function sourceLabel(sourceCode: string, answerLangId: string, messages: Messages): string {
  const source = sourceFor(sourceCode);
  const base = languageName(answerLangId);
  return source?.scriptLabel ? messages.game.sourceLabel(base, source.scriptLabel) : base;
}

/** The active game: shows a snippet, takes a guess, reveals the answer, advances. */
export function Game({ stage, seed, onFinish, onQuit }: Props): ReactElement {
  const messages = useMessages();
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createGame({ stage, sources: dataset.sources, snippets: dataset.snippets, seed }),
  );
  // The language id the player picked for the current question, while its
  // answer is revealed; null while they are still choosing.
  const [pickedLangId, setPickedLangId] = useState<string | null>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  const languages = useMemo(() => stageLanguages(stage), [stage]);

  useEffect(() => {
    if (state.status !== "playing") onFinish(state);
  }, [state, onFinish]);

  useEffect(() => {
    if (pickedLangId !== null) continueRef.current?.focus();
  }, [pickedLangId]);

  const question = state.questions[state.current];
  if (question === undefined) return <div className={styles["game"]} />;

  const source = sourceFor(question.sourceCode);
  const revealed = pickedLangId !== null;
  const isCorrect = revealed && pickedLangId === question.answerLangId;

  function handlePick(langId: string): void {
    if (!revealed) setPickedLangId(langId);
  }

  function handleContinue(): void {
    if (pickedLangId === null) return;
    dispatch({ type: "answer", langId: pickedLangId });
    setPickedLangId(null);
  }

  return (
    <div className={styles["game"]}>
      <header className={styles["bar"]}>
        <span className={styles["progress"]}>
          {messages.game.progress(state.current + 1, state.config.totalQuestions)}
        </span>
        <span
          className={styles["lives"]}
          aria-label={messages.game.mistakesLabel(state.mistakes, state.config.maxMistakes)}
        >
          {Array.from({ length: state.config.maxMistakes }, (_, i) => (
            <span
              key={i}
              className={clsx(styles["life"], i < state.mistakes && styles["lifeLost"])}
            />
          ))}
        </span>
        <button type="button" className={styles["quit"]} onClick={onQuit}>
          {messages.game.quit}
        </button>
      </header>

      <SnippetPanel
        snippet={question.snippet}
        direction={question.direction}
        bcp47={source?.bcp47 ?? "und"}
      />

      {revealed ?
        <div
          className={clsx(styles["feedback"], isCorrect ? styles["correct"] : styles["incorrect"])}
        >
          <p className={styles["verdict"]}>
            {isCorrect ? messages.game.correct : messages.game.notQuite}
          </p>
          <p className={styles["answer"]}>
            {sourceLabel(question.sourceCode, question.answerLangId, messages)}
          </p>
          {!isCorrect && (
            <p className={styles["yourGuess"]}>
              {messages.game.youGuessed(languageName(pickedLangId))}
            </p>
          )}
          <button
            ref={continueRef}
            type="button"
            className={styles["continue"]}
            onClick={handleContinue}
          >
            {messages.game.continue}
          </button>
        </div>
      : <LanguagePicker
          key={question.index}
          languages={languages}
          onPick={handlePick}
          disabled={false}
        />
      }
    </div>
  );
}
