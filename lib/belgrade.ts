import type { Lang } from "./types";
import { slugify } from "./slug";
import { BELGRADE_MUNICIPALITIES } from "./places";

export type BgArea = { slug: string; sr: string; en: string; de: string };

const LABELS: Record<string, { en: string; de: string }> = {
  "Stari grad": { en: "Old Town", de: "Altstadt" },
  "Novi Beograd": { en: "New Belgrade", de: "Neu-Belgrad" },
  "Savski venac": { en: "Savski Venac", de: "Savski Venac" },
};

export const BG_AREAS: BgArea[] = BELGRADE_MUNICIPALITIES.map((m) => ({
  slug: slugify(m), sr: m, en: LABELS[m]?.en || m, de: LABELS[m]?.de || m,
}));

export const bgAreaBySlug = (slug: string) => BG_AREAS.find((a) => a.slug === slug);
export const bgAreaLabel = (a: BgArea, lang: Lang) => (lang === "sr" ? a.sr : lang === "de" ? a.de : a.en);
export const bgAreaPath = (slug: string, lang: Lang) =>
  lang === "sr" ? `/apartmani-beograd/${slug}` : `/${lang}/belgrade-apartments/${slug}`;

// A stay listing belongs to an area if its municipality matches (handles "Beograd — Vračar" and "Vračar")
export function inBgArea(municipality: string | undefined | null, areaSlug: string): boolean {
  if (!municipality) return false;
  const s = slugify(municipality);
  return s === areaSlug || s.endsWith("-" + areaSlug) || s.endsWith(areaSlug);
}
