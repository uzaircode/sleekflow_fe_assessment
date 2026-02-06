import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchCharacterById, fetchEpisodes } from '@/queries/contacts';
import ContactHeader from '@/components/contact-details/contact-header';
import PersonalInfo from '@/components/contact-details/personal-info';
import EpisodeList from '@/components/contact-details/episode-list';

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
    <main className="p-8 max-w-5xl mx-auto space-y-6">
      <header>
        <ContactHeader character={character} />
      </header>

      <section aria-labelledby="personal-info-heading">
        <PersonalInfo characterId={params.id} />
      </section>

      <section aria-labelledby="episodes-heading">
        <EpisodeList episodes={episodes} />
      </section>
    </main>
  );
}
