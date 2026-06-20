import clsx from "clsx";
import { useEffect, useRef, type ReactElement } from "react";
import { languageName, sourceFor } from "../../data/selectors.js";
import { getStage } from "../../data/stages.js";
import type { GameState } from "../../engine/game.js";
import { useLocale, useMessages } from "../i18n/index.js";
import { getStatsStore } from "../statsStore.js";
import styles from "./Result.module.css";

interface Props {
  gameState: GameState;
  onPlayAgain: () => void;
  onHome: () => void;
}

/** End-of-game screen: score, per-question review, and stats recording. */
export function Result({ gameState, onPlayAgain, onHome }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  const recorded = useRef(false);

  useEffect(() => {
    // Record exactly once, even under StrictMode's double-invoke.
    if (recorded.current) return;
    recorded.current = true;
    async function persist(): Promise<void> {
      const store = await getStatsStore();
      await store.record(gameState, Date.now());
    }
    persist().catch(() => {
      // Best-effort; a failed write shouldn't break the results screen.
    });
  }, [gameState]);

  const stage = getStage(gameState.config.stageId);
  const won = gameState.status === "won";

  return (
    <div className={styles["screen"]}>
      <p className={styles["outcome"]}>{won ? messages.result.won : messages.result.lost}</p>
      <h2 className={styles["score"]}>{messages.result.correctCount(gameState.correct)}</h2>
      <p className={styles["sub"]}>
        {messages.result.subtitle(
          stage ? stage.name[locale] : gameState.config.stageId,
          gameState.answers.length,
        )}
      </p>

      <div className={styles["actions"]}>
        <button type="button" className={styles["primary"]} onClick={onPlayAgain}>
          {messages.result.playAgain}
        </button>
        <button type="button" className={styles["secondary"]} onClick={onHome}>
          {messages.result.stages}
        </button>
      </div>

      <ol className={styles["review"]}>
        {gameState.answers.map((answer) => {
          const question = gameState.questions[answer.questionIndex];
          const source = sourceFor(answer.sourceCode);
          return (
            <li key={answer.questionIndex} className={styles["row"]}>
              <span
                className={clsx(styles["mark"], answer.correct ? styles["ok"] : styles["no"])}
                aria-hidden="true"
              />
              <span
                className={styles["snippet"]}
                dir={source?.direction ?? "ltr"}
                lang={source?.bcp47 ?? "und"}
              >
                {question?.snippet ?? ""}
              </span>
              <span className={styles["verdict"]}>
                <span className={styles["answer"]}>
                  {languageName(answer.answerLangId, locale)}
                </span>
                {!answer.correct && (
                  <span className={styles["guess"]}>
                    {messages.result.yourGuess(languageName(answer.pickedLangId, locale))}
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
