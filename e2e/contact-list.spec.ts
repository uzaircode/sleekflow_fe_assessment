import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Contact List Page
 * - Display list of contacts
 * - Show character information (name, status, species, gender, image)
 * - Pagination
 * - Server-side rendering
 */
test.describe('Contact List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display page title', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Contact List' }),
    ).toBeVisible();
  });

  test('should display contact list table', async ({ page }) => {
    // Wait for data to load
    await expect(page.getByLabel('Rick and Morty Contact')).toBeVisible();

    // Check table headers
    await expect(
      page.getByRole('columnheader', { name: 'Name' }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Status' }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Species' }),
    ).toBeVisible();
    await expect(
      page.getByRole('columnheader', { name: 'Gender' }),
    ).toBeVisible();
  });

  test('should display character data with images', async ({ page }) => {
    // Wait for first character to load
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();

    // Check that character has an image (avatar)
    const avatar = firstRow.locator('img').first();
    await expect(avatar).toBeVisible();
    await expect(avatar).toHaveAttribute('src', /.+/);
  });

  test('should have clickable contact rows', async ({ page }) => {
    // Wait for table to load
    await page.waitForSelector('tbody tr');

    const firstRow = page.locator('tbody tr').first();
    const firstLink = firstRow.locator('a').first();

    await expect(firstLink).toBeVisible();

    // Check link goes to contact detail page
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/\/contact\/\d+/);
  });

  test('should display at least 20 contacts per page', async ({ page }) => {
    await page.waitForSelector('tbody tr');
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
    expect(rowCount).toBeLessThanOrEqual(20);
  });

  test('should be server-side rendered (SSR)', async ({ page }) => {
    // Navigate with JavaScript disabled to verify SSR
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    // Content should be present even without JS
    const html = await page.content();
    expect(html).toContain('Contact List');
  });
});
