import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 60_000,
  expect: { timeout: 5000 },
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20_000,
    navigationTimeout: 30_000
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ]
});
