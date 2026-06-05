# Project Plan — UkeStart

> **Type:** Solo open-source project · **Owner:** Mark Lindon (twick1234) · **Status:** v1.0 shipped, v1.1 in progress · **Last updated:** 2026-06-05

---

## 1. Objective

Build and maintain a **free, open-source ukulele learning web app** that gets an absolute beginner from "I just unboxed a ukulele" to "I can strum a few songs" — with no paywall, no account, and no friction.

---

## 2. Constraints

| Constraint | Impact |
|---|---|
| **Solo developer** | Scope must be ruthlessly prioritised; no parallel streams |
| **Zero cost to run** | Static hosting only (GitHub Pages); no backend, no paid APIs |
| **Public-domain content only** | All songs/lyrics must be traditional or pre-1929; no copyrighted tabs |
| **No framework runtime** | Vanilla ES modules; keeps bundle small and the project ownable |
| **Works offline** | Standalone single-file build must run from `file://` |

---

## 3. Phases & milestones

### Phase 1 — Core App (v1.0) ✅ COMPLETE
**Goal:** A fully working beginner learning app, deployable and testable.

| Milestone | Status | Notes |
|---|---|---|
| App shell, tab routing, state, localStorage | ✅ Done | `src/main.js` |
| Chord library: 13 chords, SVG diagrams, audio | ✅ Done | `src/data/chords.js`, `src/ui/chordDiagram.js` |
| 12 lessons covering novice to intermediate | ✅ Done | `src/data/lessons.js` |
| 12 songs (public domain) with transposer | ✅ Done | `src/data/songs.js` |
| Live microphone tuner (autocorrelation) | ✅ Done | `src/lib/pitch.js`, `src/ui/micTuner.js` |
| XP, streak, level progress system | ✅ Done | `src/lib/progress.js` |
| Standalone single-file offline build | ✅ Done | `standalone/UkeStart.html` |
| GitHub repo, CI pipeline (Vitest + Playwright) | ✅ Done | `.github/workflows/ci.yml` |
| Security audit: 0 vulnerabilities | ✅ Done | All deps at latest |

---

### Phase 2 — Deploy & Documentation (v1.1) 🔄 IN PROGRESS
**Goal:** Live on the web; full project artefact suite in place.
**Target completion:** 2026-06-19

| Milestone | Status | Notes |
|---|---|---|
| GitHub Pages deployment (auto on push) | 🔄 In progress | `deploy.yml` being wired |
| Project plan, Gantt, Kanban | 🔄 In progress | This document |
| Architecture, test plan, execution plan | 🔄 In progress | `docs/` |
| GitHub Projects kanban board (live) | 🔄 In progress | |
| UI polish: mobile layout, spacing, accessibility | ⬜ Backlog | |
| README with live URL and screenshots | ⬜ Backlog | |

---

### Phase 3 — Feature Expansion (v2.0)
**Goal:** Add the highest-value features from the backlog; make the daily practice loop richer.
**Target start:** 2026-06-23 · **Target completion:** 2026-08-15

| Milestone | Priority | Description |
|---|---|---|
| Metronome | High | Adjustable BPM, audible click, visual beat indicator |
| Chord change trainer | High | Timer-based drill: switch between two chosen chords |
| Tuner smoothing | Medium | Median filter over a few frames; calmer needle |
| Strum pattern player | Medium | Audible down/up strum demonstration per song |
| Export/import progress | Low | Download and reload progress as a JSON file |

---

### Phase 4 — Advanced & Polish (v3.0)
**Goal:** Make it polished enough that a non-technical friend would use it daily.
**Target start:** 2026-08-18 · **Target completion:** 2026-10-10

| Milestone | Priority | Description |
|---|---|---|
| PWA / offline install | High | Service worker + manifest so it installs like an app on mobile |
| Spaced-repetition chord review | High | Flash-card style recall scheduler for chords |
| More songs (10+ additions) | Medium | Focus on recognisable pop/folk from pre-1929 era |
| Accessibility audit | Medium | Full WCAG 2.1 AA sweep |
| Dark mode | Low | CSS variables already in place; add toggle |

---

## 4. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Scope creep (feature ideas > time) | High | Medium | Strict backlog triage; only one epic in progress at a time |
| Copyright slip (adding copyrighted song) | Low | High | CLAUDE.md rule; always verify public domain before adding |
| Browser API changes breaking tuner | Low | Medium | Tested in CI via Playwright; `getUserMedia` is stable |
| GitHub Pages downtime | Very low | Low | Standalone build is always available as a fallback |

---

## 5. Definition of done (project level)

The project reaches "done enough to hand off" when:
1. The live URL works and auto-deploys on every push to main
2. All four phases are complete
3. A non-technical user can open the URL on their phone and complete lesson 1 within 5 minutes
4. The test suite (unit + e2e) covers every significant behaviour
5. The docs in `docs/` are kept current with each change
