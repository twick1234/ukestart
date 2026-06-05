// Pure pitch detection via normalized autocorrelation. Takes a block of raw
// audio samples (Float32Array, values roughly -1..1) and the sample rate, and
// returns the detected fundamental frequency in Hz, or null if the signal is
// too quiet or too noisy to be confident. No Web Audio here — the UI feeds it
// samples — so it is fully unit-testable with synthetic waveforms.

/** Root-mean-square amplitude of a sample block. */
export function rms(buffer) {
  let sum = 0;
  for (let i = 0; i < buffer.length; i++) sum += buffer[i] * buffer[i];
  return Math.sqrt(sum / buffer.length);
}

/**
 * Detect the fundamental frequency of `buffer` sampled at `sampleRate`.
 * @returns {number|null} frequency in Hz, or null if no clear pitch.
 */
export function detectPitch(buffer, sampleRate, { rmsThreshold = 0.01 } = {}) {
  const size = buffer.length;
  if (size < 2) return null;

  // 1. Reject signal that is too quiet to be a plucked string.
  if (rms(buffer) < rmsThreshold) return null;

  // 2. Trim leading/trailing near-silence so the autocorrelation locks on
  //    the sustained part of the note.
  const edge = 0.2;
  let start = 0;
  let end = size - 1;
  for (let i = 0; i < size / 2; i++) {
    if (Math.abs(buffer[i]) < edge) { start = i; break; }
  }
  for (let i = 1; i < size / 2; i++) {
    if (Math.abs(buffer[size - i]) < edge) { end = size - i; break; }
  }
  const trimmed = buffer.subarray(start, end);
  const n = trimmed.length;
  if (n < 2) return null;

  // 3. Autocorrelation.
  const corr = new Float32Array(n);
  for (let lag = 0; lag < n; lag++) {
    let sum = 0;
    for (let i = 0; i < n - lag; i++) sum += trimmed[i] * trimmed[i + lag];
    corr[lag] = sum;
  }

  // 4. Walk past the initial downslope, then find the highest peak: its lag is
  //    the period.
  let lag = 0;
  while (lag < n - 1 && corr[lag] > corr[lag + 1]) lag++;
  let maxVal = -Infinity;
  let maxLag = -1;
  for (let i = lag; i < n; i++) {
    if (corr[i] > maxVal) { maxVal = corr[i]; maxLag = i; }
  }
  if (maxLag <= 0) return null;

  // 5. Parabolic interpolation around the peak for sub-sample precision.
  let period = maxLag;
  if (maxLag > 0 && maxLag < n - 1) {
    const a = corr[maxLag - 1];
    const b = corr[maxLag];
    const c = corr[maxLag + 1];
    const denom = a - 2 * b + c;
    if (denom !== 0) period = maxLag - (0.5 * (c - a)) / denom;
  }

  const freq = sampleRate / period;
  // 6. Sanity bound to the plausible ukulele range (well below C4 to above A5).
  if (freq < 60 || freq > 1500) return null;
  return freq;
}
