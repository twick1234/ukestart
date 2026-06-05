# Architecture — UkeStart

> **BMAD artifact:** Architecture · **Structure:** Minto pyramid · **Audience:** any developer or AI agent continuing the project

---

## 1. Governing thought

**UkeStart is a deliberately framework-free, three-layer static web app — data, pure logic, and rendering — because that structure makes it trivially free to host, fast to load, offline-capable, and unusually easy to test and hand off.**

The three sections below support this: the layering, the key decisions behind it, and the runtime/build/test pipeline.

---

## 2. The three layers (and the one rule between them)

The codebase is split so that **only the rendering layer is allowed to touch the browser.** Everything testable is kept pure.

```
┌─────────────────────────────────────────────┐
│  src/data/   content as plain objects         │  no behaviour
│  chords.js · songs.js · lessons.js            │
├─────────────────────────────────────────────┤
│  src/lib/    PURE logic (no DOM/IO)           │  100% unit-tested
│  chordLibrary · transpose · tuner · progress  │
│  pitch (autocorrelation detection)            │
├─────────────────────────────────────────────┤
│  src/ui/     rendering & effects              │  DOM + Web Audio
│  chordDiagram (string) · audio (Web Audio)    │
│  micTuner (getUserMedia + AnalyserNode)       │
├─────────────────────────────────────────────┤
│  src/main.js  app shell                       │  state, routing,
│  state · tab routing · events · localStorage  │  persistence
└─────────────────────────────────────────────┘
```

- **Data layer** is inert: chord fingerings, songs, lessons. Changing content never touches logic.
- **Logic layer** is pure functions, one concept per file. No `window`, no `fetch`, no `localStorage`. This is the layer the unit tests hit directly.
- **Rendering layer** turns data + logic into SVG strings and audio. `chordDiagram.js` returns a string (so even it is testable); `audio.js` guards on the absence of `window` so it no-ops in tests.
- **Shell** (`main.js`) is the only stateful, browser-coupled module: it holds `state`, renders panels via `innerHTML`, delegates events from a single listener, and persists progress to `localStorage`.

**The rule:** if a function *can* be pure, it lives in `src/lib/` with a test. Pushing logic up into the shell is the main way this design degrades — resist it.

The **live microphone tuner** is the clearest example of the layering paying off: the hard part — autocorrelation pitch detection — is a pure function in `src/lib/pitch.js` that takes a sample buffer and returns a frequency, so it is tested deterministically against synthetic sine waves with no browser. The browser-only part (`getUserMedia`, `AnalyserNode`, the animation loop) is quarantined in `src/ui/micTuner.js`, which simply streams samples into the pure detector and reports results through callbacks. The shell wires those callbacks to direct DOM updates and stops the mic stream when the user leaves the tab.

---

## 3. Key decisions (decision → rationale)

| Decision | Why |
|---|---|
| **No UI framework (vanilla ES modules)** | The app is small and content-driven. A framework would add a runtime, a build dependency, and a learning curve for contributors, buying little. Vanilla keeps the bundle ≈18 kB and the mental model tiny. |
| **Pure-logic layer separated from DOM** | Makes the valuable logic (transposition, tuning math, streak rules) fast and deterministic to test without a browser, and reusable if a framework is ever adopted. |
| **Chord diagrams as SVG strings, not canvas** | SVG scales crisply, is accessible (`aria-label`), styles via CSS variables, and is assertable in tests as a string. |
| **Web Audio synth instead of audio files** | Keeps the app dependency-free and offline-capable; no licensing or asset-hosting concerns; tiny footprint. |
| **localStorage for progress, no backend** | Honours the "no account, no tracking, free" principle and keeps the app fully static. Versioned key (`...v1`) allows future migration. |
| **Two builds: Vite app + inlined standalone** | The Vite build serves developers; the inlined single file serves non-technical learners who just want to double-click and play. |
| **Public-domain/original content only** | Legal cleanliness is a product requirement, not an afterthought; it keeps the project freely copyable. |

---

## 4. Runtime, build, and test pipeline

- **Runtime.** A static page loads `index.html`, which pulls `src/main.js` as a module. On `DOMContentLoaded`, `mount()` attaches one delegated click listener and renders the active tab. State changes re-render the whole active panel — cheap, because panels are small and there is no virtual DOM to reconcile.
- **State & persistence.** `state` holds the active tab, the progress object, and per-song transpose offsets. Progress is loaded from and saved to `localStorage` under `ukestart.progress.v1`; the loader merges over `emptyProgress()` so older/partial saves never crash.
- **Build.** `vite build` emits an optimised `dist/`. A separate esbuild step bundles `main.js` into a minified IIFE and inlines it with the CSS into `standalone/UkeStart.html`.
- **Test.** `vitest` runs the unit suite against `src/lib/**` and `chordDiagram.js` in a `happy-dom` environment. `playwright` drives the real rendered app for end-to-end happy paths. See `docs/test-strategy.md`.

---

## 5. Data shapes (contracts)

```js
// chord
{ name: 'C', frets: [0,0,0,3], fingers: [0,0,0,3], level: 1, family: 'major' }
//   frets/fingers are [G,C,E,A]; 0=open, -1=muted, n=fret; fingers 1..4

// song
{ id, title, origin, difficulty: 1..3, chords: ['C',...], strum, tip,
  lines: [{ chords: 'C    F', lyric: '...' }] }

// lesson
{ id, level, title, minutes, goal, steps: [...], practice: {type:'chord'|'song'|'tuner', name?/id?} }

// progress
{ completedLessons: [id...], xp, streakDays, lastPracticeDate: 'yyyy-mm-dd'|null }
```

These contracts are the seam between layers. Changing them is a breaking change: update the data, the consuming UI, and the tests together.

---

## 6. Risks & how the design mitigates them

- **Logic leaking into the shell** → enforced by code review against the "pure-if-possible" rule and by keeping `src/lib` test coverage high.
- **Content licensing creep** → stated in PRD, `CLAUDE.md`, and README; new songs require public-domain/original provenance.
- **Standalone build drifting from source** → rebuild and smoke-test it as part of the definition of done.
- **localStorage schema changes** → versioned key + defensive merge loader; bump the version and migrate on shape changes.
