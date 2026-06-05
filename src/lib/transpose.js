// Transposition: shift chords up or down by a number of semitones. Pure and
// deterministic, which makes it a clean target for unit tests.

import { CHROMATIC } from '../data/chords.js';

const ENHARMONIC = { Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#' };

/** Split a chord name into its root note and the remaining quality suffix. */
export function splitChord(name) {
  const match = /^([A-G][#b]?)(.*)$/.exec(name);
  if (!match) return null;
  let [, root, quality] = match;
  if (ENHARMONIC[root]) root = ENHARMONIC[root];
  return { root, quality };
}

/** Transpose a single chord name by `semitones` (may be negative). */
export function transposeChord(name, semitones) {
  const parts = splitChord(name);
  if (!parts) return name;
  const index = CHROMATIC.indexOf(parts.root);
  if (index === -1) return name;
  const shifted = (((index + semitones) % 12) + 12) % 12;
  return CHROMATIC[shifted] + parts.quality;
}

/** Transpose a whitespace-separated chord lane, preserving the spacing. */
export function transposeLane(lane, semitones) {
  return lane.replace(/[A-G][#b]?[^\s]*/g, (token) =>
    transposeChord(token, semitones),
  );
}

/** Transpose every chord lane in a song's `lines` array. */
export function transposeSong(song, semitones) {
  return {
    ...song,
    chords: song.chords.map((c) => transposeChord(c, semitones)),
    lines: song.lines.map((line) => ({
      ...line,
      chords: transposeLane(line.chords, semitones),
    })),
  };
}
