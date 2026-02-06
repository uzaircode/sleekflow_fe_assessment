import SearchInput from '@/components/search-input';
import { Suspense } from 'react';
import { Select, SelectItem, Spinner } from '@heroui/react';
import ContactListWrapper from './contact-list-wrapper';

export default async function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Contact List</h1>

      <SearchInput />

      <Suspense fallback={<Spinner />}>
        <ContactListWrapper />
      </Suspense>
    </div>
  );
}
