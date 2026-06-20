# PolyGlossr

A calm, browser-based language-guessing game. A short passage in some language is
shown; the player names the language. Built with TypeScript + React + Vite, client-only
(no server), deployable as a static site.

## What it is

- The player picks a **stage** (a curated set of answer **options**, tagged by `category` —
  what the options are: languages, families, or writing systems — and `region`), then answers
  **20 questions**; **3 mistakes** ends the game. The stage select groups stages by region
  (`world` first). Selecting a stage opens a **stage detail** screen (overview + the player's
  strong/weak options) before the game starts.
- Each question shows a ~10–20-word passage; the player answers by **free text input with
  suggestions** (not multiple choice), choosing from the stage's **options**.
- Answers are judged by the **stage option** the snippet was drawn from. An option is currently
  one logical language (so "Serbian" is correct for either Cyrillic or Latin — both scripts are
  grouped into one option), but the model also allows an option to be a writing system or a
  language family.
- Play stats and full game history are stored in the browser (IndexedDB); stats are scoped
  **per stage** — best scores, plus the player's strongest / weakest options within each stage.
- Passages come from the **Universal Declaration of Human Rights** (the same document in every
  language). The source/licensing is shown once, globally, on the About screen — never per
  question (that would reveal the answer).

## Commands

- `pnpm dev` — Vite dev server.
- `pnpm build` / `pnpm preview` — production build / preview.
- `pnpm generate` — regenerate `data/*.generated.json` from the `udhr` package (run after
  changing stages or the pipeline).
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
  data/      source/language/stage/region types, dataset loader (valibot), stages, selectors
  engine/    question generation + game state machine — pure, data-injected, fully tested
  stats/     Stats/GameRecord types, pure aggregation, IndexedDB store (+ in-memory fallback)
  ui/        App (screen state machine), screens/, components/, fonts.ts, styles.css (tokens)
.github/workflows/  ci.yml, deploy-pages.yml
```

## Key domain concepts

- **Source vs logical language.** A udhr `code` (e.g. `srp_cyrl`) is one _source_ = one
  (language × script), the dataset primary key and snippet supplier. Sources are grouped by
  `iso6393` into _logical languages_ (`srp` → "Serbian"). `bcp47` is **not** a reliable script
  discriminator (Simplified Chinese is bare `zh`); always key on `code` for sources and
  `iso6393` for languages.
- **Stages and options** (`src/data/stages.ts`). A stage lists **options**; each option has a
  stable `id` (the answer + stats key, currently an ISO 639-3 code), an optional `label`, and
  one or more source `code`s. A question first picks an option, then a code within it — so each
  option carries equal weight regardless of how many codes it bundles. Scripts/variants of one
  language share a single option (e.g. Serbian `srp_cyrl` + `srp_latn`) so it stays weighted as
  one. An option with no `label` is named by its single logical language (the picker matches on
  localized + English name); an option spanning multiple languages (a future script/family)
  must carry a `label`. `stages.test.ts` checks every code resolves, option ids are unique
  within a stage, and multi-language options have a label.
- **Stage taxonomy.** Each stage carries a `category` (`"language" | "family" | "script"` —
  what its _options_ are; family-themed stages like Romance are still `"language"` because their
  options are individual languages) and `regions` (geographic tags from `src/data/region.ts`).
  Regions are tags, not a partition: a stage may carry several (MENA is `["asia", "africa"]`),
  and `"world"` is exclusive — it marks stages with no particular home and is never combined with
  a geographic region. The stage select renders one section per region (`world` first), so a
  multi-region stage shows under each. There is **deliberately no difficulty rating**: scoring
  languages by difficulty passes judgment on their speakers; the "Easy"/"Hard" in some stage
  names refers only to how many options the stage has.
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
runtime dataset to only the sources the stages reference** (so the bundle carries ~140 sources,
not 500+). The `manifest.generated.json` lists every available language — consult it when
authoring stages. Unwanted specific variants are removed by a curated, by-name `MANUAL_EXCLUDE`
set (no general pattern) — e.g. historical orthographies `deu_1901`, `ell_polytonic`.

## Stats & history

History is the source of truth: each `GameRecord` carries a compact per-option tally, so the
aggregate `Stats` is fully rebuildable from history. Stats are keyed by **`(stageId, optionId)`**
— identification difficulty depends on the stage's confusion set, so a global per-language tally
would be ill-defined; `Stats` holds per-stage best/played plus per-option seen/correct within
each stage, and overall totals. The IndexedDB store (`games` + `meta` object stores) falls back
to an in-memory store when IndexedDB is unavailable, and requests persistent storage on startup.
All aggregation is pure (`src/stats/aggregate.ts`) and unit-tested; I/O is isolated in
`storage.ts`.

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
  Nations / OHCHR, copyright-free) and the `udhr` package credit (© Titus Wormer, MIT). Keep the
  About screen reachable from the global header nav so the credit is always one tap away.
- **No `ttb`.** udhr has zero top-to-bottom entries; `Direction` is `"ltr" | "rtl"` only.
  Traditional Mongolian comes through as `ltr`, low stage, and is filtered out.
- **Fonts.** Noto is self-hosted via `@fontsource` for glyph coverage (no tofu). Subsets
  load on demand via `unicode-range`, but the `@font-face` CSS itself is sizeable
  (~120 KB gzip, mostly CJK declarations) — an accepted tradeoff. CJK family is steered per
  language in `SnippetPanel` (`zh`→SC, `ja`→JP, `ko`→KR).
- **Deploy:** GitHub Pages project page. Vite `base` is `POLYGLOSSR_BASE` (set to `/polyglossr/`
  in the deploy workflow), default `/`. No client-side routing, so no SPA 404 fallback needed.
