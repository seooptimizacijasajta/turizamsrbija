import type { Lang } from "./types";
export type PCat = { key: string; sr: string; en: string; de: string; icon: string };
export const PCATS: PCat[] = [
  { key: "med", sr: "Med", en: "Honey", de: "Honig", icon: "🍯" },
  { key: "sir-kajmak", sr: "Sir i kajmak", en: "Cheese & kajmak", de: "Käse & Kajmak", icon: "🧀" },
  { key: "rakija", sr: "Rakija", en: "Rakija (brandy)", de: "Rakija (Brand)", icon: "🥃" },
  { key: "vino", sr: "Vino", en: "Wine", de: "Wein", icon: "🍷" },
  { key: "zimnica", sr: "Zimnica", en: "Preserves", de: "Eingemachtes", icon: "🫙" },
  { key: "mesne", sr: "Mesne prerađevine", en: "Cured meats", de: "Wurstwaren", icon: "🥓" },
  { key: "caj-bilje", sr: "Čaj i lekovito bilje", en: "Herbal teas", de: "Kräutertees", icon: "🌿" },
  { key: "voce-povrce", sr: "Voće i povrće", en: "Fruit & vegetables", de: "Obst & Gemüse", icon: "🍎" },
  { key: "rukotvorine", sr: "Rukotvorine", en: "Handicrafts", de: "Handwerk", icon: "🧶" },
];
export const pcatLabel = (k: string, lang: Lang) => { const c = PCATS.find((x) => x.key === k); return c ? (lang === "sr" ? c.sr : lang === "de" ? c.de : c.en) : k; };
export const pcatIcon = (k: string) => PCATS.find((x) => x.key === k)?.icon || "🛒";
export const unitLabel = (u: string, lang: Lang) => u === "kom" ? (lang === "sr" ? "kom" : lang === "de" ? "Stk" : "pc") : u;
export const pijacaPath = (lang: Lang) => lang === "sr" ? "/pijaca" : `/${lang}/marketplace`;
