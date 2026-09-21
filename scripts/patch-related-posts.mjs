// One-off patch: populates each blog post's new `relatedPosts` reference
// field (see src/sanity/schemaTypes/post.ts), which powers the "Related
// articles" section at the bottom of every blog post
// (src/components/blog-detail/RelatedPosts.astro). Grounded in the topic
// clusters an SEO audit identified across the 18 posts on 2026-09-21 (no two
// posts compete for the same primary topic — see that audit's cluster
// analysis for the full reasoning behind each grouping below). Editable
// afterward per-post in Sanity Studio; this just bootstraps sensible
// starting values instead of shipping the feature with every post empty.
//
// Safe to re-run — each patch fully replaces relatedPosts with the slugs
// listed here, so re-running just re-applies the same mapping.
//
// Usage: node --env-file=.env scripts/patch-related-posts.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

// slug -> related slugs (2-4 each, per the field's own Studio guidance).
// Every post gets exactly 3 — the RelatedPosts section always renders a
// full 3-column row instead of an inconsistent 1-2-3 count. The smaller
// clusters (guest-experience pair, hotel-launch pair, company/news posts)
// needed a third link added beyond their natural 1-2 topical siblings; those
// third picks bridge to the next-closest adjacent topic rather than a
// same-cluster repeat, noted inline.
const RELATED_BY_SLUG = {
  // Direct Bookings & Revenue — "why/how to get bookings" sub-group
  'the-roi-of-direct-bookings-why-15-feels-like-50': ['master-direct-bookins-with-hitels', 'maximizing-visibility-how-seo-drives-direct-bookings', 'increase-hotel-revenue'],
  'master-direct-bookins-with-hitels': ['the-roi-of-direct-bookings-why-15-feels-like-50', 'maximizing-visibility-how-seo-drives-direct-bookings', 'increase-hotel-revenue'],
  'maximizing-visibility-how-seo-drives-direct-bookings': ['the-roi-of-direct-bookings-why-15-feels-like-50', 'master-direct-bookins-with-hitels', 'increase-hotel-revenue'],

  // Direct Bookings & Revenue — "revenue optimization" sub-group
  'increase-hotel-revenue': ['boost-revpar-upselling-ancillary-services-before-check-in', 'how-to-use-offers-and-discounts', 'the-roi-of-direct-bookings-why-15-feels-like-50'],
  'boost-revpar-upselling-ancillary-services-before-check-in': ['increase-hotel-revenue', 'how-to-use-offers-and-discounts', 'the-roi-of-direct-bookings-why-15-feels-like-50'],
  'how-to-use-offers-and-discounts': ['increase-hotel-revenue', 'boost-revpar-upselling-ancillary-services-before-check-in', 'master-direct-bookins-with-hitels'],

  // Hotel Website Design & Trust — a clean 4-post cluster, so each links to
  // the other 3 (full mesh) rather than needing an out-of-cluster bridge.
  'we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found': ['first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website', 'how-a-great-hotel-website-builds-trust-before-check-in', 'how-to-build-a-successful-hotel-website'],
  'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website': ['we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found', 'how-a-great-hotel-website-builds-trust-before-check-in', 'how-to-build-a-successful-hotel-website'],
  'how-a-great-hotel-website-builds-trust-before-check-in': ['we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found', 'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website', 'how-to-build-a-successful-hotel-website'],
  'how-to-build-a-successful-hotel-website': ['we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found', 'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website', 'how-a-great-hotel-website-builds-trust-before-check-in'],

  // Guest experience pair — 3rd link bridges to trust/guest-experience themes.
  'how-to-respond-to-negative-hotel-reviews': ['improve-loyalty', 'how-a-great-hotel-website-builds-trust-before-check-in', 'boost-revpar-upselling-ancillary-services-before-check-in'],
  'improve-loyalty': ['how-to-respond-to-negative-hotel-reviews', 'increase-hotel-revenue', 'boost-revpar-upselling-ancillary-services-before-check-in'],

  // Hotel-launch pair — 3rd link bridges to a proof-point/build-oriented post.
  'how-to-start-a-hotel-business': ['why-hotels-are-choosing-hitels-before-they-even-open-their-doors', 'introducing-hitels', 'how-to-build-a-successful-hotel-website'],
  'why-hotels-are-choosing-hitels-before-they-even-open-their-doors': ['how-to-start-a-hotel-business', 'introducing-hitels', 'showcasing-hitels-websites'],

  // Company/news posts, linked into the clusters their subject matter supports.
  'godo-hitels-partnership': ['master-direct-bookins-with-hitels', 'the-roi-of-direct-bookings-why-15-feels-like-50', 'increase-hotel-revenue'],
  'introducing-hitels': ['why-hotels-are-choosing-hitels-before-they-even-open-their-doors', 'how-to-start-a-hotel-business', 'showcasing-hitels-websites'],
  'showcasing-hitels-websites': ['we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found', 'how-to-build-a-successful-hotel-website', 'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website'],
};

for (const [slug, related] of Object.entries(RELATED_BY_SLUG)) {
  if (related.length !== 3) {
    console.error(`RELATED_BY_SLUG["${slug}"] has ${related.length} entries, expected exactly 3.`);
    process.exit(1);
  }
  if (related.includes(slug)) {
    console.error(`RELATED_BY_SLUG["${slug}"] references itself.`);
    process.exit(1);
  }
  if (new Set(related).size !== related.length) {
    console.error(`RELATED_BY_SLUG["${slug}"] has duplicate entries.`);
    process.exit(1);
  }
}

const queryURL = `https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${dataset}?query=${encodeURIComponent(
  '*[_type == "post" && defined(slug.current)]{ _id, "slug": slug.current }'
)}`;

const queryRes = await fetch(queryURL, { headers: { Authorization: `Bearer ${SANITY_API_TOKEN}` } });
const queryBody = await queryRes.json();
if (!queryRes.ok) {
  console.error('Query failed:', JSON.stringify(queryBody, null, 2));
  process.exit(1);
}

const idBySlug = Object.fromEntries(queryBody.result.map((doc) => [doc.slug, doc._id]));

const missingSlugs = Object.keys(RELATED_BY_SLUG).filter((slug) => !idBySlug[slug]);
if (missingSlugs.length > 0) {
  console.error('No post document found for these slugs:', missingSlugs);
  process.exit(1);
}

const mutations = Object.entries(RELATED_BY_SLUG).map(([slug, relatedSlugs]) => ({
  patch: {
    id: idBySlug[slug],
    set: {
      relatedPosts: relatedSlugs.map((relatedSlug) => ({
        _type: 'reference',
        _ref: idBySlug[relatedSlug],
        _key: relatedSlug,
      })),
    },
  },
}));

const mutateRes = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ mutations }),
});

const mutateBody = await mutateRes.json();
if (!mutateRes.ok) {
  console.error('Patch failed:', JSON.stringify(mutateBody, null, 2));
  process.exit(1);
}

console.log(`Patched relatedPosts on ${mutations.length} post documents.`);
console.log(JSON.stringify(mutateBody, null, 2));
