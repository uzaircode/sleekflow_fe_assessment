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

  // PROOF: Log every fetch call with timestamp
  const timestamp = new Date().toISOString();
  const url = `${API_BASE_URL}/character?${queryParams.toString()}`;
  console.log('🔴 [NO-STORE] Fetching at:', timestamp);
  console.log('🔴 [NO-STORE] URL:', url);
  console.log(
    '🔴 [NO-STORE] Request ID:',
    Math.random().toString(36).substring(7),
  );

  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    return {
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null },
    };
  }

  const data = await response.json();
  console.log(
    '📦 [fetchCharactersContactList] Response JSON:',
    JSON.stringify(data, null, 2),
  );
  console.log(
    '📦 [fetchCharactersContactList] Results count:',
    data.results?.length || 0,
  );

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
    const url = `${API_BASE_URL}/character/${id}`;

    console.log('🟡 Function called for character:', id);

    const response = await fetch(url, {
      next: { revalidate: 3600, tags: ['characters', `character-${id}`] },
    });

    // Log AFTER fetch to see cache status
    console.log(
      '📊 Cache status:',
      response.headers.get('x-vercel-cache') || 'UNKNOWN',
    );
    console.log('🔍 Response from:', response.url);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    console.log('✅ Data retrieved for:', data.name);
    console.log(
      '📦 [fetchCharacterById] Response JSON:',
      JSON.stringify(data, null, 2),
    );

    return data;
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
      next: { revalidate: 3600, tags: ['episodes'] }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch episodes');
    }

    const data = await response.json();
    console.log(
      '📦 [fetchEpisodes] Response JSON:',
      JSON.stringify(data, null, 2),
    );
    console.log(
      '📦 [fetchEpisodes] Episodes count:',
      Array.isArray(data) ? data.length : 1,
    );

    // 2. Handle API quirk: If only one ID is requested,
    // it returns an Object. If multiple, it returns an Array.
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error('Error fetching episodes:', error);
    return [];
  }
}
