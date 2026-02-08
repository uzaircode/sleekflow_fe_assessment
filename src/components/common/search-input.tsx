'use client';

import { Form, Input, Spinner } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import * as actions from '@/actions';

function SearchField() {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();

  return (
    <Input
      name="name"
      placeholder="Search by name..."
      defaultValue={searchParams.get('name') || ''}
      endContent={pending && <Spinner size="sm" color="primary" />}
      isDisabled={pending}
    />
  );
}

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <Form action={actions.search}>
      <SearchField />
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
