# E2E Tests Setup

## Installation

Frontend E2E tests use Playwright for testing React application.

### Install Playwright

```bash
cd frontend
npm install -D @playwright/test
npx playwright install
```

### Configuration

Playwright config is in `frontend/playwright.config.ts`

## Running Tests

```bash
# Run all E2E tests
cd frontend
npm run test:e2e

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/presentation-viewer.spec.ts

# Debug mode
npx playwright test --debug
```

## Test Structure

```
tests/e2e/
├── setup.md                    # This file
├── homepage.spec.ts            # Homepage tests
├── presentation-viewer.spec.ts # Viewer tests
└── export-flow.spec.ts        # Export functionality tests
```

## Prerequisites

1. Backend running on http://localhost:8000
2. Frontend running on http://localhost:5173
3. Test presentations available in frontend/src/presentations/

## Writing Tests

Example test structure:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await expect(page.locator('h1')).toBeVisible();
  });
});
```

## Best Practices

1. Use data-testid attributes for stable selectors
2. Wait for network idle before assertions
3. Test user flows, not implementation details
4. Use page objects for complex scenarios
5. Keep tests independent and isolated
