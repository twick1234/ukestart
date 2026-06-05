// Pure functions over the chord data. No DOM, no side effects — fully unit
// testable. The UI layer imports these; tests import them directly.

import { CHORDS, STRINGS } from '../data/chords.js';

/** Return the chord object for a name, or undefined if unknown. */
export function getChord(name) {
  return CHORDS.find((c) => c.name === name);
}

/** All chords, optionally filtered to those introduced at or below a level. */
export function chordsUpToLevel(level) {
  return CHORDS.filter((c) => c.level <= level);
}

/** Chords belonging to a tonal family ('major' | 'minor' | 'dominant'). */
export function chordsByFamily(family) {
  return CHORDS.filter((c) => c.family === family);
}

/**
 * The fret span a chord requires (highest fret minus lowest fretted note).
 * Open and muted strings are ignored. A small span is easier for beginners.
 */
export function fretSpan(name) {
  const chord = getChord(name);
  if (!chord) return 0;
  const fretted = chord.frets.filter((f) => f > 0);
  if (fretted.length === 0) return 0;
  return Math.max(...fretted) - Math.min(...fretted);
}

/** How many fingers a chord needs to press down. */
export function fingerCount(name) {
  const chord = getChord(name);
  if (!chord) return 0;
  return chord.frets.filter((f) => f > 0).length;
}

/** Validate that a fingering is physically describable on a 4-string uke. */
export function isValidFingering(frets) {
  return (
    Array.isArray(frets) &&
    frets.length === STRINGS.length &&
    frets.every((f) => Number.isInteger(f) && f >= -1 && f <= 12)
  );
}
