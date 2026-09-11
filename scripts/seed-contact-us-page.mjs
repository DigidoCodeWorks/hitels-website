// One-off seed: creates the initial "page" (slug "contact-us") document in
// Sanity, populated 1:1 with the content that was previously hardcoded in
// this page's Hero.astro — so converting it to the Sanity page-builder
// pattern doesn't change anything visually on first deploy. Uses
// createOrReplace with a fixed _id ("contactUsPage"), so it's safe to
// re-run.
//
// Usage: node --env-file=.env scripts/seed-contact-us-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const contactUsPage = {
  _id: 'contactUsPage',
  _type: 'page',
  title: 'Contact Us',
  slug: { current: 'contact-us' },
  sections: [
    {
      _key: 'hero',
      _type: 'simpleHeroSection',
      headline: 'Contact us',
      subheading:
        "We will get to know your team's needs and see how it fits our product and services. Get expert advice from our consultants who can answer any questions you may have.",
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
    mutations: [{ createOrReplace: contactUsPage }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "contactUsPage" document.');
console.log(JSON.stringify(body, null, 2));
