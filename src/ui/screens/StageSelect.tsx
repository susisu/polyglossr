import type { ReactElement } from "react";
import { REGION_LABELS, REGION_ORDER } from "../../data/region.js";
import type { Stage } from "../../data/stage.js";
import { STAGES } from "../../data/stages.js";
import { TOTAL_QUESTIONS } from "../../engine/game.js";
import { DifficultyDots } from "../components/DifficultyDots.js";
import { useLocale, useMessages } from "../i18n/index.js";
import { useStats } from "../useStats.js";
import styles from "./StageSelect.module.css";

interface Props {
  onSelect: (stage: Stage) => void;
}

/**
 * Landing screen: pick a stage to play. Stages are grouped by region; a stage
 * tagged with several regions appears under each of them.
 */
export function StageSelect({ onSelect }: Props): ReactElement {
  const messages = useMessages();
  const { locale } = useLocale();
  const stats = useStats();
  return (
    <div className={styles["screen"]}>
      <p className={styles["intro"]}>{messages.stageSelect.intro}</p>
      {REGION_ORDER.map((region) => {
        const stages = STAGES.filter((stage) => stage.regions.includes(region));
        if (stages.length === 0) {
          return null;
        }
        return (
          <section key={region} className={styles["region"]}>
            <h2 className={styles["regionHeading"]}>{REGION_LABELS[region][locale]}</h2>
            <ul className={styles["grid"]}>
              {stages.map((stage) => {
                const stat = stats.perStage[stage.id];
                return (
                  <li key={stage.id}>
                    <button
                      type="button"
                      className={styles["card"]}
                      onClick={() => {
                        onSelect(stage);
                      }}
                    >
                      <span className={styles["name"]}>{stage.name[locale]}</span>
                      <span className={styles["desc"]}>{stage.description[locale]}</span>
                      <span className={styles["meta"]}>
                        <DifficultyDots value={stage.difficulty} />
                        <span className={styles["count"]}>
                          {stat ?
                            messages.stageSelect.best(stat.bestCorrect, TOTAL_QUESTIONS)
                          : messages.stageSelect.unplayed}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
