// src/queries/contacts.ts

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
};

export type CharactersResponse = {
  results: Character[];
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
};

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export async function fetchCharactersContactList(params: {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: string;
}): Promise<CharactersResponse> {
  const queryParams = new URLSearchParams();

  if (params.name) queryParams.append('name', params.name);
  if (params.status) queryParams.append('status', params.status);
  if (params.species) queryParams.append('species', params.species);
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.page) queryParams.append('page', params.page);

  const response = await fetch(
    `${API_BASE_URL}/character?${queryParams.toString()}`,
    { cache: 'no-store' },
  );

  if (!response.ok) {
    return {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    };
  }

  const data = await response.json();

  // Client-side exact species filtering
  let results = data.results || [];
  if (params.species) {
    results = results.filter(
      (char: Character) =>
        char.species.toLowerCase() === params.species!.toLowerCase(),
    );
  }

  return {
    results,
    info: data.info,
  };
}

export async function fetchCharacterById(
  id: string,
): Promise<Character | null> {
  const numericId = parseInt(id);
  if (isNaN(numericId) || numericId < 1) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/character/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    return null;
  }
}

export async function fetchEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  if (!episodeUrls || episodeUrls.length === 0) return [];

  // 1. Extract IDs from URLs (e.g., "https://.../episode/1" -> "1")
  const episodeIds = episodeUrls.map((url) => url.split('/').pop());
  const idsString = episodeIds.join(',');

  try {
    const response = await fetch(`${API_BASE_URL}/episode/${idsString}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }

    const data = await response.json();

    // 2. Handle API quirk: If only one ID is requested,
    // it returns an Object. If multiple, it returns an Array.
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}
