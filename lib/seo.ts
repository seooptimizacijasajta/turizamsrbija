import { Kind, Lang } from "./types";
import { altMeta } from "./slug";

const SECTION: Record<Kind, { sr: [string, string]; en: [string, string]; de: [string, string] }> = {
  mountain: {
    sr: ["Planine Srbije — destinacije i smeštaj", "Najlepše planine Srbije: Kopaonik, Zlatibor, Tara, Stara planina i druge — vodič, smeštaj i ponuda za odmor."],
    en: ["Mountains of Serbia — destinations & stays", "Serbia's finest mountains: Kopaonik, Zlatibor, Tara, Stara Planina and more — guide, accommodation and offers."],
    de: ["Berge Serbiens — Reiseziele & Unterkünfte", "Die schönsten Berge Serbiens: Kopaonik, Zlatibor, Tara, Stara Planina und mehr — Reiseführer, Unterkünfte und Angebote."],
  },
  lake: {
    sr: ["Jezera Srbije — destinacije i smeštaj", "Najlepša jezera Srbije: Palić, Srebrno, Perućac, Vlasinsko i druga — plaže, priroda i smeštaj."],
    en: ["Lakes of Serbia — destinations & stays", "Serbia's finest lakes: Palić, Silver Lake, Perućac, Vlasina and more — beaches, nature and stays."],
    de: ["Seen Serbiens — Reiseziele & Unterkünfte", "Die schönsten Seen Serbiens: Palić, Silbersee, Perućac, Vlasina-See und mehr — Strände, Natur und Unterkünfte."],
  },
  river: {
    sr: ["Reke Srbije — rafting, plaže i smeštaj", "Najlepše reke Srbije: Drina, Tara, Dunav, Uvac, Ibar i druge — rafting, splavarenje, rečne plaže i smeštaj uz vodu."],
    en: ["Rivers of Serbia — rafting, beaches & stays", "Serbia's finest rivers: Drina, Tara, Danube, Uvac, Ibar and more — rafting, river beaches and stays by the water."],
    de: ["Flüsse Serbiens — Rafting, Strände & Unterkünfte", "Die schönsten Flüsse Serbiens: Drina, Tara, Donau, Uvac, Ibar und mehr — Rafting, Flussstrände und Unterkünfte am Wasser."],
  },
  spa: {
    sr: ["Banje Srbije — lečenje, wellness i smeštaj", "Najpoznatije banje Srbije: Vrnjačka Banja, Sokobanja, Niška, Prolom i druge — termalni izvori, wellness i smeštaj."],
    en: ["Spas of Serbia — wellness & stays", "Serbia's best-known spas: Vrnjačka Banja, Sokobanja, Niška Banja and more — thermal springs, wellness and accommodation."],
    de: ["Kurorte Serbiens — Wellness & Unterkünfte", "Die bekanntesten Kurorte Serbiens: Vrnjačka Banja, Sokobanja, Niška Banja und mehr — Thermalquellen, Wellness und Unterkünfte."],
  },
  ethno: {
    sr: ["Etno sela Srbije — tradicija i smeštaj", "Autentična etno sela Srbije: Drvengrad, Sirogojno, Tršić i druga — tradicija, stari zanati, gastronomija i smeštaj."],
    en: ["Ethno villages of Serbia — tradition & stays", "Authentic ethno villages: Drvengrad, Sirogojno, Tršić and more — tradition, old crafts and accommodation."],
    de: ["Ethno-Dörfer Serbiens — Tradition & Unterkünfte", "Authentische Ethno-Dörfer Serbiens: Drvengrad, Sirogojno, Tršić und mehr — Tradition, altes Handwerk und Unterkünfte."],
  },
  stay: {
    sr: ["Smeštaj u Srbiji — hoteli i privatni apartmani", "Hoteli, vile i privatni apartmani širom Srbije — rezervišite smeštaj na planini, jezeru, u banji ili gradu."],
    en: ["Accommodation in Serbia — hotels & apartments", "Hotels, villas and private apartments across Serbia — book stays in the mountains, by lakes, at spas or in cities."],
    de: ["Unterkünfte in Serbien — Hotels & Apartments", "Hotels, Villen und private Apartments in ganz Serbien — buchen Sie Unterkünfte in den Bergen, an Seen, in Kurorten oder Städten."],
  },
};

export function sectionMeta(locale: Lang, kind: Kind) {
  const [title, description] = SECTION[kind][locale === "sr" ? "sr" : locale === "de" ? "de" : "en"];
  const og = `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 90))}`;
  const ogLocale = locale === "sr" ? "sr_RS" : locale === "de" ? "de_DE" : "en_US";
  return { title, description, openGraph: { title, description, locale: ogLocale, images: [og] }, ...altMeta(locale, kind) };
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
