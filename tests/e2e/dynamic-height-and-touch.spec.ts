import { test, expect, Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

async function setupCard(page: Page, config: Record<string, any>): Promise<void> {
  await page.goto(`${BASE_URL}/tests/fixture.html`);
  await page.waitForSelector('rssfeed-metro-tile');

  await page.evaluate(cfg => {
    const card = document.querySelector('rssfeed-metro-tile');
    if (card) {
      (card as any).setConfig(cfg);
    }
  }, config);

  await page.waitForTimeout(500);
}

async function simulateSwipe(
  page: Page,
  startX: number,
  startY: number,
  endX: number,
  endY: number
): Promise<void> {
  await page.evaluate(
    ({ x1, y1, x2, y2 }) => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      const elem = card.shadowRoot.querySelector('.carousel-wrapper') as HTMLElement;

      if (!elem) throw new Error('Carousel wrapper not found in shadow DOM');

      // Create actual Touch objects
      const touch1 = new Touch({
        identifier: 0,
        target: elem,
        clientX: x1,
        clientY: y1,
        screenX: x1,
        screenY: y1,
        pageX: x1,
        pageY: y1,
      });

      elem.dispatchEvent(
        new TouchEvent('touchstart', {
          bubbles: true,
          cancelable: true,
          touches: [touch1],
          targetTouches: [touch1],
          changedTouches: [touch1],
        })
      );

      const touch2 = new Touch({
        identifier: 0,
        target: elem,
        clientX: x2,
        clientY: y2,
        screenX: x2,
        screenY: y2,
        pageX: x2,
        pageY: y2,
      });

      elem.dispatchEvent(
        new TouchEvent('touchmove', {
          bubbles: true,
          cancelable: true,
          touches: [touch2],
          targetTouches: [touch2],
          changedTouches: [touch2],
        })
      );

      elem.dispatchEvent(
        new TouchEvent('touchend', {
          bubbles: true,
          cancelable: true,
          touches: [],
          targetTouches: [],
          changedTouches: [touch2],
        })
      );
    },
    { x1: startX, y1: startY, x2: endX, y2: endY }
  );
}

test.describe('Basic Card Rendering', () => {
  test('should render card with default config', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      show_navigation: true,
      show_indicators: true,
      // aspect_ratio will use default '16:9'
    });

    const card = page.locator('rssfeed-metro-tile');
    const box = await card.boundingBox();

    // Card should have proper height (based on aspect ratio)
    expect(box?.height).toBeGreaterThanOrEqual(100);
  });

  test('should show navigation buttons and indicators correctly', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      show_navigation: true,
      show_indicators: true,
    });

    // Check navigation buttons are visible
    const prevButton = page.locator('.navigation-button.prev');
    const nextButton = page.locator('.navigation-button.next');

    await expect(prevButton).toBeVisible();
    await expect(nextButton).toBeVisible();

    // Check prev button shows ∧ for vertical
    await expect(prevButton).toHaveText('∧');
    await expect(nextButton).toHaveText('∨');

    // Check indicators are visible
    const indicators = page.locator('.indicator');
    const indicatorCount = await indicators.count();
    expect(indicatorCount).toBeGreaterThan(0);
  });

  test('should display slide content correctly', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
    });

    // Check that slide content is visible
    const slideTitle = page.locator('.slide-title').first();
    const slideDescription = page.locator('.slide-description').first();

    await expect(slideTitle).toBeVisible();
    await expect(slideDescription).toBeVisible();

    // Verify content has actual text
    const titleText = await slideTitle.textContent();
    expect(titleText).toBeTruthy();
    expect(titleText?.length).toBeGreaterThan(0);
  });

  test('should transition correctly between slides', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      auto_play: false,
    });

    // Get first slide
    const carousel = page.locator('.carousel');
    const initialTransform = await carousel.evaluate(el => getComputedStyle(el).transform);

    // Click next button
    await page.click('.navigation-button.next');
    await page.waitForTimeout(700); // Wait for transition

    // Verify transform changed
    const newTransform = await carousel.evaluate(el => getComputedStyle(el).transform);

    expect(newTransform).not.toBe(initialTransform);
  });
});

test.describe('Touch Gestures', () => {
  test('should navigate to next slide on swipe up (vertical transition)', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      auto_play: false,
    });

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    // Get initial slide index
    const initialIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    // Simulate swipe up (from center to top)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const topY = box.y + 50;

    await simulateSwipe(page, centerX, centerY, centerX, topY);

    await page.waitForTimeout(700);

    // Verify slide changed
    const newIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    expect(newIndex).toBe(initialIndex + 1);
  });

  test('should navigate to previous slide on swipe down (vertical transition)', async ({
    page,
  }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      auto_play: false,
    });

    // First go to slide 2
    await page.click('.navigation-button.next');
    await page.waitForTimeout(700);

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    const initialIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    // Simulate swipe down (from center to bottom)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const bottomY = box.y + box.height - 50;

    await simulateSwipe(page, centerX, centerY, centerX, bottomY);

    await page.waitForTimeout(700);

    // Verify slide changed
    const newIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    expect(newIndex).toBe(initialIndex - 1);
  });

  test('should navigate to next slide on swipe left (horizontal transition)', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-horizontal',
      auto_play: false,
    });

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    const initialIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    // Simulate swipe left (from center to left)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const leftX = box.x + 50;

    await simulateSwipe(page, centerX, centerY, leftX, centerY);

    await page.waitForTimeout(700);

    // Verify slide changed
    const newIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    expect(newIndex).toBe(initialIndex + 1);
  });

  test('should navigate to previous slide on swipe right (horizontal transition)', async ({
    page,
  }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-horizontal',
      auto_play: false,
    });

    // First go to slide 2
    await page.click('.navigation-button.next');
    await page.waitForTimeout(700);

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    const initialIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    // Simulate swipe right (from center to right)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const rightX = box.x + box.width - 50;

    await simulateSwipe(page, centerX, centerY, rightX, centerY);

    await page.waitForTimeout(700);

    // Verify slide changed
    const newIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    expect(newIndex).toBe(initialIndex - 1);
  });

  test('should pause carousel on touch', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      auto_play: true,
      pause_on_hover: true,
    });

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    // Touch down (start touch)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    // Dispatch touchstart event
    await page.evaluate(
      ({ x, y }) => {
        const card = document.querySelector('rssfeed-metro-tile') as any;
        const elem = card.shadowRoot.querySelector('.carousel-wrapper') as HTMLElement;

        if (!elem) throw new Error('Carousel wrapper not found in shadow DOM');

        const touch = new Touch({
          identifier: 0,
          target: elem,
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
          pageX: x,
          pageY: y,
        });

        elem.dispatchEvent(
          new TouchEvent('touchstart', {
            bubbles: true,
            cancelable: true,
            touches: [touch],
            targetTouches: [touch],
            changedTouches: [touch],
          })
        );
      },
      { x: centerX, y: centerY }
    );

    await page.waitForTimeout(200);

    // Check if paused
    const isPaused = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.isPaused;
    });

    expect(isPaused).toBe(true);

    // Release touch
    await page.evaluate(
      ({ x, y }) => {
        const card = document.querySelector('rssfeed-metro-tile') as any;
        const elem = card.shadowRoot.querySelector('.carousel-wrapper') as HTMLElement;

        if (!elem) throw new Error('Carousel wrapper not found in shadow DOM');

        const touch = new Touch({
          identifier: 0,
          target: elem,
          clientX: x,
          clientY: y,
          screenX: x,
          screenY: y,
          pageX: x,
          pageY: y,
        });

        elem.dispatchEvent(
          new TouchEvent('touchend', {
            bubbles: true,
            cancelable: true,
            touches: [],
            targetTouches: [],
            changedTouches: [touch],
          })
        );
      },
      { x: centerX, y: centerY }
    );
  });

  test('should ignore short swipes (less than threshold)', async ({ page }) => {
    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      auto_play: false,
    });

    const carouselWrapper = page.locator('.carousel-wrapper');
    const box = await carouselWrapper.boundingBox();

    if (!box) throw new Error('Carousel not found');

    const initialIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    // Simulate very short swipe (less than 50px threshold)
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;
    const shortY = centerY - 30; // Only 30px

    await simulateSwipe(page, centerX, centerY, centerX, shortY);

    await page.waitForTimeout(500);

    // Verify slide did NOT change
    const newIndex = await page.evaluate(() => {
      const card = document.querySelector('rssfeed-metro-tile') as any;
      return card._carouselState.currentIndex;
    });

    expect(newIndex).toBe(initialIndex);
  });
});

test.describe('Responsive Behavior', () => {
  test('should adapt to different viewport sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
    });

    const card = page.locator('rssfeed-metro-tile');
    let box = await card.boundingBox();

    expect(box?.width).toBeLessThanOrEqual(375);
    expect(box?.height).toBeGreaterThanOrEqual(300);

    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(300);

    box = await card.boundingBox();
    expect(box?.width).toBeGreaterThan(375);
    expect(box?.height).toBeGreaterThanOrEqual(300);
  });

  test('should have touch-friendly button sizes on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await setupCard(page, {
      type: 'custom:rssfeed-metro-tile',
      entity: 'sensor.test_feed',
      transition: 'slide-vertical',
      show_navigation: true,
      show_indicators: true,
    });

    // Navigation buttons should be at least 48x48 on touch devices
    // (Using CSS media query: @media (pointer: coarse))
    const prevButton = page.locator('.navigation-button.prev');
    const box = await prevButton.boundingBox();

    // Note: This might need adjustment based on actual CSS
    expect(box?.width).toBeGreaterThanOrEqual(40);
    expect(box?.height).toBeGreaterThanOrEqual(40);
  });
});
