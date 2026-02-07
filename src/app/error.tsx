'use client';

import { useEffect } from 'react';
import { Button } from '@heroui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
      <div className='text-center space-y-2'>
        <h2 className='text-2xl font-bold text-danger'>
          Something went wrong!
        </h2>
        <p className='text-default-500'>
          {error.message || 'An unexpected error occurred'}
        </p>
      </div>
      <Button color='primary' onPress={reset}>
        Try again
      </Button>
    </div>
  );
}
