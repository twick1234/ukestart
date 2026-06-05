# Test Strategy — UkeStart

> **Structure:** Minto pyramid · **Question it answers:** which testing tools, and why these?

---

## 1. Governing thought

**Use Vitest for the pure-logic and rendering-helper layer and Playwright for the end-to-end user flow — this pairing gives the highest confidence per minute of effort for a small, framework-free static app, with no redundant tooling.**

---

## 2. The choice, justified (why these two and not others)

We deliberately run a **two-tool** stack rather than one or three.

- **Vitest** (unit/integration) is the right inner-loop tool because it is Vite-native (zero extra config to share the app's module resolution), extremely fast, has a Jest-compatible API most developers and AI agents already know, and ships first-class coverage via `@vitest/coverage-v8`. The app's most valuable code — transposition, tuner math, streak rules, chord geometry — is pure, so it can be tested here in milliseconds.
- **Playwright** (end-to-end) is the right outer-loop tool because it drives a real browser, which is the only way to truly verify the DOM rendering, tab routing, event delegation, and `localStorage` persistence that live in the shell. It is reliable (auto-waiting, no flaky sleeps), can start the dev server itself, and runs headless in CI.

**Rejected alternatives and why:**

| Alternative | Why not |
|---|---|
| Jest | Needs extra config to handle ES modules and Vite resolution; Vitest gives the same API with none of that friction. |
| Cypress | Heavier, single-browser history, slower than Playwright for headless CI; Playwright's auto-wait and multi-engine support win. |
| Testing-Library-only (no e2e) | Cannot catch real-browser issues (audio context, routing, persistence) that this app actually has. |
| A third "component" layer | Overkill here — the "components" are string-returning functions already covered by Vitest, and full rendering is covered by Playwright. Adding a third tool would be redundant. |

---

## 3. What each layer covers (the testing pyramid, applied)

- **Unit (Vitest) — the broad base.** Every function in `src/lib/**` plus `chordDiagram.js`. These are pure, so coverage is cheap and meaningful. Current suite: 44 tests across chord lookup, transposition (octave wrap, spacing, immutability), tuner cents and note-mapping math, autocorrelation pitch detection (verified against synthetic sine waves at each open-string frequency), progress reducers (idempotency, streak increment/reset), and SVG output.
- **End-to-end (Playwright) — the narrow top.** The journeys a user actually takes: the app loads and shows the path; switching to Chords renders diagrams; completing a lesson awards XP visible on Progress; transposing a song updates its chords; and the live microphone tuner is present with reference-tone fallback.
- **Manual smoke — the human check.** After a meaningful change, open the standalone file and click through the five tabs. Documented in the definition of done.

---

## 4. How to run

```bash
npm test                  # unit suite, single run
npm run test:watch        # unit suite, watch mode (inner loop)
npm run test:coverage     # unit coverage for src/lib
npm run test:e2e:install  # one-time: download the Playwright browser
npm run test:e2e          # end-to-end suite (auto-starts the dev server)
```

---

## 5. Definition of done (testing portion)

A change is not done until: new pure logic has Vitest tests; the full unit suite passes; the Playwright happy path passes; and the standalone build has been opened and smoke-clicked. Coverage of `src/lib` should not regress.
