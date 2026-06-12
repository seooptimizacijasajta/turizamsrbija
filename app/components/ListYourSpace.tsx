"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import FaqAccordion from "./FaqAccordion";
import { homePath, accountPath, hostGuidePath } from "@/lib/slug";

const C: Record<"sr" | "en" | "de", any> = {
  sr: {
    title: "Oglasite svoj smeštaj", sub: "Planine, jezera, banje, etno sela, apartmani — dovedite goste iz cele Srbije i sveta.",
    model: "Plaćate tek kada vam dovedemo prve goste.",
    steps: [["1. Upišite smeštaj", "Naslov, opis, fotografije, video i lokacija na mapi."], ["2. Gosti rezervišu", "Oglas je vidljiv na srpskom, engleskom i nemačkom, sa recenzijama."], ["3. Plaćate po rezultatu", "Bez mesečnih troškova — provizija tek kad ostvarite gosta."]],
    why: "Zašto baš kod nas", benefits: ["Besplatno oglašavanje", "Trojezični portal (SR/EN/DE) za goste iz inostranstva", "Kalendar dostupnosti + sinhronizacija sa Booking/Airbnb", "Recenzije i ocene", "Neograničen broj oglasa", "Podrška"],
    safeTitle: "Sigurne rezervacije", safe: [["Vi postavljate pravila", "Sami određujete cenu, popuste za duži boravak i minimalan broj noćenja."], ["Provera gostiju", "Gost ostavlja ime, email i telefon i prihvata pravila pre rezervacije."], ["Vi odlučujete", "Sumnjivu rezervaciju možete otkazati — za nju ne plaćate proviziju."], ["Bez rizika", "Nema mesečnih troškova; plaćate tek kada ostvarite gosta."]],
    faqTitle: "Česta pitanja domaćina",
    faqs: [
      { q: "Ko može da oglasi smeštaj?", a: "Svako ko poseduje smeštajnu jedinicu — apartman, kuću, vilu, sobu, brvnaru — koja ispunjava osnovne uslove za izdavanje. Registracija je besplatna." },
      { q: "Koliko košta oglašavanje?", a: "Registracija i oglašavanje su potpuno besplatni. Plaćate tek kada vam dovedemo prve goste — proviziju po ostvarenoj rezervaciji, bez mesečnih troškova." },
      { q: "Mogu li da oglasim više smeštaja?", a: "Da, neograničeno. Svaki smeštaj se dodaje zasebno, sa svojim naslovom, opisom, fotografijama, videom i lokacijom na mapi." },
      { q: "Kako određujem cenu?", a: "Cenu i pravila izdavanja postavljate vi. Preporučujemo da pogledate slične oglase u svom kraju i date popust za duži boravak da povećate broj rezervacija." },
      { q: "Šta ako gost otkaže?", a: "Pravila otkazivanja postavljate sami. Sumnjivu rezervaciju možete odbiti, a u tom slučaju ne naplaćujemo proviziju i oslobađamo termin u kalendaru." },
      { q: "Koje podatke ostavlja gost?", a: "Pri rezervaciji gost ostavlja ime i prezime, email, telefon i prihvata pravila smeštaja, tako da uvek znate ko dolazi." },
    ],
    cta: "Oglasi smeštaj besplatno",
  },
  de: {
    title: "Inserieren Sie Ihre Unterkunft", sub: "Berge, Seen, Kurorte, Ethno-Dörfer, Apartments — gewinnen Sie Gäste aus ganz Serbien und der Welt.",
    model: "Sie zahlen erst, wenn wir Ihnen die ersten Gäste bringen.",
    steps: [["1. Unterkunft eintragen", "Titel, Beschreibung, Fotos, Video und Kartenstandort."], ["2. Gäste buchen", "Ihr Inserat erscheint auf Serbisch, Englisch und Deutsch, mit Bewertungen."], ["3. Bezahlung nach Ergebnis", "Keine monatlichen Kosten — Provision erst, wenn Sie einen Gast gewinnen."]],
    why: "Warum bei uns", benefits: ["Kostenloses Inserieren", "Dreisprachiges Portal (SR/EN/DE) für internationale Gäste", "Verfügbarkeitskalender + Synchronisation mit Booking/Airbnb", "Bewertungen und Noten", "Unbegrenzte Anzahl an Inseraten", "Unterstützung"],
    safeTitle: "Sichere Buchungen", safe: [["Sie bestimmen die Regeln", "Sie legen Preis, Rabatte für längere Aufenthalte und Mindestnächte selbst fest."], ["Gästeprüfung", "Der Gast hinterlässt Name, E-Mail und Telefon und akzeptiert die Regeln vor der Buchung."], ["Sie entscheiden", "Eine verdächtige Buchung können Sie stornieren — dafür zahlen Sie keine Provision."], ["Ohne Risiko", "Keine monatlichen Kosten; Sie zahlen erst, wenn Sie einen Gast gewinnen."]],
    faqTitle: "Häufige Fragen der Gastgeber",
    faqs: [
      { q: "Wer kann eine Unterkunft inserieren?", a: "Jeder, der eine Unterkunft besitzt — Apartment, Haus, Villa, Zimmer, Blockhütte — die die Grundvoraussetzungen für die Vermietung erfüllt. Die Registrierung ist kostenlos." },
      { q: "Was kostet das Inserieren?", a: "Registrierung und Inserieren sind völlig kostenlos. Sie zahlen erst, wenn wir Ihnen die ersten Gäste bringen — eine Provision pro Buchung, ohne monatliche Kosten." },
      { q: "Kann ich mehrere Unterkünfte inserieren?", a: "Ja, unbegrenzt. Jede Unterkunft wird separat hinzugefügt, mit eigenem Titel, Beschreibung, Fotos, Video und Kartenstandort." },
      { q: "Wie lege ich den Preis fest?", a: "Preis und Vermietungsregeln legen Sie fest. Wir empfehlen, ähnliche Inserate in Ihrer Gegend anzusehen und Rabatte für längere Aufenthalte anzubieten, um mehr Buchungen zu erzielen." },
      { q: "Was, wenn ein Gast storniert?", a: "Die Stornoregeln legen Sie selbst fest. Eine verdächtige Buchung können Sie ablehnen; in diesem Fall berechnen wir keine Provision und geben den Termin im Kalender frei." },
      { q: "Welche Daten hinterlässt der Gast?", a: "Bei der Buchung hinterlässt der Gast Vor- und Nachnamen, E-Mail, Telefon und akzeptiert die Hausregeln, sodass Sie immer wissen, wer kommt." },
    ],
    cta: "Unterkunft kostenlos inserieren",
  },
  en: {
    title: "List your space", sub: "Mountains, lakes, spas, ethno villages, apartments — reach guests from Serbia and worldwide.",
    model: "You pay only when we bring you your first guests.",
    steps: [["1. Add your place", "Title, description, photos, video and a map location."], ["2. Guests book", "Your listing shows in Serbian, English and German, with reviews."], ["3. Pay on results", "No monthly fees — commission only when you get a guest."]],
    why: "Why list with us", benefits: ["Free listing", "Trilingual portal (SR/EN/DE) for international guests", "Availability calendar + Booking/Airbnb sync", "Reviews & ratings", "Unlimited listings", "Support"],
    safeTitle: "Safe reservations", safe: [["You set the rules", "Decide your price, longer-stay discounts and minimum nights."], ["Guest verification", "Guests leave name, email and phone and accept your rules before booking."], ["You decide", "Cancel any suspicious booking — you pay no commission on it."], ["No risk", "No monthly fees; you pay only when you get a guest."]],
    faqTitle: "Frequently asked questions by hosts",
    faqs: [
      { q: "Who can list a property?", a: "Anyone who owns an accommodation unit — apartment, house, villa, room, cabin — meeting basic rental standards. Registration is free." },
      { q: "How much does listing cost?", a: "Registration and listing are completely free. You pay only when we bring your first guests — a commission per completed booking, with no monthly fees." },
      { q: "Can I list more than one property?", a: "Yes, unlimited. Each property is added separately, with its own title, description, photos, video and map location." },
      { q: "How do I set the price?", a: "You set the price and rental rules. We recommend checking similar listings in your area and offering longer-stay discounts to boost bookings." },
      { q: "What if a guest cancels?", a: "You set the cancellation rules. You can decline a suspicious booking, in which case we charge no commission and free up the dates in your calendar." },
      { q: "What details does a guest leave?", a: "When booking, the guest leaves full name, email, phone and accepts the property rules, so you always know who is coming." },
    ],
    cta: "List your space free",
  },
};

export default function ListYourSpace() {
  const { lang, t } = useLang();
  const c = C[lang === "sr" ? "sr" : lang === "de" ? "de" : "en"];
  const acct = accountPath(lang);
  return (
    <>
      <section className="hero" style={{ minHeight: "56vh" }}>
        <div className="container hero-inner">
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
          <p style={{ fontWeight: 700, fontSize: "1.12rem" }}>★ {c.model}</p>
          <div className="hero-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}><Link className="btn btn--primary btn--lg" href={acct}>{c.cta}</Link><Link className="btn btn--outline btn--lg" href={hostGuidePath(lang)}>{t("nav_hostguide")}</Link></div>
        </div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_list") }]} /></div>
      <section className="section"><div className="container">
        <div className="card-grid">
          {c.steps.map((s: string[], i: number) => (
            <div key={i} className="card" style={{ padding: 24 }}><h3 style={{ marginBottom: 8 }}>{s[0]}</h3><p style={{ color: "var(--slate)" }}>{s[1]}</p></div>
          ))}
        </div>
      </div></section>
      <section className="section section--soft"><div className="container">
        <h2 className="section-title" style={{ marginBottom: 20 }}>{c.why}</h2>
        <ul className="feature-list" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))" }}>{c.benefits.map((b: string, i: number) => <li key={i}>{b}</li>)}</ul>
        <div style={{ marginTop: 28 }}><Link className="btn btn--primary btn--lg" href={acct}>{c.cta}</Link></div>
      </div></section>
      <section className="section"><div className="container">
        <h2 className="section-title" style={{ marginBottom: 20 }}>{c.safeTitle}</h2>
        <div className="card-grid">
          {c.safe.map((s2: string[], i: number) => (
            <div key={i} className="card" style={{ padding: 24 }}><h3 style={{ marginBottom: 8 }}>{s2[0]}</h3><p style={{ color: "var(--slate)" }}>{s2[1]}</p></div>
          ))}
        </div>
      </div></section>
      <FaqAccordion items={c.faqs} heading={c.faqTitle} />
    </>
  );
}
