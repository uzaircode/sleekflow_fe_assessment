'use client';

import { Form, Input } from '@heroui/react';
import { useSearchParams } from 'next/navigation';
import * as actions from '@/actions';

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <Form method="get" action={actions.search}>
      <Input
        name="name"
        placeholder="Search by name..."
        defaultValue={searchParams.get('name') || ''}
      />
    </Form>
  );
}
