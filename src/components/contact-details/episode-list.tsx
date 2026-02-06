'use client';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
} from '@heroui/react';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

interface EpisodeTableProps {
  episodes: Episode[];
}

export default function EpisodeList({ episodes }: EpisodeTableProps) {
  const episodeColumns = [
    { key: 'name', label: 'Episode Name' },
    { key: 'air_date', label: 'Air Date' },
    { key: 'episode', label: 'Episode Code' },
  ];

  const episodeRows = episodes.map((ep) => ({
    key: ep.id.toString(),
    name: ep.name,
    air_date: ep.air_date,
    episode: ep.episode,
  }));

  return (
    <Card>
      <CardBody className="p-6">
        <h2 id="episodes-heading" className="text-2xl font-bold mb-4">
          Episode Appearances
        </h2>
        <Table aria-label="Episode appearances" isStriped>
          <TableHeader columns={episodeColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={episodeRows} emptyContent="No episodes found.">
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
