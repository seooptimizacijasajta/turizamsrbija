import { Kind, Lang } from "./types";

/** Serbian-aware URL slugifier: Šabac -> sabac, Vrnjačka Banja -> vrnjacka-banja */
export function slugify(input: string): string {
  return (input || "")
    .toLowerCase()
    .replace(/č|ć/g, "c")
    .replace(/š/g, "s")
    .replace(/ž/g, "z")
    .replace(/đ/g, "dj")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* Category segment per language */
export const KIND_TO_SLUG: Record<Kind, string> = {
  mountain: "planine", lake: "jezera", spa: "banje", ethno: "etno-sela", stay: "smestaj",
};
export const KIND_TO_SLUG_EN: Record<Kind, string> = {
  mountain: "mountains", lake: "lakes", spa: "spas", ethno: "ethno-villages", stay: "accommodation",
};
export const SLUG_TO_KIND: Record<string, Kind> = {
  planine: "mountain", jezera: "lake", banje: "spa", "etno-sela": "ethno", smestaj: "stay",
};
export const SLUG_TO_KIND_EN: Record<string, Kind> = {
  mountains: "mountain", lakes: "lake", spas: "spa", "ethno-villages": "ethno", accommodation: "stay",
};

export function catSlug(kind: Kind, locale: Lang): string {
  return locale === "sr" ? KIND_TO_SLUG[kind] : KIND_TO_SLUG_EN[kind];
}
export function kindFromSlug(seg: string): Kind | undefined {
  return SLUG_TO_KIND[seg] || SLUG_TO_KIND_EN[seg];
}

const base = (locale: Lang) => (locale === "sr" ? "" : `/${locale}`);

/** /planine/kopaonik  or  /en/mountains/kopaonik  (place slug stays Serbian-based & identical across langs) */
export function listingPath(kind: Kind, nameSr: string, locale: Lang = "sr"): string {
  return `${base(locale)}/${catSlug(kind, locale)}/${slugify(nameSr)}`;
}
export function sectionPath(kind: Kind, locale: Lang = "sr"): string {
  return `${base(locale)}/${catSlug(kind, locale)}`;
}
export function homePath(locale: Lang): string {
  return locale === "sr" ? "/" : `/${locale}`;
}

/** Map the current pathname to its equivalent in the target language (keeps the place slug). */
export function switchLangPath(pathname: string, target: Lang): string {
  let p = pathname || "/";
  if (p.startsWith("/en") || p.startsWith("/de")) p = p.slice(3) || "/"; // strip locale prefix
  const segs = p.split("/").filter(Boolean);
  if (segs.length > 0) {
    const k = kindFromSlug(segs[0]);
    if (k) segs[0] = catSlug(k, target);
    else { const c = customSeg(segs[0], target); if (c) segs[0] = c; }
  }
  const body = segs.length ? "/" + segs.join("/") : "";
  return target === "sr" ? (body || "/") : `/${target}` + body;
}

/** Per-page metadata: canonical + hreflang alternates (Serbian default, English twin). */
export function altMeta(locale: Lang, kind?: Kind, slug?: string) {
  const sr = kind ? (slug ? `/${KIND_TO_SLUG[kind]}/${slug}` : `/${KIND_TO_SLUG[kind]}`) : "/";
  const en = kind ? (slug ? `/en/${KIND_TO_SLUG_EN[kind]}/${slug}` : `/en/${KIND_TO_SLUG_EN[kind]}`) : "/en";
  const de = kind ? (slug ? `/de/${KIND_TO_SLUG_EN[kind]}/${slug}` : `/de/${KIND_TO_SLUG_EN[kind]}`) : "/de";
  const canonical = locale === "sr" ? sr : locale === "en" ? en : de;
  return {
    alternates: {
      canonical,
      languages: { "sr-Latn-RS": sr, en: en, de: de, "x-default": sr },
    },
  };
}

const CUSTOM_PAIRS: [string, string][] = [
  ["apartmani-beograd", "belgrade-apartments"],
  ["oglasi-smestaj", "list-your-space"],
  ["pretraga", "search"],
  ["mapa", "map"],
  ["sacuvano", "saved"],
  ["o-nama", "about"],
  ["kontakt", "contact"],
  ["uslovi", "terms"],
  ["privatnost", "privacy"],
];

export function infoPath(which: "about" | "contact" | "terms" | "privacy" | "faq", locale: Lang) {
  const map: Record<string, [string, string]> = { about: ["o-nama", "about"], contact: ["kontakt", "contact"], terms: ["uslovi", "terms"], privacy: ["privatnost", "privacy"], faq: ["faq", "faq"] };
  const [sr, en] = map[which];
  return (locale === "sr" ? "/" : `/${locale}/`) + (locale === "sr" ? sr : en);
}
export function customSeg(seg: string, target: Lang): string | null {
  for (const [sr, en] of CUSTOM_PAIRS) if (seg === sr || seg === en) return target === "sr" ? sr : en;
  return null;
}
export function belgradePath(locale: Lang) { return locale === "sr" ? "/apartmani-beograd" : `/${locale}/belgrade-apartments`; }
export function listPath(locale: Lang) { return locale === "sr" ? "/oglasi-smestaj" : `/${locale}/list-your-space`; }
