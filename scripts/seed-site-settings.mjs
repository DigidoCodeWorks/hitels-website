// One-off seed: creates the initial "siteSettings" singleton document in
// Sanity, populated 1:1 with the values previously hardcoded in
// BaseLayout.astro (Organization name/logo) and index.astro (Home's
// title/description, reused here as the site-wide SEO default) — so wiring
// BaseLayout up to Sanity doesn't change anything visually on first deploy.
// Uses createOrReplace with a fixed _id ("siteSettings"), so it's safe to
// re-run.
//
// Usage: node --env-file=.env scripts/seed-site-settings.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Hitels',
  defaultSeoTitle: 'Hitels — Turn website visitors into direct bookings',
  defaultSeoDescription:
    'We build award-winning, bespoke hotel websites and seamless booking engines. No templates, no DIY builders — just a premium digital presence done for you from start to finish.',
  defaultOgImage: r2('images/home/hero/mockup-desktop.webp'),
  organizationName: 'Hitels',
  organizationLogoUrl: r2('images/home/footer/hitels-logo.svg'),
};

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [{ createOrReplace: siteSettings }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "siteSettings" document.');
console.log(JSON.stringify(body, null, 2));
