import { useEffect, useState, type ReactElement } from "react";
import { emptyStats } from "../../stats/aggregate.js";
import type { Stats } from "../../stats/stats.js";
import { getStatsStore } from "../statsStore.js";
import styles from "./Stats.module.css";

interface Props {
  onHome: () => void;
}

/** Player statistics. Strong/weak languages and history are added later. */
export function StatsScreen({ onHome }: Props): ReactElement {
  const [stats, setStats] = useState<Stats>(emptyStats);

  useEffect(() => {
    let active = true;
    async function load(): Promise<void> {
      const store = await getStatsStore();
      const loaded = await store.loadStats();
      if (active) setStats(loaded);
    }
    load().catch(() => {
      // Best-effort; leave the empty stats in place on failure.
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={styles["screen"]}>
      <h2 className={styles["heading"]}>Your stats</h2>
      {stats.gamesPlayed === 0 ?
        <p className={styles["empty"]}>Play a game and your progress will appear here.</p>
      : <p className={styles["summary"]}>
          {stats.gamesPlayed} games · {stats.gamesWon} completed
        </p>
      }
      <button type="button" className={styles["back"]} onClick={onHome}>
        Back to stages
      </button>
    </div>
  );
}
