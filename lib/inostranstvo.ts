import type { Lang } from "./types";

export type Tri = { sr: string; en: string; de: string };
export type TriList = { sr: string[]; en: string[]; de: string[] };
export type Spot = { name: Tri; text: Tri };
export type Qa = { q: string; a: string };

export type Country = {
  id: string;
  slug: Tri;
  name: Tri;
  flag: string;
  hero: string;
  lead: Tri;
  intro: TriList;
  spots: Spot[];
  when: Tri;
  travel: Tri;
  docs: Tri;
  faq: { sr: Qa[]; en: Qa[]; de: Qa[] };
};

export const inoIndexPath = (l: Lang) =>
  l === "sr" ? "/inostranstvo" : l === "de" ? "/de/ausland" : "/en/abroad";

export const countryPath = (c: Country, l: Lang) =>
  l === "sr" ? `/${c.slug.sr}` : l === "de" ? `/de/${c.slug.de}` : `/en/${c.slug.en}`;

export const tri = (t: Tri, l: Lang) => (l === "sr" ? t.sr : l === "de" ? t.de : t.en);
export const triL = (t: TriList, l: Lang) => (l === "sr" ? t.sr : l === "de" ? t.de : t.en);

export const COUNTRIES: Country[] = [
  {
    id: "grcka",
    slug: { sr: "grcka", en: "greece", de: "griechenland" },
    name: { sr: "Grčka", en: "Greece", de: "Griechenland" },
    flag: "🇬🇷",
    hero: "https://images.unsplash.com/photo-1503152394-c571994fd383?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "Najomiljenija letnja destinacija Srba — Halkidiki, Olimpska regija, Tasos, Krf i Krit.",
      en: "The favourite summer destination of Serbian travellers — Halkidiki, the Olympic Riviera, Thassos, Corfu and Crete.",
      de: "Das beliebteste Sommerziel serbischer Reisender — Chalkidiki, Olympische Riviera, Thassos, Korfu und Kreta.",
    },
    intro: {
      sr: [
        "Grčka je decenijama prva asocijacija na letovanje kod nas — dovoljno blizu da se stigne autom preko noći, a dovoljno različita da svaki dolazak deluje kao pravo putovanje. Kombinacija bistrog mora, pristupačnih cena, poznate kuhinje i gostoprimstva domaćina čini je destinacijom kojoj se porodice vraćaju iz godine u godinu.",
        "Kopneni deo Grčke najbliži je Srbiji: Halkidiki sa tri „prsta\" (Kasandra, Sitonija i Atos), Olimpska regija sa Paralijom i Nea Vrasnom, kao i Stavros i Asprovalta. Ostrva donose drugačiji ritam — Tasos je najbliži i zeleni, Krf najzeleniji i najvenecijanskiji, Krit najveći i najraznovrsniji, a Santorini i Mikonos su destinacije za pamćenje pre nego za jeftin odmor.",
        "Ovo je vodič, ne ponuda smeštaja: ovde ćete naći gde ići, kada ići i šta očekivati. Smeštaj i aranžmane rezervišite kod turističkih agencija ili direktno kod grčkih domaćina.",
      ],
      en: [
        "Greece has been the default summer holiday for the region for decades — close enough to reach by car overnight, yet different enough that every arrival feels like a real journey. Clear seas, affordable prices, familiar food and warm hosts keep families coming back year after year.",
        "The mainland is closest to Serbia: Halkidiki with its three 'fingers' (Kassandra, Sithonia and Athos), the Olympic Riviera with Paralia and Nea Vrasna, plus Stavros and Asprovalta. The islands set a different rhythm — Thassos is the nearest and greenest, Corfu the most Venetian, Crete the largest and most varied, while Santorini and Mykonos are destinations to remember rather than budget escapes.",
        "This is a guide, not an accommodation offer: here you'll find where to go, when to go and what to expect. Book stays and packages through travel agencies or directly with Greek hosts.",
      ],
      de: [
        "Griechenland ist seit Jahrzehnten das klassische Sommerziel der Region — nah genug, um über Nacht mit dem Auto anzukommen, und doch anders genug, dass jede Ankunft wie eine echte Reise wirkt. Klares Meer, faire Preise, vertraute Küche und herzliche Gastgeber lassen Familien Jahr für Jahr wiederkommen.",
        "Das Festland liegt Serbien am nächsten: Chalkidiki mit seinen drei „Fingern\" (Kassandra, Sithonia und Athos), die Olympische Riviera mit Paralia und Nea Vrasna sowie Stavros und Asprovalta. Die Inseln haben einen anderen Rhythmus — Thassos ist die nächste und grünste, Korfu die venezianischste, Kreta die größte und vielfältigste, während Santorini und Mykonos eher Erinnerungs- als Sparziele sind.",
        "Dies ist ein Reiseführer, kein Unterkunftsangebot: Hier finden Sie, wohin und wann Sie fahren sollten. Unterkünfte buchen Sie über Reisebüros oder direkt bei griechischen Gastgebern.",
      ],
    },
    spots: [
      {
        name: { sr: "Halkidiki (Kasandra i Sitonija)", en: "Halkidiki (Kassandra & Sithonia)", de: "Chalkidiki (Kassandra & Sithonia)" },
        text: {
          sr: "Najtraženiji deo Grčke za odmor iz Srbije. Kasandra je razvijenija, sa više sadržaja, restorana i noćnog života (Hanioti, Pefkohori, Nea Potidea). Sitonija je divlja i slikovitija, sa uvalama poput Kalogrije, Armenistisa i Vurvuru koje se često proglašavaju najlepšim u Egeju.",
          en: "The most sought-after part of Greece for travellers from Serbia. Kassandra is more developed, with more restaurants and nightlife (Hanioti, Pefkohori, Nea Potidea). Sithonia is wilder and more scenic, with coves such as Kalogria, Armenistis and Vourvourou often named the finest in the Aegean.",
          de: "Der gefragteste Teil Griechenlands für Reisende aus Serbien. Kassandra ist stärker erschlossen, mit mehr Restaurants und Nachtleben (Hanioti, Pefkochori, Nea Potidea). Sithonia ist wilder und malerischer, mit Buchten wie Kalogria, Armenistis und Vourvourou.",
        },
      },
      {
        name: { sr: "Olimpska regija — Paralija, Olimpik Bič, Leptokarija", en: "Olympic Riviera — Paralia, Olympic Beach, Leptokarya", de: "Olympische Riviera — Paralia, Olympic Beach, Leptokarya" },
        text: {
          sr: "Najbliža morska destinacija za putnike iz Srbije i klasičan izbor za prvo letovanje sa decom: duge peščane plaže, plitko more, šetališta puna kafića i prodavnica, sve u senci Olimpa.",
          en: "The closest seaside for travellers from Serbia and a classic first family holiday: long sandy beaches, shallow water and promenades full of cafés and shops, all in the shadow of Mount Olympus.",
          de: "Das nächstgelegene Meer für Reisende aus Serbien und ein Klassiker für den ersten Familienurlaub: lange Sandstrände, flaches Wasser und Promenaden voller Cafés, im Schatten des Olymp.",
        },
      },
      {
        name: { sr: "Tasos", en: "Thassos", de: "Thassos" },
        text: {
          sr: "„Zeleno ostrvo\" na svega sat vremena trajektom iz Keramotija. Borove šume izlaze na more, a plaže Golden Bič, Paradajz i Marble Bič spadaju u najlepše u severnoj Grčkoj. Idealno za obilazak automobilom u krug.",
          en: "The 'green island', just an hour by ferry from Keramoti. Pine forests reach the sea, and Golden Beach, Paradise and Marble Beach are among the finest in northern Greece. Perfect for a drive around the island.",
          de: "Die „grüne Insel\", nur eine Fährstunde von Keramoti entfernt. Kiefernwälder reichen bis ans Meer, und Golden Beach, Paradise und Marble Beach zählen zu den schönsten Nordgriechenlands.",
        },
      },
      {
        name: { sr: "Krf", en: "Corfu", de: "Korfu" },
        text: {
          sr: "Najzelenije jonsko ostrvo, sa venecijanskom starom varoši pod zaštitom UNESCO-a, uvalama Palaokastrice i Kanalom ljubavi. Nešto duži put, ali potpuno drugačiji doživljaj od Egeja.",
          en: "The greenest Ionian island, with a UNESCO-protected Venetian old town, the coves of Paleokastritsa and the Canal d'Amour. A longer drive, but a completely different feel from the Aegean.",
          de: "Die grünste Ionische Insel, mit UNESCO-geschützter venezianischer Altstadt, den Buchten von Paleokastritsa und dem Kanal der Liebe.",
        },
      },
      {
        name: { sr: "Krit i Rodos", en: "Crete & Rhodes", de: "Kreta & Rhodos" },
        text: {
          sr: "Za odmor od deset dana i više, uz let: Krit nudi Knosos, Samarijsku klisuru i Elafonisi sa ružičastim peskom, dok Rodos spaja srednjovekovni Stari grad i duga kupališta. Sezona traje i do sredine oktobra.",
          en: "For ten days or more, with a flight: Crete offers Knossos, the Samaria Gorge and pink-sand Elafonisi, while Rhodes combines a medieval Old Town with long beaches. The season lasts into mid-October.",
          de: "Für zehn Tage und mehr, mit Flug: Kreta bietet Knossos, die Samaria-Schlucht und das rosa Elafonisi, Rhodos verbindet mittelalterliche Altstadt mit langen Stränden. Saison bis Mitte Oktober.",
        },
      },
    ],
    when: {
      sr: "Sezona traje od sredine maja do početka oktobra. Jun i septembar nose najbolji odnos cene, temperature i gužve — more je toplo, a plaže poluprazne. Jul i avgust su najtopliji i najskuplji, sa temperaturama koje često prelaze 35 °C.",
      en: "The season runs from mid-May to early October. June and September offer the best balance of price, temperature and crowds — the sea is warm and the beaches half empty. July and August are hottest and most expensive, often above 35 °C.",
      de: "Die Saison läuft von Mitte Mai bis Anfang Oktober. Juni und September bieten das beste Verhältnis aus Preis, Temperatur und Andrang. Juli und August sind am heißesten und teuersten, oft über 35 °C.",
    },
    travel: {
      sr: "Autom preko graničnog prelaza Evzoni (Gevgelija) do Paralije je oko 600 km od Beograda, do Halkidikija oko 650 km. U sezoni računajte na čekanje na granici, posebno vikendom. Avionom se leti do Soluna, Krfa, Krita i Rodosa, sa direktnim čarter linijama iz Beograda i Niša tokom leta.",
      en: "By car via the Evzoni (Gevgelija) crossing it is about 600 km from Belgrade to Paralia and around 650 km to Halkidiki. Expect border queues in season, especially at weekends. Flights serve Thessaloniki, Corfu, Crete and Rhodes, with summer charters from Belgrade and Niš.",
      de: "Mit dem Auto über den Grenzübergang Evzoni sind es von Belgrad rund 600 km nach Paralia und etwa 650 km nach Chalkidiki. In der Saison ist mit Wartezeiten zu rechnen. Flüge gehen nach Thessaloniki, Korfu, Kreta und Rhodos.",
    },
    docs: {
      sr: "Za državljane Srbije viza nije potrebna za boravak do 90 dana u periodu od 180 dana; putuje se sa biometrijskim pasošem. Za vožnju sopstvenim automobilom obavezno je zeleno kartonsko osiguranje. Proverite aktuelna pravila pre puta na sajtu Ministarstva spoljnih poslova.",
      en: "Serbian citizens do not need a visa for stays of up to 90 days within 180 days; travel with a biometric passport. Green Card insurance is required when driving your own car. Check current rules before departure.",
      de: "Serbische Staatsbürger benötigen für Aufenthalte bis 90 Tage innerhalb von 180 Tagen kein Visum; Reisen mit biometrischem Pass. Für die Fahrt mit dem eigenen Auto ist die Grüne Karte erforderlich.",
    },
    faq: {
      sr: [
        { q: "Koliko treba do Grčke autom iz Beograda?", a: "Do Paralije oko 7–8 sati vožnje bez većih zadržavanja, do Halkidikija oko 8–9 sati. Vreme na granici u vrhuncu sezone može dodati još nekoliko sati, pa mnogi kreću noću." },
        { q: "Koje je more toplije — Egejsko ili Jonsko?", a: "Egejsko more (Halkidiki, Olimpska regija, Tasos) obično je nešto toplije i mirnije, dok Jonsko (Krf, Lefkada) ima bistriju vodu i jače talase kada duva." },
        { q: "Da li je Grčka skupa za odmor?", a: "Kopneni deo i severna ostrva ostaju pristupačni — obrok u taverni je uporediv sa restoranom u Srbiji. Santorini, Mikonos i Kiklade su znatno skuplji." },
        { q: "Da li je potrebna viza za Grčku?", a: "Nije za državljane Srbije, uz biometrijski pasoš i boravak do 90 dana u 180 dana." },
      ],
      en: [
        { q: "How long is the drive to Greece from Belgrade?", a: "Around 7–8 hours to Paralia and 8–9 to Halkidiki without long stops. Border waits in peak season can add several hours, so many travellers set off at night." },
        { q: "Which sea is warmer — the Aegean or the Ionian?", a: "The Aegean (Halkidiki, Olympic Riviera, Thassos) is usually a little warmer and calmer, while the Ionian (Corfu, Lefkada) has clearer water and stronger waves when the wind picks up." },
        { q: "Is Greece expensive?", a: "The mainland and northern islands stay affordable — a taverna meal is comparable to a restaurant in Serbia. Santorini, Mykonos and the Cyclades are considerably pricier." },
        { q: "Do Serbian citizens need a visa?", a: "No — up to 90 days within 180 days with a biometric passport." },
      ],
      de: [
        { q: "Wie lange dauert die Fahrt von Belgrad nach Griechenland?", a: "Etwa 7–8 Stunden nach Paralia und 8–9 nach Chalkidiki ohne längere Pausen. Grenzwartezeiten in der Hochsaison können mehrere Stunden hinzufügen." },
        { q: "Welches Meer ist wärmer — die Ägäis oder das Ionische Meer?", a: "Die Ägäis ist meist etwas wärmer und ruhiger, das Ionische Meer hat klareres Wasser und bei Wind stärkeren Wellengang." },
        { q: "Ist Griechenland teuer?", a: "Festland und Nordinseln bleiben erschwinglich. Santorini, Mykonos und die Kykladen sind deutlich teurer." },
        { q: "Brauchen serbische Staatsbürger ein Visum?", a: "Nein — bis zu 90 Tage innerhalb von 180 Tagen mit biometrischem Pass." },
      ],
    },
  },

  {
    id: "crna-gora",
    slug: { sr: "crna-gora", en: "montenegro", de: "montenegro" },
    name: { sr: "Crna Gora", en: "Montenegro", de: "Montenegro" },
    flag: "🇲🇪",
    hero: "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "More na 500 km od Beograda — Budva, Boka Kotorska, Ada Bojana i Durmitor.",
      en: "The sea just 500 km from Belgrade — Budva, the Bay of Kotor, Ada Bojana and Durmitor.",
      de: "Das Meer nur 500 km von Belgrad — Budva, Bucht von Kotor, Ada Bojana und Durmitor.",
    },
    intro: {
      sr: [
        "Crna Gora je najbliže more za putnike iz Srbije i jedina destinacija u kojoj se za jedan dan mogu videti i kanjon i plaža. Nema jezičke barijere, nema vize, a valuta je evro — zbog toga je izbor broj jedan za kratke odmore, produžene vikende i prvo more sa decom.",
        "Primorje se deli na tri celine: Boka Kotorska sa fjordovskim pejzažom i kamenim gradovima (Kotor, Perast, Herceg Novi), središnji deo sa Budvom, Bečićima i Svetim Stefanom, i jug sa Barom, Ulcinjem i Velikom plažom, gde je more najtoplije, a plaže peščane.",
        "Unutrašnjost je zasebna destinacija: Durmitor i kanjon Tare nude rafting, planinarenje i letnje temperature koje se lako podnose, dok su Skadarsko jezero i Lovćen idealni za jednodnevne izlete sa mora.",
      ],
      en: [
        "Montenegro is the closest sea for travellers from Serbia and the only destination where you can see a canyon and a beach on the same day. No language barrier, no visa and the euro as currency make it the top choice for short breaks, long weekends and a first seaside trip with children.",
        "The coast splits into three parts: the Bay of Kotor with its fjord-like scenery and stone towns (Kotor, Perast, Herceg Novi); the centre with Budva, Bečići and Sveti Stefan; and the south with Bar, Ulcinj and Velika Plaža, where the sea is warmest and the beaches sandy.",
        "The interior is a destination in itself: Durmitor and the Tara canyon offer rafting and hiking with bearable summer temperatures, while Lake Skadar and Lovćen make easy day trips from the coast.",
      ],
      de: [
        "Montenegro ist das nächstgelegene Meer für Reisende aus Serbien und das einzige Ziel, an dem man an einem Tag Canyon und Strand sehen kann. Keine Sprachbarriere, kein Visum und der Euro als Währung machen es zur ersten Wahl für Kurzurlaube.",
        "Die Küste gliedert sich in drei Teile: die Bucht von Kotor mit fjordartiger Landschaft und Steinstädten (Kotor, Perast, Herceg Novi), die Mitte mit Budva, Bečići und Sveti Stefan sowie den Süden mit Bar, Ulcinj und Velika Plaža, wo das Meer am wärmsten und die Strände sandig sind.",
        "Das Landesinnere ist ein eigenes Ziel: Durmitor und der Tara-Canyon bieten Rafting und Wandern, Skadar-See und Lovćen eignen sich für Tagesausflüge von der Küste.",
      ],
    },
    spots: [
      {
        name: { sr: "Budva i Budvanska rivijera", en: "Budva & the Budva Riviera", de: "Budva & Budva-Riviera" },
        text: {
          sr: "Centar letnjeg života: Stari grad pod bedemima, Slovenska plaža, Bečići i Rafailovići, uz najbogatiju ponudu restorana i noćnog života na crnogorskom primorju. U julu i avgustu očekujte gužvu i najviše cene.",
          en: "The heart of the summer scene: the walled Old Town, Slovenska beach, Bečići and Rafailovići, with the richest choice of restaurants and nightlife on the coast. Expect crowds and top prices in July and August.",
          de: "Zentrum des Sommerlebens: die ummauerte Altstadt, der Strand Slovenska, Bečići und Rafailovići, mit der größten Auswahl an Restaurants und Nachtleben.",
        },
      },
      {
        name: { sr: "Boka Kotorska — Kotor, Perast, Herceg Novi", en: "Bay of Kotor — Kotor, Perast, Herceg Novi", de: "Bucht von Kotor — Kotor, Perast, Herceg Novi" },
        text: {
          sr: "Zaliv pod zaštitom UNESCO-a, sa mediteranskim gradovima ispod strmih planina. Kotorske bedeme vredi popeti rano ujutru, a Perast i Gospa od Škrpjela su najlepši kadar crnogorskog primorja.",
          en: "A UNESCO-protected bay with Mediterranean towns beneath steep mountains. Climb Kotor's walls early in the morning; Perast and Our Lady of the Rocks are the coast's finest view.",
          de: "Eine UNESCO-geschützte Bucht mit mediterranen Städten unter steilen Bergen. Die Stadtmauern von Kotor lohnen früh am Morgen; Perast und Gospa od Škrpjela sind das schönste Motiv.",
        },
      },
      {
        name: { sr: "Ulcinj, Velika plaža i Ada Bojana", en: "Ulcinj, Velika Plaža & Ada Bojana", de: "Ulcinj, Velika Plaža & Ada Bojana" },
        text: {
          sr: "Trinaest kilometara peska, plitko i najtoplije more u zemlji i lekoviti mulj — najbolji izbor za porodice sa malom decom i za kajt-surfere. Ada Bojana je poznata po ribljim restoranima na splavovima.",
          en: "Thirteen kilometres of sand, the shallowest and warmest sea in the country and medicinal mud — the best pick for families with small children and for kitesurfers. Ada Bojana is famous for its fish restaurants on stilts.",
          de: "Dreizehn Kilometer Sand, das flachste und wärmste Meer des Landes und Heilschlamm — ideal für Familien mit kleinen Kindern und Kitesurfer.",
        },
      },
      {
        name: { sr: "Durmitor, Žabljak i kanjon Tare", en: "Durmitor, Žabljak & the Tara canyon", de: "Durmitor, Žabljak & Tara-Canyon" },
        text: {
          sr: "Nacionalni park sa Crnim jezerom, vrhom Bobotov kuk i drugim najdubljim kanjonom na svetu. Leti prijatnih 20-ak stepeni, zimi ski centar — savršena dopuna moru.",
          en: "A national park with the Black Lake, the Bobotov Kuk peak and the world's second-deepest canyon. A pleasant 20 °C in summer and a ski resort in winter — the perfect complement to the sea.",
          de: "Nationalpark mit Schwarzem See, dem Gipfel Bobotov Kuk und der zweittiefsten Schlucht der Welt. Im Sommer angenehme 20 °C, im Winter Skigebiet.",
        },
      },
    ],
    when: {
      sr: "Kupališna sezona traje od juna do sredine septembra, a more je najtoplije u avgustu. Za razgledanje Boke i Durmitora najprijatniji su maj, jun i septembar. Vrhunac gužve je od 15. jula do 20. avgusta.",
      en: "The swimming season runs from June to mid-September, with the sea warmest in August. May, June and September are the most pleasant for exploring the bay and Durmitor. Peak crowds fall between 15 July and 20 August.",
      de: "Die Badesaison läuft von Juni bis Mitte September, das Meer ist im August am wärmsten. Mai, Juni und September eignen sich am besten zum Erkunden.",
    },
    travel: {
      sr: "Autom je od Beograda do Budve oko 500 km preko Zlatibora i Bijelog Polja; put je slikovit, ali uzak na deonicama kroz kanjone — računajte na 7–8 sati. Autoput Bar–Boljare skraćuje deo puta. Postoji i noćni voz Beograd–Bar, jedna od najlepših pruga u Evropi.",
      en: "By car it is about 500 km from Belgrade to Budva via Zlatibor and Bijelo Polje; the drive is scenic but narrow through the canyons — allow 7–8 hours. The Bar–Boljare motorway shortens part of the route. There is also the Belgrade–Bar night train, one of Europe's most scenic railways.",
      de: "Mit dem Auto sind es von Belgrad nach Budva rund 500 km über Zlatibor und Bijelo Polje; landschaftlich reizvoll, aber streckenweise eng — 7–8 Stunden einplanen. Es gibt auch den Nachtzug Belgrad–Bar.",
    },
    docs: {
      sr: "Državljani Srbije putuju sa ličnom kartom ili pasošem, bez vize. Valuta je evro. Za automobil je potrebno zeleno kartonsko osiguranje ako polisa ne pokriva Crnu Goru; naplaćuje se i ekološka taksa za vozila.",
      en: "Serbian citizens travel with an ID card or passport, without a visa. The currency is the euro. Green Card insurance is needed if your policy does not cover Montenegro, and there is an eco tax for vehicles.",
      de: "Serbische Staatsbürger reisen mit Personalausweis oder Pass, ohne Visum. Währung ist der Euro. Für Fahrzeuge kann die Grüne Karte sowie eine Ökosteuer erforderlich sein.",
    },
    faq: {
      sr: [
        { q: "Gde je more najtoplije u Crnoj Gori?", a: "Na jugu — Ulcinj, Velika plaža i Ada Bojana, gde je more plitko i peščano, pa se brzo zagreje." },
        { q: "Da li je potreban pasoš?", a: "Nije obavezan — državljani Srbije mogu putovati i sa važećom ličnom kartom." },
        { q: "Koliko traje put do Budve?", a: "Oko 7–8 sati autom iz Beograda, u zavisnosti od gužve na graničnom prelazu i deonica kroz kanjone." },
        { q: "Šta obići pored plaže?", a: "Kotor i Perast, Njegošev mauzolej na Lovćenu, Skadarsko jezero, Durmitor i kanjon Tare — sve na jednodnevnom izletu sa primorja." },
      ],
      en: [
        { q: "Where is the sea warmest in Montenegro?", a: "In the south — Ulcinj, Velika Plaža and Ada Bojana, where the water is shallow and sandy, so it warms up quickly." },
        { q: "Is a passport required?", a: "Not necessarily — Serbian citizens may also travel with a valid ID card." },
        { q: "How long is the drive to Budva?", a: "About 7–8 hours by car from Belgrade, depending on border queues and the canyon sections." },
        { q: "What to see besides the beach?", a: "Kotor and Perast, Njegoš's mausoleum on Lovćen, Lake Skadar, Durmitor and the Tara canyon — all doable as day trips from the coast." },
      ],
      de: [
        { q: "Wo ist das Meer in Montenegro am wärmsten?", a: "Im Süden — Ulcinj, Velika Plaža und Ada Bojana, flach und sandig, daher schnell warm." },
        { q: "Ist ein Reisepass nötig?", a: "Nicht zwingend — serbische Staatsbürger können auch mit gültigem Personalausweis einreisen." },
        { q: "Wie lange dauert die Fahrt nach Budva?", a: "Etwa 7–8 Stunden ab Belgrad, je nach Grenzwartezeit." },
        { q: "Was lohnt neben dem Strand?", a: "Kotor und Perast, das Njegoš-Mausoleum auf dem Lovćen, der Skadar-See, Durmitor und der Tara-Canyon." },
      ],
    },
  },

  {
    id: "hrvatska",
    slug: { sr: "hrvatska", en: "croatia", de: "kroatien" },
    name: { sr: "Hrvatska", en: "Croatia", de: "Kroatien" },
    flag: "🇭🇷",
    hero: "https://images.unsplash.com/photo-1555990538-1e1e1e1c9c9b?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "Hiljadu ostrva, bistro Jadransko more — Istra, Kvarner, Dalmacija i Plitvice.",
      en: "A thousand islands and a crystal-clear Adriatic — Istria, Kvarner, Dalmatia and Plitvice.",
      de: "Tausend Inseln und kristallklare Adria — Istrien, Kvarner, Dalmatien und Plitvice.",
    },
    intro: {
      sr: [
        "Hrvatska ima najrazvedeniju obalu na Jadranu i vodu koja se redovno svrstava među najčistije u Evropi. Za razliku od peščanih plaža Grčke i juga Crne Gore, ovde dominiraju šljunak i stene — zato ponesite papuče za more, a nagrada je izuzetna providnost vode.",
        "Sever i jug su dva sveta: Istra je najbliža, sa Rovinjom, Porečom i Pulom, tartufima i vinima; Kvarner nudi Opatiju, Crikvenicu i ostrva Krk, Rab i Cres; Dalmacija se proteže od Zadra i Šibenika, preko Splita i Makarske rivijere, do Dubrovnika i Korčule.",
        "Unutrašnjost nije samo prolaz do mora — Plitvička jezera i Krka su među najlepšim nacionalnim parkovima u Evropi, a Zagreb je odlična destinacija za gradski vikend i za Advent u decembru.",
      ],
      en: [
        "Croatia has the most indented coastline on the Adriatic and water regularly ranked among the cleanest in Europe. Unlike the sandy beaches of Greece and southern Montenegro, pebble and rock dominate here — bring water shoes, and the reward is remarkable clarity.",
        "North and south are two worlds: Istria is closest, with Rovinj, Poreč and Pula, truffles and wine; Kvarner offers Opatija, Crikvenica and the islands of Krk, Rab and Cres; Dalmatia stretches from Zadar and Šibenik through Split and the Makarska Riviera to Dubrovnik and Korčula.",
        "The interior is more than a corridor to the sea — Plitvice Lakes and Krka are among Europe's finest national parks, and Zagreb is an excellent city break, especially for Advent in December.",
      ],
      de: [
        "Kroatien hat die am stärksten gegliederte Adriaküste und Wasser, das regelmäßig zu den saubersten Europas zählt. Statt Sand dominieren Kies und Fels — Badeschuhe mitnehmen, die Belohnung ist außergewöhnliche Sichtweite.",
        "Nord und Süd sind zwei Welten: Istrien ist am nächsten, mit Rovinj, Poreč und Pula, Trüffeln und Wein; der Kvarner bietet Opatija, Crikvenica und die Inseln Krk, Rab und Cres; Dalmatien reicht von Zadar und Šibenik über Split und die Makarska-Riviera bis Dubrovnik und Korčula.",
        "Das Landesinnere ist mehr als Durchfahrt — die Plitvicer Seen und Krka gehören zu Europas schönsten Nationalparks, und Zagreb ist ein hervorragendes Städteziel.",
      ],
    },
    spots: [
      {
        name: { sr: "Istra — Rovinj, Poreč, Pula", en: "Istria — Rovinj, Poreč, Pula", de: "Istrien — Rovinj, Poreč, Pula" },
        text: {
          sr: "Najbliži deo hrvatske obale, sa venecijanskim gradićima, borovim šumama uz more, rimskom arenom u Puli i gastronomijom na nivou Italije — tartufi, maslinovo ulje i malvazija.",
          en: "The closest stretch of the Croatian coast, with Venetian towns, pine woods by the sea, the Roman arena in Pula and Italian-level gastronomy — truffles, olive oil and Malvazija.",
          de: "Der nächstgelegene Küstenabschnitt, mit venezianischen Städtchen, Pinienwäldern am Meer, der römischen Arena in Pula und Spitzengastronomie.",
        },
      },
      {
        name: { sr: "Dalmacija — Split, Makarska rivijera, Zadar", en: "Dalmatia — Split, Makarska Riviera, Zadar", de: "Dalmatien — Split, Makarska-Riviera, Zadar" },
        text: {
          sr: "Dioklecijanova palata u Splitu, Morske orgulje u Zadru i plaže ispod Biokova od Brela do Gradca. Odavde su najbolje veze trajektom ka Braču, Hvaru i Visu.",
          en: "Diocletian's Palace in Split, the Sea Organ in Zadar and beaches beneath Biokovo from Brela to Gradac. The best ferry links to Brač, Hvar and Vis start here.",
          de: "Diokletianpalast in Split, Meeresorgel in Zadar und Strände unter dem Biokovo von Brela bis Gradac. Von hier die besten Fährverbindungen nach Brač, Hvar und Vis.",
        },
      },
      {
        name: { sr: "Dubrovnik i jug", en: "Dubrovnik & the far south", de: "Dubrovnik & der Süden" },
        text: {
          sr: "Grad-tvrđava pod zaštitom UNESCO-a, sa šetnjom po bedemima i izletima na Lokrum i Elafite. Najskuplji deo obale, ali i najimpresivniji; okolina Konavala i Cavtat su znatno mirniji.",
          en: "A UNESCO-protected fortress city, with a walk around the walls and trips to Lokrum and the Elaphiti islands. The most expensive part of the coast, and the most impressive; Konavle and Cavtat nearby are far quieter.",
          de: "Eine UNESCO-geschützte Festungsstadt mit Mauerrundgang und Ausflügen nach Lokrum und zu den Elafiten. Der teuerste, aber eindrucksvollste Küstenabschnitt.",
        },
      },
      {
        name: { sr: "Plitvička jezera i NP Krka", en: "Plitvice Lakes & Krka NP", de: "Plitvicer Seen & NP Krka" },
        text: {
          sr: "Šesnaest jezera povezanih slapovima, na UNESCO listi od 1979. godine — najposećenija prirodna atrakcija Hrvatske. Krka je bliža moru i pogodna za kombinovanje sa odmorom u Šibeniku.",
          en: "Sixteen lakes linked by waterfalls, UNESCO-listed since 1979 — Croatia's most visited natural attraction. Krka is closer to the coast and easy to combine with a stay near Šibenik.",
          de: "Sechzehn durch Wasserfälle verbundene Seen, seit 1979 UNESCO-Welterbe. Krka liegt näher am Meer und lässt sich gut mit Šibenik verbinden.",
        },
      },
    ],
    when: {
      sr: "Kupanje je najprijatnije od kraja juna do početka septembra. Jun i septembar donose niže cene i manje gužve, dok su Plitvice i Krka najlepši u maju i oktobru, kada je vodostaj visok, a temperature blage.",
      en: "Swimming is best from late June to early September. June and September bring lower prices and fewer crowds, while Plitvice and Krka look their best in May and October, when water levels are high and temperatures mild.",
      de: "Baden ist von Ende Juni bis Anfang September am angenehmsten. Juni und September bieten niedrigere Preise; Plitvice und Krka sind im Mai und Oktober am schönsten.",
    },
    travel: {
      sr: "Autoputem preko Bajakova do Zagreba je oko 400 km, do Splita oko 700 km, a do Dubrovnika blizu 900 km. Putarine u Hrvatskoj su značajna stavka u budžetu. Alternativa je let za Split, Zadar ili Dubrovnik.",
      en: "By motorway via Bajakovo it is about 400 km to Zagreb, 700 km to Split and nearly 900 km to Dubrovnik. Croatian tolls are a notable budget item. Flights to Split, Zadar or Dubrovnik are an alternative.",
      de: "Über die Autobahn via Bajakovo sind es rund 400 km nach Zagreb, 700 km nach Split und knapp 900 km nach Dubrovnik. Die Mautgebühren sind ein spürbarer Kostenfaktor.",
    },
    docs: {
      sr: "Hrvatska je u Šengenu i evrozoni. Državljani Srbije putuju bez vize do 90 dana u 180 dana, sa biometrijskim pasošem; lična karta nije dovoljna. Vinjeta nije potrebna, ali se putarina plaća po deonici.",
      en: "Croatia is in Schengen and the eurozone. Serbian citizens travel visa-free for up to 90 days within 180 days with a biometric passport; an ID card is not sufficient. There is no vignette, but tolls are charged per section.",
      de: "Kroatien gehört zu Schengen und zur Eurozone. Serbische Staatsbürger reisen visumfrei bis 90 Tage innerhalb von 180 Tagen mit biometrischem Pass; ein Personalausweis genügt nicht.",
    },
    faq: {
      sr: [
        { q: "Da li je potreban pasoš za Hrvatsku?", a: "Jeste — od ulaska u Šengen državljanima Srbije je potreban biometrijski pasoš, lična karta nije dovoljna." },
        { q: "Ima li peščanih plaža u Hrvatskoj?", a: "Retko. Većina plaža je šljunkovita ili stenovita; peska ima na Rajskoj plaži na Rabu, u Ninu kod Zadra i na Lopar poluostrvu." },
        { q: "Koliko koštaju putarine do mora?", a: "Deonice se plaćaju posebno; za relaciju do Splita i nazad računajte na osetnu stavku u budžetu putovanja, uz cenu goriva." },
        { q: "Koje ostrvo izabrati za prvi put?", a: "Krk je povezan mostom i najlakši za dolazak autom; Brač i Hvar nude najlepše plaže, a Rab peščanu Rajsku plažu za porodice." },
      ],
      en: [
        { q: "Is a passport required for Croatia?", a: "Yes — since Croatia joined Schengen, Serbian citizens need a biometric passport; an ID card is not enough." },
        { q: "Are there sandy beaches in Croatia?", a: "Rarely. Most beaches are pebble or rock; sand can be found at Rajska Beach on Rab, in Nin near Zadar and on the Lopar peninsula." },
        { q: "How much are the motorway tolls?", a: "Tolls are charged per section and add a noticeable amount to a return trip to the coast, on top of fuel." },
        { q: "Which island for a first visit?", a: "Krk is bridge-connected and easiest by car; Brač and Hvar have the finest beaches, and Rab offers sandy Rajska Beach for families." },
      ],
      de: [
        { q: "Ist ein Reisepass für Kroatien nötig?", a: "Ja — seit dem Schengen-Beitritt benötigen serbische Staatsbürger einen biometrischen Pass." },
        { q: "Gibt es Sandstrände?", a: "Selten. Die meisten Strände sind Kies oder Fels; Sand gibt es am Rajska-Strand auf Rab und in Nin bei Zadar." },
        { q: "Wie hoch sind die Mautgebühren?", a: "Die Maut wird abschnittsweise berechnet und macht bei einer Hin- und Rückfahrt an die Küste einen spürbaren Betrag aus." },
        { q: "Welche Insel für den ersten Besuch?", a: "Krk ist per Brücke erreichbar; Brač und Hvar haben die schönsten Strände, Rab den Sandstrand Rajska." },
      ],
    },
  },

  {
    id: "bosna",
    slug: { sr: "bosna-i-hercegovina", en: "bosnia-and-herzegovina", de: "bosnien-herzegowina" },
    name: { sr: "Bosna i Hercegovina", en: "Bosnia and Herzegovina", de: "Bosnien und Herzegowina" },
    flag: "🇧🇦",
    hero: "https://images.unsplash.com/photo-1592485283549-2a7e0d4b0b9a?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "Zelena reka Una, Mostar i Kravice, banje i planine — odmor na svega nekoliko sati puta.",
      en: "The emerald Una, Mostar and Kravice, spas and mountains — a holiday just a few hours away.",
      de: "Die grüne Una, Mostar und Kravice, Kurorte und Berge — Urlaub nur wenige Stunden entfernt.",
    },
    intro: {
      sr: [
        "Bosna i Hercegovina je destinacija za one koji vole vodu, planine i istoriju u malom prostoru. Reke Una, Vrbas, Neretva i Drina spadaju među najčistije u Evropi, a rafting i kajak su razvijeni na svima. Nema jezičke barijere, cene su pristupačne, a putovanje traje kraće nego do mora.",
        "Hercegovina je topli, mediteranski deo: Mostar sa Starim mostom, vodopadi Kravice, Blagaj i tekija pod stenom, Počitelj i vinski put Žilavke i Blatine. Bosna je hladnija i planinska: Jahorina i Bjelašnica, Sarajevo sa Baščaršijom, kanjon Rakitnice i Vrelo Bosne.",
        "Sve je dostupno kao produženi vikend iz Srbije, a mnogi kombinuju Višegrad i Andrićgrad sa Tarom i Zlatiborom u jednom krugu.",
      ],
      en: [
        "Bosnia and Herzegovina suits travellers who love water, mountains and history packed into a small area. The Una, Vrbas, Neretva and Drina are among Europe's cleanest rivers, and rafting and kayaking are well developed on all of them. No language barrier, affordable prices, and a shorter drive than to the sea.",
        "Herzegovina is the warm, Mediterranean part: Mostar with its Old Bridge, the Kravice waterfalls, Blagaj with its dervish house under the cliff, Počitelj and the Žilavka and Blatina wine road. Bosnia is cooler and mountainous: Jahorina and Bjelašnica, Sarajevo with Baščaršija, the Rakitnica canyon and Vrelo Bosne.",
        "All of it works as a long weekend from Serbia, and many combine Višegrad and Andrićgrad with Tara and Zlatibor in one loop.",
      ],
      de: [
        "Bosnien und Herzegowina eignet sich für alle, die Wasser, Berge und Geschichte auf engem Raum lieben. Una, Vrbas, Neretva und Drina zählen zu den saubersten Flüssen Europas, Rafting und Kajak sind überall gut entwickelt.",
        "Die Herzegowina ist der warme, mediterrane Teil: Mostar mit der Alten Brücke, die Wasserfälle von Kravice, Blagaj, Počitelj und die Weinstraße von Žilavka und Blatina. Bosnien ist kühler und gebirgig: Jahorina und Bjelašnica, Sarajevo mit der Baščaršija und Vrelo Bosne.",
        "Alles lässt sich als verlängertes Wochenende von Serbien aus erleben.",
      ],
    },
    spots: [
      {
        name: { sr: "Mostar, Blagaj i Kravice", en: "Mostar, Blagaj & Kravice", de: "Mostar, Blagaj & Kravice" },
        text: {
          sr: "Stari most iz 16. veka pod zaštitom UNESCO-a i skakači sa njega, tekija na izvoru Bune u Blagaju i vodopadi Kravice na Trebižatu — najfotografisaniji trougao u Hercegovini, najlepši u maju i junu kada su vodopadi najjači.",
          en: "The UNESCO-protected 16th-century Old Bridge and its divers, the dervish house at the Buna spring in Blagaj and the Kravice waterfalls on the Trebižat — Herzegovina's most photographed triangle, at its best in May and June when the falls are strongest.",
          de: "Die UNESCO-geschützte Alte Brücke aus dem 16. Jahrhundert, das Derwischhaus an der Buna-Quelle in Blagaj und die Kravice-Wasserfälle — im Mai und Juni am eindrucksvollsten.",
        },
      },
      {
        name: { sr: "Nacionalni park Una i Bihać", en: "Una National Park & Bihać", de: "Nationalpark Una & Bihać" },
        text: {
          sr: "Smaragdna reka sa slapovima Štrbački buk i Martin Brod, rafting svih nivoa težine i etno smeštaj uz vodu. Jedna od najlepših rečnih dolina na Balkanu.",
          en: "An emerald river with the Štrbački Buk and Martin Brod falls, rafting at every difficulty level and riverside guesthouses. One of the finest river valleys in the Balkans.",
          de: "Ein smaragdgrüner Fluss mit den Wasserfällen Štrbački Buk und Martin Brod, Rafting aller Schwierigkeitsgrade und Unterkünfte am Wasser.",
        },
      },
      {
        name: { sr: "Sarajevo, Jahorina i Bjelašnica", en: "Sarajevo, Jahorina & Bjelašnica", de: "Sarajevo, Jahorina & Bjelašnica" },
        text: {
          sr: "Grad u kojem se na dvesta metara smenjuju osmanska čaršija i austrougarska arhitektura, a olimpijske planine su na pola sata vožnje — zimi ski centri sa pristupačnim ski-pasovima, leti planinarenje i sela na Bjelašnici.",
          en: "A city where an Ottoman bazaar and Austro-Hungarian architecture meet within two hundred metres, with the Olympic mountains half an hour away — ski resorts with affordable passes in winter, hiking and highland villages in summer.",
          de: "Eine Stadt, in der osmanischer Basar und österreichisch-ungarische Architektur aufeinandertreffen, mit den Olympiabergen eine halbe Stunde entfernt.",
        },
      },
      {
        name: { sr: "Višegrad, Andrićgrad i Drina", en: "Višegrad, Andrićgrad & the Drina", de: "Višegrad, Andrićgrad & Drina" },
        text: {
          sr: "Most Mehmed-paše Sokolovića sa UNESCO liste i Andrićev kameni grad, uz vožnju brodom kroz kanjon Drine — idealna dopuna odmoru na Tari ili Zlatiboru.",
          en: "The UNESCO-listed Mehmed Paša Sokolović Bridge and Andrić's stone town, plus a boat ride through the Drina canyon — an ideal add-on to a stay on Tara or Zlatibor.",
          de: "Die UNESCO-Brücke von Mehmed Paša Sokolović und Andrićs Steinstadt sowie eine Bootsfahrt durch den Drina-Canyon.",
        },
      },
    ],
    when: {
      sr: "Maj i jun su najbolji za reke i vodopade, jul i avgust za rafting i planine, a septembar za Hercegovinu kada popusti vrućina. Zimska sezona na Jahorini i Bjelašnici traje od decembra do marta.",
      en: "May and June are best for rivers and waterfalls, July and August for rafting and the mountains, and September for Herzegovina once the heat eases. The ski season on Jahorina and Bjelašnica runs December to March.",
      de: "Mai und Juni eignen sich für Flüsse und Wasserfälle, Juli und August für Rafting und Berge, September für die Herzegowina. Skisaison von Dezember bis März.",
    },
    travel: {
      sr: "Od Beograda do Višegrada je oko 250 km, do Sarajeva oko 300 km, a do Mostara oko 400 km. Putevi su uglavnom magistralni i planinski, pa vožnja traje duže nego što kilometraža sugeriše — računajte prosek od 60 km/h.",
      en: "It is about 250 km from Belgrade to Višegrad, 300 km to Sarajevo and 400 km to Mostar. Roads are mostly two-lane and mountainous, so journeys take longer than the distance suggests — reckon on an average of 60 km/h.",
      de: "Von Belgrad sind es rund 250 km nach Višegrad, 300 km nach Sarajevo und 400 km nach Mostar. Die Straßen sind überwiegend Landstraßen — mit einem Schnitt von 60 km/h rechnen.",
    },
    docs: {
      sr: "Državljani Srbije putuju sa ličnom kartom ili pasošem, bez vize. Valuta je konvertibilna marka (KM), a evri se često primaju u turističkim mestima. Zeleni karton je potreban ako polisa ne pokriva BiH.",
      en: "Serbian citizens travel with an ID card or passport, without a visa. The currency is the convertible mark (KM); euros are often accepted in tourist areas. A Green Card is needed if your policy does not cover BiH.",
      de: "Serbische Staatsbürger reisen mit Personalausweis oder Pass, ohne Visum. Währung ist die Konvertible Mark (KM); Euro wird in Touristenorten oft akzeptiert.",
    },
    faq: {
      sr: [
        { q: "Kada su vodopadi Kravice najlepši?", a: "U maju i junu, kada je vodostaj Trebižata najviši. U avgustu voda oslabi, ali je kupanje najprijatnije." },
        { q: "Da li je potreban pasoš za BiH?", a: "Nije — državljani Srbije mogu ući i sa važećom ličnom kartom." },
        { q: "Gde na rafting u Bosni?", a: "Na Uni kod Bihaća, na Vrbasu kod Banje Luke, na Neretvi u Konjicu i na Tari kod Foče — svaka ima staze za početnike i za iskusne." },
        { q: "Koliko traje put do Mostara?", a: "Oko 6–7 sati iz Beograda, jer se vozi magistralnim putevima kroz planine." },
      ],
      en: [
        { q: "When are the Kravice falls at their best?", a: "In May and June, when the Trebižat runs highest. In August the flow weakens but swimming is most pleasant." },
        { q: "Is a passport required for BiH?", a: "No — Serbian citizens may enter with a valid ID card." },
        { q: "Where to go rafting?", a: "On the Una near Bihać, the Vrbas near Banja Luka, the Neretva at Konjic and the Tara near Foča — each has beginner and advanced sections." },
        { q: "How long is the drive to Mostar?", a: "About 6–7 hours from Belgrade, on two-lane mountain roads." },
      ],
      de: [
        { q: "Wann sind die Kravice-Wasserfälle am schönsten?", a: "Im Mai und Juni, bei höchstem Wasserstand. Im August ist das Baden am angenehmsten." },
        { q: "Ist ein Reisepass nötig?", a: "Nein — serbische Staatsbürger können mit gültigem Personalausweis einreisen." },
        { q: "Wo kann man raften?", a: "Auf der Una bei Bihać, dem Vrbas bei Banja Luka, der Neretva bei Konjic und der Tara bei Foča." },
        { q: "Wie lange dauert die Fahrt nach Mostar?", a: "Etwa 6–7 Stunden ab Belgrad." },
      ],
    },
  },

  {
    id: "slovenija",
    slug: { sr: "slovenija", en: "slovenia", de: "slowenien" },
    name: { sr: "Slovenija", en: "Slovenia", de: "Slowenien" },
    flag: "🇸🇮",
    hero: "https://images.unsplash.com/photo-1534861299-fb6c1a0b0e4d?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "Bled, Bohinj i Soča, Postojnska jama i terme — Alpi na svega jednom danu vožnje.",
      en: "Bled, Bohinj and the Soča, Postojna Cave and thermal spas — the Alps a single day's drive away.",
      de: "Bled, Bohinj und die Soča, Höhle von Postojna und Thermen — die Alpen einen Tag entfernt.",
    },
    intro: {
      sr: [
        "Slovenija je najuredniji i najzeleniji deo bivše Jugoslavije: na dva sata vožnje smenjuju se Alpi, kraške pećine, vinogradi i šezdesetak kilometara jadranske obale. Za putnike iz Srbije to je destinacija za produženi vikend, aktivan odmor i banjski oporavak, a ne za klasično letovanje.",
        "Triglavski nacionalni park je srce zemlje: Bled sa ostrvom i zamkom, mirniji Bohinj sa najvećim slovenačkim jezerom i dolina Soče sa vodom neverovatne tirkizne boje. Na jugozapadu je Kras sa Postojnskom jamom i Škocjanskim jamama, obe pod zaštitom UNESCO-a.",
        "Slovenija ima i razvijenu banjsku ponudu — Terme Čatež, Ptuj, Olimia i Rogaška Slatina — sa aquaparkovima koji rade cele godine, što je čini dobrom zimskom destinacijom za porodice.",
      ],
      en: [
        "Slovenia is the tidiest and greenest part of the former Yugoslavia: within two hours you pass from the Alps to karst caves, vineyards and some sixty kilometres of Adriatic coast. For travellers from Serbia it is a long-weekend, active-holiday and spa destination rather than a classic beach break.",
        "Triglav National Park is the heart of the country: Bled with its island and castle, quieter Bohinj with Slovenia's largest lake, and the Soča valley with its astonishing turquoise water. To the southwest lies the Karst, with Postojna and Škocjan caves, both UNESCO-protected.",
        "Slovenia also has a strong spa offer — Terme Čatež, Ptuj, Olimia and Rogaška Slatina — with year-round water parks, making it a good winter destination for families.",
      ],
      de: [
        "Slowenien ist der ordentlichste und grünste Teil des ehemaligen Jugoslawien: Innerhalb von zwei Stunden wechseln Alpen, Karsthöhlen, Weinberge und rund sechzig Kilometer Adriaküste.",
        "Der Triglav-Nationalpark ist das Herz des Landes: Bled mit Insel und Burg, das ruhigere Bohinj mit dem größten See Sloweniens und das Soča-Tal mit türkisfarbenem Wasser. Im Südwesten der Karst mit den UNESCO-Höhlen Postojna und Škocjan.",
        "Slowenien bietet zudem starke Thermen — Terme Čatež, Ptuj, Olimia und Rogaška Slatina — mit ganzjährigen Wasserparks.",
      ],
    },
    spots: [
      {
        name: { sr: "Bled i Bohinj", en: "Bled & Bohinj", de: "Bled & Bohinj" },
        text: {
          sr: "Bledsko jezero sa crkvicom na ostrvu i zamkom na steni je najprepoznatljiviji prizor Slovenije; pletna, kremšnita i šetnja oko jezera su obavezni. Bohinj je veći, tiši i divlji, sa vodopadom Savica i gondolom na Vogel.",
          en: "Lake Bled with its island church and clifftop castle is Slovenia's signature view; a pletna boat, a cream cake and the lakeside walk are essential. Bohinj is bigger, quieter and wilder, with the Savica waterfall and the Vogel cable car.",
          de: "Der Bleder See mit Inselkirche und Burg ist Sloweniens Wahrzeichen; Pletna-Boot, Cremeschnitte und der Uferweg gehören dazu. Bohinj ist größer, ruhiger und wilder.",
        },
      },
      {
        name: { sr: "Dolina Soče — Bovec i Kobarid", en: "Soča valley — Bovec & Kobarid", de: "Soča-Tal — Bovec & Kobarid" },
        text: {
          sr: "Najlepša reka Alpa, tirkizna i ledena, sa raftingom, kanjoningom i zip-lineom u Bovcu. Kobarid nosi tešku istoriju Prvog svetskog rata i jednu od najboljih gastronomskih scena u regionu.",
          en: "The finest Alpine river, turquoise and ice-cold, with rafting, canyoning and zip-lining at Bovec. Kobarid carries the heavy history of the First World War and one of the region's best food scenes.",
          de: "Der schönste Alpenfluss, türkis und eiskalt, mit Rafting, Canyoning und Zipline bei Bovec. Kobarid verbindet Weltkriegsgeschichte mit Spitzengastronomie.",
        },
      },
      {
        name: { sr: "Postojnska jama i Predjamski grad", en: "Postojna Cave & Predjama Castle", de: "Höhle von Postojna & Burg Predjama" },
        text: {
          sr: "Dvadeset kilometara podzemnih dvorana kroz koje se vozi pećinskim vozićem, uz čuvenog čovečju ribicu. Predjamski grad je ugrađen u liticu iznad ponora, na deset minuta vožnje.",
          en: "Twenty kilometres of underground halls explored by cave train, home to the olm. Predjama Castle is built into a cliff above an abyss, ten minutes away.",
          de: "Zwanzig Kilometer unterirdische Hallen, befahren mit der Höhlenbahn, Heimat des Grottenolms. Die Burg Predjama ist zehn Minuten entfernt in eine Felswand gebaut.",
        },
      },
      {
        name: { sr: "Ljubljana, Piran i terme", en: "Ljubljana, Piran & the spas", de: "Ljubljana, Piran & Thermen" },
        text: {
          sr: "Ljubljana je jedna od najprijatnijih malih prestonica Evrope, sa Plečnikovim mostovima i pijacom uz Ljubljanicu. Piran je venecijanski dragulj na obali, a Terme Čatež i Olimia rade cele godine.",
          en: "Ljubljana is one of Europe's most pleasant small capitals, with Plečnik's bridges and the riverside market. Piran is a Venetian gem on the coast, and Terme Čatež and Olimia run year-round.",
          de: "Ljubljana ist eine der angenehmsten kleinen Hauptstädte Europas. Piran ist ein venezianisches Juwel an der Küste, Terme Čatež und Olimia haben ganzjährig geöffnet.",
        },
      },
    ],
    when: {
      sr: "Za jezera i planine najbolji su jun i septembar; jul i avgust donose najviše posetilaca na Bled. Dolina Soče je najlepša od maja do oktobra, a terme i ski centri rade od decembra do marta.",
      en: "June and September are best for lakes and mountains; July and August bring the biggest crowds to Bled. The Soča valley is finest from May to October, while spas and ski resorts run December to March.",
      de: "Für Seen und Berge eignen sich Juni und September; Juli und August bringen den größten Andrang nach Bled. Das Soča-Tal ist von Mai bis Oktober am schönsten.",
    },
    travel: {
      sr: "Od Beograda do Ljubljane je oko 540 km autoputem preko Zagreba, oko 6 sati vožnje. Za slovenačke autoputeve obavezna je elektronska vinjeta (e-vinjeta), koja se kupuje online ili na pumpama pre granice.",
      en: "It is about 540 km from Belgrade to Ljubljana by motorway via Zagreb, around 6 hours. Slovenian motorways require an electronic vignette (e-vinjeta), bought online or at petrol stations before the border.",
      de: "Von Belgrad nach Ljubljana sind es rund 540 km über Zagreb, etwa 6 Stunden. Für slowenische Autobahnen ist eine elektronische Vignette Pflicht.",
    },
    docs: {
      sr: "Slovenija je u Šengenu i evrozoni — potreban je biometrijski pasoš, boravak do 90 dana u 180 dana bez vize. Obavezna je e-vinjeta za autoputeve i zimska oprema od 15. novembra do 15. marta.",
      en: "Slovenia is in Schengen and the eurozone — a biometric passport is required, with visa-free stays of up to 90 days within 180. An e-vignette is mandatory on motorways, and winter equipment from 15 November to 15 March.",
      de: "Slowenien gehört zu Schengen und zur Eurozone — biometrischer Pass erforderlich, visumfrei bis 90 Tage. E-Vignette Pflicht, Winterausrüstung vom 15. November bis 15. März.",
    },
    faq: {
      sr: [
        { q: "Da li je potrebna vinjeta za Sloveniju?", a: "Jeste — elektronska vinjeta je obavezna za sve autoputeve i brze puteve. Kupuje se online ili na benzinskim stanicama pre ulaska u zemlju." },
        { q: "Bled ili Bohinj?", a: "Bled je pristupačniji i sadržajniji, ali i najposećeniji. Bohinj je mirniji, jeftiniji i bliži planinama — bolji izbor za duži boravak i planinarenje." },
        { q: "Može li se kupati u Sloveniji?", a: "Može — na Bohinjskom jezeru i u Soči (hladna voda), na kratkoj jadranskoj obali kod Pirana i Portoroža, i u termama tokom cele godine." },
        { q: "Koliko se čeka na granici?", a: "Slovenija je u Šengenu, pa je granica sa Hrvatskom bez kontrole; glavno zadržavanje je na izlazu iz Srbije i ulazu u Hrvatsku." },
      ],
      en: [
        { q: "Is a vignette required in Slovenia?", a: "Yes — an electronic vignette is mandatory on all motorways and expressways. Buy it online or at petrol stations before entering." },
        { q: "Bled or Bohinj?", a: "Bled is more accessible and has more facilities, but is the busiest. Bohinj is quieter, cheaper and closer to the mountains — better for a longer stay and hiking." },
        { q: "Can you swim in Slovenia?", a: "Yes — in Lake Bohinj and the Soča (cold water), on the short Adriatic coast near Piran and Portorož, and in the thermal spas year-round." },
        { q: "How long are border waits?", a: "Slovenia is in Schengen, so the Croatian border has no checks; the main delay is leaving Serbia and entering Croatia." },
      ],
      de: [
        { q: "Ist eine Vignette nötig?", a: "Ja — die E-Vignette ist auf allen Autobahnen Pflicht und wird online oder an Tankstellen gekauft." },
        { q: "Bled oder Bohinj?", a: "Bled ist zugänglicher, aber am stärksten besucht. Bohinj ist ruhiger, günstiger und näher an den Bergen." },
        { q: "Kann man in Slowenien baden?", a: "Ja — im Bohinjer See und in der Soča (kalt), an der kurzen Adriaküste bei Piran sowie ganzjährig in den Thermen." },
        { q: "Wie lange dauern Grenzkontrollen?", a: "Slowenien ist in Schengen; die Hauptwartezeit entsteht bei der Ausreise aus Serbien." },
      ],
    },
  },

  {
    id: "spanija",
    slug: { sr: "spanija", en: "spain", de: "spanien" },
    name: { sr: "Španija", en: "Spain", de: "Spanien" },
    flag: "🇪🇸",
    hero: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=1600&q=80",
    lead: {
      sr: "Barselona, Madrid, Andaluzija i Kanari — evropski jug za grad, plažu i zimsko sunce.",
      en: "Barcelona, Madrid, Andalusia and the Canaries — Europe's south for cities, beaches and winter sun.",
      de: "Barcelona, Madrid, Andalusien und die Kanaren — Europas Süden für Stadt, Strand und Wintersonne.",
    },
    intro: {
      sr: [
        "Španija je destinacija za koju se putuje avionom i planira unapred, ali nudi ono što Balkan nema: velike gradove sa svetskom arhitekturom i muzejima, obalu koja radi od aprila do novembra i ostrva sa suncem i u januaru.",
        "Za prvi put, izbor je obično Barselona (Gaudijeva Sagrada Familija, Park Gvel, Gotska četvrt i plaža u samom gradu) ili Madrid (Prado, Kraljevska palata, Retiro i najbolja tapas scena). Andaluzija je najlepši krug za deset dana: Sevilja, Kordoba sa Mezkitom i Granada sa Alambrom.",
        "Obale se biraju po karakteru: Kosta Brava je stenovita i slikovita, Kosta del Sol topla i razvijena, Kosta Blanka sa Alikanteom i Benidormom najpovoljnija. Kanarska ostrva (Tenerife, Gran Kanarija, Fuerteventura) imaju 20-25 °C i usred zime.",
      ],
      en: [
        "Spain takes a flight and some planning, but offers what the Balkans cannot: great cities with world-class architecture and museums, a coast that works from April to November, and islands with sunshine even in January.",
        "For a first visit the choice is usually Barcelona (Gaudí's Sagrada Família, Park Güell, the Gothic Quarter and a beach in the city itself) or Madrid (the Prado, the Royal Palace, Retiro and the best tapas scene). Andalusia makes the finest ten-day loop: Seville, Córdoba with the Mezquita and Granada with the Alhambra.",
        "Coasts differ in character: the Costa Brava is rocky and scenic, the Costa del Sol warm and developed, the Costa Blanca with Alicante and Benidorm the best value. The Canary Islands hold 20–25 °C in midwinter.",
      ],
      de: [
        "Spanien erfordert einen Flug und etwas Planung, bietet aber, was der Balkan nicht hat: Großstädte mit Weltarchitektur, eine Küste von April bis November und Inseln mit Sonne auch im Januar.",
        "Beim ersten Besuch fällt die Wahl meist auf Barcelona (Sagrada Família, Park Güell, Gotisches Viertel) oder Madrid (Prado, Königspalast, Retiro). Andalusien ist die schönste Zehn-Tage-Runde: Sevilla, Córdoba mit der Mezquita und Granada mit der Alhambra.",
        "Die Küsten unterscheiden sich: Costa Brava felsig und malerisch, Costa del Sol warm und erschlossen, Costa Blanca am günstigsten. Die Kanaren haben mitten im Winter 20–25 °C.",
      ],
    },
    spots: [
      {
        name: { sr: "Barselona", en: "Barcelona", de: "Barcelona" },
        text: {
          sr: "Sagrada Familija, Park Gvel i Kaza Batljo, Gotska četvrt, tržnica Boqueria i plaža Barseloneta. Ulaznice za Gaudijeve objekte kupujte online nedeljama unapred — na licu mesta ih često nema.",
          en: "Sagrada Família, Park Güell and Casa Batlló, the Gothic Quarter, La Boqueria market and Barceloneta beach. Buy Gaudí tickets online weeks ahead — they often sell out on site.",
          de: "Sagrada Família, Park Güell und Casa Batlló, Gotisches Viertel, Markt La Boqueria und der Strand Barceloneta. Gaudí-Tickets Wochen im Voraus online kaufen.",
        },
      },
      {
        name: { sr: "Madrid i okolina", en: "Madrid & around", de: "Madrid & Umgebung" },
        text: {
          sr: "Prado, Rejna Sofija sa Gernikom, Kraljevska palata i park Retiro, uz izlete u Toledo i Segoviju — oba na sat vremena brzim vozom. Madrid je najbolji izbor za jesen i proleće.",
          en: "The Prado, Reina Sofía with Guernica, the Royal Palace and Retiro park, plus day trips to Toledo and Segovia — both an hour away by fast train. Madrid is best in autumn and spring.",
          de: "Prado, Reina Sofía mit Guernica, Königspalast und Retiro-Park, dazu Ausflüge nach Toledo und Segovia — beide eine Zugstunde entfernt.",
        },
      },
      {
        name: { sr: "Andaluzija — Sevilja, Granada, Kordoba", en: "Andalusia — Seville, Granada, Córdoba", de: "Andalusien — Sevilla, Granada, Córdoba" },
        text: {
          sr: "Alambra u Granadi je najposećeniji spomenik Španije i traži rezervaciju mesecima unapred. Sevilja donosi Alkazar, katedralu i flamenko, a Kordoba Mezkitu — džamiju-katedralu bez presedana u Evropi.",
          en: "The Alhambra in Granada is Spain's most visited monument and needs booking months ahead. Seville brings the Alcázar, the cathedral and flamenco, while Córdoba has the Mezquita — a mosque-cathedral without parallel in Europe.",
          de: "Die Alhambra in Granada ist Spaniens meistbesuchtes Monument und erfordert eine Buchung Monate im Voraus. Sevilla bietet Alcázar, Kathedrale und Flamenco, Córdoba die Mezquita.",
        },
      },
      {
        name: { sr: "Kanarska ostrva i Balearska ostrva", en: "The Canary & Balearic Islands", de: "Kanarische & Balearische Inseln" },
        text: {
          sr: "Tenerife i Gran Kanarija su zimska destinacija sa 20-25 °C u januaru i vulkanskim pejzažima. Majorka i Ibica su letnje: Majorka za porodice i uvale, Ibica za noćni život.",
          en: "Tenerife and Gran Canaria are winter destinations with 20–25 °C in January and volcanic landscapes. Mallorca and Ibiza are summer: Mallorca for families and coves, Ibiza for nightlife.",
          de: "Teneriffa und Gran Canaria sind Winterziele mit 20–25 °C im Januar. Mallorca und Ibiza sind Sommerziele: Mallorca für Familien, Ibiza für Nachtleben.",
        },
      },
    ],
    when: {
      sr: "Gradovi su najprijatniji u aprilu, maju, septembru i oktobru — leti Sevilja i Kordoba lako prelaze 40 °C. Kupališna sezona na Mediteranu traje od juna do oktobra, a Kanari su celogodišnja destinacija.",
      en: "Cities are most pleasant in April, May, September and October — in summer Seville and Córdoba easily pass 40 °C. The Mediterranean swimming season runs June to October, while the Canaries work year-round.",
      de: "Städte sind im April, Mai, September und Oktober am angenehmsten — im Sommer überschreiten Sevilla und Córdoba leicht 40 °C. Badesaison am Mittelmeer von Juni bis Oktober.",
    },
    travel: {
      sr: "Iz Beograda postoje direktni letovi za Barselonu i Madrid, kao i sezonske linije ka ostrvima; let traje oko tri sata. Unutar Španije najbolji izbor je brzi voz AVE (Madrid–Sevilja za 2.5 sata) ili niskotarifni letovi.",
      en: "There are direct flights from Belgrade to Barcelona and Madrid, plus seasonal island routes; the flight takes about three hours. Within Spain, the AVE high-speed train (Madrid–Seville in 2.5 hours) or low-cost flights work best.",
      de: "Ab Belgrad gibt es Direktflüge nach Barcelona und Madrid sowie saisonale Inselverbindungen; Flugzeit rund drei Stunden. Innerhalb Spaniens empfiehlt sich der Hochgeschwindigkeitszug AVE.",
    },
    docs: {
      sr: "Španija je u Šengenu — potreban je biometrijski pasoš i boravak do 90 dana u 180 dana bez vize. Avio-prevoznici traže pasoš važeći najmanje tri meseca posle povratka; preporučuje se putno osiguranje.",
      en: "Spain is in Schengen — a biometric passport is required, with visa-free stays of up to 90 days within 180. Airlines require a passport valid at least three months beyond return; travel insurance is recommended.",
      de: "Spanien gehört zu Schengen — biometrischer Pass erforderlich, visumfrei bis 90 Tage innerhalb von 180. Reiseversicherung empfohlen.",
    },
    faq: {
      sr: [
        { q: "Koliko traje let iz Beograda za Barselonu?", a: "Oko tri sata direktnim letom. Za Madrid je slično, a za Kanare se najčešće putuje sa presedanjem." },
        { q: "Kada je najbolje ići u Španiju?", a: "Za gradove april-maj i septembar-oktobar; za more jun-septembar; za Kanare bilo koji mesec, uključujući i zimu." },
        { q: "Treba li rezervisati ulaznice unapred?", a: "Obavezno za Alambru, Sagradu Familiju i Park Gvel — ulaznice se rasprodaju nedeljama, ponekad i mesecima unapred." },
        { q: "Da li je potrebna viza za Španiju?", a: "Nije za državljane Srbije, uz biometrijski pasoš i boravak do 90 dana u periodu od 180 dana." },
      ],
      en: [
        { q: "How long is the flight from Belgrade to Barcelona?", a: "About three hours direct. Madrid is similar; the Canaries usually require a connection." },
        { q: "When is the best time to visit Spain?", a: "April–May and September–October for the cities; June–September for the sea; the Canaries any month, winter included." },
        { q: "Should tickets be booked in advance?", a: "Essential for the Alhambra, Sagrada Família and Park Güell — they sell out weeks, sometimes months, ahead." },
        { q: "Do Serbian citizens need a visa?", a: "No — up to 90 days within 180 days with a biometric passport." },
      ],
      de: [
        { q: "Wie lange dauert der Flug von Belgrad nach Barcelona?", a: "Etwa drei Stunden direkt. Nach Madrid ähnlich; die Kanaren meist mit Umstieg." },
        { q: "Wann ist die beste Reisezeit?", a: "April–Mai und September–Oktober für Städte; Juni–September fürs Meer; die Kanaren ganzjährig." },
        { q: "Sollte man Tickets vorbuchen?", a: "Unbedingt für Alhambra, Sagrada Família und Park Güell — oft Wochen bis Monate im Voraus ausverkauft." },
        { q: "Brauchen serbische Staatsbürger ein Visum?", a: "Nein — bis zu 90 Tage innerhalb von 180 Tagen mit biometrischem Pass." },
      ],
    },
  },
];
