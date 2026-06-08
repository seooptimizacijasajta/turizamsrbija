"use client";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import type { Banner } from "@/lib/banners";
import BookingForm from "./BookingForm";
import ListingCard from "./ListingCard";

export default function DetailView({ item, nearby, sidebarBanners = [] }: { item: Listing; nearby: Listing[]; sidebarBanners?: Banner[] }) {
  const { lang, t } = useLang();
  const meta: string[] = [];
  if (item.elevation) meta.push(`⛰ ${t("detail_elevation")}: ${item.elevation} m`);
  if (item.capacity) meta.push(`👥 ${t("detail_capacity")}: ${item.capacity} ${t("detail_persons")}`);
  meta.push(`★ ${item.rating.toFixed(1)}`);
  meta.push(`📍 ${L(item.region, lang)}`);

  return (
    <main>
      <div className="detail-hero" style={{ backgroundImage: `url(${item.img.replace("w=900", "w=1600")})` }} />
      <div className="container">
        <div className="detail-wrap">
          <div className="detail-main">
            <span className="card-region">{t("type_" + item.type)} · {L(item.region, lang)}</span>
            <h1>{L(item.name, lang)}</h1>
            <div className="detail-meta">{meta.map((m, i) => <span key={i}>{m}</span>)}</div>
            <div className="detail-section">
              <h2>{t("detail_about")}</h2>
              <p>{L(item.desc, lang)}</p>
            </div>
            <div className="detail-section">
              <h2>{t("detail_highlights")}</h2>
              <ul className="feature-list">
                {(item.features[lang] || []).map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
            {item.gallery.length > 0 && (
              <div className="detail-section">
                <h2>{t("detail_gallery")}</h2>
                <div className="gallery">
                  {item.gallery.map((g, i) => {
                    const url = g.startsWith("http") ? g
                      : `https://images.unsplash.com/photo-${g}?auto=format&fit=crop&w=600&q=80`;
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    return <img key={i} loading="lazy" src={url} alt={L(item.name, lang)} />;
                  })}
                </div>
              </div>
            )}
            {nearby.length > 0 && (
              <div className="detail-section">
                <h2>{t("detail_nearby")}</h2>
                <div className="card-grid">{nearby.map((n) => <ListingCard key={n.id} item={n} />)}</div>
              </div>
            )}
          </div>
          <div>
            <BookingForm item={item} />
            {sidebarBanners.length > 0 && (
              <div className="banner-sidebar">
                {sidebarBanners.map((b) => (
                  <a key={b.id} className="banner" href={b.link_url} target="_blank" rel="noopener noreferrer sponsored">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.image_url} alt={b.title || "Oglas"} loading="lazy" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
