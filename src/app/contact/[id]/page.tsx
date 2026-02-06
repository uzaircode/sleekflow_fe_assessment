import EpisodeList from '@/components/episode-list';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Avatar,
} from '@heroui/react';
import type { Metadata } from 'next';
import { Suspense } from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

interface Character {
  id: number;
  name: string;
  status: string;
  gender: string;
  species: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  episode: string[];
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

async function fetchCharacter(id: String): Promise<Character> {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${id}`,
  );
  console.log('Fetch URL:', `https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();
  return data;
}

async function fetchEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  const episodePromises = episodeUrls.map((url) =>
    fetch(url).then((res) => res.json()),
  );
  return Promise.all(episodePromises);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const id = params.id;
  const character = await fetchCharacter(id);
  return {
    title: `${character.name} | SleekFlow`,
    description: `View information about ${character.name}`,
  };
}

export default async function ContactPage({ params }: PageProps) {
  const character = await fetchCharacter(params.id);
  const episodes = await fetchEpisodes(character.episode);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <Card className="mb-8">
        <CardBody className="flex flex-row items-center gap-6 p-6">
          <Avatar src={character.image} className="w-32 h-32" />
          <div>
            <h1 className="text-4xl font-bold">{character.name}</h1>
          </div>
        </CardBody>
      </Card>

      {/* Personal Info Section */}
      <Card className="mb-8">
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Status</p>
              <p className="text-lg font-semibold">{character.status}</p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="text-lg font-semibold">{character.gender}</p>
            </div>
            <div>
              <p className="text-gray-500">Species</p>
              <p className="text-lg font-semibold">{character.species}</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-lg font-semibold">{character.location.name}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Origin</p>
              <p className="text-lg font-semibold">{character.origin.name}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Episode Appearance Section */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold mb-4">Episode Appearances</h2>
          <EpisodeList episodes={episodes} />
        </CardBody>
      </Card>
    </div>
  );
}
