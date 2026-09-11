// One-off seed: creates the initial "page" (slug "home") and "pricingPlans"
// documents in Sanity, populated 1:1 with the content that was previously
// hardcoded in the Home page's Astro components — so converting Home to the
// Sanity page-builder pattern doesn't change anything visually on first
// deploy. Uses createOrReplace with fixed _ids ("homePage"/"pricingPlans"),
// so it's safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-home-page.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const homePage = {
  _id: 'homePage',
  _type: 'page',
  title: 'Home',
  slug: { current: 'home' },
  sections: [
    {
      _key: 'hero',
      _type: 'heroSection',
      headline: 'Turn website visitors into direct bookings',
      subheadingDesktop:
        'We build award-winning, bespoke hotel websites and seamless booking engines. No templates. No DIY builders. Just a premium digital presence "done-for-you" from start to finish.',
      subheadingMobile: 'We build award-winning, bespoke hotel websites and seamless booking engines.',
      primaryButtonLabel: 'Book a demo',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Contact us',
      secondaryButtonHref: '/contact-us',
    },
    {
      _key: 'offerings',
      _type: 'productOfferingsSection',
      offerings: [
        {
          _key: 'custom-website',
          eyebrow: 'Custom websites',
          headline: 'Award-winning design. Zero templates.',
          body: 'We design and build blazing-fast, visually stunning websites tailored perfectly to your brand. Built with advanced SEO to rank higher and flawless UX to keep guests on your site instead of bouncing to an aggregator.',
          ctaLabel: 'Explore Custom Websites',
          ctaHref: '/custom-website',
          desktopImageUrl: r2('images/home/product-offerings/custom-website-collage.webp'),
          mobileImageUrl: r2('images/home/product-offerings/mobile-custom-website-photo.webp'),
        },
        {
          _key: 'booking-engine',
          eyebrow: 'Booking engine',
          headline: 'Frictionless checkouts. Higher conversions.',
          body: 'Turn browsing visitors into confirmed guests. We integrate a seamless, beautifully branded booking flow directly into your site, eliminating the frustration that causes cart abandonment.',
          ctaLabel: 'Explore Hitels Booking Engine',
          ctaHref: '/booking-engine',
          desktopImageUrl: r2('images/home/product-offerings/booking-engine-photo.webp'),
          mobileImageUrl: r2('images/home/product-offerings/mobile-booking-engine-photo.webp'),
        },
      ],
    },
    { _key: 'testimonials', _type: 'testimonialsSection' },
    {
      _key: 'stories',
      _type: 'customerStoriesSection',
      cards: [
        {
          _key: 'exeter',
          logoUrl: r2('images/home/stories/logo-exeter.svg'),
          imageUrl: r2('images/home/stories/exeter-desktop.webp'),
          caption: 'Exeter increases direct bookings by 23%',
          href: 'https://exeterhotel.is/',
        },
        {
          _key: 'oddsson',
          logoUrl: r2('images/home/stories/logo-oddsson.svg'),
          imageUrl: r2('images/home/stories/oddsson-desktop.webp'),
          caption: 'Oddsson increases organic traffic by 76%',
          href: 'https://oddsson.is/',
        },
        {
          _key: 'aurora',
          logoUrl: r2('images/home/stories/logo-aurora.svg'),
          imageUrl: r2('images/home/stories/aurora-desktop.webp'),
          caption: 'Aurora Farm increases direct bookings by 20%',
          href: 'https://www.aurorafarmhotel.com/',
        },
      ],
    },
    {
      _key: 'addons',
      _type: 'addOnsSection',
      addons: [
        {
          _key: 'content',
          iconUrl: r2('images/home/addons/icon-content.svg'),
          title: 'Content',
          description: 'AI blog content engine based on relevant keywords and competitive analysis',
          price: 'ISK 18.900',
          features: ['16 articles per month', 'Automatic topic suggestions'],
        },
        {
          _key: 'seo',
          iconUrl: r2('images/home/addons/icon-seo.svg'),
          title: 'SEO',
          description: 'SEO optimization to rank higher in search results in partnership with Digido',
          price: 'ISK 199.900',
          features: ['SEO optimized content and structure', 'Analytics dashboard'],
        },
        {
          _key: 'ads',
          iconUrl: r2('images/home/addons/icon-ads.svg'),
          title: 'Ads',
          description: 'Ad designs for the most common social media platforms in partnership with Flóra',
          price: 'ISK 30.000',
          features: ['4 social media ad designs per month', '1080 × 1920 and 1920 × 1080'],
        },
      ],
    },
    { _key: 'faq', _type: 'faqSection' },
  ],
};

const pricingPlans = {
  _id: 'pricingPlans',
  _type: 'pricingPlans',
  plans: [
    {
      _key: 'custom-website',
      title: 'Custom website',
      description: 'A stunning, high-converting digital presence built from scratch to elevate your brand.',
      price: 'ISK 199.900',
      priceSuffix: '/ month',
      features: [
        'Access to web specialists',
        'Custom design',
        'Analytics dashboard',
        'CMS access (2 seats)',
        'External link to booking engine like GODO',
        'Up to 20 beautifully crafted pages',
      ],
      ctaLabel: 'Subscribe today',
      ctaHref: '#',
      theme: 'light',
      iconUrls: [r2('images/home/pricing/icon-globe.svg')],
    },
    {
      _key: 'booking-engine',
      title: 'Booking Engine',
      description: 'Integrate a seamless booking engine into your existing website to maximize revenue.',
      price: '1,8%',
      priceSuffix: '/ direct booking',
      features: [
        'UI matched perfectly to your brand',
        'Frictionless booking flow',
        'Custom add-ons and up-selling',
        'Precision event tracking',
        'Secure backend',
        'Web hosting',
      ],
      ctaLabel: 'Get a quote',
      ctaHref: '/contact-us',
      theme: 'light',
      iconUrls: [r2('images/home/pricing/icon-calendar.svg')],
    },
    {
      _key: 'custom-website-and-booking-engine',
      title: 'Booking Engine',
      description: 'Combine custom website with a frictionless booking flow to obliterate OTA fees.',
      price: '179.900 + 1,5%',
      priceSuffix: '',
      features: [
        'Everything in Custom website',
        'Everything in Booking engine',
        'Content engine starter pack',
        'Ongoing conversion optimization',
        'Web hosting',
        'Onboarding and setup',
      ],
      ctaLabel: 'Get a quote',
      ctaHref: '/contact-us',
      theme: 'dark',
      iconUrls: [r2('images/home/pricing/icon-globe-card3.svg'), r2('images/home/pricing/icon-calendar-card3.svg')],
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
    mutations: [
      { createOrReplace: homePage },
      { createOrReplace: pricingPlans },
    ],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "homePage" and "pricingPlans" documents.');
console.log(JSON.stringify(body, null, 2));
