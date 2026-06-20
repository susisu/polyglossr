import type { Rng } from "./rng.js";

/**
 * Return a new array with the elements of `items` in a random order.
 *
 * Implemented by tagging each element with a uniform random key and sorting by
 * it (a "decorate–sort–undecorate"). This yields an unbiased permutation while
 * staying index-access-free, so it type-checks cleanly under
 * `noUncheckedIndexedAccess`. The order is fully determined by `rng`, so a
 * seeded `Rng` makes the result reproducible.
 */
export function shuffle<T>(items: readonly T[], rng: Rng): T[] {
  return items
    .map((item) => ({ item, key: rng() }))
    .sort((a, b) => a.key - b.key)
    .map(({ item }) => item);
}
