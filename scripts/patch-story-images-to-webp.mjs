// One-off patch: repoints 5 `story` documents' backgroundImageUrl/
// websitePreviewUrl fields from unprocessed PNG originals to properly-sized
// WebP versions already uploaded to R2 (same keys, .webp extension).
//
// These 5 stories (Blue Vacations, Exeter hotel, Flokalundur, Knox Hotels,
// ODDSSON) were the only ones in the `story` collection still serving raw,
// oversized PNGs (1500x2228 for -bg, 1404x779 for -preview) — every other
// story was already correctly sized (~800px/~1005px wide) and in WebP.
// New assets match that same established pattern exactly (resized in the
// same ratio, same target widths, uploaded with the same Cache-Control
// this project now sets on all R2 uploads — see upload-to-r2.mjs). 76-96%
// smaller per file; an SEO audit had flagged the old PNGs as the largest
// single "improve image delivery" opportunity on the homepage.
//
// Usage: node --env-file=.env scripts/patch-story-images-to-webp.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const R2_BASE = 'https://pub-cc3bba3bab304bebb22958edffa16e9c.r2.dev';

const STORY_IDS = ['story-blue-vacations', 'story-exeter-hotel', 'story-flokalundur', 'story-knox-hotels', 'story-oddsson'];

const mutations = STORY_IDS.map((id) => {
  const slug = id.replace(/^story-/, '');
  return {
    patch: {
      id,
      set: {
        backgroundImageUrl: `${R2_BASE}/cms/stories/${slug}-bg.webp`,
        websitePreviewUrl: `${R2_BASE}/cms/stories/${slug}-preview.webp`,
      },
    },
  };
});

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

console.log(`Patched backgroundImageUrl/websitePreviewUrl on ${mutations.length} story documents.`);
console.log(JSON.stringify(body, null, 2));
