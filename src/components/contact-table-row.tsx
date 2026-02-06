'use client';

import { TableRow, TableCell } from '@heroui/react';
import { useRouter } from 'next/navigation';

interface ContactTableRowProps {
  item: {
    key: string;
    name: string;
    status: string;
    species: string;
    gender: string;
  };
}

export default function ContactTableRow({ item }: ContactTableRowProps) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/contact/${item.key}`);
  };

  return (
    <TableRow
      key={item.key}
      className="cursor-pointer"
      onClick={handleRowClick}
    >
      {(columnKey) => (
        <TableCell>{item[columnKey as keyof typeof item]}</TableCell>
      )}
    </TableRow>
  );
}
