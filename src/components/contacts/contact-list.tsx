'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  User,
} from '@heroui/react';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface Character {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  gender: string;
}

interface ContactListProps {
  characters: Character[];
  totalPages: number;
  currentPage: number;
}

export default function ContactList({
  characters,
  totalPages,
  currentPage,
}: ContactListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'species', label: 'Species' },
    { key: 'gender', label: 'Gender' },
  ];

  const rows = characters.map((char) => ({
    key: char.id.toString(),
    image: char.image,
    name: char.name,
    status: char.status,
    species: char.species,
    gender: char.gender,
  }));

  const [isPending, startTransition] = useTransition();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <Table
      aria-label="Rick and Morty Contact"
      bottomContent={
        totalPages > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage}
              total={totalPages}
              onChange={onPageChange}
            />
          </div>
        ) : null
      }
      classNames={{
        wrapper: 'min-h-[222px]',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>

      <TableBody emptyContent="No rows to display." items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>
                <Link href={`/contact/${item.key}`} className="block w-full">
                  {columnKey === 'name' ? (
                    <User
                      name={item.name}
                      avatarProps={{
                        src: item.image,
                        showFallback: true,
                        ImgComponent: 'img',
                        imgProps: {
                          loading: 'lazy',
                          referrerPolicy: 'no-referrer',
                        },
                      }}
                    />
                  ) : (
                    item[columnKey as keyof typeof item]
                  )}
                </Link>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
