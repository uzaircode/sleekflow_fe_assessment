/**
 * URL and Query Parameter Utilities
 */

/**
 * Update a single query parameter in URLSearchParams
 * @param searchParams - Current URLSearchParams
 * @param key - Parameter key to update
 * @param value - New value (removes param if empty)
 * @returns Updated URLSearchParams string
 */
export function updateQueryParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number,
): string {
  const params = new URLSearchParams(searchParams.toString());

  if (value) {
    params.set(key, value.toString());
  } else {
    params.delete(key);
  }

  return params.toString();
}

/**
 * Build URL with multiple query parameters
 * Automatically filters out null/undefined/empty values
 */
export function buildQueryString(
  params: Record<string, string | number | null | undefined>,
): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, value.toString());
    }
  });

  return searchParams.toString();
}
