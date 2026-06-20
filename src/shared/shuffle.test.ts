import { describe, expect, it } from "vitest";
import { mulberry32 } from "./rng.js";
import { shuffle } from "./shuffle.js";

describe("shuffle", () => {
  it("is deterministic for the same seed", () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const a = shuffle(items, mulberry32(123));
    const b = shuffle(items, mulberry32(123));
    expect(a).toEqual(b);
  });

  it("preserves the multiset of elements", () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const result = shuffle(items, mulberry32(99));
    expect([...result].sort((x, y) => x - y)).toEqual(items);
  });

  it("does not mutate the input", () => {
    const items = [1, 2, 3, 4, 5];
    const copy = [...items];
    shuffle(items, mulberry32(1));
    expect(items).toEqual(copy);
  });

  it("usually reorders a non-trivial array", () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const result = shuffle(items, mulberry32(7));
    expect(result).not.toEqual(items);
  });

  it("handles empty and singleton arrays", () => {
    expect(shuffle([], mulberry32(1))).toEqual([]);
    expect(shuffle([42], mulberry32(1))).toEqual([42]);
  });
});
