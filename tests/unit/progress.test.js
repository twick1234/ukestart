import { describe, it, expect } from 'vitest';
import {
  emptyProgress, completeLesson, logPractice, touchStreak, levelFromXp, XP_PER_LESSON,
} from '../../src/lib/progress.js';

describe('progress', () => {
  it('starts empty', () => {
    const p = emptyProgress();
    expect(p).toEqual({ completedLessons: [], xp: 0, streakDays: 0, lastPracticeDate: null });
  });

  it('completes a lesson and awards XP', () => {
    const p = completeLesson(emptyProgress(), 'l1');
    expect(p.completedLessons).toEqual(['l1']);
    expect(p.xp).toBe(XP_PER_LESSON);
  });

  it('is idempotent — no double XP for the same lesson', () => {
    let p = completeLesson(emptyProgress(), 'l1');
    p = completeLesson(p, 'l1');
    expect(p.completedLessons).toEqual(['l1']);
    expect(p.xp).toBe(XP_PER_LESSON);
  });

  it('adds practice XP', () => {
    expect(logPractice(emptyProgress()).xp).toBe(20);
  });

  it('starts a streak on first practice', () => {
    const p = touchStreak(emptyProgress(), '2026-01-10');
    expect(p.streakDays).toBe(1);
  });

  it('increments the streak on consecutive days', () => {
    let p = touchStreak(emptyProgress(), '2026-01-10');
    p = touchStreak(p, '2026-01-11');
    expect(p.streakDays).toBe(2);
  });

  it('does not change on the same day', () => {
    let p = touchStreak(emptyProgress(), '2026-01-10');
    p = touchStreak(p, '2026-01-10');
    expect(p.streakDays).toBe(1);
  });

  it('resets the streak after a gap', () => {
    let p = touchStreak(emptyProgress(), '2026-01-10');
    p = touchStreak(p, '2026-01-15');
    expect(p.streakDays).toBe(1);
  });

  it('derives level from xp', () => {
    expect(levelFromXp(0)).toBe(1);
    expect(levelFromXp(499)).toBe(1);
    expect(levelFromXp(500)).toBe(2);
    expect(levelFromXp(1200)).toBe(3);
  });
});
