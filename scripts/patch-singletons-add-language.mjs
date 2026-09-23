// One-off migration: backfills `language: "en"` on the 4 locked singletons
// (pricingPlans, siteSettings, footerSettings, addOns) just given a
// `language` field — Phase 2 of the i18n rollout plan. Same safe
// query-based-patch pattern as the other patch-*-add-language.mjs scripts;
// existing _ids are untouched (no migration risk), only the new field is
// set, only on documents that don't already have it.
//
// Usage: node --env-file=.env scripts/patch-singletons-add-language.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const TYPES = ['pricingPlans', 'siteSettings', 'footerSettings', 'addOns'];

const mutations = TYPES.map((type) => ({
  patch: {
    query: `*[_type == "${type}" && !defined(language)]`,
    set: { language: 'en' },
  },
}));

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mutations }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Patch failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log(`Backfilled language: "en" on existing documents of types: ${TYPES.join(', ')}.`);
console.log(JSON.stringify(body, null, 2));
