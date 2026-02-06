import { redirect } from 'next/navigation';
import ContactList from '@/components/contact-list';
import FilterToolbar from '@/components/filter-toolbar';

interface SearchPageProps {
  searchParams: Promise<{
    name: string;
    status?: string;
    species?: string;
    gender?: string;
  }>;
}

async function fetchCharacterBySearchInput(
  name: string,
  filters?: { status?: string; species?: string; gender?: string },
) {
  const params = new URLSearchParams({ name });
  if (filters?.status) params.append('status', filters.status);
  if (filters?.species) params.append('species', filters.species);
  if (filters?.gender) params.append('gender', filters.gender);

  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?${params.toString()}`,
  );
  const data = await response.json();
  return data.results || [];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { name, status, species, gender } = await searchParams;

  if (!name) {
    redirect('/');
  }

  const characters = await fetchCharacterBySearchInput(name, {
    status,
    species,
    gender,
  });

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Search Results for "{name}"</h1>
      <FilterToolbar />
    </div>
  );
}
