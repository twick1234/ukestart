# Epic 5 — Tuner & Progress Loop

> **Goal:** Keep learners in tune and keep them coming back.

## Why
An out-of-tune ukulele is the fastest way to quit; a visible habit loop is one of the best ways to stay. These two together protect retention at both ends.

## Scope
- Tuner reference tones for G–C–E–A with pure cents/nearest-string/note math in `src/lib/tuner.js`.
- Live microphone pitch detection: pure autocorrelation in `src/lib/pitch.js`, browser plumbing in `src/ui/micTuner.js`, with a cents needle, nearest-string readout, and in-tune indicator.
- Sine reference-tone playback distinct from the chord pluck.
- Progress reducers in `src/lib/progress.js` (XP, idempotent lesson completion, honest streak increment/reset, level-from-XP).
- Progress panel: stat cards, completion + level bars, reset.

## Stories
- 5.1 Tuner tones & math
- 5.4 Live microphone tuner (autocorrelation) -> ../stories/5.4.live-mic-tuner.md
- 5.2 Progress reducers (XP, streak, level)
- 5.3 Progress dashboard UI

## Done when
Reference tones sound, tuner math is tested, the streak behaves honestly across same-day/next-day/gap cases, and the dashboard reflects state accurately.
