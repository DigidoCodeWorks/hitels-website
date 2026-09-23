// One-off migration: backfills `language: "en"` on every existing `page`
// document that predates the field (all 6 as of this writing: home,
// about-us, booking-engine, custom-hotels-website, pricing, contact-us —
// see the i18n pilot plan). `initialValue` on the schema field only applies
// to documents created from now on in Studio, not already-published ones,
// and `pageBySlugQuery` now filters on `language == $language`, so without
// this patch every existing page would stop resolving.
//
// Uses a query-based patch (Sanity's mutate API supports `patch.query` in
// place of `patch.id`) that only ever sets the one new field on documents
// that don't already have it — never touches any other field, so it's safe
// to run regardless of what Studio edits have happened since these pages
// were originally seeded.
//
// Usage: node --env-file=.env scripts/patch-pages-add-language.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [
      {
        patch: {
          query: '*[_type == "page" && !defined(language)]',
          set: { language: 'en' },
        },
      },
    ],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Patch failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Backfilled language: "en" on existing "page" documents missing it.');
console.log(JSON.stringify(body, null, 2));
