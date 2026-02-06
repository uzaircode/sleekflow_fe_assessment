import EpisodeList from '@/components/episode-list';
import { Card, CardBody, Avatar } from '@heroui/react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCharacterById, fetchEpisodes } from '@/queries/contacts';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const character = await fetchCharacterById(params.id);

  if (!character) {
    return {
      title: 'Character Not Found | SleekFlow',
      description: 'The requested character could not be found',
    };
  }

  return {
    title: `${character.name} | SleekFlow`,
    description: `View information about ${character.name}`,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const character = await fetchCharacterById(params.id);

  if (!character) {
    notFound();
  }

  const episodes = await fetchEpisodes(character.episode);

  return (
    <main className="p-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <header>
        <Card className="mb-8">
          <CardBody className="flex flex-row items-center gap-6 p-6">
            <Avatar
              src={character.image}
              alt={`${character.name}'s avatar`}
              className="w-32 h-32"
            />
            <div>
              <h1 className="text-4xl font-bold">{character.name}</h1>
            </div>
          </CardBody>
        </Card>
      </header>

      {/* Personal Info Section */}
      <section aria-labelledby="personal-info-heading">
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
                <dd className="text-lg font-semibold">
                  {character.location.name}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-500">Origin</dt>
                <dd className="text-lg font-semibold">
                  {character.origin.name}
                </dd>
              </div>
            </dl>
          </CardBody>
        </Card>
      </section>

      {/* Episode Appearance Section */}
      <section aria-labelledby="episodes-heading">
        <Card>
          <CardBody className="p-6">
            <h2 id="episodes-heading" className="text-2xl font-bold mb-4">
              Episode Appearances
            </h2>
            <EpisodeList episodes={episodes} />
          </CardBody>
        </Card>
      </section>
    </main>
  );
}
