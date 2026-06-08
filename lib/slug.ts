import { Kind } from "./types";

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

export const KIND_TO_SLUG: Record<Kind, string> = {
  mountain: "planine",
  lake: "jezera",
  spa: "banje",
  ethno: "etno-sela",
  stay: "smestaj",
};

export const SLUG_TO_KIND: Record<string, Kind> = {
  planine: "mountain",
  jezera: "lake",
  banje: "spa",
  "etno-sela": "ethno",
  smestaj: "stay",
};

/** Pretty path for a listing, e.g. /planine/kopaonik */
export function listingPath(kind: Kind, nameSr: string): string {
  return `/${KIND_TO_SLUG[kind]}/${slugify(nameSr)}`;
}
