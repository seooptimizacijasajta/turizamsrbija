import type { Lang } from "./types";
export type BizCat = { key: string; sr: string; en: string; de: string; srSlug: string; enSlug: string; icon: string };

export const BIZ_CATS: BizCat[] = [
  { key: "agencije", sr: "Turističke agencije", en: "Travel agencies", de: "Reisebüros", srSlug: "turisticke-agencije", enSlug: "travel-agencies", icon: "🧳" },
  { key: "rent-a-car", sr: "Rent-a-car", en: "Car rental", de: "Autovermietung", srSlug: "rent-a-car", enSlug: "car-rental", icon: "🚗" },
  { key: "vodici", sr: "Vodiči i ture", en: "Guides & tours", de: "Reiseführer & Touren", srSlug: "vodici-i-ture", enSlug: "guides-tours", icon: "🧭" },
  { key: "transferi", sr: "Transferi / Aerodrom", en: "Transfers / Airport", de: "Transfers / Flughafen", srSlug: "transferi-aerodrom", enSlug: "transfers-airport", icon: "✈️" },
  { key: "restorani", sr: "Restorani", en: "Restaurants", de: "Restaurants", srSlug: "restorani", enSlug: "restaurants", icon: "🍽️" },
  { key: "suveniri", sr: "Suveniri / rukotvorine", en: "Souvenirs & crafts", de: "Souvenirs & Handwerk", srSlug: "suveniri", enSlug: "souvenirs", icon: "🎁" },
  { key: "osiguranje", sr: "Putno osiguranje", en: "Travel insurance", de: "Reiseversicherung", srSlug: "putno-osiguranje", enSlug: "travel-insurance", icon: "🛡️" },
  { key: "oprema", sr: "Iznajmljivanje opreme", en: "Equipment rental", de: "Ausrüstungsverleih", srSlug: "iznajmljivanje-opreme", enSlug: "equipment-rental", icon: "🎿" },
];

export const bizCatByKey = (k: string) => BIZ_CATS.find((c) => c.key === k);
export const bizCatBySlug = (slug: string) => BIZ_CATS.find((c) => c.srSlug === slug || c.enSlug === slug);
export const bizCatLabel = (c: BizCat, lang: Lang) => (lang === "sr" ? c.sr : lang === "de" ? c.de : c.en);
export const firmeIndexPath = (lang: Lang) => lang === "sr" ? "/firme" : lang === "de" ? "/de/firmen" : "/en/businesses";
export const firmeCatPath = (c: BizCat, lang: Lang) =>
  lang === "sr" ? `/firme/${c.srSlug}` : lang === "de" ? `/de/firmen/${c.enSlug}` : `/en/businesses/${c.enSlug}`;
