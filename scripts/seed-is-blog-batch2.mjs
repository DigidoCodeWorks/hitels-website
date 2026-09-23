// One-off seed: Icelandic siblings for blog batch 2 — Phase 5 of the i18n
// rollout plan. This batch: godo-hitels-partnership, how-a-great-hotel-
// website-builds-trust-before-check-in, how-to-build-a-successful-hotel-
// website. Same conventions as scripts/seed-is-blog-batch1.mjs (DRAFT
// TRANSLATION, structure-preserving portable text, unchanged hrefs,
// relatedPosts wired up in a later cross-batch pass).
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch2.mjs

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

const godoIs = {
  _id: 'post-godo-hitels-partnership-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'godo-hitels-partnership' },
  title: 'Hvernig samstarf Hitels og GODO eflir hótelrekstur og bókunarhagkvæmni',
  category: 'Hitels',
  imageUrl: r2('cms/blog/godo-hitels-partnership.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Efldu hótelrekstur með samstarfi Hitels og GODO',
  metaDescription: 'Uppgötvaðu kosti samstarfs Hitels og GODO: öflug bókunarvél og stjórnunarkerfi sem einfaldar rekstur og eykur ánægju.',
  shortDescription: 'Lærðu hvernig stefnumótandi samstarf Hitels og GODO umbreytir hótelrekstri og bókunarferlum, einfaldar starfsemi og bætir ánægju gesta hjá hótelum á Íslandi.',
  body: [
    block('9599f307f565', 'Ertu að leita að óaðfinnanlegri lausn til að stjórna rekstri og bókunum hótelsins þíns á skilvirkari hátt? Samstarf Hitels og GODO býður upp á heildstætt safn verkfæra sérsniðið að þörfum nútíma hótelbransans. Þetta samstarf miðar að því að samþætta öfluga bókunar- og eignastjórnunargetu GODO við notendavænar vefjalausnir Hitels, sem veitir öflugt safn eiginleika sem eflir rekstrarhagkvæmni og þjónustu við gesti.'),
    block('210add969ffc', 'Yfirlit yfir getu GODO', { style: 'h2' }),
    block('87629dc3c2f0', 'GODO er þekkt fyrir víðtækt úrval lausna sérsniðnar að ferðaþjónustunni, þar á meðal:'),
    multiSpanBlock('837f3e62ee4e', [
      { _key: '614b07d55d97', _type: 'span', marks: ['strong'], text: 'Eignastjórnunarkerfi (PMS):' },
      { _key: 'f62abd48aa90', _type: 'span', marks: [], text: ' Fremsta kerfi sem býður upp á rauntíma uppfærslur á þrifum, kraftmiklar hópbókanir og öfluga bókunarvél.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('517aa16bf69f', [
      { _key: 'a07656176f1c', _type: 'span', marks: ['strong'], text: 'Rásastjórnun (Channel Manager):' },
      { _key: 'ad1ea1c4ac81', _type: 'span', marks: [], text: ' Stjórnar efni, framboði og verðlagningu, og tryggir að hótel haldist samkeppnishæf og sýnileg á öllum OTA-rásum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('db32eb7ff7bb', [
      { _key: '735e20488849', _type: 'span', marks: ['strong'], text: 'Tekjustjórnun:' },
      { _key: '738598d4bff6', _type: 'span', marks: [], text: ' Hámarkar tekjur með snjöllum verðlagningaraðferðum og greiningu á markaðsgögnum í rauntíma.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('14bb24eb6ab2', [
      { _key: '668887f82805', _type: 'span', marks: ['strong'], text: 'Greiðslu- og öryggislausnir:' },
      { _key: 'b179a389bbf4', _type: 'span', marks: [], text: ' Örugg, sveigjanleg greiðslukerfi sem samþættast óaðfinnanlega við bókunarferlið, og tryggja þægindi og öryggi fyrir bæði gesti og rekstraraðila.' },
    ], { listItem: 'bullet' }),
    block('57181acad40d', 'Kostir þess að samþætta Hitels við GODO', { style: 'h2' }),
    block('02b4ec9fe5d2', 'Samþætting Hitels við kerfi GODO veitir hótelstjórum fjölda kosta:'),
    multiSpanBlock('afe595d290c7', [
      { _key: 'e20d1fe51526', _type: 'span', marks: ['strong'], text: 'Einfaldað bókunarferli:' },
      { _key: 'c18a9967c02a', _type: 'span', marks: [], text: ' Samstarfið nýtir sjálfvirku bókunarvél GODO, sem einfaldar bókunarferlið og bætir upplifun viðskiptavina með því að bjóða upp á beinar bókanir í rauntíma í gegnum hótelvef sem Hitels knýr.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('ee9203563c3c', [
      { _key: '7b72dc54223c', _type: 'span', marks: ['strong'], text: 'Aukin ánægja gesta:' },
      { _key: '12858fd41e0a', _type: 'span', marks: [], text: ' Með því að sameina sérsniðna vefhönnun Hitels og skilvirkt bókunarkerfi GODO geta hótel boðið upp á óaðfinnanlegt viðmót sem eykur notagildi og ánægju. Sjálfvirkir tölvupóstar og persónusniðin bókunarupplifun eru nú auðveldari í stjórnun, sem stuðlar að betri tengslum við gesti.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('b8b07ffc5984', [
      { _key: 'f4686ef6d1c2', _type: 'span', marks: ['strong'], text: 'Bætt tekjustjórnun:' },
      { _key: 'cb1556e65983', _type: 'span', marks: [], text: ' Með Primo-kerfi GODO geta hótel bestað verðlagningu byggða á víðtækri markaðsgreiningu. Vettvangur Hitels gerir kleift að samþætta þessa innsýn beint inn í bókunarupplifunina, sem tryggir að hugsanlegum gestum sé ávallt boðið upp á samkeppnishæf og aðlaðandi verð.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('a2bcb2badf4c', [
      { _key: 'e313d1760d60', _type: 'span', marks: ['strong'], text: 'Öflugt gagnaöryggi og greiðslulausnir:' },
      { _key: '933e4de8a678', _type: 'span', marks: [], text: ' Samþættingin felur í sér háþróaðar öryggisráðstafanir fyrir viðskipti á netinu, sem verndar gögn bæði hótelsins og gesta. Greiðslukerfi GODO eru hönnuð til að höndla flóknar færslur, þar á meðal hópbókanir og fjölgjaldmiðlagreiðslur, með einföldum hætti.' },
    ], { listItem: 'bullet' }),
    block('355f37ac1e11', '\n'),
    block('e45daf52b0a1', 'Innleiðing Hitels-GODO lausnarinnar', { style: 'h2' }),
    block('97007c46acc3', 'Innleiðing þessarar samþættu lausnar felur í sér nokkur einföld skref:'),
    multiSpanBlock('abc501c4d142', [
      { _key: '486e28cf75a4', _type: 'span', marks: ['strong'], text: 'Uppsetning og sérsníðing:' },
      { _key: 'e7055a77f929', _type: 'span', marks: [], text: ' Hótel geta valið úr ýmsum sniðmátum og sérsníðingarmöguleikum frá Hitels, sérsniðnum að vörumerki þeirra og markhópi gesta.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('a2c1e8230e1f', [
      { _key: '1d7ee0793b65', _type: 'span', marks: ['strong'], text: 'Þjálfun og stuðningur:' },
      { _key: '7908a779b7d3', _type: 'span', marks: [], text: ' Bæði Hitels og GODO bjóða upp á ítarlega þjálfun og stuðning, sem tryggir að starfsfólk hótelsins sé vel í stakk búið til að nýta nýju kerfin á skilvirkan hátt.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('c44284c71da9', [
      { _key: '63b2bbdbf90e', _type: 'span', marks: ['strong'], text: 'Stöðug bestun:' },
      { _key: 'b06fcda67f25', _type: 'span', marks: [], text: ' Áframhaldandi greiningar og skýrslugjöf frá GODO gera hótelum kleift að fínstilla rekstur sinn og markaðsaðferðir stöðugt, með því að nýta gagnadrifna innsýn til að bæta árangur og ánægju gesta.' },
    ], { listItem: 'bullet' }),
    block('37df4fb57ff4', 'Niðurstaða', { style: 'h2' }),
    block('49568672d6e9', 'Samstarf Hitels og GODO er að gjörbylta hótelrekstri á Íslandi, og gerir það einfaldara og skilvirkara að höndla bókanir, stjórna eignum og bæta upplifun gesta. Með því að samþætta þessi öflugu verkfæri geta hótelstjórar ekki aðeins einfaldað reksturinn heldur einnig hækkað þjónustustig sitt, og tryggt að eignir þeirra skeri sig úr á samkeppnismarkaði.'),
    block('beb3bb8f5e2a', 'Tilbúin(n) að umbreyta rekstri hótelsins þíns?', { style: 'h2' }),
    block('2058a34d2cec', 'Kannaðu hvernig sameinaðir styrkleikar Hitels og GODO geta fært nýja skilvirkni í hótelrekstur þinn. Hafðu samband til að fræðast meira eða bóka kynningu á þessari samþættu lausn.'),
  ],
};

const trustIs = {
  _id: 'post-how-a-great-hotel-website-builds-trust-before-check-in-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'how-a-great-hotel-website-builds-trust-before-check-in' },
  title: 'Hvernig frábær hótelvefur byggir upp traust fyrir innritun',
  category: 'Hitels',
  imageUrl: r2('cms/blog/how-a-great-hotel-website-builds-trust-before-check-in.png'),
  publishedAt: '2025-01-12T00:00:00.000Z',
  metaTitle: 'Byggðu upp traust fyrir innritun | Ráð um hótelvefi frá Hitels',
  metaDescription: 'Hótelvefurinn þinn er fyrsta skrefið í átt að trausti og beinum bókunum. Lærðu hvernig skýrleiki, hönnun og gagnsæi láta gesti finna öryggi við að bóka hjá þér.',
  shortDescription: 'Vefurinn þinn er meira en bókunartæki — hann er fyrsta handabandið þitt við hvern gest.',
  body: [
    block('e55f25211b93', 'Fyrstu kynni eru ekki bara sjónræn — þau eru tilfinningaleg', { style: 'h3' }),
    multiSpanBlock('ab37cb1f44e5', [
      { _key: 'd6c5e01036c2', _type: 'span', marks: [], text: 'Þegar hugsanlegur gestur lendir á hótelvefnum þínum er hann að gera meira en að athuga framboð. Hann er að spyrja: ' },
      { _key: 'daf60dea714f', _type: 'span', marks: ['em'], text: 'Er þessi staður fyrir mig? Get ég treyst honum?' },
      { _key: '766a568d289e', _type: 'span', marks: [], text: ' Löngu áður en hann smellir á „bóka núna", mótast ákvörðun hans af því hvernig vefurinn lætur honum líða.' },
    ]),
    block('cb157bb51375', 'Þessi tilfinning kemur frá smáatriðum sem ná langt út fyrir fallegar myndir. Þetta snýst um skýrleika. Tón. Uppbyggingu. Hraða. Öryggi. Í stuttu máli: traust.'),
    block('fac9b1a06093', 'Hvers vegna traust skiptir meira máli en nokkru sinni fyrr', { style: 'h3' }),
    block('9542b94a1456', 'Í umhverfi fullu af bókunarsíðum, Airbnb-auglýsingum og AI-kynslóðuðum ferðaráðum þarf hótelið þitt að skera sig úr sem bæði ekta og trúverðugt. Ef gestir hika — ef þeir eru ekki vissir um hvort bein bókun sé örugg, auðveld eða þess virði — fara þeir.'),
    block('5eeff69bfc45', 'Á hinn bóginn, þegar vefurinn þinn gefur strax til kynna fagmennsku, öryggi og umhyggju, verður hann öflugt sölutæki. Og traust er það sem breytir forvitni í viðskipti.'),
    block('ef8eceadf513', 'Traust byrjar með skýrleika', { style: 'h3' }),
    block('e219059838c5', 'Traustverðugir vefir yfirþyrma ekki. Þeir miðla skýrt. Það þýðir:'),
    block('28b43039778e', 'Fyrirsagnir sem segja hvað þú býður upp á, án útúrdúra.', { listItem: 'bullet' }),
    block('71d657ab6833', 'Hreinar valmyndir sem gera auðvelt að skoða.', { listItem: 'bullet' }),
    block('282dee5dee16', 'Tengiliðaupplýsingar og stuðningstenglar sýnilegir á öllum tímum.', { listItem: 'bullet' }),
    block('095882cbdb8d', 'Gestir vilja ekki giska. Þeir vilja svífa áfram. Skýrir vefir gefa öryggistilfinningu. Og öruggir vefir fá bókanir.'),
    block('13ba490eb648', 'Sýndu þeim að þú ert raunveruleg(ur)', { style: 'h3' }),
    block('160fa485824a', 'Alvöru fólk, alvöru rými. Gestir vilja vita hvað liggur á bak við vörumerkið — og almennar birgðamyndir duga ekki til. Notaðu ekta myndir sem endurspegla eignina þína eins og hún er í dag. Hafðu með:'),
    block('7f3f7aee2f38', 'Raunveruleg herbergi og þægindi, vel lýst og fagmannlega mynduð.', { listItem: 'bullet' }),
    block('5cc9ce0e5f5f', 'Myndir af starfsfólki þínu og gestrisnisatriðum.', { listItem: 'bullet' }),
    block('cbee1a95266a', 'Valfrjálst: stutt „um okkur"-hluti með sögu þinni.', { listItem: 'bullet' }),
    block('e11799baa71c', 'Traust vex þegar þeir geta ímyndað sér sjálfa sig þar — og ímyndað sér að vera hugsað um.'),
    block('719291201589', 'Hönnun skiptir máli (en ekki á þann hátt sem þú heldur)', { style: 'h3' }),
    block('85db1f7803a0', 'Traustverðugur vefur er ekki sá glæsilegasti. Hann er sá samkvæmasti. Það þýðir:'),
    block('315fcaff5bff', 'Leturgerðir og litir sem samræmast tón hótelsins þíns.', { listItem: 'bullet' }),
    block('d18f527f2596', 'Útlit sem virkar á öllum tækjum (sérstaklega farsímum).', { listItem: 'bullet' }),
    block('1a4d780343c9', 'Að forðast brotna tengla, úrelt efni eða sóðalega framsetningu.', { listItem: 'bullet' }),
    block('1de30867834b', 'Hjá Hitels er hver vefur byggður til að líta fágaður út, virka snurðulaust og haldast hraðvirkur — svo þú tapir aldrei trausti vegna lélegra stafrænna kynna.'),
    block('0edb8553b661', 'Vertu hreinskilin(n) og gagnsæ(r)', { style: 'h3' }),
    block('130a69e8b35c', 'Gestir kunna að meta hótel sem fara ekki í kringum hlutina. Sýndu skýra verðlagningu. Skráðu stefnur. Gerðu bókunar- og afbókunarskilmála sýnilega fyrir greiðslu. Því gagnsærri sem vefurinn þinn er, því líklegri eru gestir til að ljúka bókun sinni — án þess að þurfa að hringja eða skipta yfir í Booking.com.'),
    block('99284568ad48', 'Öruggt greiðsluferli = hugarró', { style: 'h3' }),
    block('f74eeac10a24', 'Jafnvel þótt hönnunin þín sé fullkomin getur óstöðug greiðsluupplifun eyðilagt traust samstundis. Þess vegna er sérhver bókunarvél frá Hitels fullkomlega örugg, PCI-samhæfð og samþætt við traustar greiðsluveitur eins og Teya. Staðfestingartölvupóstar, dagatalstenglar og samskipti við gesti fylgja sjálfkrafa með.'),
    block('9b335f52e5d5', 'Félagslegar sannanir eru ekki valfrjálsar', { style: 'h3' }),
    block('7f1ddc5a9cad', 'Hafðu með umsagnir gesta. Tengdu í nýlegar einkunnir. Jafnvel örfáar vel valdar tilvitnanir eða meðmæli á heimasíðunni þinni geta aukið bókanir. Að sjá að aðrir hafi átt frábæra upplifun dregur úr óvissu — og styrkir traustið sem þú hefur unnið þér inn.'),
    block('b626b3b3b895', 'Byggðu upp traust. Byggðu svo upp tryggð.', { style: 'h3' }),
    block('30add4ed6d5a', 'Hjá Hitels trúum við því að traust sé ekki eiginleiki. Það er undirstaða. Þess vegna er hver hótelvefur sem við skilum — hvort sem hann er úr sýningarsafninu okkar eða fullkomlega sérsniðinn — hannaður til að miðla trausti frá fyrsta smelli.'),
    block('29d3484a3fb5', 'Þegar gestir finna fyrir öryggi, upplýsingum og velkomnum tilfinningum, bóka þeir ekki bara. Þeir koma aftur.'),
  ],
};

const buildSuccessfulIs = {
  _id: 'post-how-to-build-a-successful-hotel-website-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'how-to-build-a-successful-hotel-website' },
  title: 'Hvernig á að byggja árangursríkan vef fyrir hótelið þitt með Hitels?',
  category: 'Hitels',
  imageUrl: r2('cms/blog/how-to-build-a-successful-hotel-website.png'),
  publishedAt: '2024-05-16T00:00:00.000Z',
  metaTitle: 'Árangursrík gerð hótelvefja: Ráð og kostir | Hitels',
  metaDescription: 'Náðu tökum á listinni að byggja árangursríkan hótelvef með hagnýtum ráðum og lærðu hvernig Hitels styður stafrænan árangur hótelsins þíns.',
  shortDescription: 'Lærðu lykilaðferðirnar við að búa til hótelvef sem laðar að gesti og eykur bókanir. Uppgötvaðu hvernig Hitels getur verið lykilverkfæri í vefþróun og markaðsstarfi þínu.',
  body: [
    block('77728331378a', "Ertu að stefna að því að efla stafræna nærveru hótelsins þíns og auka bókanir? Vel gerður vefur er hornsteinn stafrænnar markaðsstefnu hótelsins þíns. Þessi leiðarvísir veitir þér nauðsynleg skref til að búa til grípandi hótelvef og útskýrir hvers vegna Hitels gæti verið fullkominn samstarfsaðili í því verkefni."),
    block('1803d8738740', 'Að skilja markhópinn þinn og markaðinn', { style: 'h2' }),
    block('d97635291e56', 'Byrjaðu á því að skilgreina hverjir gestir þínir eru og hvað þeir meta mest. Eru þeir viðskiptaferðamenn, pör í leit að rómantískri dvöl, fjölskyldur eða kannski vistvænir ferðamenn? Að skilja markhópinn þinn mun leiðbeina hönnun og virkni vefsins svo hann mæti betur væntingum þeirra og þörfum.'),
    block('2c1ed9a38851', 'Hönnun fyrir notendaupplifun', { style: 'h2' }),
    block('07a1e4418628', 'Árangursríkur hótelvefur sameinar fagurfræði og virkni. Hér eru nokkur lykilatriði í hönnun sem vert er að hafa í huga:'),
    multiSpanBlock('cacc98ef073b', [
      { _key: '93a075084f6f', _type: 'span', marks: ['strong'], text: 'Aðlagandi hönnun:' },
      { _key: 'aee8bfd42674', _type: 'span', marks: [], text: ' Tryggðu að vefurinn þinn líti vel út og virki snurðulaust á öllum tækjum, sérstaklega símum og spjaldtölvum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('6efec20926e9', [
      { _key: '846867ac870e', _type: 'span', marks: ['strong'], text: 'Auðveld leiðarstýring:' },
      { _key: 'd9b5e5962902', _type: 'span', marks: [], text: ' Einfaldaðu leiðarstýringuna til að bæta notendaupplifun og draga úr brottfalli. Gestir ættu að finna það sem þeir þurfa á aðeins nokkrum smellum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('2218af329bd7', [
      { _key: '3126045c1471', _type: 'span', marks: ['strong'], text: 'Hágæða myndir:' },
      { _key: '04edafc0851a', _type: 'span', marks: [], text: ' Notaðu fagmannlegar ljósmyndir til að sýna þægindi, herbergi og þjónustu hótelsins þíns.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('8bd06c2df911', [
      { _key: '33d6916d6c3e', _type: 'span', marks: ['strong'], text: 'Samþætting bókunarkerfis:' },
      { _key: '02bb08659eca', _type: 'span', marks: [], text: ' Innleiddu einfalt og öruggt bókunarkerfi sem gerir gestum kleift að bóka dvöl sína auðveldlega.' },
    ], { listItem: 'bullet' }),
    block('d1b3bbcf40d9', 'Bestun efnis fyrir SEO', { style: 'h2' }),
    block('f3f1e7325eca', 'Leitarvélabestun (SEO) er nauðsynleg til að gera hótelið þitt sýnilegt í leitarvélum eins og Google. Notaðu leitarorð á náttúrulegan hátt í efninu þínu, bestaðu meta-tögg og búðu til gæðaefni sem svarar spurningum hugsanlegra gesta. Reglulegar uppfærslur og bloggfærslur geta einnig bætt SEO-vinnu þína með því að halda efninu fersku og grípandi.'),
    block('c303b666e1ad', 'Að nýta félagslegar sannanir', { style: 'h2' }),
    block('b93ba8d03cfb', 'Meðmæli, umsagnir og einkunnir frá fyrri gestum byggja upp traust og hafa áhrif á bókunarákvarðanir. Að sýna þessi atriði áberandi á vefnum þínum getur aukið trúverðugleika þinn til muna.'),
    block('c1baa2f40c60', 'Hvers vegna Hitels gæti hentað þér', { style: 'h2' }),
    block('0024ccabdc2f', 'Þegar velja á vettvang til að byggja og stjórna vef hótelsins þíns sker Hitels sig úr af nokkrum ástæðum:'),
    multiSpanBlock('c48b28a5dcc2', [
      { _key: 'ad734fc8795d', _type: 'span', marks: ['strong'], text: 'Sérsniðið fyrir hótel:' },
      { _key: '358d8ac5b6ce', _type: 'span', marks: [], text: ' Ólíkt almennum vefsíðusmiðum er Hitels sérstaklega hannað fyrir hótelbransann og býður upp á eiginleika sem mæta beint þörfum hótelrekenda.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('3dab46bfd9d8', [
      { _key: '495a7c9d489b', _type: 'span', marks: ['strong'], text: 'Samþætt bókunarkerfi:' },
      { _key: '3ba4449d699a', _type: 'span', marks: [], text: ' Hitels kemur með samþætt bókunarkerfi sem hvetur til beinna bókana í gegnum vefinn þinn, dregur úr háð þriðja aðila vettvöngum og lækkar þóknanakostnað.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('2972a56efea1', [
      { _key: 'cf22775ef46e', _type: 'span', marks: ['strong'], text: 'Sérsniðanleg sniðmát:' },
      { _key: '1647707784b1', _type: 'span', marks: [], text: ' Hitels býður upp á úrval sniðmáta sem eru ekki aðeins sjónrænt aðlaðandi heldur einnig bestuð fyrir viðskipti og notendaupplifun.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('50c757d8953a', [
      { _key: 'ff42402ab108', _type: 'span', marks: ['strong'], text: 'Stafræn markaðsverkfæri:' },
      { _key: 'c1b49d35aef4', _type: 'span', marks: [], text: ' Frá SEO-bestun til samþættingar samfélagsmiðla veitir Hitels verkfæri sem hjálpa þér að kynna vefinn þinn á skilvirkan hátt.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('8661cba051f1', [
      { _key: '52d8e61f3be3', _type: 'span', marks: ['strong'], text: 'Stuðningur og innsýn:' },
      { _key: 'e58945c06c81', _type: 'span', marks: [], text: ' Fáðu aðgang að þjónustuveri og greiningum sem hjálpa þér að skilja hegðun gesta og fínstilla markaðsaðferðir þínar.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('4d70baaa0026', [
      { _key: '2734ca7d3fc8', _type: 'span', marks: ['strong'], text: 'Framtíðarvænt:' },
      { _key: '934fc207b0fe', _type: 'span', marks: [], text: ' Með áframhaldandi uppfærslum og nýjum eiginleikum sem bætast reglulega við tryggir Hitels að vefurinn þinn haldist á undan tækniþróun og markaðskröfum.' },
    ], { listItem: 'bullet' }),
    block('17802538da06', 'Niðurstaða', { style: 'h2' }),
    block('603387b11734', 'Að byggja árangursríkan hótelvef felur í sér að skilja markaðinn þinn, hanna fyrir notendaupplifun, besta fyrir SEO og nota réttu verkfærin. Hitels býður upp á sérhæfða, heildstæða lausn fyrir hótelrekendur sem vilja efla stafræna nærveru sína og auka beinar bókanir. Með því að velja Hitels ertu að fjárfesta í vettvangi sem vex með fyrirtækinu þínu og aðlagast breytilegu stafrænu umhverfi.'),
    block('a99527037859', '\n'),
    block('09aecd13cca7', 'Tilbúin(n) að taka stafræna nærveru hótelsins þíns á næsta stig?', { style: 'h2' }),
    block('09486d0b9102', 'Kannaðu hvernig Hitels getur umbreytt vefnum þínum í öfluga bókunarvél. Hafðu samband við okkur í dag til að fá frekari upplýsingar eða bóka kynningu.'),
    block('ea8f211572ba', '\n'),
    block('62671d8bb37b', '\n', { style: 'h1' }),
    block('6e70f2c7eeff', '\n'),
    block('ee5e2a7fe8b0', '\n', { style: 'h1' }),
    block('38510372e08a', '\n'),
  ],
};

const mutations = [godoIs, trustIs, buildSuccessfulIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 2: godo-hitels-partnership, how-a-great-hotel-website-builds-trust, how-to-build-a-successful-hotel-website (is).');
