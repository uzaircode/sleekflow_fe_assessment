// app/contacts/loading.tsx
import { Skeleton, Card } from '@heroui/react';

export default function Loading() {
  return (
    <div className='p-8 w-full flex flex-col gap-4'>
      <Skeleton className='w-1/4 h-8 rounded-lg' /> {/* Title Skeleton */}
      <Card className='w-full space-y-5 p-4' radius='lg'>
        <div className='space-y-3'>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className='w-full h-12 rounded-lg' />
          ))}
        </div>
      </Card>
    </div>
  );
}
