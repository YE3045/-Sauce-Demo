import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Fail fast if tests hang
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },

  reporter: [
    ['dot'], // minimal console reporter for CI
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // CI-friendly HTML
    ['junit', { outputFile: 'test-results/results.xml' }] // JUnit for GitHub Actions
  ],

  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 20_000,
    navigationTimeout: 30_000,
    screenshot: 'only-on-failure', // helpful in CI
    video: 'retain-on-failure',    // upload videos for failed runs
    trace: 'retain-on-failure'     // keep Playwright traces on failure
  },

  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' }
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' }
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' }
    }
  ],

  // Run tests in parallel for speed
  fullyParallel: true,

  // Fail the CI build on first retry if tests are flaky
  retries: process.env.CI ? 1 : 0,

  // Limit workers in CI for stability
  workers: process.env.CI ? 2 : undefined,
});
