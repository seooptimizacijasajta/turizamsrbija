"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import type { Business } from "@/lib/businesses";
import { BIZ_CATS, BizCat, bizCatByKey, bizCatLabel, firmeIndexPath, firmeCatPath, BIZ_CITIES, firmeCatCityPath, businessPath } from "@/lib/firme";

export default function FirmePage({ businesses, cat, cityName }: { businesses: Business[]; cat?: BizCat | null; cityName?: string }) {
  const { lang, t } = useLang();
  const [city, setCity] = useState("");
  const [q, setQ] = useState("");

  const cities = useMemo(() => {
    const s: string[] = [];
    businesses.forEach((b) => { if (b.city && !s.includes(b.city)) s.push(b.city); });
    return s.sort();
  }, [businesses]);

  const list = useMemo(() => businesses.filter((b) => {
    if (city && b.city !== city) return false;
    if (q) { const h = (b.name + " " + (b.city || "") + " " + (b.address || "") + " " + b.desc[lang === "de" ? "de" : lang === "en" ? "en" : "sr"]).toLowerCase(); if (!h.includes(q.toLowerCase())) return false; }
    return true;
  }), [businesses, city, q, lang]);

  const heading = cat ? (cityName ? `${bizCatLabel(cat, lang)} ${cityName}` : bizCatLabel(cat, lang)) : (lang === "sr" ? "Baza firmi — turizam" : lang === "de" ? "Firmenverzeichnis — Tourismus" : "Business directory — tourism");
  const lead = lang === "sr" ? "Turističke agencije, rent-a-car, vodiči, transferi, restorani i druge usluge u Srbiji." : lang === "de" ? "Reisebüros, Autovermietung, Reiseführer, Transfers, Restaurants und weitere Dienste in Serbien." : "Travel agencies, car rental, guides, transfers, restaurants and other services in Serbia.";

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{cat ? `${cat.icon} ${heading}` : heading}</h1><p>{cat ? (lang === "sr" ? `${heading} u Srbiji — proverene firme i kontakti.` : `${heading} in Serbia.`) : lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={cat ? [{ name: t("nav_home"), href: homePath(lang) }, { name: lang === "sr" ? "Firme" : lang === "de" ? "Firmen" : "Businesses", href: firmeIndexPath(lang) }, { name: heading }] : [{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} />
      </div>

      <div className="container">
        <div className="amen-filter">
          {BIZ_CATS.map((c) => (
            <Link key={c.key} href={firmeCatPath(c, lang)} className={"amen-chip" + (cat?.key === c.key ? " on" : "")}>{c.icon} {bizCatLabel(c, lang)}</Link>
          ))}
        </div>
        {cat && !cityName && (
          <div className="amen-filter" style={{ marginTop: 0, marginBottom: 6 }}>
            {BIZ_CITIES.map((ci) => (
              <Link key={ci.slug} href={firmeCatCityPath(cat, ci.slug, lang)} className="amen-chip">{ci.name}</Link>
            ))}
          </div>
        )}
        <div className="toolbar">
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "sr" ? "Pretraga firmi…" : lang === "de" ? "Firmen suchen…" : "Search businesses…"} />
          {cities.length > 1 && (
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">{lang === "sr" ? "Svi gradovi" : lang === "de" ? "Alle Städte" : "All cities"}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        {list.length ? (
          <div className="card-grid" style={{ marginBottom: 40 }}>
            {list.map((b) => {
              const c = bizCatByKey(b.category);
              const d = b.desc[lang === "de" ? "de" : lang === "en" ? "en" : "sr"];
              return (
                <div className="card" key={b.id}>
                  {b.image && <div className="card-media">{/* eslint-disable-next-line @next/next/no-img-element */}<img loading="lazy" src={b.image} alt={b.name} /><span className="card-badge">{c?.icon} {c ? bizCatLabel(c, lang) : b.category}</span>{b.featured && <span className="card-promo">★</span>}</div>}
                  <div className="card-body">
                    <span className="card-region">{[b.city, b.address].filter(Boolean).join(" · ")}</span>
                    <h3 className="card-title"><Link href={businessPath(b.name, lang)} style={{ color: "inherit" }}>{b.name}</Link></h3>
                    <p className="card-desc">{d}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
                      {b.phone && <a className="btn btn--primary" style={{ fontSize: ".8rem", padding: "7px 11px" }} href={`tel:${b.phone}`}>{lang === "sr" ? "Pozovi" : lang === "de" ? "Anrufen" : "Call"}</a>}
                      {b.email && <a className="btn btn--outline" style={{ fontSize: ".8rem", padding: "7px 11px" }} href={`mailto:${b.email}`}>Email</a>}
                      {b.website && <a className="btn btn--outline" style={{ fontSize: ".8rem", padding: "7px 11px" }} href={b.website} target="_blank" rel="noopener noreferrer nofollow">{lang === "sr" ? "Sajt" : "Web"}</a>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : <div className="empty">{t("no_results")}</div>}
      </div>
    </>
  );
}
