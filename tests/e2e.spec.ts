import { test, expect } from './fixtures';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';

test('Full E2E purchase flow with total price calculation', async ({ loggedInPage }) => {
  const inventory = new InventoryPage(loggedInPage);
  const cart = new CartPage(loggedInPage);
  const checkout = new CheckoutPage(loggedInPage);
  const complete = new CheckoutCompletePage(loggedInPage);

  // Add two products by data-test names (use the actual data-test names from the site)
  await inventory.addToCartByName('add-to-cart-sauce-labs-backpack');
  await inventory.addToCartByName('add-to-cart-sauce-labs-bike-light');

  // Go to cart and checkout
  await cart.goto();
  const items = await cart.getCartItems();

  // Sum item prices
  const itemSum = items.reduce((s, it) => s + it.price, 0);

  await cart.checkout();
  await checkout.fillCustomer('Idowu', 'Ns', '100001');

  const summary = await checkout.getSummary();
  // calculate expected (according to site, tax rate is included in page; we compute expected as itemSum + tax)
  const expectedItemTotal = Number(itemSum.toFixed(2));
  const expectedTotal = Number((expectedItemTotal + summary.tax).toFixed(2));

  expect(summary.itemTotal).toBeCloseTo(expectedItemTotal, 2);
  expect(summary.total).toBeCloseTo(expectedTotal, 2);

  await checkout.finish();
  const header = await complete.getCompleteHeader();
  expect(header?.toLowerCase()).toContain('thank you');
});
