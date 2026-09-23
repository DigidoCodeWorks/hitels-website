// One-off seed: Icelandic siblings for the first batch of blog posts —
// Phase 5 of the i18n rollout plan (the largest remaining piece: ~9,000+
// words across 17 posts, translated in batches). This batch: introducing-
// hitels, first-impressions-matter, why-hotels-are-choosing-hitels,
// maximizing-visibility.
//
// DRAFT TRANSLATION: machine-drafted by Claude, not reviewed by a native
// Icelandic speaker yet — same caveat as every other batch this rollout.
//
// Portable-text body blocks preserve the English document's exact
// structure (_key, style, listItem/level, markDefs, mark arrays per span)
// — only the `text` fields are translated. Link hrefs are unchanged.
// `relatedPosts` isn't set on these Icelandic docs yet: it should point at
// the Icelandic siblings of the same topics, and not every related post in
// this batch has its Icelandic sibling seeded yet (cross-batch references
// are wired up once all batches are seeded, in a follow-up pass).
//
// Existing English _ids stay untouched; new docs use "-is" suffixed ids,
// with the same slug.current as their English sibling. Uses
// createOrReplace, safe to re-run.
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch1.mjs

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN } = process.env;

for (const [name, value] of Object.entries({ PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET, SANITY_API_TOKEN })) {
  if (!value) {
    console.error(`Missing required env var: ${name} (load .env first, e.g. run with --env-file=.env)`);
    process.exit(1);
  }
}

const dataset = PUBLIC_SANITY_DATASET || 'production';
const r2 = (path) => `https://pub-cc3bba3bab304bebb22958edffa16e9c.r2.dev/${path}`;

function block(key, text, opts = {}) {
  return {
    _key: key,
    _type: 'block',
    style: opts.style ?? 'normal',
    markDefs: opts.markDefs ?? [],
    children: [{ _key: `${key}s`, _type: 'span', marks: opts.marks ?? [], text }],
    ...(opts.listItem ? { listItem: opts.listItem, level: opts.level ?? 1 } : {}),
  };
}

function multiSpanBlock(key, spans, opts = {}) {
  return {
    _key: key,
    _type: 'block',
    style: opts.style ?? 'normal',
    markDefs: opts.markDefs ?? [],
    children: spans,
    ...(opts.listItem ? { listItem: opts.listItem, level: opts.level ?? 1 } : {}),
  };
}

const introducingHitelsIs = {
  _id: 'post-introducing-hitels-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'introducing-hitels' },
  title: 'Segðu hæ við Hitels: Draumasamstarfsaðili hótelsins þíns fyrir jákvæðar breytingar!',
  category: 'Hitels',
  externalLink: '/is/discover',
  imageUrl: r2('cms/blog/introducing-hitels.png'),
  imageAlt: 'Segðu hæ við nýja hótelsamstarfsaðilann þinn',
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Hitels — Auktu beinar bókanir hótelsins þíns',
  metaDescription: 'Efldu stafræna nærveru hótelsins þíns og auktu beinar bókanir með sérsniðnum vefjum Hitels. Bestaðu umferð, fylgstu með árangri og auktu tekjur.',
  shortDescription: 'Gerðu þig tilbúinn til að umbylta hótelupplifuninni með Hitels! Uppgötvaðu hvernig við færum nýsköpun og gleði inn í íslenska hótelbransann sem draumasamstarfsaðili þinn fyrir jákvæðar breytingar.',
  body: [
    block('d89683561561', "Hæ! Velkomin/n í spennandi heim Hitels — þar sem nýsköpun mætir gestrisni, og hver dagur færir ný tækifæri til jákvæðra breytinga. Sem draumasamstarfsaðili hótelsins þíns erum við hér til að umbreyta því hvernig þú rekur fyrirtækið þitt, eina ánægjulega lausn í einu."),
  ],
};

const firstImpressionsIs = {
  _id: 'post-first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website' },
  title: 'Fyrstu kynni skipta máli: Hverju gestir búast við að sjá á hótelvefnum þínum',
  category: 'Hitels',
  imageUrl: r2('cms/blog/first-impressions-matter-what-visitors-expect-to-see-on-your-hotel-website.png'),
  publishedAt: '2024-11-08T00:00:00.000Z',
  metaTitle: 'Nauðsynlegir eiginleikar fyrir grípandi hótelvef | Hitels',
  metaDescription: 'Uppgötvaðu hvað gerir hótelvef eftirtektarverðan: glæsilegar myndir, auðvelda bókun, farsímabestun og öryggi — sem breytir gestum í bókaða gesti.',
  shortDescription: 'Hefur þú einhvern tímann heimsótt vefsíðu, sérstaklega þegar þú reyndir að gera bókun, og hugsað: „Vá, þessi síða er algjört rugl!"? Við höfum líka lent í því — þess vegna bjuggum við til Hitels!',
  body: [
    multiSpanBlock('775e587b3bc2', [
      { _key: 'c9fa32524fad', _type: 'span', marks: [], text: 'Við trúum því að vefurinn þinn ætti að vera meira en bara staður fyrir bókanir. Hann ætti að vera fyrstu jákvæðu kynni gesta þinna af hótelinu þínu. Til að ná því þarftu vandlega hannaðan vef sem sker sig úr. Hjá ' },
      { _key: '4f54220cda5a', _type: 'span', marks: ['strong'], text: 'Hitels' },
      { _key: 'fee280f2f325', _type: 'span', marks: [], text: ', leggjum við áherslu á lykilatriði sem laða að og virkja gesti þína, og hjálpa þeim að ákveða að dvelja á hótelinu þínu:' },
    ]),
    multiSpanBlock('da80a0a3d7ec', [
      { _key: 'fb982cd2c458', _type: 'span', marks: ['strong'], text: 'Glæsilegar myndir og myndbönd:' },
      { _key: '54dc39e71643', _type: 'span', marks: [], text: ' Hágæða myndefni sem varpar ljósi á herbergi, þægindi og einstaka eiginleika, og gefur gestum forsmekk af upplifuninni.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('3cf51735b996', [
      { _key: '4563b7b53055', _type: 'span', marks: ['strong'], text: 'Auðveldar tengiliðsupplýsingar:' },
      { _key: '3438dcf6b983', _type: 'span', marks: [], text: ' Gestir finna auðveldlega símanúmer, netfang eða netspjall á hverri síðu, sem gerir það einfalt að hafa samband.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('ea84e5d58ddc', [
      { _key: '9664f6feb304', _type: 'span', marks: ['strong'], text: 'Áberandi bókunarhnappur:' },
      { _key: '8713cce36ab0', _type: 'span', marks: [], text: ' Við tryggjum að bókunarhnappurinn sé áberandi á hverri síðu, svo gestir geti bókað dvöl sína fljótt og auðveldlega.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('178df1caff05', [
      { _key: '3660d751c0ab', _type: 'span', marks: ['strong'], text: 'Farsímabestun:' },
      { _key: 'ec53ccf5b34d', _type: 'span', marks: [], text: ' Vefirnir okkar eru fyllilega aðlagandi og bjóða upp á hraða, óaðfinnanlega upplifun á öllum tækjum — því enginn vill glíma við klunnalegan farsímavef!' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('c3e26062ab3f', [
      { _key: '1c1c4879d11b', _type: 'span', marks: ['strong'], text: 'Umsagnir gesta:' },
      { _key: 'a16431e2bd63', _type: 'span', marks: [], text: ' Umsagnir og meðmæli eru sýnileg til að byggja upp traust og gefa gestum öryggi til að bóka.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('af2ffa0266ac', [
      { _key: '889f54476912', _type: 'span', marks: ['strong'], text: 'Staðbundnar upplýsingar:' },
      { _key: '3015ce17f4af', _type: 'span', marks: [], text: ' Við bætum við leiðarvísum um nálæga áfangastaði og viðburði til að halda gestum áhugasömum og spenntum fyrir ferðinni.' },
    ], { listItem: 'bullet' }),
    block('932327544a90', '\nVið leggjum einnig áherslu á óaðfinnanlega notendaupplifun sem breytir vefsíðugestum í bókaða gesti:'),
    multiSpanBlock('2dbadbd81e10', [
      { _key: '18a3a2c28385s1', _type: 'span', marks: ['strong'], text: 'Hraður hleðslutími:' },
      { _key: '18a3a2c28385', _type: 'span', marks: [], text: ' Enginn vill bíða — vefirnir okkar eru bestaðir til að hlaðast hratt, sem kemur í veg fyrir að gestir leiti annað.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('a928fd19360e', [
      { _key: 'd65e0176dfa7', _type: 'span', marks: ['strong'], text: 'Einföld leiðarstýring:' },
      { _key: 'ee108691d9a5', _type: 'span', marks: [], text: ' Við hönnum leiðandi vefi sem gera gestum auðvelt að finna nákvæmlega það sem þeir þurfa án gremju.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('23b05e8f5496', [
      { _key: 'ff1baa1ca750', _type: 'span', marks: ['strong'], text: 'Örugg bókun:' },
      { _key: '85f3b3856a51', _type: 'span', marks: [], text: ' Með SSL-vernd geta gestir þínir bókað af öryggi, vitandi að upplýsingar þeirra eru öruggar.' },
    ], { listItem: 'bullet' }),
    block('12a3f81fd0c8', 'En ekki bara taka orð okkar fyrir því! Skoðaðu umsagnir frá samstarfsaðilum okkar, en margir þeirra hafa séð umtalsverða aukningu í beinum bókunum aðeins mánuðum eftir að nýi Hitels-vefurinn þeirra fór í loftið.'),
  ],
};

const whyHotelsChoosingIs = {
  _id: 'post-why-hotels-are-choosing-hitels-before-they-even-open-their-doors-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'why-hotels-are-choosing-hitels-before-they-even-open-their-doors' },
  title: 'Hvers vegna hótel velja Hitels áður en þau opna dyr sínar',
  category: 'Hitels',
  imageUrl: r2('cms/blog/why-hotels-are-choosing-hitels-before-they-even-open-their-doors.png'),
  publishedAt: '2025-06-12T00:00:00.000Z',
  metaTitle: 'Hvers vegna hótel velja Hitels áður en þau opna | Hitels',
  metaDescription: 'Frá Black Sand Hotel til Bryggjan Boutique velja hótel Hitels snemma í ferlinu — sérsniðið eða úr sýningarsafni, byggt til að vaxa og tilbúið fyrir bókanir.',
  shortDescription: 'Frá litlum hótelopnunum til vörumerkjaendurnýjunar treysta hótelrekendur á betri vefi — og betri vettvang.',
  body: [
    block('87b01bb14101', 'Hvað segir það þegar hótel velja vefkerfi sitt áður en þau hafa lokið við að byggja anddyrið?', { style: 'h2' }),
    block('b9dee7ace588', 'Fyrir sjálfstæð hótel er vefurinn ekki eftiráhugsun. Hann er eitt af fyrstu raunverulegu merkjunum sem þau senda til framtíðargesta. Þess vegna leita sífellt fleiri hótel — frá nútímalegum borgargistingum til sveitasetra — til Hitels snemma í ferlinu.'),
    block('c91f45ea10eb', 'Ekki bara til að líta vel út, heldur til að hefja starfsemi rétt.'),
    block('018de685d779', 'Skriðþungi fyrir markaðssetningu', { style: 'h3' }),
    block('b9c33f8fc09f', 'Hótel Múli, Black Sand Hotel og Konvin eru öll að byggja nýja sérsniðna vefi hjá Hitels. Þetta eru ekki eftiráuppfærslur eða endurhönnun — þau eru hluti af vörumerkinu frá fyrsta degi.'),
    block('ad83579980db', 'Hver vefur er sérsniðinn, aðlagandi og byggður á nútímalegu kerfi sem mun brátt tengjast eigin bókunarvél okkar. Fyrir þessi teymi snýst þetta ekki bara um að opna vef. Þetta snýst um að opna af öryggi.'),
    block('d4c8ead6cbda', 'Þegar stafræn nærvera er innbyggð í vörumerkjastefnuna snemma, styrkist allt annað — frá verðlagningu til tryggðar.'),
    block('3f194f9380f9', 'Sýningarvefir, hraðir og sveigjanlegir', { style: 'h3' }),
    block('bba3eb99677d', 'Samhliða þessum sérsniðnu smíðum hafa hótel eins og Bryggjan Boutique og Vintage Hotel opnað í gegnum Hitels sýningarsafnið. Þessi hönnunarkerfi eru ekki sniðmát. Þau eru fagmannlega hönnuð undirstaða sem gerir litlum hótelum kleift að komast hratt af stað án þess að tapa sérstöðu.'),
    block('10d8ea1fcd17', 'Hver vefur er einstakur í tón og útliti, en deilir sömu kostum: hraða, farsímavænleika og byggingu sem er hönnuð til að skila viðskiptum.'),
    block('874eb8166a9f', 'Byggt til vaxtar, ekki bara opnunar', { style: 'h3' }),
    block('8acaad1ae9fd', 'Sérhver vefur á Hitels vettvanginum er hannaður til að vaxa með hótelinu. Það þýðir að hann getur aðlagast árstíðabundnum herferðum, stutt ný tungumál eða þróast í sérsniðnari útgáfu síðar meir.'),
    block('ed6cdfc99247', 'Fyrir smærri teymi er þetta leið til að fara í loftið án þess að fórna gæðum. Fyrir vaxandi hótel er þetta kerfi sem stendur ekki í vegi fyrir.'),
    block('76b98d698e24', 'Hvað er næst', { style: 'h3' }),
    block('69ccc1b41cce', 'Bókunarvél Hitels er nú í þróun. Hún mun samþættast beint við hvern vef — engin viðbót eða endurbeining til þriðja aðila nauðsynleg. Það þýðir hraðari bókanir, fulla stjórn og engar þóknanir.'),
    block('73eef0c06fb3', 'Hótelin sem við vinnum með núna þurfa ekki að flytja síðar. Þau verða þegar tilbúin.'),
    block('11e24f3ba6a2', 'Traust snemma, byggt til að endast', { style: 'h3' }),
    block('36e079e63d49', 'Við erum stolt af því að svo mörg hótel velja Hitels áður en þau fá sína fyrstu bókun. Sum opna fljótlega. Önnur eru enn í byggingu. En þau hafa öll tekið skýra ákvörðun: vefurinn skiptir máli — og hann á að vera gerður rétt.'),
    block('85b39ab0c75f', 'Hitels veitir þeim hönnunina, verkfærin og öryggið til að fara í loftið af krafti og vaxa þaðan.'),
  ],
};

const maximizingVisibilityIs = {
  _id: 'post-maximizing-visibility-how-seo-drives-direct-bookings-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'maximizing-visibility-how-seo-drives-direct-bookings' },
  title: 'Hámarka sýnileika: Hvernig SEO eykur beinar bókanir',
  category: 'Hitels',
  imageUrl: r2('cms/blog/maximizing-visibility-how-seo-drives-direct-bookings.png'),
  publishedAt: '2024-11-22T00:00:00.000Z',
  metaTitle: 'Nauðsynlegir eiginleikar til að hámarka sýnileika | Hitels',
  metaDescription: 'Uppgötvaðu hvað gerir hótelvef eftirtektarverðan: glæsilegar myndir, auðvelda bókun, farsímabestun og öryggi — sem breytir gestum í bókaða gesti.',
  shortDescription: 'Lærðu hvernig árangursríkar SEO-aðferðir geta aukið sýnileika hótelsins þíns og fjölgað beinum bókunum.',
  body: [
    block('e1e56288eb74', 'SEO — hljómar eins og kunnugleg skammstöfun, ekki satt? Flest okkar hafa heyrt eitthvað um það; sum okkar vita aðeins meira, en fá vita hvernig á að nota það rétt til að auka sýnileika og stafræn fótspor.'),
    block('ec9eb5019e8d', 'Að vera SEO-sérfræðingur virðist vera í tísku þessa dagana. Sem hótelstjórar fáið þið eflaust tölvupósta reglulega frá svokölluðum SEO-sérfræðingum sem lofa ýmsu.'),
    block('556b07f519ad', 'En hvað er SEO í raun og veru? Í mjög einfölduðu máli, ímyndaðu þér internetið eins og risastórt bókasafn fullt af bókum. Ímyndaðu þér nú að þú sért að leita að ákveðinni bók — kannski um sögu Íslands. SEO, sem stendur fyrir Search Engine Optimization (leitarvélabestun), er eins og að láta bókina þína skera sig úr með því að gefa henni skæra kápu og setja hana fremst þar sem allir sjá hana. Þannig að þegar einhver vill finna bók um sögu Íslands, sér hann þína fyrst!'),
    block('83a0b46a6618', 'Í einföldu máli hjálpar SEO til við að gera vefsíðu auðfundna þegar fólk leitar að einhverju á internetinu — rétt eins og að gera bókina þína auðfundna á stóru bókasafni.'),
    multiSpanBlock('29fa99efb672', [
      { _key: '1c8dc383e4fcpre', _type: 'span', marks: [], text: 'Til að auka beinar bókanir er SEO nauðsynlegt verkfæri. Vefurinn okkar ' },
      { _key: '48db1254236c', _type: 'span', marks: ['strong'], text: 'hámarkar' },
      { _key: '25fb05e78bf7', _type: 'span', marks: [], text: ' mögulegt stafrænt fótspor þitt, kemur þér ofarlega í leitarniðurstöðum og eykur umferð á vefinn þinn.' },
    ]),
    block('34c688b52622', 'SEO skiptist í meginatriðum í þrjá meginhluta:', { style: 'h4' }),
    multiSpanBlock('38c40769ad18', [
      { _key: '1e974dedcbc6', _type: 'span', marks: ['strong'], text: 'SEO á síðu' },
      { _key: '332435d0d1c6', _type: 'span', marks: [], text: ': Að nota réttu orðin og titlana á vefnum þínum, eins og „hótel í [borg]", svo fólk finni þig auðveldlega.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('d651758f1a45', [
      { _key: 'fe63d71c83c5', _type: 'span', marks: ['strong'], text: 'Tæknilegt SEO' },
      { _key: 'd417fdbd1b7d', _type: 'span', marks: [], text: ': Að tryggja að vefurinn þinn hlaðist hratt, virki vel á farsímum og sé auðlesinn fyrir leitarvélar.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('b0d708de58a0', [
      { _key: 'c0bf12a4c373', _type: 'span', marks: ['strong'], text: 'Efnistengt SEO' },
      { _key: 'bd6da8506cbb', _type: 'span', marks: [], text: ': Að skrifa grípandi bloggfærslur og greinar til að hjálpa vefnum þínum að birtast ofar í leitarniðurstöðum.' },
    ], { listItem: 'bullet' }),
    block('742969d17872', 'Hvernig Hitels bestar nýja vefinn þinn:', { style: 'h4' }),
    multiSpanBlock('760f6ade45d5', [
      { _key: 'ee1aede3fa1a', _type: 'span', marks: ['strong'], text: 'Auðvelt fyrir leitarvélar' },
      { _key: 'e0eaa6404c43', _type: 'span', marks: [], text: ': Við hönnum uppbyggingu vefsins þannig að leitarvélar geti auðveldlega fundið og skilið allar síðurnar þínar, sem hjálpar þér að ná hærri röðun.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('fc16f5ddfa8d', [
      { _key: 'b803c5068386', _type: 'span', marks: ['strong'], text: 'Farsímamiðuð hönnun' },
      { _key: '235bc30c5a46', _type: 'span', marks: [], text: ': Þar sem leitarvélar hygla farsímavænum vefjum, byggjum við vefinn þinn þannig að hann líti vel út og virki frábærlega á símum og spjaldtölvum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('764af2bf78b4', [
      { _key: '56bf0c4a02c7', _type: 'span', marks: ['strong'], text: 'Hraður hleðslutími' },
      { _key: 'e460faba8dc1', _type: 'span', marks: [], text: ': Með verkfærum eins og Google Lighthouse bestum við vefinn þinn til að hlaðast hratt, sem bæði gestir og leitarvélar kunna að meta.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('58e8e0788ff8', [
      { _key: 'e53adf1bcfdf', _type: 'span', marks: ['strong'], text: 'Innbyggðir SEO-eiginleikar' },
      { _key: 'c0aba00c1081', _type: 'span', marks: [], text: ': Vefirnir okkar koma með gagnleg SEO-verkfæri eins og meta-tögg, bestaða titla og myndalýsingar til að bæta sýnileika þinn í leitarniðurstöðum.' },
    ], { listItem: 'bullet' }),
    block('694eed19dde9', 'Ef þú ert nú þegar með vef sem þér líkar og ert stolt(ur) af, en vilt samt auka stafrænt fótspor þitt og sýnileika, erum við hér til að hjálpa. Við erum leiðandi sérfræðingar í SEO og vinnum með fyrirtækjum af öllum stærðum til að efla stafræna ímynd þeirra.'),
    multiSpanBlock('a24e33bce5f7', [
      { _key: '37ebc0a36bf0', _type: 'span', marks: [], text: 'Hefur þú áhuga á að auka sýnileika hótelsins þíns með glæsilegum, sérsniðnum vef? ' },
      { _key: '5b253ae4937e', _type: 'span', marks: ['a7ceb1b6871a', 'strong'], text: 'Bóka kynningu' },
      { _key: '5c28a7802887', _type: 'span', marks: [], text: ' eða ' },
      { _key: '4d7b4b855745', _type: 'span', marks: ['100e4e195ff5', 'strong'], text: 'hafðu samband' },
      { _key: '416390cf626b', _type: 'span', marks: [], text: ' við Hitels til að sjá hvernig SEO-bestaðir vefir okkar geta hjálpað þér að laða að fleiri gesti.' },
    ], { markDefs: [
      { _key: 'a7ceb1b6871a', _type: 'link', href: 'https://ev81y1yi8yj.typeform.com/to/MPBXjKWq' },
      { _key: '100e4e195ff5', _type: 'link', href: '/contact-us' },
    ] }),
  ],
};

const mutations = [introducingHitelsIs, firstImpressionsIs, whyHotelsChoosingIs, maximizingVisibilityIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 1: introducing-hitels, first-impressions-matter, why-hotels-are-choosing-hitels, maximizing-visibility (is).');
