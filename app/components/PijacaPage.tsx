"use client";
import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import type { Product } from "@/lib/products";
import { PCATS, pcatLabel, pcatIcon, unitLabel } from "@/lib/pijaca";
import { useCurrency } from "@/lib/currency";
import JsonLd from "./JsonLd";

export default function PijacaPage({ products }: { products: Product[] }) {
  const { lang, t } = useLang();
  const { price: cprice } = useCurrency();
  const [cat, setCat] = useState("");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(24);
  useEffect(() => { setShown(24); }, [q, cat]);
  const L = (o: { sr: string; en: string; de: string }) => lang === "sr" ? o.sr : lang === "de" ? o.de : o.en;
  const Lr = (o: { sr: string; en: string }) => lang === "sr" ? o.sr : o.en;

  const list = useMemo(() => products.filter((p) => {
    if (cat && p.category !== cat) return false;
    if (q) { const h = (L(p.name) + " " + (p.producer || "") + " " + Lr(p.region)).toLowerCase(); if (!h.includes(q.toLowerCase())) return false; }
    return true;
  }), [products, cat, q, lang]);

  const cats = useMemo(() => PCATS.filter((c) => products.some((p) => p.category === c.key)), [products]);
  // Obična ItemList (naziv + slika) — bez @type Product, jer domaći proizvodi nemaju
  // recenzije/ocene, pa bi Product schema izazvala „missing review/aggregateRating" upozorenja u GSC.
  const itemListLd = useMemo(() => ({
    "@context": "https://schema.org", "@type": "ItemList",
    name: "Pijaca — domaći proizvodi",
    numberOfItems: list.length,
    itemListElement: list.slice(0, 50).map((p, i) => ({
      "@type": "ListItem", position: i + 1,
      name: p.name.sr || p.name.en,
      ...(p.image ? { image: p.image } : {}),
    })),
  }), [list]);
  const heading = lang === "sr" ? "Pijaca — domaći proizvodi" : lang === "de" ? "Markt — heimische Produkte" : "Marketplace — local products";
  const lead = lang === "sr" ? "Med, sir, rakija, vino i rukotvorine direktno od domaćih proizvođača." : lang === "de" ? "Honig, Käse, Rakija, Wein und Handwerk direkt von heimischen Erzeugern." : "Honey, cheese, rakija, wine and crafts straight from local producers.";

  return (
    <>
      {list.length > 0 && <JsonLd data={itemListLd} />}
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} /></div>
      <div className="container">
        <div className="toolbar">
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "sr" ? "Pretraga proizvoda…" : lang === "de" ? "Produkte suchen…" : "Search products…"} />
        </div>
        <div className="amen-filter">
          <button type="button" className={"amen-chip" + (cat === "" ? " on" : "")} onClick={() => setCat("")}>{lang === "sr" ? "Sve" : lang === "de" ? "Alle" : "All"}</button>
          {cats.map((c) => (
            <button key={c.key} type="button" className={"amen-chip" + (cat === c.key ? " on" : "")} onClick={() => setCat(c.key)}>{c.icon} {pcatLabel(c.key, lang)}</button>
          ))}
        </div>
        {list.length ? (<>
          <div className="card-grid" style={{ marginBottom: 40 }}>
            {list.slice(0, shown).map((p) => (
              <div className="card" key={p.id}>
                {p.image && <div className="card-media"><Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={p.image} alt={L(p.name)} style={{ objectFit: "cover" }} /><span className="card-badge">{pcatIcon(p.category)} {pcatLabel(p.category, lang)}</span></div>}
                <div className="card-body">
                  <span className="card-region">{p.producer}{p.producer && Lr(p.region) ? " · " : ""}{Lr(p.region)}</span>
                  <h3 className="card-title">{L(p.name)}</h3>
                  <p className="card-desc">{L(p.desc)}</p>
                  <div className="card-foot">
                    {p.price != null && <span className="price">{cprice(p.price)} <small>/ {unitLabel(p.unit, lang)}</small></span>}
                  </div>
                  {p.phone && (
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <a className="btn btn--primary" style={{ flex: 1, fontSize: ".82rem", padding: "8px 10px" }} href={`viber://chat?number=${encodeURIComponent(p.phone)}`}>Viber</a>
                      <a className="btn btn--outline" style={{ flex: 1, fontSize: ".82rem", padding: "8px 10px" }} href={`tel:${p.phone}`}>{lang === "sr" ? "Pozovi" : lang === "de" ? "Anrufen" : "Call"}</a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {list.length > shown && <div style={{ textAlign: "center", marginBottom: 40 }}><button className="btn btn--outline" onClick={() => setShown((x) => x + 24)}>{lang === "sr" ? "Prikaži još" : lang === "de" ? "Mehr anzeigen" : "Show more"}</button></div>}
        </>) : <div className="empty">{t("no_results")}</div>}
      </div>
    </>
  );
}
