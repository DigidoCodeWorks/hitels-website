import { test, expect, type Page } from '@playwright/test';

// One page per top-level route (not every blog post — the blog post
// template is checked once via a representative slug). /studio is excluded:
// it's the embedded Sanity Studio SPA, not marketing content, and doesn't
// share this site's h1/console/link conventions.
const PAGES = [
  '/',
  '/about-us',
  '/custom-hotels-website',
  '/booking-engine',
  '/pricing',
  '/contact-us',
  '/discover',
  '/discover/godo-hitels-partnership',
  '/cookie-policy',
  '/privacy-policy',
];

function collectConsoleErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

for (const path of PAGES) {
  test.describe(`${path}`, () => {
    test('has no console errors', async ({ page }) => {
      const errors = collectConsoleErrors(page);
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      expect(errors, `console errors on ${path}:\n${errors.join('\n')}`).toEqual([]);
    });

    test('has exactly one <h1>', async ({ page }) => {
      await page.goto(path);
      await expect(page.locator('h1')).toHaveCount(1);
    });

    test('matches its screenshot baseline', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      // Disable CSS animations/transitions so the "reveal on scroll" and
      // hover-driven motion this site uses everywhere doesn't make screenshots
      // flaky depending on exactly when the capture lands mid-transition.
      await page.addStyleTag({
        content: `*, *::before, *::after { animation-duration: 0s !important; animation-delay: 0s !important; transition-duration: 0s !important; }`,
      });
      await expect(page).toHaveScreenshot(`${path === '/' ? 'home' : path.replace(/^\//, '').replace(/\//g, '-')}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02,
      });
    });
  });
}

test('internal links resolve (no broken links)', async ({ page, request }) => {
  const found = new Set<string>();

  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((el) => el.getAttribute('href') ?? ''));

    for (const href of hrefs) {
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || /^https?:\/\//.test(href)) {
        continue; // external / anchor / non-navigational — out of scope for an internal-link check
      }
      found.add(href.split('#')[0]);
    }
  }

  const broken: string[] = [];
  for (const href of found) {
    const res = await request.get(href);
    if (!res.ok()) broken.push(`${href} → ${res.status()}`);
  }

  expect(broken, `broken internal links:\n${broken.join('\n')}`).toEqual([]);
});
