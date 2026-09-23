// One-off seed: Icelandic siblings for the 4 locked singletons
// (pricingPlans, siteSettings, footerSettings, addOns) — Phase 2 of the
// i18n rollout plan. Same reasoning as scripts/seed-is-content-batch1.mjs:
// these render unconditionally sitewide (BaseLayout/Footer/Pricing/AddOns
// on every page, including the already-live "/is/" pages), so real content
// had to exist before their queries could filter by language.
//
// DRAFT TRANSLATION: machine-drafted by Claude, not reviewed by a native
// Icelandic speaker yet — same caveat as every other batch this rollout.
//
// Internal hrefs (footerSettings' productLinks/companyLinks, CTA buttons,
// plan CTAs) are left pointing at the English paths for now — those pages
// aren't localized yet (Phase 3), and locale-prefixing them is Phase 4's
// job once there's somewhere for an Icelandic link to actually go.
//
// Existing _ids stay untouched; new docs use "-is" suffixed ids. Uses
// createOrReplace, safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-is-content-batch2.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const pricingPlansIs = {
  _id: 'pricingPlans-is',
  _type: 'pricingPlans',
  language: 'is',
  plans: [
    {
      _key: 'custom-website',
      title: 'Sérsniðinn vefur',
      description: 'Glæsileg, árangursrík stafræn nærvera byggð frá grunni til að efla vörumerkið þitt.',
      price: 'ISK 199.900',
      priceSuffix: '/ mánuði',
      features: [
        'Aðgangur að vefsérfræðingum',
        'Sérsniðin hönnun',
        'Greiningarmælaborð',
        'Aðgangur að CMS (2 notendur)',
        'Ytri tengill á bókunarvél eins og GODO',
        'Allt að 20 fallega hannaðar síður',
      ],
      ctaLabel: 'Gerast áskrifandi í dag',
      ctaHref: '#',
      theme: 'light',
      iconUrls: [r2('images/home/pricing/icon-globe.svg')],
    },
    {
      _key: 'booking-engine',
      title: 'Bókunarvél',
      description: 'Samþættu straumlínulagaða bókunarvél við núverandi vefsíðu þína til að hámarka tekjur.',
      price: '1,8%',
      priceSuffix: '/ beina bókun',
      features: [
        'Notendaviðmót fullkomlega samræmt vörumerkinu þínu',
        'Núningslaust bókunarferli',
        'Sérsniðnar viðbætur og uppsölu',
        'Nákvæm atburðamæling',
        'Öruggt bakkerfi',
        'Vefhýsing',
      ],
      ctaLabel: 'Fá tilboð',
      ctaHref: '/contact-us',
      theme: 'light',
      iconUrls: [r2('images/home/pricing/icon-calendar.svg')],
    },
    {
      _key: 'custom-website-and-booking-engine',
      title: 'Bókunarvél',
      description: 'Sameinaðu sérsniðinn vef með núningslausu bókunarferli til að útrýma OTA-þóknunum.',
      price: '179.900 + 1,5%',
      priceSuffix: '',
      features: [
        'Allt í Sérsniðnum vef',
        'Allt í Bókunarvél',
        'Byrjunarpakki fyrir efnisvél',
        'Áframhaldandi viðskiptahlutfallsbestun',
        'Vefhýsing',
        'Innleiðing og uppsetning',
      ],
      ctaLabel: 'Fá tilboð',
      ctaHref: '/contact-us',
      theme: 'dark',
      iconUrls: [r2('images/home/pricing/icon-globe-card3.svg'), r2('images/home/pricing/icon-calendar-card3.svg')],
    },
  ],
};

const siteSettingsIs = {
  _id: 'siteSettings-is',
  _type: 'siteSettings',
  language: 'is',
  siteName: 'Hitels',
  defaultSeoTitle: 'Hitels — Breyttu vefsíðugestum í beinar bókanir',
  defaultSeoDescription:
    'Við hönnum verðlaunaða, sérsniðna hótelvefi og straumlínulagaðar bókunarvélar. Engin sniðmát, engin DIY-verkfæri — aðeins hágæða stafræn nærvera sem við sjáum alfarið um frá upphafi til enda.',
  defaultOgImage: r2('images/og/social-share.png'),
  organizationName: 'Hitels',
  organizationLogoUrl: r2('images/home/footer/hitels-logo.svg'),
};

const footerSettingsIs = {
  _id: 'footerSettings-is',
  _type: 'footerSettings',
  language: 'is',
  ctaHeadline: 'Viltu breyta vefnum þínum í arðbærustu bókunarleiðina þína?',
  ctaBody: 'Ræðum hvernig sérsniðin stafræn nærvera getur aukið beinar bókanir þínar og sparað þér þúsundir í þóknunum.',
  primaryButtonLabel: 'Bóka kynningu',
  primaryButtonHref: '/contact-us',
  secondaryButtonLabel: 'Hafðu samband',
  secondaryButtonHref: '/contact-us',
  contactHeadline: 'Heilsaðu nýja hótelkerfinu þínu',
  phoneLabel: '+354 5478001',
  phoneHref: '',
  mailingListLabel: 'Skráðu þig á póstlistann',
  mailingListHref: '',
  productLinks: [
    { _key: 'booking-engine', label: 'Bókunarvél', href: '/booking-engine' },
    { _key: 'custom-website', label: 'Sérsniðinn vefur', href: '/custom-hotels-website' },
    { _key: 'pricing', label: 'Verðskrá', href: '/pricing' },
  ],
  companyLinks: [
    { _key: 'about-us', label: 'Um okkur', href: '/about-us' },
    { _key: 'contact-us', label: 'Hafðu samband', href: '/contact-us' },
    { _key: 'resources', label: 'Fræðsla', href: '/discover' },
  ],
  copyrightText: '© 2024 Hitels. Öll réttindi áskilin.',
};

const addOnsIs = {
  _id: 'addOns-is',
  _type: 'addOns',
  language: 'is',
  addons: [
    {
      _key: 'content',
      iconUrl: r2('images/home/addons/icon-content.svg'),
      title: 'Efni',
      description: 'AI-drifin bloggefnisvél byggð á viðeigandi leitarorðum og samkeppnisgreiningu',
      price: 'ISK 18.900',
      features: ['16 greinar á mánuði', 'Sjálfvirkar efnistillögur'],
    },
    {
      _key: 'seo',
      iconUrl: r2('images/home/addons/icon-seo.svg'),
      title: 'SEO',
      description: 'SEO-bestun til að ná hærri röðun í leitarniðurstöðum í samstarfi við Digido',
      price: 'ISK 199.900',
      features: ['SEO-bestað efni og uppbygging', 'Greiningarmælaborð'],
    },
    {
      _key: 'ads',
      iconUrl: r2('images/home/addons/icon-ads.svg'),
      title: 'Auglýsingar',
      description: 'Auglýsingahönnun fyrir helstu samfélagsmiðla í samstarfi við Flóru',
      price: 'ISK 30.000',
      features: ['4 auglýsingahönnun fyrir samfélagsmiðla á mánuði', '1080 × 1920 og 1920 × 1080'],
    },
  ],
};

const mutations = [pricingPlansIs, siteSettingsIs, footerSettingsIs, addOnsIs].map((doc) => ({ createOrReplace: doc }));

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
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded 4 Icelandic singleton documents: pricingPlans-is, siteSettings-is, footerSettings-is, addOns-is.');
