import { defineConfig, devices } from '@playwright/test';

// CI builds the site first (npm run build), then this starts `npm run
// serve:dist` (plain static server over dist/) and points every test at it —
// matches how Lighthouse CI checks the same build in ci.yml, so both jobs
// assert against the exact artifact that would actually deploy. Not `npm run
// preview` (astro preview): that command now self-daemonizes into the
// background and returns immediately, which Playwright's webServer reads as
// "the process exited early" and treats as a crash — it needs a command that
// blocks in the foreground for as long as the server should stay up.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run serve:dist',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
