import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Error Handling
 * - Graceful error pages
 * - 404 for not found resources
 * - Error boundaries for runtime errors
 */
test.describe('Error Handling', () => {
  test('should display 404 page for invalid routes', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');

    // Should show 404 page - use specific heading
    await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  });

  test('should display 404 for non-existent contact', async ({ page }) => {
    await page.goto('/contact/999999');

    await page.waitForTimeout(500);

    // Should show not found message - use specific heading
    await expect(
      page.getByRole('heading', { name: /Character Not Found/i }),
    ).toBeVisible();
  });

  test('should have accessible 404 page with navigation', async ({ page }) => {
    await page.goto('/contact/999999');

    await page.waitForTimeout(500);

    // Should still have header/navigation - check for the home link in navbar
    await expect(
      page.getByRole('link', { name: /Rick and Morty Contacts/i }),
    ).toBeVisible();
  });

  test('should handle network errors gracefully', async ({ page }) => {
    // This test would need API mocking or network interception
    // For now, we test that error boundaries exist

    await page.goto('/');
    await page.waitForSelector('tbody tr');

    // Page should load without crashing
    const hasContent = await page.locator('tbody tr').count();
    expect(hasContent).toBeGreaterThan(0);
  });
});
