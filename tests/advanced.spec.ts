import { test, expect } from './fixtures';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';

test.describe('Advanced scenarios', () => {

  test('problem_user: detect wrong / mismatched product images compared to standard_user', async ({ browser }) => {
    // Get baseline image map for standard_user
    const ctx1 = await browser.newContext();
    const page1 = await ctx1.newPage();
    const login1 = new LoginPage(page1);
    await login1.goto();
    await login1.login('standard_user', 'secret_sauce');
    const inventory1 = new InventoryPage(page1);
    const baseline = await inventory1.getProductImageMap();
    await ctx1.close();

    // Now get image map for problem_user
    const ctx2 = await browser.newContext();
    const page2 = await ctx2.newPage();
    const login2 = new LoginPage(page2);
    await login2.goto();
    await login2.login('problem_user', 'secret_sauce');
    const inventory2 = new InventoryPage(page2);
    const problemMap = await inventory2.getProductImageMap();
    await ctx2.close();

    // Compare: expect at least one product where image src differs (indicating mismatch)
    const mismatches = Object.keys(baseline).filter(name => {
      return baseline[name] !== problemMap[name];
    });

    expect(mismatches.length).toBeGreaterThan(0);
  });

  test('performance_glitch_user: robustly add to cart without brittle waits', async ({ browser }) => {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const login = new LoginPage(page);
    await login.goto();
    await login.login('performance_glitch_user', 'secret_sauce');

    const inventory = new InventoryPage(page);

    // Instead of static waits, use locator wait/expect with a generous timeout
    const addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    // Wait for add button to be visible and enabled
    await expect(addBtn).toBeVisible({ timeout: 15_000 });
    await expect(addBtn).toBeEnabled({ timeout: 15_000 });

    // Click and confirm cart badge increments or cart link shows item
    await addBtn.click();
    // Wait for cart count indicator (if present) or cart item to appear
    const cartLink = page.locator('.shopping_cart_link');
    await expect(cartLink).toBeVisible({ timeout: 10_000 });

    // Open cart and assert item exists
    await cartLink.click();
    await page.waitForLoadState('networkidle');
    const cartItem = page.locator('.cart_item .inventory_item_name', { hasText: 'Sauce Labs Backpack' });
    await expect(cartItem).toBeVisible({ timeout: 10_000 });

    await ctx.close();
  });

});
