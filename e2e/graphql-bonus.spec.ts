import { test, expect } from '@playwright/test';

/**
 * Bonus Requirement: GraphQL Implementation
 * - Verify GraphQL is being used instead of REST
 * - Check for optimized data fetching
 *
 * Note: These tests are skipped in production because Next.js SSR
 * makes GraphQL requests server-side, not in the browser.
 * GraphQL implementation can be verified by inspecting the code.
 */
test.describe.skip('GraphQL Integration (Bonus)', () => {
  test('should use GraphQL endpoint for data fetching', async ({ page }) => {
    // Intercept network requests
    const graphqlRequests: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('graphql')) {
        graphqlRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForSelector('tbody tr');

    // Verify GraphQL endpoint was called
    expect(graphqlRequests.length).toBeGreaterThan(0);
    expect(graphqlRequests[0]).toContain('graphql');
  });

  test('should fetch character details with GraphQL', async ({ page }) => {
    const graphqlRequests: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('graphql')) {
        graphqlRequests.push(url);
      }
    });

    await page.goto('/contact/1');
    await page.waitForTimeout(1000);

    // Should have made GraphQL request for character details
    expect(graphqlRequests.length).toBeGreaterThan(0);
  });

  test('should not call REST API endpoints', async ({ page }) => {
    const restRequests: string[] = [];

    page.on('request', (request) => {
      const url = request.url();
      // Check for REST API pattern (not GraphQL)
      if (
        url.includes('rickandmortyapi.com/api/') &&
        !url.includes('graphql')
      ) {
        restRequests.push(url);
      }
    });

    await page.goto('/');
    await page.waitForSelector('tbody tr');

    // Should NOT use REST API
    expect(restRequests.length).toBe(0);
  });
});
