import ContactList from '@/components/contact-list';

interface ContactListWrapperProps {
  searchParams?: {
    status?: string;
    species?: string;
    gender?: string;
  };
}

export default async function ContactListWrapper({
  searchParams,
}: ContactListWrapperProps) {
  // Build query string from search params
  const params = new URLSearchParams();
  if (searchParams?.status) params.append('status', searchParams.status);
  if (searchParams?.species) params.append('species', searchParams.species);
  if (searchParams?.gender) params.append('gender', searchParams.gender);

  const queryString = params.toString();
  const url = `https://rickandmortyapi.com/api/character${
    queryString ? `?${queryString}` : ''
  }`;

  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await response.json();

  return <ContactList characters={data.results} />;
}
