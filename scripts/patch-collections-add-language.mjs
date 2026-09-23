// One-off migration: backfills `language: "en"` on every existing document
// of the 5 content types just given a `language` field for the sitewide
// i18n rollout (post, faq, testimonial, story, storiesClosingCard). Same
// reasoning and same query-based-patch safety as
// scripts/patch-pages-add-language.mjs — run before deploying any query
// change that filters on `language`, or that content stops resolving
// entirely for every existing document.
//
// One mutation call, one patch per type, each scoped by its own `_type` so
// this can't touch documents of a different type.
//
// Usage: node --env-file=.env scripts/patch-collections-add-language.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const TYPES = ['post', 'faq', 'testimonial', 'story', 'storiesClosingCard'];

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
