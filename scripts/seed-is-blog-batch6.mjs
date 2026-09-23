// One-off seed: Icelandic siblings for blog batch 6 (final batch) — Phase 5
// of the i18n rollout plan. This batch: we-analyzed-300-hotel-websites-in-
// iceland-here-s-what-we-found, boost-revpar-upselling-ancillary-services-
// before-check-in (the largest post, ~1,470 words). Same conventions as
// scripts/seed-is-blog-batch1.mjs. After this runs, all 17 blog posts have
// an Icelandic sibling.
//
// Usage: node --env-file=.env scripts/seed-is-blog-batch6.mjs

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

const analyzedIs = {
  _id: 'post-we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found' },
  title: 'Við greindum 300 hótelvefi á Íslandi. Hér er það sem við fundum.',
  category: 'Hitels',
  imageUrl: r2('cms/blog/we-analyzed-300-hotel-websites-in-iceland-here-s-what-we-found.png'),
  publishedAt: '2025-06-13T00:00:00.000Z',
  metaTitle: 'Við greindum 500 íslenska hótelvefi: Niðurstöðurnar',
  metaDescription: 'Úrelt hönnun, léleg bókunarupplifun og lág Lighthouse-einkunn hrjá marga hótelvefi á Íslandi. Hér er það sem þarf að breytast — og hverjir eru að gera þetta rétt.',
  body: [
    block('3e18429a9c19', 'Hvað þýðir það þegar gestur þinn eyðir meiri tíma í að bíða eftir að vefurinn þinn hlaðist en að ákveða að bóka?', { style: 'h2' }),
    block('ee29e2177c8e', 'Ísland er einn mest sótti áfangastaður Evrópu miðað við höfðatölu. En margir hótelvefir landsins endurspegla það ekki. Þeir eru oft hægir, úreltir og erfiðir í notkun — sérstaklega í farsímum, þar sem flestar ferðaákvarðanir eru nú teknar.'),
    block('bdcc851189b5', 'Snemma árs 2025 fórum við yfir meira en 500 hótelvefi um allt land. Það sem við fundum kom ekki á óvart — en það var lýsandi. Tæknilegar skuldir, ósamræmi í útliti og gölluð bókunarferli halda aftur af bransa sem ætti að leiða stafræna gistiupplifun.'),
    block('718ae246050c', 'Flestir vefir hafa ekki verið uppfærðir í mörg ár', { style: 'h2' }),
    block('bb8e3bfc8f99', 'Yfir 60% vefsíðnanna sem við skoðuðum sýndu engin merki um endurhönnun síðan fyrir 2020. Margir keyra enn á úreltum WordPress-þemum, nota úrelta viðbót eða reiða sig á DIY-smiði sem hafa elst illa.'),
    block('db35b8dc7d9c', 'Þessir vefir kunna tæknilega séð að virka — en þeir líða oft eins og þeir séu árum á eftir. Leturgerðir stangast á, útlit brotnar í farsímum, og uppbygging síðna endurspeglar ekki hvernig gestir í raun leita eða ákveða.'),
    block('bca42f59d4a9', 'Í sumum tilvikum höfðu hótel greinilega endurnýjað hið líkamlega rými sitt — en látið stafrænu framdyrnar ósnertar.'),
    block('ca86850bc745', 'Bókunarvélar eru algengar — en samfella vörumerkis er sjaldgæf', { style: 'h2' }),
    block('886f0e249b04', 'Nánast öll íslensk hótel nota nú bókunarvélar, flestar knúnar af Godo og BookingFactory (báðar reknar af GODO). Þessi kerfi njóta víðtæks trausts á markaðnum og bjóða upp á sannreynda bókunarvirkni.'),
    block('0acf0d72cb0a', 'Áskorunin er ekki hugbúnaðurinn — heldur hvernig hótel innleiða hann. Í mörgum tilvikum fer bókunarupplifunin fram á öðru léni með ólíkum stíl, leturgerðum og ferli. Þessi ósamfellda skipti brýtur upp samfelluna og grefur lúmskt undan trausti.'),
    block('4e64863311a5', 'Frá sjónarhóli gests líður þetta oft eins og að yfirgefa vef hótelsins algjörlega til að greiða — einmitt á viðkvæmasta augnabliki viðskiptanna.'),
    block('4732d0dba91c', 'Google Lighthouse-einkunnir sýna viðvarandi vanárangur', { style: 'h2' }),
    block('ca89483dcd90', 'Við keyrðum hvern vef í gegnum Google Lighthouse. Meðaltal frammistöðueinkunnar var 43 af 100.'),
    block('04bb81ae60c6', 'SEO-einkunnir voru örlítið betri, en aðeins 18% vefsíðna náðu öllum fjórum kjarnaflokkunum: Frammistöðu, Aðgengi, Bestu starfsvenjur og SEO.', { listItem: 'bullet' }),
    block('293c9a32aa65', 'Vefir með stórar óþjappaðar myndir, úreltan JavaScript-kóða eða hæga innfellingu frá þriðja aðila fengu oft undir 30.', { listItem: 'bullet' }),
    block('8834cd7180f7', 'Þetta eru ekki bara tæknileg smáatriði. Google notar þessar einkunnir sem hluta af röðunarreikniritinu sínu. Ef hótelvefurinn þinn hleðst hægt, er ekki farsímavænn eða skortir rétta uppbyggingu, er ólíklegra að hann birtist þegar gestir eru virkir í leit.', { listItem: 'bullet' }),
    block('f05036a328cb', 'Farsímaupplifunin er stærsta veikleikinn', { style: 'h2' }),
    block('b158b5e2abda', 'Fyrir gesti sem vafra í símum sínum — oft þreyttir, á ferðalagi eða með takmarkaðan tíma — kemur gremjan fljótt.'),
    block('254e8e6c2762', 'Valmyndir sem opnast ekki. Bókunarhnappar sem renna út af skjánum. Myndaskyggnur sem taka 10+ sekúndur að hlaðast. Þessi vandamál eru ekki sjaldgæf. Þau eru útbreidd.'),
    block('50ed1e1b0b75', 'Jafnvel meðal nýrri hótelvörumerkja var farsímabestun oft ófullkomin. Það er glatað tækifæri, í ljósi þess að yfir 70% ferðatengdrar umferðar kemur nú frá farsímum.'),
    block('3324578e6399', 'Grunnatriði SEO eru oft vanrækt', { style: 'h2' }),
    block('1ec5a9821dad', 'Meira en helmingur vefsíðnanna sem við greindum vantaði meta-titla, alt-texta á myndir eða samræmda notkun H1-fyrirsagna. Aðrir voru með tvítekið síðuefni eða uppblásinn kóða sem gerði skriðferlum erfitt fyrir.'),
    block('ce50a53432ab', 'Sumir vefir höfðu engar tungumálayfirlýsingar — sem gerði erfiðara að birta réttu útgáfuna fyrir alþjóðlega gesti.'),
    block('89eca5bd992b', 'Án þessara grunnatriða gera hótel leitarvélum (og gestum) erfiðara fyrir að finna þau yfirhöfuð.'),
    block('e05a8661436c', 'En sum hótel eru að gera þetta rétt', { style: 'h2' }),
    block('b8a6b090c936', 'Hótel eins og Bryggjan Boutique og Vintage Hotel hafa opnað nútímalega, farsímamiðaða vefi sem samræma vörumerkjaímynd og frammistöðu.'),
    block('469de69ee7dd', 'Önnur — þar á meðal Hótel Múli, Konvin og Black Sand Hotel — eru nú að þróa fullkomlega sérsniðna vefi á Hitels vettvanginum, með áherslu á hraða frammistöðu og myndræna frásögn sem endurspeglar sérkenni þeirra.'),
    block('d833fd2ec19b', 'Þessi hótel eru ekki bara að uppfæra vefi sína. Þau eru að byggja upp beinar bókunarrásir sem keppa við bókunarsíðurnar.'),
    block('9ed03b493c88', 'Niðurstaða: Betri vefur snýst ekki um tískustrauma — hann snýst um traust', { style: 'h2' }),
    block('1449e689e4f4', 'Flestir íslenskir hótelvefir eru ekki bilaðir. Þeir eru bara á eftir. Og á markaði nútímans hefur það raunveruleg áhrif.'),
    block('96578031e024', 'Gestir búast við skýrleika, hraða og trausti. Þeir vilja finna fyrir öryggi frá fyrsta skruni til síðasta skrefs bókunar. Það krefst ekki íburðarmikilla eiginleika eða dýrra endurbygginga — það krefst nákvæmni í smáatriðum og vettvangs sem er byggður til að skila árangri.'),
    block('5f322b2c9493', 'Eftir því sem fleiri hótel fjárfesta í nútímalegum vefjum mun bilið stækka. Þau sem standa í stað eiga á hættu að verða skilin eftir — ekki vegna þess að herbergin þeirra séu verri, heldur vegna þess að vefir þeirra gáfu gestum aldrei tækifæri til að komast að því.'),
  ],
};

const boostRevparIs = {
  _id: 'post-boost-revpar-upselling-ancillary-services-before-check-in-is',
  _type: 'post',
  language: 'is',
  slug: { current: 'boost-revpar-upselling-ancillary-services-before-check-in' },
  title: 'Auktu RevPAR: Selja viðbótarþjónustu fyrir innritun',
  category: 'Hitels',
  imageUrl: r2('cms/blog/boost-revpar-upselling-ancillary-services-before-check-in.jpg'),
  publishedAt: '2026-04-08T00:00:00.000Z',
  metaTitle: 'Auktu RevPAR: Selja viðbótarþjónustu fyrir innritun',
  metaDescription: 'Ertu að skilja peninga eftir á borðinu? Lærðu hvernig íslensk hótel nota sjálfvirka tölvupósta fyrir komu til að selja viðbótarþjónustu og auka RevPAR hótelsins.',
  shortDescription: 'Ertu að skilja peninga eftir á borðinu? Lærðu hvernig íslensk hótel nota sjálfvirka tölvupósta fyrir komu til að selja viðbótarþjónustu og auka RevPAR hótelsins.',
  body: [
    block('f7aa5c5fbc88', 'Hversu oft hafa gestir þínir komið að móttökunni, aðeins til að biðja móttökustjórann að bóka norðurljósaferð í gegnum þriðja aðila? Hvers vegna láta annað fyrirtæki fá þær tekjur þegar gesturinn sefur undir þínu þaki?'),
    block('8769d00627bf', 'Að tryggja beina bókun er bara fyrsta orrustan í gistiþjónustu. Ef þú hættir að selja um leið og herbergi er staðfest, ertu að takmarka arðsemi þína alvarlega.'),
    block('da04b75ab607', 'Að selja viðbótarþjónustu snýst ekki um að smáklípa gesti þína. Það snýst um að veita vandlega skipulagða upplifun áður en þeir lenda einu sinni á Keflavíkurflugvelli.'),
    block('c7eb89313193', 'Þegar þú tekur eignarhald á öllu lífsferli gestsins, byggir þú upp traust og opnar mjög arðbæran tekjustraum. Við vitum hvað þarf til að auka þá framlegð, með því að nota sjálfvirk samskipti við gesti til að vinna erfiðisvinnuna.'),
    block('a9277d088d07', 'Hættu að skilja framlegð þína eftir á borðinu', { style: 'h2' }),
    block('4f8fc62704be', 'Sjálfstæðir hótelrekendur standa frammi fyrir erfiðum markaði núna. Rekstrarkostnaður er alræmt hár. Manneklu skapar stöðugt flöskuhálsa á háannatíma ferðamanna. Það sem verra er, ef þú reiðir þig algjörlega á bókunarsíður (OTA), ertu nú þegar að afhenda allt að 20% af tekjum þínum í þóknanir.'),
    block('93f59cba15f4', 'Til að vinna gegn þessu þarftu að horfa út fyrir grunnverð á nótt. Þú þarft að greina snertipunkta utan bókunarvélarinnar til að ná háframlegðartekjum. Að selja flugvallaferðir eða snemminnritun kostar þig mjög lítið að uppfylla, en veitir gríðarlegt virði fyrir þreytta ferðalanginn.'),
    multiSpanBlock('05081823ae8a', [
      { _key: 'c83e0d487251s1', _type: 'span', marks: ['strong'], text: '15% aukning í tekjum með viðbótarsölu getur auðveldlega þýtt 50% aukningu í heildarhagnaði þínum.' },
      { _key: 'c83e0d487251', _type: 'span', marks: [], text: ' Með því að setja þessi tilboð beint inn í tölvupósta fyrir komu, nærðu bókuninni þegar veski gestsins er opið og spennan er mest.' },
    ]),
    block('5206fe756883', 'Umbreyttu kvíða fyrir dvöl í hreinan hagnað', { style: 'h2' }),
    block('443caa921a10', 'Ferðalangar sem skipuleggja ferð erlendis standa oft frammi fyrir fjalli af skipulagskvíða. Þeir hafa áhyggjur af ófyrirsjáanlegum veðurviðvörunum, því að rata um ókunna leigubíla í snjónum, og því að tryggja sér miða á vinsæla staði sem seljast hratt upp. Þessi kvíði er þitt stærsta viðskiptatækifæri.'),
    block('babdeff0e3a4', 'Með markvissri tölvupóstmarkaðssetningu staðsetur þú vörumerkið þitt sem traustan staðarleiðsögumann þeirra. Þú leysir fyrirbyggjandi ferðavandamál þeirra áður en þau koma. Hugsaðu um internetið eins og óreiðukennt, hávaðasamt bókasafn þar sem gestir drukkna í mótsagnakenndum TripAdvisor-umsögnum.'),
    block('6cf6254ce2e8', 'Þegar þú lendir í pósthólfi þeirra og býður fyrirfram skipulagða ferð beint frá komuhliðinu, sjá þeir ekki sölutilboð. Þeir sjá björgunarhring. Þessi tiltekna sjónarhornsbreyting er hvernig bestu sjálfstæðu hótelin auka RevPAR stöðugt án þess að snerta herbergisverð sitt nokkurn tímann.'),
    block('d555f4cd1d9b', 'Sleppðu úr gildru tæknilegra skulda', { style: 'h2' }),
    block('2256a5746c8d', 'Reiðir þú þig enn á handvirka tölvupósta eða vonar að gestir skoði upplitaða ferðabæklinga í anddyrinu þínu? Það er örugg uppskrift að glötuðum tækifærum.'),
    block('0e672a7e60d6', 'Handvirk ferli stækka einfaldlega ekki með. Þau grafa starfsfólk móttökunnar undir snjóflóði af stjórnunarverkefnum. Að endurheimta reksturinn þinn krefst þess að skipta þessum tæknilegu skuldum út fyrir sjálfvirk vinnuferli.'),
    block('004b0f2006e2', 'Tölvupóstssölukerfið þitt verður að eiga bein samskipti við eignastjórnunarkerfið þitt (PMS). Ef þessi kerfi sitja í aðskildum kerfum, skapar þú núning fyrir gestinn og tvíverknaðarhausverk fyrir teymið þitt.'),
    block('017f7b7d4cdc', 'Hugsaðu um PMS-kerfið þitt sem miðtaugakerfi hótelsins þíns. Þegar sölukerfið þitt talar nákvæmlega sama tungumál og kjarnatæknistafla þín — eins og djúp samþætting okkar við GODO-vistkerfið — smellur vinnuferlið saman. Viðbætur gesta samstillast beint við herbergisreikninginn, þrif fá samstundis viðvaranir um snemminnritanir, og starfsfólk þitt þarf ekki að lyfta fingri.'),
    block('966d2db2983b', 'Endanleg tölvupóstsröð fyrir komu', { style: 'h2' }),
    block('785e61e332d3', 'Tímasetning er lykilbreytan þegar tölvupóstar fyrir komu eru sendir út. Sendir þú á gestinn of snemma, hunsar hann skilaboðin. Sendir þú of seint, hefur hann þegar bókað ferðirnar sínar hjá samkeppnisaðila.'),
    block('5bc78d496acc', 'Hér er nákvæm þriggja-snertipunkta rammi sem við mælum með til að hámarka viðskiptahlutfall.'),
    block('e9a28c99c5bc', '1. Velkomnarpósturinn', { style: 'h3' }),
    block('aaa3edf3f85e', 'Sendur samstundis við bókun, þessi tölvupóstur er ekki tíminn fyrir árásargjarna hörku-sölu. Gesturinn afhenti nýlega greiðslukortið sitt og þráir í grunninn öryggistilfinningu. Einbeittu þér algjörlega að því að byggja upp traust og eftirvæntingu fyrir komandi ævintýri þeirra.'),
    multiSpanBlock('b3c649e5d6de', [
      { _key: '99e048f764ba', _type: 'span', marks: [], text: 'Gefðu upp nauðsynlegar bókunarupplýsingar, persónusniðin velkomnarskilaboð og lauflétta kynningu á þjónustugetu þinni. ' },
      { _key: '4c88a557839a', _type: 'span', marks: ['strong'], text: 'Sáðu hugmyndinni óformlega að þú sjáir um upplifun utan herbergisins.' },
      { _key: '76578f460f69', _type: 'span', marks: [], text: ' Láttu þá vita að þú munt hafa samband nær komu þeirra til að aðstoða við að skipuleggja ferðir eða staðbundnar veitingahúsapantanir.' },
    ]),
    block('a9d7581ced5e', '2. Skipulags- og uppfærsluátakið', { style: 'h3' }),
    block('1d3b45d999e7', 'Sendu þennan tölvupóst sjö til 10 dögum fyrir komu. Þetta er aðal tekjuvél þín. Gestir eru virkir í að skipuleggja daglegar ferðaáætlanir sínar, pakka töskunum og hafa áhyggjur af lokaatriðum ferðarinnar.'),
    block('136d9f9c7c2c', 'Sendu sjónrænt aðlaðandi tölvupóst sem býður upp á auðveldar uppfærslur. Reiddu þig á hreina hönnun og bein skilaboð til að loka sölunni.'),
    block('3dfe5bba640e', 'Bjóddu upp á þessa viðbótarþjónustu sem selst vel:', { marks: ['strong'] }),
    block('09e3ca6e1daf', 'Herbergisuppfærslur fyrir ákveðið næturverð.', { listItem: 'bullet' }),
    block('07e28658c6f6', 'Einkaflugvallaferðir til að sleppa við óreiðukennda leigubílaröðina.', { listItem: 'bullet' }),
    block('6001218433a5', 'Snemminnritun eða síðbúna útritun fyrir næturflugkomur.', { listItem: 'bullet' }),
    block('14192f3af9d4', '3. Áminningin á síðustu stundu', { style: 'h3' }),
    block('64b83f57e379', 'Sendu þessi skilaboð 48 klukkustundum fyrir innritun til að ná hvatvísum ákvörðunum. Gestir eru þessa stundina að stara á veðurforritin sín og ganga frá tafarlausum áætlunum sínum.'),
    block('4c5c8f6bfb9f', 'Hafðu þessi samskipti ótrúlega stutt og farsímavæn. Einbeittu þér algjörlega að staðbundnum, háframlegðar vörum. Bjóddu upp á vínflösku inni á herbergi við komu, hágæða staðbundinn morgunverðarauka, eða tryggða borðapöntun á vinsæla veitingastaðnum þínum á staðnum.'),
    block('972f22945f87', 'Settu saman ekta staðbundna upplifun', { style: 'h2' }),
    block('a32928b267a3', 'Þú þarft ekki risastórt spa á staðnum eða einkabílaflota af lúxus jeppum til að byrja að selja meira. Þú þarft bara réttu staðbundnu samstarfsaðilana.'),
    block('fc34d71f6d25', 'Ferðaþjónustuhagkerfi Íslands reiðir sig mikið á vistvæna ferðamennsku, jöklaævintýri og jarðhitaupplifun. Við mælum með að byggja upp bein tengsl við virta, staðbundna ferðaþjónustuaðila sem sérhæfa sig í Gullna hringnum eða ábyrgri hvalaskoðun.'),
    block('87b6347fc5dc', 'Semdu um hagstæð þóknanakerfi þar sem eign þín fær hlutfall fyrir hverja virkni sem bókuð er í gegnum komuvettvanginn þinn. Þetta breytir hótelinu þínu algjörlega úr venjulegum svefnstað í ómissandi hluta af ferðaáætlunum þeirra.'),
    block('ab939ec25aee', 'Straumlínulagaðu rekstur og vinnuálag starfsfólks', { style: 'h2' }),
    block('c43fafbc08cd', 'Sjálfvirk viðbótarsala gerir meira en bara að skapa tekjur. Hún er mjög árangursrík stefna til að halda í starfsfólk. Ráðningar í gistiþjónustu eru erfiðar alls staðar, sérstaklega þegar jafnvægi þarf að ná milli krafna öfgakenndra háanna- og lágannatíma.'),
    block('e09ec201e3f4', 'Í hvert sinn sem komuherferðin þín vinnur sjálfkrafa úr ferðabókun eða herbergisuppfærslu, sparar þú móttökustjóranum þínum fimm mínútna símtal. Yfir annasaman sumarmánuð safnast þessar sparuðu mínútur upp í tugi endurheimtra klukkustunda.'),
    block('334e199e585c', 'Með því að gera samskipti við gesti algjörlega sjálfvirk, losar þú teymið þitt til að gera það sem þeir sömdu í raun um að gera. Þeir fá að veita framúrskarandi, augliti til auglitis gestrisni. Efldu starfsfólk þitt með nútímalegum verkfærum, og fylgstu með rekstrarringulreiðinni hverfa.'),
    block('7e313652e359', 'Reiddu þig á gagnastudda tölvupóstmarkaðssetningu', { style: 'h2' }),
    block('d5a9c1575979', 'Fylgist þú með opnunarhlutfalli, smellihlutfalli og viðskiptahlutfalli sjálfvirku raðanna þinna? Ef þú greinir ekki þessi gögn, ertu í raun að fljúga blindandi.'),
    block('9cf7693f07f6', "Nútímalegir sjálfstæðir hótelrekendur þurfa að meðhöndla beina viðbótarsölu sem þróandi, gagnadrifna vísindagrein. A/B-prófaðu viðfangsefnislínurnar þínar miskunnarlaust. Almenn viðfangsefnislína eins og 'Bættu dvölina þína í Reykjavík' gæti skilað hægfara 5% viðskiptahlutfalli. Hins vegar getur ögrandi, ávinningsdrifin lína eins og 'Sleppið leigubílaröðinni: Tryggðu Keflavíkurferðina þína í dag' auðveldlega hoppað upp í 15% viðskiptahlutfall."),
    block('3ab7c9d9eb7b', 'Notaðu samþættu tæknistaflu þína til að flokka markhópinn þinn á snjallan hátt. Einn fyrirtækjaferðalangur vill hraðvirkt Wi-Fi og hraða útritun. Fjögurra manna fjölskylda þarf sárlega rúmgóða bílaferð og barnvænar veitingatillögur. Hættu að meðhöndla afar fjölbreytta gesti þína eins og eina, einsleita persónu.'),
    block('e1e101175a31', 'Taktu aftur stjórn á lífsferli gestsins', { style: 'h2' }),
    block('3a0c3da7c23b', 'Að skapa viðbótartekjur er ekki lengur valfrjáls lúxus. Það er algjör nauðsyn til að vernda hagnaðarframlegð þína á mjög samkeppnishæfum markaði. Að bíða þangað til gesturinn stendur í anddyrinu þínu til að selja honum upplifun er hreinskilnislega of seint.'),
    block('b476930b3afb', 'Með því að innleiða samfellda viðbótarsölu-ramma, byggir þú upp tafarlaust traust fyrir dvölina og nærð mun hærra RevPAR. Það er kominn tími til að meðhöndla stafræna upplifun gesta þinna með nákvæmlega sama umhyggjustigi og þú beitir á líkamlega eign þína.'),
    block('5413a6d85068', 'Við skiljum til hlítar tæknilegu hindranirnar sem felast í því að samstilla tölvupóstshugbúnað kvikt við PMS-kerfið þitt og bókunarvél. Það er nákvæmlega þess vegna sem við byggðum Hitels. Við vinnum beint með hóteleigendum að því að útrýma tæknilegum skuldum og endurheimta arðsemi.'),
    block('7e6fcd5100fe', 'Ertu tilbúin(n) að hætta að láta OTA-síður ákvarða takmörk þín? Hafðu samband við teymið okkar í dag til að bóka kynningu, og við skulum gjörbylta fyrirtækinu þínu saman.'),
  ],
};

const mutations = [analyzedIs, boostRevparIs].map((doc) => ({ createOrReplace: doc }));

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

console.log('Seeded blog batch 6 (final): we-analyzed-300-hotel-websites, boost-revpar-upselling-ancillary-services (is). All 17 posts now have Icelandic siblings.');
