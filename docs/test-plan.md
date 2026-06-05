# Test Plan — UkeStart

> **Companion to:** `docs/test-strategy.md` (tool choices and rationale)
> **This document:** what to test, how to test it, and what "passing" means.

---

## 1. Scope

| In scope | Out of scope |
|---|---|
| Pure logic: chords, transposition, tuner maths, progress | Browser-specific audio output (manual verification only) |
| SVG chord diagram string output | Microphone hardware accuracy |
| DOM rendering: tabs, panels, forms | Visual pixel-perfect layout on all devices |
| User flows: lessons, chords, songs, tuner, progress | Accessibility beyond what Playwright can assert |
| Persistence: localStorage read/write | Cross-origin edge cases (app is file:// or same-origin) |

---

## 2. Test levels

### 2.1 Unit tests (Vitest) — `tests/unit/`

Run with `npm test`. Target: **all 44 pass in < 30 s**.

#### chordLibrary.test.js
| Test | What it verifies |
|---|---|
| `getChord('C')` returns the correct object | Chord lookup by name |
| `getChord('Z')` returns `undefined` | Missing chord graceful null |
| `fingerCount('C')` returns 1 | Open-string chord finger count |
| `fingerCount('F')` returns 2 | Two-finger chord |
| `getChord` is pure (same input → same output) | No side effects |

#### transpose.test.js
| Test | What it verifies |
|---|---|
| Transpose C by +2 → D | Basic semitone shift |
| Transpose B by +2 → C# (octave wrap) | Chromatic wrap-around |
| Transpose a full song: all chords shift | `transposeSong` applies to every chord |
| Original song object is not mutated | Immutability |
| Transpose by 0 → identical song | Identity |
| Negative offset (transpose down) | Down-shift works |

#### tuner.test.js
| Test | What it verifies |
|---|---|
| `centsOff(440, 440)` → 0 | Perfect in-tune |
| `centsOff(450, 440)` → positive (sharp) | Sharp detection |
| `centsOff(430, 440)` → negative (flat) | Flat detection |
| `nearestString(392)` → G string | Correct string match for open G |
| `nearestString(261.6)` → C string | Open C |
| `noteFromFrequency(440)` → { name: 'A', octave: 4 } | Note name derivation |
| `isInTune(440, 440, 5)` → true | In-tune within threshold |
| `isInTune(445, 440, 5)` → false | Out-of-tune detection |

#### pitch.test.js
| Test | What it verifies |
|---|---|
| `detectPitch` on a synthetic 392 Hz sine → ≈392 | G-string frequency |
| `detectPitch` on 261.6 Hz sine → ≈261.6 | C-string frequency |
| `detectPitch` on 329.6 Hz sine → ≈329.6 | E-string frequency |
| `detectPitch` on 440 Hz sine → ≈440 | A-string frequency |
| `detectPitch` on silence → null | No false positive |
| `detectPitch` on noise → null or a plausible value | No crash |
| Results are within ±5 Hz of target | Autocorrelation accuracy |

#### progress.test.js
| Test | What it verifies |
|---|---|
| `completeLesson` adds to `completedLessons` | Lesson tracking |
| `completeLesson` is idempotent (same lesson twice) | No double-count |
| `completeLesson` awards XP | XP increment |
| `touchStreak` increments streak on a new day | Daily streak |
| `touchStreak` holds streak on same day | No double-increment |
| `touchStreak` resets streak after gap | Honest reset |
| `levelFromXp` returns 1 at 0 XP | Starting level |
| `levelFromXp` increases at 500 XP boundaries | Level-up threshold |
| `emptyProgress` returns a valid zero state | Baseline |

#### chordDiagram.test.js
| Test | What it verifies |
|---|---|
| Output contains `<svg` | Valid SVG returned |
| Output contains `aria-label` with chord name | Accessibility |
| `chordDiagramSVG(null)` returns `''` | Null guard |
| Fret positions render at correct relative Y | Geometry correctness |

---

### 2.2 End-to-end tests (Playwright) — `tests/e2e/`

Run with `npm run test:e2e`. Starts the dev server automatically. Target: **all pass in < 60 s**.

| Test | Steps | Pass condition |
|---|---|---|
| App loads | Navigate to `/` | Title visible, Learn tab active |
| Tab switching | Click each of the 5 tabs | Correct panel renders, no console errors |
| Lesson complete | Click "Mark complete" on lesson 1 | Button shows ✓, Progress tab shows XP > 0 |
| Chord diagrams render | Switch to Chords tab | SVG elements present for all 13 chords |
| Song transposition | Switch to Songs, click + on La Bamba | Key shift label shows "+1", chord names update |
| Tuner reference tone | Switch to Tuner, click a reference tone button | No error thrown (audio context created) |
| Progress reset | Click Reset, confirm | XP returns to 0 |
| Progress persists | Complete lesson, reload page | Completed lesson still shows ✓ |

---

### 2.3 Manual smoke tests

Run after any meaningful change. Open `standalone/UkeStart.html` directly from disk.

| Check | Expected |
|---|---|
| File opens without a server | App renders in < 2 s |
| All 5 tabs clickable | Each panel renders |
| Chord diagram visible + playable | SVG + hear-it button both work |
| Song chart visible | Chord/lyric layout correct |
| Tuner reference tones play | Audio heard on click |
| Mic tuner button present | Shows "Start microphone tuner" |
| Lesson complete flow | XP and ✓ appear |
| Progress survives page reload | localStorage persisting |

---

## 3. Regression policy

- No PR merges if the unit suite fails.
- No PR merges if the Playwright suite fails.
- The standalone build is smoke-tested manually before every meaningful release.
- Coverage of `src/lib/**` must not drop below the baseline established at v1.0.

---

## 4. Known gaps & future test work

| Gap | Plan |
|---|---|
| Mic tuner cannot be e2e tested (no real mic in CI) | Test pure `detectPitch` with synthetic audio only; manually verify on device |
| Audio output not asserted (Web Audio mocked) | Manual check: play chord, hear sound |
| Mobile layout not tested in CI | Add Playwright mobile viewport in v2.0 |
| Accessibility assertions are thin | Full Playwright accessibility scan in v3.0 |
