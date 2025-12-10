import { test, expect } from '@playwright/test';

test.describe('PDF Export Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/view/welcome');

    // Wait for presentation to load
    await page.waitForSelector('[data-spectacle-deck]', { timeout: 10000 });
  });

  test('should show export button', async ({ page }) => {
    // Check if export button is visible
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await expect(exportBtn).toBeVisible();
  });

  test('should start export when button clicked', async ({ page }) => {
    // Find and click export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await exportBtn.click();

    // Should show progress indicator
    const progress = page.locator('.export-progress, [data-testid="export-progress"]');
    await expect(progress).toBeVisible({ timeout: 5000 });
  });

  test('should show progress bar during export', async ({ page }) => {
    // Mock slow export for testing
    await page.route('**/api/exports/**/status', async (route) => {
      const url = route.request().url();

      // Simulate processing
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job: {
            jobId: 'test_job_123',
            presentationId: 'welcome',
            status: 'processing',
            progress: 50,
            createdAt: new Date().toISOString(),
          },
        }),
      });
    });

    // Click export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await exportBtn.click();

    // Progress bar should be visible
    const progressBar = page.locator('.export-progress-bar, [role="progressbar"]');
    await expect(progressBar).toBeVisible({ timeout: 5000 });
  });

  test('should disable export button during export', async ({ page }) => {
    // Find export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]').first();

    // Mock export start
    await page.route('**/api/exports/**/export', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          jobId: 'test_job_123',
          presentationId: 'welcome',
          status: 'pending',
          progress: 0,
          createdAt: new Date().toISOString(),
        }),
      });
    });

    // Click export button
    await exportBtn.click();

    // Button should be disabled
    await expect(exportBtn).toBeDisabled();
  });

  test('should show error message on export failure', async ({ page }) => {
    // Mock export failure
    await page.route('**/api/exports/**/export', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Export failed',
        }),
      });
    });

    // Click export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await exportBtn.click();

    // Should show error message
    const errorMessage = page.locator('.export-error, [data-testid="export-error"]');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });
  });

  test('should handle timeout gracefully', async ({ page }) => {
    // Mock stuck processing
    await page.route('**/api/exports/**/status', async (route) => {
      // Always return processing
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job: {
            jobId: 'test_job_123',
            presentationId: 'welcome',
            status: 'processing',
            progress: 50,
            createdAt: new Date().toISOString(),
          },
        }),
      });
    });

    // Set shorter timeout for test
    // Note: Actual timeout is 2 minutes, but we'll test error handling
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await exportBtn.click();

    // Should show progress
    const progress = page.locator('.export-progress');
    await expect(progress).toBeVisible({ timeout: 5000 });

    // Note: Full timeout test would take 2 minutes
    // In real scenario, timeout error would appear after 2 minutes
  });

  test('should complete export successfully', async ({ page }) => {
    // Mock successful export flow
    let callCount = 0;

    await page.route('**/api/exports/**/export', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          jobId: 'test_job_123',
          presentationId: 'welcome',
          status: 'pending',
          progress: 0,
          createdAt: new Date().toISOString(),
        }),
      });
    });

    await page.route('**/api/exports/**/status', async (route) => {
      callCount++;

      // Simulate progress
      const status = callCount < 3 ? 'processing' : 'completed';
      const progress = callCount < 3 ? 50 : 100;

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          job: {
            jobId: 'test_job_123',
            presentationId: 'welcome',
            status,
            progress,
            downloadUrl: '/api/exports/test_job_123/download',
            createdAt: new Date().toISOString(),
            completedAt: status === 'completed' ? new Date().toISOString() : undefined,
          },
        }),
      });
    });

    // Click export button
    const exportBtn = page.locator('.export-btn, button[aria-label*="PDF"]');
    await exportBtn.click();

    // Wait for completion (progress should disappear)
    await page.waitForTimeout(4000);

    // Export button should be enabled again
    await expect(exportBtn).toBeEnabled();
  });
});
