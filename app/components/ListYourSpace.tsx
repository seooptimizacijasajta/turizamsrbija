"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";

const C: Record<"sr" | "en", any> = {
  sr: {
    title: "Oglasite svoj smeštaj", sub: "Planine, jezera, banje, etno sela, apartmani — dovedite goste iz cele Srbije i sveta.",
    model: "Plaćate tek kada vam dovedemo prve goste.",
    steps: [["1. Upišite smeštaj", "Naslov, opis, fotografije, video i lokacija na mapi."], ["2. Gosti rezervišu", "Oglas je vidljiv na srpskom i engleskom, sa recenzijama."], ["3. Plaćate po rezultatu", "Bez mesečnih troškova — provizija tek kad ostvarite gosta."]],
    why: "Zašto baš kod nas", benefits: ["Besplatno oglašavanje", "Dvojezični portal (SR/EN) za goste iz inostranstva", "Kalendar dostupnosti + sinhronizacija sa Booking/Airbnb", "Recenzije i ocene", "Neograničen broj oglasa", "Podrška"],
    cta: "Oglasi smeštaj besplatno",
  },
  en: {
    title: "List your space", sub: "Mountains, lakes, spas, ethno villages, apartments — reach guests from Serbia and worldwide.",
    model: "You pay only when we bring you your first guests.",
    steps: [["1. Add your place", "Title, description, photos, video and a map location."], ["2. Guests book", "Your listing shows in Serbian and English, with reviews."], ["3. Pay on results", "No monthly fees — commission only when you get a guest."]],
    why: "Why list with us", benefits: ["Free listing", "Bilingual portal (SR/EN) for international guests", "Availability calendar + Booking/Airbnb sync", "Reviews & ratings", "Unlimited listings", "Support"],
    cta: "List your space free",
  },
};

export default function ListYourSpace() {
  const { lang, t } = useLang();
  const c = C[lang];
  const acct = lang === "en" ? "/en/nalog" : "/nalog";
  return (
    <>
      <section className="hero" style={{ minHeight: "56vh" }}>
        <div className="container hero-inner">
          <h1>{c.title}</h1>
          <p>{c.sub}</p>
          <p style={{ fontWeight: 700, fontSize: "1.12rem" }}>★ {c.model}</p>
          <div className="hero-actions"><Link className="btn btn--primary btn--lg" href={acct}>{c.cta}</Link></div>
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
    </>
  );
}
