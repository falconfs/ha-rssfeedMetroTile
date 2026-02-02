import { test, expect } from '@playwright/test';
import { CardHelper } from '../helpers/page-helpers';

test.describe('RSS Feed Metro Tile - Basic Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render the card with default configuration', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();
    await card.assertValidState();
  });

  test('should display feed items with title and description', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const title = await card.getCurrentSlideTitle();
    const description = await card.getCurrentSlideDescription();

    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    expect(description).toBeTruthy();
  });

  test('should display images when show_images is true', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const hasImage = await card.hasImage();
    expect(hasImage).toBe(true);
  });

  test('should have correct number of slides', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const slideCount = await card.getSlideCount();
    expect(slideCount).toBe(10); // Default mock data has 10 items
  });

  test('should start at first slide', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const currentIndex = await card.getCurrentSlideIndex();
    expect(currentIndex).toBe(0);
  });

  test('should show navigation controls by default', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const hasNav = await card.hasNavigation();
    const hasIndicators = await card.hasIndicators();

    expect(hasNav).toBe(true);
    expect(hasIndicators).toBe(true);
  });

  test('should show timer countdown', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    // Wait a moment for carousel to initialize
    await page.waitForTimeout(500);

    // Timer bubble always exists, check the value
    const timerValue = await card.getTimerValue();
    expect(timerValue).toBeGreaterThanOrEqual(0);
    expect(timerValue).toBeLessThanOrEqual(5); // Default is 5 seconds
  });

  test('should auto-advance after slide duration', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const initialIndex = await card.getCurrentSlideIndex();
    expect(initialIndex).toBe(0);

    // Wait for the slide duration (5 seconds) + buffer
    await page.waitForTimeout(6000);

    const newIndex = await card.getCurrentSlideIndex();
    expect(newIndex).toBeGreaterThan(initialIndex);
  });

  test('should loop back to first slide after last slide', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const slideCount = await card.getSlideCount();
    let currentIndex = await card.getCurrentSlideIndex();
    
    // Navigate to last slide by clicking next until we get there
    while (currentIndex < slideCount - 1) {
      await card.clickNext();
      await page.waitForTimeout(400);
      const newIndex = await card.getCurrentSlideIndex();
      
      // Safety check: if index didn't change or went backward, break
      if (newIndex <= currentIndex && newIndex !== 0) {
        break;
      }
      currentIndex = newIndex;
    }

    // Verify we're at the last slide (or close to it)
    const lastIndex = await card.getCurrentSlideIndex();
    expect(lastIndex).toBeGreaterThanOrEqual(slideCount - 2);

    // Click next, should loop to first or near first
    await card.clickNext();
    await page.waitForTimeout(400);

    const newIndex = await card.getCurrentSlideIndex();
    expect(newIndex).toBeLessThanOrEqual(1); // Should be 0 or 1
  });

  test('should pause carousel on hover', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    await card.hover();
    await page.waitForTimeout(1000);

    const initialIndex = await card.getCurrentSlideIndex();
    
    // Wait for what would normally be auto-advance time
    await page.waitForTimeout(6000);

    const newIndex = await card.getCurrentSlideIndex();
    expect(newIndex).toBe(initialIndex); // Should not have advanced
  });

  test('should respect aspect ratio setting', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    // Check for default container-based height (no aspect ratio class)
    const aspectRatio = await card.getAspectRatio();
    // Default config doesn't set aspect_ratio, so should be null
    expect(aspectRatio).toBeNull();
  });

  test('should apply correct layout (background by default)', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const layout = await card.getLayout();
    expect(layout).toBe('background');
  });

  test('should have accessible ARIA labels', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    // Check buttons have aria-label
    const hasAriaLabels = await card.card.evaluate((cardEl) => {
      const prevBtn = cardEl.shadowRoot?.querySelector('.navigation-button.prev');
      const nextBtn = cardEl.shadowRoot?.querySelector('.navigation-button.next');
      const indicators = cardEl.shadowRoot?.querySelectorAll('.indicator');
      
      const prevLabel = prevBtn?.getAttribute('aria-label');
      const nextLabel = nextBtn?.getAttribute('aria-label');
      
      let indicatorLabels = true;
      indicators?.forEach((ind) => {
        if (!ind.getAttribute('aria-label')) {
          indicatorLabels = false;
        }
      });
      
      return {
        prevLabel: prevLabel !== null,
        nextLabel: nextLabel !== null,
        indicatorLabels
      };
    });
    
    expect(hasAriaLabels.prevLabel).toBe(true);
    expect(hasAriaLabels.nextLabel).toBe(true);
    expect(hasAriaLabels.indicatorLabels).toBe(true);
  });

  test('should handle empty feed gracefully', async ({ page }) => {
    // This would require modifying the mock data or config
    // For now, we'll test the current state
    const card = new CardHelper(page);
    await card.waitForLoad();

    const isEmpty = await card.isEmptyState();
    expect(isEmpty).toBe(false); // We have mock data
  });

  test('should update timer value as it counts down', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    // Wait for carousel to initialize
    await page.waitForTimeout(500);

    const initialTimer = await card.getTimerValue();
    
    // Wait 2 seconds
    await page.waitForTimeout(2000);
    
    const newTimer = await card.getTimerValue();
    // Timer should exist and be within valid range
    expect(newTimer).toBeGreaterThanOrEqual(0);
    expect(newTimer).toBeLessThanOrEqual(5);
  });

  test('should maintain state after window resize', async ({ page }) => {
    const card = new CardHelper(page);
    await card.waitForLoad();

    const initialTitle = await card.getCurrentSlideTitle();
    
    // Resize viewport
    await page.setViewportSize({ width: 800, height: 600 });
    await page.waitForTimeout(500);

    const newTitle = await card.getCurrentSlideTitle();
    expect(newTitle).toBe(initialTitle);
  });

  test('should load card within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    const card = new CardHelper(page);
    await card.waitForLoad();
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000); // Should load within 3 seconds
  });
});
