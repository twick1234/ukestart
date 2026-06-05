# UkeStart 🎶

**A free, open-source ukulele learning app.** Lessons, a chord library with audio, a public-domain song book with live transposition, and a live microphone tuner — no subscription, no ads, no account.

### ▶ Try it now: **https://twick1234.github.io/ukestart/**

[![CI](https://github.com/twick1234/ukestart/actions/workflows/ci.yml/badge.svg)](https://github.com/twick1234/ukestart/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> Built as a complete, hand-off-ready project: working app + BMAD-style planning docs + a `CLAUDE.md` memory file so you can keep building it with Claude Code.

---

## The fastest way to start playing

**Just want to learn?** Three options, easiest first:

1. **Web** — Open https://twick1234.github.io/ukestart/ — works on any device, mobile or desktop.
2. **Offline** — Download `standalone/UkeStart.html` and double-click it. Single self-contained file, no install, works from `file://`.
3. **Dev mode** — `npm install && npm run dev` if you want to hack on it.

**Want to develop it?** You need [Node.js](https://nodejs.org) 18+.

```bash
npm install        # install dependencies
npm run dev        # start the app at http://localhost:5173
npm test           # run the unit test suite (Vitest, 44 tests)
npm run test:e2e   # run the end-to-end tests (Playwright)
npm run build      # produce an optimised build in dist/
npm run build:standalone  # regenerate the single-file standalone/UkeStart.html
```

Every push to `main` runs the full test suite and auto-deploys to the live URL above.

---

## What's inside

| Area | What it does |
|------|--------------|
| **Learn** | A 12-lesson path from "which way up" to fingerpicking a full song. |
| **Chords** | 13 beginner chord diagrams with finger numbers; tap to hear each one. |
| **Songs** | Public-domain songs + original exercises with chord charts and a key-shift transposer. |
| **Tuner** | A **live microphone tuner** (real pitch detection with a cents needle), plus reference tones as a fallback. |
| **Progress** | XP, daily streak, lesson completion, and player level, saved in your browser. |

## How it's organised

```
ukestart/
├── index.html              # app entry (dev/build)
├── standalone/             # double-click, zero-setup build of the app
├── src/
│   ├── data/               # chords, songs, lessons (content)
│   ├── lib/                # PURE logic (chords, transpose, tuner, progress) — fully tested
│   ├── ui/                 # rendering (chord diagrams, audio synth)
│   └── main.js             # app shell + routing
├── tests/
│   ├── unit/               # Vitest specs for src/lib + chordDiagram
│   └── e2e/                # Playwright specs for the user flow
├── docs/                   # BMAD-style PRD, architecture, epics, stories (Minto-structured)
└── CLAUDE.md               # memory file — feed this to Claude Code
```

## A note on song copyright

Every song shipped here is in the **public domain** (traditional folk songs and pre-1929 works) or is an **original exercise** written for this app. That is deliberate: it keeps the project free to copy, host, and extend. When you add songs, add public-domain ones or your own — do not paste in copyrighted lyrics or tablature.

## License

MIT for the code. Songs are public domain or original (CC0).
