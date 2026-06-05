# CLAUDE.md — UkeStart project memory

This file orients Claude Code (or any AI dev agent) on the UkeStart codebase. Read it first in every session. Keep it up to date as the project evolves.

## What this project is

UkeStart is a free, open-source ukulele learning web app. The product goal: get an absolute beginner from "I just unboxed a ukulele" to "I can strum a few songs" without paying for anything. The non-negotiable principle is **free and unencumbered** — that constrains content (public-domain songs only) and dependencies (no paid services).

## Bottom line for any change

Before you write code, know these three rules:

1. **Keep logic pure and in `src/lib/`.** Anything that can be a pure function (no DOM, no network, no `localStorage`) goes in `src/lib/` and gets a unit test. The DOM lives only in `src/ui/` and `src/main.js`. This separation is why the test suite is fast and reliable — do not erode it.
2. **Songs must be public domain or original.** Never add copyrighted lyrics, melodies, or tablature. If unsure about a song's status, do not add it. Chord shapes and progressions are fine; specific copyrighted lyric/tab text is not.
3. **The standalone build must keep working.** `standalone/UkeStart.html` is a zero-setup, offline, double-click file for non-technical learners. After meaningful changes, rebuild it (see below) and confirm it still renders.

## Architecture in one paragraph

Vanilla ES modules, no UI framework. `src/data/*` holds content (chords, songs, lessons) as plain data. `src/lib/*` holds pure logic. `src/ui/*` renders (SVG chord diagrams, Web Audio synth). `src/main.js` is the shell: it owns app state, tab routing, event delegation, and `localStorage` persistence. Vite bundles it; Vitest tests the pure layer; Playwright tests the rendered flow. Full detail in `docs/architecture.md`.

## Commands

```bash
npm install            # deps
npm run dev            # dev server on :5173
npm test               # Vitest unit run (fast — run this constantly)
npm run test:coverage  # coverage for src/lib
npm run test:e2e       # Playwright (needs: npm run test:e2e:install once)
npm run build          # vite build -> dist/
```

To rebuild the standalone single-file app after changes, run `npm run build:standalone` (it bundles `src/main.js` with esbuild and inlines it plus `src/styles.css` into `standalone/UkeStart.html`). Smoke-test by opening that file and clicking through the tabs.

## Conventions

- ES modules, `import`/`export`, no transpilation features beyond what Vite ships.
- Functions in `src/lib` are pure and individually exported (one concept per file: `chordLibrary`, `transpose`, `tuner`, `progress`).
- Chord fingerings use the `[G, C, E, A]` string order; `0` = open, `-1` = muted, `n` = fret. Finger numbers: 1 index, 2 middle, 3 ring, 4 pinky.
- HTML is built as strings and inserted via `innerHTML`; **always escape user-facing data** with the `esc()` helper to prevent injection.
- Persisted state lives under the `ukestart.progress.v1` localStorage key. Bump the version suffix if the shape changes, and migrate.

## Definition of done for a story

A story is done when: the behaviour works in `npm run dev`; new pure logic has Vitest tests and the whole suite passes; the e2e happy path still passes; the standalone build still renders; and `docs/` + this file are updated if the architecture changed.

## Where to look

- Roadmap and scope → `docs/prd.md`
- System design and decisions → `docs/architecture.md`
- Testing approach and why these tools → `docs/test-strategy.md`
- Work breakdown → `docs/epics/` and `docs/stories/`

## Implemented highlights worth knowing

- **Live microphone tuner.** `src/lib/pitch.js` is a pure autocorrelation pitch detector (unit-tested with synthetic sine waves); `src/ui/micTuner.js` owns `getUserMedia` + `AnalyserNode` and feeds samples to it each animation frame. The Tuner panel shows a live note, a cents needle, the nearest string, and an in-tune indicator, and falls back to reference tones when no mic is available. The mic stream is stopped when the user leaves the Tuner tab.

## Good next steps (backlog seeds)

These are unbuilt ideas, in rough priority order: a metronome with adjustable BPM and an audible click; an interactive "chord change trainer" that times your switches between two chords; spaced-repetition review of learned chords; export/import of progress as a file; a strum-pattern player that audibly demonstrates each pattern; and a calmer pitch display (median smoothing over a few frames) for the mic tuner. Each should be scoped as an epic + stories before building.
