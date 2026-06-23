import type { Kind, Lang } from "./types";
export type Faq = { q: string; a: string };

const FAQ: Record<Kind, { sr: Faq[]; en: Faq[] }> = {
  mountain: {
    sr: [
      { q: "Koja planina u Srbiji je najbolja za skijanje?", a: "Kopaonik je najveći i najopremljeniji ski-centar, sa preko 55 km uređenih staza i pouzdanim snegom od decembra do aprila. Dobre alternative sa kraćim redovima su Stara planina (Babin Zub) i Zlatibor sa Tornikom." },
      { q: "Kada je najbolje vreme za posetu planinama?", a: "Zimi (decembar–mart) za skijanje i sankanje, a leti (jun–septembar) za planinarenje, vožnju bicikla i odmor od vrućine, kada je planinski vazduh prijatno svež." },
      { q: "Da li su planine pogodne za porodice sa decom?", a: "Jesu. Zlatibor i Divčibare imaju blage staze, uređene parkove i sadržaje za decu, dok Kopaonik nudi škole skijanja i lakše staze za početnike." },
      { q: "Kako se stiže do Kopaonika i Zlatibora?", a: "Kopaonik je oko 280 km od Beograda (autom ~4 sata), a Zlatibor oko 230 km (~3 sata). Do oba vode dobri putevi, a u sezoni saobraćaju i autobuske linije." },
    ],
    en: [
      { q: "Which mountain in Serbia is best for skiing?", a: "Kopaonik is the largest and best-equipped ski resort, with over 55 km of groomed slopes and reliable snow from December to April. Good alternatives with shorter lift lines are Stara Planina (Babin Zub) and Zlatibor's Tornik." },
      { q: "When is the best time to visit the mountains?", a: "Winter (December–March) for skiing and sledding, and summer (June–September) for hiking, cycling and escaping the heat, when the mountain air is pleasantly cool." },
      { q: "Are the mountains suitable for families with children?", a: "Yes. Zlatibor and Divčibare have gentle trails, landscaped parks and activities for kids, while Kopaonik offers ski schools and easy beginner slopes." },
      { q: "How do I get to Kopaonik and Zlatibor?", a: "Kopaonik is about 280 km from Belgrade (around 4 hours by car), and Zlatibor about 230 km (around 3 hours). Both are reached by good roads, with bus lines in season." },
    ],
  },
  lake: {
    sr: [
      { q: "Koje jezero u Srbiji je najlepše za kupanje?", a: "Srebrno jezero, takozvano „srpsko more\", ima peščane plaže i razvijenu turističku ponudu. Palić i Perućac su omiljeni za miran, porodičan odmor." },
      { q: "Kada traje sezona kupanja na jezerima?", a: "Glavna sezona je od juna do početka septembra, kada je voda dovoljno topla; Srebrno jezero i Palić tada imaju uređene plaže i vodene sportove." },
      { q: "Koja jezera su dobra za ribolov?", a: "Vlasinsko, Zlatarsko i Perućačko jezero poznata su po ribolovu; za pecanje je potrebna dozvola koju izdaju lokalna ribolovačka udruženja." },
      { q: "Ima li smeštaja uz jezera?", a: "Da — od apartmana i vila do etno domaćinstava na obali. Sve opcije i cene možete uporediti u sekciji Smeštaj." },
    ],
    en: [
      { q: "Which lake in Serbia is best for swimming?", a: "Silver Lake (the 'Serbian sea') has sandy beaches and well-developed tourist facilities, while Palić and Perućac are favourites for quiet, family holidays." },
      { q: "When is the swimming season on the lakes?", a: "The main season runs from June to early September, when the water is warm enough; Silver Lake and Palić then have organised beaches and water sports." },
      { q: "Which lakes are good for fishing?", a: "Vlasina, Zlatar and Perućac lakes are known for fishing; a permit issued by local angling associations is required." },
      { q: "Is there accommodation by the lakes?", a: "Yes — from apartments and villas to lakeside homesteads. You can compare all options and prices in the Accommodation section." },
    ],
  },
  river: {
    sr: [
      { q: "Koja reka u Srbiji je najbolja za rafting?", a: "Tara i Drina su najpoznatije za rafting, sa brzacima i kanjonima netaknute prirode. Drinska regata kod Bajine Bašte je najveći rečni spektakl, dok je Uvac idealan za mirnu vožnju čamcem kroz čuvene meandre." },
      { q: "Gde se može kupati na rekama u Srbiji?", a: "Uz Dunav postoje uređene rečne plaže (Lido, Štrand u Novom Sadu, Srebrno jezero uz Dunav), a popularna su i kupališta na Drini i Zapadnoj Moravi tokom leta." },
      { q: "Da li je za ribolov na reci potrebna dozvola?", a: "Jeste — za pecanje na Dunavu, Drini, Ibru i drugim rekama potrebna je dozvola koju izdaju lokalna ribolovačka udruženja ili upravljači ribarskih područja." },
      { q: "Ima li smeštaja uz reke?", a: "Da — vikendice, apartmani i etno domaćinstva uz samu vodu, posebno uz Drinu, Taru i Uvac. Opcije i cene uporedite u sekciji Smeštaj." },
    ],
    en: [
      { q: "Which river in Serbia is best for rafting?", a: "The Tara and Drina are the best known for rafting, with rapids and pristine canyons. The Drina Regatta near Bajina Bašta is the biggest river event, while the Uvac is ideal for calm boat trips through its famous meanders." },
      { q: "Where can you swim on Serbia's rivers?", a: "The Danube has landscaped river beaches (Lido, Štrand in Novi Sad, Silver Lake by the Danube), and there are popular bathing spots on the Drina and Zapadna Morava in summer." },
      { q: "Do you need a permit to fish on a river?", a: "Yes — fishing on the Danube, Drina, Ibar and other rivers requires a permit issued by local angling associations or fishing-area managers." },
      { q: "Is there accommodation by the rivers?", a: "Yes — cottages, apartments and ethno homesteads right by the water, especially along the Drina, Tara and Uvac. Compare options and prices in the Accommodation section." },
    ],
  },
  spa: {
    sr: [
      { q: "Koja banja je najbolja za reumu i bolove u zglobovima?", a: "Vrnjačka Banja i Sokobanja imaju dugu tradiciju lečenja reumatskih i kardiovaskularnih tegoba, dok je Banja Koviljača poznata po sumporovitim izvorima za kožu i zglobove." },
      { q: "Šta se leči u srpskim banjama?", a: "Najčešće reumatska, kardiovaskularna, respiratorna i kožna oboljenja, kao i stanja posle operacija; uz lečenje, sve više banja nudi i wellness i spa programe." },
      { q: "Da li je za banju potreban uput lekara?", a: "Za odmor i wellness nije — slobodno rezervišete. Za lečenje o trošku osiguranja potreban je uput, dok privatno možete koristiti terapije bez uputa." },
      { q: "Koja banja je najbliža Beogradu?", a: "Banja Koviljača i Bukovička banja u Aranđelovcu su među najbližima (oko sat i po do dva vožnje), pa su pogodne i za vikend odmor." },
    ],
    en: [
      { q: "Which spa is best for rheumatism and joint pain?", a: "Vrnjačka Banja and Sokobanja have a long tradition of treating rheumatic and cardiovascular conditions, while Banja Koviljača is known for sulphur springs for skin and joints." },
      { q: "What is treated in Serbian spas?", a: "Most often rheumatic, cardiovascular, respiratory and skin conditions, as well as post-surgery recovery; alongside treatment, more spas now offer wellness and spa programmes." },
      { q: "Do I need a doctor's referral for a spa?", a: "Not for leisure and wellness — you can book freely. For insurance-funded treatment a referral is needed, while privately you can use therapies without one." },
      { q: "Which spa is closest to Belgrade?", a: "Banja Koviljača and Bukovička Banja in Aranđelovac are among the closest (about 1.5–2 hours away), making them ideal for weekend breaks." },
    ],
  },
  ethno: {
    sr: [
      { q: "Šta je etno selo?", a: "Etno selo je naselje koje čuva tradicionalnu arhitekturu, stare zanate, gastronomiju i način života srpskog sela, najčešće uređeno za posetioce i noćenje." },
      { q: "Koja etno sela u Srbiji vredi posetiti?", a: "Najpoznatiji su Drvengrad (Mećavnik) Emira Kusturice na Mokroj Gori, Staro selo u Sirogojnu i Tršić, rodno mesto Vuka Karadžića." },
      { q: "Može li se prenoćiti u etno selu?", a: "Može — mnoga etno sela nude smeštaj u tradicionalnim brvnarama i konacima, uz domaću hranu i autentičan doživljaj." },
      { q: "Da li su etno sela pogodna za jednodnevni izlet?", a: "Jesu, posebno uz obilazak okoline; Drvengrad se odlično spaja sa vožnjom Šarganske osmice, a Sirogojno sa Zlatiborom." },
    ],
    en: [
      { q: "What is an ethno village?", a: "An ethno village is a settlement that preserves traditional architecture, old crafts, cuisine and the way of life of the Serbian countryside, usually arranged for visitors and overnight stays." },
      { q: "Which ethno villages in Serbia are worth visiting?", a: "The best known are Drvengrad (Mećavnik) by Emir Kusturica on Mokra Gora, the Old Village museum in Sirogojno, and Tršić, the birthplace of Vuk Karadžić." },
      { q: "Can you stay overnight in an ethno village?", a: "Yes — many ethno villages offer accommodation in traditional log houses and lodges, with home-cooked food and an authentic experience." },
      { q: "Are ethno villages good for a day trip?", a: "Yes, especially combined with the surroundings; Drvengrad pairs well with the Šargan Eight railway, and Sirogojno with Zlatibor." },
    ],
  },
  stay: {
    sr: [
      { q: "Kako da rezervišem smeštaj?", a: "Na stranici željenog smeštaja popunite formu za upit; domaćin vam odgovara, najčešće u roku od 24 sata." },
      { q: "Da li je oglašavanje smeštaja besplatno?", a: "Jeste — registracija i postavljanje oglasa su potpuno besplatni. Proviziju plaćate tek kada vam dovedemo goste." },
      { q: "Mogu li da oglasim više objekata?", a: "Možete neograničen broj — svaki smeštaj se dodaje zasebno, sa svojim naslovom, opisom, fotografijama, videom i kalendarom dostupnosti." },
      { q: "Kako da znam da je smeštaj slobodan?", a: "Na stranici svakog smeštaja prikazan je kalendar dostupnosti; domaćini ga ažuriraju i mogu da ga sinhronizuju sa Booking-om i Airbnb-om." },
    ],
    en: [
      { q: "How do I book accommodation?", a: "On the listing's page fill in the inquiry form; the host replies, usually within 24 hours." },
      { q: "Is listing accommodation free?", a: "Yes — registering and posting a listing are completely free. You pay a commission only when we bring you guests." },
      { q: "Can I list multiple properties?", a: "You can list as many as you like — each is added separately, with its own title, description, photos, video and availability calendar." },
      { q: "How do I know if a place is available?", a: "Each listing shows an availability calendar; hosts keep it updated and can sync it with Booking.com and Airbnb." },
    ],
  },
};


const FAQ_DE: Record<Kind, Faq[]> = {
  mountain: [
    { q: "Welcher Berg in Serbien eignet sich am besten zum Skifahren?", a: "Kopaonik ist das größte und am besten ausgestattete Skigebiet, mit über 55 km Pisten und verlässlichem Schnee von Dezember bis April. Gute Alternativen mit kürzeren Wartezeiten sind Stara Planina (Babin Zub) und Zlatibor mit Tornik." },
    { q: "Wann ist die beste Reisezeit für die Berge?", a: "Im Winter (Dezember–März) zum Skifahren und Rodeln, im Sommer (Juni–September) zum Wandern, Radfahren und zur Abkühlung, wenn die Bergluft angenehm frisch ist." },
    { q: "Sind die Berge für Familien mit Kindern geeignet?", a: "Ja. Zlatibor und Divčibare haben sanfte Wege, gepflegte Parks und Angebote für Kinder, während Kopaonik Skischulen und leichte Pisten für Anfänger bietet." },
    { q: "Wie erreicht man Kopaonik und Zlatibor?", a: "Kopaonik liegt etwa 280 km von Belgrad entfernt (ca. 4 Std. mit dem Auto), Zlatibor etwa 230 km (ca. 3 Std.). Beide sind über gute Straßen erreichbar, in der Saison auch mit Buslinien." },
  ],
  lake: [
    { q: "Welcher See in Serbien eignet sich am besten zum Baden?", a: "Der Silbersee (das „serbische Meer“) hat Sandstrände und ein gut ausgebautes touristisches Angebot, während Palić und Perućac für ruhigen Familienurlaub beliebt sind." },
    { q: "Wann ist die Badesaison an den Seen?", a: "Die Hauptsaison läuft von Juni bis Anfang September, wenn das Wasser warm genug ist; Silbersee und Palić haben dann gepflegte Strände und Wassersport." },
    { q: "Welche Seen sind gut zum Angeln?", a: "Die Seen Vlasina, Zlatar und Perućac sind fürs Angeln bekannt; eine Genehmigung der örtlichen Angelvereine ist erforderlich." },
    { q: "Gibt es Unterkünfte an den Seen?", a: "Ja — von Apartments und Villen bis zu Ethno-Höfen am Ufer. Alle Optionen und Preise vergleichen Sie im Bereich Unterkünfte." },
  ],
  river: [
    { q: "Welcher Fluss in Serbien eignet sich am besten zum Rafting?", a: "Tara und Drina sind die bekanntesten fürs Rafting, mit Stromschnellen und unberührten Schluchten. Die Drina-Regatta bei Bajina Bašta ist das größte Flussspektakel, während der Uvac mit seinen berühmten Mäandern ideal für ruhige Bootsfahrten ist." },
    { q: "Wo kann man in Serbiens Flüssen baden?", a: "An der Donau gibt es gepflegte Flussstrände (Lido, Štrand in Novi Sad, Silbersee an der Donau), und im Sommer sind auch Badestellen an der Drina und der Zapadna Morava beliebt." },
    { q: "Braucht man zum Angeln am Fluss eine Genehmigung?", a: "Ja — zum Angeln an Donau, Drina, Ibar und anderen Flüssen ist eine Genehmigung der örtlichen Angelvereine oder Fischereiverwalter erforderlich." },
    { q: "Gibt es Unterkünfte an den Flüssen?", a: "Ja — Ferienhäuser, Apartments und Ethno-Höfe direkt am Wasser, besonders an Drina, Tara und Uvac. Optionen und Preise vergleichen Sie im Bereich Unterkünfte." },
  ],
  spa: [
    { q: "Welcher Kurort ist am besten bei Rheuma und Gelenkschmerzen?", a: "Vrnjačka Banja und Sokobanja haben eine lange Tradition in der Behandlung rheumatischer und kardiovaskulärer Beschwerden, während Banja Koviljača für Schwefelquellen für Haut und Gelenke bekannt ist." },
    { q: "Was wird in serbischen Kurorten behandelt?", a: "Meist rheumatische, kardiovaskuläre, respiratorische und Hauterkrankungen sowie die Genesung nach Operationen; neben der Behandlung bieten immer mehr Kurorte auch Wellness- und Spa-Programme." },
    { q: "Braucht man für den Kurort eine ärztliche Überweisung?", a: "Für Erholung und Wellness nicht — Sie buchen frei. Für eine von der Versicherung finanzierte Behandlung ist eine Überweisung nötig, privat können Sie Therapien ohne nutzen." },
    { q: "Welcher Kurort ist Belgrad am nächsten?", a: "Banja Koviljača und Bukovička Banja in Aranđelovac gehören zu den nächstgelegenen (etwa 1,5–2 Std. entfernt) und eignen sich gut für Wochenendausflüge." },
  ],
  ethno: [
    { q: "Was ist ein Ethno-Dorf?", a: "Ein Ethno-Dorf ist eine Siedlung, die traditionelle Architektur, alte Handwerke, Küche und die Lebensweise des serbischen Landes bewahrt — meist für Besucher und Übernachtungen hergerichtet." },
    { q: "Welche Ethno-Dörfer in Serbien lohnen sich?", a: "Am bekanntesten sind Drvengrad (Mećavnik) von Emir Kusturica auf der Mokra Gora, das Museumsdorf in Sirogojno und Tršić, der Geburtsort von Vuk Karadžić." },
    { q: "Kann man in einem Ethno-Dorf übernachten?", a: "Ja — viele Ethno-Dörfer bieten Unterkünfte in traditionellen Blockhäusern und Höfen, mit Hausmannskost und authentischem Erlebnis." },
    { q: "Eignen sich Ethno-Dörfer für einen Tagesausflug?", a: "Ja, besonders in Kombination mit der Umgebung; Drvengrad lässt sich gut mit der Šargan-Eight-Bahn verbinden, Sirogojno mit Zlatibor." },
  ],
  stay: [
    { q: "Wie buche ich eine Unterkunft?", a: "Füllen Sie auf der Seite der Unterkunft das Anfrageformular aus; der Gastgeber antwortet meist innerhalb von 24 Stunden." },
    { q: "Ist das Inserieren einer Unterkunft kostenlos?", a: "Ja — Registrierung und Inserieren sind völlig kostenlos. Eine Provision zahlen Sie erst, wenn wir Ihnen Gäste bringen." },
    { q: "Kann ich mehrere Objekte inserieren?", a: "Beliebig viele — jede Unterkunft wird separat hinzugefügt, mit Titel, Beschreibung, Fotos, Video und Verfügbarkeitskalender." },
    { q: "Woher weiß ich, ob eine Unterkunft frei ist?", a: "Jede Unterkunft zeigt einen Verfügbarkeitskalender; die Gastgeber halten ihn aktuell und können ihn mit Booking.com und Airbnb synchronisieren." },
  ],
};

export function sectionFaqs(kind: Kind, locale: Lang): Faq[] {
  if (locale === "de") return FAQ_DE[kind];
  const lc = locale === "sr" ? "sr" : "en";
  return FAQ[kind][lc];
}


const GENERAL: { sr: Faq[]; en: Faq[] } = {
  sr: [
    { q: "Šta je Turizam Srbija?", a: "Turizam Srbija je trojezični (srpski, engleski i nemački) portal koji na jednom mestu okuplja najlepše destinacije i smeštaj u Srbiji — planine, jezera, banje, etno sela, apartmane u Beogradu i smeštaj širom zemlje." },
    { q: "Da li je korišćenje portala besplatno za goste?", a: "Jeste, u potpunosti. Pretraga destinacija i smeštaja, slanje upita i čitanje recenzija su besplatni, bez registracije." },
    { q: "Kako da rezervišem smeštaj?", a: "Na stranici željenog smeštaja popunite formu za upit; domaćin vam odgovara, najčešće u roku od 24 sata, i dogovarate detalje." },
    { q: "Da li je oglašavanje besplatno za vlasnike smeštaja?", a: "Da — registracija i postavljanje oglasa su besplatni. Proviziju plaćate tek kada vam dovedemo goste, po principu plaćanja po rezultatu." },
    { q: "Mogu li da oglasim više smeštaja?", a: "Možete neograničen broj. Svaki smeštaj se dodaje zasebno — sa svojim naslovom, opisom, do 20 fotografija, video-snimkom, lokacijom na mapi i kalendarom dostupnosti." },
    { q: "Na kojim jezicima je portal dostupan?", a: "Na srpskom, engleskom i nemačkom. Svaki sadržaj ima svoju adresu na sva tri jezika, pa ga lako pronalaze i gosti iz inostranstva." },
    { q: "Mogu li da ostavim recenziju?", a: "Možete. Recenzije se ostavljaju na stranici smeštaja i objavljuju nakon kratke provere, čime se čuva njihova verodostojnost." },
    { q: "Kako da kontaktiram podršku?", a: "Pišite nam na info@turizamsrbija.com ili putem Viber/WhatsApp poruke na +381 64 4598778, kao i preko kontakt forme na sajtu." },
    { q: "Da li je plaćanje karticom na sajtu sigurno?", a: "Jeste. Sva plaćanja karticom idu kroz 3-D Secure (Verified by Visa i Mastercard ID Check) — banka dodatno potvrđuje vaš identitet. Veza je zaštićena SSL enkripcijom, a podatke vaše kartice ne čuvamo na portalu." },
    { q: "Koje kartice mogu da koristim?", a: "Prihvataju se Visa, Mastercard, Maestro i DinaCard, kao i debitne i kreditne kartice domaćih i stranih banaka. Dostupne načine plaćanja vidite na koraku plaćanja." },
    { q: "Šta je 3-D Secure i CVV2?", a: "3-D Secure je dodatna provera identiteta pri online plaćanju (lozinka ili potvrda u banci aplikaciji). CVV2 je trocifreni kod sa poleđine kartice koji potvrđuje da karticu fizički držite. Oba štite od zloupotrebe." },
    { q: "Šta ako želim da osporim transakciju?", a: "Ako roba ili usluga nije isporučena ili ne odgovara opisu, prvo se obratite domaćinu, a zatim svojoj banci radi osporavanja (chargeback). Mi vam stojimo na raspolaganju za svaki spor." },
  ],
  en: [
    { q: "What is Turizam Srbija?", a: "Turizam Srbija is a trilingual (Serbian, English and German) portal that brings together Serbia's finest destinations and accommodation in one place — mountains, lakes, spas, ethno villages, Belgrade apartments and stays across the country." },
    { q: "Is the portal free for guests?", a: "Yes, completely. Browsing destinations and accommodation, sending inquiries and reading reviews are free, with no registration required." },
    { q: "How do I book accommodation?", a: "On the listing's page fill in the inquiry form; the host replies, usually within 24 hours, and you arrange the details." },
    { q: "Is listing free for property owners?", a: "Yes — registering and posting a listing are free. You pay a commission only when we bring you guests, on a pay-on-results basis." },
    { q: "Can I list multiple properties?", a: "You can list as many as you like. Each is added separately — with its own title, description, up to 20 photos, a video, a map location and an availability calendar." },
    { q: "Which languages is the portal available in?", a: "Serbian, English and German. Every page has its own address in all three languages, so international guests can find it easily." },
    { q: "Can I leave a review?", a: "Yes. Reviews are left on the listing page and published after a short check to keep them trustworthy." },
    { q: "How do I contact support?", a: "Email us at info@turizamsrbija.com or message us on Viber/WhatsApp at +381 64 4598778, or use the contact form on the site." },
    { q: "Is paying by card on the site secure?", a: "Yes. All card payments go through 3-D Secure (Verified by Visa and Mastercard ID Check), where your bank confirms your identity. The connection is SSL-encrypted and we never store your card details on the portal." },
    { q: "Which cards can I use?", a: "We accept Visa, Mastercard, Maestro and DinaCard, including debit and credit cards from local and foreign banks. Available payment methods are shown at the payment step." },
    { q: "What are 3-D Secure and CVV2?", a: "3-D Secure is an extra identity check during online payment (a password or confirmation in your bank app). CVV2 is the three-digit code on the back of your card confirming you physically hold it. Both protect against misuse." },
    { q: "What if I want to dispute a transaction?", a: "If goods or services are not delivered or do not match the description, contact the host first, then your bank to dispute the charge (chargeback). We are also here to help with any dispute." },
  ],
};

const GENERAL_DE: Faq[] = [
  { q: "Was ist Turizam Srbija?", a: "Turizam Srbija ist ein mehrsprachiges Portal, das Serbiens schönste Reiseziele und Unterkünfte an einem Ort vereint — Berge, Seen, Kurorte, Ethno-Dörfer, Belgrad-Apartments und Unterkünfte im ganzen Land." },
  { q: "Ist die Nutzung des Portals für Gäste kostenlos?", a: "Ja, vollständig. Das Suchen von Reisezielen und Unterkünften, das Senden von Anfragen und das Lesen von Bewertungen sind kostenlos, ohne Registrierung." },
  { q: "Wie buche ich eine Unterkunft?", a: "Füllen Sie auf der Seite der Unterkunft das Anfrageformular aus; der Gastgeber antwortet meist innerhalb von 24 Stunden." },
  { q: "Ist das Inserieren für Vermieter kostenlos?", a: "Ja — Registrierung und Inserieren sind kostenlos. Eine Provision zahlen Sie erst, wenn wir Ihnen Gäste bringen (Bezahlung nach Ergebnis)." },
  { q: "Kann ich mehrere Unterkünfte inserieren?", a: "Beliebig viele. Jede Unterkunft wird separat hinzugefügt — mit Titel, Beschreibung, bis zu 20 Fotos, Video, Kartenstandort und Verfügbarkeitskalender." },
  { q: "Ist die Kartenzahlung auf der Website sicher?", a: "Ja. Alle Kartenzahlungen laufen über 3-D Secure (Verified by Visa und Mastercard ID Check). Die Verbindung ist SSL-verschlüsselt und Ihre Kartendaten werden nicht gespeichert." },
  { q: "Welche Karten kann ich verwenden?", a: "Akzeptiert werden Visa, Mastercard, Maestro und DinaCard sowie Debit- und Kreditkarten in- und ausländischer Banken." },
  { q: "Wie kontaktiere ich den Support?", a: "Schreiben Sie an info@turizamsrbija.com oder per Viber/WhatsApp an +381 64 4598778, oder über das Kontaktformular." },
];

export function generalFaqs(locale: Lang): Faq[] { return locale === "de" ? GENERAL_DE : GENERAL[locale === "sr" ? "sr" : "en"]; }
