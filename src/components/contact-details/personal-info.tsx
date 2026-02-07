import { Card, CardBody } from '@heroui/react';
import { Suspense } from 'react';
import PersonalInfoDataSkeleton from './personal-info-skeleton';
import type { Character } from '@/queries/contacts-graphql';

interface PersonalInfoProps {
  character: Character;
}

async function PersonalInfoData({ character }: PersonalInfoProps) {
  return (
    <>
      <div>
        <dt className='text-gray-500'>Status</dt>
        <dd className='text-lg font-semibold'>{character.status}</dd>
      </div>
      <div>
        <dt className='text-gray-500'>Gender</dt>
        <dd className='text-lg font-semibold'>{character.gender}</dd>
      </div>
      <div>
        <dt className='text-gray-500'>Species</dt>
        <dd className='text-lg font-semibold'>{character.species}</dd>
      </div>
      <div>
        <dt className='text-gray-500'>Location</dt>
        <dd className='text-lg font-semibold'>{character.location.name}</dd>
      </div>
      <div className='col-span-2'>
        <dt className='text-gray-500'>Origin</dt>
        <dd className='text-lg font-semibold'>{character.origin.name}</dd>
      </div>
    </>
  );
}

export default function PersonalInfo({ character }: PersonalInfoProps) {
  return (
    <Card className='mb-8'>
      <CardBody className='p-6'>
        <h2 id='personal-info-heading' className='text-2xl font-bold mb-4'>
          Personal Information
        </h2>
        <dl className='grid grid-cols-2 gap-4'>
          <Suspense fallback={<PersonalInfoDataSkeleton />}>
            <PersonalInfoData character={character} />
          </Suspense>
        </dl>
      </CardBody>
    </Card>
  );
}
