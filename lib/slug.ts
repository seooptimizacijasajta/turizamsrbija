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
export const KIND_TO_SLUG_DE: Record<Kind, string> = {
  mountain: "berge", lake: "seen", spa: "kurorte", ethno: "ethno-doerfer", stay: "unterkunft",
};
export const SLUG_TO_KIND_DE: Record<string, Kind> = {
  berge: "mountain", seen: "lake", kurorte: "spa", "ethno-doerfer": "ethno", unterkunft: "stay",
};

export function catSlug(kind: Kind, locale: Lang): string {
  return locale === "sr" ? KIND_TO_SLUG[kind] : locale === "de" ? KIND_TO_SLUG_DE[kind] : KIND_TO_SLUG_EN[kind];
}
export function kindFromSlug(seg: string): Kind | undefined {
  return SLUG_TO_KIND[seg] || SLUG_TO_KIND_EN[seg] || SLUG_TO_KIND_DE[seg];
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
  const de = kind ? (slug ? `/de/${KIND_TO_SLUG_DE[kind]}/${slug}` : `/de/${KIND_TO_SLUG_DE[kind]}`) : "/de";
  const canonical = locale === "sr" ? sr : locale === "en" ? en : de;
  return {
    alternates: {
      canonical,
      languages: { "sr-Latn-RS": sr, en: en, de: de, "x-default": sr },
    },
  };
}

const CUSTOM_PAIRS: [string, string, string][] = [
  ["apartmani-beograd", "belgrade-apartments", "belgrad-apartments"],
  ["oglasi-smestaj", "list-your-space", "unterkunft-anbieten"],
  ["pretraga", "search", "suche"],
  ["mapa", "map", "karte"],
  ["sacuvano", "saved", "gespeichert"],
  ["pijaca", "marketplace", "markt"],
  ["vauceri", "vouchers", "gutscheine"],
  ["oglasavanje", "advertising", "werbung"],
  ["o-nama", "about", "ueber-uns"],
  ["kontakt", "contact", "kontakt"],
  ["uslovi", "terms", "agb"],
  ["privatnost", "privacy", "datenschutz"],
  ["nalog", "nalog", "konto"],
  ["info-beograd", "belgrade-info", "belgrad-info"],
];

export function infoPath(which: "about" | "contact" | "terms" | "privacy" | "faq", locale: Lang) {
  const map: Record<string, [string, string, string]> = { about: ["o-nama", "about", "ueber-uns"], contact: ["kontakt", "contact", "kontakt"], terms: ["uslovi", "terms", "agb"], privacy: ["privatnost", "privacy", "datenschutz"], faq: ["faq", "faq", "faq"] };
  const [sr, en, de] = map[which];
  return (locale === "sr" ? "/" : `/${locale}/`) + (locale === "sr" ? sr : locale === "de" ? de : en);
}
export function customSeg(seg: string, target: Lang): string | null {
  for (const [sr, en, de] of CUSTOM_PAIRS) if (seg === sr || seg === en || seg === de) return target === "sr" ? sr : target === "de" ? de : en;
  return null;
}
export function marketingPath(locale: Lang) { return locale === "sr" ? "/oglasavanje" : locale === "de" ? "/de/werbung" : "/en/advertising"; }
export function voucherPath(locale: Lang) { return locale === "sr" ? "/vauceri" : locale === "de" ? "/de/gutscheine" : "/en/vouchers"; }
export function belgradePath(locale: Lang) { return locale === "sr" ? "/apartmani-beograd" : locale === "de" ? "/de/belgrad-apartments" : "/en/belgrade-apartments"; }
export function listPath(locale: Lang) { return locale === "sr" ? "/oglasi-smestaj" : locale === "de" ? "/de/unterkunft-anbieten" : "/en/list-your-space"; }

export const accountPath = (l: Lang) => l === "sr" ? "/nalog" : l === "de" ? "/de/konto" : "/en/nalog";
export const mapPath = (l: Lang) => l === "sr" ? "/mapa" : l === "de" ? "/de/karte" : "/en/map";
export const searchPath = (l: Lang) => l === "sr" ? "/pretraga" : l === "de" ? "/de/suche" : "/en/search";
export const savedPath = (l: Lang) => l === "sr" ? "/sacuvano" : l === "de" ? "/de/gespeichert" : "/en/saved";
export const blogPath = (l: Lang) => l === "sr" ? "/blog" : `/${l}/blog`;
