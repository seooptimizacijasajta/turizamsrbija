import type { Lang } from "./types";
import { slugify } from "./slug";

export type EvCat = { key: string; sr: string; en: string; de: string; srSlug: string; enSlug: string; deSlug: string; icon: string };

export const EVENT_CATS: EvCat[] = [
  { key: "muzika", sr: "Muzika i festivali", en: "Music & festivals", de: "Musik & Festivals", srSlug: "muzika", enSlug: "music", deSlug: "musik", icon: "🎵" },
  { key: "gastro", sr: "Gastronomija i vino", en: "Food & wine", de: "Gastronomie & Wein", srSlug: "gastronomija", enSlug: "food-wine", deSlug: "gastronomie", icon: "🍷" },
  { key: "kultura", sr: "Kultura i film", en: "Culture & film", de: "Kultur & Film", srSlug: "kultura", enSlug: "culture", deSlug: "kultur", icon: "🎭" },
  { key: "tradicija", sr: "Tradicija i sabori", en: "Tradition & folklore", de: "Tradition & Folklore", srSlug: "tradicija-i-sabori", enSlug: "tradition", deSlug: "tradition", icon: "🪗" },
  { key: "sport", sr: "Sport", en: "Sport", de: "Sport", srSlug: "sport", enSlug: "sport", deSlug: "sport", icon: "🏃" },
  { key: "sajmovi", sr: "Sajmovi", en: "Fairs", de: "Messen", srSlug: "sajmovi", enSlug: "fairs", deSlug: "messen", icon: "🎪" },
];

export const evCatByKey = (k: string) => EVENT_CATS.find((c) => c.key === k);
export const evCatBySlug = (slug: string) => EVENT_CATS.find((c) => c.srSlug === slug || c.enSlug === slug || c.deSlug === slug);
export const evCatLabel = (c: EvCat, lang: Lang) => (lang === "sr" ? c.sr : lang === "de" ? c.de : c.en);

export const manifIndexPath = (lang: Lang) => lang === "sr" ? "/manifestacije" : lang === "de" ? "/de/veranstaltungen" : "/en/events";
export const manifCatPath = (c: EvCat, lang: Lang) =>
  lang === "sr" ? `/manifestacije/${c.srSlug}` : lang === "de" ? `/de/veranstaltungen/${c.deSlug}` : `/en/events/${c.enSlug}`;
export const eventPath = (name: string, lang: Lang) =>
  lang === "sr" ? `/manifestacija/${slugify(name)}` : lang === "de" ? `/de/veranstaltung/${slugify(name)}` : `/en/event/${slugify(name)}`;
export const evSlug = (name: string) => slugify(name);

const MONTHS_SR = ["", "Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
const MONTHS_EN = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_DE = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
export const monthName = (m: number | null, lang: Lang) => !m ? "" : (lang === "sr" ? MONTHS_SR : lang === "de" ? MONTHS_DE : MONTHS_EN)[m] || "";

export const EVENT_CITIES: { slug: string; name: string }[] = [
  { slug: "beograd", name: "Beograd" },
  { slug: "novi-sad", name: "Novi Sad" },
  { slug: "nis", name: "Niš" },
  { slug: "vrnjacka-banja", name: "Vrnjačka Banja" },
  { slug: "leskovac", name: "Leskovac" },
  { slug: "kragujevac", name: "Kragujevac" },
  { slug: "zajecar", name: "Zaječar" },
  { slug: "zrenjanin", name: "Zrenjanin" },
  { slug: "smederevo", name: "Smederevo" },
  { slug: "valjevo", name: "Valjevo" },
  { slug: "negotin", name: "Negotin" },
  { slug: "aleksandrovac", name: "Aleksandrovac" },
  { slug: "palic", name: "Palić" },
  { slug: "bajina-basta", name: "Bajina Bašta" },
];
export const eventCityBySlug = (slug: string) => EVENT_CITIES.find((c) => c.slug === slug);
export const manifCityPath = (slug: string, lang: Lang) =>
  lang === "sr" ? `/manifestacije/grad/${slug}` : lang === "de" ? `/de/veranstaltungen/stadt/${slug}` : `/en/events/city/${slug}`;
