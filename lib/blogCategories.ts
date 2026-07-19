import type { Lang } from "./types";
import { COUNTRIES, type Country, type Tri } from "./inostranstvo";

export type BlogCat = {
  id: string;
  slug: Tri;
  name: Tri;
  lead: Tri;
  hero: string;
  /** ako je kategorija strana destinacija, ovde je vodič iz lib/inostranstvo.ts */
  country?: Country;
};

const c = (id: string) => COUNTRIES.find((x) => x.id === id);

const COUNTRY_CATS: BlogCat[] = COUNTRIES.map((co) => ({
  id: co.id,
  slug: co.slug,
  name: co.name,
  lead: co.lead,
  hero: co.hero,
  country: co,
}));

export const BLOG_CATS: BlogCat[] = [
  ...COUNTRY_CATS,
  {
    id: "crkve-i-manastiri",
    slug: { sr: "crkve-i-manastiri", en: "churches-and-monasteries", de: "kirchen-und-kloester" },
    name: { sr: "Crkve i manastiri", en: "Churches & monasteries", de: "Kirchen & Klöster" },
    lead: {
      sr: "Srednjovekovne zadužbine, freske, manastirske rute i vodiči za posetu svetinjama Srbije.",
      en: "Medieval endowments, frescoes, monastery routes and guides to Serbia's holy sites.",
      de: "Mittelalterliche Stiftungen, Fresken, Klosterrouten und Besuchsführer.",
    },
    hero: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "gastronomija",
    slug: { sr: "gastronomija", en: "food-and-drink", de: "gastronomie" },
    name: { sr: "Gastronomija", en: "Food & drink", de: "Gastronomie" },
    lead: {
      sr: "Domaća kuhinja, kafane i vinski putevi — šta i gde jesti na putovanju kroz Srbiju.",
      en: "Home cooking, taverns and wine roads — what and where to eat while travelling Serbia.",
      de: "Hausmannskost, Kafanas und Weinstraßen — was und wo man in Serbien isst.",
    },
    hero: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "turisticke-agencije",
    slug: { sr: "turisticke-agencije", en: "travel-agencies", de: "reisebueros" },
    name: { sr: "Turističke agencije", en: "Travel agencies", de: "Reisebüros" },
    lead: {
      sr: "Organizatori putovanja i subagenti, po gradovima — kako izabrati agenciju i na šta paziti.",
      en: "Tour operators and sub-agents by city — how to pick an agency and what to watch out for.",
      de: "Reiseveranstalter und Subagenten nach Städten — wie man ein Reisebüro auswählt.",
    },
    hero: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "prevoz",
    slug: { sr: "prevoz", en: "transport", de: "transport" },
    name: { sr: "Prevoz i autoprevoznici", en: "Transport & carriers", de: "Transport & Beförderer" },
    lead: {
      sr: "Autoprevoznici, kombi prevoz za Srbiju i inostranstvo, autobuske i avio veze — kako stići do destinacije.",
      en: "Coach operators, minibus transfers within Serbia and abroad, bus and air links — how to get there.",
      de: "Busunternehmen, Kleinbus-Transfers im In- und Ausland, Bus- und Flugverbindungen.",
    },
    hero: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "saveti",
    slug: { sr: "saveti-za-putovanje", en: "travel-tips", de: "reisetipps" },
    name: { sr: "Saveti za putovanje", en: "Travel tips", de: "Reisetipps" },
    lead: {
      sr: "Praktični saveti: dokumenta, osiguranje, granica, pakovanje, putovanje sa decom i ušteda na putu.",
      en: "Practical advice: documents, insurance, borders, packing, travelling with children and saving money.",
      de: "Praktische Tipps: Dokumente, Versicherung, Grenze, Packen, Reisen mit Kindern und Sparen.",
    },
    hero: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "zanimljivosti",
    slug: { sr: "zanimljivosti", en: "curiosities", de: "wissenswertes" },
    name: { sr: "Zanimljivosti", en: "Curiosities", de: "Wissenswertes" },
    lead: {
      sr: "Neobične priče, rekordi i mesta o kojima se malo zna — Srbija i svet iz drugog ugla.",
      en: "Unusual stories, records and little-known places — Serbia and the world from another angle.",
      de: "Ungewöhnliche Geschichten, Rekorde und wenig bekannte Orte.",
    },
    hero: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "putopisi",
    slug: { sr: "putopisi", en: "travelogues", de: "reiseberichte" },
    name: { sr: "Putopisi", en: "Travelogues", de: "Reiseberichte" },
    lead: {
      sr: "Iskustva sa puta iz prve ruke — rute, troškovi i utisci putnika i članova portala.",
      en: "First-hand travel experiences — routes, costs and impressions from travellers and members.",
      de: "Reiseerlebnisse aus erster Hand — Routen, Kosten und Eindrücke.",
    },
    hero: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1600&q=80",
  },
];

export const catBySlug = (slug: string) =>
  BLOG_CATS.find((x) => x.slug.sr === slug || x.slug.en === slug || x.slug.de === slug);
export const catById = (id: string) => BLOG_CATS.find((x) => x.id === id);

export const catPath = (cat: BlogCat, l: Lang) =>
  l === "sr" ? `/${cat.slug.sr}` : l === "de" ? `/de/${cat.slug.de}` : `/en/${cat.slug.en}`;

export const catName = (cat: BlogCat, l: Lang) => (l === "sr" ? cat.name.sr : l === "de" ? cat.name.de : cat.name.en);

export const catsIndexPath = (l: Lang) =>
  l === "sr" ? "/teme" : l === "de" ? "/de/themen" : "/en/topics";

export { c as _c };
