// API Endpoints
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://rickandmortyapi.com/api';

export const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  'https://rickandmortyapi.com/graphql';

// Cache & Revalidation
export const REVALIDATE_TIME = parseInt(
  process.env.REVALIDATE_TIME || '3600',
  10,
); // 1 hour
