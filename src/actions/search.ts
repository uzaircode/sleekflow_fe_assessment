'use server';

import { redirect } from 'next/navigation';
import { buildQueryString } from '@/utils/url';

export async function search(formData: FormData) {
  const name = formData.get('name');
  const status = formData.get('status');
  const species = formData.get('species');
  const gender = formData.get('gender');

  if (typeof name !== 'string' || !name) {
    redirect('/');
  }

  // Build URL with search name and preserve filters
  const queryString = buildQueryString({
    name,
    status: typeof status === 'string' ? status : undefined,
    species: typeof species === 'string' ? species : undefined,
    gender: typeof gender === 'string' ? gender : undefined,
  });

  redirect(`/search?${queryString}`);
}
