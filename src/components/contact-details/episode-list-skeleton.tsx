import { Card, CardBody, Skeleton } from '@heroui/react';

export default function EpisodeListSkeleton() {
  return (
    <Card>
      <CardBody className='p-6'>
        <h2 id='episodes-heading' className='text-2xl font-bold mb-4'>
          Episode Appearances
        </h2>

        <div className='overflow-x-auto'>
          <table
            className='min-w-full'
            aria-label='Loading episode appearances'
          >
            <thead>
              <tr className='border-b-2 border-divider'>
                <th className='text-start py-3 px-3 text-sm font-semibold'>
                  Episode Name
                </th>
                <th className='text-start py-3 px-3 text-sm font-semibold'>
                  Air Date
                </th>
                <th className='text-start py-3 px-3 text-sm font-semibold'>
                  Episode Code
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, index) => (
                <tr
                  key={index}
                  className={`border-b border-divider ${
                    index % 2 === 0 ? 'bg-default-100' : ''
                  }`}
                >
                  <td className='py-3 px-3 text-sm'>
                    <Skeleton className='w-72 h-5 rounded-lg' />
                  </td>
                  <td className='py-3 px-3 text-sm'>
                    <Skeleton className='w-32 h-5 rounded-lg' />
                  </td>
                  <td className='py-3 px-3 text-sm'>
                    <Skeleton className='w-20 h-5 rounded-lg' />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
}
