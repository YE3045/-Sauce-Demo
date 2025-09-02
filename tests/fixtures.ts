import { test as base, Page, BrowserContext, expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
type Fixtures = {
  context: BrowserContext;
  page: Page;
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  // Fresh context for each test
  context: async ({ browser }, use) => {
    const context = await browser.newContext();
    await use(context);
    await context.close();
  },

  // Fresh page for each test
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // Logged-in page fixture
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await use(page);
  },
});

export { expect };
