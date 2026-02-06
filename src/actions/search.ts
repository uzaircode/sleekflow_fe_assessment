'use server';

import { form } from '@heroui/react';
import { redirect } from 'next/navigation';

export async function search(formData: FormData) {
  const name = formData.get('name');

  if (typeof name !== 'string' || !name) {
    redirect('/');
  }

  redirect(`/search?name=${name}`);
}
