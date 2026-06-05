import { test, expect } from '@playwright/test';

test.describe('UkeStart app', () => {
  test('loads and shows the learning path', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header .logo h1')).toContainText('UkeStart');
    await expect(page.locator('.section-head')).toContainText('Your learning path');
  });

  test('can switch to the Chords tab and see diagrams', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Chords' }).click();
    await expect(page.locator('.chord-card').first()).toBeVisible();
    await expect(page.locator('svg.chord-svg').first()).toBeVisible();
  });

  test('completing a lesson awards XP on the Progress tab', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-lesson]').first().click();
    await page.getByRole('button', { name: 'Progress' }).click();
    await expect(page.locator('.stat .big').nth(1)).toContainText('100');
  });

  test('transposing a song changes its chords', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Songs' }).click();
    const firstChart = page.locator('.song-card').first();
    await firstChart.scrollIntoViewIfNeeded();
    await firstChart.getByRole('button', { name: 'transpose up' }).click();
    await expect(firstChart.locator('.transpose span')).toContainText('+1');
  });

  test('the live microphone tuner is available on the Tuner tab', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Tuner', exact: true }).click();
    await expect(page.locator('.live-tuner')).toBeVisible();
    await expect(page.locator('[data-mic]')).toBeVisible();
    // reference tones are still offered as a fallback
    await expect(page.locator('.tuner .string-btn')).toHaveCount(4);
  });
});
