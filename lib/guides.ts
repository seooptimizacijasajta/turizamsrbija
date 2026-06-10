import type { Kind } from "./types";

export type Guide = { slug: string; kind: Kind; place: string; sr: string; en: string };

// One guide (blog post) per destination on the site. `place` = slugify(destination name)
export const GUIDES: Guide[] = [
  { slug: "kopaonik-vodic", kind: "mountain", place: "kopaonik", sr: "Kopaonik", en: "Kopaonik" },
  { slug: "zlatibor-vodic", kind: "mountain", place: "zlatibor", sr: "Zlatibor", en: "Zlatibor" },
  { slug: "tara-drina-vodic", kind: "mountain", place: "tara", sr: "Tara i Drina", en: "Tara & the Drina" },
  { slug: "divcibare-vodic", kind: "mountain", place: "divcibare", sr: "Divčibare", en: "Divčibare" },
  { slug: "goc-vodic", kind: "mountain", place: "goc", sr: "Goč", en: "Goč" },
  { slug: "stara-planina-vodic", kind: "mountain", place: "stara-planina", sr: "Stara planina", en: "Stara Planina" },
  { slug: "srebrno-jezero-vodic", kind: "lake", place: "srebrno-jezero", sr: "Srebrno jezero", en: "Silver Lake" },
  { slug: "palicko-jezero-vodic", kind: "lake", place: "palicko-jezero", sr: "Palić", en: "Palić" },
  { slug: "perucacko-jezero-vodic", kind: "lake", place: "perucacko-jezero", sr: "Perućačko jezero", en: "Lake Perućac" },
  { slug: "vlasinsko-jezero-vodic", kind: "lake", place: "vlasinsko-jezero", sr: "Vlasinsko jezero", en: "Vlasina Lake" },
  { slug: "zlatarsko-jezero-vodic", kind: "lake", place: "zlatarsko-jezero", sr: "Zlatarsko jezero", en: "Zlatar Lake" },
  { slug: "gazivode-jezero-vodic", kind: "lake", place: "gazivode-ujmansko-jezero", sr: "Gazivode", en: "Gazivode" },
  { slug: "djerdap-vodic", kind: "lake", place: "djerdap", sr: "Đerdap", en: "Đerdap" },
  { slug: "vrnjacka-banja-vodic", kind: "spa", place: "vrnjacka-banja", sr: "Vrnjačka Banja", en: "Vrnjačka Banja" },
  { slug: "soko-banja-vodic", kind: "spa", place: "sokobanja", sr: "Sokobanja", en: "Soko Banja" },
  { slug: "banja-koviljaca-vodic", kind: "spa", place: "banja-koviljaca", sr: "Banja Koviljača", en: "Banja Koviljača" },
  { slug: "banja-vrujci-vodic", kind: "spa", place: "banja-vrujci", sr: "Banja Vrujci", en: "Banja Vrujci" },
  { slug: "niska-banja-vodic", kind: "spa", place: "niska-banja", sr: "Niška Banja", en: "Niška Banja" },
  { slug: "prolom-banja-vodic", kind: "spa", place: "prolom-banja", sr: "Prolom Banja", en: "Prolom Banja" },
  { slug: "ribarska-banja-vodic", kind: "spa", place: "ribarska-banja", sr: "Ribarska Banja", en: "Ribarska Banja" },
  { slug: "mokra-gora-drvengrad", kind: "ethno", place: "drvengrad-mecavnik", sr: "Mokra Gora i Drvengrad", en: "Mokra Gora & Drvengrad" },
  { slug: "etno-selo-latkovac-vodic", kind: "ethno", place: "etno-selo-latkovac", sr: "Etno selo Latkovac", en: "Latkovac" },
  { slug: "moravski-konaci-vodic", kind: "ethno", place: "moravski-konaci", sr: "Moravski Konaci", en: "Moravski Konaci" },
  { slug: "sirogojno-vodic", kind: "ethno", place: "sirogojno-staro-selo", sr: "Sirogojno", en: "Sirogojno" },
  { slug: "trsic-vodic", kind: "ethno", place: "trsic", sr: "Tršić", en: "Tršić" },
  { slug: "beograd-vikend-vodic", kind: "stay", place: "beograd", sr: "Beograd", en: "Belgrade" },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesForKind = (kind: Kind) => GUIDES.filter((g) => g.kind === kind);
export const guideForPlace = (placeSlug: string) =>
  GUIDES.find((g) => g.place === placeSlug || placeSlug.includes(g.place) || g.place.includes(placeSlug));
export function relatedGuides(slug: string, n = 4): Guide[] {
  const g = guideBySlug(slug);
  if (!g) return GUIDES.filter((x) => x.slug !== slug).slice(0, n);
  const same = GUIDES.filter((x) => x.kind === g.kind && x.slug !== slug);
  const others = GUIDES.filter((x) => x.kind !== g.kind && x.slug !== slug);
  return [...same, ...others].slice(0, n);
}
export const blogHref = (slug: string, lang: "sr" | "en" | "de") => (lang === "sr" ? "/blog/" : `/${lang}/blog/`) + slug;
