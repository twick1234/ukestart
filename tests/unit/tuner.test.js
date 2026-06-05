import { describe, it, expect } from 'vitest';
import { TUNING, centsOff, nearestString, isInTune, frequencyToMidi, noteFromFrequency } from '../../src/lib/tuner.js';

describe('tuner', () => {
  it('exposes the four standard strings', () => {
    expect(TUNING.map((t) => t.string)).toEqual(['G', 'C', 'E', 'A']);
  });

  it('reports zero cents at the exact target', () => {
    expect(centsOff(440, 440)).toBe(0);
  });

  it('reports ~+100 cents one semitone sharp', () => {
    expect(centsOff(440 * Math.pow(2, 1 / 12), 440)).toBe(100);
  });

  it('reports negative cents when flat', () => {
    expect(centsOff(430, 440)).toBeLessThan(0);
  });

  it('guards against zero/negative frequencies', () => {
    expect(centsOff(0, 440)).toBe(0);
  });

  it('finds the nearest string', () => {
    expect(nearestString(441).string).toBe('A');
    expect(nearestString(262).string).toBe('C');
  });

  it('treats small deviations as in tune', () => {
    expect(isInTune(440.5, 440)).toBe(true);
    expect(isInTune(450, 440)).toBe(false);
  });

  it('maps frequency to MIDI number (A4 = 69)', () => {
    expect(frequencyToMidi(440)).toBe(69);
    expect(frequencyToMidi(261.63)).toBe(60); // C4
  });

  it('maps frequency to the nearest note with cents', () => {
    const a = noteFromFrequency(440);
    expect(a.name).toBe('A');
    expect(a.octave).toBe(4);
    expect(Math.abs(a.cents)).toBeLessThan(1);

    const c = noteFromFrequency(261.63);
    expect(c.name).toBe('C');
    expect(c.octave).toBe(4);
  });

  it('reports cents for a slightly sharp note', () => {
    const n = noteFromFrequency(445); // a touch above A4
    expect(n.name).toBe('A');
    expect(n.cents).toBeGreaterThan(0);
  });

  it('returns null for an invalid frequency', () => {
    expect(noteFromFrequency(0)).toBeNull();
  });
});
