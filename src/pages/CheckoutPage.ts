import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async fillCustomer(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('[data-test="continue"]')
    ]);
  }

  async getSummary(): Promise<{ itemTotal:number, tax:number, total:number }> {
    const itemTotalText = await this.page.locator('.summary_subtotal_label').textContent() ?? '';
    const taxText = await this.page.locator('.summary_tax_label').textContent() ?? '';
    const totalText = await this.page.locator('.summary_total_label').textContent() ?? '';
    const itemTotal = parseFloat(itemTotalText.replace(/[^0-9.]/g,''));
    const tax = parseFloat(taxText.replace(/[^0-9.]/g,''));
    const total = parseFloat(totalText.replace(/[^0-9.]/g,''));
    return { itemTotal, tax, total };
  }

  async finish() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('[data-test="finish"]')
    ]);
  }
}
