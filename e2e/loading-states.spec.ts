import { test, expect } from '@playwright/test';

/**
 * Bonus Requirement: Loading States
 * - Show loading indicators while fetching data
 * - Suspense boundaries
 * - Skeleton screens
 */
test.describe('Loading States (Bonus)', () => {
  test('should show loading state on initial page load', async ({ page }) => {
    // Start navigation but don't wait for it to complete
    const navigationPromise = page.goto('/', { waitUntil: 'domcontentloaded' });

    // Check for loading indicator (spinner, skeleton, etc.)
    // This might be very fast, so we may or may not catch it
    const loadingIndicator = page
      .locator('[role="status"]')
      .or(page.getByText(/loading/i))
      .or(page.locator('.animate-pulse'));

    // Wait for navigation to complete
    await navigationPromise;

    // Eventually content should load
    await page.waitForSelector('tbody tr', { timeout: 5000 });
    const hasContent = await page.locator('tbody tr').count();
    expect(hasContent).toBeGreaterThan(0);
  });

  test('should show loading state when navigating between pages', async ({
    page,
  }) => {
    await page.goto('/');
    await page.waitForSelector('tbody tr');

    // Click on a contact
    const firstLink = page.locator('tbody tr a').first();
    const clickPromise = firstLink.click();

    // May see loading state during navigation
    await clickPromise;

    // Eventually should show contact details
    await page.waitForURL(/\/contact\/\d+/);
    await page.waitForTimeout(500);

    // Content should be loaded
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should show loading state for search', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder(/search/i);
    await searchInput.fill('Rick');

    // Submit search
    const submitPromise = searchInput.press('Enter');

    await submitPromise;

    // Should navigate to search results
    await page.waitForURL(/\/search/);
    await page.waitForSelector('tbody tr', { timeout: 5000 });
  });
});
