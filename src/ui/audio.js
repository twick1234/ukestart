// Lightweight pluck synth so a learner can hear the target sound of a chord.
// Uses the Web Audio API; guarded so it no-ops in non-browser/test contexts.

import { STRINGS } from '../data/chords.js';

// Open-string frequencies (Hz) in G C E A order, re-entrant tuning.
const OPEN_FREQS = [392.0, 261.63, 329.63, 440.0];

let ctx = null;
function audioContext() {
  if (typeof window === 'undefined' || !window.AudioContext) return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

/** Frequency of a string pressed at a given fret (12-tone equal temperament). */
export function stringFreq(stringIndex, fret) {
  return OPEN_FREQS[stringIndex] * Math.pow(2, fret / 12);
}

function pluck(freq, when, duration = 1.4) {
  const ac = audioContext();
  if (!ac) return;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'triangle';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.22, when + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(when);
  osc.stop(when + duration);
}

/** Strum a chord: stagger the four strings slightly for a natural roll. */
export function playChord(chord) {
  const ac = audioContext();
  if (!ac || !chord) return;
  if (ac.state === 'suspended') ac.resume();
  const now = ac.currentTime;
  chord.frets.forEach((fret, i) => {
    if (fret < 0) return; // muted
    pluck(stringFreq(i, fret), now + i * 0.045);
  });
}

export const STRING_NAMES = STRINGS;
