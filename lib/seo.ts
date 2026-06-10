import { Kind, Lang } from "./types";
import { altMeta } from "./slug";

const SECTION: Record<Kind, { sr: [string, string]; en: [string, string] }> = {
  mountain: {
    sr: ["Planine Srbije — destinacije i smeštaj", "Najlepše planine Srbije: Kopaonik, Zlatibor, Tara, Stara planina i druge — vodič, smeštaj i ponuda za odmor."],
    en: ["Mountains of Serbia — destinations & stays", "Serbia's finest mountains: Kopaonik, Zlatibor, Tara, Stara Planina and more — guide, accommodation and offers."],
  },
  lake: {
    sr: ["Jezera Srbije — destinacije i smeštaj", "Najlepša jezera Srbije: Palić, Srebrno, Perućac, Vlasinsko i druga — plaže, priroda i smeštaj."],
    en: ["Lakes of Serbia — destinations & stays", "Serbia's finest lakes: Palić, Silver Lake, Perućac, Vlasina and more — beaches, nature and stays."],
  },
  spa: {
    sr: ["Banje Srbije — lečenje, wellness i smeštaj", "Najpoznatije banje Srbije: Vrnjačka Banja, Sokobanja, Niška, Prolom i druge — termalni izvori, wellness i smeštaj."],
    en: ["Spas of Serbia — wellness & stays", "Serbia's best-known spas: Vrnjačka Banja, Sokobanja, Niška Banja and more — thermal springs, wellness and accommodation."],
  },
  ethno: {
    sr: ["Etno sela Srbije — tradicija i smeštaj", "Autentična etno sela Srbije: Drvengrad, Sirogojno, Tršić i druga — tradicija, stari zanati, gastronomija i smeštaj."],
    en: ["Ethno villages of Serbia — tradition & stays", "Authentic ethno villages: Drvengrad, Sirogojno, Tršić and more — tradition, old crafts and accommodation."],
  },
  stay: {
    sr: ["Smeštaj u Srbiji — hoteli i privatni apartmani", "Hoteli, vile i privatni apartmani širom Srbije — rezervišite smeštaj na planini, jezeru, u banji ili gradu."],
    en: ["Accommodation in Serbia — hotels & apartments", "Hotels, villas and private apartments across Serbia — book stays in the mountains, by lakes, at spas or in cities."],
  },
};

export function sectionMeta(locale: Lang, kind: Kind) {
  const [title, description] = SECTION[kind][locale === "sr" ? "sr" : "en"];
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 90))}`;
  return { title, description, openGraph: { title, description, images: [og] }, ...altMeta(locale, kind) };
}

type Bi = { sr: string; en: string };
export function listingMeta(locale: Lang, kind: Kind, slug: string, item: { name: Bi; region: Bi; short: Bi; img?: string } | null) {
  if (!item) return altMeta(locale, kind, slug);
  const name = (item.name as any)[locale] || item.name.en || item.name.sr;
  const region = (item.region as any)[locale] || item.region.en || item.region.sr;
  const short = (item.short as any)[locale] || item.short.en || item.short.sr || name;
  const title = `${name}${region ? ` — ${region}` : ""} | Turizam Srbija`;
  return {
    title, description: short,
    openGraph: { title, description: short, type: "article", images: item.img ? [item.img] : undefined },
    ...altMeta(locale, kind, slug),
  };
}
