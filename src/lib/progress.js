// Progress model. Pure reducers over a plain state object — the UI owns
// persistence (localStorage) and just calls these to compute the next state.

export const XP_PER_LESSON = 100;
export const XP_PER_PRACTICE = 20;

/** A fresh learner profile. */
export function emptyProgress() {
  return {
    completedLessons: [],
    xp: 0,
    streakDays: 0,
    lastPracticeDate: null, // ISO yyyy-mm-dd
  };
}

/** Mark a lesson complete. Idempotent: completing twice does not double XP. */
export function completeLesson(state, lessonId) {
  if (state.completedLessons.includes(lessonId)) return state;
  return {
    ...state,
    completedLessons: [...state.completedLessons, lessonId],
    xp: state.xp + XP_PER_LESSON,
  };
}

/** Add XP for a freeform practice session. */
export function logPractice(state) {
  return { ...state, xp: state.xp + XP_PER_PRACTICE };
}

/** Difference in whole days between two ISO date strings. */
function dayGap(fromIso, toIso) {
  const a = new Date(fromIso + 'T00:00:00Z').getTime();
  const b = new Date(toIso + 'T00:00:00Z').getTime();
  return Math.round((b - a) / 86_400_000);
}

/**
 * Update the daily streak given today's date (ISO yyyy-mm-dd).
 * Same day = no change. Next day = +1. Any larger gap resets to 1.
 */
export function touchStreak(state, todayIso) {
  if (!state.lastPracticeDate) {
    return { ...state, streakDays: 1, lastPracticeDate: todayIso };
  }
  const gap = dayGap(state.lastPracticeDate, todayIso);
  if (gap === 0) return state;
  if (gap === 1) {
    return { ...state, streakDays: state.streakDays + 1, lastPracticeDate: todayIso };
  }
  return { ...state, streakDays: 1, lastPracticeDate: todayIso };
}

/** A learner level derived from XP. Level n needs n*500 XP. */
export function levelFromXp(xp) {
  return Math.floor(xp / 500) + 1;
}
