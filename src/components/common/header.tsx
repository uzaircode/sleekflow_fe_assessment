import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import SearchInput from './search-input';
import { Suspense } from 'react';

export default function Header() {
  return (
    <Navbar
      className="shadow-md mb-6 min-h-[100px] md:min-h-[64px]"
      maxWidth="xl"
    >
      <div className="flex w-full flex-col md:flex-row md:items-center gap-4 py-4 md:py-0">
        <NavbarBrand>
          <Link
            href="/"
            className="font-bold text-xl hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="text-2xl">🧪</span>
            Rick and Morty Contacts
          </Link>
        </NavbarBrand>

        <NavbarContent
          className="w-full md:flex-1 px-0 md:px-4"
          justify="center"
        >
          <NavbarItem className="w-full md:max-w-lg">
            <Suspense
              fallback={
                <div className="h-10 w-full animate-pulse bg-gray-100 rounded-lg" />
              }
            >
              <SearchInput />
            </Suspense>
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
