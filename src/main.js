// UkeStart app shell. Wires the pure libraries to the DOM, handles tab
// routing, and persists progress to localStorage.

import { CHORDS } from './data/chords.js';
import { SONGS } from './data/songs.js';
import { LESSONS } from './data/lessons.js';
import { getChord, fingerCount } from './lib/chordLibrary.js';
import { transposeSong } from './lib/transpose.js';
import { TUNING, centsOff, nearestString, isInTune, noteFromFrequency } from './lib/tuner.js';
import { completeLesson, touchStreak, levelFromXp, emptyProgress, XP_PER_LESSON } from './lib/progress.js';
import { chordDiagramSVG } from './ui/chordDiagram.js';
import { playChord } from './ui/audio.js';
import { createMicTuner } from './ui/micTuner.js';

const STORAGE_KEY = 'ukestart.progress.v1';
const TABS = ['Learn', 'Chords', 'Songs', 'Tuner', 'Progress'];

const state = {
  tab: 'Learn',
  progress: loadProgress(),
  transpose: {}, // songId -> semitone offset
};

let micTuner = null; // lazily created live microphone tuner controller

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...emptyProgress(), ...JSON.parse(raw) } : emptyProgress();
  } catch {
    return emptyProgress();
  }
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch { /* ignore */ }
}
function today() { return new Date().toISOString().slice(0, 10); }

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- panels ---------- */

function learnPanel() {
  const cards = LESSONS.map((l) => {
    const done = state.progress.completedLessons.includes(l.id);
    return `<article class="card lesson-card">
      <span class="lvl">Level ${l.level} · ${l.minutes} min</span>
      <h3>${esc(l.title)}</h3>
      <p class="goal">${esc(l.goal)}</p>
      <ol>${l.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
      <div class="foot">
        <button class="btn ${done ? 'done' : ''}" data-lesson="${l.id}">${done ? '✓ Completed' : 'Mark complete (+' + XP_PER_LESSON + ' XP)'}</button>
      </div>
    </article>`;
  }).join('');
  return `<div class="panel">
    <h2 class="section-head">Your learning path</h2>
    <p class="section-sub">Eight short lessons take you from "which way up?" to strumming real songs. Do one a day — consistency beats marathon sessions on a fretted instrument.</p>
    <div class="grid lessons">${cards}</div>
  </div>`;
}

function chordsPanel() {
  const cards = CHORDS.map((c) => `<article class="card chord-card" data-chord="${c.name}">
    <div class="meta">Level ${c.level} · ${fingerCount(c.name)} finger${fingerCount(c.name) === 1 ? '' : 's'}</div>
    <div class="name">${esc(c.name)}</div>
    ${chordDiagramSVG(c)}
    <button class="play-btn" data-play="${c.name}">▶ Hear it</button>
  </article>`).join('');
  return `<div class="panel">
    <h2 class="section-head">Chord library</h2>
    <p class="section-sub">Every shape you need for the lessons and songs. Numbers in the dots are which finger to use (1 index, 2 middle, 3 ring, 4 pinky). Tap "Hear it" to play the target sound.</p>
    <div class="grid chords">${cards}</div>
  </div>`;
}

function chartHtml(song) {
  return song.lines.map((line) =>
    `<div class="clane">${esc(line.chords) || ' '}</div><div class="llane">${esc(line.lyric)}</div>`,
  ).join('');
}

function songsPanel() {
  const cards = SONGS.map((base) => {
    const offset = state.transpose[base.id] || 0;
    const song = offset ? transposeSong(base, offset) : base;
    const stars = '★'.repeat(song.difficulty) + '☆'.repeat(3 - song.difficulty);
    return `<article class="card song-card">
      <h3>${esc(song.title)}</h3>
      <div class="origin">${esc(song.origin)} · difficulty ${stars}</div>
      <div class="pill-row">${song.chords.map((c) => `<span class="pill chord">${esc(c)}</span>`).join('')}</div>
      <div class="pill-row"><span class="pill">Strum: ${esc(song.strum)}</span></div>
      <div class="chart">${chartHtml(song)}</div>
      <div class="tip">💡 ${esc(song.tip)}</div>
      <div class="transpose">
        <button data-trans="${base.id}" data-dir="-1" aria-label="transpose down">−</button>
        <span>Key shift: ${offset > 0 ? '+' + offset : offset}</span>
        <button data-trans="${base.id}" data-dir="1" aria-label="transpose up">+</button>
      </div>
    </article>`;
  }).join('');
  return `<div class="panel">
    <h2 class="section-head">Song book</h2>
    <p class="section-sub">All public-domain songs and original exercises, so you can play freely. Use the key shift to move a song into a range that suits your voice — the chords update automatically.</p>
    <div class="grid songs">${cards}</div>
  </div>`;
}

function tunerPanel() {
  const strings = TUNING.map((t) => `<article class="card string-btn" data-tune="${t.string}">
    <div class="gname">${t.string}</div>
    <div class="freq">${t.freq.toFixed(2)} Hz</div>
    <button class="play-btn" data-tunefreq="${t.freq}">▶ Reference tone</button>
  </article>`).join('');
  const micOn = micTuner && micTuner.isRunning();
  return `<div class="panel">
    <h2 class="section-head">Tuner</h2>
    <p class="section-sub">Standard ukulele tuning is G C E A. Use the live microphone tuner to tune by ear-free precision, or play the reference tones below and match them. Remember the G is re-entrant — higher than you might expect.</p>

    <div class="card live-tuner">
      <div class="lt-head">
        <strong>🎤 Live microphone tuner</strong>
        <button class="btn ${micOn ? 'done' : ''}" data-mic="toggle">${micOn ? '■ Stop' : 'Start microphone tuner'}</button>
      </div>
      <div id="lt-readout" class="lt-readout" ${micOn ? '' : 'hidden'}>
        <div class="lt-target"><span id="lt-string">–</span></div>
        <div class="lt-gauge">
          <div class="lt-ticks"><i></i><i></i><i class="mid"></i><i></i><i></i></div>
          <div class="lt-needle" id="lt-needle"></div>
        </div>
        <div class="lt-scale"><span>♭ flat</span><span>in tune</span><span>sharp ♯</span></div>
        <div class="lt-status" id="lt-status">Pluck a string…</div>
        <div class="lt-hz" id="lt-hz"></div>
      </div>
      <div id="lt-error" class="lt-error" hidden></div>
      <p class="lt-help">Tip: tune in a quiet room, pluck one string firmly, and bring it slowly <em>up</em> to pitch until the needle sits in the green centre.</p>
    </div>

    <div class="tuner-note">No microphone? Pluck your string, play the matching reference tone below, and adjust until the two pitches sound identical with no “wobble” between them.</div>
    <div class="tuner">${strings}</div>
  </div>`;
}

/* ---- live tuner DOM updates (called ~60fps; queries by id each frame) ---- */
function updateLiveTuner(freq) {
  const readout = document.getElementById('lt-readout');
  if (!readout) return; // not on the tuner tab
  const stringEl = document.getElementById('lt-string');
  const needle = document.getElementById('lt-needle');
  const status = document.getElementById('lt-status');
  const hz = document.getElementById('lt-hz');

  if (!freq) {
    status.textContent = 'Listening… pluck a single string';
    status.className = 'lt-status';
    hz.textContent = '';
    needle.style.left = '50%';
    needle.className = 'lt-needle';
    return;
  }
  const target = nearestString(freq);
  const cents = centsOff(freq, target.freq);
  const note = noteFromFrequency(freq);
  const clamped = Math.max(-50, Math.min(50, cents));
  stringEl.textContent = target.string;
  needle.style.left = `${50 + clamped}%`;
  hz.textContent = `${freq.toFixed(1)} Hz · nearest note ${note.name}${note.octave}`;

  if (isInTune(freq, target.freq, 5)) {
    status.textContent = `✓ In tune (${target.string} string)`;
    status.className = 'lt-status in';
    needle.className = 'lt-needle in';
  } else if (cents < 0) {
    status.textContent = `↑ Too low — tune up (${Math.abs(cents)}¢ flat)`;
    status.className = 'lt-status flat';
    needle.className = 'lt-needle off';
  } else {
    status.textContent = `↓ Too high — tune down (${cents}¢ sharp)`;
    status.className = 'lt-status sharp';
    needle.className = 'lt-needle off';
  }
}

function showMicError(msg) {
  const err = document.getElementById('lt-error');
  const readout = document.getElementById('lt-readout');
  if (readout) readout.hidden = true;
  if (err) { err.hidden = false; err.textContent = msg; }
}

function setMicButton(on) {
  const btn = document.querySelector('[data-mic]');
  const readout = document.getElementById('lt-readout');
  const err = document.getElementById('lt-error');
  if (btn) { btn.textContent = on ? '■ Stop' : 'Start microphone tuner'; btn.classList.toggle('done', on); }
  if (readout) readout.hidden = !on;
  if (err && on) err.hidden = true;
}

function toggleMic() {
  if (!micTuner) {
    micTuner = createMicTuner({
      onUpdate: updateLiveTuner,
      onError: (e) => {
        const m = e && e.name === 'NotAllowedError'
          ? 'Microphone permission was denied. Allow mic access in your browser and try again.'
          : e && e.name === 'NotFoundError'
            ? 'No microphone was found on this device.'
            : (e && e.message) || 'Could not start the microphone tuner.';
        showMicError(m);
      },
      onStateChange: setMicButton,
    });
  }
  if (micTuner.isRunning()) micTuner.stop();
  else micTuner.start();
}

function stopMicIfRunning() {
  if (micTuner && micTuner.isRunning()) micTuner.stop();
}

function progressPanel() {
  const p = state.progress;
  const total = LESSONS.length;
  const done = p.completedLessons.length;
  const pct = Math.round((done / total) * 100);
  const level = levelFromXp(p.xp);
  const xpInLevel = p.xp % 500;
  return `<div class="panel">
    <h2 class="section-head">Your progress</h2>
    <p class="section-sub">Small daily reps build the muscle memory. Keep your streak alive.</p>
    <div class="stats">
      <div class="stat"><div class="big">${done}/${total}</div><div class="lbl">Lessons done</div></div>
      <div class="stat"><div class="big">${p.xp}</div><div class="lbl">Total XP</div></div>
      <div class="stat"><div class="big">${p.streakDays}</div><div class="lbl">Day streak</div></div>
      <div class="stat"><div class="big">${level}</div><div class="lbl">Player level</div></div>
    </div>
    <div class="card">
      <strong>Course completion</strong>
      <div class="bar"><i style="width:${pct}%"></i></div>
      <p class="minutes" style="margin-top:8px">${pct}% — ${done === total ? 'Course complete. Now keep those songs alive!' : 'Keep going, you are on your way.'}</p>
      <strong style="display:block;margin-top:18px">Progress to level ${level + 1}</strong>
      <div class="bar"><i style="width:${(xpInLevel / 500) * 100}%"></i></div>
      <p class="minutes" style="margin-top:8px">${xpInLevel} / 500 XP</p>
    </div>
    <button class="reset" data-reset="1">Reset all progress</button>
  </div>`;
}

const PANELS = {
  Learn: learnPanel, Chords: chordsPanel, Songs: songsPanel, Tuner: tunerPanel, Progress: progressPanel,
};

/* ---------- shell + events ---------- */

function render() {
  const root = document.getElementById('app');
  root.innerHTML = `
    <nav class="tabs">${TABS.map((t) => `<button class="${t === state.tab ? 'active' : ''}" data-tab="${t}">${t}</button>`).join('')}</nav>
    ${PANELS[state.tab]()}`;
}

function onClick(e) {
  const t = e.target.closest('[data-tab]');
  if (t) { if (t.dataset.tab !== 'Tuner') stopMicIfRunning(); state.tab = t.dataset.tab; render(); return; }

  const mic = e.target.closest('[data-mic]');
  if (mic) { toggleMic(); return; }

  const play = e.target.closest('[data-play]');
  if (play) { playChord(getChord(play.dataset.play)); return; }

  const tune = e.target.closest('[data-tunefreq]');
  if (tune) { playRefTone(parseFloat(tune.dataset.tunefreq)); return; }

  const lesson = e.target.closest('[data-lesson]');
  if (lesson) {
    state.progress = touchStreak(completeLesson(state.progress, lesson.dataset.lesson), today());
    saveProgress(); render(); return;
  }

  const trans = e.target.closest('[data-trans]');
  if (trans) {
    const id = trans.dataset.trans;
    state.transpose[id] = (state.transpose[id] || 0) + Number(trans.dataset.dir);
    render(); return;
  }

  const reset = e.target.closest('[data-reset]');
  if (reset && confirm('Reset all your progress? This cannot be undone.')) {
    state.progress = emptyProgress(); saveProgress(); render();
  }
}

// Simple sine reference tone for the tuner (distinct from the pluck synth).
function playRefTone(freq) {
  if (typeof window === 'undefined' || !window.AudioContext) return;
  const ac = (playRefTone.ac ||= new AudioContext());
  if (ac.state === 'suspended') ac.resume();
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const now = ac.currentTime;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
  osc.connect(g).connect(ac.destination);
  osc.start(now); osc.stop(now + 1.6);
}

export function mount() {
  document.getElementById('app').addEventListener('click', onClick);
  render();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', mount);
}
