// One-off seed: creates the initial "page" (slug "booking-engine") document
// in Sanity, populated 1:1 with the content that was previously hardcoded in
// this page's Astro components (Hero.astro + the page's own FEATURES array)
// — so converting it to the Sanity page-builder pattern doesn't change
// anything visually on first deploy. Uses createOrReplace with a fixed _id
// ("bookingEnginePage"), so it's safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-booking-engine-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const bookingEnginePage = {
  _id: 'bookingEnginePage',
  _type: 'page',
  title: 'Booking Engine',
  slug: { current: 'booking-engine' },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'Stop losing guests at checkout.',
      subheading:
        'A modern booking engine built to maximize your direct revenue. Say goodbye to clunky, disconnected checkouts and hi to a seamless flow your guests will love.',
      primaryButtonLabel: 'Book a demo',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Contact us',
      secondaryButtonHref: '/contact-us',
    },
    {
      _key: 'features',
      _type: 'featuresSection',
      features: [
        {
          _key: 'design',
          label: 'Design',
          heading: 'Flawless brand integration',
          description:
            "Most booking engines look like an afterthought. We go further than our competitor to ensure a seamless transition from your website to the checkout. We meticulously tailor the typography, colors, and components so the engine feels like a natural, premium extension of your brand.",
          imageUrl: r2('images/booking-engine/features/brand-integration.webp'),
          imageAlt: 'Booking engine UI matched to a hotel brand',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'revenue',
          label: 'Revenue',
          heading: 'Maximize revenue with custom add-ons',
          description:
            "Don't just sell a room, sell an experience. Our platform easily handles custom up-sells during the checkout flow. Whether it's adding a bottle of champagne, booking spa access, applying coupon codes, or reserving multiple rooms, we help you increase your average order value effortlessly.",
          imageUrl: r2('images/booking-engine/features/addons.webp'),
          imageAlt: 'Checkout flow showing a champagne bottle add-on',
          imageFirst: true,
          imageHasLightBackground: false,
        },
        {
          _key: 'analytics',
          label: 'Analytics',
          heading: 'Stop guessing what works',
          description:
            'Our booking engine comes with built-in, granular event tracking. Easily monitor every step of the checkout process, track your conversion rates, and measure the exact ROI of your marketing campaigns so you can scale your direct bookings with confidence.',
          imageUrl: r2('images/booking-engine/features/analytics.webp'),
          imageAlt: 'Checkout funnel chart showing drop-off at each step',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'security',
          label: 'Security',
          heading: 'Powerful & secure foundation',
          description:
            'Built on top of the robust Godo property management system, our engine combines enterprise-grade reliability with top-tier security. Your guests enjoy a safe, secure payment process, and you get the peace of mind that your backend is rock solid.',
          imageUrl: r2('images/booking-engine/features/security.webp'),
          imageAlt: 'Diagram linking the website, a secure checkout, and Godo',
          imageFirst: true,
          imageHasLightBackground: false,
        },
      ],
    },
  ],
};

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [{ createOrReplace: bookingEnginePage }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "bookingEnginePage" document.');
console.log(JSON.stringify(body, null, 2));
