- note to the reviewer that this README.md was intended for technical and non technical reader.

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

# note

client component with ‘useSearchParams’ need to be wrapped with ‘Suspense’
Pages that reference ‘searchParams’ will be marked as ‘dynamic’ of build time caching

https://www.udemy.com/course/next-js-the-complete-developers-guide/learn/lecture/40938684#content

- I used AI to help with the Tailwind CSS styling in this project. In real work situations, you’d usually get desgins from the UI/UX team anyways, so spending too much times on perfecting styles here didn’t seem necessary in this case.
- NextUI was chosen for UI components to avoid reiventing common patterns. This approach keeps the codebase maintainable while allowing focus on functional requirements.
- the commit is one as i use git squash to combine all my work in progress
  i run with the following command:
  git add . .....
  - note to the reviewer that usually in real work env i split the task into different branch with the name commit of the jira ticket, but to keep things simpler i dumb everything in the main
- I used AI for accessibility

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

# Room for improvements

- use GraphQL instead of REST APIs

BEFORE SUBMISSION

- make sure its mobile responsive
- fulfill all the product requirements
- readme file
