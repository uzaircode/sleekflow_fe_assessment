import ContactList from '@/components/contacts/contact-list';
import { fetchCharactersContactList } from '@/queries/contacts';

export default async function ContactListWrapper({
  searchParams,
}: {
  searchParams?: any;
}) {
  const data = await fetchCharactersContactList(searchParams || {});

  return (
    <ContactList
      characters={data.results}
      totalPages={data.info.pages}
      currentPage={Number(searchParams?.page) || 1}
    />
  );
}
