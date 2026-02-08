import { test, expect } from '@playwright/test';

/**
 * Core Requirement: Search Functionality
 * - Search for contacts by name
 * - Display search results
 * - Navigate to search results page
 */
test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);
    await expect(searchInput).toBeVisible();
  });

  test('should search for a character by name', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);

    // Type search query
    await searchInput.fill('Rick');

    // Submit search (press Enter)
    await searchInput.press('Enter');

    // Wait for navigation to search page
    await page.waitForURL(/\/search/);

    // Verify we're on search page
    expect(page.url()).toContain('/search');
    expect(page.url()).toContain('name=Rick');
  });

  test('should display search results', async ({ page }) => {
    // Navigate directly to search page
    await page.goto('/search?name=Morty');

    // Wait for results
    await page.waitForSelector('tbody tr');

    // Check heading shows search term
    await expect(
      page.getByRole('heading', { name: /Search Results for.*Morty/i }),
    ).toBeVisible();

    // Verify we have results
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThanOrEqual(1);
  });

  test('should handle empty search gracefully', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search/i);

    // Try to search with empty input
    await searchInput.fill('');
    await searchInput.press('Enter');

    // Should stay on home page or redirect to home
    await page.waitForTimeout(500);
    const url = page.url();
    expect(url).not.toContain('/search?name=');
  });

  test('should handle no results found', async ({ page }) => {
    // Search for something that definitely doesn't exist
    await page.goto('/search?name=XyZ123NonExistentCharacter999');

    await page.waitForTimeout(500);

    // Should show empty state or no results message
    const noResults = page.getByText(
      /No rows to display|No results|not found/i,
    );
    await expect(noResults).toBeVisible();
  });

  test('should preserve filters in search results', async ({ page }) => {
    // Navigate to search with filters
    await page.goto('/search?name=Rick&status=Alive&species=Human');

    await page.waitForTimeout(500);

    // Verify URL contains all parameters
    expect(page.url()).toContain('name=Rick');
    expect(page.url()).toContain('status=Alive');
    expect(page.url()).toContain('species=Human');
  });
});
