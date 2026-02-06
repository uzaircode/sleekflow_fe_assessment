'use server';

import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  const name = formData.get('name');
  const status = formData.get('status');
  const species = formData.get('species');
  const gender = formData.get('gender');

  if (typeof name !== 'string' || !name) {
    redirect('/');
  }

  // Build URL with search name and preserve filters
  const params = new URLSearchParams({ name });
  if (status && typeof status === 'string') params.append('status', status);
  if (species && typeof species === 'string') params.append('species', species);
  if (gender && typeof gender === 'string') params.append('gender', gender);

  redirect(`/search?${params.toString()}`);
}
