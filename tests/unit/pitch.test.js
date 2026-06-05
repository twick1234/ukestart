import { describe, it, expect } from 'vitest';
import { rms, detectPitch } from '../../src/lib/pitch.js';

const SR = 44100;

/** Build a sine wave buffer of `freq` Hz. */
function sine(freq, n = 2048, amp = 0.6, sampleRate = SR) {
  const b = new Float32Array(n);
  for (let i = 0; i < n; i++) b[i] = amp * Math.sin((2 * Math.PI * freq * i) / sampleRate);
  return b;
}

describe('pitch.rms', () => {
  it('is zero for silence', () => {
    expect(rms(new Float32Array(1024))).toBe(0);
  });
  it('is amp/sqrt(2) for a sine', () => {
    expect(rms(sine(440))).toBeCloseTo(0.6 / Math.SQRT2, 1);
  });
});

describe('pitch.detectPitch', () => {
  it('returns null for silence', () => {
    expect(detectPitch(new Float32Array(2048), SR)).toBeNull();
  });

  it('returns null for a signal below the noise floor', () => {
    expect(detectPitch(sine(440, 2048, 0.002), SR)).toBeNull();
  });

  it('detects A4 (440 Hz) accurately', () => {
    const f = detectPitch(sine(440), SR);
    expect(f).not.toBeNull();
    expect(f).toBeGreaterThan(437);
    expect(f).toBeLessThan(443);
  });

  it('detects the open ukulele strings', () => {
    for (const target of [392.0, 261.63, 329.63, 440.0]) {
      const f = detectPitch(sine(target), SR);
      expect(f).not.toBeNull();
      // within ~10 cents
      expect(Math.abs(1200 * Math.log2(f / target))).toBeLessThan(12);
    }
  });

  it('rejects frequencies outside the ukulele range', () => {
    expect(detectPitch(sine(2200), SR)).toBeNull();
  });
});
