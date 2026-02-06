import ContactList from '@/components/contact-list';

async function fetchCharactersPage(params: {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  page?: string;
}) {
  const queryParams = new URLSearchParams();

  if (params.name) queryParams.append('name', params.name);
  if (params.status) queryParams.append('status', params.status);
  if (params.species) queryParams.append('species', params.species);
  if (params.gender) queryParams.append('gender', params.gender);
  if (params.page) queryParams.append('page', params.page);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character?${queryParams.toString()}`,
  );

  if (!response.ok) {
    return { results: [], info: { count: 0, pages: 0 } };
  }

  const data = await response.json();
  return {
    results: data.results || [],
    info: data.info,
  };
}

export default async function ContactListWrapper({
  searchParams,
}: {
  searchParams?: any;
}) {
  const data = await fetchCharactersPage(searchParams || {});

  return (
    <ContactList
      characters={data.results}
      totalPages={data.info.pages}
      currentPage={Number(searchParams?.page) || 1}
    />
  );
}
