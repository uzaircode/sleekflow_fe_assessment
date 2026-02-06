import { redirect } from 'next/navigation';
import ContactList from '@/components/contact-list';
import FilterToolbar from '@/components/filter-toolbar';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';

interface SearchPageProps {
  searchParams: Promise<{
    name: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: string;
  }>;
}

async function fetchCharacterBySearchInput(params: {
  name: string;
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
    `https://rickandmortyapi.com/api/character/?${queryParams.toString()}`,
  );
  console.log(
    'Fetch URL:',
    `https://rickandmortyapi.com/api/character/?${queryParams.toString()}`,
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { name, status, species, gender, page } = params;

  if (!name) {
    redirect('/');
  }

  const data = await fetchCharacterBySearchInput(params);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Search Results for "{name}"</h1>

      <Suspense
        fallback={
          <div className="h-10 mb-6 animate-pulse bg-gray-100 rounded" />
        }
      >
        <FilterToolbar />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <ContactList
          characters={data.results}
          totalPages={data.info.pages}
          currentPage={Number(page) || 1}
        />
      </Suspense>
    </div>
  );
}
