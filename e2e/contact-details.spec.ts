import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Contact Details Page
 * - Display individual contact details
 * - Show all character information
 * - Display episode appearances
 * - Dynamic routing with character ID
 */
test.describe('Contact Details Page', () => {
  test('should navigate to contact details from list', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('tbody tr');

    // Click on first contact
    const firstLink = page.locator('tbody tr a').first();
    await firstLink.click();

    // Should navigate to contact detail page
    await page.waitForURL(/\/contact\/\d+/);
    expect(page.url()).toMatch(/\/contact\/\d+/);
  });

  test('should display contact header with image and name', async ({
    page,
  }) => {
    // Navigate to a known character (Rick Sanchez - ID 1)
    await page.goto('/contact/1');

    // Check for character image
    const characterImage = page
      .locator('img[alt*="Rick"]')
      .or(page.locator('main img').first());
    await expect(characterImage).toBeVisible();

    // Check for character name in heading
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    expect(await heading.textContent()).toBeTruthy();
  });

  test('should display personal information section', async ({ page }) => {
    await page.goto('/contact/1');

    // Check for personal info heading
    await expect(
      page.getByRole('heading', { name: /Personal Information/i }),
    ).toBeVisible();

    // Check for common fields
    await expect(page.getByText(/Status/i)).toBeVisible();
    await expect(page.getByText(/Species/i)).toBeVisible();
    await expect(page.getByText(/Gender/i)).toBeVisible();
    await expect(page.getByText(/Location/i)).toBeVisible();
    await expect(page.getByText(/Origin/i)).toBeVisible();
  });

  test('should display episode appearances', async ({ page }) => {
    await page.goto('/contact/1');

    // Wait for episodes section
    await expect(
      page.getByRole('heading', { name: /Episode Appearances/i }),
    ).toBeVisible();

    // Check for episode table/list - use first() to avoid strict mode
    const episodeSection = page.getByRole('region', {
      name: /Episode Appearances/i,
    });
    await expect(episodeSection).toBeVisible();
  });

  test('should show 404 for non-existent character', async ({ page }) => {
    // Navigate to invalid ID
    await page.goto('/contact/999999');

    await page.waitForTimeout(500);

    // Should show 404 page - use heading to avoid multiple matches
    await expect(
      page.getByRole('heading', { name: /Character Not Found/i }),
    ).toBeVisible();
  });

  test('should handle invalid character ID gracefully', async ({ page }) => {
    // Navigate to invalid format ID
    await page.goto('/contact/invalid');

    await page.waitForTimeout(500);

    // Should show 404 or error page
    await expect(page.getByText(/404|Not Found|Invalid/i)).toBeVisible();
  });

  test('should be server-side rendered (SSR)', async ({ page }) => {
    await page.goto('/contact/1', { waitUntil: 'domcontentloaded' });

    // Content should be in HTML even without JS
    const html = await page.content();
    expect(html.length).toBeGreaterThan(1000); // Should have substantial content
    expect(html).toContain('Rick'); // Character name should be in HTML
  });

  test('should have proper metadata', async ({ page }) => {
    await page.goto('/contact/1');

    // Check page title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
    expect(title).not.toBe('Create Next App'); // Should not be default title
  });
});
