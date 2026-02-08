# Developer Onboarding

This is a Next.js 14 contact management application using the Rick and Morty API as a data source. The application demonstrates server-side rendering, GraphQL integration, comprehensive caching strategies, and cross-browser E2E testing. For detailed technical architecture and implementation decisions, see [README.md](../README.md).

---

## Requirements

- Node.js 18.x or higher
- npm or bun
- Git

---

## Getting Started

```bash
# Clone and install dependencies
git clone <repo-url>
cd sleekflow_fe_assessment
npm install

# Start development server
npm run dev
# App runs at http://localhost:3000

# Build for production
npm run build
npm run start

# Type checking
npx tsc --noEmit
```

---

## Stack

| Layer         | Technology   |
| ------------- | ------------ |
| Framework     | Next.js 14   |
| Language      | TypeScript   |
| Styling       | Tailwind CSS |
| UI Components | HeroUI       |
| Data Layer    | GraphQL      |
| Testing       | Playwright   |
| Deployment    | Vercel       |

---

## Testing

```bash
# Run all E2E tests (headless)
npm test

# Interactive UI mode
npm run test:ui

# Headed mode (visible browser)
npm run test:headed

# Specific browser
npm run test:chromium

# View test report
npm run test:report
```

Test suite includes 44+ test cases across 5 browsers covering contact list, detail pages, search, filtering, pagination, error handling, and responsive design. See [e2e-testing.md](e2e-testing.md) for details.

---

## Pull Request Guidelines

### Branch Naming

```bash
# Feature branches
git checkout -b feature/contact-export
git checkout -b feature/advanced-search

# Bug fixes
git checkout -b fix/pagination-state
git checkout -b fix/mobile-layout

# Documentation
git checkout -b docs/api-integration
```

### Before Submitting

1. Ensure tests pass: `npm test`
2. Type check: `npx tsc --noEmit`
3. Lint: `npm run lint`
4. Format: `npm run format`

### Commit Strategy

Use git squash to keep history clean:

```bash
# Squash commits before pushing
git rebase -i main

# Or squash during merge
git merge --squash feature/your-branch
```

### PR Checklist

- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Code formatted
- [ ] Tested on mobile/tablet viewports
- [ ] Added tests for new features

---

## Project Structure

```

```

src/
├── app/ # Next.js App Router
│ ├── page.tsx # Homepage (/)
│ ├── contact/[id]/page.tsx # Contact details (/contact/1)
│ └── search/page.tsx # Search results
│
├── components/
│ ├── common/ # Shared components
│ ├── contacts/ # Contact list
│ └── contact-details/ # Detail page components
│
├── queries/
│ └── contacts-graphql.ts # GraphQL queries
│
├── utils/
│ └── url.ts # URL helpers
│
└── paths.ts # Route definitions

````

Key files:
- `src/queries/contacts-graphql.ts` - Data fetching layer
- `src/app/page.tsx` - Main contact list page
- `src/app/constants/filters.ts` - Filter configurations
- `playwright.config.ts` - Test settings

---

## Architecture Notes

### Server vs Client Components

Server Components (default):
- `src/app/page.tsx` - Contact list page
- `src/components/contact-details/personal-info.tsx` - Detail view

Client Components (`'use client'`):
- `src/components/common/search-input.tsx` - Interactive search
- `src/components/contacts/filter-toolbar.tsx` - Filter controls

Use Server Components by default. Only use Client Components when you need hooks, event handlers, or browser APIs.

### State Management

URL query parameters are used for all filters and search state:
- Enables shareable URLs
- Natural back button behavior
- Better SEO

```typescript
// Reading from URL (Server Component)
export default async function Page({ searchParams }) {
  const name = searchParams.name || '';
  const data = await fetchCharacters({ name });
}

// Writing to URL (Client Component)
const router = useRouter();
router.push(`/?name=${searchValue}`);
````

### Caching

Three-layer strategy:

1. **Data Cache** - 1 hour revalidation via `next: { revalidate: 3600 }`
2. **Response Cache** - Page-level via `export const revalidate = 3600`
3. **Image Optimization** - Automatic via Next.js `<Image>`

See [README.md](../README.md) for detailed caching implementation.

---

## Resources

- [README.md](../README.md) - Full project documentation
- [e2e-testing.md](e2e-testing.md) - Testing documentation
- [graphql-migration.md](graphql-migration.md) - GraphQL migration guide
- [Rick & Morty API](https://rickandmortyapi.com/documentation)
- [Next.js Docs](https://nextjs.org/docs)
