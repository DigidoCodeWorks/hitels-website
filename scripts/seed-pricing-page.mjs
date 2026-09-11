// One-off seed: creates the initial "page" (slug "pricing") document in
// Sanity, populated 1:1 with the content that was previously hardcoded in
// this page's Hero.astro and ComparisonTable.astro — so converting it to
// the Sanity page-builder pattern doesn't change anything visually on first
// deploy. The page's AddOns section is a marker only (its content now comes
// from the shared "addOns" singleton — see scripts/seed-add-ons.mjs, which
// must be run before this for the Pricing page's Add-Ons section to have
// content). Uses createOrReplace with a fixed _id ("pricingPage"), so it's
// safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-pricing-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const pricingPage = {
  _id: 'pricingPage',
  _type: 'page',
  title: 'Pricing',
  slug: { current: 'pricing' },
  sections: [
    {
      _key: 'hero',
      _type: 'simpleHeroSection',
      headline: 'Pricing',
      subheading:
        "Explore Hitels' flexible pricing plans, designed for hotels of all sizes. Boost direct bookings and online presence with our scalable solutions. Choose your perfect plan today!",
    },
    { _key: 'addons', _type: 'addOnsSection' },
    {
      _key: 'comparison',
      _type: 'comparisonTableSection',
      plans: ['Custom Website', 'Booking Engine', 'Combined'],
      rows: [
        { _key: 'pricing', label: 'Pricing', isGroupHeader: false, values: ['199.900 kr. / month', '1,8% / booking', '179.900 kr. / mo + 1,5%'] },
        { _key: 'design-group', label: 'Design', isGroupHeader: true },
        { _key: 'custom-design', label: 'Custom design', isGroupHeader: false, values: ['true', 'true', 'true'] },
        { _key: 'checkout-experience', label: 'Checkout experience', isGroupHeader: false, values: ['Redirects', 'Matched UI', 'Seamless'] },
        { _key: 'technical-group', label: 'Technical', isGroupHeader: true },
        { _key: 'analytics', label: 'Analytics', isGroupHeader: false, values: ['Web traffic', 'Conversions', 'Full funnel'] },
        { _key: 'cms-access', label: 'CMS access', isGroupHeader: false, values: ['2 seats', '2 seats', '2 seats'] },
        { _key: 'web-hosting', label: 'Web hosting', isGroupHeader: false, values: ['true', 'true', 'true'] },
        { _key: 'support-group', label: 'Support', isGroupHeader: true },
        { _key: 'onboarding', label: 'Onboarding', isGroupHeader: false, values: ['true', 'true', 'true'] },
        { _key: 'slack-support', label: 'Slack Support', isGroupHeader: false, values: ['true', 'true', 'true'] },
        { _key: 'growth-group', label: 'Growth', isGroupHeader: true },
        { _key: 'conversion-tuning', label: 'Conversion Tuning', isGroupHeader: false, values: ['false', 'false', 'true'] },
        { _key: 'content-engine', label: 'Content Engine', isGroupHeader: false, values: ['false', 'false', '8 articles / month'] },
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
    mutations: [{ createOrReplace: pricingPage }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "pricingPage" document.');
console.log(JSON.stringify(body, null, 2));
