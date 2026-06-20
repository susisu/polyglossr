import { useEffect, useState, type ReactElement } from "react";
import { languageName } from "../../data/selectors.js";
import { getStage, STAGES } from "../../data/stages.js";
import { TOTAL_QUESTIONS } from "../../engine/game.js";
import {
  emptyStats,
  strongLanguages,
  weakLanguages,
  type RankedLanguage,
} from "../../stats/aggregate.js";
import type { GameRecord, Stats } from "../../stats/stats.js";
import { getStatsStore } from "../statsStore.js";
import styles from "./Stats.module.css";

interface Props {
  onHome: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function LanguageList({
  title,
  languages,
}: {
  title: string;
  languages: RankedLanguage[];
}): ReactElement {
  return (
    <section className={styles["section"]}>
      <h3 className={styles["subheading"]}>{title}</h3>
      <ul className={styles["langList"]}>
        {languages.map((language) => (
          <li key={language.langId} className={styles["langRow"]}>
            <span>{languageName(language.langId)}</span>
            <span className={styles["accuracy"]}>
              {Math.round(language.accuracy * 100)}%
              <span className={styles["seen"]}> · {language.seen} seen</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Player statistics: overview, strong/weak languages, per-stage bests, history. */
export function StatsScreen({ onHome }: Props): ReactElement {
  const [stats, setStats] = useState<Stats>(emptyStats);
  const [history, setHistory] = useState<readonly GameRecord[]>([]);

  useEffect(() => {
    let active = true;
    async function load(): Promise<void> {
      const store = await getStatsStore();
      const [loadedStats, loadedHistory] = await Promise.all([
        store.loadStats(),
        store.loadHistory(10),
      ]);
      if (active) {
        setStats(loadedStats);
        setHistory(loadedHistory);
      }
    }
    load().catch(() => {
      // Best-effort; leave the empty stats in place on failure.
    });
    return () => {
      active = false;
    };
  }, []);

  const strong = strongLanguages(stats, 5);
  const weak = weakLanguages(stats, 5);
  const playedStages = STAGES.filter((stage) => stats.perStage[stage.id] !== undefined);

  return (
    <div className={styles["screen"]}>
      <h2 className={styles["heading"]}>Your stats</h2>

      {stats.gamesPlayed === 0 ?
        <p className={styles["empty"]}>Play a game and your progress will appear here.</p>
      : <>
          <p className={styles["summary"]}>
            {stats.gamesPlayed} games · {stats.gamesWon} completed
          </p>

          {strong.length > 0 && <LanguageList title="Strongest" languages={strong} />}
          {weak.length > 0 && <LanguageList title="Needs work" languages={weak} />}

          {playedStages.length > 0 && (
            <section className={styles["section"]}>
              <h3 className={styles["subheading"]}>Best by stage</h3>
              <ul className={styles["stageList"]}>
                {playedStages.map((stage) => {
                  const stat = stats.perStage[stage.id];
                  if (stat === undefined) return null;
                  return (
                    <li key={stage.id} className={styles["stageRow"]}>
                      <span>{stage.name}</span>
                      <span className={styles["best"]}>
                        best {stat.bestCorrect}/{TOTAL_QUESTIONS}
                        <span className={styles["seen"]}> · {stat.played} played</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {history.length > 0 && (
            <section className={styles["section"]}>
              <h3 className={styles["subheading"]}>Recent games</h3>
              <ul className={styles["history"]}>
                {history.map((record) => (
                  <li key={record.id} className={styles["historyRow"]}>
                    <span>{getStage(record.stageId)?.name ?? record.stageId}</span>
                    <span className={styles["historyMeta"]}>
                      {record.correct}/{record.total} ·{" "}
                      {record.status === "won" ? "completed" : "lost"}
                      <span className={styles["seen"]}> · {formatDate(record.finishedAt)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      }

      <button type="button" className={styles["back"]} onClick={onHome}>
        Back to stages
      </button>
    </div>
  );
}
