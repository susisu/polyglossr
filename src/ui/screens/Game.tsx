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

// How long the revealed answer lingers before the next question auto-advances,
// and how long the verdict toast stays up (it outlives the advance on purpose).
const ADVANCE_DELAY_MS = 1000;
const TOAST_DURATION_MS = 2000;

/** The verdict toast shown after each answer (one at a time, never stacked). */
interface Toast {
  /** Bumped per answer so React remounts the node and the CSS animation restarts. */
  key: number;
  isCorrect: boolean;
  /** The correct answer's label. */
  answer: string;
  /** The player's wrong guess, or null when they were right. */
  guess: string | null;
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
  const [toast, setToast] = useState<Toast | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const options = useMemo(() => stageOptions(stage, locale), [stage, locale]);

  useEffect(() => {
    if (state.status !== "playing") onFinish(state);
  }, [state, onFinish]);

  // Drop any pending timers when the game unmounts (quit, finish, navigation).
  useEffect(
    () => () => {
      if (advanceTimer.current !== null) clearTimeout(advanceTimer.current);
      if (toastTimer.current !== null) clearTimeout(toastTimer.current);
    },
    [],
  );

  const question = state.questions[state.current];
  if (question === undefined) return <div className={styles["game"]} />;
  // Capture the fields handlePick needs: control-flow narrowing of `question`
  // isn't carried into the closure, but these consts keep their narrowed types.
  const { index: questionIndex, optionId: answerOptionId, sourceCode } = question;

  const source = sourceFor(sourceCode);
  const revealed = pickedOptionId !== null;
  const pickedCorrect = revealed && pickedOptionId === answerOptionId;

  function handlePick(optionId: string): void {
    if (revealed) return;
    const correct = optionId === answerOptionId;
    setPickedOptionId(optionId);
    setToast({
      key: questionIndex,
      isCorrect: correct,
      answer: sourceLabel(stage, sourceCode, answerOptionId, messages, locale),
      guess: correct ? null : stageOptionName(stage, optionId, locale),
    });
    // Reveal the verdict, then auto-advance; the toast lingers a beat longer.
    if (advanceTimer.current !== null) clearTimeout(advanceTimer.current);
    if (toastTimer.current !== null) clearTimeout(toastTimer.current);
    advanceTimer.current = setTimeout(() => {
      dispatch({ type: "answer", optionId });
      setPickedOptionId(null);
    }, ADVANCE_DELAY_MS);
    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, TOAST_DURATION_MS);
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

      <div className={styles["snippetSlot"]}>
        <SnippetPanel
          snippet={question.snippet}
          direction={question.direction}
          bcp47={source?.bcp47 ?? "und"}
        />
      </div>

      <OptionPicker
        key={`question-${question.index}`}
        options={options}
        onPick={handlePick}
        disabled={revealed}
        pickedOptionId={pickedOptionId}
        pickedCorrect={pickedCorrect}
      />

      {toast !== null && (
        <div
          key={`toast-${toast.key}`}
          role="status"
          aria-live="polite"
          className={clsx(
            styles["toast"],
            toast.isCorrect ? styles["toastCorrect"] : styles["toastIncorrect"],
          )}
        >
          <span className={styles["toastVerdict"]}>
            {toast.isCorrect ? messages.game.correct : messages.game.notQuite}
          </span>
          <span className={styles["toastAnswer"]}>{toast.answer}</span>
          {toast.guess !== null && (
            <span className={styles["toastGuess"]}>{messages.game.youGuessed(toast.guess)}</span>
          )}
        </div>
      )}
    </div>
  );
}
