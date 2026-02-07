import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { fetchCharacterById } from '@/queries/contacts-graphql';
import ContactHeader from '@/components/contact-details/contact-header';
import PersonalInfo from '@/components/contact-details/personal-info';
import EpisodeList from '@/components/contact-details/episode-list';
import EpisodeListSkeleton from '@/components/contact-details/episode-list-skeleton';
import { REVALIDATE_TIME } from '@/constants/api';

export const revalidate = REVALIDATE_TIME;

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

  return (
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <header>
        <ContactHeader character={character} />
      </header>

      <section aria-labelledby="personal-info-heading">
        <PersonalInfo character={character} />
      </section>

      <section aria-labelledby="episodes-heading">
        <Suspense fallback={<EpisodeListSkeleton />}>
          <EpisodeListAsync episodes={character.episode} />
        </Suspense>
      </section>
    </main>
  );
}

async function EpisodeListAsync({
  episodes,
}: {
  episodes: Array<{
    id: string;
    name: string;
    air_date: string;
    episode: string;
  }>;
}) {
  return <EpisodeList episodes={episodes} />;
}
