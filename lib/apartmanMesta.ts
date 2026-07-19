import type { Lang, Listing } from "./types";

export type MestoGroup = "grad" | "planina" | "banja" | "jezero" | "reka" | "selo";

export type Mesto = {
  slug: string;
  sr: string;
  en: string;
  de: string;
  group: MestoGroup;
  /** kratak, jedinstven opis mesta (SR/EN/DE) */
  hook: [string, string, string];
};

/** Mesta za koja pravimo landing stranice „Apartmani <mesto>". */
export const MESTA: Mesto[] = [
  // — Najveći gradovi —
  { slug: "beograd", sr: "Beograd", en: "Belgrade", de: "Belgrad", group: "grad", hook: [
    "Prestonica sa najvećom ponudom apartmana u zemlji — od Knez Mihailove i Skadarlije do Novog Beograda i Ade Ciganlije.",
    "The capital with the country's largest choice of apartments — from Knez Mihailova and Skadarlija to New Belgrade and Ada Ciganlija.",
    "Die Hauptstadt mit dem größten Apartmentangebot des Landes — von der Knez Mihailova bis Neu-Belgrad und Ada Ciganlija."] },
  { slug: "novi-sad", sr: "Novi Sad", en: "Novi Sad", de: "Novi Sad", group: "grad", hook: [
    "Petrovaradin, Dunavski park i Štrand, uz Frušku goru i Sremske Karlovce na dvadeset minuta vožnje.",
    "Petrovaradin fortress, Danube Park and the Štrand beach, with Fruška Gora and Sremski Karlovci twenty minutes away.",
    "Festung Petrovaradin, Donaupark und der Štrand, mit Fruška Gora und Sremski Karlovci in zwanzig Minuten."] },
  { slug: "nis", sr: "Niš", en: "Niš", de: "Niš", group: "grad", hook: [
    "Tvrđava, Ćele-kula i Niška Banja, uz najbolju roštilj scenu na jugu Srbije.",
    "The fortress, Skull Tower and Niška Banja spa, plus the best grill scene in southern Serbia.",
    "Festung, Schädelturm und das Heilbad Niška Banja, dazu die beste Grillszene Südserbiens."] },
  { slug: "kragujevac", sr: "Kragujevac", en: "Kragujevac", de: "Kragujevac", group: "grad", hook: [
    "Prva prestonica moderne Srbije, sa Šumaričkim parkom i Šumadijom na dohvat ruke.",
    "The first capital of modern Serbia, with Šumarice memorial park and Šumadija all around.",
    "Die erste Hauptstadt des modernen Serbien, mit dem Gedenkpark Šumarice."] },
  { slug: "subotica", sr: "Subotica", en: "Subotica", de: "Subotica", group: "grad", hook: [
    "Secesijska arhitektura i Palićko jezero na osam kilometara od centra.",
    "Art Nouveau architecture and Lake Palić eight kilometres from the centre.",
    "Jugendstil-Architektur und der Palić-See acht Kilometer vom Zentrum."] },
  { slug: "zrenjanin", sr: "Zrenjanin", en: "Zrenjanin", de: "Zrenjanin", group: "grad", hook: [
    "Banatski grad na Begeju, poznat po baroknom centru i ribljoj čorbi.",
    "A Banat town on the Begej, known for its baroque centre and fish stew.",
    "Eine Banater Stadt am Begej, bekannt für ihr barockes Zentrum."] },
  { slug: "pancevo", sr: "Pančevo", en: "Pančevo", de: "Pančevo", group: "grad", hook: [
    "Petnaest minuta od Beograda, uz Tamiš, Dunav i Deliblatsku peščaru.",
    "Fifteen minutes from Belgrade, by the Tamiš, the Danube and the Deliblato Sands.",
    "Fünfzehn Minuten von Belgrad, an Tamiš, Donau und der Deliblato-Sandwüste."] },
  { slug: "cacak", sr: "Čačak", en: "Čačak", de: "Čačak", group: "grad", hook: [
    "Kapija Zapadne Srbije — Ovčarsko-kablarska klisura i Gornja Trepča su nadomak grada.",
    "The gateway to Western Serbia — the Ovčar-Kablar gorge and Gornja Trepča spa are close by.",
    "Das Tor nach Westserbien — die Ovčar-Kablar-Schlucht liegt gleich nebenan."] },
  { slug: "kraljevo", sr: "Kraljevo", en: "Kraljevo", de: "Kraljevo", group: "grad", hook: [
    "Polazna tačka za Žiču, Studenicu, Goč i Mataruršku Banju, u Dolini kraljeva.",
    "The base for Žiča, Studenica, Goč and Mataruška Banja, in the Valley of Kings.",
    "Ausgangspunkt für Žiča, Studenica, Goč und Mataruška Banja."] },
  { slug: "novi-pazar", sr: "Novi Pazar", en: "Novi Pazar", de: "Novi Pazar", group: "grad", hook: [
    "Orijentalna čaršija i UNESCO okolina — Sopoćani, Đurđevi stupovi i Stari Ras.",
    "An oriental bazaar surrounded by UNESCO sites — Sopoćani, Đurđevi Stupovi and Stari Ras.",
    "Orientalischer Basar und UNESCO-Umgebung — Sopoćani, Đurđevi Stupovi und Stari Ras."] },
  { slug: "leskovac", sr: "Leskovac", en: "Leskovac", de: "Leskovac", group: "grad", hook: [
    "Prestonica roštilja i Roštiljijade, uz Vlasinsko jezero i Sijarinsku Banju u okolini.",
    "The capital of grilled meat and the Roštiljijada festival, near Vlasina Lake and Sijarinska Banja.",
    "Die Hauptstadt des Grillens mit dem Roštiljijada-Festival."] },
  { slug: "smederevo", sr: "Smederevo", en: "Smederevo", de: "Smederevo", group: "grad", hook: [
    "Najveća nizijska tvrđava u Evropi, na samoj obali Dunava.",
    "The largest lowland fortress in Europe, right on the Danube bank.",
    "Die größte Flachlandfestung Europas, direkt an der Donau."] },
  { slug: "valjevo", sr: "Valjevo", en: "Valjevo", de: "Valjevo", group: "grad", hook: [
    "Tešnjar i Muselimov konak, a Divčibare, Petnica i Brankovina su na pola sata vožnje.",
    "The Tešnjar quarter and Muselim's Konak, with Divčibare and Petnica half an hour away.",
    "Das Viertel Tešnjar, mit Divčibare und Petnica eine halbe Stunde entfernt."] },
  { slug: "krusevac", sr: "Kruševac", en: "Kruševac", de: "Kruševac", group: "grad", hook: [
    "Lazarev grad i Lazarica, uz Ribarsku Banju i Jastrebac u okolini.",
    "Prince Lazar's town and the Lazarica church, with Ribarska Banja and Jastrebac nearby.",
    "Die Stadt des Fürsten Lazar mit der Lazarica-Kirche."] },
  { slug: "vranje", sr: "Vranje", en: "Vranje", de: "Vranje", group: "grad", hook: [
    "Grad Bore Stankovića i starog gradskog melosa, uz Vranjsku Banju na sedam kilometara.",
    "The town of Bora Stanković and old urban song, with Vranjska Banja seven kilometres away.",
    "Die Stadt von Bora Stanković, mit dem Kurort Vranjska Banja in sieben Kilometern."] },
  { slug: "sabac", sr: "Šabac", en: "Šabac", de: "Šabac", group: "grad", hook: [
    "Šabačko letnje pozorje, Štrand na Savi i Mačva sa Zasavicom u okolini.",
    "The summer theatre festival, the Sava beach and the Mačva plain with Zasavica nearby.",
    "Sommertheater, Sava-Strand und die Mačva-Ebene mit Zasavica."] },
  { slug: "uzice", sr: "Užice", en: "Užice", de: "Užice", group: "grad", hook: [
    "Grad na Đetinji sa Starim gradom i vodopadima, na pola puta do Zlatibora i Tare.",
    "A town on the Đetinja with an old fortress and waterfalls, halfway to Zlatibor and Tara.",
    "Eine Stadt an der Đetinja, auf halbem Weg nach Zlatibor und Tara."] },
  { slug: "sombor", sr: "Sombor", en: "Sombor", de: "Sombor", group: "grad", hook: [
    "Najzeleniji grad Vojvodine, sa drvoredima, salašima i Bezdanom u okolini.",
    "The greenest town in Vojvodina, with tree-lined streets, farmsteads and Bezdan nearby.",
    "Die grünste Stadt der Vojvodina, mit Alleen und Salaši."] },
  { slug: "pozarevac", sr: "Požarevac", en: "Požarevac", de: "Požarevac", group: "grad", hook: [
    "Viminacijum i Srebrno jezero su na pola sata vožnje od centra.",
    "Viminacium and Silver Lake are half an hour from the centre.",
    "Viminacium und der Silbersee liegen eine halbe Stunde entfernt."] },
  { slug: "sremska-mitrovica", sr: "Sremska Mitrovica", en: "Sremska Mitrovica", de: "Sremska Mitrovica", group: "grad", hook: [
    "Antički Sirmijum, jedna od prestonica Rimskog carstva, na obali Save.",
    "Ancient Sirmium, one of the capitals of the Roman Empire, on the Sava.",
    "Das antike Sirmium, eine Hauptstadt des Römischen Reiches, an der Save."] },
  { slug: "jagodina", sr: "Jagodina", en: "Jagodina", de: "Jagodina", group: "grad", hook: [
    "Akva-park i zoo vrt čine je omiljenom destinacijom za porodice sa decom.",
    "The water park and zoo make it a favourite for families with children.",
    "Wasserpark und Zoo machen sie zum Favoriten für Familien."] },
  { slug: "zajecar", sr: "Zaječar", en: "Zaječar", de: "Zaječar", group: "grad", hook: [
    "Felix Romuliana pod zaštitom UNESCO-a i Gamzigradska Banja na desetak kilometara.",
    "UNESCO-listed Felix Romuliana and Gamzigrad spa about ten kilometres away.",
    "Das UNESCO-Welterbe Felix Romuliana und das Heilbad Gamzigrad."] },

  // — Planine —
  { slug: "zlatibor", sr: "Zlatibor", en: "Zlatibor", de: "Zlatibor", group: "planina", hook: [
    "Najveća ponuda apartmana na planini u Srbiji — Gold Gondola, jezero i šetalište u centru.",
    "The largest choice of mountain apartments in Serbia — the Gold Gondola, the lake and the promenade.",
    "Das größte Angebot an Bergapartments in Serbien — Gold Gondola, See und Promenade."] },
  { slug: "kopaonik", sr: "Kopaonik", en: "Kopaonik", de: "Kopaonik", group: "planina", hook: [
    "Ski centar sa preko 55 km staza — apartmani uz same žičare i u podnožju, u Brzeću.",
    "A ski resort with over 55 km of runs — apartments by the lifts and at the foot, in Brzeće.",
    "Skigebiet mit über 55 km Pisten — Apartments an den Liften und in Brzeće."] },
  { slug: "tara", sr: "Tara", en: "Tara", de: "Tara", group: "planina", hook: [
    "Nacionalni park, Banjska stena i Perućac — smeštaj u Kaluđerskim Barama i Mitrovcu.",
    "The national park, Banjska Stena and Perućac — stays in Kaluđerske Bare and Mitrovac.",
    "Nationalpark, Banjska Stena und Perućac — Unterkünfte in Kaluđerske Bare."] },
  { slug: "divcibare", sr: "Divčibare", en: "Divčibare", de: "Divčibare", group: "planina", hook: [
    "Vazdušna banja na Maljenu, sat i po od Beograda — najbliži planinski vazduh prestonici.",
    "An 'air spa' on Mount Maljen, ninety minutes from Belgrade — the capital's nearest mountain air.",
    "Ein „Luftkurort\" auf dem Maljen, 90 Minuten von Belgrad."] },
  { slug: "stara-planina", sr: "Stara planina", en: "Stara Planina", de: "Stara Planina", group: "planina", hook: [
    "Babin Zub, vodopadi Tupavica i Čungulj i ski centar na istoku Srbije.",
    "Babin Zub, the Tupavica and Čungulj waterfalls and a ski centre in eastern Serbia.",
    "Babin Zub, die Wasserfälle Tupavica und Čungulj und ein Skizentrum."] },
  { slug: "goc", sr: "Goč", en: "Goč", de: "Goč", group: "planina", hook: [
    "Šumovita planina iznad Vrnjačke Banje — spoj banjskog i planinskog odmora.",
    "A forested mountain above Vrnjačka Banja — spa and mountain holidays combined.",
    "Ein bewaldeter Berg über Vrnjačka Banja — Kur und Berge zugleich."] },
  { slug: "zlatar", sr: "Zlatar", en: "Zlatar", de: "Zlatar", group: "planina", hook: [
    "Vazdušna banja iznad Nove Varoši, sa Zlatarskim jezerom i Uvcem u okolini.",
    "An air spa above Nova Varoš, with Zlatar Lake and the Uvac nearby.",
    "Ein Luftkurort über Nova Varoš, mit Zlatar-See und Uvac."] },
  { slug: "rudnik", sr: "Rudnik", en: "Rudnik", de: "Rudnik", group: "planina", hook: [
    "Najviši vrh Šumadije, na sat vremena od Beograda i Kragujevca.",
    "The highest peak of Šumadija, an hour from Belgrade and Kragujevac.",
    "Der höchste Gipfel der Šumadija, eine Stunde von Belgrad."] },
  { slug: "mokra-gora", sr: "Mokra Gora", en: "Mokra Gora", de: "Mokra Gora", group: "planina", hook: [
    "Šarganska osmica i Kusturičin Drvengrad, u dolini između Tare i Zlatibora.",
    "The Šargan Eight railway and Kusturica's Drvengrad, between Tara and Zlatibor.",
    "Die Šargan-Acht und Kusturicas Drvengrad, zwischen Tara und Zlatibor."] },
  { slug: "fruska-gora", sr: "Fruška gora", en: "Fruška Gora", de: "Fruška Gora", group: "planina", hook: [
    "Nacionalni park sa šesnaest manastira i vinskim putem, nadomak Novog Sada.",
    "A national park with sixteen monasteries and a wine road, next to Novi Sad.",
    "Nationalpark mit sechzehn Klöstern und Weinstraße, bei Novi Sad."] },
  { slug: "golija", sr: "Golija", en: "Golija", de: "Golija", group: "planina", hook: [
    "UNESCO rezervat biosfere sa Studenicom i najčistijim vazduhom u Srbiji.",
    "A UNESCO biosphere reserve with Studenica and the cleanest air in Serbia.",
    "UNESCO-Biosphärenreservat mit Studenica und der reinsten Luft Serbiens."] },
  { slug: "ivanjica", sr: "Ivanjica", en: "Ivanjica", de: "Ivanjica", group: "planina", hook: [
    "Vazdušna banja na Moravici, u podnožju Golije i Javora.",
    "An air spa on the Moravica, at the foot of Golija and Javor.",
    "Ein Luftkurort an der Moravica, am Fuße von Golija und Javor."] },
  { slug: "brzece", sr: "Brzeće", en: "Brzeće", de: "Brzeće", group: "planina", hook: [
    "Selo u podnožju Kopaonika sa gondolom — povoljnija alternativa smeštaju na vrhu.",
    "A village at the foot of Kopaonik with a gondola — a cheaper alternative to staying at the top.",
    "Ein Dorf am Fuße des Kopaonik mit Gondel — die günstigere Alternative."] },

  // — Banje —
  { slug: "vrnjacka-banja", sr: "Vrnjačka Banja", en: "Vrnjačka Banja", de: "Vrnjačka Banja", group: "banja", hook: [
    "Najposećenija banja u Srbiji — sedam mineralnih izvora, park i Vrnjačka reka.",
    "Serbia's most visited spa town — seven mineral springs, a park and the Vrnjačka river.",
    "Der meistbesuchte Kurort Serbiens — sieben Mineralquellen und ein Park."] },
  { slug: "sokobanja", sr: "Sokobanja", en: "Sokobanja", de: "Sokobanja", group: "banja", hook: [
    "„Soko Banja, Soko grad\" — hamam, Ozren, Rtanj i Ripaljka u okolini.",
    "The classic spa town — a Turkish bath, Mount Ozren, Rtanj and the Ripaljka waterfall.",
    "Der klassische Kurort — Hamam, Ozren, Rtanj und der Ripaljka-Wasserfall."] },
  { slug: "banja-vrujci", sr: "Banja Vrujci", en: "Banja Vrujci", de: "Banja Vrujci", group: "banja", hook: [
    "Topla voda od 28 °C u podnožju Suvobora, na sat i po od Beograda — omiljena porodična banja.",
    "Naturally 28 °C water at the foot of Suvobor, ninety minutes from Belgrade — a family favourite.",
    "Natürlich 28 °C warmes Wasser am Fuße des Suvobor, 90 Minuten von Belgrad."] },
  { slug: "banja-koviljaca", sr: "Banja Koviljača", en: "Banja Koviljača", de: "Banja Koviljača", group: "banja", hook: [
    "Kraljevska banja na Drini, sa sumporovitim izvorima i parkom od 40 hektara.",
    "The royal spa on the Drina, with sulphur springs and a 40-hectare park.",
    "Das königliche Bad an der Drina, mit Schwefelquellen und großem Park."] },
  { slug: "niska-banja", sr: "Niška Banja", en: "Niška Banja", de: "Niška Banja", group: "banja", hook: [
    "Termalna banja na deset kilometara od Niša, poznata po lečenju srca i reume.",
    "A thermal spa ten kilometres from Niš, known for heart and rheumatic treatment.",
    "Ein Thermalbad zehn Kilometer von Niš, bekannt für Herz- und Rheumakuren."] },
  { slug: "prolom-banja", sr: "Prolom Banja", en: "Prolom Banja", de: "Prolom Banja", group: "banja", hook: [
    "Prolom voda i Đavolja varoš na 20 kilometara — banja na Radan planini.",
    "Prolom mineral water and Devil's Town 20 km away — a spa on Mount Radan.",
    "Prolom-Wasser und die Teufelsstadt 20 km entfernt."] },
  { slug: "lukovska-banja", sr: "Lukovska Banja", en: "Lukovska Banja", de: "Lukovska Banja", group: "banja", hook: [
    "Najviša banja u Srbiji, na 681 m, sa termalnim bazenima ispod Kopaonika.",
    "Serbia's highest spa, at 681 m, with thermal pools below Kopaonik.",
    "Serbiens höchster Kurort auf 681 m, mit Thermalbecken unter dem Kopaonik."] },
  { slug: "ribarska-banja", sr: "Ribarska Banja", en: "Ribarska Banja", de: "Ribarska Banja", group: "banja", hook: [
    "Banja na obroncima Jastrepca, u zelenilu i tišini kod Kruševca.",
    "A spa on the slopes of Jastrebac, in greenery and quiet near Kruševac.",
    "Ein Kurort an den Hängen des Jastrebac, bei Kruševac."] },
  { slug: "gornja-trepca", sr: "Gornja Trepča", en: "Gornja Trepča", de: "Gornja Trepča", group: "banja", hook: [
    "Atomska banja kod Čačka, poznata po lečenju neuroloških tegoba.",
    "The 'atomic spa' near Čačak, known for treating neurological conditions.",
    "Das „Atombad\" bei Čačak, bekannt für neurologische Behandlungen."] },
  { slug: "vranjska-banja", sr: "Vranjska Banja", en: "Vranjska Banja", de: "Vranjska Banja", group: "banja", hook: [
    "Najtoplija mineralna voda na Balkanu, preko 90 °C na izvoru.",
    "The hottest mineral water in the Balkans, over 90 °C at the source.",
    "Das heißeste Mineralwasser des Balkans, über 90 °C an der Quelle."] },
  { slug: "arandjelovac", sr: "Aranđelovac", en: "Aranđelovac", de: "Aranđelovac", group: "banja", hook: [
    "Bukovička Banja i park Bukovička sa skulpturama, uz Oplenac i Topolu.",
    "Bukovička Banja and its sculpture park, with Oplenac and Topola nearby.",
    "Bukovička Banja mit Skulpturenpark, dazu Oplenac und Topola."] },
  { slug: "banja-junakovic", sr: "Banja Junaković", en: "Banja Junaković", de: "Banja Junaković", group: "banja", hook: [
    "Banja kod Apatina sa termalnim bazenima i Dunavom nadomak.",
    "A spa near Apatin with thermal pools and the Danube close by.",
    "Ein Kurort bei Apatin mit Thermalbecken und der Donau."] },
  { slug: "mataruska-banja", sr: "Mataruška Banja", en: "Mataruška Banja", de: "Mataruška Banja", group: "banja", hook: [
    "Sumporovita banja na Ibru, između Kraljeva i Maglića.",
    "A sulphur spa on the Ibar, between Kraljevo and Maglič.",
    "Ein Schwefelbad am Ibar, zwischen Kraljevo und Maglič."] },

  // — Jezera i reke —
  { slug: "srebrno-jezero", sr: "Srebrno jezero", en: "Silver Lake", de: "Silbersee", group: "jezero", hook: [
    "„Srpsko more\" kod Velikog Gradišta — peščane plaže, akva-park i Golubac na 20 km.",
    "The 'Serbian sea' near Veliko Gradište — sandy beaches, a water park and Golubac 20 km away.",
    "Das „serbische Meer\" bei Veliko Gradište — Sandstrände und Golubac in 20 km."] },
  { slug: "palic", sr: "Palić", en: "Palić", de: "Palić", group: "jezero", hook: [
    "Jezero i secesijski kompleks kod Subotice, sa zoo vrtom i šetalištem uz vodu.",
    "A lake and Art Nouveau complex near Subotica, with a zoo and lakeside promenade.",
    "See und Jugendstil-Ensemble bei Subotica, mit Zoo und Uferpromenade."] },
  { slug: "perucac", sr: "Perućac", en: "Perućac", de: "Perućac", group: "jezero", hook: [
    "Smaragdno jezero na Drini ispod Tare, sa najkraćom rekom na svetu — Vrelo.",
    "An emerald lake on the Drina below Tara, with the world's shortest river, Vrelo.",
    "Ein smaragdgrüner See an der Drina unter der Tara, mit dem Fluss Vrelo."] },
  { slug: "vlasinsko-jezero", sr: "Vlasinsko jezero", en: "Vlasina Lake", de: "Vlasina-See", group: "jezero", hook: [
    "Najviše veštačko jezero u Srbiji, na 1.200 m, sa plutajućim ostrvima.",
    "Serbia's highest artificial lake, at 1,200 m, with floating islands.",
    "Serbiens höchster Stausee auf 1.200 m, mit schwimmenden Inseln."] },
  { slug: "zlatarsko-jezero", sr: "Zlatarsko jezero", en: "Zlatar Lake", de: "Zlatar-See", group: "jezero", hook: [
    "Jezero na Uvcu ispod Zlatara — čamci, ribolov i meandri u blizini.",
    "A lake on the Uvac below Zlatar — boats, fishing and the meanders nearby.",
    "Ein See am Uvac unter dem Zlatar — Boote, Angeln und die Mäander."] },
  { slug: "bajina-basta", sr: "Bajina Bašta", en: "Bajina Bašta", de: "Bajina Bašta", group: "reka", hook: [
    "Kuća na Drini, Drinska regata i ulaz u Nacionalni park Tara.",
    "The house on the Drina, the Drina Regatta and the gateway to Tara National Park.",
    "Das Haus auf der Drina, die Drina-Regatta und das Tor zum Tara-Nationalpark."] },
  { slug: "ljubovija", sr: "Ljubovija", en: "Ljubovija", de: "Ljubovija", group: "reka", hook: [
    "Splavovi i etno domaćinstva uz Drinu, na putu ka Soko Gradu i Tari.",
    "River rafts and homesteads on the Drina, on the way to Soko Grad and Tara.",
    "Flussflöße und Höfe an der Drina, auf dem Weg nach Soko Grad."] },
  { slug: "donji-milanovac", sr: "Donji Milanovac", en: "Donji Milanovac", de: "Donji Milanovac", group: "reka", hook: [
    "Srce Đerdapske klisure, sa Lepenskim Virom i najlepšim vidikovcima na Dunavu.",
    "The heart of the Iron Gates gorge, with Lepenski Vir and the finest Danube viewpoints.",
    "Das Herz des Eisernen Tors, mit Lepenski Vir und den schönsten Donau-Aussichten."] },
  { slug: "golubac", sr: "Golubac", en: "Golubac", de: "Golubac", group: "reka", hook: [
    "Obnovljena tvrđava na ulazu u Đerdap, gde je Dunav najširi.",
    "A restored fortress at the entrance to the Iron Gates, where the Danube is widest.",
    "Eine restaurierte Festung am Eingang des Eisernen Tors."] },

  // — Sela i etno destinacije —
  { slug: "sirogojno", sr: "Sirogojno", en: "Sirogojno", de: "Sirogojno", group: "selo", hook: [
    "Muzej „Staro selo\" na Zlatiboru — brvnare, stari zanati i domaća hrana.",
    "The 'Old Village' open-air museum on Zlatibor — log houses, crafts and home cooking.",
    "Das Freilichtmuseum „Altes Dorf\" auf dem Zlatibor."] },
  { slug: "drvengrad", sr: "Drvengrad (Mećavnik)", en: "Drvengrad (Mećavnik)", de: "Drvengrad (Mećavnik)", group: "selo", hook: [
    "Kusturičino drveno selo iznad Mokre Gore, sa Kustendorf festivalom.",
    "Kusturica's wooden village above Mokra Gora, home of the Küstendorf festival.",
    "Kusturicas Holzdorf über Mokra Gora, Heimat des Küstendorf-Festivals."] },
  { slug: "trsic", sr: "Tršić", en: "Tršić", de: "Tršić", group: "selo", hook: [
    "Rodno selo Vuka Karadžića kod Loznice, sa manastirom Tronoša u blizini.",
    "The birthplace of Vuk Karadžić near Loznica, with Tronoša monastery nearby.",
    "Der Geburtsort von Vuk Karadžić bei Loznica."] },
  { slug: "topola-oplenac", sr: "Topola i Oplenac", en: "Topola & Oplenac", de: "Topola & Oplenac", group: "selo", hook: [
    "Karađorđeva zadužbina, crkva Svetog Đorđa sa mozaicima i vinski podrumi Šumadije.",
    "Karađorđe's endowment, St George's church with its mosaics and Šumadija's wine cellars.",
    "Karađorđes Stiftung, die Georgskirche mit Mosaiken und Weinkeller der Šumadija."] },
  { slug: "sremski-karlovci", sr: "Sremski Karlovci", en: "Sremski Karlovci", de: "Sremski Karlovci", group: "selo", hook: [
    "Bermet, Patrijaršija i Karlovačka gimnazija, na obroncima Fruške gore.",
    "Bermet wine, the Patriarchate and the historic grammar school, on Fruška Gora's slopes.",
    "Bermet-Wein, das Patriarchat und das historische Gymnasium."] },
  { slug: "vrsac", sr: "Vršac", en: "Vršac", de: "Vršac", group: "selo", hook: [
    "Vinogradi na Vršačkim planinama, kula na brdu i najveći crkveni toranj u Vojvodini.",
    "Vineyards on the Vršac hills, a tower on the summit and Vojvodina's tallest church spire.",
    "Weinberge im Vršac-Gebirge und der höchste Kirchturm der Vojvodina."] },
];

/** Naslovne slike po tipu mesta (svaka stranica ima svoj heder). */
const GROUP_IMG: Record<MestoGroup, string> = {
  grad: "1519677100203-a0e668c92439",
  planina: "1464822759023-fed622ff2c3b",
  banja: "1571902943202-507ec2618e8f",
  jezero: "1439066615861-d1af74d74000",
  reka: "1437482078695-73f5ca6c96e2",
  selo: "1500382017468-9049fed747ef",
};

/** Slike za pojedinačna, najtraženija mesta. */
const MESTO_IMG: Record<string, string> = {
  beograd: "1519677100203-a0e668c92439",
  "novi-sad": "1516483638261-f4dbaf036963",
  zlatibor: "1464822759023-fed622ff2c3b",
  kopaonik: "1551524559-8af4e6624178",
  tara: "1469474968028-56623f02e42e",
  divcibare: "1483728642387-6c3bdd6c93e5",
  "stara-planina": "1454496522488-7a8e488e8606",
  "vrnjacka-banja": "1544161515-4ab6ce6db874",
  sokobanja: "1571902943202-507ec2618e8f",
  "banja-vrujci": "1540555700478-4be289fbecef",
  "srebrno-jezero": "1439066615861-d1af74d74000",
  palic: "1520250497591-112f2f40a3f4",
  perucac: "1470071459604-3b5ec3a7fe05",
  "bajina-basta": "1437482078695-73f5ca6c96e2",
  uvac: "1426604966848-d7adac402bff",
  "mokra-gora": "1523906834658-6e24ef2386f9",
  sirogojno: "1500382017468-9049fed747ef",
  drvengrad: "1449158743715-0a90ebb6d2d8",
};

export const mestoImg = (m: Mesto) =>
  `https://images.unsplash.com/photo-${MESTO_IMG[m.slug] || GROUP_IMG[m.group]}?auto=format&fit=crop&w=1600&q=80`;

export const mestoBySlug = (s: string) => MESTA.find((m) => m.slug === s);
export const mestoName = (m: Mesto, l: Lang) => (l === "sr" ? m.sr : l === "de" ? m.de : m.en);
export const mestoHook = (m: Mesto, l: Lang) => (l === "sr" ? m.hook[0] : l === "de" ? m.hook[2] : m.hook[1]);

export const apartmentsCityPath = (slug: string, l: Lang) =>
  l === "sr" ? `/apartmani/${slug}` : l === "de" ? `/de/apartments/${slug}` : `/en/apartments/${slug}`;

/** Oglasi za dato mesto — po polju place, municipality ili regionu. */
export function listingsForMesto(all: Listing[], m: Mesto): Listing[] {
  const keys = [m.sr.toLowerCase(), m.slug.replace(/-/g, " ")];
  const hit = (v?: string) => !!v && keys.some((k) => v.toLowerCase().includes(k));
  return all.filter((x) => x.type === "stay" && (hit(x.place) || hit(x.municipality) || hit(x.region.sr) || hit(x.name.sr)));
}
