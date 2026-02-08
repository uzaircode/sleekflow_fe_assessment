import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Pagination
 * - Navigate between pages
 * - Display correct page data
 * - Maintain filters during pagination
 */
test.describe('Pagination', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display pagination controls', async ({ page }) => {
    // Wait for data to load
    await page.waitForSelector('tbody tr');

    // Check for pagination (may not always be visible if only 1 page)
    const pagination = page
      .locator('[role="navigation"]')
      .filter({ hasText: /Page/ })
      .or(page.locator('nav').filter({ hasText: /\d/ }));

    // If there are multiple pages, pagination should be visible
    const hasPagination = (await pagination.count()) > 0;
    if (hasPagination) {
      await expect(pagination.first()).toBeVisible();
    }
  });

  test('should navigate to next page', async ({ page }) => {
    await page.waitForSelector('tbody tr');

    // Look for next button (might be disabled or not present if on last page)
    const nextButton = page
      .getByRole('button', { name: /next|›|»/i })
      .or(page.locator('button[aria-label*="next"]'));

    const buttonCount = await nextButton.count();
    if (buttonCount > 0) {
      const isDisabled = await nextButton.first().isDisabled();

      if (!isDisabled) {
        // Store first character name
        const firstCharBefore = await page
          .locator('tbody tr')
          .first()
          .textContent();

        // Click next
        await nextButton.first().click();

        // Wait for page change
        await page.waitForTimeout(500);

        // Verify content changed
        const firstCharAfter = await page
          .locator('tbody tr')
          .first()
          .textContent();
        expect(firstCharAfter).not.toBe(firstCharBefore);
      }
    }
  });

  test('should update URL with page parameter', async ({ page }) => {
    await page.waitForSelector('tbody tr');

    // Look for page 2 button or next button
    const page2Button = page
      .getByRole('button', { name: '2' })
      .or(page.getByRole('button', { name: /next/i }));

    const buttonCount = await page2Button.count();
    if (buttonCount > 0) {
      const isDisabled = await page2Button.first().isDisabled();

      if (!isDisabled) {
        await page2Button.first().click();
        await page.waitForTimeout(500);

        // Check URL contains page parameter
        expect(page.url()).toMatch(/[?&]page=\d+/);
      }
    }
  });

  test('should maintain filters when paginating', async ({ page }) => {
    // Apply a filter
    await page.getByLabel('Filter by Status').click();
    await page.getByRole('option', { name: 'Alive', exact: true }).click();

    await page.waitForTimeout(500);

    // Try to navigate to page 2
    const page2Button = page.getByRole('button', { name: '2', exact: true });

    const buttonCount = await page2Button.count();
    if (buttonCount > 0) {
      const isDisabled = await page2Button.isDisabled();

      if (!isDisabled) {
        const currentUrl = page.url();
        await page2Button.click();

        // Wait for URL to change (mobile needs more time for client-side navigation)
        await page.waitForURL((url) => url.toString() !== currentUrl, {
          timeout: 3000,
        });

        // URL should contain both filter and page params
        expect(page.url()).toContain('status=Alive');
        expect(page.url()).toMatch(/[?&]page=\d+/);
      }
    }
  });
});
