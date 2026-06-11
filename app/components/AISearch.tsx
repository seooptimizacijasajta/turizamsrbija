"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import ListingCard from "./ListingCard";
import type { Business } from "@/lib/businesses";
import type { Product } from "@/lib/products";
import { bizCatByKey, bizCatLabel } from "@/lib/firme";
import { pcatLabel, pcatIcon } from "@/lib/pijaca";
import { blogHref } from "@/lib/guides";
import { AMENITIES } from "@/lib/amenities";

type Post = { id: string; slug: string; title_sr: string; title_en: string | null; excerpt_sr: string | null; excerpt_en: string | null; cover_image: string | null };

function hit(hay: string, terms: string[]) { const h = hay.toLowerCase(); return terms.every((t) => h.includes(t)); }

export default function AISearch({ listings, businesses, products, posts }: { listings: Listing[]; businesses: Business[]; products: Product[]; posts: Post[] }) {
  const { lang, t } = useLang();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";

  const res = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return { listings: [] as Listing[], businesses: [] as Business[], products: [] as Product[], posts: [] as Post[] };
    const li = listings.filter((d) => {
      const am = (d.amenities || []).map((k) => { const a = AMENITIES.find((x) => x.key === k); return a ? a.sr + " " + a.en : ""; }).join(" ");
      return hit(`${L(d.name, lang)} ${L(d.region, lang)} ${L(d.short, lang)} ${d.municipality || ""} ${t("type_" + d.type)} ${am}`, terms);
    });
    const bz = businesses.filter((b) => { const c = bizCatByKey(b.category); return hit(`${b.name} ${b.desc[lc]} ${b.city || ""} ${c ? c.sr + " " + c.en : ""}`, terms); });
    const pr = products.filter((p) => hit(`${p.name[lc]} ${p.desc[lc]} ${p.producer || ""} ${p.region[lang === "sr" ? "sr" : "en"]} ${pcatLabel(p.category, lang)}`, terms));
    const po = posts.filter((p) => hit(`${p.title_sr} ${p.title_en || ""} ${p.excerpt_sr || ""} ${p.excerpt_en || ""}`, terms));
    return { listings: li, businesses: bz, products: pr, posts: po };
  }, [q, listings, businesses, products, posts, lang, lc, t]);

  const total = res.listings.length + res.businesses.length + res.products.length + res.posts.length;
  const ph = lang === "sr" ? "npr. apartman na Zlatiboru sa bazenom, rent-a-car Beograd, med…" : lang === "de" ? "z. B. Apartment auf Zlatibor mit Pool, Mietwagen Belgrad…" : "e.g. apartment on Zlatibor with a pool, car rental Belgrade…";
  const summary = !q.trim() ? "" : total === 0
    ? (lang === "sr" ? `Nema rezultata za „${q}". Probajte drugačije reči (mesto, tip, sadržaj).` : lang === "de" ? `Keine Ergebnisse für „${q}".` : `No results for “${q}”.`)
    : (lang === "sr" ? `Pronašao sam ${total} rezultat(a) za „${q}": ${res.listings.length} smeštaj, ${res.businesses.length} firmi, ${res.products.length} proizvoda, ${res.posts.length} vodiča.`
       : lang === "de" ? `${total} Ergebnis(se) für „${q}": ${res.listings.length} Unterkünfte, ${res.businesses.length} Firmen, ${res.products.length} Produkte, ${res.posts.length} Reiseführer.`
       : `Found ${total} result(s) for “${q}”: ${res.listings.length} stays, ${res.businesses.length} businesses, ${res.products.length} products, ${res.posts.length} guides.`);

  const SectionTitle = (txt: string) => <h2 className="section-title" style={{ fontSize: "1.25rem", margin: "26px 0 12px" }}>{txt}</h2>;

  return (
    <div className="container" style={{ padding: "36px 0" }}>
      <h1 style={{ marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>✨ {lang === "sr" ? "AI Pretraga" : lang === "de" ? "KI-Suche" : "AI Search"}</h1>
      <p style={{ color: "var(--slate)", marginBottom: 16 }}>{lang === "sr" ? "Pretražite ceo portal jednim upitom — smeštaj, destinacije, firme, domaće proizvode i vodiče." : lang === "de" ? "Durchsuchen Sie das ganze Portal mit einer Anfrage." : "Search the whole portal with one query."}</p>
      <div className="toolbar" style={{ margin: "0 0 16px" }}>
        <span style={{ fontSize: "1.2rem", paddingLeft: 4 }}>✨</span>
        <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={ph} autoFocus />
      </div>
      {summary && <div className="ai-summary" style={{ background: "var(--sand,#f4f1ea)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", marginBottom: 8, fontWeight: 500 }}>🤖 {summary}</div>}

      {res.listings.length > 0 && (<>{SectionTitle(t("nav_stays") + " · " + (lang === "sr" ? "destinacije" : lang === "de" ? "Reiseziele" : "destinations"))}
        <div className="card-grid">{res.listings.slice(0, 12).map((d) => <ListingCard key={d.id} item={d} />)}</div></>)}

      {res.businesses.length > 0 && (<>{SectionTitle(t("nav_firme"))}
        <div className="card-grid">{res.businesses.slice(0, 9).map((b) => { const c = bizCatByKey(b.category); return (
          <div className="card" key={b.id}><div className="card-body">
            <span className="card-region">{c?.icon} {c ? bizCatLabel(c, lang) : b.category}{b.city ? " · " + b.city : ""}</span>
            <h3 className="card-title">{b.name}</h3><p className="card-desc">{b.desc[lc]}</p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>{b.phone && <a className="btn btn--primary" style={{ fontSize: ".8rem", padding: "6px 10px" }} href={`tel:${b.phone}`}>{lang === "sr" ? "Pozovi" : "Call"}</a>}{b.website && <a className="btn btn--outline" style={{ fontSize: ".8rem", padding: "6px 10px" }} href={b.website} target="_blank" rel="noopener noreferrer nofollow">Web</a>}</div>
          </div></div>); })}</div></>)}

      {res.products.length > 0 && (<>{SectionTitle(t("nav_pijaca"))}
        <div className="card-grid">{res.products.slice(0, 9).map((p) => (
          <div className="card" key={p.id}>{p.image && <div className="card-media">{/* eslint-disable-next-line @next/next/no-img-element */}<img loading="lazy" src={p.image} alt={p.name[lc]} /><span className="card-badge">{pcatIcon(p.category)} {pcatLabel(p.category, lang)}</span></div>}
            <div className="card-body"><span className="card-region">{p.producer}</span><h3 className="card-title">{p.name[lc]}</h3><p className="card-desc">{p.desc[lc]}</p></div></div>))}</div></>)}

      {res.posts.length > 0 && (<>{SectionTitle(t("nav_blog"))}
        <div className="card-grid">{res.posts.slice(0, 9).map((p) => { const title = (lang !== "sr" ? p.title_en : p.title_sr) || p.title_sr; const ex = (lang !== "sr" ? p.excerpt_en : p.excerpt_sr) || p.excerpt_sr || ""; return (
          <Link className="card" key={p.id} href={blogHref(p.slug, lang)}>{p.cover_image && <div className="card-media">{/* eslint-disable-next-line @next/next/no-img-element */}<img loading="lazy" src={p.cover_image} alt={title} /></div>}<div className="card-body"><h3 className="card-title">{title}</h3><p className="card-desc">{ex}</p></div></Link>); })}</div></>)}

      {q.trim() && total === 0 && <div className="empty">{t("no_results")}</div>}
    </div>
  );
}
