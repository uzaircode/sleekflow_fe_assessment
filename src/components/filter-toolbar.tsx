'use client';

import { Select, SelectItem } from '@heroui/react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function FilterToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const statusOptions = ['Alive', 'Dead', 'unknown'];
  const speciesOptions = [
    'Human',
    'Alien',
    'Humanoid',
    'Poopybutthole',
    'Mythological',
    'Animal',
    'Robot',
  ];
  const genderOptions = ['Male', 'Female', 'Genderless', 'unknown'];

  const handleFilterChange = (filterType: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(filterType, value);
    } else {
      params.delete(filterType);
    }

    startTransition(() => {
      // Stay on current page (either / or /search)
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <Select
        placeholder="Filter by Status"
        className="max-w-xs"
        isDisabled={isPending}
        selectedKeys={
          searchParams.get('status') ? [searchParams.get('status')!] : []
        }
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          handleFilterChange('status', value);
        }}
      >
        {statusOptions.map((status) => (
          <SelectItem key={status}>{status}</SelectItem>
        ))}
      </Select>

      <Select
        placeholder="Filter by Species"
        className="max-w-xs"
        isDisabled={isPending}
        selectedKeys={
          searchParams.get('species') ? [searchParams.get('species')!] : []
        }
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          handleFilterChange('species', value);
        }}
      >
        {speciesOptions.map((species) => (
          <SelectItem key={species}>{species}</SelectItem>
        ))}
      </Select>

      <Select
        placeholder="Filter by Gender"
        className="max-w-xs"
        isDisabled={isPending}
        selectedKeys={
          searchParams.get('gender') ? [searchParams.get('gender')!] : []
        }
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string;
          handleFilterChange('gender', value);
        }}
      >
        {genderOptions.map((gender) => (
          <SelectItem key={gender}>{gender}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
