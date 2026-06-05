"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { Lang, Bi } from "./types";

export const I18N: Record<string,{sr:string;en:string}> = {
  "brand_sub": {
    "sr": "Turistički portal Srbije",
    "en": "Serbia travel portal"
  },
  "nav_home": {
    "sr": "Početna",
    "en": "Home"
  },
  "nav_mountains": {
    "sr": "Planine",
    "en": "Mountains"
  },
  "nav_lakes": {
    "sr": "Jezera",
    "en": "Lakes"
  },
  "nav_spas": {
    "sr": "Banje",
    "en": "Spas"
  },
  "nav_ethno": {
    "sr": "Etno sela",
    "en": "Ethno villages"
  },
  "nav_stays": {
    "sr": "Smeštaj",
    "en": "Accommodation"
  },
  "hero_title": {
    "sr": "Otkrijte lepote Srbije",
    "en": "Discover the beauty of Serbia"
  },
  "hero_sub": {
    "sr": "Planine, jezera, banje i etno sela — i smeštaj iz cele Srbije na jednom mestu.",
    "en": "Mountains, lakes, spas and ethno villages — plus accommodation from all over Serbia in one place."
  },
  "hero_cta1": {
    "sr": "Istraži destinacije",
    "en": "Explore destinations"
  },
  "hero_cta2": {
    "sr": "Pronađi smeštaj",
    "en": "Find accommodation"
  },
  "search_ph": {
    "sr": "Pretražite destinacije i smeštaj…",
    "en": "Search destinations and stays…"
  },
  "search_all": {
    "sr": "Sve kategorije",
    "en": "All categories"
  },
  "search_btn": {
    "sr": "Pretraga",
    "en": "Search"
  },
  "explore_eyebrow": {
    "sr": "Kategorije",
    "en": "Categories"
  },
  "explore_title": {
    "sr": "Šta želite da posetite?",
    "en": "What would you like to visit?"
  },
  "explore_lead": {
    "sr": "Izaberite kategoriju i otkrijte najlepše destinacije Srbije.",
    "en": "Pick a category and discover Serbia's finest destinations."
  },
  "featured_eyebrow": {
    "sr": "Izdvajamo",
    "en": "Featured"
  },
  "featured_title": {
    "sr": "Popularne destinacije",
    "en": "Popular destinations"
  },
  "featured_lead": {
    "sr": "Najomiljenije destinacije naših posetilaca.",
    "en": "The favourites of our visitors."
  },
  "stays_eyebrow": {
    "sr": "Smeštaj",
    "en": "Stays"
  },
  "stays_title": {
    "sr": "Hoteli i privatni smeštaj",
    "en": "Hotels & private accommodation"
  },
  "stays_lead": {
    "sr": "Od planinskih hotela do seoskih domaćinstava širom Srbije.",
    "en": "From mountain hotels to village homesteads across Serbia."
  },
  "stat_dest": {
    "sr": "Destinacija",
    "en": "Destinations"
  },
  "stat_stays": {
    "sr": "Smeštajnih jedinica",
    "en": "Places to stay"
  },
  "stat_regions": {
    "sr": "Regiona",
    "en": "Regions"
  },
  "stat_support": {
    "sr": "Podrška",
    "en": "Support"
  },
  "cta_title": {
    "sr": "Spremni za putovanje?",
    "en": "Ready to travel?"
  },
  "cta_lead": {
    "sr": "Pošaljite upit i naš tim će vam pomoći da isplanirate savršen odmor u Srbiji.",
    "en": "Send an inquiry and our team will help you plan the perfect holiday in Serbia."
  },
  "cta_btn": {
    "sr": "Pošalji upit",
    "en": "Send inquiry"
  },
  "view_all": {
    "sr": "Pogledaj sve",
    "en": "View all"
  },
  "view_details": {
    "sr": "Detaljnije",
    "en": "View details"
  },
  "book_now": {
    "sr": "Pošalji upit",
    "en": "Send inquiry"
  },
  "per_night": {
    "sr": "po noći",
    "en": "per night"
  },
  "from": {
    "sr": "od",
    "en": "from"
  },
  "free_entry": {
    "sr": "Slobodan pristup",
    "en": "Free to visit"
  },
  "filter_search": {
    "sr": "Pretraga po imenu…",
    "en": "Search by name…"
  },
  "filter_region": {
    "sr": "Svi regioni",
    "en": "All regions"
  },
  "filter_sort": {
    "sr": "Sortiraj",
    "en": "Sort"
  },
  "sort_featured": {
    "sr": "Izdvojeno",
    "en": "Featured"
  },
  "sort_rating": {
    "sr": "Po oceni",
    "en": "By rating"
  },
  "sort_price_low": {
    "sr": "Cena: niža → viša",
    "en": "Price: low → high"
  },
  "sort_price_high": {
    "sr": "Cena: viša → niža",
    "en": "Price: high → low"
  },
  "cat_all": {
    "sr": "Sve",
    "en": "All"
  },
  "cat_hotel": {
    "sr": "Hoteli",
    "en": "Hotels"
  },
  "cat_private": {
    "sr": "Privatni smeštaj",
    "en": "Private accommodation"
  },
  "results": {
    "sr": "rezultata",
    "en": "results"
  },
  "no_results": {
    "sr": "Nema rezultata za izabrane filtere.",
    "en": "No results for the selected filters."
  },
  "detail_about": {
    "sr": "O destinaciji",
    "en": "About"
  },
  "detail_highlights": {
    "sr": "Istaknuto",
    "en": "Highlights"
  },
  "detail_gallery": {
    "sr": "Galerija",
    "en": "Gallery"
  },
  "detail_elevation": {
    "sr": "Nadmorska visina",
    "en": "Elevation"
  },
  "detail_rating": {
    "sr": "Ocena",
    "en": "Rating"
  },
  "detail_capacity": {
    "sr": "Kapacitet",
    "en": "Capacity"
  },
  "detail_persons": {
    "sr": "osoba",
    "en": "guests"
  },
  "detail_nearby": {
    "sr": "U blizini",
    "en": "Nearby stays"
  },
  "book_title": {
    "sr": "Rezervišite boravak",
    "en": "Book your stay"
  },
  "inquire_title": {
    "sr": "Pošaljite upit",
    "en": "Send an inquiry"
  },
  "f_name": {
    "sr": "Ime i prezime",
    "en": "Full name"
  },
  "f_email": {
    "sr": "Email",
    "en": "Email"
  },
  "f_phone": {
    "sr": "Telefon",
    "en": "Phone"
  },
  "f_checkin": {
    "sr": "Dolazak",
    "en": "Check-in"
  },
  "f_checkout": {
    "sr": "Odlazak",
    "en": "Check-out"
  },
  "f_guests": {
    "sr": "Broj gostiju",
    "en": "Guests"
  },
  "f_message": {
    "sr": "Poruka (opciono)",
    "en": "Message (optional)"
  },
  "f_submit": {
    "sr": "Pošalji upit",
    "en": "Send inquiry"
  },
  "f_note": {
    "sr": "Nije potrebno plaćanje. Domaćin vam odgovara u roku od 24h.",
    "en": "No payment required. The host replies within 24h."
  },
  "f_success": {
    "sr": "Hvala! Vaš upit je poslat. Kontaktiraćemo vas uskoro.",
    "en": "Thank you! Your inquiry has been sent. We'll be in touch soon."
  },
  "lead_mountain": {
    "sr": "Od Kopaonika do Stare planine — najlepše planine Srbije za skijanje, planinarenje i odmor.",
    "en": "From Kopaonik to Stara Planina — Serbia's finest mountains for skiing, hiking and rest."
  },
  "lead_lake": {
    "sr": "Smaragdna jezera, peščane plaže i mirne visoravni širom Srbije.",
    "en": "Emerald lakes, sandy beaches and quiet plateaus across Serbia."
  },
  "lead_spa": {
    "sr": "Termomineralni izvori i wellness ponuda u najpoznatijim banjama Srbije.",
    "en": "Thermo-mineral springs and wellness at Serbia's best-known spas."
  },
  "lead_ethno": {
    "sr": "Autentična etno sela, stari zanati i tradicionalna kuhinja.",
    "en": "Authentic ethno villages, old crafts and traditional cuisine."
  },
  "lead_stay": {
    "sr": "Hoteli, vile i privatni apartmani iz cele Srbije — pošaljite upit bez obaveze.",
    "en": "Hotels, villas and private apartments from all over Serbia — inquire with no obligation."
  },
  "type_mountain": {
    "sr": "Planina",
    "en": "Mountain"
  },
  "type_lake": {
    "sr": "Jezero",
    "en": "Lake"
  },
  "type_spa": {
    "sr": "Banja",
    "en": "Spa"
  },
  "type_ethno": {
    "sr": "Etno selo",
    "en": "Ethno village"
  },
  "type_stay": {
    "sr": "Smeštaj",
    "en": "Accommodation"
  },
  "foot_about": {
    "sr": "Vodič kroz najlepše destinacije i smeštaj u Srbiji. Planine, jezera, banje i etno sela na jednom mestu.",
    "en": "A guide to Serbia's finest destinations and accommodation. Mountains, lakes, spas and ethno villages in one place."
  },
  "foot_explore": {
    "sr": "Istraži",
    "en": "Explore"
  },
  "foot_company": {
    "sr": "Portal",
    "en": "Portal"
  },
  "foot_about_link": {
    "sr": "O nama",
    "en": "About us"
  },
  "foot_contact": {
    "sr": "Kontakt",
    "en": "Contact"
  },
  "foot_terms": {
    "sr": "Uslovi korišćenja",
    "en": "Terms of use"
  },
  "foot_privacy": {
    "sr": "Privatnost",
    "en": "Privacy"
  },
  "foot_follow": {
    "sr": "Pratite nas",
    "en": "Follow us"
  },
  "foot_rights": {
    "sr": "Sva prava zadržana.",
    "en": "All rights reserved."
  }
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangCtx = createContext<Ctx>({ lang: "sr", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sr");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ts_lang") as Lang | null;
      if (saved) setLangState(saved);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("ts_lang", l); } catch {}
    if (typeof document !== "undefined") document.documentElement.lang = l;
  };
  const t = (k: string) => (I18N[k] ? I18N[k][lang] : k);
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const L = (obj: Bi | undefined, lang: Lang) =>
  obj ? obj[lang] || obj.sr || "" : "";
