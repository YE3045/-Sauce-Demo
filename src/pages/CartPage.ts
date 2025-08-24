import { Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.click('.shopping_cart_link');
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItems(): Promise<Array<{name:string, price:number}>> {
    const rows = this.page.locator('.cart_item');
    const count = await rows.count();
    const items = [];
    for (let i=0;i<count;i++) {
      const row = rows.nth(i);
      const name = await row.locator('.inventory_item_name').textContent() ?? '';
      const priceText = await row.locator('.inventory_item_price').textContent() ?? '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g,''));
      items.push({ name: name.trim(), price });
    }
    return items;
  }

  async checkout() {
    await this.page.click('[data-test="checkout"]');
    await this.page.waitForLoadState('networkidle');
  }
}
