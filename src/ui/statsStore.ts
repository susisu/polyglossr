import { createStatsStore, type StatsStore } from "../stats/storage.js";

let storePromise: Promise<StatsStore> | null = null;

/**
 * The app-wide stats store, created lazily on first use and shared thereafter.
 * Returns a promise because opening IndexedDB is async.
 */
export async function getStatsStore(): Promise<StatsStore> {
  storePromise ??= createStatsStore();
  return await storePromise;
}
