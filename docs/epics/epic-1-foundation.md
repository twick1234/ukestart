# Epic 1 — Foundation & App Shell

> **Goal (governing thought):** Stand up a framework-free static app whose shell owns state, routing, and persistence, so every later feature plugs into a stable, testable spine.

## Why first
Nothing else can render without the shell. Getting the layering right here (data / pure logic / rendering / shell) is what keeps the whole project testable and hand-off ready.

## Scope
- Vite project with `index.html` entry and ES-module `src/main.js`.
- Tab routing across five panels (Learn, Chords, Songs, Tuner, Progress) via a single delegated click listener.
- Central `state` object; whole-panel re-render on change.
- `localStorage` load/save under a versioned key with a defensive merge loader.
- The "island workshop" visual system in `src/styles.css` (CSS variables, Fraunces + Spline Sans, paper texture).

## Stories
- 1.1 Project setup & build pipeline → `../stories/1.1.project-setup.md`
- 1.2 App shell, tab routing, and state
- 1.3 Progress persistence to localStorage

## Done when
The app boots, tabs switch, an empty progress object loads and saves, and the dev/build/standalone pipelines all produce a rendering page.
