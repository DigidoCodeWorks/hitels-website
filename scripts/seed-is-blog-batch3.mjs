// One-off seed: Icelandic siblings for blog batch 3 — Phase 5 of the i18n
// rollout plan. This batch: how-to-respond-to-negative-hotel-reviews,
// how-to-start-a-hotel-business, how-to-use-offers-and-discounts. Same
// conventions as scripts/seed-is-blog-batch1.mjs.
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch3.mjs

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

const negativeReviewsIs = {
  _id: 'post-how-to-respond-to-negative-hotel-reviews-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'how-to-respond-to-negative-hotel-reviews' },
  title: 'Hvernig á að svara neikvæðum umsögnum um hótel: Árangursríkar aðferðir og dæmi hótel í Reykjavík 5',
  category: 'Hitels',
  imageUrl: r2('cms/blog/how-to-respond-to-negative-hotel-reviews.png'),
  publishedAt: '2024-04-24T00:00:00.000Z',
  metaTitle: 'Að höndla neikvæðar hótelumsagnir: Fagleg ráð',
  metaDescription: 'Náðu tökum á því að svara neikvæðum hótelumsögnum. Uppgötvaðu aðferðir til að leysa vandamál, auka ánægju gesta og vernda orðspor hótelsins þíns.',
  shortDescription: 'Lærðu listina að svara neikvæðum hótelumsögnum af fagmennsku og nærgætni. Þessi leiðarvísir veitir hagnýt ráð og dæmi til að hjálpa þér að taka á gagnrýni á uppbyggilegan hátt og bæta orðspor hótelsins þíns.',
  body: [
    block('a097d5baaca2', 'Að fá neikvæða umsögn getur verið mótlætandi, en hvernig þú svarar getur haft veruleg áhrif á orðspor hótelsins þíns og jafnvel bætt ánægju gesta. Skilvirk samskipti og einlæg umhyggja geta breytt óánægðum gesti í tryggan viðskiptavin. Þessi leiðarvísir veitir þér stefnumótandi innsýn og dæmi um hvernig á að taka á neikvæðum hótelumsögnum á fagmannlegan hátt.'),
    block('d9e042518dfb', 'Að skilja mikilvægi svara', { style: 'h2' }),
    block('03afe5f3baba', 'Að svara neikvæðum umsögnum sýnir að þú metur endurgjöf gesta og ert staðráðin(n) í að bæta þjónustu þína. Það gefur einnig hugsanlegum gestum öryggi um að á þá verði hlustað og að þeim verði sinnt. Hvert svar ætti að vera vandað, persónusniðið og miða að því að leysa þau vandamál sem gesturinn nefnir.'),
    block('de53c420e1c4', 'Almenn ráð við svörun neikvæðra umsagna', { style: 'h2' }),
    multiSpanBlock('0e478b239e89', [
      { _key: 'b8e1fc99ee42', _type: 'span', marks: ['strong'], text: 'Svaraðu tafarlaust:' },
      { _key: '15fa3683048f', _type: 'span', marks: [], text: ' Fljót svör sýna að þú ert athugul(l) og fyrirbyggjandi varðandi endurgjöf gesta.' },
    ], { listItem: 'number' }),
    multiSpanBlock('9c70b3d2ef46', [
      { _key: '9cb5c0a45449', _type: 'span', marks: ['strong'], text: 'Viðurkenndu vandamálið:' },
      { _key: '6a2c850acc86', _type: 'span', marks: [], text: ' Sýndu einlæga samkennd og viðurkenndu áhyggjur gestsins.' },
    ], { listItem: 'number' }),
    multiSpanBlock('9f115d4fc1f4', [
      { _key: '8fae7e80c775', _type: 'span', marks: ['strong'], text: 'Biðstu einlægrar afsökunar:' },
      { _key: '2e819ca12fd3', _type: 'span', marks: [], text: ' Jafnvel þótt gagnrýnin virðist óréttmæt, biddu afsökunar á neikvæðri upplifun gestsins.' },
    ], { listItem: 'number' }),
    multiSpanBlock('d8f5c17d9b32', [
      { _key: '8458ce0e6494', _type: 'span', marks: ['strong'], text: 'Bjóddu upp á að bæta úr:' },
      { _key: '788614fe7148', _type: 'span', marks: [], text: ' Stingdu upp á ákveðinni leið til að taka á vandamálinu eða bæta upplifun þeirra.' },
    ], { listItem: 'number' }),
    multiSpanBlock('b05a4080d032', [
      { _key: 'ebf01329444e', _type: 'span', marks: ['strong'], text: 'Taktu umræðuna til hliðar:' },
      { _key: '7b9883695c0a', _type: 'span', marks: [], text: ' Gefðu upp tengiliðaupplýsingar og bjóddu gestinum að ræða málið nánar í einrúmi.' },
    ], { listItem: 'number' }),
    multiSpanBlock('5b1c5a5f4fd9', [
      { _key: 'de233f3bae31', _type: 'span', marks: ['strong'], text: 'Fylgdu eftir:' },
      { _key: '075499e0173a', _type: 'span', marks: [], text: ' Ef við á, fylgdu málinu eftir til að tryggja að vandamálið hafi verið leyst til ánægju gestsins.' },
    ], { listItem: 'number' }),
    block('7e1f17489ff3', 'Dæmi um svör við neikvæðum umsögnum', { style: 'h2' }),
    block('50eeef954285', 'Dæmi 1: Kvörtun um þrif herbergis', { style: 'h3' }),
    multiSpanBlock('aedfa4797565', [
      { _key: '2cdda0c994dd', _type: 'span', marks: ['strong'], text: 'Umsögn:' },
      { _key: '34a3af8f94c8', _type: 'span', marks: [], text: ' „Herbergið var óhreint og illa við haldið. Mjög vonsvikin(n) yfir þrifnaðarstöðlunum."' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('ec1556c972f2', [
      { _key: '9e26bab5ead1', _type: 'span', marks: ['strong'], text: 'Svar:' },
      { _key: '4bd0a693c331', _type: 'span', marks: [], text: ' „Kæri/Kæra [nafn gests], takk fyrir að vekja athygli okkar á þessu. Mér þykir mjög leitt að upplifun þín hafi ekki staðist þau háu viðmið sem við leggjum okkur fram um að viðhalda. Við höfum tekið á þessu máli með þrifateyminu okkar til að tryggja að það endurtaki sig ekki. Vinsamlegast hafðu beint samband við mig á [netfang] svo við getum bætt úr þessu fyrir þig."' },
    ], { listItem: 'bullet' }),
    block('2a413edfb78f', 'Dæmi 2: Neikvæð upplifun af starfsfólki', { style: 'h3' }),
    multiSpanBlock('e3ada072b8a1', [
      { _key: '512a32164e9e', _type: 'span', marks: ['strong'], text: 'Umsögn:' },
      { _key: '8cd90fc1f6fc', _type: 'span', marks: [], text: ' „Starfsfólkið var dónalegt og hjálplaust, sem eyðilagði dvölina okkar."' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('a94099d4e799', [
      { _key: 'd478260eddb9', _type: 'span', marks: ['strong'], text: 'Svar:' },
      { _key: '28fc889e9602', _type: 'span', marks: [], text: ' „Kæri/Kæra [nafn gests], ég biðst einlægrar afsökunar á óþægilegri upplifun þinni af starfsfólki okkar. Þetta er svo sannarlega ekki það þjónustustig sem við stefnum að því að veita. Ég myndi kunna að meta tækifæri til að ræða þetta nánar við þig. Gætirðu haft samband við mig á [tengiliðaupplýsingar]? Við erum staðráðin í að þjálfa teymið okkar betur og myndum gjarnan vilja fá annað tækifæri til að sýna þér okkar sanna gestrisniranda."' },
    ], { listItem: 'bullet' }),
    block('96fbb0348e42', 'Dæmi 3: Kvörtun um hávaða', { style: 'h3' }),
    multiSpanBlock('e23f55877e06', [
      { _key: 'ed1bc0b617f4', _type: 'span', marks: ['strong'], text: 'Umsögn:' },
      { _key: '2e79260d577c', _type: 'span', marks: [], text: ' „Dvölin okkar var eyðilögð af háum hávaða frá framkvæmdum snemma morguns."' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('5cb6da3ea460', [
      { _key: '83a9fe73e50b', _type: 'span', marks: ['strong'], text: 'Svar:' },
      { _key: '20f37360837e', _type: 'span', marks: [], text: ' „Kæri/Kæra [nafn gests], takk fyrir endurgjöfina. Við biðjumst afsökunar á ónæðinu sem framkvæmdahávaðinn olli. Við skiljum hversu mikilvægt friðsælt umhverfi er og erum að skoða betri tímasetningu og úthlutun gesta til að forðast slík óþægindi í framtíðinni. Ekki hika við að hafa beint samband við mig á [netfang] fyrir frekari athugasemdir eða áhyggjur."' },
    ], { listItem: 'bullet' }),
    block('56f8c459a6f7', 'Niðurstaða', { style: 'h2' }),
    block('0e65a33d59d7', 'Að svara neikvæðum umsögnum með samkennd, fagmennsku og fyrirbyggjandi hugarfari getur haft mikil áhrif á hvernig hótelið þitt er skynjað af bæði fyrri og hugsanlegum gestum. Það sýnir skuldbindingu þína við ánægju gesta og stöðugar umbætur, og breytir neikvæðri endurgjöf í jákvæð tækifæri.'),
    block('5e03ffb4aa6d', 'Tilbúin(n) að efla orðspor hótelsins þíns?', { style: 'h2' }),
    block('3797658056aa', 'Þessi leiðarvísir býður upp á skipulagða nálgun við að svara neikvæðum hótelumsögnum, og veitir hótelstjórum verkfærin sem þarf til að taka á gagnrýni á skilvirkan hátt og viðhalda jákvæðu orðspori í samkeppnishæfum gistigeiranum.'),
  ],
};

const startHotelIs = {
  _id: 'post-how-to-start-a-hotel-business-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'how-to-start-a-hotel-business' },
  title: 'Hvernig á að stofna hótelrekstur á Íslandi: Ítarlegur leiðarvísir',
  category: 'Hitels',
  imageUrl: r2('cms/blog/how-to-start-a-hotel-business.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Að stofna hótel á Íslandi: Nauðsynleg skref til árangurs',
  metaDescription: 'Dreymir þig um að opna hótel á Íslandi? Leiðarvísir okkar fjallar um íslenska markaðinn, lagalegar kröfur og rekstraraðferðir til að hefja starfsemi með árangri.',
  shortDescription: 'Lærðu mikilvægu skrefin við að stofna árangursríkan hótelrekstur á Íslandi, frá markaðsrannsóknum og viðskiptaáætlunum til fjármögnunar og skilnings á staðbundnum reglugerðum.',
  body: [
    block('2fbec81e1846', 'Ertu að íhuga að opna hótel í hinu stórfenglega landslagi Íslands? Ferðaþjónustan hér býður upp á umtalsverð tækifæri fyrir hótelrekendur, en að stofna hótel krefst vandaðrar áætlanagerðar og vitundar um sérstakar staðbundnar aðstæður. Þessi grein leiðir þig í gegnum lykilskrefin og atriðin sem þarf að hafa í huga til að hjálpa þér að hefja árangursríkan hótelrekstur á Íslandi.'),
    block('f1c5a78a52bc', 'Að skilja íslenska ferðaþjónustumarkaðinn', { style: 'h2' }),
    block('05332cb8a4fe', "Áður en nokkur áþreifanleg skref eru tekin er mikilvægt að skilja gangverk íslenska ferðaþjónustumarkaðarins. Hver er háannatíminn og lágannatíminn? Hverjir eru hugsanlegir viðskiptavinir þínir og hvað kjósa þeir helst? Ítarlegar markaðsrannsóknir hjálpa þér að finna þína sérstöðu, hvort sem það er lúxus-áfangastaður, notalegt gistiheimili eða vistvænt smáhótel."),
    block('328ac205f2ae', 'Að gera ítarlega viðskiptaáætlun', { style: 'h2' }),
    block('0eb753839309', 'Traust viðskiptaáætlun er vegvísir þinn til árangurs. Hún ætti að útlista viðskiptahugmyndina, markaðsgreiningu, stjórnskipulag, markaðsaðferðir og fjárhagsspár. Á Íslandi, þar sem umhverfissjónarmið eru í fyrirrúmi, ætti áætlunin einnig að innihalda aðferðir fyrir sjálfbæran rekstur.'),
    block('a6f9d27893fe', 'Að tryggja staðsetningu og fjármögnun', { style: 'h2' }),
    block('ad5857badf28', "Að velja rétta staðsetningu er mikilvægt. Íhugaðu aðgengi, nálægð við vinsæla ferðamannastaði og náttúrufegurð svæðisins. Þegar staðsetningin er ákveðin þarftu að tryggja fjármögnun. Skoðaðu valkosti eins og lán frá innlendum bönkum, fjárfestingu frá viðskiptafélögum eða ríkisstyrki sem í boði eru fyrir ferðaþjónustutengd fyrirtæki á Íslandi."),
    block('e87766b49836', 'Að fara í gegnum lagalegar kröfur og leyfi', { style: 'h2' }),
    block('30389deeffa5', "Að skilja og fylgja staðbundnum reglugerðum er nauðsynlegt. Þú þarft að skrá fyrirtækið þitt, afla nauðsynlegra gistileyfa og uppfylla staðbundnar byggingarreglugerðir og umhverfisreglur. Það gæti verið skynsamlegt að ráðfæra sig við lögfræðing á staðnum til að tryggja að öll lagaleg atriði fyrirtækisins séu í lagi."),
    block('4cdd3858b75a', 'Að byggja og hanna hótelið þitt', { style: 'h2' }),
    block('4b6eb3c79d31', 'Hönnun og bygging hótelsins ætti að endurspegla einstakan karakter Íslands á meðan það býður upp á þægindi og nútímalega aðstöðu. Íhugaðu að ráða arkitekta og innanhússhönnuði sem sérhæfa sig í sjálfbærri ferðaþjónustuaðstöðu. Þeir geta hjálpað til við að tryggja að hótelið falli vel að náttúrulegu umhverfi sínu og fylgi bestu umhverfisstöðlum.'),
    block('642553b348a9', 'Að koma rekstri af stað', { style: 'h2' }),
    block('dae353b216c9', 'Frá því að ráða starfsfólk til að setja upp stjórnunarkerfi, snýst rekstrarfasinn um að hrinda viðskiptaáætluninni í framkvæmd. Að þjálfa starfsfólk til að veita framúrskarandi þjónustu er nauðsynlegt, sérstaklega á gistiþjónustumiðuðum markaði eins og Íslandi. Að auki getur innleiðing skilvirkra bókunarkerfa og rekstrarhugbúnaðar hjálpað til við að einfalda ferla fyrirtækisins.'),
    block('a32f5062ffb3', 'Að markaðssetja hótelið þitt', { style: 'h2' }),
    block('3e243acc68d5', 'Skilvirk markaðssetning er lykillinn að því að laða gesti að nýja hótelinu þínu. Þróaðu markaðsáætlun sem inniheldur markaðssetningu á netinu, virkni á samfélagsmiðlum, samstarf við ferðaskrifstofur og þátttöku í ferðasýningum. Að draga fram einstök atriði hótelsins þíns, eins og sjálfbærniverkefni eða staðbundna menningarupplifun, getur greint eign þína frá öðrum á fjölmennum markaði.'),
    block('637019e927b4', 'Niðurstaða', { style: 'h2' }),
    block('ff3a8218761e', 'Að stofna hótel á Íslandi getur verið gefandi verkefni í ljósi vinsælda landsins sem áfangastaðar og einstakra menningar- og náttúruauðlinda þess. Með vandaðri áætlanagerð og framkvæmd hvers skrefs ferlisins, frá hugmynd til opnunar, getur þú byggt upp blómlegan hótelrekstur sem höfðar til bæði innlendra og erlendra ferðamanna.'),
    block('f827b9100b1f', 'Tilbúin(n) að hefja draumahótelið þitt á Íslandi?', { style: 'h2' }),
    block('bfe103ade5e7', 'Hafðu samband við okkur í dag til að læra meira um hvernig Hitels getur gjörbylt bókunarferlinu þínu, eða bókaðu kynningu til að sjá vettvang okkar í notkun.'),
  ],
};

const offersDiscountsIs = {
  _id: 'post-how-to-use-offers-and-discounts-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'how-to-use-offers-and-discounts' },
  title: 'Hvernig á að nota tilboð og afslætti á hótelinu þínu á stefnumótandi hátt?',
  category: 'Fréttir',
  imageUrl: r2('cms/blog/how-to-use-offers-and-discounts.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Stefnumótandi notkun tilboða og afslátta fyrir hótel',
  metaDescription: 'Hámarkaðu arðsemi hótelsins þíns með stefnumótandi tilboðum og afsláttum. Fáðu að vita bestu tímana og hlutföllin til að laða að gesti án þess að grafa undan tekjum þínum.',
  shortDescription: 'Lærðu hvenær á að bjóða afslætti og hversu mikið á að lækka verð á hótelinu þínu til að hámarka nýtingu og tekjur.',
  body: [
    block('8d180d032d6d', 'Í samkeppnishæfum heimi gistiþjónustunnar getur stefnumótandi notkun tilboða og afslátta gjörbreytt stöðunni þegar kemur að því að auka bókanir og bæta ánægju gesta. Hins vegar er mikilvægt að vita hvenær á að bjóða þessa afslætti og ákvarða rétta upphæð til að tryggja að tilboðin séu bæði aðlaðandi fyrir gesti og arðbær fyrir hótelið. Þessi leiðarvísir veitir hagnýt ráð og aðferðir við tímasetningu tilboða og ákvörðun afsláttarhlutfalla sem geta hjálpað til við að auka nýtingu og tekjur.'),
    block('af9a20db2853', 'Að skilja tilgang afslátta', { style: 'h2' }),
    block('1649c2fb8f84', 'Áður en lengra er haldið í afsláttaraðferðir er mikilvægt að skilgreina hvað þú stefnir að með tilboðunum þínum. Ertu að reyna að auka bókanir utan háannatíma, verðlauna trygga viðskiptavini eða laða að nýja gesti? Hvert markmið gæti krafist ólíkrar nálgunar og tímasetningar fyrir tilboðin þín.'),
    block('6b643c3caeff', '1. Tímasetning afslátta', { style: 'h2' }),
    block('51937c400ac4', 'Tilboð utan háannatíma og milli-annatíma:', { marks: ['strong'] }),
    multiSpanBlock('07282ac30d08', [
      { _key: '3a0eed0fb24bs1', _type: 'span', marks: ['strong'], text: 'Hvenær:' },
      { _key: 'c09728eda6ad', _type: 'span', marks: [], text: ' Bjóddu afslætti utan háannatíma eða á milli-annatíma þegar nýting er venjulega lægri. Þetta getur hjálpað til við að viðhalda stöðugu flæði gesta þegar þú þarft mest á þeim að halda.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('32b849bd3e46', [
      { _key: '945eff59443f', _type: 'span', marks: ['strong'], text: 'Hversu mikið:' },
      { _key: '70c58643df5f', _type: 'span', marks: [], text: ' Íhugaðu afsláttarbil á milli 10-20%, eftir venjulegri nýtingu og samkeppni.' },
    ], { listItem: 'bullet' }),
    block('2485cae61191', 'Bókanir á síðustu stundu:', { marks: ['strong'] }),
    multiSpanBlock('32dd8a44c134', [
      { _key: '683454017033', _type: 'span', marks: ['strong'], text: 'Hvenær:' },
      { _key: '5dee720f7aa2', _type: 'span', marks: [], text: ' Birtu afslætti fyrir bókanir á síðustu stundu nokkrum dögum áður en óseld herbergi eru talin standa auð.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('78850e532fd5', [
      { _key: 'f508abe8c524', _type: 'span', marks: ['strong'], text: 'Hversu mikið:' },
      { _key: 'b5aca596a781', _type: 'span', marks: [], text: ' Afslættir geta verið meiri hér, um 15-30%, þar sem markmiðið er að fylla herbergi sem myndu annars ekki skila neinum tekjum.' },
    ], { listItem: 'bullet' }),
    block('0f33b9ec5982', 'Snemmbókunartilboð:', { marks: ['strong'] }),
    multiSpanBlock('edb7fe73c6c6', [
      { _key: '8c70192b75c5s1', _type: 'span', marks: ['strong'], text: 'Hvenær:' },
      { _key: '8c70192b75c5', _type: 'span', marks: [], text: ' Hvettu til bókana á áætlunarstigi fyrir næsta háannatíma. Byrjaðu snemmbókunartilboð nokkrum mánuðum fyrirfram.' },
    ], { listItem: 'bullet' }),
    multiSpanBlock('5b0787274dda', [
      { _key: 'f7169f9eceac', _type: 'span', marks: ['strong'], text: 'Hversu mikið:' },
      { _key: '2392ad726b02', _type: 'span', marks: [], text: ' Bjóddu hóflegan afslátt, til dæmis 10-15%, til að verðlauna gesti fyrir að bóka snemma.' },
    ], { listItem: 'bullet' }),
    block('45f0b179f924', '2. Að ákvarða afsláttarupphæðir', { style: 'h2' }),
    block('83c22dc269c3', 'Samkeppnisgreining:', { marks: ['strong'] }),
    block('eb688d85d8e7', 'Rannsakaðu hvað samkeppnisaðilar þínir bjóða upp á og stilltu afsláttarhlutföll þín til að halda samkeppnishæfni án þess að lenda í verðstríði.', { listItem: 'bullet' }),
    block('b811c4d61d5d', 'Kostnaðargreining:', { marks: ['strong'] }),
    block('5e5ff650d8ac', 'Tryggðu að afslátturinn dekki samt rekstrarkostnað þinn. Reiknaðu núllpunkt hvers herbergis og settu afslætti sem halda verðinu yfir þeim þröskuldi.', { listItem: 'bullet' }),
    block('6e872ea373a6', 'Skipting gesta í hópa:', { marks: ['strong'] }),
    block('95a22f97f47d', 'Sérsníddu afslætti að mismunandi gestahópum. Til dæmis mætti bjóða fjölskyldum meiri afslætti í skólafríum til að hvetja til lengri dvalar.', { listItem: 'bullet' }),
    block('f444b13126ce', '3. Að nota afslætti til að byggja upp tryggð', { style: 'h2' }),
    block('a2182f710028', '\n'),
    block('5d88bb41f776', 'Tryggðarkerfi:', { marks: ['strong'] }),
    block('eab295c42903', 'Bjóddu einkaréttar afslætti eða fríðindi til meðlima tryggðarkerfisins þíns. Þetta hvetur ekki aðeins til endurtekinna viðskipta heldur eykur einnig tryggð gesta.', { listItem: 'bullet' }),
    block('7228ba2aae1c', 'Persónusniðin tilboð:', { marks: ['strong'] }),
    block('2413bf33f964', 'Notaðu gögn um gesti til að senda persónusniðin tilboð byggð á óskum þeirra og fyrri dvölum. Þetta getur falið í sér herbergisuppfærslur, afslátt af þjónustu eða sérstaka pakka.', { listItem: 'bullet' }),
    block('7efb420ddce0', '4. Að miðla tilboðunum þínum', { style: 'h2' }),
    block('5c296779509b', 'Skilvirk markaðssetning:', { marks: ['strong'] }),
    block('324cb28a31d7', 'Nýttu tölvupóstmarkaðssetningu, samfélagsmiðla og vef hótelsins til að miðla afsláttunum þínum. Skýr, sannfærandi skilaboð með ákveðnu tilfinningu fyrir tímapressu (eins og takmörkuð tilboð) geta flýtt fyrir ákvarðanatöku.', { listItem: 'bullet' }),
    block('ff0a70858d4a', 'Gagnsæi:', { marks: ['strong'] }),
    block('6bd6b9032990', 'Vertu ávallt skýr/skýrt varðandi skilmála tilboðanna þinna. Falin skilyrði geta fælt frá endurteknum viðskiptum og skaðað orðspor þitt.', { listItem: 'bullet' }),
    block('f03529da326e', 'Niðurstaða', { style: 'h2' }),
    block('df964cb53fa4', "Vel tímasettir afslættir og vandlega útreiknaðar afsláttarupphæðir geta aukið umtalsvert bókunarhlutfall hótelsins þíns og heildarupplifun gesta. Með því að skilja markaðinn þinn, greina kostnað og miðla tilboðunum þínum á skilvirkan hátt getur þú nýtt afslætti ekki bara sem verkfæri til að fylla herbergi, heldur sem stefnumótandi eign til að auka aðdráttarafl og arðsemi hótelsins."),
    block('380a4279e68c', 'Tilbúin(n) að besta verðlagningarstefnu þína?', { style: 'h2' }),
    block('c4ddd8d241b8', 'Innleiddu þessar stefnumótandi afsláttaraðferðir til að laða að fleiri gesti og hámarka tekjur þínar. Fyrir persónusniðna ráðgjöf um að setja upp árangursrík tilboð, hafðu samband við teymið okkar í dag.'),
  ],
};

const mutations = [negativeReviewsIs, startHotelIs, offersDiscountsIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 3: how-to-respond-to-negative-hotel-reviews, how-to-start-a-hotel-business, how-to-use-offers-and-discounts (is).');
