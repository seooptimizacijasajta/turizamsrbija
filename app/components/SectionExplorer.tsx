"use client";
import { useMemo, useState } from "react";
import { Listing, Kind } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import ListingCard from "./ListingCard";

export default function SectionExplorer({ items, kind }: { items: Listing[]; kind: Kind }) {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [cat, setCat] = useState("");
  const [sort, setSort] = useState("featured");

  const regions = useMemo(() => {
    const set: string[] = [];
    items.forEach((d) => { const r = L(d.region, lang); if (r && !set.includes(r)) set.push(r); });
    return set.sort();
  }, [items, lang]);

  const filtered = useMemo(() => {
    let out = items.filter((d) => {
      if (region && L(d.region, lang) !== region) return false;
      if (cat && d.category !== cat) return false;
      if (q) {
        const hay = (L(d.name, lang) + " " + L(d.region, lang) + " " + L(d.short, lang)).toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
    if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    else if (sort === "price_low") out = [...out].sort((a, b) => a.price - b.price);
    else if (sort === "price_high") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [items, q, region, cat, sort, lang]);

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
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="featured">{t("sort_featured")}</option>
          <option value="rating">{t("sort_rating")}</option>
          <option value="price_low">{t("sort_price_low")}</option>
          <option value="price_high">{t("sort_price_high")}</option>
        </select>
      </div>
      <div className="results-count">{filtered.length} {t("results")}</div>
      {filtered.length ? (
        <div className="card-grid" style={{ marginBottom: 40 }}>
          {filtered.map((d) => <ListingCard key={d.id} item={d} />)}
        </div>
      ) : (
        <div className="empty">{t("no_results")}</div>
      )}
    </div>
  );
}
