"use client";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import type { Banner } from "@/lib/banners";
import type { Review } from "@/lib/reviews";
import type { GooglePlace } from "@/lib/google";
import BookingForm from "./BookingForm";
import ListingCard from "./ListingCard";
import JsonLd from "./JsonLd";
import Breadcrumbs, { NAVKEY } from "./Breadcrumbs";
import ShareButtons from "./ShareButtons";
import { homePath, sectionPath } from "@/lib/slug";
import ReviewForm, { Stars } from "./ReviewForm";
import AvailabilityView from "./AvailabilityView";

function ytId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

export default function DetailView({
  item, nearby, sidebarBanners = [], reviews = [], reviewAvg = 0, reviewCount = 0, google = null, blocked = [], related = [],
}: {
  item: Listing; nearby: Listing[]; sidebarBanners?: Banner[];
  reviews?: Review[]; reviewAvg?: number; reviewCount?: number; google?: GooglePlace | null; blocked?: string[]; related?: Listing[];
}) {
  const { lang, t } = useLang();
  const displayRating = reviewCount > 0 ? reviewAvg : item.rating;
  const ld: any = {
    "@context": "https://schema.org",
    "@type": item.type === "stay" ? "LodgingBusiness" : "TouristAttraction",
    name: L(item.name, lang),
    description: L(item.short, lang) || L(item.desc, lang),
    image: item.img,
    address: { "@type": "PostalAddress", addressLocality: L(item.region, lang), addressCountry: "RS" },
  };
  if (typeof item.lat === "number" && typeof item.lng === "number") ld.geo = { "@type": "GeoCoordinates", latitude: item.lat, longitude: item.lng };
  if (displayRating > 0) ld.aggregateRating = { "@type": "AggregateRating", ratingValue: displayRating.toFixed(1), reviewCount: Math.max(reviewCount, 1) };
  if (item.type === "stay" && item.price) ld.priceRange = `€${item.price}`;
  const meta: string[] = [];
  if (item.elevation) meta.push(`⛰ ${t("detail_elevation")}: ${item.elevation} m`);
  if (item.capacity) meta.push(`👥 ${t("detail_capacity")}: ${item.capacity} ${t("detail_persons")}`);
  if (item.municipality) meta.push(`🏛 ${t("detail_municipality")}: ${item.municipality}`);
  if (displayRating > 0) meta.push(`★ ${displayRating.toFixed(1)}`);
  meta.push(`📍 ${L(item.region, lang)}`);

  const videos = (item.videoUrls || []).map(ytId).filter(Boolean) as string[];
  const hasMap = typeof item.lat === "number" && typeof item.lng === "number";

  return (
    <main>
      <JsonLd data={ld} />
      <div className="detail-hero" style={{ backgroundImage: `url(${item.img.replace("w=900", "w=1600")})` }} />
      <div className="container">
        <div className="detail-wrap">
          <div className="detail-main">
            <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t(NAVKEY[item.type]), href: sectionPath(item.type, lang) }, { name: L(item.name, lang) }]} />
            <span className="card-region">{t("type_" + item.type)} · {L(item.region, lang)}</span>
            <h1>{L(item.name, lang)}</h1>
            <div className="detail-meta">{meta.map((m, i) => <span key={i}>{m}</span>)}</div>
            <ShareButtons title={L(item.name, lang)} />
            <div className="detail-section"><h2>{t("detail_about")}</h2><p style={{ whiteSpace: "pre-line" }}>{L(item.desc, lang)}</p></div>
            <div className="detail-section">
              <h2>{t("detail_highlights")}</h2>
              <ul className="feature-list">{(item.features[lang] || []).map((f) => <li key={f}>{f}</li>)}</ul>
            </div>
            {item.gallery.length > 0 && (
              <div className="detail-section">
                <h2>{t("detail_gallery")}</h2>
                <div className="gallery">
                  {item.gallery.map((g, i) => {
                    const url = g.startsWith("http") ? g : `https://images.unsplash.com/photo-${g}?auto=format&fit=crop&w=600&q=80`;
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    return <img key={i} loading="lazy" src={url} alt={L(item.name, lang)} />;
                  })}
                </div>
              </div>
            )}
            {videos.length > 0 && (
              <div className="detail-section">
                <h2>{t("detail_video")}</h2>
                <div style={{ display: "grid", gap: 14 }}>
                  {videos.map((id) => (
                    <div key={id} style={{ position: "relative", paddingTop: "56.25%", borderRadius: 12, overflow: "hidden" }}>
                      <iframe src={`https://www.youtube.com/embed/${id}`} title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {hasMap && (
              <div className="detail-section">
                <h2>{t("detail_location")}</h2>
                <iframe title="Map" loading="lazy"
                  style={{ width: "100%", height: 320, border: "1px solid var(--line)", borderRadius: 12 }}
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${item.lng! - 0.01}%2C${item.lat! - 0.01}%2C${item.lng! + 0.01}%2C${item.lat! + 0.01}&layer=mapnik&marker=${item.lat}%2C${item.lng}`} />
              </div>
            )}

            {item.type === "stay" && (
              <div className="detail-section">
                <h2>{t("cal_avail")}</h2>
                <AvailabilityView blocked={blocked} />
              </div>
            )}

            {/* On-site reviews */}
            <div className="detail-section">
              <h2>{t("rev_heading")} {reviewCount > 0 && <span style={{ fontSize: ".9rem", color: "var(--slate)" }}>· <Stars value={reviewAvg} /> {reviewAvg.toFixed(1)} ({reviewCount})</span>}</h2>
              {reviewCount === 0 ? <p style={{ color: "var(--slate)" }}>{t("rev_none")}</p> : (
                <div style={{ display: "grid", gap: 12 }}>
                  {reviews.map((r) => (
                    <div key={r.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <strong>{r.author_name}</strong><Stars value={r.rating} />
                      </div>
                      {r.comment && <p style={{ marginTop: 6, color: "var(--slate)" }}>{r.comment}</p>}
                    </div>
                  ))}
                </div>
              )}
              <ReviewForm listingId={item.id} />
            </div>

            {/* Google reviews (optional) */}
            {google && google.reviews.length > 0 && (
              <div className="detail-section">
                <h2>{t("rev_google")} <span style={{ fontSize: ".9rem", color: "var(--slate)" }}>· <Stars value={google.rating} /> {google.rating.toFixed(1)} ({google.total})</span></h2>
                <div style={{ display: "grid", gap: 8 }}>
                  {google.reviews.map((g, i) => (
                    <details key={i} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "10px 14px" }}>
                      <summary style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", gap: 10 }}>
                        <strong>{g.author}</strong><Stars value={g.rating} />
                      </summary>
                      <p style={{ marginTop: 8, color: "var(--slate)" }}>{g.text}</p>
                    </details>
                  ))}
                </div>
                {google.url && <a href={google.url} target="_blank" rel="noopener noreferrer" className="btn btn--outline" style={{ marginTop: 12 }}>{t("rev_google_view")}</a>}
              </div>
            )}

            {nearby.length > 0 && (
              <div className="detail-section">
                <h2>{t("detail_nearby")}</h2>
                <div className="card-grid">{nearby.map((n) => <ListingCard key={n.id} item={n} />)}</div>
              </div>
            )}
            {related.length > 0 && (
              <div className="detail-section">
                <h2>{t(item.type === "stay" ? "detail_similar" : "detail_related")}</h2>
                <div className="card-grid">{related.map((n) => <ListingCard key={n.id} item={n} />)}</div>
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
