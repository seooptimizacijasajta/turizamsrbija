"use client";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import { listingPath } from "@/lib/slug";

export default function ListingCard({ item }: { item: Listing }) {
  const { lang, t } = useLang();
  const tags = (item.features[lang] || []).slice(0, 2);
  const href = listingPath(item.type, item.name.sr, lang);
  return (
    <Link className={"card" + (item.bold ? " card--bold" : "")} href={href}>
      <div className="card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={item.img} alt={L(item.name, lang)} />
        <span className="card-badge">{t("type_" + item.type)}</span>
        {item.bold && <span className="card-promo">★ {t("promo_featured")}</span>}
      </div>
      <div className="card-body">
        <span className="card-region">{L(item.region, lang)}</span>
        <h3 className="card-title">{L(item.name, lang)}</h3>
        <p className="card-desc">{L(item.short, lang)}</p>
        <div className="tag-row">{tags.map((f) => <span key={f} className="tag">{f}</span>)}</div>
        <div className="card-foot">
          {item.type === "stay" ? (
            <span className="price"><small>{t("from")} </small>€{item.price} <small>/ {t("per_night")}</small></span>
          ) : (
            <span className="price" style={{ color: "var(--green-600)" }}>{t("free_entry")}</span>
          )}
          {item.rating > 0 && <span className="rating">★ {item.rating.toFixed(1)}</span>}
        </div>
      </div>
    </Link>
  );
}
