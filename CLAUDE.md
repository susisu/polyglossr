# PolyGlossr

A calm, browser-based language-guessing game. A short passage in some language is
shown; the player names the language. Built with TypeScript + React + Vite, client-only
(no server), deployable as a static site.

## What it is

- The player picks a **stage** (a curated set of languages with a name and difficulty 1–5),
  then answers **30 questions**; **3 mistakes** ends the game.
- Each question shows a ~10–20-word passage; the player answers by **free text input with
  suggestions** (not multiple choice), choosing from the stage's languages.
- Answers are judged by **logical language** (ISO 639-3), so e.g. "Serbian" is correct for
  either Cyrillic or Latin script. A single stage may include one language in multiple scripts.
- Play stats and full game history are stored in the browser (IndexedDB); the player can see
  their strongest / weakest languages and per-stage best scores.
- Passages come from the **Universal Declaration of Human Rights** (the same document in every
  language). The source/licensing is shown once, globally, on the About screen — never per
  question (that would reveal the answer).

## Commands

- `pnpm dev` — Vite dev server.
- `pnpm build` / `pnpm preview` — production build / preview.
- `pnpm generate` — regenerate `data/*.generated.json` from the `udhr` package (run after
  changing stages, difficulty, or the pipeline).
- `pnpm generate:check` — regenerate and fail if the committed data differs (CI drift guard).
- `pnpm typecheck` / `pnpm test` (`test:dev` for watch) / `pnpm lint(:check)` / `pnpm format(:check)`.

## Architecture

Single package. Strict layering, low → high: **`shared` → `data` → (`engine`, `stats`) → `ui`**.
A layer may only import lower layers; this is enforced by `no-restricted-imports` in
`eslint.config.js`. `engine` and `stats` are siblings (`stats` may use `engine`/`data` types,
not vice versa).

```
scripts/generate-data.ts   build-time pipeline: udhr HTML -> committed dataset JSON
data/                      languages.generated.json (runtime, pruned) + manifest.generated.json (all langs)
src/
  shared/    rng (seeded mulberry32), shuffle — pure, deterministic
  data/      source/language/stage/difficulty types, dataset loader (valibot), stages, selectors
  engine/    question generation + game state machine — pure, data-injected, fully tested
  stats/     Stats/GameRecord types, pure aggregation, IndexedDB store (+ in-memory fallback)
  ui/        App (screen state machine), screens/, components/, fonts.ts, styles.css (tokens)
.github/workflows/  ci.yml, deploy-pages.yml
```

## Key domain concepts

- **Source vs logical language.** A udhr `code` (e.g. `srp_cyrl`) is one _source_ = one
  (language × script), the dataset primary key and snippet supplier. Sources are grouped by
  `iso6393` into _logical languages_ (`srp` → "Serbian"), which are the answer / stats /
  suggestion unit. `bcp47` is **not** a reliable script discriminator (Simplified Chinese is
  bare `zh`); always key on `code` for sources and `iso6393` for languages.
- **Stages** (`src/data/stages.ts`) list source `code`s. The same `iso6393` may appear under
  multiple codes (e.g. the GeoGuessr stage has Serbian in both scripts). The picker dedupes to
  distinct logical languages. `stages.test.ts` checks every code resolves and that each stage
  has ≥ 5 distinct logical languages.
- **Snippet segmentation** (`scripts/generate-data.ts`) is script-aware: word windows for
  spaced scripts; grapheme windows for CJK and spaceless abugidas (Thai/Lao/Khmer/Myanmar/
  Ethiopic). Script class is detected by sampling code points, not by `bcp47`.
- **Determinism.** Generated JSON is timestamp-free and stably ordered, so `generate:check`
  diffs cleanly. The game run is a pure function of a seed (`createGame` / `generateRun`); the
  UI supplies a random seed, tests supply fixed ones.

## Data pipeline

`udhr` is a **dev dependency only** — the runtime imports the committed JSON, never the package
or its HTML. `generate-data.ts` filters by encoding stage (`MIN_STAGE`), drops `und`/missing/
too-few-snippet entries, normalizes names into `baseName` + `scriptLabel`, and **prunes the
runtime dataset to only the languages the stages reference** (so the bundle carries ~37 sources,
not 500). The `manifest.generated.json` lists every available language — consult it when
authoring stages. Unwanted specific variants are removed by a curated, by-name `MANUAL_EXCLUDE`
set (no general pattern) — e.g. historical orthographies `deu_1901`, `ell_polytonic`.

## Stats & history

History is the source of truth: each `GameRecord` carries a compact per-language tally, so the
aggregate `Stats` (per-language seen/correct, per-stage best, totals) is fully rebuildable from
history. The IndexedDB store (`games` + `meta` object stores) falls back to an in-memory store
when IndexedDB is unavailable, and requests persistent storage on startup. All aggregation is
pure (`src/stats/aggregate.ts`) and unit-tested; I/O is isolated in `storage.ts`.

## Conventions

- Modern TypeScript, strict base (`tsconfig.base.json`): `exactOptionalPropertyTypes`,
  `noUncheckedIndexedAccess`, `noPropertyAccessFromIndexSignature`, `verbatimModuleSyntax`,
  nodenext. Relative imports use `.js` extensions; types use `import type`.
- No `as` casts (`@susisu/safe-typescript`) — validate unknown input with **valibot** at
  boundaries (dataset load, persisted stats). JSDoc on exported declarations.
- CSS Modules accessed with **bracket notation** (`styles["card"]`) because of
  `noPropertyAccessFromIndexSignature`.
- Prettier width 100, double quotes, trailing commas. ESLint 10 flat config extending
  `@susisu/eslint-config`.
- **Testing:** internal logic is tested (shared/data/engine/stats); **UI tests are intentionally
  deferred** (the UI changes a lot) — mirror this when adding code.
- **Commits:** conventional-commit style, one logical unit each; prefer a new `fix:` commit over
  amending. Do **not** leak private/working shorthand (e.g. internal milestone labels) into
  commit messages or code comments — write for readers without that context.

## Notes & caveats

- **Licensing is required UI.** The About screen must keep the UDHR text attribution (United
  Nations / OHCHR, copyright-free) and the `udhr` package credit (© Titus Wormer, MIT). Keep a
  global, always-reachable credit link (footer).
- **No `ttb`.** udhr has zero top-to-bottom entries; `Direction` is `"ltr" | "rtl"` only.
  Traditional Mongolian comes through as `ltr`, low stage, and is filtered out.
- **Fonts.** Noto is self-hosted via `@fontsource` for glyph coverage (no tofu). Subsets
  load on demand via `unicode-range`, but the `@font-face` CSS itself is sizeable
  (~120 KB gzip, mostly CJK declarations) — an accepted tradeoff. CJK family is steered per
  language in `SnippetPanel` (`zh`→SC, `ja`→JP, `ko`→KR).
- **Deploy:** GitHub Pages project page. Vite `base` is `POLYGLOSSR_BASE` (set to `/polyglossr/`
  in the deploy workflow), default `/`. No client-side routing, so no SPA 404 fallback needed.
