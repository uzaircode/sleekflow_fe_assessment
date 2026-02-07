import { Card, CardBody } from '@heroui/react';

interface Episode {
  id: string | number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeTableProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeTableProps) {
  return (
    <Card>
      <CardBody className="p-6">
        <h2 id="episodes-heading" className="text-2xl font-bold mb-4">
          Episode Appearances
        </h2>
        {episodes.length === 0 ? (
          <p className="text-default-400 text-center py-8">
            No episodes found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full" aria-label="Episode appearances">
              <thead>
                <tr className="border-b-2 border-divider">
                  <th className="text-start py-3 px-3 text-sm font-semibold">
                    Episode Name
                  </th>
                  <th className="text-start py-3 px-3 text-sm font-semibold">
                    Air Date
                  </th>
                  <th className="text-start py-3 px-3 text-sm font-semibold">
                    Episode Code
                  </th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((episode, index) => (
                  <tr
                    key={episode.id}
                    className={`border-b border-divider ${
                      index % 2 === 0 ? 'bg-default-100' : ''
                    }`}
                  >
                    <td className="py-3 px-3 text-sm">{episode.name}</td>
                    <td className="py-3 px-3 text-sm">{episode.air_date}</td>
                    <td className="py-3 px-3 text-sm">{episode.episode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
