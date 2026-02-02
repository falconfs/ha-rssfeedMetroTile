import { Page, Locator, expect } from '@playwright/test';

/**
 * Helper class for interacting with RSS Feed Metro Tile card in tests
 */
export class CardHelper {
  readonly page: Page;
  readonly card: Locator;

  constructor(page: Page) {
    this.page = page;
    this.card = page.locator('rssfeed-metro-tile').first();
  }

  /**
   * Helper to evaluate in shadow DOM
   */
  private async evaluateInShadow<T>(selector: string, fn: (el: Element | null) => T): Promise<T> {
    return await this.card.evaluate((card, sel) => {
      const element = card.shadowRoot?.querySelector(sel);
      return fn(element);
    }, selector, fn);
  }

  /**
   * Get locator within shadow DOM
   */
  private shadow(selector: string): Locator {
    // Playwright doesn't support >> syntax in all contexts
    // We need to use evaluate for shadow DOM piercing
    return this.card.locator(`internal:control=enter-shadow >> ${selector}`);
  }

  get slideContainer(): Locator {
    return this.shadow('.carousel');
  }

  get currentSlide(): Locator {
    return this.shadow('.slide.active');
  }

  get prevButton(): Locator {
    return this.shadow('.navigation-button.prev');
  }

  get nextButton(): Locator {
    return this.shadow('.navigation-button.next');
  }

  get indicators(): Locator {
    return this.shadow('.indicators');
  }

  get timer(): Locator {
    return this.shadow('.timer-bubble');
  }

  get currentSlide(): Locator {
    return this.page.locator('rssfeed-metro-tile >> .slide.active').first();
  }

  get prevButton(): Locator {
    return this.page.locator('rssfeed-metro-tile >> .navigation-button.prev').first();
  }

  get nextButton(): Locator {
    return this.page.locator('rssfeed-metro-tile >> .navigation-button.next').first();
  }

  get indicators(): Locator {
    return this.page.locator('rssfeed-metro-tile >> .indicators').first();
  }

  get timer(): Locator {
    return this.page.locator('rssfeed-metro-tile >> .timer-bubble').first();
  }

  /**
   * Wait for card to be fully loaded and rendered
   */
  async waitForLoad() {
    await this.card.waitFor({ state: 'visible' });
    await this.currentSlide.waitFor({ state: 'visible' });
  }

  /**
   * Get the current slide index (0-based)
   */
  async getCurrentSlideIndex(): Promise<number> {
    return await this.card.evaluate((card) => {
      const indicators = card.shadowRoot?.querySelectorAll('.indicator');
      if (!indicators) return 0;
      
      for (let i = 0; i < indicators.length; i++) {
        if (indicators[i].classList.contains('active')) {
          return i;
        }
      }
      return 0;
    });
  }

  /**
   * Get total number of slides
   */
  async getSlideCount(): Promise<number> {
    return await this.card.evaluate((card) => {
      const indicators = card.shadowRoot?.querySelectorAll('.indicator');
      return indicators?.length || 0;
    });
  }

  /**
   * Click the next button
   */
  async clickNext() {
    await this.card.evaluate((card) => {
      const nextBtn = card.shadowRoot?.querySelector('.navigation-button.next') as HTMLElement;
      nextBtn?.click();
    });
    // Wait a bit for the transition
    await this.page.waitForTimeout(100);
  }

  /**
   * Click the previous button
   */
  async clickPrev() {
    await this.card.evaluate((card) => {
      const prevBtn = card.shadowRoot?.querySelector('.navigation-button.prev') as HTMLElement;
      prevBtn?.click();
    });
    // Wait a bit for the transition
    await this.page.waitForTimeout(100);
  }

  /**
   * Click on a specific indicator dot (0-based index)
   */
  async clickIndicator(index: number) {
    await this.card.evaluate((card, idx) => {
      const indicators = card.shadowRoot?.querySelectorAll('.indicator');
      if (indicators && indicators[idx]) {
        (indicators[idx] as HTMLElement).click();
      }
    }, index);
  }

  /**
   * Get the title of the current slide
   */
  async getCurrentSlideTitle(): Promise<string> {
    const title = this.currentSlide.locator('.slide-title');
    return await title.textContent() || '';
  }

  /**
   * Get the description of the current slide
   */
  async getCurrentSlideDescription(): Promise<string> {
    const desc = this.currentSlide.locator('.slide-description');
    return await desc.textContent() || '';
  }

  /**
   * Check if the current slide has an image
   */
  async hasImage(): Promise<boolean> {
    return await this.card.evaluate((card) => {
      const slide = card.shadowRoot?.querySelector('.slide.active');
      return slide?.querySelector('img') !== null;
    });
  }

  /**
   * Get the current timer value (in seconds)
   */
  async getTimerValue(): Promise<number> {
    return await this.card.evaluate((card) => {
      const timer = card.shadowRoot?.querySelector('.timer-bubble');
      const timerText = timer?.textContent?.trim() || '0';
      return parseInt(timerText, 10) || 0;
    });
  }

  /**
   * Wait for carousel to auto-advance (with timeout)
   */
  async waitForAutoAdvance(timeout = 10000) {
    const initialIndex = await this.getCurrentSlideIndex();
    
    await this.page.waitForFunction(
      ({ cardSelector, initialIdx }) => {
        const card = document.querySelector(cardSelector);
        if (!card) return false;
        const activeIndicator = card.shadowRoot?.querySelector('.indicator.active');
        if (!activeIndicator) return false;
        const allIndicators = Array.from(card.shadowRoot?.querySelectorAll('.indicator') || []);
        const currentIdx = allIndicators.indexOf(activeIndicator);
        return currentIdx !== initialIdx;
      },
      { cardSelector: 'rssfeed-metro-tile', initialIdx: initialIndex },
      { timeout }
    );
  }

  /**
   * Simulate keyboard arrow navigation
   */
  async pressArrowRight() {
    await this.card.press('ArrowRight');
  }

  async pressArrowLeft() {
    await this.card.press('ArrowLeft');
  }

  /**
   * Simulate touch swipe gesture
   */
  async swipeLeft() {
    const box = await this.slideContainer.boundingBox();
    if (!box) throw new Error('Slide container not found');
    
    await this.page.touchscreen.tap(box.x + box.width * 0.8, box.y + box.height / 2);
    await this.page.touchscreen.tap(box.x + box.width * 0.2, box.y + box.height / 2);
  }

  async swipeRight() {
    const box = await this.slideContainer.boundingBox();
    if (!box) throw new Error('Slide container not found');
    
    await this.page.touchscreen.tap(box.x + box.width * 0.2, box.y + box.height / 2);
    await this.page.touchscreen.tap(box.x + box.width * 0.8, box.y + box.height / 2);
  }

  /**
   * Hover over the card (should pause carousel)
   */
  async hover() {
    await this.card.hover();
  }

  /**
   * Check if navigation buttons are visible
   */
  async hasNavigation(): Promise<boolean> {
    return await this.card.evaluate((card) => {
      const prev = card.shadowRoot?.querySelector('.navigation-button.prev');
      const next = card.shadowRoot?.querySelector('.navigation-button.next');
      return prev !== null && next !== null;
    });
  }

  /**
   * Check if indicators are visible
   */
  async hasIndicators(): Promise<boolean> {
    return await this.card.evaluate((card) => {
      const indicators = card.shadowRoot?.querySelector('.indicators');
      return indicators !== null;
    });
  }

  /**
   * Check if timer is visible
   */
  async hasTimer(): Promise<boolean> {
    return await this.card.evaluate((card) => {
      const timer = card.shadowRoot?.querySelector('.timer-bubble');
      return timer !== null;
    });
  }

  /**
   * Get error message if displayed
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.card.evaluate((card) => {
      const errorEl = card.shadowRoot?.querySelector('.error-message');
      return errorEl?.textContent || null;
    });
  }

  /**
   * Check if empty state (Star Trek quote) is shown
   */
  async isEmptyState(): Promise<boolean> {
    return await this.card.evaluate((card) => {
      const emptyState = card.shadowRoot?.querySelector('.empty-state');
      return emptyState !== null;
    });
  }

  /**
   * Get the aspect ratio class applied to the card
   */
  async getAspectRatio(): Promise<string | null> {
    return await this.card.evaluate((card) => {
      const container = card.shadowRoot?.querySelector('.aspect-ratio-container');
      if (!container) return null;
      
      const classList = container.className;
      if (classList.includes('aspect-ratio-square')) return '1:1';
      if (classList.includes('aspect-ratio-wide')) return '16:9';
      if (classList.includes('aspect-ratio-classic')) return '4:3';
      return null;
    });
  }

  /**
   * Get computed height of the card
   */
  async getCardHeight(): Promise<number> {
    const box = await this.card.boundingBox();
    return box?.height || 0;
  }

  /**
   * Check if layout is background or split
   */
  async getLayout(): Promise<'background' | 'split' | null> {
    return await this.card.evaluate((card) => {
      const wrapper = card.shadowRoot?.querySelector('.carousel-wrapper');
      if (!wrapper) return null;
      
      const classList = wrapper.className;
      if (classList.includes('layout-background')) return 'background';
      if (classList.includes('layout-split')) return 'split';
      return null;
    });
  }

  /**
   * Assert that the card is in a valid state
   */
  async assertValidState() {
    await expect(this.card).toBeVisible();
    await expect(this.currentSlide).toBeVisible();
    
    const slideCount = await this.getSlideCount();
    expect(slideCount).toBeGreaterThan(0);
    
    const currentIndex = await this.getCurrentSlideIndex();
    expect(currentIndex).toBeGreaterThanOrEqual(0);
    expect(currentIndex).toBeLessThan(slideCount);
  }
}

/**
 * Helper to configure card with specific settings
 */
export async function setCardConfig(page: Page, config: Record<string, any>) {
  await page.evaluate((cfg) => {
    const card = document.querySelector('rssfeed-metro-tile');
    if (card && 'setConfig' in card) {
      (card as any).setConfig(cfg);
    }
  }, config);
}

/**
 * Helper to set mock feed data
 */
export async function setMockFeed(page: Page, feedItems: any[]) {
  await page.evaluate((items) => {
    const card = document.querySelector('rssfeed-metro-tile');
    if (card) {
      (card as any).hass = {
        states: {
          'sensor.test_feed': {
            attributes: {
              entries: items
            }
          }
        }
      };
    }
  }, feedItems);
}
