"use client";
import { useMemo, useState, useEffect } from "react";
import { useLang, L } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import ListingCard from "./ListingCard";
import { homePath } from "@/lib/slug";
import type { Listing } from "@/lib/types";
import { DEAL_TYPES, dealTypeLabel } from "@/lib/deals";

export default function DealsPage({ items }: { items: Listing[] }) {
  const { lang, t } = useLang();
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [shown, setShown] = useState(24);
  useEffect(() => { setShown(24); }, [type, city]);

  const cities = useMemo(() => {
    const s: string[] = [];
    items.forEach((i) => { const r = L(i.region, lang); if (r && !s.includes(r)) s.push(r); });
    return s.sort();
  }, [items, lang]);

  const list = useMemo(() => items.filter((i) => {
    if (type && i.dealType !== type) return false;
    if (city && L(i.region, lang) !== city) return false;
    return true;
  }), [items, type, city, lang]);

  const heading = lang === "sr" ? "Akcije i popusti" : lang === "de" ? "Angebote & Rabatte" : "Deals & discounts";
  const lead = lang === "sr" ? "Aktuelni popusti, first minute i last minute ponude za smeštaj širom Srbije." : lang === "de" ? "Aktuelle Rabatte, Frühbucher- und Last-Minute-Angebote für Unterkünfte in ganz Serbien." : "Current discounts, first-minute and last-minute accommodation offers across Serbia.";

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>🔥 {heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} /></div>
      <div className="container">
        <div className="amen-filter">
          <button type="button" className={"amen-chip" + (type === "" ? " on" : "")} onClick={() => setType("")}>{lang === "sr" ? "Sve" : lang === "de" ? "Alle" : "All"}</button>
          {DEAL_TYPES.map((d) => (
            <button key={d.key} type="button" className={"amen-chip" + (type === d.key ? " on" : "")} onClick={() => setType(d.key)}>{d.icon} {dealTypeLabel(d.key, lang)}</button>
          ))}
        </div>
        {cities.length > 1 && (
          <div className="toolbar">
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">{lang === "sr" ? "Sva mesta" : lang === "de" ? "Alle Orte" : "All places"}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
        {list.length ? (<>
          <div className="card-grid" style={{ marginBottom: 40 }}>
            {list.slice(0, shown).map((d) => <ListingCard key={d.id} item={d} />)}
          </div>
          {list.length > shown && <div style={{ textAlign: "center", marginBottom: 40 }}><button className="btn btn--outline" onClick={() => setShown((x) => x + 24)}>{lang === "sr" ? "Prikaži još" : lang === "de" ? "Mehr anzeigen" : "Show more"}</button></div>}
        </>) : (
          <div className="empty" style={{ marginTop: 8 }}>{lang === "sr" ? "Trenutno nema aktivnih akcija. Proverite uskoro!" : lang === "de" ? "Derzeit keine aktiven Angebote. Schauen Sie bald wieder vorbei!" : "No active deals right now. Check back soon!"}</div>
        )}
      </div>
    </>
  );
}
