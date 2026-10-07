import type { Listing } from "./types";

/** Destinacije upisane u kodu (uvek prikazane, ne zavise od baze).
 *  Spajaju se u lib/data.ts: ako destinacija sa istim tipom i slugom ne postoji
 *  u bazi, dodaje se iz ove liste. */
export const STATIC_DESTINATIONS: Listing[] = [
  {
    id: "a0000000-0000-4000-8000-000000000b01",
    type: "spa",
    name: { sr: "Banja Vrujci", en: "Banja Vrujci", de: "Banja Vrujci" },
    region: { sr: "Kolubarski okrug", en: "Kolubara district", de: "Bezirk Kolubara" },
    short: {
      sr: "Termalna banja podno Suvobora, na sat vožnje od Beograda.",
      en: "A thermal spa below Suvobor, an hour from Belgrade.",
      de: "Ein Thermalbad unter dem Suvobor, eine Stunde von Belgrad.",
    },
    desc: {
      sr: "Banja Vrujci leži u dolini reke Toplice, u opštini Mionica, poznata po termalnoj vodi umerene temperature (oko 26–28 °C), otvorenim i zatvorenim bazenima i mirnom, porodičnom ambijentu podno Suvobora i Rajca. Idealna je za vikend odmor, kupanje i boravak sa decom, na svega sat i po vožnje od Beograda.",
      en: "Banja Vrujci lies in the valley of the Toplica river, in the Mionica municipality, known for its moderately warm thermal water (around 26–28 °C), indoor and outdoor pools and a calm, family atmosphere below the Suvobor and Rajac hills. It is ideal for a weekend break, swimming and a stay with children, just an hour and a half from Belgrade.",
      de: "Banja Vrujci liegt im Tal des Flusses Toplica, in der Gemeinde Mionica, bekannt für sein mäßig warmes Thermalwasser (etwa 26–28 °C), Innen- und Außenbecken und eine ruhige, familiäre Atmosphäre unter den Bergen Suvobor und Rajac. Ideal für ein Wochenende, zum Baden und für einen Aufenthalt mit Kindern, nur anderthalb Stunden von Belgrad.",
    },
    elevation: 180,
    municipality: "Mionica",
    price: 0,
    rating: 4.5,
    img: "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=900&q=80",
    gallery: ["1540206395-68808572332f", "1507652313519-d4e9174996dd", "1571902943202-507ec2618e8f"],
    features: {
      sr: ["Termalna voda 26–28 °C", "Otvoreni i zatvoreni bazeni", "Brvnare i vikendice", "Blizu Beograda (~90 km)", "Suvobor i Rajac"],
      en: ["Thermal water 26–28 °C", "Indoor and outdoor pools", "Log cabins and cottages", "Close to Belgrade (~90 km)", "Suvobor and Rajac"],
      de: ["Thermalwasser 26–28 °C", "Innen- und Außenbecken", "Blockhütten und Ferienhäuser", "Nahe Belgrad (~90 km)", "Suvobor und Rajac"],
    },
  },
];
