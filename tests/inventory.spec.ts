import { test, expect } from './fixtures';
import { InventoryPage } from '../src/pages/InventoryPage';

test('Inventory sorting by price low->high and high->low', async ({ loggedInPage }) => {
  const inventory = new InventoryPage(loggedInPage);

  // Sort low to high
  await inventory.sortBy('Price (low to high)');
  const lowFirstPrice = await inventory.getFirstProductPrice();

  // Sort high to low
  await inventory.sortBy('Price (high to low)');
  const highFirstPrice = await inventory.getFirstProductPrice();

  expect(lowFirstPrice).toBeLessThanOrEqual(highFirstPrice);
});
