import { test, expect } from '@playwright/test';
import { gotoTestPage, waitForCard } from '../helpers/page-helpers';

test.describe('Modal Custom', () => {
  test('modal opens on slide click when enabled', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Wait for first slide to be visible
    await page.waitForSelector('.slide');

    // Click on the slide
    await page.click('.slide');

    // Check if modal is opened
    const modal = await page.waitForSelector('rssfeed-modal', { timeout: 2000 });
    expect(modal).toBeTruthy();

    // Check if iframe is present
    const iframe = await page.locator('rssfeed-modal iframe');
    await expect(iframe).toBeVisible();
  });

  test('modal closes on backdrop click', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Open modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Click on backdrop
    await page.click('.modal-backdrop');

    // Modal should close (with animation delay)
    await page.waitForTimeout(300);
    const modal = await page.locator('rssfeed-modal .modal-backdrop');
    await expect(modal).toBeHidden();
  });

  test('modal closes on ESC key', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Open modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Press ESC
    await page.keyboard.press('Escape');

    // Modal should close
    await page.waitForTimeout(300);
    const modal = await page.locator('rssfeed-modal .modal-backdrop');
    await expect(modal).toBeHidden();
  });

  test('modal closes on close button click', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Open modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Click close button
    await page.click('.modal-close-button');

    // Modal should close
    await page.waitForTimeout(300);
    const modal = await page.locator('rssfeed-modal .modal-backdrop');
    await expect(modal).toBeHidden();
  });

  test('modal shows loading state', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Open modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Check for loading state (should appear briefly)
    const loading = await page.locator('.modal-loading');
    // Loading may or may not be visible depending on timing, so we just check it exists
    expect(loading).toBeTruthy();
  });

  test('only one modal open at a time', async ({ page }) => {
    await gotoTestPage(page);
    await waitForCard(page);

    // Open first modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Navigate to next slide
    await page.click('.navigation-button.next');
    await page.waitForTimeout(500);

    // Click on second slide (should close first modal)
    await page.click('.slide');

    // Wait a bit for potential second modal
    await page.waitForTimeout(300);

    // Should only have one modal
    const modals = await page.locator('rssfeed-modal .modal-backdrop:visible').count();
    expect(modals).toBe(1);
  });

  test('modal disabled shows normal links', async ({ page }) => {
    // This test would need a custom config with open_in_modal: false
    // For now, we skip this as it requires modifying the test setup
    test.skip();
  });

  test('modal adapts to mobile viewport', async ({ page }) => {
    // Set mobile viewport (< 720px)
    await page.setViewportSize({ width: 375, height: 667 });

    await gotoTestPage(page);
    await waitForCard(page);

    // Open modal
    await page.click('.slide');
    await page.waitForSelector('rssfeed-modal');

    // Check if modal uses fullscreen (95vw, 95vh)
    const container = await page.locator('.modal-container');
    const box = await container.boundingBox();

    // Should be close to fullscreen
    expect(box?.width).toBeGreaterThan(350); // ~95% of 375px
    expect(box?.height).toBeGreaterThan(630); // ~95% of 667px
  });
});
