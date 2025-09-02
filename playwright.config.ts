import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  reporter: [
    ['dot'],
    ['html'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20_000,
    navigationTimeout: 30_000
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    }
  ]
});
