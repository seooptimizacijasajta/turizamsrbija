"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { homePath, accountPath, listPath } from "@/lib/slug";

type L3 = { sr: string; en: string; de: string };
const tt = (o: L3, l: string) => l === "sr" ? o.sr : l === "de" ? o.de : o.en;

const STEPS: { n: string; t: L3; d: L3 }[] = [
  { n: "1", t: { sr: "Napravite nalog", en: "Create an account", de: "Konto erstellen" },
    d: { sr: "Registrujte se besplatno — emailom ili putem Google/Facebook naloga. Lozinka mora biti jaka (mala i velika slova, broj i znak).", en: "Register for free — by email or with Google/Facebook. Your password must be strong (upper/lower case, a number and a symbol).", de: "Registrieren Sie sich kostenlos — per E-Mail oder mit Google/Facebook. Das Passwort muss stark sein (Groß-/Kleinbuchstaben, Zahl und Zeichen)." } },
  { n: "2", t: { sr: "Dodajte smeštaj", en: "Add your listing", de: "Unterkunft hinzufügen" },
    d: { sr: "Unesite naslov, opis (najmanje 500 reči), do 20 fotografija, do 3 YouTube videa, lokaciju na mapi, opštinu, pogodnosti, cenu i strukturu. Možete dodati neograničeno smeštaja — svaki zasebno.", en: "Enter a title, description (at least 500 words), up to 20 photos, up to 3 YouTube videos, a map location, municipality, amenities, price and structure. You can add unlimited listings — each separately.", de: "Geben Sie Titel, Beschreibung (mind. 500 Wörter), bis zu 20 Fotos, bis zu 3 YouTube-Videos, Kartenstandort, Gemeinde, Ausstattung, Preis und Struktur ein. Beliebig viele Unterkünfte möglich — jede separat." } },
  { n: "3", t: { sr: "Popunite kalendar dostupnosti", en: "Fill in your availability", de: "Verfügbarkeit eintragen" },
    d: { sr: "Označite slobodne i zauzete termine. Možete sinhronizovati kalendar sa Booking.com i Airbnb (iCal) da izbegnete duple rezervacije.", en: "Mark free and booked dates. You can sync your calendar with Booking.com and Airbnb (iCal) to avoid double bookings.", de: "Markieren Sie freie und belegte Termine. Sie können den Kalender mit Booking.com und Airbnb (iCal) synchronisieren, um Doppelbuchungen zu vermeiden." } },
  { n: "4", t: { sr: "Primajte upite i goste", en: "Receive enquiries and guests", de: "Anfragen und Gäste erhalten" },
    d: { sr: "Gosti vam šalju upit direktno. Odgovarajte brzo — to najviše utiče na broj rezervacija. Plaćate proviziju tek kada vam dovedemo goste.", en: "Guests send enquiries directly. Reply quickly — it has the biggest impact on bookings. You pay a commission only when we bring you guests.", de: "Gäste senden Anfragen direkt. Antworten Sie schnell — das beeinflusst die Buchungen am meisten. Provision zahlen Sie erst, wenn wir Ihnen Gäste bringen." } },
];

const TIPS: L3[] = [
  { sr: "Postavite svetle, oštre fotografije — prva slika je najvažnija.", en: "Use bright, sharp photos — the first photo matters most.", de: "Helle, scharfe Fotos verwenden — das erste Foto ist am wichtigsten." },
  { sr: "Napišite iskren, detaljan opis (lokacija, sadržaji, okolina).", en: "Write an honest, detailed description (location, amenities, surroundings).", de: "Ehrliche, detaillierte Beschreibung (Lage, Ausstattung, Umgebung)." },
  { sr: "Označite sve pogodnosti (Wi-Fi, parking, klima, đakuzi, prima vaučere).", en: "Tick all amenities (Wi-Fi, parking, AC, jacuzzi, accepts vouchers).", de: "Alle Ausstattungen markieren (WLAN, Parkplatz, Klima, Whirlpool, Gutscheine)." },
  { sr: "Držite kalendar ažurnim i odgovarajte u roku od nekoliko sati.", en: "Keep your calendar up to date and reply within a few hours.", de: "Kalender aktuell halten und innerhalb weniger Stunden antworten." },
  { sr: "Zamolite zadovoljne goste da ostave recenziju — gradi poverenje.", en: "Ask happy guests to leave a review — it builds trust.", de: "Zufriedene Gäste um eine Bewertung bitten — das schafft Vertrauen." },
];

export default function HostGuidePage() {
  const { lang, t } = useLang();
  const l = lang;
  const heading = tt({ sr: "Vodič za vlasnike smeštaja", en: "Guide for property owners", de: "Leitfaden für Vermieter" }, l);
  const lead = tt({ sr: "Kako da oglasite smeštaj i dovedete goste — korak po korak.", en: "How to list your property and attract guests — step by step.", de: "So inserieren Sie Ihre Unterkunft und gewinnen Gäste — Schritt für Schritt." }, l);
  const howToLd = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: heading, description: lead,
    step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: tt(s.t, l), text: tt(s.d, l) })),
  };
  return (
    <>
      <JsonLd data={howToLd} />
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(l) }, { name: heading }]} /></div>

      <section className="section"><div className="container">
        <div className="card-grid">
          {STEPS.map((s) => (
            <div className="card" key={s.n} style={{ padding: 24 }}>
              <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--green-600)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 800, marginBottom: 10 }}>{s.n}</div>
              <h3 style={{ marginBottom: 8 }}>{tt(s.t, l)}</h3>
              <p style={{ color: "var(--slate)" }}>{tt(s.d, l)}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section section--soft"><div className="container" style={{ maxWidth: 820 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>{tt({ sr: "Saveti za bolji oglas", en: "Tips for a better listing", de: "Tipps für ein besseres Angebot" }, l)}</h2>
        <ul className="feature-list" style={{ gridTemplateColumns: "1fr" }}>
          {TIPS.map((t2, i) => <li key={i}>{tt(t2, l)}</li>)}
        </ul>
        <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link className="btn btn--primary btn--lg" href={accountPath(l)}>{tt({ sr: "Oglasi smeštaj besplatno", en: "List your space free", de: "Kostenlos inserieren" }, l)}</Link>
          <Link className="btn btn--outline btn--lg" href={listPath(l)}>{tt({ sr: "Više o uslovima", en: "More about terms", de: "Mehr zu den Bedingungen" }, l)}</Link>
        </div>
      </div></section>
    </>
  );
}
