// One-off patch: fills each page document's `seo.title`/`seo.description`
// with the real meta title/description crawled from the live legacy Framer
// site (hitels.is), since those fields were left empty in Sanity even
// though BaseLayout's hardcoded fallback strings kept the live site looking
// fine. Patches only the `seo.title`/`seo.description` paths, so it never
// touches sections, ogImage, or anything else already set on the document.
// Safe to re-run.
//
// Usage: node --env-file=.env scripts/patch-page-seo-from-framer.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

// Crawled from hitels.is (the live legacy Framer site) on 2026-09-21.
// Booking Engine had no distinct SEO set on the old site — it duplicated
// Home's title/description verbatim, so instead this reuses the distinct,
// on-topic copy already hardcoded as booking-engine.astro's fallback
// (src/pages/booking-engine.astro), rather than duplicating Home's or
// inventing new copy.
const SEO_BY_PAGE_ID = {
  homePage: {
    title: "Hitels - Boost Your Hotel's Direct Bookings | Custom Hotel Websites",
    description:
      "Say hi to your new hotel website with Hitels. Elevate your hotel's online presence and drive direct bookings with our custom-built websites. Discover how Hitels empowers hotel managers to optimize traffic, track success, and boost revenue. Book a demo!",
  },
  aboutUsPage: {
    title: 'Transforming Hotel Management for the Icelandic Market',
    description:
      'Explore Hitels, the premier provider of hotel management software tailored for the Icelandic market. Discover how we help hoteliers drive direct bookings, boost revenue, and enhance guest experiences with innovative solutions.',
  },
  pricingPage: {
    title: 'Hitels Membership Pricing for Direct Booking Hotel Websites in Iceland',
    description:
      "Explore Hitels' membership pricing plans tailored for Icelandic hotels. Choose from Standard, Custom and Premium plans to get clear, straightforward websites and add ons designed to drive direct bookings and enhance guest experiences.",
  },
  contactUsPage: {
    title: 'Contact Hitels for Tailored Hotel Management Solutions in Iceland',
    description:
      'Get in touch with Hitels for personalized hotel management solutions designed for the Icelandic market. Our team is here to assist you in driving direct bookings, maximizing revenue, and enhancing guest experiences.',
  },
  customWebsitePage: {
    title: 'Hitels - Custom Websites made for your Hotel',
    description:
      'Opting for a custom-designed website allows your hotel to stand out in a crowded market and drive direct bookings to your website.',
  },
  bookingEnginePage: {
    title: 'Hitels — A booking engine built to maximize direct revenue',
    description:
      'A modern booking engine built to maximize your direct revenue. Say goodbye to clunky, disconnected checkouts and hello to a seamless flow your guests will love.',
  },
};

const mutations = Object.entries(SEO_BY_PAGE_ID).map(([id, { title, description }]) => ({
  patch: {
    id,
    set: { 'seo.title': title, 'seo.description': description },
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

console.log(`Patched seo.title/seo.description on ${mutations.length} page documents.`);
console.log(JSON.stringify(body, null, 2));
