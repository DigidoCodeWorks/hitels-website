// One-off seed: creates the initial "page" (slug "about-us") document in
// Sanity, populated 1:1 with the content that was previously hardcoded
// across this page's Astro components (Hero, WhoWeAre, Team, Beliefs,
// WhatIsHitels) — so converting it to the Sanity page-builder pattern
// doesn't change anything visually on first deploy. Uses createOrReplace
// with a fixed _id ("aboutUsPage"), so it's safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-about-us-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const aboutUsPage = {
  _id: 'aboutUsPage',
  _type: 'page',
  title: 'About Us',
  slug: { current: 'about-us' },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'We build the engine that drive hotels forward.',
      subheading:
        'Hitels is a specialized digital agency and software provider on a mission to help hoteliers take back control of their revenue, their online presence, and their guest relationships.',
      primaryButtonLabel: 'Book a demo',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Contact us',
      secondaryButtonHref: '/contact-us',
      imageUrl: r2('images/about/hero/photo.webp'),
      imageAlt: 'A guest checking in at a hotel reception desk',
    },
    {
      _key: 'whoWeAre',
      _type: 'statsIntroSection',
      headline: 'Who we are',
      body: 'We are a group of digital experts with a deep passion for the hotel industry. We were founded with a vision of transforming the hotel industry from indirect bookings to direct.',
      stats: [
        { _key: 'employees', value: '15', label: 'Employees' },
        { _key: 'nationalities', value: '4', label: 'Nationalities' },
        { _key: 'partners', value: '19+', label: 'Partners' },
      ],
    },
    {
      _key: 'team',
      _type: 'teamSection',
      headline: 'People behind smarter hotel websites',
      body: 'Most booking engines look like an afterthought. We go further than any competitor to ensure a seamless transition from your website to the checkout. Starting in Figma, we meticulously tailor the typography, colors, and UI components so the engine feels like a natural, premium extension of your brand.',
      // Head-to-chest crops with consistent headroom -- see
      // scripts/update-team-photo-crops.mjs for why these live under a
      // headshot/ subpath instead of images/about/team/ directly.
      members: [
        { _key: 'arnar', name: 'Arnar Hinriksson', role: 'Growth and Success', email: 'arnar@hitels.is', photoUrl: r2('images/about/team/headshot/arnar.webp') },
        { _key: 'thordis', name: 'Þórdís', role: 'Technology and Customer Success', email: 'thordis@hitels.is', photoUrl: r2('images/about/team/headshot/thordis.webp') },
        { _key: 'birgir', name: 'Birgir', role: 'Strategy and Consultation', email: 'birgir@hitels.is', photoUrl: r2('images/about/team/headshot/birgir.webp') },
        { _key: 'salome', name: 'Salome', role: 'Customer Success & QA', email: 'hi@hitels.is', photoUrl: r2('images/about/team/headshot/salome.webp') },
        { _key: 'bjarki', name: 'Bjarki', role: 'Designer', email: 'hi@hitels.is', photoUrl: r2('images/about/team/headshot/bjarki.webp') },
      ],
    },
    {
      _key: 'beliefs',
      _type: 'beliefsSection',
      headline: 'What we believe',
      beliefs: [
        {
          _key: 'frictionless',
          title: 'Frictionless Experiences',
          description: 'We believe the guest experience starts long before check-in. We believe that removing friction is the fastest way to increase direct revenue.',
        },
        {
          _key: 'data',
          title: 'Data Over Assumptions',
          description: 'We believe in using hard data, analytics, and continuous optimization to turn beautiful websites into highly profitable booking channels.',
        },
        {
          _key: 'partnership',
          title: 'True Partnership',
          description: 'We believe in dedicated support, regular progress meetings, and actively working alongside you to scale your business.',
        },
      ],
    },
    {
      _key: 'whatIsHitels',
      _type: 'whatIsHitelsSection',
      headline: 'What is Hitels?',
      body: 'Hitels is a specialized platform designed to help hotels increase direct bookings by creating custom, scalable websites that enhance guest experiences.',
      features: [
        { _key: 'custom-websites', title: 'Custom Websites', description: "Unique designs showcasing your hotel's charm" },
        { _key: 'direct-bookings', title: 'Direct Bookings', description: 'Increase revenue through direct reservations' },
        { _key: 'guest-experience', title: 'Guest Experience', description: 'Seamless, secure booking process' },
        { _key: 'analytics', title: 'Analytics', description: 'Track key metrics for better decisions' },
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
    mutations: [{ createOrReplace: aboutUsPage }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "aboutUsPage" document.');
console.log(JSON.stringify(body, null, 2));
