import { Suspense } from 'react';
import { Spinner } from '@heroui/react';
import ContactListWrapper from './contact-list-wrapper';
import type { Metadata } from 'next';
import FilterToolbar from '@/components/contacts/filter-toolbar';

export const metadata: Metadata = {
  title: 'Contact List - SleekFlow',
  description: 'View our list of contacts with their related information.',
};

interface HomeProps {
  searchParams?: {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    page?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact List</h1>

      <Suspense
        fallback={
          <div className="h-10 mb-6 animate-pulse bg-gray-100 rounded" />
        }
      >
        <FilterToolbar />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <ContactListWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
