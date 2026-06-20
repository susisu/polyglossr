import type { ReactElement } from "react";
import { stageOptionName } from "../../data/selectors.js";
import type { Stage } from "../../data/stage.js";
import { TOTAL_QUESTIONS } from "../../engine/game.js";
import {
  stageProgress,
  strongOptions,
  weakOptions,
  type RankedOption,
} from "../../stats/aggregate.js";
import { useLocale, useMessages } from "../i18n/index.js";
import { useStats } from "../useStats.js";
import styles from "./StageDetail.module.css";

interface Props {
  stage: Stage;
  onStart: () => void;
  onBack: () => void;
}

/** A strong/weak list of the stage's options, ranked by accuracy. */
function OptionList({
  stage,
  title,
  options,
}: {
  stage: Stage;
  title: string;
  options: readonly RankedOption[];
}): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  return (
    <section className={styles["section"]}>
      <h3 className={styles["subheading"]}>{title}</h3>
      <ul className={styles["list"]}>
        {options.map((option) => (
          <li key={option.optionId} className={styles["row"]}>
            <span>{stageOptionName(stage, option.optionId, locale)}</span>
            <span className={styles["accuracy"]}>
              {Math.round(option.accuracy * 100)}%
              <span className={styles["seen"]}>
                {" · "}
                {messages.stageDetail.seenCount(option.seen)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Pre-game screen: stage overview plus the player's strengths/weaknesses in it. */
export function StageDetail({ stage, onStart, onBack }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  const stats = useStats();
  const stat = stats.perStage[stage.id];
  const strong = stat !== undefined ? strongOptions(stat, 5) : [];
  const weak = stat !== undefined ? weakOptions(stat, 5) : [];

  return (
    <div className={styles["screen"]}>
      <h2 className={styles["heading"]}>{stage.name[locale]}</h2>
      <p className={styles["desc"]}>{stage.description[locale]}</p>
      {stat !== undefined && (
        <div className={styles["meta"]}>
          <span className={styles["record"]}>
            <span className={`${styles["best"]} ${styles[stageProgress(stat, TOTAL_QUESTIONS)]}`}>
              {messages.stageDetail.best(stat.bestCorrect, TOTAL_QUESTIONS)}
            </span>
            <span className={styles["seen"]}>{messages.stageDetail.played(stat.played)}</span>
          </span>
        </div>
      )}

      <div className={styles["actions"]}>
        <button type="button" className={styles["primary"]} onClick={onStart}>
          {messages.stageDetail.play}
        </button>
        <button type="button" className={styles["secondary"]} onClick={onBack}>
          {messages.stageDetail.back}
        </button>
      </div>

      {stat === undefined ?
        <p className={styles["empty"]}>{messages.stageDetail.unplayed}</p>
      : <>
          {strong.length > 0 && (
            <OptionList stage={stage} title={messages.stageDetail.strong} options={strong} />
          )}
          {weak.length > 0 && (
            <OptionList stage={stage} title={messages.stageDetail.needsWork} options={weak} />
          )}
        </>
      }
    </div>
  );
}
