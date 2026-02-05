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
// import type { Metadata } from 'next';

// type Props = {
//   params: { id: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // In production, fetch the contact name from API
//   // For now, hardcoded:
//   const contactName = 'Rick Sanchez';

//   return {
//     title: `${contactName} | SleekFlow`,
//     description: `View information about ${contactName}`,
//   };
// }

export default function ContactPage() {
  const episodeColumns = [
    { key: 'name', label: 'Name' },
    { key: 'airDate', label: 'Air Date' },
    { key: 'episode', label: 'Episode' },
  ];

  const episodeRows = [
    {
      key: '1',
      name: 'Pilot',
      airDate: 'December 2, 2013',
      episode: 'S01E01',
    },
    {
      key: '2',
      name: 'Lawnmower Dog',
      airDate: 'December 9, 2013',
      episode: 'S01E02',
    },
    {
      key: '3',
      name: 'Anatomy Park',
      airDate: 'December 16, 2013',
      episode: 'S01E03',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header Section */}
      <Card className="mb-8">
        <CardBody className="flex flex-row items-center gap-6 p-6">
          <Avatar
            src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            className="w-32 h-32"
          />
          <div>
            <h1 className="text-4xl font-bold">Rick Sanchez</h1>
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
              <p className="text-lg font-semibold">Alive</p>
            </div>
            <div>
              <p className="text-gray-500">Gender</p>
              <p className="text-lg font-semibold">Male</p>
            </div>
            <div>
              <p className="text-gray-500">Species</p>
              <p className="text-lg font-semibold">Human</p>
            </div>
            <div>
              <p className="text-gray-500">Location</p>
              <p className="text-lg font-semibold">
                Earth (Replacement Dimension)
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">Origin</p>
              <p className="text-lg font-semibold">Earth (C-137)</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Episode Appearance Section */}
      <Card>
        <CardBody className="p-6">
          <h2 className="text-2xl font-bold mb-4">Episode Appearances</h2>
          <Table>
            <TableHeader columns={episodeColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={episodeRows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>
                      {item[columnKey as keyof typeof item]}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
