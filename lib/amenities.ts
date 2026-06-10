import type { Lang } from "./types";

export type Amenity = { key: string; sr: string; en: string; icon: string };

export const AMENITIES: Amenity[] = [
  { key: "vouchers", sr: "Prima vaučere", en: "Accepts vouchers", icon: "🎟️" },
  { key: "pool", sr: "Bazen", en: "Pool", icon: "🏊" },
  { key: "wellness", sr: "Wellness / Spa", en: "Wellness / Spa", icon: "💆" },
  { key: "pet", sr: "Ljubimci dozvoljeni", en: "Pet friendly", icon: "🐾" },
  { key: "kids", sr: "Pogodno za decu", en: "Family friendly", icon: "🧸" },
  { key: "parking", sr: "Parking", en: "Parking", icon: "🅿️" },
  { key: "wifi", sr: "Wi-Fi", en: "Wi-Fi", icon: "📶" },
  { key: "ac", sr: "Klima", en: "Air conditioning", icon: "❄️" },
  { key: "kitchen", sr: "Kuhinja", en: "Kitchen", icon: "🍳" },
  { key: "restaurant", sr: "Restoran", en: "Restaurant", icon: "🍽️" },
  { key: "bbq", sr: "Roštilj / Letnjikovac", en: "BBQ / Gazebo", icon: "🔥" },
  { key: "river", sr: "Blizu reke/jezera", en: "Near river/lake", icon: "🌊" },
  { key: "jacuzzi", sr: "Đakuzi", en: "Jacuzzi", icon: "🛁" },
  { key: "luxury", sr: "Luksuzno", en: "Luxury", icon: "💎" },
];

export const amenityByKey = (k: string) => AMENITIES.find((a) => a.key === k);
export const amenityLabel = (k: string, lang: Lang) => { const a = amenityByKey(k); return a ? (lang === "sr" ? a.sr : a.en) : k; };

export type PriceUnit = { key: string; sr: string; en: string };
export const PRICE_UNITS: PriceUnit[] = [
  { key: "night", sr: "po noćenju", en: "per night" },
  { key: "night_breakfast", sr: "noćenje sa doručkom", en: "B&B / night" },
  { key: "halfboard", sr: "polupansion", en: "half board" },
  { key: "fullboard", sr: "pun pansion", en: "full board" },
  { key: "unit", sr: "najam objekta", en: "whole unit" },
  { key: "person", sr: "po osobi", en: "per person" },
];
export const priceUnitLabel = (k: string | undefined, lang: Lang) => {
  const u = PRICE_UNITS.find((x) => x.key === k);
  if (!u) return lang === "sr" ? "po noćenju" : "per night";
  return lang === "sr" ? u.sr : u.en;
};

// SR/EN slug pairs for amenity landing pages
export const AMENITY_SLUGS: Record<string, { sr: string; en: string }> = {
  vouchers: { sr: "smestaj-sa-vaucerima", en: "accommodation-with-vouchers" },
  pool: { sr: "smestaj-sa-bazenom", en: "accommodation-with-pool" },
  pet: { sr: "pet-friendly-smestaj", en: "pet-friendly-accommodation" },
  kids: { sr: "smestaj-za-porodice-sa-decom", en: "family-friendly-accommodation" },
  wellness: { sr: "smestaj-sa-wellness", en: "accommodation-with-wellness" },
  jacuzzi: { sr: "apartmani-sa-djakuzijem", en: "apartments-with-jacuzzi" },
  luxury: { sr: "luksuzni-apartmani", en: "luxury-apartments" },
};
export const amenityBySlug = (slug: string) =>
  Object.entries(AMENITY_SLUGS).find(([, v]) => v.sr === slug || v.en === slug)?.[0];
export const amenityPath = (key: string, lang: Lang) => {
  const p = AMENITY_SLUGS[key]; if (!p) return lang === "sr" ? "/" : `/${lang}`;
  return lang === "sr" ? `/pogodnosti/${p.sr}` : `/${lang}/amenities/${p.en}`;
};
export const LANDING_AMENITIES = Object.keys(AMENITY_SLUGS);
