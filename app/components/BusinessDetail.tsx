"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { homePath } from "@/lib/slug";
import type { Business } from "@/lib/businesses";
import { bizCatByKey, bizCatLabel, firmeIndexPath, firmeCatPath } from "@/lib/firme";

export default function BusinessDetail({ b }: { b: Business }) {
  const { lang, t } = useLang();
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";
  const c = bizCatByKey(b.category);
  const sb = getBrowserClient();
  const [revs, setRevs] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => { (async () => { if (!sb) return; const { data } = await sb.from("business_reviews").select("*").eq("business_id", b.id).eq("status", "approved").order("created_at", { ascending: false }); setRevs(data || []); })(); }, [sb, b.id]);
  const avg = revs.length ? revs.reduce((a, r) => a + r.rating, 0) / revs.length : 0;
  async function submitReview(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); if (!sb) return; const f = new FormData(ev.currentTarget); const author = String(f.get("author") || "").trim(); const comment = String(f.get("comment") || "").trim();
    if (!author) return; setBusy(true);
    const { error } = await sb.from("business_reviews").insert({ business_id: b.id, author, rating, comment: comment || null });
    setBusy(false); if (!error) { setSent(true); const { data } = await sb.from("business_reviews").select("*").eq("business_id", b.id).eq("status", "approved").order("created_at", { ascending: false }); setRevs(data || []); }
  }
  const ld = {
    "@context": "https://schema.org", "@type": "LocalBusiness",
    name: b.name, description: b.desc[lc] || undefined, image: b.image || undefined,
    telephone: b.phone || undefined, url: b.website || undefined,
    address: { "@type": "PostalAddress", streetAddress: b.address || undefined, addressLocality: b.city || undefined, addressCountry: "RS" },
    ...(avg > 0 ? { aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: revs.length } } : {}),
  };
  return (
    <>
      {b.image && <div className="detail-hero" style={{ backgroundImage: `url(${b.image})` }} />}
      <div className="container" style={{ maxWidth: 820, paddingTop: 24 }}>
        <JsonLd data={ld} />
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_firme"), href: firmeIndexPath(lang) }, ...(c ? [{ name: bizCatLabel(c, lang), href: firmeCatPath(c, lang) }] : []), { name: b.name }]} />
        <span className="card-region">{c?.icon} {c ? bizCatLabel(c, lang) : b.category}{b.city ? " · " + b.city : ""}</span>
        <h1 style={{ margin: "6px 0 10px" }}>{b.name}{b.featured && <span style={{ marginLeft: 8, color: "var(--green-600)" }}>★</span>}{avg > 0 && <span style={{ marginLeft: 10, fontSize: "1rem", color: "var(--sun,#e0a106)" }}>★ {avg.toFixed(1)} ({revs.length})</span>}</h1>
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
      <div style={{ marginTop: 34, borderTop: "1px solid var(--line)", paddingTop: 22 }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: 12 }}>{lang === "sr" ? "Recenzije" : lang === "de" ? "Bewertungen" : "Reviews"}</h2>
          {revs.length === 0 ? <p style={{ color: "var(--slate)" }}>{lang === "sr" ? "Još nema recenzija. Budite prvi!" : lang === "de" ? "Noch keine Bewertungen." : "No reviews yet. Be the first!"}</p> : (
            <div style={{ display: "grid", gap: 10 }}>
              {revs.map((r) => (
                <div key={r.id} style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "12px 14px" }}>
                  <strong>{r.author}</strong> <span style={{ color: "var(--sun,#e0a106)" }}>{"★".repeat(r.rating)}</span>
                  {r.comment && <p style={{ marginTop: 4 }}>{r.comment}</p>}
                </div>
              ))}
            </div>
          )}
          {sent ? <p style={{ color: "var(--green-600)", marginTop: 14 }}>✓ {lang === "sr" ? "Hvala na recenziji!" : lang === "de" ? "Danke für Ihre Bewertung!" : "Thanks for your review!"}</p> : (
            <form onSubmit={submitReview} style={{ marginTop: 16, display: "grid", gap: 10, maxWidth: 520 }}>
              <h3 style={{ margin: 0 }}>{lang === "sr" ? "Ostavite recenziju" : lang === "de" ? "Bewertung abgeben" : "Leave a review"}</h3>
              <div className="field"><label>{lang === "sr" ? "Ime" : lang === "de" ? "Name" : "Name"}</label><input name="author" required /></div>
              <div className="field"><label>{lang === "sr" ? "Ocena" : lang === "de" ? "Bewertung" : "Rating"}</label>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>{[5,4,3,2,1].map((n) => <option key={n} value={n}>{"★".repeat(n)} ({n})</option>)}</select>
              </div>
              <div className="field"><label>{lang === "sr" ? "Komentar" : lang === "de" ? "Kommentar" : "Comment"}</label><textarea name="comment" rows={3} /></div>
              <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? "..." : (lang === "sr" ? "Pošalji" : lang === "de" ? "Senden" : "Submit")}</button>
            </form>
          )}
      </div>
      </div>
    </>
  );
}
