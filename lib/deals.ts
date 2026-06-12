import type { Lang } from "./types";

export type DealType = "akcija" | "first_minute" | "last_minute";
export const DEAL_TYPES: { key: DealType; sr: string; en: string; de: string; icon: string }[] = [
  { key: "akcija", sr: "Akcija / Popust", en: "Special offer", de: "Sonderangebot", icon: "🔥" },
  { key: "first_minute", sr: "First minute", en: "First minute", de: "Frühbucher", icon: "🐦" },
  { key: "last_minute", sr: "Last minute", en: "Last minute", de: "Last Minute", icon: "⏰" },
];
export const dealTypeByKey = (k?: string | null) => DEAL_TYPES.find((d) => d.key === k);
export const dealTypeLabel = (k: string | null | undefined, lang: Lang) => {
  const d = dealTypeByKey(k); return d ? (lang === "sr" ? d.sr : lang === "de" ? d.de : d.en) : "";
};
export const dealsPath = (lang: Lang) => lang === "sr" ? "/akcije" : lang === "de" ? "/de/angebote" : "/en/deals";
export const dealPct = (price: number, dealPrice: number | null | undefined) =>
  (dealPrice != null && price > 0 && dealPrice < price) ? Math.round((1 - dealPrice / price) * 100) : 0;
