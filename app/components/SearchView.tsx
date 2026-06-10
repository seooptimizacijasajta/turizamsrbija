"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Listing, Kind } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import ListingCard from "./ListingCard";

const TYPES: { k: Kind | "all"; key: string }[] = [
  { k: "all", key: "cat_all" }, { k: "mountain", key: "nav_mountains" }, { k: "lake", key: "nav_lakes" },
  { k: "spa", key: "nav_spas" }, { k: "ethno", key: "nav_ethno" }, { k: "stay", key: "nav_stays" },
];

export default function SearchView({ items }: { items: Listing[] }) {
  const { lang, t } = useLang();
  const sp = useSearchParams();
  const [q, setQ] = useState(sp.get("q") || "");
  const [type, setType] = useState<Kind | "all">((sp.get("type") as Kind) || "all");

  const filtered = useMemo(() => {
    const qq = q.toLowerCase().trim();
    return items.filter((d) => {
      if (type !== "all" && d.type !== type) return false;
      if (qq) {
        const hay = (L(d.name, lang) + " " + L(d.region, lang) + " " + L(d.short, lang) + " " + (d.municipality || "")).toLowerCase();
        if (!hay.includes(qq)) return false;
      }
      return true;
    });
  }, [items, q, type, lang]);

  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: 18 }}>{lang !== "sr" ? "Search" : "Pretraga"}</h1>
      <div className="toolbar" style={{ margin: "0 0 20px" }}>
        <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")} autoFocus />
        <select value={type} onChange={(e) => setType(e.target.value as Kind | "all")}>
          {TYPES.map((x) => <option key={x.k} value={x.k}>{t(x.key)}</option>)}
        </select>
      </div>
      <div className="results-count">{filtered.length} {t("results")}</div>
      {filtered.length ? (
        <div className="card-grid">{filtered.map((d) => <ListingCard key={d.id} item={d} />)}</div>
      ) : <div className="empty">{t("no_results")}</div>}
    </div>
  );
}
