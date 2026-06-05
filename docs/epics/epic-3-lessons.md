# Epic 3 — Lessons & Learning Path

> **Goal:** Replace "what now?" with an ordered, achievable path from tuning to strumming songs.

## Why
Structure is what carries a beginner past the discouraging first fortnight. Each lesson must be short, concrete, and linked to the exact thing it teaches.

## Scope
- Lesson data in `src/data/lessons.js` (level, goal, 3 plain steps, minutes, practice link).
- Lesson rendering with "mark complete" awarding XP.
- Completion recorded in progress state.

## Stories
- 3.1 Lesson data & path rendering
- 3.2 Lesson completion → XP + streak touch

## Done when
All lessons render in order, completion is idempotent, completing one updates XP and the daily streak, and state persists.
