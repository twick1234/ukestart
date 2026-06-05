# Gantt Chart — UkeStart

> Rendered by GitHub's Mermaid support. Dates are week-starting Mondays.

```mermaid
gantt
    title UkeStart Development Roadmap
    dateFormat  YYYY-MM-DD
    axisFormat  %b %d

    section Phase 1 · Core App (v1.0) ✅
    App shell, routing, state          :done, p1a, 2026-04-01, 2026-04-07
    Chord library + SVG diagrams       :done, p1b, 2026-04-07, 2026-04-14
    Lesson path (12 lessons)           :done, p1c, 2026-04-14, 2026-04-21
    Song book + transposer             :done, p1d, 2026-04-21, 2026-04-28
    Live mic tuner (autocorrelation)   :done, p1e, 2026-04-28, 2026-05-12
    XP / streak / progress UI          :done, p1f, 2026-05-12, 2026-05-19
    Standalone build + CI pipeline     :done, p1g, 2026-05-19, 2026-05-26
    Security audit + dep upgrades      :done, p1h, 2026-05-26, 2026-06-05
    6 new public-domain songs          :done, p1i, 2026-06-05, 2026-06-05

    section Phase 2 · Deploy & Docs (v1.1) 🔄
    GitHub Pages deployment            :active, p2a, 2026-06-05, 2026-06-07
    Project artefacts (all docs)       :active, p2b, 2026-06-05, 2026-06-10
    GitHub Projects kanban board       :p2c, 2026-06-07, 2026-06-10
    UI polish + mobile layout          :p2d, 2026-06-10, 2026-06-17
    README + screenshots               :p2e, 2026-06-17, 2026-06-19

    section Phase 3 · Feature Expansion (v2.0)
    Metronome (BPM + audible click)    :p3a, 2026-06-23, 2026-07-07
    Chord change trainer               :p3b, 2026-07-07, 2026-07-21
    Tuner display smoothing            :p3c, 2026-07-21, 2026-07-28
    Strum pattern audio player         :p3d, 2026-07-28, 2026-08-11
    Export / import progress           :p3e, 2026-08-11, 2026-08-15

    section Phase 4 · Advanced (v3.0)
    PWA + offline install              :p4a, 2026-08-18, 2026-09-01
    Spaced-repetition chord review     :p4b, 2026-09-01, 2026-09-22
    10+ additional songs               :p4c, 2026-09-22, 2026-10-01
    Accessibility audit (WCAG 2.1 AA)  :p4d, 2026-10-01, 2026-10-08
    Dark mode toggle                   :p4e, 2026-10-08, 2026-10-10
```

---

## Key dates

| Date | Event |
|---|---|
| 2026-06-05 | v1.0 shipped to GitHub; 12 songs, 12 lessons, live mic tuner |
| 2026-06-07 | GitHub Pages live (auto-deploy on push) |
| 2026-06-19 | v1.1 complete — all docs, polished UI, live URL |
| 2026-08-15 | v2.0 complete — metronome, chord trainer, strum player |
| 2026-10-10 | v3.0 complete — PWA, spaced repetition, full polish |

---

## How to read this

- **Green / `done`** — delivered and in `main`
- **Blue / `active`** — in progress this week
- **Grey** — scheduled but not started
- Each bar is one work item. Bars within a section can be done in any order unless there is a clear dependency noted in the epic file.
