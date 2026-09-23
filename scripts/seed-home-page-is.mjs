// One-off seed: creates the Icelandic "page" document (slug "home", language
// "is") as the /is/ counterpart to the English "homePage" document created by
// seed-home-page.mjs. Same structure, same _key values, same R2 image URLs
// and internal hrefs (those pages aren't localized yet — see the i18n pilot
// plan) — only user-facing copy is translated.
//
// DRAFT TRANSLATION: this Icelandic copy was machine-drafted by Claude for
// the i18n routing pilot. It has not been reviewed by a native Icelandic
// speaker and should be reviewed/corrected before this goes past `staging`.
//
// Note: the `addons` array on the addOnsSection below is translated for
// structural parity with the English document, but is currently inert —
// AddOns.astro (like Testimonial.astro/Faq.astro) fetches its own content
// independently from the separate `addOns`/`testimonial`/`faq` collections,
// none of which are locale-aware yet. Those sections render identically
// (in English) on both "/" and "/is/" until a later pass localizes them.
//
// Uses createOrReplace with a fixed _id ("homePageIs"), so it's safe to
// re-run.
//
// Usage: node --env-file=.env scripts/seed-home-page-is.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const homePageIs = {
  _id: 'homePageIs',
  _type: 'page',
  title: 'Heim',
  slug: { current: 'home' },
  language: 'is',
  seo: {
    title: 'Hitels — Breyttu vefsíðugestum í beinar bókanir',
    description:
      'Við hönnum verðlaunaða, sérsniðna hótelvefi og straumlínulagaðar bókunarvélar. Engin sniðmát, engin DIY-verkfæri — aðeins hágæða stafræn nærvera sem við sjáum alfarið um frá upphafi til enda.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'heroSection',
      headline: 'Breyttu vefsíðugestum í beinar bókanir',
      subheadingDesktop:
        'Við hönnum og byggjum verðlaunaða, sérsniðna vefi fyrir hótel og straumlínulagaðar bókunarvélar. Engin sniðmát. Engin sjálfsuppsetningarverkfæri. Aðeins hágæða stafræn nærvera sem við sjáum alfarið um, frá upphafi til enda.',
      subheadingMobile: 'Við hönnum verðlaunaða, sérsniðna vefi fyrir hótel og straumlínulagaðar bókunarvélar.',
      primaryButtonLabel: 'Bóka kynningu',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Hafðu samband',
      secondaryButtonHref: '/contact-us',
    },
    {
      _key: 'offerings',
      _type: 'productOfferingsSection',
      offerings: [
        {
          _key: 'custom-website',
          eyebrow: 'Sérsniðnir vefir',
          headline: 'Verðlaunuð hönnun. Engin sniðmát.',
          body: 'Við hönnum og byggjum eldsnögga, sjónrænt glæsilega vefi sem eru sérsniðnir að þínu vörumerki. Byggðir með háþróaðri leitarvélabestun (SEO) til að ná hærri röðun og fullkominni notendaupplifun sem heldur gestum á þínum vef í stað þess að þeir leiti annað.',
          ctaLabel: 'Skoða sérsniðna vefi',
          ctaHref: '/custom-hotels-website',
          desktopImageUrl: r2('images/home/product-offerings/custom-website-collage.webp'),
          mobileImageUrl: r2('images/home/product-offerings/mobile-custom-website-photo.webp'),
        },
        {
          _key: 'booking-engine',
          eyebrow: 'Bókunarvél',
          headline: 'Núningslaus greiðsluferli. Hærra viðskiptahlutfall.',
          body: 'Breyttu skoðunargestum í staðfesta gesti. Við samþættum straumlínulagað, fallega vörumerkt bókunarferli beint inn á þinn vef og eyðum þeirri gremju sem veldur því að fólk hættir við í miðju kafi.',
          ctaLabel: 'Skoða Hitels bókunarvélina',
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
          caption: 'Exeter eykur beinar bókanir um 23%',
          href: 'https://exeterhotel.is/',
        },
        {
          _key: 'oddsson',
          logoUrl: r2('images/home/stories/logo-oddsson.svg'),
          imageUrl: r2('images/home/stories/oddsson-desktop.webp'),
          caption: 'Oddsson eykur lífræna umferð um 76%',
          href: 'https://oddsson.is/',
        },
        {
          _key: 'aurora',
          logoUrl: r2('images/home/stories/logo-aurora.svg'),
          imageUrl: r2('images/home/stories/aurora-desktop.webp'),
          caption: 'Aurora Farm eykur beinar bókanir um 20%',
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
    },
    { _key: 'faq', _type: 'faqSection' },
  ],
};

const res = await fetch(`https://${PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${SANITY_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    mutations: [{ createOrReplace: homePageIs }],
  }),
});

const body = await res.json();
if (!res.ok) {
  console.error('Seed failed:', JSON.stringify(body, null, 2));
  process.exit(1);
}

console.log('Seeded "homePageIs" document.');
console.log(JSON.stringify(body, null, 2));
