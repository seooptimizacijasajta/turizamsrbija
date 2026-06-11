"use client";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { homePath } from "@/lib/slug";
import type { Business } from "@/lib/businesses";
import { bizCatByKey, bizCatLabel, firmeIndexPath, firmeCatPath } from "@/lib/firme";

export default function BusinessDetail({ b }: { b: Business }) {
  const { lang, t } = useLang();
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";
  const c = bizCatByKey(b.category);
  const ld = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    name: b.name, description: b.desc[lc] || undefined, image: b.image || undefined,
    telephone: b.phone || undefined, url: b.website || undefined,
    address: { "@type": "PostalAddress", streetAddress: b.address || undefined, addressLocality: b.city || undefined, addressCountry: "RS" },
  };
  return (
    <>
      {b.image && <div className="detail-hero" style={{ backgroundImage: `url(${b.image})` }} />}
      <div className="container" style={{ maxWidth: 820, paddingTop: 24 }}>
        <JsonLd data={ld} />
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_firme"), href: firmeIndexPath(lang) }, ...(c ? [{ name: bizCatLabel(c, lang), href: firmeCatPath(c, lang) }] : []), { name: b.name }]} />
        <span className="card-region">{c?.icon} {c ? bizCatLabel(c, lang) : b.category}{b.city ? " · " + b.city : ""}</span>
        <h1 style={{ margin: "6px 0 10px" }}>{b.name}{b.featured && <span style={{ marginLeft: 8, color: "var(--green-600)" }}>★</span>}</h1>
        {b.address && <p style={{ color: "var(--slate)" }}>📍 {b.address}{b.city ? ", " + b.city : ""}</p>}
        {b.desc[lc] && <p style={{ whiteSpace: "pre-line", lineHeight: 1.85, marginTop: 14 }}>{b.desc[lc]}</p>}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
          {b.phone && <a className="btn btn--primary btn--lg" href={`tel:${b.phone}`}>{lang === "sr" ? "Pozovi" : lang === "de" ? "Anrufen" : "Call"} {b.phone}</a>}
          {b.phone && <a className="btn btn--outline btn--lg" href={`viber://chat?number=${encodeURIComponent(b.phone)}`}>Viber</a>}
          {b.email && <a className="btn btn--outline btn--lg" href={`mailto:${b.email}`}>Email</a>}
          {b.website && <a className="btn btn--outline btn--lg" href={b.website} target="_blank" rel="noopener noreferrer nofollow">{lang === "sr" ? "Web sajt" : "Website"}</a>}
        </div>
        {b.address && (
          <div style={{ marginTop: 26, borderRadius: 12, overflow: "hidden", border: "1px solid var(--line)" }}>
            <iframe title="map" width="100%" height="300" style={{ border: 0 }} loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=20.35%2C44.75%2C20.55%2C44.86&layer=mapnik`} />
          </div>
        )}
      </div>
    </>
  );
}
