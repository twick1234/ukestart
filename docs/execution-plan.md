# Execution Plan — UkeStart

> Sprint-by-sprint breakdown of what to build, in what order, and why.
> Each sprint is ~2 weeks. Update status as work completes.

---

## How to use this

1. Pick the next sprint row marked **⬜ Upcoming**.
2. For each item, create a story file in `docs/stories/` if it doesn't exist.
3. Build, test, commit, push. GitHub Actions deploys automatically.
4. Mark the sprint **✅ Done** when all items are merged to main.

---

## Sprint 0 — Foundation (v1.0 base) ✅ DONE
*Goal: A working app that can be opened in a browser.*

| Item | Story | Status |
|---|---|---|
| Project scaffold (Vite, Vitest, Playwright) | 1.1.project-setup.md | ✅ |
| Chord data model + library helpers | 2.1.chord-data-and-helpers.md | ✅ |
| SVG chord diagrams (string output) | — | ✅ |
| Web Audio chord synth | — | ✅ |
| 12 lessons, lesson panel, complete-lesson flow | — | ✅ |
| Song book: 6 songs, chord-over-lyric chart | 4.2.transposition-engine.md (partial) | ✅ |
| Transposition engine | 4.2.transposition-engine.md | ✅ |
| Tuner reference tones | — | ✅ |
| Live mic tuner (autocorrelation) | 5.4.live-mic-tuner.md | ✅ |
| XP / streak / level / progress panel | — | ✅ |
| Standalone single-file build | — | ✅ |
| GitHub repo + CI (Vitest + Playwright) | — | ✅ |

---

## Sprint 1 — Songs & Security (v1.0 → v1.0.1) ✅ DONE
*Goal: Real songs a beginner wants to play; zero dependency vulnerabilities.*

| Item | Story | Status |
|---|---|---|
| Security: upgrade all deps to latest (vite 8, vitest 4, happy-dom 20) | — | ✅ |
| Fix SVG aria-label attribute escaping | — | ✅ |
| Add 6 new public-domain songs (La Bamba, Greensleeves, Scarborough Fair, House of the Rising Sun, Down in the Valley, Take Me Out to the Ballgame) | — | ✅ |
| Update lesson steps to reference new songs | — | ✅ |

---

## Sprint 2 — Deploy & Docs (v1.1) 🔄 IN PROGRESS
*Goal: App is live on the web; project management artefacts in place.*
*Target: 2026-06-19*

| Item | Story | Status |
|---|---|---|
| GitHub Pages deployment workflow | — | 🔄 In progress |
| Enable GitHub Pages via API | — | 🔄 In progress |
| Project plan (`docs/project-plan.md`) | — | 🔄 In progress |
| Gantt chart (`docs/gantt.md`) | — | 🔄 In progress |
| Kanban (`docs/kanban.md`) | — | 🔄 In progress |
| Test plan (`docs/test-plan.md`) | — | 🔄 In progress |
| Execution plan (this file) | — | 🔄 In progress |
| GitHub Projects board (live kanban) | — | ⬜ |
| UI polish: mobile chord card layout | — | ⬜ |
| README: add live URL, badges, screenshots | — | ⬜ |

---

## Sprint 3 — Metronome & Chord Trainer (v2.0 start)
*Goal: The two highest-value practice tools that complement the lesson path.*
*Target: 2026-07-07*

| Item | Story | Status |
|---|---|---|
| `src/lib/metronome.js` — pure tick scheduler | Create story | ⬜ |
| `src/ui/metronome.js` — Web Audio click + visual beat | Create story | ⬜ |
| Metronome panel in app (BPM slider, start/stop) | Create story | ⬜ |
| Metronome unit tests | Create story | ⬜ |
| Chord change trainer: pick two chords, count clean switches in 30 s | Create story | ⬜ |
| Chord change trainer: result screen (switches/min, trend) | Create story | ⬜ |

---

## Sprint 4 — Tuner UX + Strum Player (v2.0 cont.)
*Goal: The tuner is less jittery; songs have a rhythmic audio example.*
*Target: 2026-08-01*

| Item | Story | Status |
|---|---|---|
| Pitch detector: median smoothing over N frames | Create story | ⬜ |
| Tuner needle: CSS transition instead of instant jump | Create story | ⬜ |
| Strum pattern player: schedule down/up strikes on Web Audio | Create story | ⬜ |
| Strum player controls per song (play/stop, tempo ±) | Create story | ⬜ |

---

## Sprint 5 — Export / Import + v2.0 Wrap
*Goal: User owns their data; v2.0 release.*
*Target: 2026-08-15*

| Item | Story | Status |
|---|---|---|
| Export progress as JSON file download | Create story | ⬜ |
| Import progress: drag-drop or file picker | Create story | ⬜ |
| Migration helper: merge imported progress with current | Create story | ⬜ |
| Full regression: unit, e2e, standalone smoke | — | ⬜ |
| Tag v2.0 release | — | ⬜ |

---

## Sprint 6 — PWA + Spaced Repetition (v3.0 start)
*Goal: Installable on mobile; chord memory reinforced by spaced repetition.*
*Target: 2026-09-15*

| Item | Story | Status |
|---|---|---|
| Web App Manifest (`public/manifest.json`) | Create story | ⬜ |
| Service worker: cache shell + static assets | Create story | ⬜ |
| Install prompt UI | Create story | ⬜ |
| `src/lib/srs.js` — SM-2 spaced-repetition scheduler (pure) | Create story | ⬜ |
| Chord review panel: show chord, self-rate, schedule next | Create story | ⬜ |
| SRS unit tests | Create story | ⬜ |

---

## Sprint 7 — Polish & Release (v3.0 wrap)
*Goal: A polished, accessible, fully documented app worth recommending.*
*Target: 2026-10-10*

| Item | Story | Status |
|---|---|---|
| 10+ additional songs (jazz standards, ragtime, pre-1929) | Create story | ⬜ |
| Accessibility audit: Playwright `axe-core` assertions | Create story | ⬜ |
| Keyboard navigation for all interactive elements | Create story | ⬜ |
| Dark mode CSS toggle | Create story | ⬜ |
| Final README pass: full feature list, screenshots, GIF | — | ⬜ |
| Tag v3.0 release | — | ⬜ |

---

## Execution principles

1. **One sprint at a time.** Do not start Sprint N+1 until all Sprint N items are in `main`.
2. **Tests before merge.** Unit suite and Playwright suite must pass.
3. **Standalone after meaningful change.** Open `standalone/UkeStart.html` and click through all tabs.
4. **Update this file when sprints complete.** Mark ✅, add the completion date.
5. **Add story files before coding.** A brief story (goal, acceptance criteria, notes) in `docs/stories/` keeps the intent clear when you return to it.
