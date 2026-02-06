/_
APP ROUTER:
src > app > page.tsx
src > app > contact > [id] > page.tsx
src > app > contact > search > page.tsx
_/

Search Module:
endpoint:- localhost:3000/search?term={name}

path:
i am aware that the approach of path is overkill of only 2 pages, i just simulate how the app would be if we decide to grow the app

seo:
contact list page:
// import type { Metadata } from 'next';

// export const metadata: Metadata = {
// title: 'Contact List - SleekFlow',
// description: 'View our list of contacts with their related information.',
// };

// import type { Metadata } from 'next';

// type Props = {
// params: { id: string };
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// // In production, fetch the contact name from API
// // For now, hardcoded:
// const contactName = 'Rick Sanchez';

// return {
// title: `${contactName} | SleekFlow`,
// description: `View information about ${contactName}`,
// };
// }

# note

client component with ‘useSearchParams’ need to be wrapped with ‘Suspense’
Pages that reference ‘searchParams’ will be marked as ‘dynamic’ of build time caching

https://www.udemy.com/course/next-js-the-complete-developers-guide/learn/lecture/40938684#content

- I used AI to help with the Tailwind CSS styling in this project. In real work situations, you’d usually get desgins from the UI/UX team anyways, so spending too much times on perfecting styles here didn’t seem necessary in this case.
- NextUI was chosen for UI components to avoid reiventing common patterns. This approach keeps the codebase maintainable while allowing focus on functional requirements.
- the commit is one as i use git squash to combine all my work in progress
  i run with the following command:
  git add .

# error handling

//TODO: simulate no internet connection
show 404 page not found

# REFERENCES

https://www.heroui.com/

      {/* Status Filter */}
      {/* <div className="flex-1 mb-6 mt-4">
        <Select placeholder="Species" className="w-full">
          {speciesOptions.map((species) => (
            <SelectItem key={species}>{species}</SelectItem>
          ))}
        </Select>
      </div> */}
