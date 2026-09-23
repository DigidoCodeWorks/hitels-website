// One-off seed: Icelandic siblings for the content types that render
// unconditionally on the already-live home page (FAQ, Testimonial, Story,
// StoriesClosingCard — see the i18n rollout plan's Phase 1 correction: these
// couldn't be deferred like blog posts, since HeroStories.astro/Faq.astro/
// Testimonial.astro self-fetch with no props and are already live at both
// "/" and "/is/").
//
// DRAFT TRANSLATION: this Icelandic copy was machine-drafted by Claude, not
// reviewed by a native Icelandic speaker yet — same caveat as the home page
// pilot's Icelandic content, flagged here for the same reason.
//
// Each new doc's _id is the English sibling's _id + "-is" suffix, language
// "is", and (for story) the same slug.current as its English sibling —
// same pattern as scripts/seed-home-page-is.mjs. Uses createOrReplace, safe
// to re-run.
//
// Usage: node --env-file=.env scripts/seed-is-content-batch1.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN, R2_PUBLIC_URL })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `${R2_PUBLIC_URL}/${path}`;

const faqs = [
  {
    _id: 'faq-who-is-this-best-for-is',
    _type: 'faq',
    language: 'is',
    order: 0,
    question: 'Fyrir hverja hentar þetta best?',
    answer:
      'Sjálfstæð og smærri hótel sem vilja efla vörumerki sitt, auka beinar bókanir og hætta að greiða háar þóknanir til bókunarsíðna (OTA).',
  },
  {
    _id: 'faq-how-is-your-platform-different-from-wordpress-or-squarespace-is',
    _type: 'faq',
    language: 'is',
    order: 1,
    question: 'Hvernig er kerfið okkar frábrugðið WordPress eða Squarespace?',
    answer:
      'Við notum ekki DIY-sniðmát. Við bjóðum upp á hágæða „við sjáum um allt"-þjónustu og byggjum vefinn þinn sérsniðinn í Framer fyrir betri hönnun, hraða og leitarvélabestun.',
  },
  {
    _id: 'faq-how-is-the-booking-engine-implemented-is',
    _type: 'faq',
    language: 'is',
    order: 2,
    question: 'Hvernig er bókunarvélin sett upp?',
    answer:
      'Við sjáum um alla tæknilega uppsetningu fyrir þig. Við samþættum vélina óaðfinnanlega við núverandi vefsíðu þína eða nýjan sérsniðinn vef sem við byggjum.',
  },
  {
    _id: 'faq-do-i-have-to-use-both-the-website-and-the-booking-engine-is',
    _type: 'faq',
    language: 'is',
    order: 3,
    question: 'Þarf ég að nota bæði vefinn og bókunarvélina?',
    answer:
      'Nei. Þjónustan okkar er algjörlega einingaskipt. Við getum byggt nýjan vef fyrir þig, samþætt bókunarvélina okkar við núverandi vef þinn, eða hvort tveggja.',
  },
  {
    _id: 'faq-what-exactly-does-hitels-do-is',
    _type: 'faq',
    language: 'is',
    order: 4,
    question: 'Hvað gerir Hitels nákvæmlega?',
    answer:
      'Við bjóðum upp á tvær grunnþjónustur fyrir hótel: sérsniðna vefhönnun og beina bókunarvél. Þú getur nýtt hvora þjónustu fyrir sig, eða sameinað báðar.',
  },
];

const testimonials = [
  {
    _id: 'testimonial-oskar-is',
    _type: 'testimonial',
    language: 'is',
    order: 1,
    name: 'Óskar',
    role: 'Hótelstjóri',
    imageUrl: r2('cms/testimonials/oskar.png'),
    quote:
      '„Við vorum í skýjunum með sérsniðnar lausnir Hitels fyrir vefinn okkar. Sérþekking þeirra í að skapa stílhreina og notendavæna vefupplifun hefur gjörbreytt því hvernig við tengjumst gestum okkar. Nýi vefurinn lítur ekki aðeins frábærlega út heldur eykur einnig samskipti við viðskiptavini, sem hefur leitt til umtalsverðrar aukningar í beinum bókunum."',
  },
  {
    _id: 'testimonial-karitas-k-mccrann-is',
    _type: 'testimonial',
    language: 'is',
    order: 2,
    name: 'Karítas K. McCrann',
    role: 'Hótelstjóri',
    imageUrl: r2('cms/testimonials/karitas-k-mccrann.jpeg'),
    quote:
      '„Samstarfið við Hitels um endurhönnun vefjanna okkar var sannarlega ánægjulegt ferli. Frá upphafi til enda gerðu skýr samskipti og sveigjanleg nálgun þeirra að allt gekk snurðulaust fyrir sig. Teymið var ekki aðeins fagmannlegt heldur einnig mjög þægilegt í samstarfi, alltaf opið fyrir hugmyndum okkar og breytingum. Við hlökkum til að sjá hvernig þessir nýju vefir munu efla nærveru okkar á netinu, auka þátttöku og fjölga beinum bókunum — það lítur nú þegar mjög vel út!"',
  },
];

const stories = [
  {
    _id: 'story-hitels-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'hitels' },
    order: 1,
    projectName: 'Hitels',
    storyTitle: 'Efling íslenskra hótela til árangurs',
    description: 'Hjá Hitels er markmið okkar að efla íslensk hótel með háþróuðum, gagnadrifnum verkfærum. ',
    buttonText: 'Fá tilboð',
    buttonLink: '/contact-us',
  },
  {
    _id: 'story-aurora-farm-hotel-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'aurora-farm-hotel' },
    order: 2,
    projectName: 'Aurora Farm Hotel',
    description:
      'Hótelvefur innblásinn af íslenskri náttúru og ró sveitarinnar, sem endurspeglar friðsæla stemningu landsbyggðarinnar. Hannaður með hlýjum, einföldum stíl og byggður í Framer fyrir einfaldar efnisuppfærslur og auðvelda umsjón.',
    buttonText: 'aurorafarmhotel.com',
    buttonLink: 'aurorafarmhotel.com',
  },
  {
    _id: 'story-blue-vacations-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'blue-vacations' },
    order: 3,
    projectName: 'Blue Vacations',
    description:
      'Blue Hotel er staðsett í miðju Reykholts. Nýlega byggt 40 herbergja hótel í anda gamla gistiheimilisins okkar sem nú hýsir móttöku og morgunverðarsal. Gestir njóta rólegrar stemningar meðal trjáa og íslenskrar náttúru.',
    buttonText: 'bluevacations',
  },
  {
    _id: 'story-knox-hotels-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'knox-hotels' },
    order: 4,
    projectName: 'Knox Hotels',
    description:
      'Knox Hotel Group byggir á þeirri trú að hótel geti verið meira en bara gististaður.\nKnox Hotel Group velur áfangastaði sem endurspegla anda Íslands — ekta, fágaða og framsækna.',
    buttonText: 'knoxhotels.is',
    buttonLink: 'knoxhotels.is',
  },
  {
    _id: 'story-exeter-hotel-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'exeter-hotel' },
    order: 5,
    projectName: 'Exeter hotel',
    description:
      "Í hjarta Reykjavíkur er Exeter Hotel kjörinn grunnur til að kanna menningu, matargerð og sjónarspil borgarinnar. Nútímalega innréttuð herbergi og svítur tryggja þægilega og eftirminnilega dvöl.",
    buttonText: 'exeter.is',
    buttonLink: 'exeter.is',
  },
  {
    _id: 'story-oddsson-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'oddsson' },
    order: 6,
    projectName: 'ODDSSON',
    description:
      'Fágaður hótelvefur innblásinn af skandinavískri einfaldleika og áreynslulausum þægindum. Róleg, ritstjórnarleg hönnun sýnir stíl og upplifun hótelsins, byggð í Framer fyrir óaðfinnanlega efnisstjórnun.',
    buttonText: 'oddsson.is',
    buttonLink: 'oddsson.is',
  },
  {
    _id: 'story-konvin-hotel-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'konvin-hotel' },
    order: 7,
    projectName: 'Konvin Hotel',
    description:
      'Hreinn og aðlaðandi hótelvefur sem varpar ljósi á Ísland sem áfangastað og leiðir gesti áreynslulaust í gegnum bókunarferlið. Hannaður með skýrleika og einfaldleika að leiðarljósi, byggður í Framer fyrir auðvelda efnisstjórnun.',
    buttonText: 'konvin.is',
    buttonLink: 'konvin.is',
  },
  {
    _id: 'story-black-sand-hotel-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'black-sand-hotel' },
    order: 8,
    projectName: 'Black Sand Hotel',
    description:
      'Djarfur, nútímalegur hótelvefur mótaður af dramatísku landslagi og eldvirkni Íslands. Hönnunin leggur áherslu á sterka sjónræna framsetningu og öruggan tón, byggð í Framer til að leyfa sveigjanlegar uppfærslur og lipra daglega umsjón.',
    buttonText: 'blacksandhotel.is',
    buttonLink: 'blacksandhotel.is',
  },
  {
    _id: 'story-flokalundur-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'flokalundur' },
    order: 9,
    projectName: 'Flókalundur',
    description:
      'Flókalundur er staður fyrir þá sem þrá hina sönnu Ísland. Staðsettur djúpt í ósnortinni náttúru, þar sem hrá náttúran ræður ríkjum. Stígðu út og kannaðu endalaust landslag, andaðu að þér kyrrðinni og njóttu náttúrulegrar heitrar laugar rétt hjá hótelinu. ',
    buttonText: 'flokalundur.is',
    buttonLink: 'flokalundur.is',
  },
  {
    _id: 'story-hotel-eyja-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'hotel-eyja' },
    order: 10,
    projectName: 'Hotel Eyja',
    description:
      'Fágaður hótelvefur innblásinn af skandinavískri einfaldleika og áreynslulausum þægindum. Róleg, ritstjórnarleg hönnun sýnir stíl og upplifun hótelsins, byggð í Framer fyrir óaðfinnanlega efnisstjórnun.',
    buttonText: 'hoteleyja.is',
    buttonLink: 'hoteleyja.is',
  },
  {
    _id: 'story-hotel-muli-is',
    _type: 'story',
    language: 'is',
    slug: { current: 'hotel-muli' },
    order: 11,
    projectName: 'Hótel Múli',
    description:
      'Borgarlegur hótelvefur sem endurspeglar staðsetningu sína í Reykjavík og notalegan borgarkarakter. Hönnunin er í jafnvægi milli hagkvæmni og hlýju og er byggð í Framer til að gera uppfærslur hraðar og einfaldar.',
    buttonText: 'hotelmuli.is',
    buttonLink: 'hotelmuli.is',
  },
];

const storiesClosingCard = {
  _id: 'storiesClosingCard-default-is',
  _type: 'storiesClosingCard',
  language: 'is',
  heading: 'Breyttu vefsíðugestum í beinar bókanir',
  buttonText: 'Fá tilboð',
  buttonLink: '/contact-us',
  features: [
    { _key: 'user-ai', iconUrl: r2('images/home/stories/icon-user-ai.svg'), text: 'Aðgangur að sérfræðingum í hótelvefjum' },
    { _key: 'framer', iconUrl: r2('images/home/stories/icon-framer.svg'), text: 'Framer samstarfsaðilar' },
    { _key: 'calendar-add', iconUrl: r2('images/home/stories/icon-calendar-add.svg'), text: 'Áhersla á beinar bókanir' },
    { _key: 'brush', iconUrl: r2('images/home/stories/icon-brush.svg'), text: 'Framúrskarandi sérsniðið útlit og upplifun' },
    { _key: 'globe', iconUrl: r2('images/home/stories/icon-globe.svg'), text: 'Þjónusta í heimsklassa' },
  ],
};

const mutations = [
  ...faqs.map((doc) => ({ createOrReplace: doc })),
  ...testimonials.map((doc) => ({ createOrReplace: doc })),
  ...stories.map((doc) => ({ createOrReplace: doc })),
  { createOrReplace: storiesClosingCard },
];

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

console.log(`Seeded ${mutations.length} Icelandic documents (${faqs.length} faq, ${testimonials.length} testimonial, ${stories.length} story, 1 storiesClosingCard).`);
