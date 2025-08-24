import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    // data-test attributes exist for login inputs and button
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'networkidle' }),
      this.page.click('[data-test="login-button"]')
    ]);
  }

  async getErrorText() {
    const el = this.page.locator('[data-test="error"]');
    return el.textContent();
  }
}
