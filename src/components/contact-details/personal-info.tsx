'use client';

import { Card, CardBody } from '@heroui/react';

interface PersonalInfoProps {
  character: {
    status: string;
    gender: string;
    species: string;
    location: {
      name: string;
    };
    origin: {
      name: string;
    };
  };
}

export default function PersonalInfo({ character }: PersonalInfoProps) {
  return (
    <Card className="mb-8">
      <CardBody className="p-6">
        <h2 id="personal-info-heading" className="text-2xl font-bold mb-4">
          Personal Information
        </h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-gray-500">Status</dt>
            <dd className="text-lg font-semibold">{character.status}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Gender</dt>
            <dd className="text-lg font-semibold">{character.gender}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Species</dt>
            <dd className="text-lg font-semibold">{character.species}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Location</dt>
            <dd className="text-lg font-semibold">{character.location.name}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-gray-500">Origin</dt>
            <dd className="text-lg font-semibold">{character.origin.name}</dd>
          </div>
        </dl>
      </CardBody>
    </Card>
  );
}
