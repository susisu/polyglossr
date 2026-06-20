import clsx from "clsx";
import type { ReactElement } from "react";
import type { Stage } from "../../data/stage.js";
import { STAGES } from "../../data/stages.js";
import { useLocale, useMessages } from "../i18n/index.js";
import styles from "./StageSelect.module.css";

interface Props {
  onStart: (stage: Stage) => void;
}

function DifficultyDots({ value }: { value: number }): ReactElement {
  const messages = useMessages();
  return (
    <span
      className={styles["difficulty"]}
      aria-label={messages.stageSelect.difficultyLabel(value, 5)}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={clsx(styles["dot"], i < value && styles["dotOn"])} />
      ))}
    </span>
  );
}

/** Landing screen: pick a stage to play. */
export function StageSelect({ onStart }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  return (
    <div className={styles["screen"]}>
      <p className={styles["intro"]}>{messages.stageSelect.intro}</p>
      <ul className={styles["grid"]}>
        {STAGES.map((stage) => (
          <li key={stage.id}>
            <button
              type="button"
              className={styles["card"]}
              onClick={() => {
                onStart(stage);
              }}
            >
              <span className={styles["name"]}>{stage.name[locale]}</span>
              <span className={styles["desc"]}>{stage.description[locale]}</span>
              <span className={styles["meta"]}>
                <DifficultyDots value={stage.difficulty} />
                <span className={styles["count"]}>
                  {messages.stageSelect.optionCount(stage.options.length)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
