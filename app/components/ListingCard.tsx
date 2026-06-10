"use client";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import { listingPath } from "@/lib/slug";
import { useFavorites } from "@/lib/favorites";
import { AMENITIES, priceUnitLabel } from "@/lib/amenities";
import { useCurrency } from "@/lib/currency";

export default function ListingCard({ item }: { item: Listing }) {
  const { lang, t } = useLang();
  const { price } = useCurrency();
  const tags = (((item.features as any)[lang] as string[]) || item.features.en || []).slice(0, 2);
  const { isFav, toggle } = useFavorites();
  const href = listingPath(item.type, item.name.sr, lang);
  const amIcons = (item.amenities || []).map((k) => AMENITIES.find((a) => a.key === k)).filter(Boolean).slice(0, 4);
  const popular = (item.views || 0) >= 25;
  return (
    <Link className={"card" + (item.bold ? " card--bold" : "")} href={href}>
      <div className="card-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src={item.img} alt={L(item.name, lang)} />
        <span className="card-badge">{t("type_" + item.type)}</span>
        {item.bold && <span className="card-promo">★ {t("promo_featured")}</span>}
        {popular && !item.bold && <span className="card-promo card-promo--pop">{lang !== "sr" ? "POPULAR" : "POPULARNO"}</span>}
        <span className={"card-fav" + (isFav(item.id) ? " on" : "")} role="button" aria-label="Sačuvaj / Save" onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(item.id); }}>♥</span>
      </div>
      <div className="card-body">
        <span className="card-region">{L(item.region, lang)}</span>
        <h3 className="card-title">{L(item.name, lang)}</h3>
        <p className="card-desc">{L(item.short, lang)}</p>
        <div className="tag-row">{tags.map((f) => <span key={f} className="tag">{f}</span>)}</div>
        {amIcons.length > 0 && <div className="am-row">{amIcons.map((a) => <span key={a!.key} className="am-ic" title={lang !== "sr" ? a!.en : a!.sr}>{a!.icon}</span>)}</div>}
        <div className="card-foot">
          {item.type === "stay" ? (
            <span className="price"><small>{t("from")} </small>{price(item.price)} <small>/ {priceUnitLabel(item.priceUnit, lang)}</small></span>
          ) : (
            <span className="price" style={{ color: "var(--green-600)" }}>{t("free_entry")}</span>
          )}
          {item.rating > 0 && <span className="rating">★ {item.rating.toFixed(1)}</span>}
        </div>
      </div>
    </Link>
  );
}
