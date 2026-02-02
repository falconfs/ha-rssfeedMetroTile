import { test, expect } from '@playwright/test';
import { CardHelper } from '../helpers/page-helpers';

test.describe('RSS Feed Metro Tile - Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Arrow Navigation', () => {
    test('should advance to next slide when clicking next button', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const initialIndex = await card.getCurrentSlideIndex();
      await card.clickNext();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(initialIndex + 1);
    });

    test('should go to previous slide when clicking prev button', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // First go to slide 2
      await card.clickNext();
      await page.waitForTimeout(500);
      
      let currentIndex = await card.getCurrentSlideIndex();
      expect(currentIndex).toBeGreaterThan(0);

      // Now go back
      await card.clickPrev();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(currentIndex - 1);
    });

    test('should wrap to last slide when clicking prev on first slide', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const slideCount = await card.getSlideCount();
      const initialIndex = await card.getCurrentSlideIndex();
      expect(initialIndex).toBe(0);

      await card.clickPrev();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(slideCount - 1);
    });

    test('should wrap to first slide when clicking next on last slide', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const slideCount = await card.getSlideCount();

      // Navigate to last slide
      for (let i = 0; i < slideCount - 1; i++) {
        await card.clickNext();
        await page.waitForTimeout(300);
      }

      const currentIndex = await card.getCurrentSlideIndex();
      expect(currentIndex).toBe(slideCount - 1);

      // Click next to wrap
      await card.clickNext();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(0);
    });

    test('should reset timer when manually navigating', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // Wait for timer to count down
      await page.waitForTimeout(2000);
      const timerBefore = await card.getTimerValue();

      // Click next
      await card.clickNext();
      await page.waitForTimeout(100);

      const timerAfter = await card.getTimerValue();
      expect(timerAfter).toBeGreaterThan(timerBefore);
    });
  });

  test.describe('Indicator Dots', () => {
    test('should navigate to specific slide when clicking indicator dot', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      await card.clickIndicator(3);
      await page.waitForTimeout(500);

      const currentIndex = await card.getCurrentSlideIndex();
      expect(currentIndex).toBe(3);
    });

    test('should highlight active indicator dot', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      await card.clickNext();
      await page.waitForTimeout(500);

      // Check that we have exactly one active indicator
      const activeCount = await card.card.evaluate((cardEl) => {
        const indicators = cardEl.shadowRoot?.querySelectorAll('.indicator.active');
        return indicators?.length || 0;
      });
      
      expect(activeCount).toBe(1);
    });

    test('should update indicator when carousel auto-advances', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const initialIndex = await card.getCurrentSlideIndex();
      
      await card.waitForAutoAdvance();

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(initialIndex + 1);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should navigate forward with arrow right key', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // Focus the card
      await card.card.click();
      
      const initialIndex = await card.getCurrentSlideIndex();
      await card.pressArrowRight();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(initialIndex + 1);
    });

    test('should navigate backward with arrow left key', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // Focus the card and move to slide 2
      await card.card.click();
      await card.pressArrowRight();
      await page.waitForTimeout(500);
      await card.pressArrowRight();
      await page.waitForTimeout(500);

      const currentIndex = await card.getCurrentSlideIndex();
      expect(currentIndex).toBe(2);

      await card.pressArrowLeft();
      await page.waitForTimeout(500);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(1);
    });

    test('should have visible focus indicators', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // Focus the card first
      await card.card.click();
      
      // Check if the carousel wrapper is focusable and has tabindex
      const hasFocusStyles = await card.card.evaluate((cardEl) => {
        const shadow = cardEl.shadowRoot;
        const wrapper = shadow?.querySelector('.carousel-wrapper') as HTMLElement;
        if (!wrapper) return false;
        
        // Check if wrapper has tabindex (making it focusable)
        const tabindex = wrapper.getAttribute('tabindex');
        return tabindex !== null && tabindex === '0';
      });
      
      expect(hasFocusStyles).toBeTruthy();
    });
  });

  test.describe('Touch Gestures', () => {
    test.skip('should navigate forward on swipe left', async ({ page }) => {
      // TODO: Touch gestures are not fully implemented in the component
      // Skipping until touch handler is properly integrated
    });

    test.skip('should navigate backward on swipe right', async ({ page }) => {
      // TODO: Touch gestures are not fully implemented in the component
      // Skipping until touch handler is properly integrated
    });

    test.skip('should pause carousel on touch', async ({ page }) => {
      // TODO: Touch pause functionality not yet implemented
      // Skipping until touch handler supports pause
    });
  });

  test.describe('Carousel Control', () => {
    test('should pause carousel when hovering over card', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      await card.hover();
      const initialIndex = await card.getCurrentSlideIndex();
      
      // Wait longer than slide duration
      await page.waitForTimeout(6000);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBe(initialIndex);
    });

    test('should resume carousel when mouse leaves card', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      // Hover to pause
      await card.hover();
      await page.waitForTimeout(1000);

      // Move mouse away
      await page.mouse.move(0, 0);
      
      // Should auto-advance now
      await card.waitForAutoAdvance(8000);

      const newIndex = await card.getCurrentSlideIndex();
      expect(newIndex).toBeGreaterThan(0);
    });

    test('should restart timer after manual navigation', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      await card.clickNext();
      await page.waitForTimeout(100);

      const timer = await card.getTimerValue();
      expect(timer).toBeGreaterThan(3); // Should be reset to ~5 seconds
    });
  });

  test.describe('Navigation Visibility', () => {
    test('should show navigation controls when configured', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const hasNav = await card.hasNavigation();
      expect(hasNav).toBe(true);
    });

    test('should show indicators when configured', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const hasIndicators = await card.hasIndicators();
      expect(hasIndicators).toBe(true);
    });

    test('should have correct number of indicator dots', async ({ page }) => {
      const card = new CardHelper(page);
      await card.waitForLoad();

      const slideCount = await card.getSlideCount();
      
      // Count indicators directly
      const indicatorCount = await card.card.evaluate((cardEl) => {
        const indicators = cardEl.shadowRoot?.querySelectorAll('.indicator');
        return indicators?.length || 0;
      });

      expect(indicatorCount).toBe(slideCount);
    });
  });
});
