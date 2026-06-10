import type { Lang } from "./types";

export type InfoBlock = { h?: string; items?: string[]; p?: string };
export type InfoTopic = {
  slug: string; en_slug: string;
  title: { sr: string; en: string; de: string };
  lead: { sr: string; en: string; de: string };
  icon: string;
  body: { sr: InfoBlock[]; en: InfoBlock[]; de: InfoBlock[] };
};

export const BG_INFO: InfoTopic[] = [
  {
    slug: "aerodrom", en_slug: "airport", icon: "✈️",
    title: { sr: "Aerodrom Beograd — kako do centra", en: "Belgrade Airport — getting to the centre", de: "Flughafen Belgrad — in die Innenstadt" },
    lead: { sr: "Aerodrom „Nikola Tesla“ i prevoz do grada i vašeg apartmana.", en: "Nikola Tesla Airport and transport to the city and your apartment.", de: "Flughafen „Nikola Tesla“ und Transport in die Stadt und zu Ihrem Apartment." },
    body: {
      sr: [
        { p: "Aerodrom „Nikola Tesla“ udaljen je oko 18 km od centra Beograda, na Novom Beogradu / Surčinu. Do centra se stiže za 20–40 minuta, u zavisnosti od saobraćaja." },
        { h: "Načini prevoza", items: [
          "Taksi — uzmite isključivo ovlašćeni aerodromski taksi (taksi-šalter u dolasku vam izdaje vaučer sa fiksnom cenom po zonama). Ne prihvatajte nuđenje vozača u holu.",
          "Minibus A1 — brza linija do Slavije, sa stajalištem kod Fontane (Novi Beograd).",
          "Gradski autobus 72 — povezuje aerodrom sa Zelenim vencem u centru (potrebna BusPlus karta).",
          "Privatni transfer — mnogi domaćini organizuju prevoz; pitajte pri rezervaciji.",
        ] },
        { p: "Savet: dogovorite sa domaćinom tačno mesto preuzimanja ključeva i vreme dolaska, posebno ako sletite kasno." },
      ],
      en: [
        { p: "Nikola Tesla Airport is about 18 km from the centre of Belgrade, in New Belgrade / Surčin. The centre is 20–40 minutes away depending on traffic." },
        { h: "Transport options", items: [
          "Taxi — use only the authorised airport taxi (the taxi desk in arrivals issues a voucher with a fixed price by zone). Do not accept drivers touting in the hall.",
          "A1 minibus — fast line to Slavija, stopping near the Fountain (New Belgrade).",
          "City bus 72 — connects the airport with Zeleni Venac in the centre (a BusPlus ticket is required).",
          "Private transfer — many hosts arrange pick-up; ask when booking.",
        ] },
        { p: "Tip: agree the exact key pick-up point and arrival time with your host, especially for late landings." },
      ],
      de: [
        { p: "Der Flughafen „Nikola Tesla“ liegt etwa 18 km vom Zentrum Belgrads entfernt, in Neu-Belgrad / Surčin. Das Zentrum ist je nach Verkehr 20–40 Minuten entfernt." },
        { h: "Transportmöglichkeiten", items: [
          "Taxi — nutzen Sie nur das autorisierte Flughafentaxi (der Taxischalter in der Ankunft stellt einen Gutschein mit Festpreis nach Zonen aus).",
          "Minibus A1 — schnelle Linie nach Slavija, mit Halt am Brunnen (Neu-Belgrad).",
          "Stadtbus 72 — verbindet den Flughafen mit Zeleni Venac im Zentrum (BusPlus-Ticket erforderlich).",
          "Privattransfer — viele Gastgeber organisieren die Abholung; fragen Sie bei der Buchung.",
        ] },
        { p: "Tipp: Vereinbaren Sie den genauen Ort der Schlüsselübergabe und die Ankunftszeit mit Ihrem Gastgeber." },
      ],
    },
  },
  {
    slug: "gradski-prevoz", en_slug: "city-transport", icon: "🚌",
    title: { sr: "Gradski prevoz u Beogradu", en: "Public transport in Belgrade", de: "Öffentlicher Verkehr in Belgrad" },
    lead: { sr: "Autobusi, tramvaji, trolejbusi, BusPlus karte i taksi.", en: "Buses, trams, trolleybuses, BusPlus tickets and taxis.", de: "Busse, Straßenbahnen, Obusse, BusPlus-Tickets und Taxis." },
    body: {
      sr: [
        { p: "Beograd ima razgranatu mrežu autobusa, tramvaja i trolejbusa kojom upravlja gradski prevoznik. Karte se plaćaju BusPlus karticom, koju kupujete i dopunjujete na kioscima." },
        { h: "Korisno", items: [
          "BusPlus kartica — kupite je na trafici (Štampa i sl.), dopunite je za potreban broj vožnji i očitajte u vozilu pri ulasku.",
          "Taksi — koristite ovlašćene taksi službe ili aplikacije; proverite da li taksimetar radi.",
          "Pešačenje — centar Beograda (Knez Mihailova, Kalemegdan, Skadarlija) lako se obilazi peške.",
          "Ada Ciganlija i splavovi — do njih je najlakše taksijem ili autobusom.",
        ] },
      ],
      en: [
        { p: "Belgrade has an extensive network of buses, trams and trolleybuses run by the city operator. Fares are paid with a BusPlus card, which you buy and top up at kiosks." },
        { h: "Useful", items: [
          "BusPlus card — buy it at a newsstand (Štampa etc.), top it up for the number of rides you need and tap it on board when boarding.",
          "Taxi — use authorised taxi companies or apps; check that the meter is running.",
          "Walking — the centre of Belgrade (Knez Mihailova, Kalemegdan, Skadarlija) is easily explored on foot.",
          "Ada Ciganlija and river clubs — easiest reached by taxi or bus.",
        ] },
      ],
      de: [
        { p: "Belgrad verfügt über ein dichtes Netz aus Bussen, Straßenbahnen und Obussen des städtischen Betreibers. Fahrkarten werden mit der BusPlus-Karte bezahlt, die Sie an Kiosken kaufen und aufladen." },
        { h: "Nützlich", items: [
          "BusPlus-Karte — am Kiosk kaufen, für die benötigten Fahrten aufladen und beim Einsteigen entwerten.",
          "Taxi — autorisierte Taxiunternehmen oder Apps nutzen; prüfen, ob das Taxameter läuft.",
          "Zu Fuß — das Zentrum (Knez Mihailova, Kalemegdan, Skadarlija) lässt sich gut zu Fuß erkunden.",
          "Ada Ciganlija und Flussclubs — am besten mit Taxi oder Bus erreichbar.",
        ] },
      ],
    },
  },
  {
    slug: "vazni-telefoni", en_slug: "emergency-numbers", icon: "☎️",
    title: { sr: "Važni telefoni u Beogradu", en: "Important phone numbers in Belgrade", de: "Wichtige Telefonnummern in Belgrad" },
    lead: { sr: "Hitne službe i korisni brojevi tokom boravka.", en: "Emergency services and useful numbers during your stay.", de: "Notdienste und nützliche Nummern während Ihres Aufenthalts." },
    body: {
      sr: [
        { h: "Hitne službe", items: [
          "Jedinstveni broj za hitne situacije: 112",
          "Policija: 192",
          "Hitna pomoć: 194",
          "Vatrogasci: 193",
          "Pomoć na putu (AMSS): 1987",
        ] },
        { p: "U slučaju ozbiljne hitne situacije pozovite 112 ili odgovarajuću službu. Za zdravstvene tegobe obratite se najbližoj dežurnoj ambulanti ili Hitnoj pomoći." },
      ],
      en: [
        { h: "Emergency services", items: [
          "Single emergency number: 112",
          "Police: 192",
          "Ambulance: 194",
          "Fire brigade: 193",
          "Roadside assistance (AMSS): 1987",
        ] },
        { p: "In a serious emergency call 112 or the relevant service. For health issues, contact the nearest on-duty clinic or the ambulance service." },
      ],
      de: [
        { h: "Notdienste", items: [
          "Einheitliche Notrufnummer: 112",
          "Polizei: 192",
          "Rettungsdienst: 194",
          "Feuerwehr: 193",
          "Pannenhilfe (AMSS): 1987",
        ] },
        { p: "Rufen Sie im Ernstfall 112 oder den zuständigen Dienst. Bei gesundheitlichen Problemen wenden Sie sich an die nächste diensthabende Ambulanz oder den Rettungsdienst." },
      ],
    },
  },
];

export const bgInfoBySlug = (slug: string) => BG_INFO.find((t) => t.slug === slug || t.en_slug === slug);
export const bgInfoPath = (t: InfoTopic, lang: Lang) => lang === "sr" ? `/info-beograd/${t.slug}` : `/${lang}/belgrade-info/${t.en_slug}`;
export const bgInfoTitle = (t: InfoTopic, lang: Lang) => lang === "sr" ? t.title.sr : lang === "de" ? t.title.de : t.title.en;
