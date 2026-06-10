import type { Lang } from "./types";
import { slugify } from "./slug";
import { BG_AREAS } from "./belgrade";
import { inBgArea } from "./belgrade";

export type Struct = { key: string; slug: string; sr: string; en: string; de: string };
export const STRUCTURES: Struct[] = [
  { key: "studio", slug: "studio", sr: "Studio", en: "Studio", de: "Studio" },
  { key: "1", slug: "jednosobni", sr: "Jednosobni", en: "One-bedroom", de: "Ein-Zimmer" },
  { key: "2", slug: "dvosobni", sr: "Dvosobni", en: "Two-bedroom", de: "Zwei-Zimmer" },
  { key: "3", slug: "trosobni", sr: "Trosobni", en: "Three-bedroom", de: "Drei-Zimmer" },
  { key: "4", slug: "cetvorosobni", sr: "Četvorosobni", en: "Four-bedroom", de: "Vier-Zimmer" },
  { key: "5", slug: "petosobni", sr: "Petosobni", en: "Five-bedroom", de: "Fünf-Zimmer" },
];
export const structByKey = (k: string | undefined | null) => STRUCTURES.find((x) => x.key === k);
export const structBySlug = (slug: string) => STRUCTURES.find((x) => x.slug === slug);
export const structLabel = (s: Struct, lang: Lang) => (lang === "sr" ? s.sr : lang === "de" ? s.de : s.en);
export const structPath = (slug: string, lang: Lang) =>
  lang === "sr" ? `/apartmani-beograd/struktura/${slug}` : lang === "de" ? `/de/belgrad-apartments/typ/${slug}` : `/en/belgrade-apartments/type/${slug}`;

export function isBelgrade(municipality: string | undefined | null): boolean {
  if (!municipality) return false;
  if (slugify(municipality).includes("beograd")) return true;
  return BG_AREAS.some((a) => inBgArea(municipality, a.slug));
}
