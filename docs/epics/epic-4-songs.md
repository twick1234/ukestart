# Epic 4 — Song Book & Transposition

> **Goal:** Let learners play real, free songs immediately, in a key that suits them.

## Why
Playing songs is the reward that sustains practice. Transposition matters because a beginner's voice rarely matches the printed key.

## Scope
- Public-domain/original song data with chord-over-lyric charts, strum, difficulty, tip.
- Pure transposition in `src/lib/transpose.js` (chord split, semitone shift with octave wrap, spacing-preserving lane transpose, immutable whole-song transpose).
- Song panel with per-song key-shift controls.

## Stories
- 4.1 Song data model & chart rendering
- 4.2 Pure transposition engine → `../stories/4.2.transposition-engine.md`
- 4.3 Per-song key-shift UI

## Done when
Songs render charts, the transposer shifts all chords correctly (verified by tests including octave wrap and immutability), and spacing is preserved.
