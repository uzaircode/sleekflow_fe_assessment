import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Filtering
 * - Filter by status (Alive, Dead, unknown)
 * - Filter by species
 * - Filter by gender
 * - Multiple filters can be applied together
 */
test.describe('Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('tbody tr');
  });

  test('should display filter controls', async ({ page }) => {
    await expect(page.getByLabel('Filter by Status')).toBeVisible();
    await expect(page.getByLabel('Filter by Species')).toBeVisible();
    await expect(page.getByLabel('Filter by Gender')).toBeVisible();
  });

  test('should filter by status', async ({ page }) => {
    // Get initial count
    const initialCount = await page.locator('tbody tr').count();

    // Apply status filter
    await page.getByLabel('Filter by Status').click();
    await page.getByRole('option', { name: 'Alive' }).click();

    // Wait for results
    await page.waitForTimeout(500);
    await page.waitForSelector('tbody tr');

    // Check URL contains filter parameter
    expect(page.url()).toContain('status=Alive');

    // Verify we have results (may be different count)
    const filteredCount = await page.locator('tbody tr').count();
    expect(filteredCount).toBeGreaterThanOrEqual(1);
  });

  test('should filter by species', async ({ page }) => {
    // Apply species filter
    await page.getByLabel('Filter by Species').click();
    await page.getByRole('option', { name: 'Human', exact: true }).click();

    await page.waitForTimeout(500);
    await page.waitForSelector('tbody tr');

    // Check URL
    expect(page.url()).toContain('species=Human');

    // Verify we have results
    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should filter by gender', async ({ page }) => {
    // Apply gender filter
    await page.getByLabel('Filter by Gender').click();
    await page.getByRole('option', { name: 'Male', exact: true }).click();

    await page.waitForTimeout(500);
    await page.waitForSelector('tbody tr');

    // Check URL
    expect(page.url()).toContain('gender=Male');

    // Verify we have results
    const count = await page.locator('tbody tr').count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should apply multiple filters together', async ({ page }) => {
    // Apply status filter
    await page.getByLabel('Filter by Status').click();
    await page.getByRole('option', { name: 'Alive' }).click();
    await page.waitForTimeout(300);

    // Apply species filter
    await page.getByLabel('Filter by Species').click();
    await page.getByRole('option', { name: 'Human', exact: true }).click();
    await page.waitForTimeout(300);

    // Apply gender filter
    await page.getByLabel('Filter by Gender').click();
    await page.getByRole('option', { name: 'Female' }).click();

    await page.waitForTimeout(500);

    // Check URL contains all filters
    expect(page.url()).toContain('status=Alive');
    expect(page.url()).toContain('species=Human');
    expect(page.url()).toContain('gender=Female');
  });

  test('should reset page number when filter changes', async ({ page }) => {
    // Apply filter
    await page.getByLabel('Filter by Status').click();
    await page.getByRole('option', { name: 'Dead' }).click();

    await page.waitForTimeout(500);

    // URL should not have page parameter (or page=1)
    const url = page.url();
    if (url.includes('page=')) {
      expect(url).not.toMatch(/page=[2-9]/);
    }
  });
});
