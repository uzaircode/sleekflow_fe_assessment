import { test, expect } from '@playwright/test';

/**
 * Bonus Requirement: Responsive Design
 * - Mobile-friendly layout
 * - Touch-friendly controls
 * - Responsive tables/cards
 */
test.describe('Responsive Design (Bonus)', () => {
  test('should be mobile responsive - contact list', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Wait for content
    await page.waitForSelector('tbody tr');

    // Content should be visible
    const table = page.getByLabel('Rick and Morty Contact');
    await expect(table).toBeVisible();

    // Check that content fits in viewport (no horizontal overflow)
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = 375;
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow small margin
  });

  test('should be mobile responsive - contact details', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/contact/1');

    // Wait for content
    await page.waitForTimeout(500);

    // Image should be visible and responsive
    const image = page.locator('main img').first();
    await expect(image).toBeVisible();

    // Personal info should be visible
    await expect(page.getByText(/Personal Information/i)).toBeVisible();
  });

  test('should have mobile-friendly navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Header should be visible
    const header = page.locator('header, nav').first();
    await expect(header).toBeVisible();

    // Search should be accessible
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
  });

  test('should be tablet responsive', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await page.waitForSelector('tbody tr');

    // Content should be visible
    const table = page.getByLabel('Rick and Morty Contact');
    await expect(table).toBeVisible();
  });
});
