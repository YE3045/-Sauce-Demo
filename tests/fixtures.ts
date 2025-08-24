import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

type Fixtures = {
  loggedInPage: Page;
};

export const test = base.extend<Fixtures>({
  loggedInPage: async ({ browser }, use) => {
    // Create a fresh context and page, login as standard_user and provide the page.
    const context = await browser.newContext();
    const page = await context.newPage();
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await use(page);
    await context.close();
  }
});

export { expect } from '@playwright/test';
