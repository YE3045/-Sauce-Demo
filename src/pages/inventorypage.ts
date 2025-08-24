import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  productLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.productLocator = page.locator('.inventory_item');
  }

  async sortBy(optionText: string) {
    // sorting select doesn't have data-test but has .product_sort_container
    const select = this.page.locator('.product_sort_container');
    await select.selectOption({ label: optionText });
    // wait for list re-render
    await this.page.waitForLoadState('networkidle');
  }

  async getFirstProductName() {
    return this.page.locator('.inventory_item_name').first().textContent();
  }

  async getFirstProductPrice(): Promise<number> {
    const priceText = await this.page.locator('.inventory_item_price').first().textContent();
    return parseFloat(priceText?.replace(/[^0-9.]/g, '') ?? '0');
  }

  async addToCartByName(productDataTest: string) {
    // add-to-cart buttons have data-test like add-to-cart-sauce-labs-backpack
    const btn = this.page.locator(`[data-test="${productDataTest}"]`);
    await btn.waitFor({ state: 'visible', timeout: 10_000 });
    await btn.click();
  }

  async getProductImageMap(): Promise<Record<string,string>> {
    const items = this.productLocator;
    const count = await items.count();
    const map: Record<string,string> = {};
    for (let i=0; i<count; i++) {
      const name = await items.nth(i).locator('.inventory_item_name').textContent() ?? '';
      const src = await items.nth(i).locator('img.inventory_item_img').getAttribute('src') ?? '';
      map[name.trim()] = src;
    }
    return map;
  }
}
