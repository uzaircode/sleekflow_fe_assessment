/_
APP ROUTER:
src > app > page.tsx
src > app > contact > [id] > page.tsx
src > app > contact > search > page.tsx
_/

Search Module:
endpoint:- localhost:3000/search?term={name}

# note

client component with ‘useSearchParams’ need to be wrapped with ‘Suspense’
Pages that reference ‘searchParams’ will be marked as ‘dynamic’ of build time caching

https://www.udemy.com/course/next-js-the-complete-developers-guide/learn/lecture/40938684#content

- I used AI to help with the Tailwind CSS styling in this project. In real work situations, you’d usually get desgins from the UI/UX team anyways, so spending too much times on perfecting styles here didn’t seem necessary in this case.
- NextUI was chosen for UI components to avoid reiventing common patterns. This approach keeps the codebase maintainable while allowing focus on functional requirements.
- the commit is one as i use git squash to combine all my work in progress
  i run with the following command:
  git add .
