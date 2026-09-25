// One-off migration: every content `url` field (imageUrlField/videoUrlField
// etc. — see src/sanity/fields.ts, "Hosted on R2, not a Sanity asset") stores
// a full absolute URL, written at content-creation time with whatever
// R2_PUBLIC_URL was then. Switching R2_BASE in src/lib/cdn.ts (2026-09-25,
// off the rate-limited/ISP-blocked pub-....r2.dev domain onto cdn.hitels.is)
// only affects hardcoded UI-chrome assets built via asset() — it does
// nothing for these already-published Sanity documents, which keep pointing
// at the old domain until patched here.
//
// Walks every document, finds string fields containing OLD_BASE, and patches
// them to NEW_BASE via Sanity's HTTP mutate API (same raw-fetch pattern as
// seed-home-page.mjs). Defaults to a dry run (prints what would change, no
// writes) — pass --commit to actually patch.
//
// Usage:
//   node --env-file=.env scripts/migrate-content-r2-domain.mjs           # dry run
//   node --env-file=.env scripts/migrate-content-r2-domain.mjs --commit  # apply

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const OLD_BASE = 'https://pub-cc3bba3bab304bebb22958edffa16e9c.r2.dev';
const NEW_BASE = 'https://cdn.hitels.is';
const dataset = PUBLIC_SANITY_DATASET || 'production';
const commit = process.argv.includes('--commit');

const queryRes = await fetch(
  `https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent('*[]')}`,
  { headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` } }
);
const { result: docs } = await queryRes.json();

// Walks a document's fields (skipping the _id/_type/_rev/_key system fields),
// building Sanity patch-path strings for every string value containing
// OLD_BASE. Array items use `[_key=="..."]` when the item has one (object
// arrays like page.sections), falling back to a numeric index otherwise
// (plain string arrays like iconUrls).
function collectPatches(value, path, patches) {
  if (typeof value === 'string') {
    if (value.includes(OLD_BASE)) {
      patches[path] = value.split(OLD_BASE).join(NEW_BASE);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => {
      const segment = item && typeof item === 'object' && item._key ? `[_key=="${item._key}"]` : `[${i}]`;
      collectPatches(item, `${path}${segment}`, patches);
    });
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, val] of Object.entries(value)) {
      if (key.startsWith('_')) continue;
      collectPatches(val, path ? `${path}.${key}` : key, patches);
    }
  }
}

const mutations = [];
let totalFields = 0;

for (const doc of docs) {
  const patches = {};
  collectPatches(doc, '', patches);
  const fieldCount = Object.keys(patches).length;
  if (fieldCount === 0) continue;

  totalFields += fieldCount;
  console.log(`${doc._type}/${doc._id} — ${fieldCount} field(s)`);
  for (const [path, newValue] of Object.entries(patches)) {
    console.log(`  ${path} -> ${newValue}`);
  }
  mutations.push({ patch: { id: doc._id, set: patches } });
}

console.log(`\n${mutations.length} document(s), ${totalFields} field(s) total.`);

if (!commit) {
  console.log('\nDry run only — re-run with --commit to apply.');
  process.exit(0);
}

if (mutations.length === 0) {
  console.log('Nothing to commit.');
  process.exit(0);
}

// Chunked, not one giant request — keeps a single bad document from failing
// the entire migration and makes progress visible on a dataset this size.
const CHUNK_SIZE = 25;
for (let i = 0; i < mutations.length; i += CHUNK_SIZE) {
  const chunk = mutations.slice(i, i + CHUNK_SIZE);
  const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${SANITY_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations: chunk }),
  });
  const body = await res.json();
  if (!res.ok) {
    console.error(`FAILED at batch ${i / CHUNK_SIZE + 1}:`, JSON.stringify(body, null, 2));
    process.exit(1);
  }
  console.log(`Committed batch ${i / CHUNK_SIZE + 1} (${chunk.length} document(s)).`);
}

console.log('\nDone.');
