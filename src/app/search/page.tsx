import { redirect } from 'next/navigation';
import ContactList from '@/components/contacts/contact-list';
import FilterToolbar from '@/components/contacts/filter-toolbar';
import { Suspense } from 'react';
import { Spinner } from '@heroui/react';
import paths from '@/paths';
import { fetchCharactersContactList } from '@/queries/contacts-graphql';

export const dynamic = 'force-dynamic';

interface SearchPageProps {
  searchParams: Promise<{
    name: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { name, status, species, gender, page } = params;

  if (!name) {
    redirect(paths.home());
  }

  const data = await fetchCharactersContactList(params);

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

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        }
      >
        <ContactList
          characters={data.results}
          totalPages={data.info.pages}
          currentPage={Number(page) || 1}
        />
      </Suspense>
    </div>
  );
}
