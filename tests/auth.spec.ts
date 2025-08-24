import { test, expect } from './fixtures';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Authentication scenarios', () => {
  test('Successful login (standard_user)', async ({ loggedInPage }) => {
    // loggedInPage fixture already logged in as standard_user
    await expect(loggedInPage).toHaveURL(/inventory\.html/);
    await expect(loggedInPage.locator('.inventory_list')).toBeVisible();
  });

  test('Locked out user shows correct error', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    const error = await login.getErrorText();
    expect(error).toContain('locked out'); // site shows "Sorry, this user has been locked out."
    await context.close();
  });

  test('Invalid password shows correct error', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'wrong_password');
    const error = await login.getErrorText();
    expect(error).toContain('Username and password do not match');
    await context.close();
  });
});
