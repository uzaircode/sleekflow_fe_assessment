# E2E Testing with Playwright

This project uses **Playwright** for end-to-end testing to verify all core requirements and bonus features from the assessment specification.

## 📋 Test Coverage

### **Core Requirements:**

- ✅ **Contact List Page** - Display contacts with pagination
- ✅ **Contact Details Page** - Individual contact information
- ✅ **Search Functionality** - Search by character name
- ✅ **Filtering** - Status, Species, Gender filters
- ✅ **Pagination** - Navigate between pages
- ✅ **Error Handling** - 404 and error boundaries
- ✅ **Server-Side Rendering** - Verify SSR implementation

### **Bonus Requirements:**

- ✅ **GraphQL Integration** - Verify GraphQL usage instead of REST
- ✅ **Responsive Design** - Mobile and tablet testing
- ✅ **Loading States** - Suspense and skeleton screens

## 🚀 Running Tests

### **Prerequisites**

```bash
# Install dependencies (already done)
npm install

# Install Playwright browsers (already done)
npx playwright install
```

### **Run All Tests**

```bash
# Run all tests in headless mode
npm test

# Run with UI mode (recommended for development)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Run only Chrome tests
npm run test:chromium
```

### **View Test Results**

```bash
# Open HTML report
npm run test:report
```

## 📁 Test Structure

```
e2e/
├── contact-list.spec.ts      # Contact list page tests
├── contact-details.spec.ts   # Individual contact tests
├── search.spec.ts            # Search functionality tests
├── filtering.spec.ts         # Filter tests (status, species, gender)
├── pagination.spec.ts        # Pagination tests
├── error-handling.spec.ts    # 404 and error boundary tests
├── responsive-design.spec.ts # Mobile/tablet responsive tests
├── loading-states.spec.ts    # Loading indicators tests
└── graphql-bonus.spec.ts     # GraphQL implementation verification
```

## 🧪 Test Examples

### Contact List

- Displays table with character data
- Shows images, names, status, species, gender
- Clickable rows navigate to details
- Server-side rendered

### Search

- Search input in header
- Submit redirects to `/search?name=X`
- Display search results
- Handle empty queries

### Filtering

- Apply single filters (status/species/gender)
- Combine multiple filters
- Update URL parameters
- Reset page on filter change

### Pagination

- Navigate next/previous
- Click page numbers
- Maintain filters during pagination
- Update URL with page parameter

### Contact Details

- Display character information
- Show episode appearances
- Handle invalid IDs (404)
- Server-side rendered

### Error Handling

- 404 for invalid routes
- 404 for non-existent contacts
- Graceful error messages

### GraphQL (Bonus)

- Verify GraphQL endpoint usage
- No REST API calls
- Optimized data fetching

### Responsive Design (Bonus)

- Mobile viewport (375px)
- Tablet viewport (768px)
- No horizontal overflow
- Touch-friendly controls

## 🎯 Browser Coverage

Tests run on:

- ✅ **Chromium** (Chrome/Edge)
- ✅ **Firefox**
- ✅ **WebKit** (Safari)
- ✅ **Mobile Chrome** (Pixel 5)
- ✅ **Mobile Safari** (iPhone 12)

## 📊 CI/CD Ready

- Configured for CI environments
- Automatic retries on failure
- HTML reports generation
- Screenshots on failure
- Trace on first retry

## 🔧 Configuration

See [playwright.config.ts](../playwright.config.ts) for full configuration including:

- Base URL
- Timeouts
- Retry strategy
- Reporter settings
- Browser projects
- Dev server auto-start
