import { Card, CardBody, Avatar } from '@heroui/react';

interface ContactHeaderProps {
  character: {
    name: string;
    image: string;
  };
}

export default function ContentHeader({ character }: ContactHeaderProps) {
  return (
    <Card className="mb-8">
      <CardBody className="flex flex-row items-center gap-6 p-6">
        <Avatar
          src={character.image}
          alt={`${character.name}'s avatar`}
          className="w-32 h-32"
        />
        <div>
          <h1 className="text-4xl font-bold">{character.name}</h1>
        </div>
      </CardBody>
    </Card>
  );
}
