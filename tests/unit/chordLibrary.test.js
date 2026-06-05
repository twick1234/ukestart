import { describe, it, expect } from 'vitest';
import {
  getChord, chordsUpToLevel, chordsByFamily, fretSpan, fingerCount, isValidFingering,
} from '../../src/lib/chordLibrary.js';

describe('chordLibrary', () => {
  it('looks up a known chord', () => {
    expect(getChord('C')).toMatchObject({ name: 'C', frets: [0, 0, 0, 3] });
  });

  it('returns undefined for an unknown chord', () => {
    expect(getChord('Zz9')).toBeUndefined();
  });

  it('filters chords up to a level inclusively', () => {
    const lvl1 = chordsUpToLevel(1);
    expect(lvl1.every((c) => c.level <= 1)).toBe(true);
    expect(lvl1.map((c) => c.name)).toContain('C');
    expect(lvl1.map((c) => c.name)).not.toContain('Em');
  });

  it('filters by family', () => {
    expect(chordsByFamily('minor').every((c) => c.family === 'minor')).toBe(true);
  });

  it('computes finger count (C is one finger)', () => {
    expect(fingerCount('C')).toBe(1);
    expect(fingerCount('G7')).toBe(3);
  });

  it('computes fret span', () => {
    expect(fretSpan('C')).toBe(0);   // single fretted note
    expect(fretSpan('G')).toBe(1);   // frets 2 and 3
  });

  it('validates fingerings', () => {
    expect(isValidFingering([0, 0, 0, 3])).toBe(true);
    expect(isValidFingering([0, 0, 0])).toBe(false);     // wrong length
    expect(isValidFingering([0, 0, 0, 99])).toBe(false); // out of range
    expect(isValidFingering('nope')).toBe(false);
  });
});
