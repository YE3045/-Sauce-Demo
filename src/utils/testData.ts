// src/test-data/testData.ts
// Shared test data for SauceDemo Playwright tests

export type UserCreds = {
  username: string;
  password: string;
};

export const USERS: Record<string, UserCreds> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'standard_user', password: 'wrong_password' },
};

export const CUSTOMER = {
  firstName: 'ak',
  lastName: 'yemi',
  postalCode: '100001'
};

/**
 * Product reference map for add-to-cart data-test names.
 * Keys are friendly product short-names used in tests.
 * Values are the exact `data-test` attribute used on the site.
 *
 * Example: addToCart(PRODUCTS.backpack)
 */
export const PRODUCTS = {
  backpack: 'add-to-cart-sauce-labs-backpack',
  bikeLight: 'add-to-cart-sauce-labs-bike-light',
  boltTShirt: 'add-to-cart-sauce-labs-bolt-t-shirt',
  fleeceJacket: 'add-to-cart-sauce-labs-fleece-jacket',
  onesie: 'add-to-cart-sauce-labs-onesie',
  redTShirt: 'add-to-cart-test.allthethings()-t-shirt-(red)'
} as const;

export const EXPECTED_ERRORS = {
  lockedOut:
    'Epic sad
