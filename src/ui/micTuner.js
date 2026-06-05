// Live microphone tuner. Opens the mic, streams time-domain samples into the
// pure detectPitch() each animation frame, and reports results via callbacks.
// All browser APIs are isolated here so the math stays testable elsewhere.

import { detectPitch } from '../lib/pitch.js';

export function createMicTuner({ onUpdate, onError, onStateChange } = {}) {
  let audioCtx = null;
  let analyser = null;
  let source = null;
  let stream = null;
  let raf = null;
  let running = false;

  function supported() {
    return (
      typeof navigator !== 'undefined' &&
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      typeof window !== 'undefined' &&
      (window.AudioContext || window.webkitAudioContext)
    );
  }

  async function start() {
    if (running) return;
    if (!supported()) {
      onError && onError(new Error('Microphone or Web Audio not available in this browser.'));
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
      });
      const Ctx = window.AudioContext || window.webkitAudioContext;
      audioCtx = new Ctx();
      if (audioCtx.state === 'suspended') await audioCtx.resume();
      source = audioCtx.createMediaStreamSource(stream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      const buf = new Float32Array(analyser.fftSize);
      running = true;
      onStateChange && onStateChange(true);

      const loop = () => {
        if (!running) return;
        analyser.getFloatTimeDomainData(buf);
        const freq = detectPitch(buf, audioCtx.sampleRate);
        onUpdate && onUpdate(freq);
        raf = requestAnimationFrame(loop);
      };
      loop();
    } catch (err) {
      onError && onError(err);
      stop();
    }
  }

  function stop() {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    if (stream) stream.getTracks().forEach((t) => t.stop());
    if (source) source.disconnect();
    if (audioCtx && audioCtx.state !== 'closed') audioCtx.close();
    audioCtx = analyser = source = stream = null;
    onStateChange && onStateChange(false);
  }

  return { start, stop, supported, isRunning: () => running };
}
