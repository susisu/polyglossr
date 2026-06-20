import * as v from "valibot";
import type { GameState } from "../engine/game.js";
import { rebuildStats, recordGame, toGameRecord } from "./aggregate.js";
import { GameRecordSchema, StatsSchema } from "./schema.js";
import { STATS_SCHEMA_VERSION, type GameRecord, type Stats } from "./stats.js";

const DB_NAME = "polyglossr";
const DB_VERSION = 1;
const STORE_GAMES = "games";
const STORE_META = "meta";
/** Single-row key in the meta store holding the aggregate stats cache. */
const META_KEY = "stats";

/** Persists game history and serves aggregate stats. */
export interface StatsStore {
  /** The aggregate stats (from the cache, or rebuilt from history if stale). */
  loadStats(): Promise<Stats>;
  /** Game history, newest first; capped to `limit` when given. */
  loadHistory(limit?: number): Promise<GameRecord[]>;
  /** Persist a finished game and return the updated stats + the stored record. */
  record(state: GameState, now: number): Promise<{ stats: Stats; record: GameRecord }>;
}

/** Whether IndexedDB is usable in the current environment. */
export function isIndexedDbAvailable(): boolean {
  try {
    return typeof indexedDB !== "undefined";
  } catch {
    return false;
  }
}

/** Open (or upgrade) the polyglossr IndexedDB database. */
export async function openDatabase(factory: IDBFactory = indexedDB): Promise<IDBDatabase> {
  return await new Promise((resolve, reject) => {
    const request = factory.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (): void => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_GAMES)) {
        const games = db.createObjectStore(STORE_GAMES, { keyPath: "id" });
        games.createIndex("stageId", "stageId");
        games.createIndex("finishedAt", "finishedAt");
      }
      if (!db.objectStoreNames.contains(STORE_META)) {
        db.createObjectStore(STORE_META, { keyPath: "key" });
      }
    };
    request.onsuccess = (): void => {
      resolve(request.result);
    };
    request.onerror = (): void => {
      reject(request.error ?? new Error("IndexedDB open failed"));
    };
  });
}

async function requestResult(request: IDBRequest): Promise<unknown> {
  return await new Promise((resolve, reject) => {
    request.onsuccess = (): void => {
      resolve(request.result);
    };
    request.onerror = (): void => {
      reject(request.error ?? new Error("IndexedDB request failed"));
    };
  });
}

async function transactionDone(tx: IDBTransaction): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = (): void => {
      resolve();
    };
    tx.onerror = (): void => {
      reject(tx.error ?? new Error("IndexedDB transaction failed"));
    };
    tx.onabort = (): void => {
      reject(tx.error ?? new Error("IndexedDB transaction aborted"));
    };
  });
}

/** Read and validate every stored game record. Invalid rows are skipped. */
async function readAllRecords(db: IDBDatabase): Promise<GameRecord[]> {
  const tx = db.transaction(STORE_GAMES, "readonly");
  const raw = await requestResult(tx.objectStore(STORE_GAMES).getAll());
  const rows = v.parse(v.array(v.unknown()), raw);
  const records: GameRecord[] = [];
  for (const row of rows) {
    const parsed = v.safeParse(GameRecordSchema, row);
    if (parsed.success) records.push(parsed.output);
  }
  return records;
}

const MetaRowSchema = v.object({ key: v.string(), stats: StatsSchema });

/** IndexedDB-backed store. */
class IndexedDbStatsStore implements StatsStore {
  readonly #db: IDBDatabase;

  constructor(db: IDBDatabase) {
    this.#db = db;
  }

  async loadStats(): Promise<Stats> {
    const tx = this.#db.transaction(STORE_META, "readonly");
    const raw = await requestResult(tx.objectStore(STORE_META).get(META_KEY));
    const parsed = v.safeParse(MetaRowSchema, raw);
    if (parsed.success && parsed.output.stats.schemaVersion === STATS_SCHEMA_VERSION) {
      return parsed.output.stats;
    }
    // Cache missing or stale: rebuild from history (the source of truth).
    return rebuildStats(await readAllRecords(this.#db));
  }

  async loadHistory(limit?: number): Promise<GameRecord[]> {
    const records = sortNewestFirst(await readAllRecords(this.#db));
    return limit === undefined ? records : records.slice(0, limit);
  }

  async record(state: GameState, now: number): Promise<{ stats: Stats; record: GameRecord }> {
    const record = toGameRecord(state, now);
    const stats = recordGame(await this.loadStats(), record);
    const tx = this.#db.transaction([STORE_GAMES, STORE_META], "readwrite");
    tx.objectStore(STORE_GAMES).put(record);
    tx.objectStore(STORE_META).put({ key: META_KEY, stats });
    await transactionDone(tx);
    return { stats, record };
  }
}

/** In-memory fallback when IndexedDB is unavailable (data is lost on reload). */
class InMemoryStatsStore implements StatsStore {
  readonly #records: GameRecord[] = [];

  // eslint-disable-next-line @typescript-eslint/require-await -- satisfies the async StatsStore interface; no I/O to await.
  async loadStats(): Promise<Stats> {
    return rebuildStats(this.#records);
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- satisfies the async StatsStore interface; no I/O to await.
  async loadHistory(limit?: number): Promise<GameRecord[]> {
    const records = sortNewestFirst([...this.#records]);
    return limit === undefined ? records : records.slice(0, limit);
  }

  // eslint-disable-next-line @typescript-eslint/require-await -- satisfies the async StatsStore interface; no I/O to await.
  async record(state: GameState, now: number): Promise<{ stats: Stats; record: GameRecord }> {
    const record = toGameRecord(state, now);
    this.#records.push(record);
    return { stats: rebuildStats(this.#records), record };
  }
}

function sortNewestFirst(records: GameRecord[]): GameRecord[] {
  return records.sort(
    (a, b) => b.finishedAt.localeCompare(a.finishedAt) || b.id.localeCompare(a.id),
  );
}

/**
 * Create the stats store, preferring IndexedDB and falling back to an in-memory
 * store when IndexedDB is missing or fails to open. Pass a `factory` in tests.
 */
export async function createStatsStore(factory?: IDBFactory): Promise<StatsStore> {
  const resolved = factory ?? (isIndexedDbAvailable() ? indexedDB : null);
  if (resolved === null) return new InMemoryStatsStore();
  try {
    return new IndexedDbStatsStore(await openDatabase(resolved));
  } catch {
    return new InMemoryStatsStore();
  }
}

/** Ask the browser to make storage persistent (reduces eviction risk). */
export async function requestPersistence(): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined") {
      return await navigator.storage.persist();
    }
  } catch {
    // Best-effort; older browsers may lack navigator.storage.persist.
  }
  return false;
}
