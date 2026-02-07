'use client';

import { useEffect } from 'react';
import { Button } from '@heroui/react';
import { useRouter } from 'next/navigation';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Contact page error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4 p-8'>
      <div className='text-center space-y-2 max-w-md'>
        <h2 className='text-2xl font-bold text-danger'>
          Failed to load contact
        </h2>
        <p className='text-default-500'>
          {error.message || 'Unable to load this contact. Please try again.'}
        </p>
      </div>
      <div className='flex gap-2'>
        <Button color='primary' onPress={reset}>
          Try again
        </Button>
        <Button variant='bordered' onPress={() => router.push('/')}>
          Back to contacts
        </Button>
      </div>
    </div>
  );
}
