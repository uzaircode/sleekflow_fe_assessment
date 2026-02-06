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
  Avatar,
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
    <Table>
      <TableHeader columns={episodeColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={episodeRows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
