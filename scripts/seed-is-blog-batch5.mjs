// One-off seed: Icelandic siblings for blog batch 5 — Phase 5 of the i18n
// rollout plan. This batch: master-direct-bookins-with-hitels,
// the-roi-of-direct-bookings-why-15-feels-like-50. Same conventions as
// scripts/seed-is-blog-batch1.mjs.
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch5.mjs

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

const masterDirectIs = {
  _id: 'post-master-direct-bookins-with-hitels-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'master-direct-bookins-with-hitels' },
  title: 'Auktu tekjur hótelsins: Náðu tökum á beinum bókunum með Hitels',
  category: 'Hitels',
  imageUrl: r2('cms/blog/master-direct-bookins-with-hitels.png'),
  publishedAt: '2024-04-16T00:00:00.000Z',
  metaTitle: 'Hitels — Auktu beinar bókanir hótelsins þíns',
  metaDescription: 'Efldu stafræna nærveru hótelsins þíns og auktu beinar bókanir með sérsniðnum vefjum Hitels. Bestaðu umferð, fylgstu með árangri og auktu tekjur.',
  shortDescription: 'Uppgötvaðu hvernig það að nýta sérsniðna vefi og öflugt mælaborð Hitels getur aukið tekjur hótelsins þíns til muna með auknum beinum bókunum.',
  body: [
    block('ce0e5a9d2a36', 'Hvernig á að auka tekjur hótelsins: Náðu tökum á beinum bókunum með Hitels', { style: 'h2' }),
    block('968a13d6ce13', "Ertu að leita leiða til að skera þig úr á samkeppnishæfum hótelmarkaði Íslands? Uppgötvaðu kraftinn í því að nýta sérsniðna vefi og öflugt mælaborð Hitels til að auka tekjur þínar til muna með auknum beinum bókunum."),
    block('ff9e064184d6', 'Inngangur', { style: 'h3' }),
    block('fd4f559e57f6', 'Hefur þú áhyggjur af þeim hluta hagnaðar þíns sem tapast til bókunarsíðna þriðja aðila? Ertu að leita leiða til að endurheimta stjórn á tengslum við gesti og verðlagningaraðferðum? Þessi leiðarvísir er saminn fyrir hótelstjóra og -eigendur á Íslandi, með það að markmiði að sýna þér hvernig það að ná tökum á beinum bókunum með Hitels getur umbreytt rekstri og arðsemi fyrirtækisins þíns.'),
    block('aa4dcd4d8f79', 'Að skilja áhrif beinna bókana á tekjur', { style: 'h3' }),
    block('5a2c2b0deb21', 'Beinar bókanir útrýma þörfinni fyrir milliliði þriðja aðila, sem oft taka til sín umtalsverðan hluta hóteltekna í formi þóknana. Með því að rækta bein tengsl getur þú boðið upp á persónusniðna þjónustu, stillt verð kvikt eftir eftirspurn og safnað ómetanlegum gögnum um gesti sem vettvangar þriðja aðila halda venjulega eftir. Þessi beinu samskipti bæta ekki aðeins arðsemi heldur einnig tryggð og ánægju gesta.'),
    block('8bacc5ec91b0', 'Að nýta Hitels fyrir auknar beinar bókanir', { style: 'h3' }),
    block('2440f94225e1', 'Hitels er sérsniðið fyrir íslenska gistiþjónustumarkaðinn og veitir verkfæri sem einfalda gerð sérsniðinna hótelvefja. Þessir vefir eru meira en bara stafrænir bæklingar; þeir eru heildstæðar bókunarvélar búnar notendavænum viðmótum, fjöltyngdum stuðningi og staðbundinni greiðslusamþættingu. Hvernig getur þú notað Hitels til að ná fleiri beinum bókunum? Með því að hanna grípandi, sjónrænt aðlaðandi vef sem endurspeglar einstakan sjarma eignarinnar þinnar og hefur bein samskipti við hugsanlega gesti.'),
    block('617d2de6a35b', 'Að auka umferð á hótelvefinn þinn', { style: 'h3' }),
    block('b0840b148dd2', 'Að auka umferð á vefinn þinn krefst fjölþættrar nálgunar. Byrjaðu á leitarvélabestun (SEO) til að tryggja að vefurinn þinn birtist efst í leitarniðurstöðum fyrir hótel á Íslandi og tengdar leitir. Náðu til hugsanlegra gesta með grípandi efni á samfélagsmiðlum, sérstaklega með myndrænu efni sem varpar ljósi á einstök atriði staðsetningar þinnar og þæginda. Tölvupóstmarkaðsherferðir geta ræktað mögulega viðskiptavini með því að bjóða upp á sértilboð eða fræðandi efni um komandi viðburði og áfangastaði á Íslandi.'),
    block('03066af91ccc', 'Viðskiptavinatengslastjórnun (CRM) og þátttaka gesta', { style: 'h3' }),
    block('675aca810f56', 'Með því að nýta CRM-getu Hitels getur þú stjórnað gögnum um gesti á skilvirkan hátt, frá fyrstu snertingu til eftirfylgni eftir dvöl. Þessi hluti vettvangsins hjálpar þér að skapa persónusniðna upplifun fyrir endurtekna gesti, stjórna tryggðarkerfum og senda markviss tilboð byggð á fyrri dvölum. Hæfileikinn til að eiga bein samskipti við gesti fyrir, á meðan og eftir dvöl þeirra eykur ekki aðeins ánægju heldur hvetur einnig til endurtekinna bókana.'),
    block('76a6ea01f0e0', 'Að nota gögn til að stýra ákvörðunum', { style: 'h3' }),
    block('75476999ea9a', 'Mælaborð Hitels veitir rauntímayfirsýn yfir lykilmælikvarða eins og nýtingarhlutfall, meðaldagverð og tekjur á hvert tiltækt herbergi. Hvernig getur þú notað þessi gögn til að taka upplýstar ákvarðanir? Til dæmis, ef þú tekur eftir samdrætti í bókunum á tilteknu tímabili, gætir þú hafið markvisst tilboð til að auka nýtingu. Á hinn bóginn, ef þú sérð mikla eftirspurn, gætir þú stillt verðlagningarstefnu þína til að hámarka tekjur.'),
    block('b9990934651e', 'Framtíðarhorfur hótelbransans á Íslandi', { style: 'h3' }),
    block('5621e61aa19a', 'Þegar litið er fram á veginn er íslenski hótelbransinn á leið í breytingar með aukinni áherslu á sjálfbærni og tækni. Nýjungar eins og sýndarveruleikaskoðanir á herbergjum og sjálfvirk gestaþjónusta eru í nánd. Hvernig getur Hitels hjálpað þér að vera á undan þessari þróun? Með því að veita vettvang sem mætir ekki aðeins núverandi þörfum heldur aðlagast einnig framtíðar tækniframförum, sem tryggir að hótelið þitt haldist í fararbroddi gistiþjónustubransans.'),
    block('cf872013edcd', 'Niðurstaða', { style: 'h3' }),
    block('995ffd63303e', 'Að ná tökum á beinum bókunum er nauðsynlegt til að hámarka tekjur og bæta upplifun gesta á blómlegum hótelmarkaði Íslands. Hitels býður þér öflugt verkfærasafn til að efla stafræna nærveru þína, stjórna tengslum við gesti og taka gagnadrifnar ákvarðanir sem leiða til viðvarandi vaxtar.'),
    block('7f708a2c60fc', 'Tilbúin(n) að umbreyta bókunarstefnu hótelsins þíns?', { style: 'h3' }),
    block('d8692de6c85d', 'Ertu tilbúin(n) að umbreyta tekjustjórnunarstefnu hótelsins þíns og ná meiri arðsemi? Hafðu samband við okkur í dag til að læra meira um hvernig Hitels getur gjörbylt bókunarferlinu þínu, eða bókaðu kynningu til að sjá vettvang okkar í notkun.'),
  ],
};

const roiIs = {
  _id: 'post-the-roi-of-direct-bookings-why-15-feels-like-50-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'the-roi-of-direct-bookings-why-15-feels-like-50' },
  title: 'Arðsemi beinna bókana: Hvers vegna 15% líður eins og 50%',
  category: 'Hitels',
  imageUrl: r2('cms/blog/the-roi-of-direct-bookings-why-15-feels-like-50.png'),
  publishedAt: '2025-02-14T00:00:00.000Z',
  metaTitle: 'Arðsemi beinna bókana hótela — Hvers vegna 15% líður eins og 50% | Hitels',
  metaDescription: 'Þóknanir bókunarsíðna rýra framlegð þína. Lærðu hvernig beinar bókanir auka hagnað og stjórn — og hvernig Hitels hjálpar hótelum að auka tekjur sínar án milliliða.',
  shortDescription: 'Slepptu þóknuninni og fjárfestu í framtíðarþolnum tekjustraumi.',
  body: [
    block('ad8e484c4a10', 'Hvers vegna ertu að borga einhverjum öðrum fyrir að kynna þig fyrir þínum eigin gestum?', { style: 'h2' }),
    block('463816b83cd1', 'Fyrir mörg hótel eru bókunarsíður (OTA) taldar nauðsynlegar. Þær veita sýnileika, fylla herbergi og halda vélinni gangandi. En á bak við hverja bókun sem þær senda liggur falinn kostnaður — kostnaður sem rýrir hagnað þinn, takmarkar stjórn þína og lætur þig elta magn í stað verðmætis.'),
    block('0acef77d535d', 'Skoðum nánar hverju þú raunverulega gefur upp á bátinn þegar þú afhendir 15% af tekjum þínum fyrir hverja bókun — og hvað þú ávinnur þegar þú ákveður að taka þau til baka.'),
    block('3abf823742bd', '15% af tekjum getur þýtt 50% af hagnaði þínum', { style: 'h3' }),
    block('c9ffacee09d6', 'Þetta byrjar smátt. 1.000 evra bókun berst. Þú færð 850 evrur. Ekki fullkomið, en viðunandi. Svo gerist það aftur. Og aftur. Ímyndaðu þér nú 100 slíkar bókanir á mánuði. Þú hefur greitt 15.000 evrur bara til að vera sýnileg(ur).'),
    block('0a09dcd631a9', 'En þessi 15% hverfa ekki bara af tekjum þínum. Þau skerða beint framlegð þína. Flest hótel starfa með hagnaðarframlegð langt undir 30%. Það þýðir að í hvert sinn sem þú gefur 15-20% til þriðja aðila, tapar þú helmingi þess sem þú hefðir getað hagnast.'),
    block('4c316f2c1e8e', 'Í rólegum mánuðum verður þessi kostnaður enn erfiðari að taka á sig. Þóknunin lækkar ekki bara vegna þess að bókanir þínar gerðu það.'),
    block('3437a78717dd', 'Þú tapar ekki bara peningum — þú tapar eignarhaldi', { style: 'h3' }),
    block('f0538a03ab68', 'Bein bókun er samband. OTA-bókun er viðskipti.'),
    block('d16e8fc6e2b0', 'Þegar gestur kemur í gegnum vettvang þriðja aðila er hann ekki í raun gesturinn þinn. Þú færð ekki raunverulegar tengiliðaupplýsingar hans. Þú getur ekki fylgt eftir fyrir komu. Þú getur ekki selt upp á við, byggt upp tryggð eða haldið sambandi. OTA-síðan stjórnar upplifuninni — og fær heiðurinn.'),
    block('9e0c44ae4ba5', 'Beinar bókanir breyta gangverkinu. Frá því augnabliki sem einhver lendir á vefnum þínum er tónninn þinn að ákveða. Þú byggir upp traust með þínum eigin skilaboðum. Þú stjórnar verðlagningu og framsetningu. Þú helst sýnileg(ur) eftir dvölina. Þú styrkir þitt eigið vörumerki — ekki einhvers annars.'),
    block('525f2cb3b72a', 'Þetta samband endar ekki við útritun — það getur leitt til endurtekinna heimsókna, umsagna og meðmæla. Ekkert af því kostar þig 15%.'),
    block('58fc10d20953', 'Háð af OTA takmarkar vöxt þinn', { style: 'h3' }),
    block('59c80985ffe4', 'Því meira sem þú reiðir þig á rásir þriðja aðila, því minna svigrúm hefur þú til að vaxa sjálfstætt. Verðlagning þín er bundin af jafnræðissamningum. Vörumerki þitt keppir við önnur á sama vettvangi. Þú verður bara einn valkostur enn á síuðum lista.'),
    block('78c8e3e07eea', 'Á sama tíma er letjandi fyrir þig að bjóða hvata eða fríðindi sem gætu vegið ákvörðunina þér í hag — nema þú borgir meira fyrir „sýnileika." Þetta er skammtímaáætlun sem skapar langtíma viðkvæmni.'),
    block('fa6f191297c7', 'Beinar bókanir eru fjárfesting í stöðugleika', { style: 'h3' }),
    block('946c330924df', 'Hótel sem einbeita sér að því að auka beina bókunarrás sína sjá oft hærra meðalbókunarvirði, fleiri endurkomugesti, lægri öflunarkostnað og skýrari gögn um gesti fyrir snjallari markaðssetningu.'),
    block('26ed5fed32cd', 'Þú ert ekki bara að spara þóknun — þú ert að byggja upp heilbrigðara fyrirtæki með færri háðum þáttum og meiri stjórn á framtíð þinni.'),
    block('0bb04b495b5e', 'Hvernig Hitels styður hótel sem setja beinar bókanir í forgang', { style: 'h3' }),
    block('4ee22e2fdaf8', 'Hjá Hitels lítum við ekki á beinar bókanir sem eiginleika — þær eru undirstaðan. Sérhver vefur sem við sköpum er hannaður til að skila árangri, ekki bara líta vel út.'),
    block('714a455ca5b6', 'Við byggjum með bókunarvél sem tengist beint við bankareikninginn þinn — engin viðbót, engin þóknun. Farsímamiðuð hönnun okkar tryggir að vafra og bóka líði áreynslulaust. Þú getur keyrt árstíðabundin tilboð, afslætti og uppfærslur án þess að þurfa forritara. Og þú átt tengslin við gesti frá upphafi til enda.'),
    block('39977eb9223e', 'Í stað þess að hlaða markaðsverkfærum ofan á almennt sniðmát, gefum við þér uppbygginguna til að auka bókanir frá upphafi — án milliliða í veginum.'),
    block('4aea53c66f92', 'Taktu framlegðina þína til baka', { style: 'h3' }),
    block('c4b98ba9d3b5', 'Raunverulegur kostnaður OTA-síðna er ekki bara peningarnir sem þú tapar á hverja bókun. Það er skriðþunginn sem þú öðlast aldrei. Tengslin sem þú byrjar aldrei. Gestirnir sem hefðu kannski komið aftur — ef þeir hefðu vitað hver þú varst.'),
    block('113f0979ea03', 'Með stefnu sem setur beinar bókanir í forgang, studd af vettvangi byggðum fyrir árangur, heldur þú ekki bara framlegð þinni. Þú eykur hana.'),
    block('cbcb2ae5c479', 'Og þú þarft aldrei að velta fyrir þér hvort 15% hefðu getað verið eitthvað meira.'),
  ],
};

const mutations = [masterDirectIs, roiIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 5: master-direct-bookins-with-hitels, the-roi-of-direct-bookings-why-15-feels-like-50 (is).');
