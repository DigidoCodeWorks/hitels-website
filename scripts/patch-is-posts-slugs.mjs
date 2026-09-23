// One-off patch: gives every Icelandic blog post its own Icelandic slug,
// instead of reusing its English sibling's slug.current (the original i18n
// seed scripts gave each "-is" doc the same slug as its English sibling —
// harmless while both resolved to the same URL segment, but not what an
// Icelandic reader should see in the address bar).
//
// New slugs are plain ASCII (a-z, 0-9, hyphens only) — no Icelandic
// diacritics (á/é/í/ó/ú/ý/ö/æ/þ/ð) — to avoid percent-encoded or
// inconsistently-normalized URLs. Deliberately transliterated, not just
// slugified from the raw Icelandic title, so they stay concise and
// readable (e.g. "kynning-a-hitels", not a full-sentence slug).
//
// Docs are addressed by their fixed _id (`post-${englishSlug}-is`, per
// seed-is-blog-batch1.mjs through batch6.mjs's own convention) — patching
// slug.current only, everything else (title, body, relatedPosts) is
// untouched. BlogPostPage.astro's hreflang alternates already handle
// English/Icelandic siblings having independent slugs (see
// postSlugByIdQuery in src/sanity/queries.ts, Phase 3) — this script is
// safe to run after that change ships, not before.
//
// Usage: node --env-file=.env scripts/patch-is-posts-slugs.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

// Keyed by the English post's slug (used to derive the fixed `-is` _id).
const NEW_IS_SLUGS = {
  'introducing-hitels': 'kynning-a-hitels',
  'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website': 'fyrstu-kynni-skipta-mali-a-hotelvefnum',
  'why-hotels-are-choosing-hitels-before-they-even-open-their-doors': 'hvers-vegna-hotel-velja-hitels-fyrir-opnun',
  'maximizing-visibility-how-seo-drives-direct-bookings': 'hamarka-synileika-med-seo',
  'godo-hitels-partnership': 'samstarf-hitels-og-godo',
  'how-a-great-hotel-website-builds-trust-before-check-in': 'hotelvefur-byggir-upp-traust-fyrir-innritun',
  'how-to-build-a-successful-hotel-website': 'byggja-arangursrikan-hotelvef',
  'how-to-respond-to-negative-hotel-reviews': 'svara-neikvaedum-umsognum-um-hotel',
  'how-to-start-a-hotel-business': 'stofna-hotelrekstur-a-islandi',
  'how-to-use-offers-and-discounts': 'nota-tilbod-og-afslaetti',
  'improve-loyalty': 'baeta-tryggd-vidskiptavina',
  'increase-hotel-revenue': 'auka-tekjur-hotelsins',
  'showcasing-hitels-websites': 'fagud-vefhonnun-hitels',
  'master-direct-bookins-with-hitels': 'nadu-tokum-a-beinum-bokunum',
  'the-roi-of-direct-bookings-why-15-feels-like-50': 'ardsemi-beinna-bokana',
  'we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found': 'vid-greindum-300-hotelvefsidur-a-islandi',
  'boost-revpar-upselling-ancillary-services-before-check-in': 'auka-revpar-med-solu-fyrir-innritun',
};

const mutations = Object.entries(NEW_IS_SLUGS).map(([enSlug, isSlug]) => ({
  patch: {
    id: `post-${enSlug}-is`,
    set: { slug: { _type: 'slug', current: isSlug } },
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

console.log(`Patched slug.current on ${mutations.length} Icelandic post documents.`);
