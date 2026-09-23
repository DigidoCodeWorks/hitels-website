// One-off patch: wires up `relatedPosts` on all 17 Icelandic blog post
// documents, now that every one of them exists (scripts/seed-is-blog-
// batch1.mjs through batch6.mjs). Each Icelandic post's relatedPosts
// should reference the Icelandic *siblings* of whatever topics its English
// counterpart links to — not the English posts themselves — so Icelandic
// readers get an all-Icelandic "Related articles" section.
//
// Reads each English post's relatedPosts slugs directly from the live
// dataset (rather than hardcoding the mapping again) and patches the
// matching Icelandic doc (_id: `post-${slug}-is`) to reference the
// Icelandic siblings of those same slugs.
//
// Usage: node --env-file=.env scripts/patch-is-posts-related.mjs

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

const englishPosts = await query(
  '*[_type == "post" && language == "en"]{ "slug": slug.current, "relatedSlugs": relatedPosts[]->slug.current }'
);

const mutations = englishPosts
  .filter((p) => p.relatedSlugs?.length)
  .map((p) => ({
    patch: {
      id: `post-${p.slug}-is`,
      set: {
        relatedPosts: p.relatedSlugs.map((slug) => ({
          _key: slug,
          _type: 'reference',
          _ref: `post-${slug}-is`,
        })),
      },
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

console.log(`Patched relatedPosts on ${mutations.length} Icelandic post documents.`);
