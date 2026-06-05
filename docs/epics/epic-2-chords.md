# Epic 2 — Chord Library

> **Goal:** Give beginners an accurate, audible, accessible reference for every chord the course uses.

## Why
Looking up a chord is the single most frequent action a beginner takes. It must be fast, correct, and confidence-building (hear what "right" sounds like).

## Scope
- Chord data model in `src/data/chords.js` ([G,C,E,A] order; 0/-1/fret; finger numbers; level; family).
- Pure helpers in `src/lib/chordLibrary.js` (lookup, level/family filters, finger count, fret span, fingering validation).
- SVG diagram generator `src/ui/chordDiagram.js` returning an accessible string.
- Web Audio pluck synth `src/ui/audio.js` with a "hear it" button per chord.

## Stories
- 2.1 Chord data model & pure helpers → `../stories/2.1.chord-data-and-helpers.md`
- 2.2 SVG chord diagram renderer
- 2.3 Audio "hear it" synth

## Done when
All 13 chords render correct diagrams with finger numbers, play on demand, and the pure helpers are fully unit-tested.
