import { Skeleton } from '@heroui/react';

export function PersonalInfoDataSkeleton() {
  return (
    <>
      <div>
        <dt className='text-gray-500'>Status</dt>
        <dd className='text-lg font-semibold'>
          <Skeleton className='h-6 w-24 rounded-lg' />
        </dd>
      </div>
      <div>
        <dt className='text-gray-500'>Gender</dt>
        <dd className='text-lg font-semibold'>
          <Skeleton className='h-6 w-24 rounded-lg' />
        </dd>
      </div>
      <div>
        <dt className='text-gray-500'>Species</dt>
        <dd className='text-lg font-semibold'>
          <Skeleton className='h-6 w-24 rounded-lg' />
        </dd>
      </div>
      <div>
        <dt className='text-gray-500'>Location</dt>
        <dd className='text-lg font-semibold'>
          <Skeleton className='h-6 w-40 rounded-lg' />
        </dd>
      </div>
      <div className='col-span-2'>
        <dt className='text-gray-500'>Origin</dt>
        <dd className='text-lg font-semibold'>
          <Skeleton className='h-6 w-48 rounded-lg' />
        </dd>
      </div>
    </>
  );
}

export default PersonalInfoDataSkeleton;
