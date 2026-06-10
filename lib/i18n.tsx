"use client";
import { createContext, useContext, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { Lang, Bi } from "./types";

export const I18N: Record<string,{sr:string;en:string;de?:string}> = {
  detail_rules_h: { sr: "Pravila rezervacije", en: "Booking rules" },
  detail_min_nights: { sr: "Minimum noćenja (radni dani)", en: "Minimum nights (weekday)" },
  detail_min_nights_wknd: { sr: "Minimum noćenja (vikend)", en: "Minimum nights (weekend)" },
  detail_deposit: { sr: "Depozit", en: "Deposit" },
  detail_disc_weekly: { sr: "Popust za 7+ noćenja", en: "Discount for 7+ nights" },
  detail_disc_monthly: { sr: "Popust za 28+ noćenja", en: "Discount for 28+ nights" },
  sort_popular: { sr: "Najpopularnije", en: "Most popular", de: "Beliebteste" },
  detail_views: { sr: "pregleda", en: "views" },

  price_from: { sr: "Cena od €", en: "Price from €", de: "Preis ab" },
  price_to: { sr: "do €", en: "to €", de: "Preis bis" },

  newest_eyebrow: { sr: "Sveže", en: "Fresh" },
  newest_title: { sr: "Najnoviji oglasi", en: "Newest listings" },

  nav_map: { sr: "Mapa", en: "Map", de: "Karte" },

  news_title: { sr: "Najbolje ponude u vašem inboxu", en: "The best offers in your inbox" },
  news_sub: { sr: "Prijavite se na newsletter — saveti, destinacije i akcije.", en: "Subscribe to our newsletter — tips, destinations and deals." },
  news_btn: { sr: "Prijavi se", en: "Subscribe" },
  news_thanks: { sr: "Hvala na prijavi!", en: "Thanks for subscribing!" },

  detail_related: { sr: "Povezane destinacije", en: "Related destinations" },
  detail_similar: { sr: "Sličan smeštaj", en: "Similar stays" },

  nav_blog: { sr: "Blog", en: "Blog", de: "Blog" },
  blog_h: { sr: "Blog — vodič kroz Srbiju", en: "Blog — guide to Serbia" },
  blog_lead: { sr: "Tekstovi o destinacijama, gradovima i mestima Srbije.", en: "Articles about Serbia's destinations, cities and places." },
  blog_none: { sr: "Još nema objava.", en: "No posts yet." },

  promo_featured: { sr: "Izdvojeno", en: "Featured" },
  promo_home_title: { sr: "Izdvojeni smeštaji", en: "Featured listings" },

  nav_destinations: { sr: "Destinacije", en: "Destinations", de: "Reiseziele" },

  nav_belgrade: { sr: "Apartmani Beograd", en: "Belgrade apartments", de: "Belgrad Apartments" },
  nav_list: { sr: "Oglasi smeštaj", en: "List your space", de: "Unterkunft inserieren" },

  cal_avail: { sr: "Dostupnost", en: "Availability" },

  rev_heading: { sr: "Ocene i recenzije", en: "Ratings & reviews" },
  rev_write: { sr: "Napišite recenziju", en: "Write a review" },
  rev_name: { sr: "Vaše ime", en: "Your name" },
  rev_rating: { sr: "Vaša ocena", en: "Your rating" },
  rev_comment: { sr: "Komentar", en: "Comment" },
  rev_submit: { sr: "Pošalji recenziju", en: "Submit review" },
  rev_thanks: { sr: "Hvala! Recenzija čeka odobrenje.", en: "Thank you! Your review awaits approval." },
  rev_none: { sr: "Još nema recenzija. Budite prvi!", en: "No reviews yet. Be the first!" },
  rev_google: { sr: "Google recenzije", en: "Google reviews" },
  rev_google_view: { sr: "Pogledaj na Google-u", en: "View on Google" },

  detail_video: { sr: "Video", en: "Video" },
  detail_location: { sr: "Lokacija", en: "Location" },
  detail_municipality: { sr: "Opština", en: "Municipality" },

  nav_account: { sr: "Moj nalog", en: "My account", de: "Mein Konto" },
  acc_title: { sr: "Vlasnički nalog", en: "Owner account" },
  acc_intro: { sr: "Prijavite se ili registrujte da biste dodali svoj smeštaj na portal.", en: "Log in or sign up to add your accommodation to the portal." },
  acc_login: { sr: "Prijava", en: "Log in" },
  acc_signup: { sr: "Registracija", en: "Sign up" },
  acc_email: { sr: "Email", en: "Email" },
  acc_password: { sr: "Lozinka", en: "Password" },
  acc_login_btn: { sr: "Prijavi se", en: "Log in" },
  acc_signup_btn: { sr: "Registruj se", en: "Sign up" },
  acc_logout: { sr: "Odjava", en: "Log out" },
  acc_have_account: { sr: "Već imate nalog? Prijava", en: "Already have an account? Log in" },
  acc_no_account: { sr: "Nemate nalog? Registrujte se", en: "No account? Sign up" },
  acc_check_email: { sr: "Proverite email da biste potvrdili nalog, zatim se prijavite.", en: "Check your email to confirm your account, then log in." },
  acc_my_listings: { sr: "Moji oglasi", en: "My listings" },
  acc_add_listing: { sr: "Dodaj novi oglas", en: "Add new listing" },
  acc_no_listings: { sr: "Još nemate oglasa. Dodajte prvi!", en: "No listings yet. Add your first!" },
  acc_edit: { sr: "Izmeni", en: "Edit" },
  acc_delete: { sr: "Obriši", en: "Delete" },
  acc_confirm_delete: { sr: "Obrisati ovaj oglas?", en: "Delete this listing?" },
  acc_pending: { sr: "Na čekanju", en: "Pending" },
  acc_approved: { sr: "Odobreno", en: "Approved" },
  acc_rejected: { sr: "Odbijeno", en: "Rejected" },
  acc_pending_note: { sr: "Vaš oglas čeka odobrenje administratora pre objave.", en: "Your listing awaits admin approval before going live." },
  fo_kind: { sr: "Kategorija", en: "Category" },
  fo_subcat: { sr: "Tip smeštaja", en: "Accommodation type" },
  fo_name: { sr: "Naziv (srpski)", en: "Name (Serbian)" },
  fo_name_en: { sr: "Naziv (engleski)", en: "Name (English)" },
  fo_region: { sr: "Region/mesto (srpski)", en: "Region/place (Serbian)" },
  fo_region_en: { sr: "Region/mesto (engleski)", en: "Region/place (English)" },
  fo_short: { sr: "Kratak opis (srpski)", en: "Short description (Serbian)" },
  fo_short_en: { sr: "Kratak opis (engleski)", en: "Short description (English)" },
  fo_desc: { sr: "Detaljan opis (srpski)", en: "Full description (Serbian)" },
  fo_desc_en: { sr: "Detaljan opis (engleski)", en: "Full description (English)" },
  fo_features: { sr: "Pogodnosti SR (zarezom odvojeno)", en: "Features SR (comma separated)" },
  fo_features_en: { sr: "Pogodnosti EN (zarezom odvojeno)", en: "Features EN (comma separated)" },
  fo_price: { sr: "Cena po noći (EUR)", en: "Price per night (EUR)" },
  fo_capacity: { sr: "Kapacitet (osoba)", en: "Capacity (guests)" },
  fo_hero: { sr: "Glavna slika (URL)", en: "Main image (URL)" },
  fo_gallery: { sr: "Galerija (URL-ovi, jedan po redu)", en: "Gallery (URLs, one per line)" },
  fo_save: { sr: "Sačuvaj oglas", en: "Save listing" },
  fo_cancel: { sr: "Otkaži", en: "Cancel" },
  fo_saved: { sr: "Sačuvano! Oglas čeka odobrenje.", en: "Saved! Listing is awaiting approval." },
  fo_required: { sr: "Naziv (SR i EN) je obavezan.", en: "Name (SR and EN) is required." },

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

export const DE: Record<string, string> = {
  detail_rules_h: "Buchungsregeln",
  detail_min_nights: "Mindestnächte (Wochentag)",
  detail_min_nights_wknd: "Mindestnächte (Wochenende)",
  detail_deposit: "Kaution",
  detail_disc_weekly: "Rabatt ab 7 Nächten",
  detail_disc_monthly: "Rabatt ab 28 Nächten",
  sort_popular: "Beliebteste",
  detail_views: "Aufrufe",
  price_from: "Preis ab €",
  price_to: "bis €",
  newest_eyebrow: "Neu",
  newest_title: "Neueste Angebote",
  nav_map: "Karte",
  news_title: "Die besten Angebote in Ihrem Postfach",
  news_sub: "Abonnieren Sie unseren Newsletter — Tipps, Reiseziele und Angebote.",
  news_btn: "Abonnieren",
  news_thanks: "Danke für Ihr Abonnement!",
  detail_related: "Ähnliche Reiseziele",
  detail_similar: "Ähnliche Unterkünfte",
  nav_blog: "Blog",
  blog_h: "Blog — Reiseführer durch Serbien",
  blog_lead: "Artikel über Serbiens Reiseziele, Städte und Orte.",
  blog_none: "Noch keine Beiträge.",
  promo_featured: "Empfohlen",
  promo_home_title: "Empfohlene Angebote",
  nav_destinations: "Reiseziele",
  nav_belgrade: "Belgrad Apartments",
  nav_list: "Unterkunft inserieren",
  cal_avail: "Verfügbarkeit",
  rev_heading: "Bewertungen & Rezensionen",
  rev_write: "Bewertung schreiben",
  rev_name: "Ihr Name",
  rev_rating: "Ihre Bewertung",
  rev_comment: "Kommentar",
  rev_submit: "Bewertung absenden",
  rev_thanks: "Danke! Ihre Bewertung wartet auf Freigabe.",
  rev_none: "Noch keine Bewertungen. Seien Sie der Erste!",
  rev_google: "Google-Bewertungen",
  rev_google_view: "Auf Google ansehen",
  detail_video: "Video",
  detail_location: "Lage",
  detail_municipality: "Gemeinde",
  nav_account: "Mein Konto",
  acc_title: "Vermieterkonto",
  acc_intro: "Melden Sie sich an oder registrieren Sie sich, um Ihre Unterkunft hinzuzufügen.",
  acc_login: "Anmelden",
  acc_signup: "Registrieren",
  acc_email: "E-Mail",
  acc_password: "Passwort",
  acc_login_btn: "Anmelden",
  acc_signup_btn: "Registrieren",
  acc_logout: "Abmelden",
  acc_have_account: "Bereits ein Konto? Anmelden",
  acc_no_account: "Kein Konto? Registrieren",
  acc_check_email: "Bitte bestätigen Sie Ihr Konto per E-Mail und melden Sie sich dann an.",
  acc_my_listings: "Meine Angebote",
  acc_add_listing: "Neues Angebot hinzufügen",
  acc_no_listings: "Noch keine Angebote. Fügen Sie Ihr erstes hinzu!",
  acc_edit: "Bearbeiten",
  acc_delete: "Löschen",
  acc_confirm_delete: "Dieses Angebot löschen?",
  acc_pending: "Ausstehend",
  acc_approved: "Genehmigt",
  acc_rejected: "Abgelehnt",
  acc_pending_note: "Ihr Angebot wartet auf die Freigabe durch den Administrator.",
  fo_kind: "Kategorie",
  fo_subcat: "Unterkunftsart",
  fo_name: "Name (Serbisch)",
  fo_name_en: "Name (Englisch)",
  fo_region: "Region/Ort (Serbisch)",
  fo_region_en: "Region/Ort (Englisch)",
  fo_short: "Kurzbeschreibung (Serbisch)",
  fo_short_en: "Kurzbeschreibung (Englisch)",
  fo_desc: "Vollständige Beschreibung (Serbisch)",
  fo_desc_en: "Vollständige Beschreibung (Englisch)",
  fo_features: "Merkmale SR (durch Komma getrennt)",
  fo_features_en: "Merkmale EN (durch Komma getrennt)",
  fo_price: "Preis pro Nacht (EUR)",
  fo_capacity: "Kapazität (Gäste)",
  fo_hero: "Hauptbild (URL)",
  fo_gallery: "Galerie (URLs, eine pro Zeile)",
  fo_save: "Angebot speichern",
  fo_cancel: "Abbrechen",
  fo_saved: "Gespeichert! Das Angebot wartet auf Freigabe.",
  fo_required: "Name (SR und EN) ist erforderlich.",
  brand_sub: "Tourismus Serbien",
  nav_home: "Startseite",
  nav_mountains: "Berge",
  nav_lakes: "Seen",
  nav_spas: "Kurorte",
  nav_ethno: "Ethno-Dörfer",
  nav_stays: "Unterkünfte",
  hero_title: "Entdecken Sie die Schönheit Serbiens",
  hero_sub: "Berge, Seen, Kurorte und Ethno-Dörfer — sowie Unterkünfte aus ganz Serbien an einem Ort.",
  hero_cta1: "Reiseziele entdecken",
  hero_cta2: "Unterkunft finden",
  search_ph: "Reiseziele und Unterkünfte suchen…",
  search_all: "Alle",
  search_btn: "Suchen",
  explore_eyebrow: "Kategorien",
  explore_title: "Was möchten Sie besuchen?",
  explore_lead: "Entdecken Sie Serbiens schönste Reiseziele.",
  featured_eyebrow: "Empfohlen",
  featured_title: "Empfohlene Reiseziele",
  featured_lead: "Ausgewählte Reiseziele für Ihren nächsten Urlaub.",
  stays_eyebrow: "Unterkünfte",
  stays_title: "Beliebte Unterkünfte",
  stays_lead: "Hotels, Villen und Privatunterkünfte in ganz Serbien.",
  stat_dest: "Reiseziele",
  stat_stays: "Unterkünfte",
  stat_regions: "Regionen",
  stat_support: "Unterstützung",
  cta_title: "Vermieten Sie Ihre Unterkunft",
  cta_lead: "Erreichen Sie Gäste aus Serbien und der ganzen Welt — kostenlos inserieren.",
  cta_btn: "Unterkunft inserieren",
  view_all: "Alle ansehen",
  view_details: "Details ansehen",
  book_now: "Jetzt anfragen",
  per_night: "pro Nacht",
  from: "ab",
  free_entry: "Freier Eintritt",
  filter_search: "Suchen…",
  filter_region: "Region",
  filter_sort: "Sortieren",
  sort_featured: "Empfohlen",
  sort_rating: "Beste Bewertung",
  sort_price_low: "Niedrigster Preis",
  sort_price_high: "Höchster Preis",
  cat_all: "Alle",
  cat_hotel: "Hotel",
  cat_private: "Privatunterkunft",
  results: "Ergebnisse",
  no_results: "Keine Ergebnisse",
  detail_about: "Über die Unterkunft",
  detail_highlights: "Highlights",
  detail_gallery: "Galerie",
  detail_elevation: "Höhe",
  detail_rating: "Bewertung",
  detail_capacity: "Kapazität",
  detail_persons: "Personen",
  detail_nearby: "In der Nähe",
  book_title: "Verfügbarkeit & Buchung",
  inquire_title: "Unterkunft anfragen",
  f_name: "Name",
  f_email: "E-Mail",
  f_phone: "Telefon",
  f_checkin: "Anreise",
  f_checkout: "Abreise",
  f_guests: "Gäste",
  f_message: "Nachricht",
  f_submit: "Anfrage senden",
  f_note: "Keine Zahlung erforderlich. Der Gastgeber antwortet innerhalb von 24 Std.",
  f_success: "Anfrage gesendet! Der Gastgeber meldet sich in Kürze.",
  lead_mountain: "Skifahren, Wandern und frische Bergluft in ganz Serbien.",
  lead_lake: "Strände, Angeln und erholsame Tage am Wasser.",
  lead_spa: "Heilquellen, Wellness und Erholung in Serbiens Kurorten.",
  lead_ethno: "Tradition, Hausmannskost und die Ruhe des Dorflebens.",
  lead_stay: "Hotels und Privatunterkünfte in ganz Serbien.",
  type_mountain: "Berg",
  type_lake: "See",
  type_spa: "Kurort",
  type_ethno: "Ethno-Dorf",
  type_stay: "Unterkunft",
  foot_about: "Ihr Reiseführer durch die schönsten Reiseziele und Unterkünfte Serbiens.",
  foot_explore: "Entdecken",
  foot_company: "Portal",
  foot_about_link: "Über uns",
  foot_contact: "Kontakt",
  foot_terms: "Nutzungsbedingungen",
  foot_privacy: "Datenschutz",
  foot_follow: "Folgen Sie uns",
  foot_rights: "Alle Rechte vorbehalten.",
};

type Ctx = { lang: Lang; t: (k: string) => string };
const LangCtx = createContext<Ctx>({ lang: "sr", t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lang: Lang = pathname && pathname.startsWith("/de") ? "de" : pathname && pathname.startsWith("/en") ? "en" : "sr";
  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);
  const t = (k: string) => { const e = I18N[k]; if (!e) return DE[k] || k; if (lang === "de") return DE[k] || e.en || e.sr; return e[lang] || e.en || e.sr; };
  return <LangCtx.Provider value={{ lang, t }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const L = (obj: Bi | undefined, lang: Lang) =>
  obj ? ((obj as any)[lang] || obj.en || obj.sr || "") : "";
