// One-off seed: Icelandic siblings for blog batch 4 — Phase 5 of the i18n
// rollout plan. This batch: improve-loyalty, increase-hotel-revenue,
// showcasing-hitels-websites. Same conventions as
// scripts/seed-is-blog-batch1.mjs.
//
// Note: improve-loyalty's English body is a verbatim content duplicate of
// how-to-build-a-successful-hotel-website's body (same text, different
// _key values, different title/meta) — a pre-existing data quality
// artifact, not something introduced here. Its Icelandic translation below
// reuses the same wording (translating identical source text identically)
// but with this document's own block/span _key values.
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch4.mjs

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

const improveLoyaltyIs = {
  _id: 'post-improve-loyalty-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'improve-loyalty' },
  title: 'Hvernig hótel geta bætt tryggð og ánægju viðskiptavina',
  category: 'Hitels',
  imageUrl: r2('cms/blog/improve-loyalty.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Efldu tryggð og ánægju viðskiptavina á hótelum',
  metaDescription: 'Kannaðu árangursríkar leiðir til að auka tryggð og ánægju viðskiptavina, og byggja upp varanleg tengsl og eftirminnilega upplifun gesta.',
  shortDescription: 'Uppgötvaðu aðferðir til að efla tryggð og ánægju viðskiptavina á hótelinu þínu. Lærðu hvernig á að skapa eftirminnilega upplifun sem fær gesti til að koma aftur og mæla með eigninni þinni.',
  body: [
    block('96cf80bd0a6b', "Ertu að stefna að því að efla stafræna nærveru hótelsins þíns og auka bókanir? Vel gerður vefur er hornsteinn stafrænnar markaðsstefnu hótelsins þíns. Þessi leiðarvísir veitir þér nauðsynleg skref til að búa til grípandi hótelvef og útskýrir hvers vegna Hitels gæti verið fullkominn samstarfsaðili í því verkefni."),
    block('0e27115cb53a', 'Að skilja markhópinn þinn og markaðinn', { style: 'h2' }),
    block('e99b1aacbf2f', 'Byrjaðu á því að skilgreina hverjir gestir þínir eru og hvað þeir meta mest. Eru þeir viðskiptaferðamenn, pör í leit að rómantískri dvöl, fjölskyldur eða kannski vistvænir ferðamenn? Að skilja markhópinn þinn mun leiðbeina hönnun og virkni vefsins svo hann mæti betur væntingum þeirra og þörfum.'),
    block('2099239a7546', 'Hönnun fyrir notendaupplifun', { style: 'h2' }),
    block('8cba6fdb879f', 'Árangursríkur hótelvefur sameinar fagurfræði og virkni. Hér eru nokkur lykilatriði í hönnun sem vert er að hafa í huga:'),
    multiSpanBlock('6245352740ed', [
      { _key: '3044c08a4eff', _type: 'span', marks: ['strong'], text: 'Aðlagandi hönnun:' },
      { _key: 'a6b781d1b730', _type: 'span', marks: [], text: ' Tryggðu að vefurinn þinn líti vel út og virki snurðulaust á öllum tækjum, sérstaklega símum og spjaldtölvum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('bc9963118dff', [
      { _key: '5545f35ab6a1', _type: 'span', marks: ['strong'], text: 'Auðveld leiðarstýring:' },
      { _key: '6a2544a46c48', _type: 'span', marks: [], text: ' Einfaldaðu leiðarstýringuna til að bæta notendaupplifun og draga úr brottfalli. Gestir ættu að finna það sem þeir þurfa á aðeins nokkrum smellum.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('78cc166efb6d', [
      { _key: 'b546fedaee03', _type: 'span', marks: ['strong'], text: 'Hágæða myndir:' },
      { _key: '65686c1d7c4f', _type: 'span', marks: [], text: ' Notaðu fagmannlegar ljósmyndir til að sýna þægindi, herbergi og þjónustu hótelsins þíns.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('5ea90df150d4', [
      { _key: 'a7211219648b', _type: 'span', marks: ['strong'], text: 'Samþætting bókunarkerfis:' },
      { _key: '9ca8a9230a41', _type: 'span', marks: [], text: ' Innleiddu einfalt og öruggt bókunarkerfi sem gerir gestum kleift að bóka dvöl sína auðveldlega.' },
    ], { listItem: 'bullet' }),
    block('76350ef810be', 'Bestun efnis fyrir SEO', { style: 'h2' }),
    block('d4db3fb09716', 'Leitarvélabestun (SEO) er nauðsynleg til að gera hótelið þitt sýnilegt í leitarvélum eins og Google. Notaðu leitarorð á náttúrulegan hátt í efninu þínu, bestaðu meta-tögg og búðu til gæðaefni sem svarar spurningum hugsanlegra gesta. Reglulegar uppfærslur og bloggfærslur geta einnig bætt SEO-vinnu þína með því að halda efninu fersku og grípandi.'),
    block('746d16582eac', 'Að nýta félagslegar sannanir', { style: 'h2' }),
    block('e96375e10c84', 'Meðmæli, umsagnir og einkunnir frá fyrri gestum byggja upp traust og hafa áhrif á bókunarákvarðanir. Að sýna þessi atriði áberandi á vefnum þínum getur aukið trúverðugleika þinn til muna.'),
    block('bb96c9951977', 'Hvers vegna Hitels gæti hentað þér', { style: 'h2' }),
    block('6bf97eb31fae', 'Þegar velja á vettvang til að byggja og stjórna vef hótelsins þíns sker Hitels sig úr af nokkrum ástæðum:'),
    multiSpanBlock('ce45743c655c', [
      { _key: '43b7f2773dbe', _type: 'span', marks: ['strong'], text: 'Sérsniðið fyrir hótel:' },
      { _key: '652cd39a1f46', _type: 'span', marks: [], text: ' Ólíkt almennum vefsíðusmiðum er Hitels sérstaklega hannað fyrir hótelbransann og býður upp á eiginleika sem mæta beint þörfum hótelrekenda.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('8c8648f467a0', [
      { _key: 'da2681c08c6f', _type: 'span', marks: ['strong'], text: 'Samþætt bókunarkerfi:' },
      { _key: 'ea1d5fcc9c2c', _type: 'span', marks: [], text: ' Hitels kemur með samþætt bókunarkerfi sem hvetur til beinna bókana í gegnum vefinn þinn, dregur úr háð þriðja aðila vettvöngum og lækkar þóknanakostnað.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('7ed7a1b423c7', [
      { _key: '94340ae85962', _type: 'span', marks: ['strong'], text: 'Sérsniðanleg sniðmát:' },
      { _key: 'd20c10cb19a4', _type: 'span', marks: [], text: ' Hitels býður upp á úrval sniðmáta sem eru ekki aðeins sjónrænt aðlaðandi heldur einnig bestuð fyrir viðskipti og notendaupplifun.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('2f46b10e0efe', [
      { _key: '7d550eabc65c', _type: 'span', marks: ['strong'], text: 'Stafræn markaðsverkfæri:' },
      { _key: '003c84ee6a1e', _type: 'span', marks: [], text: ' Frá SEO-bestun til samþættingar samfélagsmiðla veitir Hitels verkfæri sem hjálpa þér að kynna vefinn þinn á skilvirkan hátt.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('07dee033ac6e', [
      { _key: 'c23d01bdf64b', _type: 'span', marks: ['strong'], text: 'Stuðningur og innsýn:' },
      { _key: '39c9ee4b4435', _type: 'span', marks: [], text: ' Fáðu aðgang að þjónustuveri og greiningum sem hjálpa þér að skilja hegðun gesta og fínstilla markaðsaðferðir þínar.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('45bc04befcad', [
      { _key: '8b3468cd8414', _type: 'span', marks: ['strong'], text: 'Framtíðarvænt:' },
      { _key: '027b71f8256b', _type: 'span', marks: [], text: ' Með áframhaldandi uppfærslum og nýjum eiginleikum sem bætast reglulega við tryggir Hitels að vefurinn þinn haldist á undan tækniþróun og markaðskröfum.' },
    ], { listItem: 'bullet' }),
    block('8dbe3a7a3ac4', 'Niðurstaða', { style: 'h2' }),
    block('9f50eaeb7ebe', 'Að byggja árangursríkan hótelvef felur í sér að skilja markaðinn þinn, hanna fyrir notendaupplifun, besta fyrir SEO og nota réttu verkfærin. Hitels býður upp á sérhæfða, heildstæða lausn fyrir hótelrekendur sem vilja efla stafræna nærveru sína og auka beinar bókanir. Með því að velja Hitels ertu að fjárfesta í vettvangi sem vex með fyrirtækinu þínu og aðlagast breytilegu stafrænu umhverfi.'),
    block('bd1ab5f66324', 'Tilbúin(n) að taka stafræna nærveru hótelsins þíns á næsta stig?', { style: 'h2' }),
    block('b750f60c45d5', 'Kannaðu hvernig Hitels getur umbreytt vefnum þínum í öfluga bókunarvél. Hafðu samband við okkur í dag til að fá frekari upplýsingar eða bóka kynningu.'),
  ],
};

const increaseRevenueIs = {
  _id: 'post-increase-hotel-revenue-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'increase-hotel-revenue' },
  title: 'Hvernig á að auka tekjur hótelsins: Stefnumótandi innsýn fyrir íslensk hótel',
  category: 'Hitels',
  imageUrl: r2('cms/blog/increase-hotel-revenue.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Auktu hóteltekjur á Íslandi: Bestu aðferðirnar til árangurs',
  metaDescription: 'Opnaðu tekjuvöxt hótela með bestaðri verðlagningu, skilvirkri markaðssetningu, fjölbreyttum tekjustraumum og tækni fyrir íslensk hótel.',
  shortDescription: 'Kannaðu sannreyndar aðferðir til að auka tekjur hótelsins þíns á Íslandi, með áherslu á að besta verðlagningu, efla markaðsstarf, fjölbreyta tekjustraumum og nýta tækni.',
  body: [
    block('c16648d81450', 'Ert þú hóteleigandi á Íslandi sem leitast við að auka tekjur og hámarka hagnað? Í samkeppnishæfum bransa þar sem hvert smáatriði skiptir máli er nauðsynlegt að skilja og innleiða árangursríkar tekjustjórnunaraðferðir. Þessi grein kannar ýmsar aðferðir til að efla tekjur hótelsins þíns, með áherslu á nýstárlegar verðlagningaraðferðir, bestun dreifileiða og bætta upplifun gesta.'),
    block('fa4c242bd305', 'Bestun verðlagningaraðferða', { style: 'h2' }),
    block('bddceb7dcf31', 'Að skilja gangverk verðlagningar innan hótelbransans getur haft veruleg áhrif á tekjur þínar. Hvernig geta kvik verðlagning og tekjustýring hjálpað þér að stilla verð í rauntíma byggt á eftirspurn, verðlagningu samkeppnisaðila og öðrum ytri þáttum? Innleiðing sveigjanlegrar verðlagningarstefnu tryggir að þú hámarkar tekjur á háannatíma og viðhaldir nýtingu á rólegri tímum.'),
    block('ce2625f8a4c4', 'Efling stafrænnar nærveru og markaðssetningar', { style: 'h2' }),
    block('7548e1744d92', 'Í stafrænum heimi nútímans er sterk stafræn nærvera nauðsynleg fyrir árangur hótelsins þíns. Hversu vel nýtir þú stafræn markaðsverkfæri eins og SEO, PPC-auglýsingar og samfélagsmiðla? Lærðu hvernig á að nýta þessar rásir til að auka sýnileika og beinar bókanir, sem dregur ekki aðeins úr háð þriðja aðila vettvöngum heldur eykur einnig hagnaðarmörk þín.'),
    block('157e55ae9b30', 'Fjölbreyting tekjustrauma', { style: 'h2' }),
    block('6b7836e9db69', 'Hefur þú íhugað alla mögulega tekjustrauma fyrir hótelið þitt? Fyrir utan herbergissölu geta tækifæri eins og viðburðahald, veitingastaðir og spa á staðnum og önnur viðbótarþjónusta veitt umtalsverðar aukatekjur. Kannaðu hvernig fjölbreyting á framboði þínu getur laðað að breiðari markhóp og aukið heildararðsemi hótelsins þíns.'),
    block('103eef95a1ad', 'Að nýta tækni til að bæta upplifun gesta', { style: 'h2' }),
    block('7e97bb299004', 'Hvernig geta nýjustu tækniframfarirnar hjálpað þér að bæta ánægju gesta og auka tekjur? Frá farsímainnritun og persónusniðnum herbergisstillingum til að bjóða upp á sérsniðnar ferðaáætlanir, getur tækni bætt upplifun gesta til muna, sem leiðir til meiri ánægju, endurtekinna heimsókna og fleiri meðmæla.'),
    block('4d7d6dd003d5', 'Að nýta gagnagreiningu fyrir upplýsta ákvarðanatöku', { style: 'h2' }),
    block('03f4077e8e0f', 'Í gagnadrifnum heimi hótelrekstrar, ertu að nýta upplýsingarnar sem þú hefur til fulls? Að skilja hegðun gesta, bókunarmynstur og markaðsþróun með gagnagreiningu getur hjálpað þér að taka upplýstari ákvarðanir um rekstur hótelsins og markaðsaðferðir, sem að lokum eykur tekjur.'),
    block('64c8d4f381e0', 'Að byggja upp sterk tengsl við gesti', { style: 'h2' }),
    block('a96fd51511a3', 'Hvernig hefur það áhrif á tekjur þínar að byggja upp tryggan viðskiptavinahóp? Innleiðing árangursríkra viðskiptavinatengslastjórnunar (CRM) starfshátta getur leitt til aukinnar tryggðar gesta, fleiri endurtekinna bókana og sterks orðspors vörumerkis. Lærðu aðferðir til að efla þátttöku og tryggð viðskiptavina með persónusniðinni þjónustu og tryggðarkerfum.'),
    block('dd5ff9c05ef9', 'Niðurstaða', { style: 'h2' }),
    block('eefb921c1cb9', 'Að auka hóteltekjur krefst fjölþættrar nálgunar, frá nýstárlegum verðlagningar- og markaðsaðferðum til að nýta tækni og byggja upp sterk tengsl við gesti. Með því að tileinka þér þessar aðferðir getur þú tryggt að hótelið þitt lifi ekki bara af heldur blómstri á samkeppnishæfum gistimarkaði Íslands.'),
    block('dc5815c39cd6', 'Tilbúin(n) að auka arðsemi hótelsins þíns?', { style: 'h2' }),
    block('cfab509dc57e', 'Hafðu samband við okkur í dag til að læra meira um hvernig Hitels getur gjörbylt bókunarferlinu þínu, eða bókaðu kynningu til að sjá vettvang okkar í notkun.'),
  ],
};

const showcasingIs = {
  _id: 'post-showcasing-hitels-websites-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'showcasing-hitels-websites' },
  title: 'Kynning á fágaðri vefhönnun Hitels fyrir íslensk hótel',
  category: 'Hitels',
  externalLink: 'https://hitelsshowcase.framer.website/',
  imageUrl: r2('cms/blog/showcasing-hitels-websites.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Glæsileg vefhönnun fyrir íslensk hótel frá Hitels',
  metaDescription: 'Uppgötvaðu fullkomna vefhönnun fyrir hótelið þitt með Hitels — fágaða hönnun sérsniðna fyrir lítil og meðalstór hótel á Íslandi.',
  shortDescription: 'Kannaðu þrjár glæsilega hannaðar staðlaðar vefsíðuleiðir frá Hitels, hver um sig sérsniðin til að efla stafræna nærveru og auka beinar bókanir fyrir lítil og meðalstór hótel á Íslandi.',
  body: [
    block('382394853671', 'Fyrir hótelstjóra á Íslandi sem stefna að því að efla stafræna nærveru sína, býður Hitels upp á þrjár fágaðar staðlaðar vefhannanir. Hver hönnun er vandlega útfærð til að endurspegla einstaka eiginleika íslenskrar gestrisni, og sameinar fagurfræðilegt aðdráttarafl og hagnýta virkni. Þessar hannanir efla ekki aðeins stafrænt fótspor hótelsins þíns heldur einfalda einnig bókunarferlið, sem hvetur til beinna bókana.'),
    block('5205af2dbb26', "Yfirlit yfir vefhönnun Hitels", { style: 'h2' }),
    block('df10299b8ce8', "Hitels býður upp á þrjár aðgreindar hannanir sem koma búnar nauðsynlegum síðum sérsniðnum fyrir gistiþjónustubransann: Heim, Um okkur, Herbergi, Blogg og Hafðu samband. Hver hönnunarútgáfa býður upp á einstaka nálgun á útlit og stílsetningu, sem tryggir að til sé valkostur sem samræmist ímynd vörumerkis hótelsins þíns."),
    block('a304b26b58a6', 'Hönnunareiginleikar og kostir', { style: 'h2' }),
    block('a325baa95593', 'Heim (Forsíða):', { marks: ['strong'] }),
    block('3eb94a7c4290', 'Sem hliðið að hótelinu þínu inniheldur þessi síða grípandi myndefni og beina bókunarmöguleika. Hún leggur áherslu á þægindi og lúxus, og býður gestum að kanna gistimöguleika og sérstök þægindi.'),
    block('085df1bb8795', 'Um okkur:', { marks: ['strong'] }),
    block('e4262a2a66ad', 'Þessi síða kafar ofan í sögu og hugsjón hótelsins þíns, sem hjálpar til við að byggja upp tengsl við hugsanlega gesti með því að deila sögu þinni og skuldbindingu við framúrskarandi þjónustu.'),
    block('01d71aefb0a8', 'Herbergi:', { marks: ['strong'] }),
    block('dbb00bfd923d', 'Ítarlegar síður fyrir hverja tegund gistingar veita hugsanlegum gestum allar þær upplýsingar sem þeir þurfa, þar á meðal þægindi, verðlagningu og auðveldan aðgang að bókunarmöguleikum.'),
    block('19b83d0d72d8', 'Blogg:', { marks: ['strong'] }),
    block('4ea6f3fadecc', 'Notaðu þetta svæði til að veita innsýn í staðbundna ferðamannastaði, matarupplifun og komandi viðburði á hótelinu þínu. Þetta eykur ekki aðeins þátttöku gesta heldur bætir einnig SEO vefsins þíns.'),
    block('de676beed2e5', 'Hafðu samband:', { marks: ['strong'] }),
    block('e916ac4e0a0f', 'Þessi síða er nauðsynleg auðlind fyrir gesti og inniheldur ítarlegar tengiliðaupplýsingar, spurt og svarað hluta og notendavænt tengiliðaform til að höndla fyrirspurnir á skilvirkan hátt.'),
    block('bd0aefc251b3', 'Að velja réttu hönnunarútgáfuna', { style: 'h2' }),
    block('710bb6693f3b', 'Hönnunarútgáfa 1:', { marks: ['strong'] }),
    block('b6888c8197d2', 'Hentar best hótelum sem leggja áherslu á lúxus og fyrsta flokks þjónustu við gesti, og býður upp á fágaða og glæsilega notendaupplifun.', { listItem: 'bullet' }),
    block('1b7187ab9637', 'Hönnunarútgáfa 2:', { marks: ['strong'] }),
    block('9a2ffa284ef1', 'Fullkomið fyrir hótel sem kjósa slétt, nútímalegt útlit, með áherslu á straumlínulagaða virkni og lágstemmda fagurfræði.', { listItem: 'bullet' }),
    block('7281e7496bc4', 'Hönnunarútgáfa 3:', { marks: ['strong'] }),
    block('34d374e58bbd', 'Fullkomið fyrir hótel sem stefna að því að sýna líflegt og grípandi andrúmsloft, með kraftmiklu myndefni og gagnvirkum atriðum.', { listItem: 'bullet' }),
    block('d2e41679dd2a', 'Bestun og stuðningur', { style: 'h2' }),
    block('7975ed0ece4d', 'Allar hannanir Hitels eru bestaðar fyrir frammistöðu, sem tryggir hraðan hleðslutíma og snurðulausa vafraupplifun á hvaða tæki sem er. Hitels veitir einnig stöðugan stuðning til að hjálpa þér að fá sem mest út úr vefnum þínum, með ráðum um efnisbestun, SEO-aðferðir og samþættingu beinna bókana.'),
    block('326b3059779b', 'Niðurstaða', { style: 'h2' }),
    block('299f4e7b17c5', 'Að velja eina af fágaðri vefhönnun Hitels getur umbreytt stafrænum sýnileika og rekstrarhagkvæmni hótelsins þíns til muna. Þessar hannanir eru útfærðar til að laða ekki aðeins að fleiri gesti heldur einnig veita þeim framúrskarandi stafræna upplifun, sem ryður brautina fyrir auknar bókanir og ánægju gesta.'),
    block('b035bbf0c5b2', 'Tilbúin(n) að umbreyta stafrænni nærveru hótelsins þíns?', { style: 'h2' }),
    block('242df8bb8a3c', "Veldu fullkomnu Hitels-hönnunina fyrir hótelið þitt. Hafðu samband við okkur til að kanna valmöguleikana okkar og sjá hvernig sérsniðnar lausnir okkar geta hafið stafræna ferð gesta þinna til vegs og aukið bókanir þínar."),
  ],
};

const mutations = [improveLoyaltyIs, increaseRevenueIs, showcasingIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 4: improve-loyalty, increase-hotel-revenue, showcasing-hitels-websites (is).');
