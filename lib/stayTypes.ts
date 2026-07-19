import type { Lang, Listing } from "./types";

export type Tri3 = { sr: string; en: string; de: string };

export type StayType = {
  key: string;
  slug: Tri3;
  name: Tri3;
  lead: Tri3;
  hero: string;
  /** ključne reči za prepoznavanje tipa iz naziva/opisa kada stayType nije upisan */
  match: string[];
  seo: { sr: string[]; en: string[]; de: string[] };
};

export const STAY_TYPES: StayType[] = [
  {
    key: "apartman",
    slug: { sr: "apartmani", en: "apartments", de: "apartments" },
    name: { sr: "Apartmani", en: "Apartments", de: "Apartments" },
    lead: {
      sr: "Apartmani za izdavanje širom Srbije — planine, banje, jezera i gradovi, bez provizije za gosta.",
      en: "Apartments to rent across Serbia — mountains, spas, lakes and cities, with no guest commission.",
      de: "Apartments in ganz Serbien — Berge, Kurorte, Seen und Städte, ohne Gästeprovision.",
    },
    hero: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    match: ["apartman", "apartmani", "apartment", "studio", "lux apartman"],
    seo: {
      sr: [
        "Apartman je najtraženiji tip smeštaja u Srbiji: sopstvena kuhinja, odvojena spavaća soba i sloboda da sami organizujete dan čine ga idealnim za porodice, duže boravke i putovanja sa decom. U odnosu na hotel, apartman po pravilu izlazi jeftinije po osobi, naročito kada putuje četvoro i više ljudi.",
        "Na portalu pronalazite apartmane na Zlatiboru, Kopaoniku, Tari i Divčibarama, u Vrnjačkoj Banji, Sokobanji i Banji Vrujci, uz jezera i reke, kao i u Beogradu i Novom Sadu. Svaki oglas ima cenu, kapacitet, pogodnosti i lokaciju na mapi, a upit šaljete direktno vlasniku — bez posrednika i skrivenih troškova.",
        "Pri izboru apartmana obratite pažnju na broj ležajeva i raspored soba, udaljenost od centra ili žičare, parking, klimu i da li je dozvoljen boravak ljubimaca. Za zimsku sezonu i letnje praznike rezervišite ranije — najbolji termini se popune i mesec dana unapred.",
      ],
      en: [
        "Apartments are the most sought-after type of accommodation in Serbia: a private kitchen, a separate bedroom and the freedom to plan your own day make them ideal for families, longer stays and travelling with children. Compared with a hotel, an apartment is usually cheaper per person, especially for four or more.",
        "Here you'll find apartments on Zlatibor, Kopaonik, Tara and Divčibare, in Vrnjačka Banja, Sokobanja and Banja Vrujci, by lakes and rivers, as well as in Belgrade and Novi Sad. Every listing shows price, capacity, amenities and a map location, and enquiries go straight to the owner.",
        "When choosing, check the number of beds and the room layout, distance from the centre or the ski lift, parking, air conditioning and whether pets are allowed. Book early for the ski season and summer holidays.",
      ],
      de: [
        "Apartments sind die gefragteste Unterkunftsart in Serbien: eigene Küche, separates Schlafzimmer und die Freiheit, den Tag selbst zu planen. Im Vergleich zum Hotel ist ein Apartment pro Person meist günstiger, besonders ab vier Personen.",
        "Hier finden Sie Apartments auf Zlatibor, Kopaonik, Tara und Divčibare, in Vrnjačka Banja und Sokobanja, an Seen und Flüssen sowie in Belgrad und Novi Sad. Anfragen gehen direkt an den Eigentümer.",
        "Achten Sie auf Bettenzahl und Zimmeraufteilung, Entfernung zum Zentrum oder Lift, Parkplatz, Klimaanlage und Haustierregelung. Für Skisaison und Sommerferien früh buchen.",
      ],
    },
  },
  {
    key: "soba",
    slug: { sr: "sobe", en: "rooms", de: "zimmer" },
    name: { sr: "Sobe", en: "Rooms", de: "Zimmer" },
    lead: {
      sr: "Sobe za izdavanje — najpovoljniji smeštaj za kratak boravak, dvoje i putovanja bez kuvanja.",
      en: "Rooms to rent — the most affordable option for short stays, couples and travel without cooking.",
      de: "Zimmer zur Miete — die günstigste Option für Kurzaufenthalte und Paare.",
    },
    hero: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80",
    match: ["soba", "sobe", "room", "rooms", "prenoćište", "prenociste", "guest house", "pansion"],
    seo: {
      sr: [
        "Iznajmljivanje sobe je najjeftiniji način da prenoćite u banji, na planini ili u gradu. Sobe su idealne za parove, poslovna putovanja i za usputno noćenje kada ste na proputovanju — u banjama često dolaze i sa mogućnošću pansiona ili polupansiona.",
        "Ponudu soba naći ćete u Vrnjačkoj Banji, Sokobanji, Banji Koviljači i Prolom Banji, ali i na Zlatiboru, Kopaoniku i u većim gradovima. Mnoge sobe imaju sopstveno kupatilo, klimu i zajedničku kuhinju, uz cenu koja je često upola manja od apartmana.",
        "Pre rezervacije proverite da li je kupatilo u sobi ili zajedničko, da li cena uključuje boravišnu taksu i doručak, i koliko je do centra ili do izvora mineralne vode.",
      ],
      en: [
        "Renting a room is the cheapest way to spend a night in a spa town, in the mountains or in a city. Rooms suit couples, business trips and overnight stops — in spa towns they often come with half or full board.",
        "You'll find rooms in Vrnjačka Banja, Sokobanja, Banja Koviljača and Prolom Banja, as well as on Zlatibor, Kopaonik and in larger cities. Many have a private bathroom, air conditioning and a shared kitchen, at roughly half the price of an apartment.",
        "Before booking, check whether the bathroom is private or shared, whether the price includes the tourist tax and breakfast, and how far it is to the centre.",
      ],
      de: [
        "Ein Zimmer zu mieten ist die günstigste Übernachtung in Kurorten, in den Bergen oder in der Stadt. Ideal für Paare, Geschäftsreisen und Zwischenstopps; in Kurorten oft mit Halb- oder Vollpension.",
        "Zimmer gibt es in Vrnjačka Banja, Sokobanja, Banja Koviljača und Prolom Banja sowie auf Zlatibor, Kopaonik und in größeren Städten — meist zum halben Apartmentpreis.",
        "Prüfen Sie vor der Buchung, ob das Bad privat oder geteilt ist und ob Kurtaxe und Frühstück enthalten sind.",
      ],
    },
  },
  {
    key: "brvnara",
    slug: { sr: "brvnare-i-kolibe", en: "log-cabins", de: "blockhuetten" },
    name: { sr: "Brvnare i kolibe", en: "Log cabins", de: "Blockhütten" },
    lead: {
      sr: "Drvene brvnare i kolibe u prirodi — miran odmor, kamin, roštilj i pogled na planinu.",
      en: "Wooden cabins in nature — quiet holidays with a fireplace, barbecue and mountain views.",
      de: "Holzhütten in der Natur — ruhiger Urlaub mit Kamin, Grill und Bergblick.",
    },
    hero: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=1600&q=80",
    match: ["brvnara", "brvnare", "koliba", "kolibe", "cabin", "chalet", "log"],
    seo: {
      sr: [
        "Brvnare su poslednjih godina najbrže rastuća kategorija smeštaja u Srbiji. Drvo, kamin, đakuzi na terasi i tišina bez suseda odgovaraju parovima na romantičnom bekstvu, ali i porodicama koje žele da deca provedu vikend napolju umesto u hotelskom hodniku.",
        "Najviše brvnara nalazi se na Zlatiboru, Tari, Divčibarama, Goliji i Staroj planini, kao i uz Drinu i Uvac. Većina ima potpuno opremljenu kuhinju, roštilj ili letnjikovac i parking uz sam objekat, a mnoge primaju i ljubimce.",
        "Za zimske praznike i produžene vikende brvnare se rezervišu mesecima unapred. Proverite da li je grejanje na drva ili struju, da li je pristupni put prohodan zimi i da li je potreban terenski automobil.",
      ],
      en: [
        "Log cabins are the fastest-growing accommodation category in Serbia. Timber, a fireplace, a hot tub on the deck and silence without neighbours suit couples on a romantic escape as much as families who want their children outdoors.",
        "Most cabins are on Zlatibor, Tara, Divčibare, Golija and Stara Planina, and along the Drina and Uvac. Nearly all have a fully equipped kitchen, a barbecue or gazebo and parking at the door, and many accept pets.",
        "For winter holidays and long weekends cabins are booked months ahead. Check whether heating is wood or electric, whether the access road is cleared in winter and whether a 4x4 is needed.",
      ],
      de: [
        "Blockhütten sind die am schnellsten wachsende Unterkunftskategorie in Serbien: Holz, Kamin, Whirlpool auf der Terrasse und Stille ohne Nachbarn.",
        "Die meisten Hütten stehen auf Zlatibor, Tara, Divčibare, Golija und der Stara Planina sowie an Drina und Uvac — mit Küche, Grill und Parkplatz, oft haustierfreundlich.",
        "Für Winterferien Monate im Voraus buchen. Prüfen Sie Heizung, Zufahrt im Winter und ob ein Geländewagen nötig ist.",
      ],
    },
  },
  {
    key: "vikendica",
    slug: { sr: "vikendice", en: "holiday-cottages", de: "ferienhaeuser" },
    name: { sr: "Vikendice", en: "Holiday cottages", de: "Ferienhäuser" },
    lead: {
      sr: "Vikendice za izdavanje na planini, uz reku i jezero — ceo objekat samo za vaše društvo.",
      en: "Holiday cottages in the mountains, by rivers and lakes — the whole place just for your group.",
      de: "Ferienhäuser in den Bergen, an Flüssen und Seen — das ganze Objekt für Ihre Gruppe.",
    },
    hero: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
    match: ["vikendica", "vikendice", "cottage", "vikend kuća", "vikend kuca"],
    seo: {
      sr: [
        "Vikendica je izbor za društva i porodice koje žele ceo objekat, dvorište i slobodu — bez zajedničkih hodnika i recepcije. Najam se najčešće naplaćuje po objektu, a ne po osobi, pa cena po glavi brzo pada kada vas je više.",
        "Najviše vikendica ima uz Drinu i Perućac, na Zlatiboru i Tari, na Divčibarama i Rudniku, uz Srebrno jezero i na Fruškoj gori. Standardno dolaze sa kuhinjom, roštiljem, parkingom i dvorištem, a sve češće i sa bazenom ili đakuzijem.",
        "Kod vikendica obavezno proverite minimalan broj noćenja (često dva ili tri za vikend), depozit i pravila oko slavlja i grupa — mnogi vlasnici ne primaju momačke i devojačke večeri.",
      ],
      en: [
        "A cottage is the choice for groups and families who want the whole place, a yard and freedom — no shared corridors or reception. Rentals are usually priced per property rather than per person, so the cost per head drops quickly.",
        "Most cottages are along the Drina and Perućac, on Zlatibor and Tara, at Divčibare and Rudnik, by Silver Lake and on Fruška Gora. They come with a kitchen, barbecue, parking and a yard, and increasingly with a pool or hot tub.",
        "Always check the minimum stay (often two or three nights at weekends), the deposit and rules about parties and groups — many owners do not accept stag or hen nights.",
      ],
      de: [
        "Ein Ferienhaus ist die Wahl für Gruppen und Familien, die das ganze Objekt mit Hof und Freiheit wollen. Der Preis gilt meist pro Objekt statt pro Person.",
        "Die meisten Ferienhäuser liegen an Drina und Perućac, auf Zlatibor und Tara, in Divčibare, am Silbersee und auf der Fruška Gora — mit Küche, Grill, Parkplatz und Hof.",
        "Prüfen Sie Mindestaufenthalt, Kaution und Regeln zu Feiern und Gruppen.",
      ],
    },
  },
  {
    key: "kuca",
    slug: { sr: "kuce-za-izdavanje", en: "houses-for-rent", de: "haeuser-zur-miete" },
    name: { sr: "Kuće za izdavanje", en: "Houses for rent", de: "Häuser zur Miete" },
    lead: {
      sr: "Kuće za veće grupe i porodice — više spavaćih soba, dvorište i privatnost.",
      en: "Houses for larger groups and families — several bedrooms, a yard and privacy.",
      de: "Häuser für größere Gruppen und Familien — mehrere Schlafzimmer, Hof und Privatsphäre.",
    },
    hero: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    match: ["kuća", "kuca", "house", "villa", "vila"],
    seo: {
      sr: [
        "Kada putuje više porodica zajedno ili se okuplja veće društvo, kuća za izdavanje je jedini smeštaj koji sve drži na jednom mestu. Tri do pet spavaćih soba, velika trpezarija, dvorište i roštilj — često i bazen — daju komfor koji hotel ne može da ponudi.",
        "Kuće se izdaju širom Srbije, a najtraženije su na Zlatiboru, Tari, Divčibarama, u okolini Vrnjačke Banje i uz Dunav i Drinu. Cena se računa po objektu, uz depozit koji se vraća po odlasku.",
        "Za grupe veće od deset osoba javite se vlasniku ranije i unapred se dogovorite o pravilima — glasnoj muzici, ložištu, korišćenju bazena i broju vozila na parkingu.",
      ],
      en: [
        "When several families travel together, a rental house is the only accommodation that keeps everyone in one place. Three to five bedrooms, a large dining room, a yard and a barbecue — often a pool too — offer comfort no hotel can match.",
        "Houses are rented across Serbia, most in demand on Zlatibor, Tara, Divčibare, around Vrnjačka Banja and along the Danube and Drina. Prices are per property, with a refundable deposit.",
        "For groups above ten people, contact the owner early and agree the rules in advance — music, the fireplace, pool use and the number of cars.",
      ],
      de: [
        "Wenn mehrere Familien gemeinsam reisen, hält nur ein Mietshaus alle an einem Ort: drei bis fünf Schlafzimmer, großer Essbereich, Hof und Grill, oft auch Pool.",
        "Häuser gibt es in ganz Serbien, besonders gefragt auf Zlatibor, Tara, Divčibare und entlang von Donau und Drina. Preis pro Objekt, mit Kaution.",
        "Bei Gruppen über zehn Personen frühzeitig Kontakt aufnehmen und Regeln absprechen.",
      ],
    },
  },
  {
    key: "hotel",
    slug: { sr: "hoteli", en: "hotels", de: "hotels" },
    name: { sr: "Hoteli", en: "Hotels", de: "Hotels" },
    lead: {
      sr: "Hoteli, garni hoteli i banjski hoteli — pansion, wellness i usluga bez brige o obrocima.",
      en: "Hotels, guest hotels and spa hotels — board, wellness and no worries about meals.",
      de: "Hotels, Garni- und Kurhotels — Verpflegung, Wellness und keine Sorge um Mahlzeiten.",
    },
    hero: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    match: ["hotel", "garni", "resort"],
    seo: {
      sr: [
        "Hotel je izbor kada želite uslugu bez organizacije: doručak ili pun pansion, spremanje soba, recepciju 24 sata i wellness centar u istoj zgradi. U banjama hotelski smeštaj podrazumeva i terapije, lekarski pregled i medicinski program.",
        "Najviše hotela nalazi se u Vrnjačkoj Banji, Sokobanji, na Kopaoniku i Zlatiboru, kao i u Beogradu i Novom Sadu. Cene su više nego kod privatnog smeštaja, ali uključuju obroke, što na duži boravak izjednačava razliku.",
        "Prilikom rezervacije proverite šta tačno uključuje pansion, da li se boravišna taksa plaća posebno i da li su bazen i wellness uključeni u cenu ili se doplaćuju.",
      ],
      en: [
        "A hotel is the choice when you want service without organising anything: breakfast or full board, housekeeping, a 24-hour reception and a wellness centre in the same building. In spa towns, hotels also include therapies and medical programmes.",
        "Most hotels are in Vrnjačka Banja, Sokobanja, on Kopaonik and Zlatibor, and in Belgrade and Novi Sad. Prices are higher than private accommodation but include meals, which evens out over a longer stay.",
        "When booking, check exactly what the board includes, whether the tourist tax is charged separately and whether the pool and wellness are included or extra.",
      ],
      de: [
        "Ein Hotel ist die Wahl für Service ohne Organisation: Frühstück oder Vollpension, Zimmerservice, 24-Stunden-Rezeption und Wellness im Haus. In Kurorten kommen Therapien hinzu.",
        "Die meisten Hotels stehen in Vrnjačka Banja, Sokobanja, auf Kopaonik und Zlatibor sowie in Belgrad und Novi Sad.",
        "Prüfen Sie beim Buchen den Verpflegungsumfang, die Kurtaxe und ob Pool und Wellness inbegriffen sind.",
      ],
    },
  },
  {
    key: "seosko",
    slug: { sr: "seoski-turizam", en: "rural-tourism", de: "landtourismus" },
    name: { sr: "Seoski turizam", en: "Rural tourism", de: "Landtourismus" },
    lead: {
      sr: "Seoska domaćinstva i etno kuće — domaća hrana, životinje, rakija i pravi mir.",
      en: "Farm stays and ethno houses — home-cooked food, animals, rakija and real quiet.",
      de: "Bauernhöfe und Ethno-Häuser — Hausmannskost, Tiere und echte Ruhe.",
    },
    hero: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    match: ["seosko", "domaćinstvo", "domacinstvo", "etno", "salaš", "salas", "farm", "konak"],
    seo: {
      sr: [
        "Seoski turizam je odgovor na potrebu za odmorom bez gužve: domaćinstvo sa nekoliko soba, doručak od svojih proizvoda, bašta, voćnjak i domaćini koji vas zovu za sto. Za decu iz grada, susret sa kravama, kokoškama i traktorom vredi više od bilo kog akva-parka.",
        "Najrazvijeniji je u Zapadnoj Srbiji (okolina Zlatibora, Tare, Valjeva i Ivanjice), u Šumadiji, na Fruškoj gori i na salašima u Vojvodini. Mnoga domaćinstva nude i pun pansion po ceni koja je znatno niža od hotelske.",
        "Ako putujete sa decom, pitajte domaćina za igralište, životinje i mogućnost učešća u poslovima na imanju; ako idete zbog mira, proverite udaljenost od glavnog puta i kvalitet interneta.",
      ],
      en: [
        "Rural tourism answers the need for a holiday without crowds: a homestead with a few rooms, breakfast from its own produce, a garden, an orchard and hosts who call you to the table. For city children, meeting cows, hens and a tractor beats any water park.",
        "It is most developed in Western Serbia (around Zlatibor, Tara, Valjevo and Ivanjica), in Šumadija, on Fruška Gora and on the farmsteads of Vojvodina. Many homesteads offer full board at well below hotel prices.",
        "Travelling with children, ask about a playground, the animals and joining in the farm work; going for the quiet, check the distance from the main road and the internet.",
      ],
      de: [
        "Landtourismus ist die Antwort auf Urlaub ohne Andrang: ein Hof mit wenigen Zimmern, Frühstück aus eigener Erzeugung, Garten, Obstgarten und Gastgeber, die zu Tisch bitten.",
        "Am stärksten entwickelt in Westserbien (Zlatibor, Tara, Valjevo, Ivanjica), in der Šumadija, auf der Fruška Gora und auf den Salaši der Vojvodina — oft mit Vollpension.",
        "Mit Kindern nach Spielplatz und Tieren fragen; wer Ruhe sucht, prüft die Entfernung zur Hauptstraße.",
      ],
    },
  },
];

export const stayTypeByKey = (k?: string | null) => STAY_TYPES.find((x) => x.key === k);
export const stayTypeBySlug = (slug: string) =>
  STAY_TYPES.find((x) => x.slug.sr === slug || x.slug.en === slug || x.slug.de === slug);
export const stayTypePath = (st: StayType, l: Lang) =>
  l === "sr" ? `/${st.slug.sr}` : l === "de" ? `/de/${st.slug.de}` : `/en/${st.slug.en}`;
export const stayTypeName = (st: StayType, l: Lang) => (l === "sr" ? st.name.sr : l === "de" ? st.name.de : st.name.en);
export const stayTypeLead = (st: StayType, l: Lang) => (l === "sr" ? st.lead.sr : l === "de" ? st.lead.de : st.lead.en);
export const stayTypeSeo = (st: StayType, l: Lang) => (l === "sr" ? st.seo.sr : l === "de" ? st.seo.de : st.seo.en);

/** Filtrira smeštaj po tipu; ako oglas nema upisan stayType, pokušava po ključnim rečima. */
export function filterByStayType(all: Listing[], st: StayType): Listing[] {
  const stays = all.filter((x) => x.type === "stay");
  const exact = stays.filter((x) => x.stayType === st.key);
  if (exact.length) return exact;
  const hay = (x: Listing) => `${x.name.sr} ${x.name.en} ${x.short.sr} ${x.desc.sr}`.toLowerCase();
  return stays.filter((x) => !x.stayType && st.match.some((m) => hay(x).includes(m)));
}
