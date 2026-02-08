'use client';

import { Pagination } from '@heroui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface ContactPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ContactPagination({
  currentPage,
  totalPages,
}: ContactPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={currentPage}
      total={totalPages}
      onChange={onPageChange}
    />
  );
}
