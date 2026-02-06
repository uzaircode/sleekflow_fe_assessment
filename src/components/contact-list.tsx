'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface ContactListProps {
  characters: Character[];
}

export default function ContactList({ characters }: ContactListProps) {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'species', label: 'Species' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = characters.map((char) => ({
    key: char.id.toString(),
    name: char.name,
    status: char.status,
    species: char.species,
    gender: char.gender,
  }));

  return (
    <Table aria-label="Rick and Morty Contact" selectionMode="single">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody emptyContent="No rows to display." items={rows}>
        {(item) => (
          <TableRow
            key={item.key}
            href={`/contact/${item.key}`}
            className="cursor-pointer"
          >
            {(columnKey) => (
              <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
