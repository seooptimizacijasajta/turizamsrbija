import type { Lang } from "./types";
import { slugify } from "./slug";

export type PropType = { key: string; sr: string; en: string; de: string; srSlug: string; enSlug: string; icon: string };

export const PROP_TYPES: PropType[] = [
  { key: "stan", sr: "Stanovi", en: "Apartments", de: "Wohnungen", srSlug: "stanovi", enSlug: "apartments", icon: "🏢" },
  { key: "kuca", sr: "Kuće", en: "Houses", de: "Häuser", srSlug: "kuce", enSlug: "houses", icon: "🏠" },
  { key: "plac", sr: "Placevi / Zemljište", en: "Land / Plots", de: "Grundstücke", srSlug: "placevi", enSlug: "land", icon: "🌳" },
  { key: "seosko", sr: "Seoska domaćinstva", en: "Village estates", de: "Landgüter", srSlug: "seoska-domacinstva", enSlug: "village-estates", icon: "🚜" },
  { key: "vikendica", sr: "Vikendice", en: "Cottages", de: "Ferienhäuser", srSlug: "vikendice", enSlug: "cottages", icon: "⛰️" },
  { key: "poslovni", sr: "Poslovni prostor", en: "Commercial", de: "Gewerbe", srSlug: "poslovni-prostor", enSlug: "commercial", icon: "🏬" },
];

export const propTypeByKey = (k: string) => PROP_TYPES.find((c) => c.key === k);
export const propTypeBySlug = (s: string) => PROP_TYPES.find((c) => c.srSlug === s || c.enSlug === s);
export const propTypeLabel = (c: PropType, lang: Lang) => (lang === "sr" ? c.sr : lang === "de" ? c.de : c.en);

export const dealKindLabel = (d: string | null | undefined, lang: Lang) =>
  d === "najam"
    ? (lang === "sr" ? "Izdavanje" : lang === "de" ? "Vermietung" : "For rent")
    : (lang === "sr" ? "Prodaja" : lang === "de" ? "Verkauf" : "For sale");

export const nekretnineIndexPath = (lang: Lang) => (lang === "sr" ? "/nekretnine" : lang === "de" ? "/de/immobilien" : "/en/real-estate");
export const propTypePath = (c: PropType, lang: Lang) =>
  lang === "sr" ? `/nekretnine/${c.srSlug}` : lang === "de" ? `/de/immobilien/${c.enSlug}` : `/en/real-estate/${c.enSlug}`;
export const propertyPath = (p: { id: string; title: string }, lang: Lang) => {
  const s = `${slugify(p.title || "nekretnina")}-${p.id.slice(0, 8)}`;
  return lang === "sr" ? `/nekretnina/${s}` : lang === "de" ? `/de/immobilie/${s}` : `/en/property/${s}`;
};
