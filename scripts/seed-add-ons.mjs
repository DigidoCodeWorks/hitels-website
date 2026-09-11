// One-off migration: creates the shared "addOns" singleton document,
// populated with the 3 add-ons previously hardcoded twice — once in
// src/components/home/AddOns.astro's page-builder section content, once in
// src/components/pricing/AddOns.astro's own ADDONS array — and patches the
// existing "homePage" document to drop the now-unused `addons` field from
// its addOnsSection entry (that section is a marker now; the content lives
// here instead). Uses createOrReplace with a fixed _id ("addOns"), so it's
// safe to re-run; the homePage patch is a plain `unset`, also safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-add-ons.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const addOns = {
  _id: 'addOns',
  _type: 'addOns',
  addons: [
    {
      _key: 'content',
      title: 'Content',
      description: 'AI blog content engine based on relevant keywords and competitive analysis',
      iconUrl: r2('images/home/addons/icon-content.svg'),
      price: 'ISK 18.900',
      features: ['16 articles per month', 'Automatic topic suggestions'],
    },
    {
      _key: 'seo',
      title: 'SEO',
      description: 'SEO optimization to rank higher in search results in partnership with Digido',
      iconUrl: r2('images/home/addons/icon-seo.svg'),
      price: 'ISK 199.900',
      features: ['SEO optimized content and structure', 'Analytics dashboard'],
    },
    {
      _key: 'ads',
      title: 'Ads',
      description: 'Ad designs for the most common social media platforms in partnership with Flóra',
      iconUrl: r2('images/home/addons/icon-ads.svg'),
      price: 'ISK 30.000',
      features: ['4 social media ad designs per month', '1080 × 1920 and 1920 × 1080'],
    },
  ],
};

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [
      { createOrReplace: addOns },
      { patch: { id: 'homePage', unset: ['sections[_key=="addons"].addons'] } },
    ],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Migration failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "addOns" singleton and unset the stale field on "homePage".');
console.log(JSON.stringify(body, null, 2));
