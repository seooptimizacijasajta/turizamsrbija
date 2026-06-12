"use client";
import { useMemo, useState, useEffect } from "react";
import { Listing, Kind } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import type { Banner } from "@/lib/banners";
import ListingCard from "./ListingCard";
import { AMENITIES } from "@/lib/amenities";

function BannerCard({ b }: { b: Banner }) {
  return (
    <a className="card banner-card" href={b.link_url} target="_blank" rel="noopener noreferrer sponsored">
      <span className="banner-tag">Oglas · Ad</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.image_url} alt={b.title || "Oglas"} loading="lazy" />
    </a>
  );
}

export default function SectionExplorer({ items, kind, banners = [] }: { items: Listing[]; kind: Kind; banners?: Banner[] }) {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("featured");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [amen, setAmen] = useState<string[]>([]);
  const toggleAmen = (k: string) => setAmen((a) => a.includes(k) ? a.filter((x) => x !== k) : [...a, k]);
  const [shown, setShown] = useState(24);
  useEffect(() => { setShown(24); }, [q, region, cat, sort, minP, maxP, amen]);

  const regions = useMemo(() => {
    const set: string[] = [];
    items.forEach((d) => { const r = L(d.region, lang); if (r && !set.includes(r)) set.push(r); });
    return set.sort();
  }, [items, lang]);

  const filtered = useMemo(() => {
    let out = items.filter((d) => {
      if (region && L(d.region, lang) !== region) return false;
      if (cat && d.category !== cat) return false;
      if (kind === "stay") {
        if (minP && d.price < Number(minP)) return false;
        if (maxP && d.price > Number(maxP)) return false;
      }
      if (amen.length && !amen.every((k) => (d.amenities || []).includes(k))) return false;
      if (q) {
        const hay = (L(d.name, lang) + " " + L(d.region, lang) + " " + L(d.short, lang)).toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    else if (sort === "price_low") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price_high") out = [...out].sort((a, b) => b.price - a.price);
    else if (sort === "popular") out = [...out].sort((a, b) => (b.views || 0) - (a.views || 0));
    out = [...out].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return out;
  }, [items, q, region, cat, sort, lang, minP, maxP, kind, amen]);

  // Interleave in-list banners at their sort index (0 = first slot in the grid)
  const grid = useMemo(() => {
    const nodes: React.ReactNode[] = [];
    const bs = [...banners].sort((a, b) => a.sort - b.sort);
    let bi = 0;
    const showBanners = !q && !region && !cat && !minP && !maxP && !amen.length; // only on the unfiltered list
    for (let i = 0; i < filtered.length; i++) {
      while (showBanners && bi < bs.length && bs[bi].sort === i) { nodes.push(<BannerCard key={"b" + bs[bi].id} b={bs[bi]} />); bi++; }
      nodes.push(<ListingCard key={filtered[i].id} item={filtered[i]} />);
    }
    while (showBanners && bi < bs.length) { nodes.push(<BannerCard key={"b" + bs[bi].id} b={bs[bi]} />); bi++; }
    return nodes;
  }, [filtered, banners, q, region, cat, minP, maxP, amen]);

  return (
    <div className="container">
      <div className="toolbar">
        <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("filter_search")} />
        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          <option value="">{t("filter_region")}</option>
          {regions.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        {kind === "stay" && (
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">{t("cat_all")}</option>
            <option value="hotel">{t("cat_hotel")}</option>
            <option value="private">{t("cat_private")}</option>
          </select>
        )}
        {kind === "stay" && (
          <>
            <input type="number" min={0} value={minP} onChange={(e) => setMinP(e.target.value)} placeholder={t("price_from")} style={{ width: 120 }} />
            <input type="number" min={0} value={maxP} onChange={(e) => setMaxP(e.target.value)} placeholder={t("price_to")} style={{ width: 100 }} />
          </>
        )}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">{t("sort_featured")}</option>
          <option value="rating">{t("sort_rating")}</option>
          <option value="popular">{t("sort_popular")}</option>
          <option value="price_low">{t("sort_price_low")}</option>
          <option value="price_high">{t("sort_price_high")}</option>
        </select>
      </div>
      <div className="amen-filter">
        {AMENITIES.map((a) => (
          <button key={a.key} type="button" className={"amen-chip" + (amen.includes(a.key) ? " on" : "")} onClick={() => toggleAmen(a.key)}>{a.icon} {lang !== "sr" ? a.en : a.sr}</button>
        ))}
      </div>
      <div className="results-count">{filtered.length} {t("results")}</div>
      {filtered.length ? (
        <>
          <div className="card-grid" style={{ marginBottom: grid.length > shown ? 20 : 40 }}>{grid.slice(0, shown)}</div>
          {grid.length > shown && <div style={{ textAlign: "center", marginBottom: 40 }}><button className="btn btn--outline" onClick={() => setShown((x) => x + 24)}>{lang === "sr" ? "Prikaži još" : lang === "de" ? "Mehr anzeigen" : "Show more"}</button></div>}
        </>
      ) : (
        <div className="empty">{t("no_results")}</div>
      )}
    </div>
  );
}
