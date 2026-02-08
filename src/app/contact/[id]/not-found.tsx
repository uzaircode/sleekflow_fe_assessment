// app/contact/[id]/not-found.tsx
import { Card, CardBody, Button } from '@heroui/react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card>
        <CardBody className="p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Character Not Found</h1>
          <p className="text-gray-500 mb-6">
            The character you're looking for doesn't exist in the Rick and Morty
            universe.
          </p>
          <Link href="/">
            <Button color="primary">Go Back Home</Button>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
}
