import { test, expect } from '@playwright/test';

test.describe('Presentation Viewer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/view/welcome');
  });

  test('should load presentation successfully', async ({ page }) => {
    // Wait for Spectacle deck to load
    await page.waitForSelector('[data-spectacle-deck]', { timeout: 10000 });

    // Check if presentation is visible
    const deck = page.locator('[data-spectacle-deck]');
    await expect(deck).toBeVisible();
  });

  test('should display viewer controls', async ({ page }) => {
    // Check fullscreen button
    const fullscreenBtn = page.locator('.fullscreen-btn, button[aria-label*="fullscreen"]');
    await expect(fullscreenBtn).toBeVisible();

    // Check export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await expect(exportBtn).toBeVisible();
  });

  test('should navigate slides with keyboard arrows', async ({ page }) => {
    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]');

    // Press right arrow to go to next slide
    await page.keyboard.press('ArrowRight');

    // Wait a moment for animation
    await page.waitForTimeout(500);

    // Press left arrow to go back
    await page.keyboard.press('ArrowLeft');

    // Should be back at first slide
    await page.waitForTimeout(500);
  });

  test('should navigate slides with space key', async ({ page }) => {
    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]');

    // Press space to go to next slide
    await page.keyboard.press('Space');

    // Wait for animation
    await page.waitForTimeout(500);

    // Presentation should still be visible
    const deck = page.locator('[data-spectacle-deck]');
    await expect(deck).toBeVisible();
  });

  test('should toggle fullscreen with F key', async ({ page }) => {
    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]');

    // Press F to enter fullscreen
    await page.keyboard.press('f');

    // Wait a moment
    await page.waitForTimeout(500);

    // Press Escape to exit fullscreen
    await page.keyboard.press('Escape');

    // Presentation should still be visible
    const deck = page.locator('[data-spectacle-deck]');
    await expect(deck).toBeVisible();
  });

  test('should display help text', async ({ page }) => {
    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]');

    // Check for help text
    const help = page.locator('.viewer-help, [data-testid="viewer-help"]');
    await expect(help).toBeVisible();
  });

  test('should handle non-existent presentation gracefully', async ({ page }) => {
    // Navigate to non-existent presentation
    await page.goto('/view/non-existent-presentation');

    // Should show error message
    const errorMessage = page.locator('.error-message, [data-testid="error-message"]');
    await expect(errorMessage).toBeVisible({ timeout: 10000 });
  });

  test('should load print mode when requested', async ({ page }) => {
    // Navigate with print mode query parameter
    await page.goto('/view/welcome?print=true');

    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]', { timeout: 10000 });

    // Controls should be hidden in print mode
    const controls = page.locator('.viewer-controls');
    await expect(controls).not.toBeVisible();
  });

  test('should display loading state initially', async ({ page }) => {
    // Start navigation but don't wait for load
    const navigationPromise = page.goto('/view/welcome');

    // Should show loading spinner
    const loading = page.locator('.loading-spinner, [data-testid="loading-spinner"]');
    await expect(loading).toBeVisible({ timeout: 2000 });

    // Wait for navigation to complete
    await navigationPromise;
  });
});
