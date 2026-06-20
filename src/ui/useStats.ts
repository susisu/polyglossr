import { useEffect, useState } from "react";
import { emptyStats } from "../stats/aggregate.js";
import type { Stats } from "../stats/stats.js";
import { getStatsStore } from "./statsStore.js";

/**
 * Load the aggregate stats once on mount. Returns empty stats until the async
 * read resolves; a failed read leaves the empty stats in place. Screens that
 * show stats re-mount on navigation, so this reloads after each game.
 */
export function useStats(): Stats {
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
  return stats;
}
