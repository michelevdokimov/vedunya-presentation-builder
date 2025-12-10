import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Vedunya Presentation Builder/);
  });

  test('should show presentations list', async ({ page }) => {
    // Wait for presentations to load
    await page.waitForSelector('[data-testid="presentations-list"], .presentations-grid', {
      timeout: 10000,
    });

    // Check if at least one presentation card is visible
    const presentations = page.locator('.presentation-card');
    await expect(presentations.first()).toBeVisible();
  });

  test('should display presentation cards with metadata', async ({ page }) => {
    // Wait for presentations to load
    await page.waitForLoadState('networkidle');

    // Get first presentation card
    const firstCard = page.locator('.presentation-card').first();
    await expect(firstCard).toBeVisible();

    // Check card contains required elements
    await expect(firstCard.locator('h2, h3')).toBeVisible(); // Title
  });

  test('should navigate to presentation when card is clicked', async ({ page }) => {
    // Wait for presentations to load
    await page.waitForLoadState('networkidle');

    // Click first presentation card
    const firstCard = page.locator('.presentation-card').first();
    await firstCard.click();

    // Should navigate to viewer page
    await expect(page).toHaveURL(/\/view\//);
  });

  test('should handle empty state gracefully', async ({ page }) => {
    // Intercept API call and return empty list
    await page.route('**/api/presentations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ presentations: [], total: 0 }),
      });
    });

    await page.goto('/');

    // Should show empty state message
    const emptyState = page.locator('.empty-state, [data-testid="empty-state"]');
    await expect(emptyState).toBeVisible();
  });

  test('should display error message on API failure', async ({ page }) => {
    // Intercept API call and return error
    await page.route('**/api/presentations', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Internal Server Error' }),
      });
    });

    await page.goto('/');

    // Should show error message
    const errorMessage = page.locator('.error-message, [data-testid="error-message"]');
    await expect(errorMessage).toBeVisible();
  });
});
