import { redirect } from 'next/navigation';
import ContactList from '@/components/contact-list';

interface SearchPageProps {
  searchParams: Promise<{
    name: string;
  }>;
}

async function fetchCharacterBySearchInput(name: string) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?name=${name}`,
  );
  const data = await response.json();
  return data.results || [];
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { name } = await searchParams;

  if (!name) {
    redirect('/');
  }

  const characters = await fetchCharacterBySearchInput(name);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Search Results for "{name}"</h1>
      <ContactList characters={characters} />
    </div>
  );
}
