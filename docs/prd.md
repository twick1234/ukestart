# Product Requirements Document — UkeStart

> **BMAD artifact:** PRD · **Structure:** Minto pyramid (answer first, then grouped support, then detail) · **Status:** v1.0 delivered

---

## 1. Governing thought

**UkeStart should be the app a beginner reaches for instead of a paid ukulele subscription, because it removes the only real barriers to starting — cost and friction — without sacrificing the structure that makes practice stick.**

Everything below supports that single claim, grouped into three pillars: the problem worth solving, what we will build, and how we will know it worked.

---

## 2. Why this is worth building (Situation → Complication → Question → Answer)

- **Situation.** Millions of people own or want a ukulele; it is the cheapest, friendliest fretted instrument to begin on.
- **Complication.** The popular learning apps are subscriptions ($10–$20/month), gate core lessons behind paywalls, and bury the learner in ads or upsells. A beginner's motivation is fragile in week one, and a paywall at the first chord is where many quit.
- **Question.** Can a genuinely free, no-account, no-ad app still give enough structure to carry someone past the discouraging first fortnight?
- **Answer.** Yes — if it pairs a short, ordered lesson path with the three tools a beginner actually needs daily (chord reference, songs to play, a tuner) and a light progress loop to sustain the habit. That is UkeStart.

---

## 3. What we will build (three MECE pillars)

### Pillar A — A guided path that beats the first two weeks
The learner is never asked "what now?". An ordered set of short lessons (5–12 minutes each) takes them from tuning to strumming songs, each with a concrete goal and three plain-language steps.

- Lessons are sequential and self-contained.
- Each lesson links to the exact chord or song it teaches.
- Completing a lesson is the core progress event.

### Pillar B — The three daily tools, free and ungated
A beginner needs to look up a chord, play something fun, and stay in tune. All three are first-class and fully available from minute one.

- **Chord library:** every chord used in the course, shown as a finger-numbered diagram, with an audio "hear it" button.
- **Song book:** public-domain songs and original exercises with chord-over-lyric charts, a strum pattern, a difficulty rating, and a key-shift transposer so the song fits the learner's voice.
- **Tuner:** reference tones for standard G–C–E–A tuning with plain instructions to tune up to pitch.

### Pillar C — A habit loop that respects the learner
Daily practice, not intensity, builds a fretting hand. The progress system rewards showing up.

- XP for completing lessons and practising.
- A daily streak that increments on consecutive days and resets honestly after a gap.
- A derived "player level" and visible completion bars.
- All progress stored locally — no account, no tracking.

---

## 4. Scope boundaries

| In scope (v1) | Deliberately out of scope (v1) |
|---|---|
| 12-lesson beginner path (tune → fingerpicking) | Intermediate/advanced curriculum |
| 13 beginner chords with audio | Full chord dictionary, alternate voicings |
| 12 public-domain songs/exercises + transpose | Copyrighted song catalogue |
| Reference-tone **and live microphone** tuner | Polyphonic/chord detection |
| Local progress, streak, XP | Accounts, cloud sync, social features |
| Live mic pitch detection (autocorrelation) | Metronome, chord-change trainer |
| Single-file offline build | Native mobile apps |
| GitHub Pages live deployment | Custom domain (could add later) |

Out-of-scope items are not rejected — several are sequenced as backlog seeds in `CLAUDE.md`.

---

## 5. How we will know it worked (success criteria)

Listed most-important first:

1. **Zero-cost, zero-friction start works.** A non-technical user can open the standalone file *or* visit the live URL and reach a playable first lesson with no install, account, or payment. *(Met: `standalone/UkeStart.html` + https://twick1234.github.io/ukestart/.)*
2. **The path is complete and coherent.** All 12 lessons render, each links to its practice target, and completion is tracked. *(Met.)*
3. **The three tools function.** Chords render and play; songs display and transpose correctly; tuner tones sound. *(Met; logic covered by unit tests.)*
4. **The habit loop is honest.** Streaks increment only on consecutive days and reset after gaps; XP is not double-counted. *(Met; covered by `progress.test.js`.)*
5. **It is maintainable and hand-off ready.** Pure logic is separated and tested; a `CLAUDE.md` and BMAD docs let another developer (human or AI) continue. *(Met.)*

---

## 6. Non-functional requirements

- **Free & unencumbered:** no paid dependencies or services; MIT code; public-domain/original content only.
- **Works offline:** the standalone build runs from `file://`.
- **Accessible:** chord diagrams carry `aria-label`s; controls are real buttons; colour is not the only signal.
- **Fast:** no framework runtime; the production bundle is small (≈18 kB JS before gzip).
- **Safe:** all dynamic text is escaped before insertion.

---

## 7. Epics (the work, decomposed)

The build is decomposed into five epics; details in `docs/epics/`.

1. **E1 — Foundation & app shell:** project setup, tab routing, state, persistence.
2. **E2 — Chord library:** chord data model, SVG diagrams, audio synth.
3. **E3 — Lessons & learning path:** lesson data, rendering, completion tracking.
4. **E4 — Song book & transposition:** song data, chord charts, key shifting.
5. **E5 — Tuner & progress:** tuner tones, XP/streak/level loop, progress UI.

Cross-cutting (testing strategy, standalone build) is documented in `docs/test-strategy.md` and `README.md`.
