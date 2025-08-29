// src/test-data/testData.ts
export type UserCreds = { username: string; password: string; };

export const USERS: Record<string, UserCreds> = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
  invalid: { username: 'standard_user', password: 'wrong_password' }
};

export const CUSTOMER = { firstName: 'ak', lastName: 'yemi', postalCode: '100001' };

export const PRODUCTS = {
  backpack: 'add-to-cart-sauce-labs-backpack',
  bikeLight: 'add-to-cart-sauce-labs-bike-light',
  boltTShirt: 'add-to-cart-sauce-labs-bolt-t-shirt',
  fleeceJacket: 'add-to-cart-sauce-labs-fleece-jacket',
  onesie: 'add-to-cart-sauce-labs-onesie',
  redTShirt: 'add-to-cart-test.allthethings()-t-shirt-(red)'
} as const;

export const EXPECTED_ERRORS = {
  lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
  invalidPassword: 'Epic sadface: Username and password do not match any user in this service'
};

export function getProductDataTest(name: keyof typeof PRODUCTS): string {
  return PRODUCTS[name];
}
