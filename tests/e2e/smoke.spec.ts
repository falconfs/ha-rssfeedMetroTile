import { test, expect } from '@playwright/test';

test.describe('Basic Smoke Test', () => {
  test('page loads', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    console.log('Page title:', title);
    
    const html = await page.content();
    console.log('Page has rssfeed-metro-tile element:', html.includes('rssfeed-metro-tile'));
  });

  test('card element exists', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const card = page.locator('rssfeed-metro-tile');
    const count = await card.count();
    console.log('Card count:', count);
    
    expect(count).toBeGreaterThan(0);
  });
});
