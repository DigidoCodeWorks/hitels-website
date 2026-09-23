// One-off seed: Icelandic siblings for the 5 remaining `page` documents
// (about-us, booking-engine, custom-hotels-website, contact-us, pricing) —
// pulled forward from Phase 5 into Phase 3, since the new /is/ routing for
// these pages throws (and breaks the whole static build, not just that one
// page) if no matching Icelandic "page" document exists yet.
//
// DRAFT TRANSLATION: machine-drafted by Claude, not reviewed by a native
// Icelandic speaker yet — same caveat as every other batch this rollout.
// Internal hrefs (button hrefs) stay pointed at English paths, same
// reasoning as every other batch — hrefs get locale-prefixed in the UI
// chrome phase, once every page has an /is/ counterpart to link to. Image
// URLs, member emails/photos, and numeric values are unchanged.
//
// Existing English _ids stay untouched; new docs use "-is" suffixed ids.
// Uses createOrReplace, safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-is-content-batch3.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `https://pub-cc3bba3bab304bebb22958edffa16e9c.r2.dev/${path}`;

const aboutUsIs = {
  _id: 'aboutUsPage-is',
  _type: 'page',
  language: 'is',
  title: 'Um okkur',
  slug: { current: 'about-us' },
  seo: {
    title: 'Að umbreyta hótelrekstri fyrir íslenska markaðinn',
    description:
      'Kynntu þér Hitels, fremsta veitanda hótelrekstrarhugbúnaðar sérsniðins fyrir íslenska markaðinn. Uppgötvaðu hvernig við hjálpum hótelrekendum að auka beinar bókanir, hækka tekjur og bæta upplifun gesta með nýstárlegum lausnum.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'Við byggjum vélina sem knýr hótel áfram.',
      subheading:
        'Hitels er sérhæfð stafræn umboðsskrifstofa og hugbúnaðarveitandi með það hlutverk að hjálpa hótelrekendum að endurheimta stjórn á tekjum sínum, stafrænni nærveru og tengslum við gesti.',
      primaryButtonLabel: 'Bóka kynningu',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Hafðu samband',
      secondaryButtonHref: '/contact-us',
      imageUrl: r2('images/about/hero/photo.webp'),
      imageAlt: 'Gestur að skrá sig inn við móttöku hótels',
    },
    {
      _key: 'whoWeAre',
      _type: 'statsIntroSection',
      headline: 'Hverjir erum við',
      body: 'Við erum hópur stafrænna sérfræðinga með djúpa ástríðu fyrir hótelbransanum. Við vorum stofnuð með þá framtíðarsýn að umbreyta hótelbransanum frá óbeinum bókunum yfir í beinar.',
      stats: [
        { _key: 'employees', label: 'Starfsfólk', value: '15' },
        { _key: 'nationalities', label: 'Þjóðerni', value: '4' },
        { _key: 'partners', label: 'Samstarfsaðilar', value: '19+' },
      ],
    },
    {
      _key: 'team',
      _type: 'teamSection',
      headline: 'Fólkið á bak við snjallari hótelvefi',
      body: 'Flestar bókunarvélar líta út eins og eftiráhugsun. Við göngum lengra en nokkur samkeppnisaðili til að tryggja óaðfinnanleg umskipti frá vefnum þínum yfir í greiðsluferlið. Byrjað er í Figma, þar sem við sníðum leturgerðir, liti og notendaviðmótseiningar nákvæmlega svo vélin virðist eðlilegt, hágæða framhald af vörumerkinu þínu.',
      members: [
        { _key: 'arnar', name: 'Arnar Hinriksson', role: 'Vöxtur og árangur', email: 'arnar@hitels.is', photoUrl: r2('images/about/team/headshot/arnar.webp') },
        { _key: 'thordis', name: 'Þórdís', role: 'Tækni og árangur viðskiptavina', email: 'thordis@hitels.is', photoUrl: r2('images/about/team/headshot/thordis.webp') },
        { _key: 'birgir', name: 'Birgir', role: 'Stefnumótun og ráðgjöf', email: 'birgir@hitels.is', photoUrl: r2('images/about/team/headshot/birgir.webp') },
        { _key: 'salome', name: 'Salome', role: 'Árangur viðskiptavina og gæðaeftirlit', email: 'hi@hitels.is', photoUrl: r2('images/about/team/headshot/salome.webp') },
        { _key: 'bjarki', name: 'Bjarki', role: 'Hönnuður', email: 'hi@hitels.is', photoUrl: r2('images/about/team/headshot/bjarki.webp') },
      ],
    },
    {
      _key: 'beliefs',
      _type: 'beliefsSection',
      headline: 'Það sem við trúum á',
      beliefs: [
        {
          _key: 'frictionless',
          title: 'Núningslaus upplifun',
          description: 'Við trúum því að upplifun gesta hefjist löngu fyrir innritun. Við trúum því að það að fjarlægja núning sé fljótlegasta leiðin til að auka beinar tekjur.',
        },
        {
          _key: 'data',
          title: 'Gögn fram yfir tilgátur',
          description: 'Við trúum á að nota áreiðanleg gögn, greiningar og stöðuga hagræðingu til að breyta fallegum vefsíðum í mjög arðbærar bókunarleiðir.',
        },
        {
          _key: 'partnership',
          title: 'Sannur samstarfsandi',
          description: 'Við trúum á sérhæfðan stuðning, reglulega framvindufundi og að vinna virkan með þér að því að stækka fyrirtækið þitt.',
        },
      ],
    },
    {
      _key: 'whatIsHitels',
      _type: 'whatIsHitelsSection',
      headline: 'Hvað er Hitels?',
      body: 'Hitels er sérhæfður vettvangur hannaður til að hjálpa hótelum að auka beinar bókanir með því að búa til sérsniðna, stigstærðanlega vefi sem bæta upplifun gesta.',
      features: [
        { _key: 'custom-websites', title: 'Sérsniðnir vefir', description: 'Einstök hönnun sem sýnir sjarma hótelsins þíns' },
        { _key: 'direct-bookings', title: 'Beinar bókanir', description: 'Auktu tekjur með beinum bókunum' },
        { _key: 'guest-experience', title: 'Upplifun gesta', description: 'Óaðfinnanlegt, öruggt bókunarferli' },
        { _key: 'analytics', title: 'Greiningar', description: 'Fylgstu með lykilmælikvörðum fyrir betri ákvarðanir' },
      ],
    },
  ],
};

const bookingEngineIs = {
  _id: 'bookingEnginePage-is',
  _type: 'page',
  language: 'is',
  title: 'Bókunarvél',
  slug: { current: 'booking-engine' },
  seo: {
    title: 'Hitels — Bókunarvél byggð til að hámarka beinar tekjur',
    description: 'Nútímaleg bókunarvél byggð til að hámarka beinar tekjur þínar. Kveddu klunnaleg, ótengd greiðsluferli og heilsaðu óaðfinnanlegu ferli sem gestir þínir munu elska.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'Hættu að missa gesti í greiðsluferlinu.',
      subheading: 'Nútímaleg bókunarvél byggð til að hámarka beinar tekjur þínar. Kveddu klunnaleg, ótengd greiðsluferli og heilsaðu óaðfinnanlegu ferli sem gestir þínir munu elska.',
      primaryButtonLabel: 'Bóka kynningu',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Hafðu samband',
      secondaryButtonHref: '/contact-us',
    },
    {
      _key: 'features',
      _type: 'featuresSection',
      features: [
        {
          _key: 'design',
          label: 'Hönnun',
          heading: 'Fullkomin samþætting vörumerkis',
          description: 'Flestar bókunarvélar líta út eins og eftiráhugsun. Við göngum lengra en samkeppnisaðilar okkar til að tryggja óaðfinnanleg umskipti frá vefnum þínum yfir í greiðsluferlið. Við sníðum leturgerðir, liti og einingar nákvæmlega svo vélin virðist eðlilegt, hágæða framhald af vörumerkinu þínu.',
          imageUrl: r2('images/booking-engine/features/brand-integration.webp'),
          imageAlt: 'Notendaviðmót bókunarvélar samræmt vörumerki hótels',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'revenue',
          label: 'Tekjur',
          heading: 'Hámarkaðu tekjur með sérsniðnum viðbótum',
          description: 'Ekki bara selja herbergi, seldu upplifun. Kerfið okkar höndlar auðveldlega sérsniðna uppsölu í greiðsluferlinu. Hvort sem það er að bæta við kampavínsflösku, bóka aðgang að spa, nota afsláttarkóða eða bóka mörg herbergi, hjálpum við þér að auka meðalpöntunarupphæð áreynslulaust.',
          imageUrl: r2('images/booking-engine/features/addons.webp'),
          imageAlt: 'Greiðsluferli sem sýnir kampavínsflösku sem viðbót',
          imageFirst: true,
          imageHasLightBackground: false,
        },
        {
          _key: 'analytics',
          label: 'Greiningar',
          heading: 'Hættu að giska á hvað virkar',
          description: 'Bókunarvélin okkar er með innbyggða, nákvæma atburðamælingu. Fylgstu auðveldlega með hverju skrefi greiðsluferlisins, mældu viðskiptahlutfall þitt og reiknaðu nákvæma arðsemi markaðsherferða þinna svo þú getir aukið beinar bókanir af öryggi.',
          imageUrl: r2('images/booking-engine/features/analytics.webp'),
          imageAlt: 'Trektarlíkan sem sýnir brottfall gesta í hverju skrefi greiðsluferlisins',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'security',
          label: 'Öryggi',
          heading: 'Öflugur og öruggur grunnur',
          description: 'Byggð ofan á hið öfluga Godo hótelstjórnunarkerfi, sameinar vélin okkar áreiðanleika á fyrirtækjastigi og fremsta öryggi. Gestir þínir njóta öruggs greiðsluferlis og þú færð hugarró um að bakkerfið þitt sé traust.',
          imageUrl: r2('images/booking-engine/features/security.webp'),
          imageAlt: 'Skýringarmynd sem tengir vefinn, öruggt greiðsluferli og Godo',
          imageFirst: true,
          imageHasLightBackground: false,
        },
      ],
    },
  ],
};

const customWebsiteIs = {
  _id: 'customWebsitePage-is',
  _type: 'page',
  language: 'is',
  title: 'Sérsniðinn vefur',
  slug: { current: 'custom-hotels-website' },
  seo: {
    title: 'Hitels - Sérsniðnir vefir gerðir fyrir hótelið þitt',
    description: 'Með því að velja sérsniðinn vef getur hótelið þitt skarað fram úr á fjölmennum markaði og aukið beinar bókanir á vefinn þinn.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'productHeroSection',
      headline: 'Hótelið þitt er einstakt. Vefurinn þinn ætti að vera það líka.',
      subheading: 'Við hönnum og byggjum verðlaunaða hótelvefi frá grunni. Engin sniðmát. Aðeins sérsniðin, gagnadrifin hönnun hönnuð til að komast framhjá bókunarsíðum og ná beinum bókunum.',
      primaryButtonLabel: 'Hafðu samband',
      primaryButtonHref: '/contact-us',
      secondaryButtonLabel: 'Skoða verðskrá',
      secondaryButtonHref: '#pricing',
    },
    {
      _key: 'features',
      _type: 'featuresSection',
      features: [
        {
          _key: 'design',
          label: 'Hönnun',
          heading: 'Sniðið að þinni ímynd',
          description: 'Við gerum ekki almenna hluti. Með krafti Framer byggjum við allt sérsniðið frá grunni út frá þínum sérstöku vörumerkjaleiðbeiningum. Stafræn nærvera þín verður algjörlega einstök, sem greinir þig frá samkeppnisaðilum sem reiða sig á stíf WordPress þemu.',
          imageUrl: r2('images/custom-website/feature-custom-design.webp'),
          imageAlt: 'Staðgengilsmynd af leturstílaleiðbeiningum (bíður eftir raunverulegri mynd frá hönnun)',
          imageFirst: false,
          imageHasLightBackground: false,
        },
        {
          _key: 'conversion',
          label: 'Viðskiptahlutfall',
          heading: 'Hannað til að selja',
          description: 'Fallegur vefur er gagnslaus ef hann skilar ekki viðskiptum. Með víðtæka reynslu í gistigeiranum notum við gögn og sannaða innsýn í hegðun notenda til að hanna útlit sem leiðir gesti mjúklega að „Bóka núna" hnappinum.',
          imageUrl: r2('images/custom-website/feature-data-driven.webp'),
          imageAlt: 'Hitakort ofan á sýnishorn af hótelvef sem sýnir hvar gestir smella og skruna',
          imageFirst: true,
          imageHasLightBackground: false,
        },
        {
          _key: 'experience',
          label: 'Upplifun',
          heading: 'Grípandi upplifun gesta',
          description: 'Upplifun gesta hefst löngu áður en þeir koma í anddyrið. Með grípandi hreyfimyndum, eldsnöggum hleðslutíma og sannfærandi myndrænni frásögn náum við einstöku andrúmslofti eignarinnar þinnar og fáum gesti til að verða ástfangna af hótelinu þínu samstundis.',
          imageUrl: r2('images/custom-website/feature-visual-storytelling.webp'),
          imageAlt: "Hreyfimynd af tilboðskorti 'Miðvikudagsflótti' á hótelvef",
          imageFirst: false,
          imageHasLightBackground: true,
        },
        {
          _key: 'partnership',
          label: 'Samstarf',
          heading: 'Sannur stafrænn samstarfsaðili',
          description: 'Við störfum sem sérhæft stafrænt teymi fyrir þig. Frá upphaflegri ítarlegri kynningarvinnustofu og víðtækri rannsóknarvinnu til reglulegra framvindufunda og beinna samskipta á Slack, sjáum við um erfiðisvinnuna á meðan þú fylgist fullkomlega með.',
          imageUrl: r2('images/custom-website/feature-support.webp'),
          imageAlt: 'Slack samtal milli viðskiptavinar og Hitels teymisins um beiðni um nýja síðu',
          imageFirst: true,
          imageHasLightBackground: true,
        },
      ],
    },
  ],
};

const contactUsIs = {
  _id: 'contactUsPage-is',
  _type: 'page',
  language: 'is',
  title: 'Hafðu samband',
  slug: { current: 'contact-us' },
  seo: {
    title: 'Hafðu samband við Hitels fyrir sérsniðnar hótelrekstrarlausnir á Íslandi',
    description: 'Hafðu samband við Hitels varðandi persónusniðnar hótelrekstrarlausnir hannaðar fyrir íslenska markaðinn. Teymið okkar er hér til að aðstoða þig við að auka beinar bókanir, hámarka tekjur og bæta upplifun gesta.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'simpleHeroSection',
      headline: 'Hafðu samband',
      subheading: 'Við kynnumst þörfum teymisins þíns og skoðum hvernig þær falla að vörum okkar og þjónustu. Fáðu sérfræðiráðgjöf frá ráðgjöfum okkar sem geta svarað öllum spurningum sem þú gætir haft.',
    },
  ],
};

const pricingIs = {
  _id: 'pricingPage-is',
  _type: 'page',
  language: 'is',
  title: 'Verðskrá',
  slug: { current: 'pricing' },
  seo: {
    title: 'Verðskrá Hitels fyrir hótelvefi með beinum bókunum á Íslandi',
    description: 'Kynntu þér áskriftarleiðir Hitels sérsniðnar fyrir íslensk hótel. Veldu úr Grunn-, Sérsniðinni og Úrvals áskrift til að fá skýra, einfalda vefi og viðbætur hannaðar til að auka beinar bókanir og bæta upplifun gesta.',
  },
  sections: [
    {
      _key: 'hero',
      _type: 'simpleHeroSection',
      headline: 'Verðskrá',
      subheading: 'Kynntu þér sveigjanlegar verðleiðir Hitels, hannaðar fyrir hótel af öllum stærðum. Auktu beinar bókanir og stafræna nærveru með stigstærðanlegum lausnum okkar. Veldu fullkomnu leiðina þína í dag!',
    },
    { _key: 'addons', _type: 'addOnsSection' },
    {
      _key: 'comparison',
      _type: 'comparisonTableSection',
      plans: ['Sérsniðinn vefur', 'Bókunarvél', 'Sameinað'],
      rows: [
        { _key: 'pricing', isGroupHeader: false, label: 'Verð', values: ['199.900 kr. / mánuði', '1,8% / bókun', '179.900 kr. / mán + 1,5%'] },
        { _key: 'design-group', isGroupHeader: true, label: 'Hönnun' },
        { _key: 'custom-design', isGroupHeader: false, label: 'Sérsniðin hönnun', values: ['true', 'true', 'true'] },
        { _key: 'checkout-experience', isGroupHeader: false, label: 'Greiðsluupplifun', values: ['Endurbeiningar', 'Samræmt viðmót', 'Óaðfinnanlegt'] },
        { _key: 'technical-group', isGroupHeader: true, label: 'Tæknilegt' },
        { _key: 'analytics', isGroupHeader: false, label: 'Greiningar', values: ['Vefumferð', 'Viðskipti', 'Full trekt'] },
        { _key: 'cms-access', isGroupHeader: false, label: 'Aðgangur að CMS', values: ['2 notendur', '2 notendur', '2 notendur'] },
        { _key: 'web-hosting', isGroupHeader: false, label: 'Vefhýsing', values: ['true', 'true', 'true'] },
        { _key: 'support-group', isGroupHeader: true, label: 'Stuðningur' },
        { _key: 'onboarding', isGroupHeader: false, label: 'Innleiðing', values: ['true', 'true', 'true'] },
        { _key: 'slack-support', isGroupHeader: false, label: 'Slack stuðningur', values: ['true', 'true', 'true'] },
        { _key: 'growth-group', isGroupHeader: true, label: 'Vöxtur' },
        { _key: 'conversion-tuning', isGroupHeader: false, label: 'Viðskiptahlutfallsstilling', values: ['false', 'false', 'true'] },
        { _key: 'content-engine', isGroupHeader: false, label: 'Efnisvél', values: ['false', 'false', '8 greinar / mánuði'] },
      ],
    },
  ],
};

const mutations = [aboutUsIs, bookingEngineIs, customWebsiteIs, contactUsIs, pricingIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded 5 Icelandic page documents: aboutUsPage-is, bookingEnginePage-is, customWebsitePage-is, contactUsPage-is, pricingPage-is.');
