// One-off seed: creates the initial "page" (slug "custom-website") document
// in Sanity, populated 1:1 with the content that was previously hardcoded in
// this page's Astro components (Hero.astro + the page's own FEATURES array)
// — so converting it to the Sanity page-builder pattern doesn't change
// anything visually on first deploy. Uses createOrReplace with a fixed _id
// ("customWebsitePage"), so it's safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-custom-website-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const customWebsitePage = {
  _id: 'customWebsitePage',
  _type: 'page',
  title: 'Custom Website',
  slug: { current: 'custom-hotels-website' },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'Your hotel is unique. Your website should be too.',
      subheading:
        'We design and build award-winning hotel websites from scratch. No templates. Just bespoke, data-driven design engineered to bypass OTAs and capture direct bookings.',
      primaryButtonLabel: 'Contact us',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'View pricing',
      secondaryButtonHref: '#pricing',
    },
    {
      _key: 'features',
      _type: 'featuresSection',
      features: [
        {
          _key: 'design',
          label: 'Design',
          heading: 'Tailored to your identity',
          description:
            "We don't do generic. Leveraging the power of Framer, we build everything custom from scratch based on your specific brand guidelines. Your digital presence will be entirely unique, setting you miles apart from competitors relying on rigid WordPress themes.",
          imageUrl: r2('images/custom-website/feature-custom-design.webp'),
          imageAlt: 'Placeholder typography style guide graphic (pending real asset from design)',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'conversion',
          label: 'Conversion',
          heading: 'Engineered to sell',
          description:
            "A beautiful website is useless if it doesn't convert. With vast experience in the hospitality sector, we use data and proven user-behavior insights to craft layouts specifically designed to guide visitors smoothly toward the \"Book Now\" button.",
          imageUrl: r2('images/custom-website/feature-data-driven.webp'),
          imageAlt: 'Heatmap overlay on a hotel website mockup showing where visitors click and scroll',
          imageFirst: true,
          imageHasLightBackground: false,
        },
        {
          _key: 'experience',
          label: 'Experience',
          heading: 'Immersive Guest Experiences',
          description:
            'The guest experience starts long before they arrive at the lobby. Through engaging animations, blazing-fast load times, and compelling visual storytelling, we capture the unique atmosphere of your property and make guests fall in love with your hotel instantly.',
          imageUrl: r2('images/custom-website/feature-visual-storytelling.webp'),
          imageAlt: "An 'Offers: Midweek Escape' promo card animation on a hotel website",
          imageFirst: false,
          imageHasLightBackground: true,
        },
        {
          _key: 'partnership',
          label: 'Partnership',
          heading: 'A true digital partnership',
          description:
            'We act as your dedicated digital team. From an initial deep-dive discovery workshop and comprehensive research to regular progress meetings and direct Slack communication, we handle the heavy lifting while keeping you completely in the loop.',
          imageUrl: r2('images/custom-website/feature-support.webp'),
          imageAlt: 'Slack conversation between the client and the Hitels team about a new page request',
          imageFirst: true,
          imageHasLightBackground: true,
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
    mutations: [{ createOrReplace: customWebsitePage }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "customWebsitePage" document.');
console.log(JSON.stringify(body, null, 2));
