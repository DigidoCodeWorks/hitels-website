// One-off migration: links every existing English/Icelandic document pair
// (created by this project's own seed scripts, predating
// @sanity/document-internationalization) via a `translation.metadata`
// document, in the exact shape the plugin itself creates one in (verified
// by reading node_modules/@sanity/document-internationalization's bundled
// source — see createReference()/METADATA_SCHEMA_NAME there). Without this,
// the plugin's "Translations" UI has nothing to show for pre-existing
// documents; going forward, documents the plugin itself creates a new
// translation for get their metadata document created automatically.
//
// `page` and `story` are matched by their shared `slug.current` (still
// identical across languages for both types); every other type is matched
// by stripping a "-is" suffix off the Icelandic doc's _id, since that's
// this project's own established convention for those types.
//
// createOrReplace + a fixed, deterministic _id per pair — safe to re-run.
//
// Usage: node --env-file=.env scripts/create-translation-metadata.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

async function query(q) {
  const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${encodeURIComponent(q)}`, {
    headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` },
  });
  const body = await res.json();
  if (!res.ok) {
    console.error('Query failed:', JSON.stringify(body, null, 2));
    process.exit(1);
  }
  return body.result;
}

function referenceValue(language, ref, schemaType) {
  return {
    _key: language,
    _type: 'internationalizedArrayReferenceValue',
    language,
    value: {
      _type: 'reference',
      _ref: ref,
      _weak: true,
      _strengthenOnPublish: { type: schemaType },
    },
  };
}

function metadataDoc(schemaType, baseKey, enId, isId) {
  return {
    _id: `translation.metadata.${schemaType}.${baseKey}`,
    _type: 'translation.metadata',
    schemaTypes: [schemaType],
    translations: [referenceValue('en', enId, schemaType), referenceValue('is', isId, schemaType)],
  };
}

// Types matched by shared slug (still identical across languages).
const SLUG_MATCHED_TYPES = ['page', 'story'];
// Types matched by stripping a "-is" suffix off the Icelandic _id.
const SUFFIX_MATCHED_TYPES = ['post', 'faq', 'testimonial', 'storiesClosingCard', 'pricingPlans', 'siteSettings', 'footerSettings', 'addOns'];

const mutations = [];
let pairCount = 0;

for (const type of SLUG_MATCHED_TYPES) {
  const docs = await query(`*[_type == "${type}"]{_id, language, "slug": slug.current}`);
  const bySlug = new Map();
  for (const doc of docs) {
    if (!bySlug.has(doc.slug)) bySlug.set(doc.slug, {});
    bySlug.get(doc.slug)[doc.language] = doc._id;
  }
  for (const [slug, pair] of bySlug) {
    if (!pair.en || !pair.is) {
      console.warn(`Skipping incomplete ${type} pair for slug "${slug}":`, pair);
      continue;
    }
    mutations.push({ createOrReplace: metadataDoc(type, slug, pair.en, pair.is) });
    pairCount++;
  }
}

for (const type of SUFFIX_MATCHED_TYPES) {
  const docs = await query(`*[_type == "${type}"]{_id, language}`);
  const enIds = new Set(docs.filter((d) => d.language === 'en').map((d) => d._id));
  for (const doc of docs) {
    if (doc.language !== 'is') continue;
    if (!doc._id.endsWith('-is')) {
      console.warn(`Skipping ${type} doc "${doc._id}" — doesn't end in "-is", can't derive its English sibling.`);
      continue;
    }
    const enId = doc._id.slice(0, -'-is'.length);
    if (!enIds.has(enId)) {
      console.warn(`Skipping ${type} doc "${doc._id}" — no matching English doc "${enId}" found.`);
      continue;
    }
    mutations.push({ createOrReplace: metadataDoc(type, enId, enId, doc._id) });
    pairCount++;
  }
}

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
  console.error('Mutation failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log(`Created/updated ${pairCount} translation.metadata documents.`);
