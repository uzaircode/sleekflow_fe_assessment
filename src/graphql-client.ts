import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/constants/api';

// No cache config - let Next.js handle caching with its default behavior
// This prevents stale data and inconsistent image loading across pages
export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT);
