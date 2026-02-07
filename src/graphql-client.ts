import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/constants/api';

export const graphqlClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  // Allow Next.js to cache GraphQL requests
  cache: 'force-cache',
});
