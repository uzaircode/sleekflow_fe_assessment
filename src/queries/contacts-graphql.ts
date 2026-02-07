// src/queries/contacts-graphql.ts
import { graphqlClient } from '@/graphql-client';
import { gql } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '@/constants/api';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  image: string;
  episode: Array<{
    id: string;
    name: string;
    air_date: string;
    episode: string;
  }>;
};

export type CharactersResponse = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
};

// Query for contact list - only fetch fields we need
const GET_CHARACTERS_QUERY = gql`
  query GetCharacters(
    $page: Int
    $name: String
    $status: String
    $species: String
    $gender: String
  ) {
    characters(
      page: $page
      filter: {
        name: $name
        status: $status
        species: $species
        gender: $gender
      }
    ) {
      results {
        id
        name
        status
        species
        gender
        image
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

// Query for character detail - fetch all needed fields including episodes
const GET_CHARACTER_BY_ID_QUERY = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      image
      episode {
        id
        name
        air_date
        episode
      }
    }
  }
`;

export async function fetchCharactersContactList(params: {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: string;
}): Promise<CharactersResponse> {
  try {
    const variables = {
      page: params.page ? parseInt(params.page) : 1,
      name: params.name || null,
      status: params.status || null,
      species: params.species || null,
      gender: params.gender || null,
    };
    console.log('🟢 [GraphQL API Call] Endpoint:', GRAPHQL_ENDPOINT);
    console.log('🟢 [GraphQL API Call] Query: GetCharacters');
    console.log(
      '🟢 [GraphQL API Call] Variables:',
      JSON.stringify(variables, null, 2),
    );
    console.log('🟢 [GraphQL API Call] Full Query:', GET_CHARACTERS_QUERY);

    const data = await graphqlClient.request<{
      characters: CharactersResponse;
    }>(GET_CHARACTERS_QUERY, variables);

    console.log(
      '📦 [GraphQL Response] Full Data:',
      JSON.stringify(data, null, 2),
    );
    console.log(
      '📦 [GraphQL Response] Results count:',
      data.characters.results.length,
    );

    return data.characters;
  } catch (error) {
    console.error('❌ [GraphQL] Error fetching characters:', error);
    return {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    };
  }
}

export async function fetchCharacterById(
  id: string,
): Promise<Character | null> {
  const numericId = parseInt(id);
  if (isNaN(numericId) || numericId < 1) {
    return null;
  }

  try {
    console.log('🟢 [GraphQL API Call] Endpoint:', GRAPHQL_ENDPOINT);
    console.log('🟢 [GraphQL API Call] Query: GetCharacterById');
    console.log(
      '🟢 [GraphQL API Call] Variables:',
      JSON.stringify({ id }, null, 2),
    );
    console.log('🟢 [GraphQL API Call] Full Query:', GET_CHARACTER_BY_ID_QUERY);

    const data = await graphqlClient.request<{ character: Character }>(
      GET_CHARACTER_BY_ID_QUERY,
      { id },
    );

    console.log(
      '📦 [GraphQL Response] Full Data:',
      JSON.stringify(data, null, 2),
    );
    console.log('📦 [GraphQL Response] Character name:', data.character.name);
    console.log(
      '📦 [GraphQL Response] Episodes count:',
      data.character.episode.length,
    );

    return data.character;
  } catch (error) {
    console.error('❌ [GraphQL] Error fetching character:', error);
    return null;
  }
}
