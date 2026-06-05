import { describe, it, expect } from 'vitest';
import { splitChord, transposeChord, transposeLane, transposeSong } from '../../src/lib/transpose.js';

describe('transpose', () => {
  it('splits a chord into root and quality', () => {
    expect(splitChord('Am')).toEqual({ root: 'A', quality: 'm' });
    expect(splitChord('G7')).toEqual({ root: 'G', quality: '7' });
    expect(splitChord('Bb')).toEqual({ root: 'A#', quality: '' });
  });

  it('transposes a single chord up', () => {
    expect(transposeChord('C', 2)).toBe('D');
    expect(transposeChord('Am', 3)).toBe('Cm');
    expect(transposeChord('G7', 1)).toBe('G#7');
  });

  it('wraps around the octave correctly', () => {
    expect(transposeChord('B', 1)).toBe('C');
    expect(transposeChord('C', -1)).toBe('B');
    expect(transposeChord('C', 12)).toBe('C');
  });

  it('leaves unknown tokens untouched', () => {
    expect(transposeChord('(strum)', 2)).toBe('(strum)');
  });

  it('preserves spacing when transposing a lane', () => {
    const lane = 'C        F     C';
    const out = transposeLane(lane, 2);
    expect(out).toBe('D        G     D');
    expect(out.length).toBe(lane.length);
  });

  it('transposes a whole song immutably', () => {
    const song = {
      id: 's', chords: ['C', 'G7'],
      lines: [{ chords: 'C    G7', lyric: 'la la' }],
    };
    const out = transposeSong(song, 2);
    expect(out.chords).toEqual(['D', 'A7']);
    expect(out.lines[0].chords).toBe('D    A7');
    expect(song.chords).toEqual(['C', 'G7']); // original unchanged
  });
});
