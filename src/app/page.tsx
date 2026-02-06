import SearchInput from '@/components/search-input';
import { Suspense } from 'react';
import { Select, SelectItem, Spinner } from '@heroui/react';
import ContactListWrapper from './contact-list-wrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact List - SleekFlow',
  description: 'View our list of contacts with their related information.',
};

export default async function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Contact List</h1>
      <Suspense fallback={<Spinner />}>
        <ContactListWrapper />
      </Suspense>
    </div>
  );
}
