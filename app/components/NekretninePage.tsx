"use client";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import type { Property } from "@/lib/properties";
import { PROP_TYPES, propTypeByKey, propTypeLabel, propertyPath, nekretnineIndexPath } from "@/lib/nekretnine";

const eur = (n: number) => "€" + Math.round(n).toLocaleString("de-DE");

export default function NekretninePage({ properties, type = "" }: { properties: Property[]; type?: string }) {
  const { lang, t } = useLang();
  const [ptype, setPtype] = useState(type);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(18);
  useEffect(() => { setShown(18); }, [ptype, q]);

  const list = useMemo(() => properties.filter((p) => {
    if (ptype && p.property_type !== ptype) return false;
    if (q) { const h = `${p.title} ${p.city || ""} ${p.municipality || ""}`.toLowerCase(); if (!h.includes(q.toLowerCase())) return false; }
    return true;
  }), [properties, ptype, q]);

  const cat = type ? propTypeByKey(type) : null;
  const heading = cat ? propTypeLabel(cat, lang) : (lang === "sr" ? "Nekretnine" : lang === "de" ? "Immobilien" : "Real estate");
  const lead = lang === "sr" ? "Prodaja nekretnina: stanovi, kuće, placevi, seoska domaćinstva i poslovni prostor širom Srbije."
    : lang === "de" ? "Immobilienverkauf: Wohnungen, Häuser, Grundstücke, Landgüter und Gewerbe in ganz Serbien."
    : "Property for sale: apartments, houses, land, village estates and commercial property across Serbia.";

  const ld = list.length ? {
    "@context": "https://schema.org", "@type": "ItemList",
    itemListElement: list.slice(0, 50).map((p, i) => ({ "@type": "ListItem", position: i + 1, url: "https://turizamsrbija.com" + propertyPath(p, lang), name: p.title })),
  } : null;

  return (
    <>
      {ld && <JsonLd data={ld} />}
      <section className="page-hero" style={{ background: "linear-gradient(180deg,rgba(15,61,46,.4),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={cat ? [{ name: t("nav_home"), href: homePath(lang) }, { name: lang === "sr" ? "Nekretnine" : lang === "de" ? "Immobilien" : "Real estate", href: nekretnineIndexPath(lang) }, { name: heading }] : [{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "sr" ? "Grad ili naziv…" : lang === "de" ? "Stadt oder Titel…" : "City or title…"} />
        </div>
        {!cat && (
          <div className="amen-filter">
            <button type="button" className={"amen-chip" + (ptype === "" ? " on" : "")} onClick={() => setPtype("")}>{lang === "sr" ? "Sve" : lang === "de" ? "Alle" : "All"}</button>
            {PROP_TYPES.map((c) => (
              <button key={c.key} type="button" className={"amen-chip" + (ptype === c.key ? " on" : "")} onClick={() => setPtype(c.key)}>{c.icon} {propTypeLabel(c, lang)}</button>
            ))}
          </div>
        )}
        {list.length ? (<>
          <div className="card-grid" style={{ marginTop: 18 }}>
            {list.slice(0, shown).map((p) => {
              const pc = propTypeByKey(p.property_type);
              const specs = [p.area ? `${p.area} m²` : "", p.land_area ? `${p.land_area} ari` : "", p.rooms ? `${p.rooms} ${lang === "sr" ? "soba" : lang === "de" ? "Zi." : "rooms"}` : ""].filter(Boolean).join(" · ");
              return (
                <Link href={propertyPath(p, lang)} className={"card" + (p.bold ? " card--bold" : "")} key={p.id} style={{ display: "block" }}>
                  <div className="card-media" style={p.image ? undefined : { background: "linear-gradient(135deg,#0f3d2e,#176b4e)", display: "grid", placeItems: "center", minHeight: 150 }}>
                    {p.image ? <Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={p.image} alt={p.title} style={{ objectFit: "cover" }} /> : <span style={{ fontSize: "2.6rem" }}>{pc?.icon || "🏠"}</span>}
                    <span className="card-badge">{pc ? propTypeLabel(pc, lang) : (lang === "sr" ? "Prodaja" : lang === "de" ? "Verkauf" : "For sale")}</span>
                  </div>
                  <div className="card-body">
                    <span className="card-region">{[p.city, p.municipality].filter(Boolean).join(" · ")}</span>
                    <h3 className="card-title">{p.title}</h3>
                    {specs && <p className="card-desc">{specs}</p>}
                    <div className="card-foot">{p.price != null && <span className="price">{eur(p.price)}</span>}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          {list.length > shown && <div style={{ textAlign: "center", marginTop: 30 }}><button className="btn btn--outline" onClick={() => setShown((x) => x + 18)}>{lang === "sr" ? "Prikaži još" : lang === "de" ? "Mehr anzeigen" : "Show more"}</button></div>}
        </>) : <div className="empty" style={{ marginTop: 18 }}>{lang === "sr" ? "Još nema oglasa u ovoj kategoriji." : lang === "de" ? "Noch keine Anzeigen." : "No listings yet."}</div>}
      </div>
    </>
  );
}
