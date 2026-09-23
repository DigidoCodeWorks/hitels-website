// One-off seed: creates the initial "footerSettings" singleton document in
// Sanity, populated 1:1 with the values previously hardcoded in Footer.astro
// — so wiring Footer up to Sanity doesn't change anything visually on first
// deploy. Uses createOrReplace with a fixed _id ("footerSettings"), so it's
// safe to re-run.
//
// The phone/mailing-list hrefs and social URLs were "#" placeholders in the
// original hardcoded markup — seeded here as empty strings/undefined instead
// so Studio shows them as genuinely unset (editable) rather than a fake link.
//
// Usage: node --env-file=.env scripts/seed-footer-settings.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';

const footerSettings = {
  _id: 'footerSettings',
  _type: 'footerSettings',
  ctaHeadline: 'Ready to turn your website into your most profitable booking channel?',
  ctaBody:
    "Let's discuss how a bespoke digital presence can increase your direct bookings and save you thousands in commissions.",
  primaryButtonLabel: 'Book a demo',
  primaryButtonHref: '/contact-us',
  secondaryButtonLabel: 'Contact us',
  secondaryButtonHref: '/contact-us',
  contactHeadline: 'Say hi to your new hotel platform',
  phoneLabel: '+354 5478001',
  phoneHref: '',
  mailingListLabel: 'Join our mailing list',
  mailingListHref: '',
  productLinks: [
    { _key: 'booking-engine', label: 'Booking Engine', href: '/booking-engine' },
    { _key: 'custom-website', label: 'Custom Website', href: '/custom-hotels-website' },
    { _key: 'pricing', label: 'Pricing', href: '/pricing' },
  ],
  companyLinks: [
    { _key: 'about-us', label: 'About us', href: '/about-us' },
    { _key: 'contact-us', label: 'Contact us', href: '/contact-us' },
    { _key: 'resources', label: 'Resources', href: '/discover' },
  ],
  copyrightText: '© 2024 Hitels. All rights reserved.',
};

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [{ createOrReplace: footerSettings }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "footerSettings" document.');
console.log(JSON.stringify(body, null, 2));
