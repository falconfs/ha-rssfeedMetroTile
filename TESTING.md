# Playwright E2E Testing Setup

## Overview

This project includes comprehensive end-to-end (E2E) tests using Playwright to test the RSS Feed Metro Tile card in a real browser environment without requiring Home Assistant.

## Setup Complete ✅

### Files Created:
1. **playwright.config.ts** - Playwright configuration for 5 browsers (Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari)
2. **dev/index.html** - Standalone dev page with mock data and live controls
3. **dev/mock-data.ts** - Mock Home Assistant data generator
4. **vite.config.ts** - Vite dev server configuration
5. **tests/helpers/page-helpers.ts** - Reusable test utilities (CardHelper class)
6. **tests/e2e/basic.spec.ts** - Basic functionality tests (17 tests)
7. **tests/e2e/navigation.spec.ts** - Navigation & interaction tests (36 tests)
8. **tests/e2e/transitions.spec.ts** - Layout & transition tests (32 tests)

## Quick Start

### 1. Install Dependencies
```bash
npm install
npx playwright install chromium  # Or: npx playwright install (all browsers)
```

### 2. Build the Project
```bash
npm run build  # Creates dist/rssfeed-metro-tile.js
```

### 3. Run Dev Server (Optional)
```bash
npm run dev  # Opens http://localhost:3000 with live reload
```

### 4. Run Tests
```bash
# Run all E2E tests
npm run test:e2e

# Run with UI (recommended for development)
npm run test:e2e:ui

# Run specific test file
npx playwright test basic.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Debug mode
npm run test:e2e:debug
```

## Test Structure

### CardHelper Class
Located in `tests/helpers/page-helpers.ts`, provides convenient methods for interacting with the card:

```typescript
const card = new CardHelper(page);

// Wait for card to load
await card.waitForLoad();

// Navigation
await card.clickNext();
await card.clickPrev();
await card.clickIndicator(3);
await card.pressArrowRight();
await card.pressArrowLeft();

// State inspection
const index = await card.getCurrentSlideIndex();
const count = await card.getSlideCount();
const title = await card.getCurrentSlideTitle();
const hasImage = await card.hasImage();
const layout = await card.getLayout(); // 'background' or 'split'

// Validation
await card.assertValidState();
```

### Test Suites

#### 1. Basic Functionality (basic.spec.ts)
- ✅ Card rendering
- ✅ Feed item display (title, description, images)
- ✅ Slide counting and indexing
- ✅ Timer display
- ⚠️ Auto-advance carousel (some failures - timer element not always present)
- ✅ Pause on hover
- ✅ Aspect ratio configuration
- ⚠️ Layout detection (needs refinement)
- ⚠️ Accessibility (ARIA labels - partially implemented)

#### 2. Navigation (navigation.spec.ts)
- Arrow navigation (next/prev buttons)
- Indicator dots (click to jump)
- Keyboard navigation (arrow keys)
- Touch gestures (swipe left/right)
- Carousel control (pause/resume)
- Navigation visibility

#### 3. Transitions & Layouts (transitions.spec.ts)
- Transition effects (slide-vertical, slide-horizontal, fade)
- Layout modes (background blur, split)
- Aspect ratios (1:1, 16:9, 4:3, container-based)
- Responsive design (mobile, tablet, desktop)
- Image handling (lazy loading, fallbacks)
- Performance (no memory leaks, smooth navigation)
- Theme support (CSS variables, dark mode)

## Current Status: 9/17 Basic Tests Passing ✅

### Passing Tests:
- Card renders with default configuration
- Displays feed items with title and description
- Shows images when configured
- Starts at first slide
- Shows navigation controls
- Respects aspect ratio setting
- Applies correct layout
- Maintains state after resize
- Loads within reasonable time

### Known Issues:
1. **Timer Element**: Not always present in shadow DOM (config-dependent)
2. **Auto-Advance**: Depends on timer configuration
3. **ARIA Labels**: Need to verify correct implementation in component
4. **Layout Detection**: Shadow DOM piercing for nested elements needs refinement

## Shadow DOM Handling

The RSS Feed Metro Tile uses Shadow DOM. Playwright requires special syntax:

```typescript
// ✅ Correct: Use >> to pierce shadow DOM
page.locator('rssfeed-metro-tile >> .slide-container')

// ❌ Wrong: Standard selector won't work
page.locator('rssfeed-metro-tile .slide-container')
```

The `CardHelper` class handles this automatically.

## Development Workflow

### 1. Local Development
```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Run tests in UI mode
npm run test:e2e:ui
```

### 2. Write New Test
```typescript
import { test, expect } from '@playwright/test';
import { CardHelper } from '../helpers/page-helpers';

test('my new test', async ({ page }) => {
  await page.goto('/');
  const card = new CardHelper(page);
  await card.waitForLoad();
  
  // Your test logic here
  const title = await card.getCurrentSlideTitle();
  expect(title).toBeTruthy();
});
```

### 3. Debug Failing Test
```bash
# Run with headed mode to see what's happening
npx playwright test my-test.spec.ts --headed --debug

# Or use UI mode for step-by-step debugging
npx playwright test my-test.spec.ts --ui
```

## CI/CD Integration (Future)

Add to `.github/workflows/test.yml`:
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Tests Timeout
- **Cause**: Element not found (shadow DOM issue) or animation too slow
- **Solution**: Increase timeout or check shadow DOM selector

### "Executable doesn't exist" Error
- **Cause**: Playwright browsers not installed
- **Solution**: Run `npx playwright install`

### Card Not Rendering
- **Cause**: Build not up to date
- **Solution**: Run `npm run build` before tests

### Mock Data Issues
- **Cause**: dev/mock-data.ts not properly imported
- **Solution**: Check Vite is handling TypeScript files

## Performance Benchmarks

Target metrics:
- Page load: < 3 seconds
- Card render: < 1 second
- Transition: < 600ms
- Navigation response: < 100ms

## Next Steps

1. ✅ Basic test infrastructure
2. ✅ Shadow DOM piercing
3. ⚠️ Fix remaining test failures (timer, ARIA, layout)
4. ⬜ Visual regression tests (Playwright screenshots)
5. ⬜ Accessibility testing (axe-core integration)
6. ⬜ Performance monitoring
7. ⬜ CI/CD pipeline
8. ⬜ Test coverage reporting

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Testing Web Components](https://playwright.dev/docs/other-locators#css-matching-shadow-dom)
- [Lit Testing Best Practices](https://lit.dev/docs/tools/testing/)
- [Home Assistant Frontend Testing](https://developers.home-assistant.io/docs/frontend/testing/)

---

**Status**: ✅ Operational - 9/17 basic tests passing, dev environment ready, shadow DOM working