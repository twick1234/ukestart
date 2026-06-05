// Tuner reference math. The actual microphone pitch detection lives in the UI
// layer; everything here is pure number-crunching so it can be tested.

// Target frequencies (Hz) for standard re-entrant ukulele tuning, G4 C4 E4 A4.
export const TUNING = [
  { string: 'G', freq: 392.0 },
  { string: 'C', freq: 261.63 },
  { string: 'E', freq: 329.63 },
  { string: 'A', freq: 440.0 },
];

/**
 * How many cents `freq` is away from `target`. 100 cents = one semitone.
 * Positive = sharp (too high), negative = flat (too low).
 */
export function centsOff(freq, target) {
  if (freq <= 0 || target <= 0) return 0;
  return Math.round(1200 * Math.log2(freq / target));
}

/** Which open string a detected frequency is closest to (by cents distance). */
export function nearestString(freq) {
  let best = null;
  let bestDistance = Infinity;
  for (const entry of TUNING) {
    const distance = Math.abs(centsOff(freq, entry.freq));
    if (distance < bestDistance) {
      bestDistance = distance;
      best = entry;
    }
  }
  return best;
}

/** Is the frequency in tune within a tolerance (default +/- 5 cents)? */
export function isInTune(freq, target, tolerance = 5) {
  return Math.abs(centsOff(freq, target)) <= tolerance;
}

const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

/** Nearest MIDI note number for a frequency (A4 = 69 = 440 Hz). */
export function frequencyToMidi(freq) {
  return Math.round(69 + 12 * Math.log2(freq / 440));
}

/**
 * Map a frequency to the nearest musical note, with how many cents away it is
 * from that note's exact pitch. Used by the live microphone tuner display.
 */
export function noteFromFrequency(freq) {
  if (freq <= 0) return null;
  const midi = frequencyToMidi(freq);
  const exact = 440 * Math.pow(2, (midi - 69) / 12);
  return {
    name: NOTE_NAMES[((midi % 12) + 12) % 12],
    octave: Math.floor(midi / 12) - 1,
    cents: centsOff(freq, exact),
    targetFreq: exact,
    midi,
  };
}
