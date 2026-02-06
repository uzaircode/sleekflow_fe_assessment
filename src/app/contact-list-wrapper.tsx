import ContactList from '@/components/contact-list';

export default async function ContactListWrapper() {
  const response = await fetch('https://rickandmortyapi.com/api/character');
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await response.json();

  return <ContactList characters={data.results} />;
}
