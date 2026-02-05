'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import Link from 'next/link';
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Contact List - SleekFlow',
//   description: 'View our list of contacts with their related information.',
// };

export default function Home() {
  const rows = [
    { key: '1', name: 'Tony Reichert', role: 'CEO', status: 'Active' },
  ];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Status' },
    { key: 'status', label: 'Species' },
    { key: 'sender', label: 'Gender' },
  ];

  const speciesOptions = ['Human', 'Alien', 'Robot', 'Unknown'];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Contact List</h1>

      {/* Search Input */}
      <div className="flex flex-col md:flex-row gap-36 mb-6">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by name..."
            labelPlacement="outside"
            className="w-full"
          />
        </div>

        {/* Status Filter */}
        <div className="flex-1">
          <Select placeholder="Species" className="w-full">
            {speciesOptions.map((species) => (
              <SelectItem key={species}>{species}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>
                  <Link href={`/contact/${item.key}`}>
                    {item[columnKey as keyof typeof item]}
                  </Link>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
