import clsx from "clsx";
import { useEffect, useMemo, useReducer, useRef, useState, type ReactElement } from "react";
import { dataset } from "../../data/dataset.js";
import {
  languageName,
  scriptLabel,
  sourceFor,
  stageOptionName,
  stageOptions,
} from "../../data/selectors.js";
import type { Locale } from "../../shared/locale.js";
import type { Stage } from "../../data/stage.js";
import { answerQuestion, createGame, type GameState } from "../../engine/game.js";
import { OptionPicker } from "../components/OptionPicker.js";
import { SnippetPanel } from "../components/SnippetPanel.js";
import { useLocale, useMessages } from "../i18n/index.js";
import type { Messages } from "../i18n/messages.js";
import styles from "./Game.module.css";

interface Props {
  stage: Stage;
  seed: number;
  onFinish: (state: GameState) => void;
  onQuit: () => void;
}

type Action = { type: "answer"; optionId: string };

function reducer(state: GameState, action: Action): GameState {
  return answerQuestion(state, action.optionId);
}

/**
 * Label the correct answer for the post-game reveal, joining the parts with the
 * locale separator. For a labeled option (e.g. a writing system) the label alone
 * doesn't say which language the snippet was, so append the language name and
 * the script/variant if any: "Latin · Spanish" or "Han · Chinese · Simplified".
 * For an unlabeled option (a single language) the name is already the language,
 * so append only the script/variant of the actual source: "Serbian · Cyrillic".
 */
function sourceLabel(
  stage: Stage,
  sourceCode: string,
  optionId: string,
  messages: Messages,
  locale: Locale,
): string {
  const base = stageOptionName(stage, optionId, locale);
  const labeled = stage.options.find((o) => o.id === optionId)?.label !== undefined;
  const script = scriptLabel(sourceCode, locale);
  const lang = labeled ? languageNameOf(sourceCode, locale) : null;
  const parts = [base, lang, script].filter((part): part is string => part !== null);
  return parts.reduce((acc, part) => messages.game.sourceLabel(acc, part));
}

/** Language name for a source code, or null if the code is unknown. */
function languageNameOf(sourceCode: string, locale: Locale): string | null {
  const langId = sourceFor(sourceCode)?.langId;
  return langId !== undefined ? languageName(langId, locale) : null;
}

/** The active game: shows a snippet, takes a guess, reveals the answer, advances. */
export function Game({ stage, seed, onFinish, onQuit }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    createGame({ stage, sources: dataset.sources, snippets: dataset.snippets, seed }),
  );
  // The option id the player picked for the current question, while its answer
  // is revealed; null while they are still choosing.
  const [pickedOptionId, setPickedOptionId] = useState<string | null>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  const options = useMemo(() => stageOptions(stage, locale), [stage, locale]);

  useEffect(() => {
    if (state.status !== "playing") onFinish(state);
  }, [state, onFinish]);

  useEffect(() => {
    if (pickedOptionId !== null) continueRef.current?.focus();
  }, [pickedOptionId]);

  const question = state.questions[state.current];
  if (question === undefined) return <div className={styles["game"]} />;

  const source = sourceFor(question.sourceCode);
  const revealed = pickedOptionId !== null;
  const isCorrect = revealed && pickedOptionId === question.optionId;

  function handlePick(optionId: string): void {
    if (!revealed) setPickedOptionId(optionId);
  }

  function handleContinue(): void {
    if (pickedOptionId === null) return;
    dispatch({ type: "answer", optionId: pickedOptionId });
    setPickedOptionId(null);
  }

  return (
    <div className={styles["game"]}>
      <header className={styles["bar"]}>
        <span className={styles["stage"]}>{stage.name[locale]}</span>
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
            {sourceLabel(stage, question.sourceCode, question.optionId, messages, locale)}
          </p>
          {!isCorrect && (
            <p className={styles["yourGuess"]}>
              {messages.game.youGuessed(stageOptionName(stage, pickedOptionId, locale))}
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
      : <OptionPicker key={question.index} options={options} onPick={handlePick} disabled={false} />
      }
    </div>
  );
}
