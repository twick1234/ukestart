# Kanban Board — UkeStart

> Living document. Update this when status changes. Mirrors the GitHub Projects board at:
> https://github.com/users/twick1234/projects (UkeStart board)
>
> **Columns:** Backlog → Ready → In Progress → Done

---

## 🟣 Backlog

Items identified but not yet scheduled for a sprint.

| # | Item | Phase | Size | Notes |
|---|---|---|---|---|
| B-01 | UI polish: mobile layout & spacing | v1.1 | S | Chord cards overflow on narrow screens |
| B-02 | README update with live URL + screenshots | v1.1 | XS | Add badge, GIF demo |
| B-03 | Metronome — adjustable BPM + audible click | v2.0 | M | `src/lib/metronome.js` pure; `src/ui/metronome.js` Web Audio |
| B-04 | Chord change trainer | v2.0 | M | Timer-based drill between two user-chosen chords |
| B-05 | Tuner display smoothing (median over frames) | v2.0 | S | Less jitter on the cents needle |
| B-06 | Strum pattern audio player | v2.0 | M | Plays down/up strum rhythm for each song |
| B-07 | Export / import progress as JSON file | v2.0 | S | Download and reload `ukestart.progress.v1` |
| B-08 | PWA: service worker + manifest | v3.0 | M | Offline install on mobile |
| B-09 | Spaced-repetition chord review | v3.0 | L | Flash-card scheduler using SM-2 algorithm |
| B-10 | 10+ additional songs | v3.0 | M | Pre-1929 public domain; include jazz standards |
| B-11 | Accessibility audit (WCAG 2.1 AA) | v3.0 | M | Focus order, contrast, screen-reader labels |
| B-12 | Dark mode toggle | v3.0 | S | CSS variables already in place |

---

## 🔵 Ready

Fully defined, estimated, and ready to start — no blockers.

| # | Item | Phase | Size | Definition of ready |
|---|---|---|---|---|
| R-01 | GitHub Projects board (live kanban) | v1.1 | XS | gh CLI command known; just needs running |
| R-02 | UI polish: mobile chord card layout | v1.1 | S | CSS-only; no logic changes |

---

## 🟡 In Progress

Being worked on right now.

| # | Item | Owner | Started | Notes |
|---|---|---|---|---|
| P-01 | GitHub Pages deployment (auto on push) | Mark / Claude | 2026-06-05 | `deploy.yml` created; Pages API enable pending |
| P-02 | Full project artefact suite | Mark / Claude | 2026-06-05 | project-plan, gantt, kanban, test-plan, execution-plan |

---

## ✅ Done

| # | Item | Shipped | Commit / PR |
|---|---|---|---|
| D-01 | App shell, tab routing, state, localStorage | 2026-06-05 | initial commit |
| D-02 | Chord library: 13 chords, SVG, audio | 2026-06-05 | initial commit |
| D-03 | 12 lessons (novice → intermediate) | 2026-06-05 | initial commit |
| D-04 | Song book: 12 songs + transpose | 2026-06-05 | content: add 6 new songs |
| D-05 | Live microphone tuner (autocorrelation) | 2026-06-05 | initial commit |
| D-06 | XP / streak / level progress system | 2026-06-05 | initial commit |
| D-07 | Standalone offline single-file build | 2026-06-05 | initial commit |
| D-08 | CI pipeline (Vitest + Playwright + build) | 2026-06-05 | initial commit |
| D-09 | GitHub repo created (twick1234/ukestart) | 2026-06-05 | — |
| D-10 | Security: all deps at latest, 0 vulns | 2026-06-05 | security: upgrade all deps |
| D-11 | SVG aria-label attribute escaping fix | 2026-06-05 | security: upgrade all deps |

---

## Size guide

| Size | Rough effort |
|---|---|
| XS | < 1 hour |
| S | 1–4 hours |
| M | 1–2 days |
| L | 3–5 days |
| XL | 1+ week |
