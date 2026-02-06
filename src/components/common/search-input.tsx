'use client';

import { Form, Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <Form action={actions.search}>
      <Input
        name="name"
        placeholder="Search by name..."
        defaultValue={searchParams.get('name') || ''}
      />
      {/* Hidden fields to preserve current filters */}
      {searchParams.get('status') && (
        <input
          type="hidden"
          name="status"
          value={searchParams.get('status')!}
        />
      )}
      {searchParams.get('species') && (
        <input
          type="hidden"
          name="species"
          value={searchParams.get('species')!}
        />
      )}
      {searchParams.get('gender') && (
        <input
          type="hidden"
          name="gender"
          value={searchParams.get('gender')!}
        />
      )}
    </Form>
  );
}
