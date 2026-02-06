import Link from 'next/link';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import SearchInput from './search-input';
import { Suspense } from 'react';

export default function Header() {
  return (
    <Navbar className="shadow-md mb-6" maxWidth="xl">
      <NavbarBrand>
        <Link
          href="/"
          className="font-bold text-xl hover:opacity-80 transition-opacity flex items-center gap-2"
        >
          <span className="text-2xl">🧪</span>
          Rick and Morty Contacts
        </Link>
      </NavbarBrand>

      <NavbarContent className="flex-1 px-4" justify="center">
        <NavbarItem className="w-full max-w-lg">
          <Suspense
            fallback={
              <div className="h-10 w-full animate-pulse bg-gray-100 rounded-lg" />
            }
          >
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
