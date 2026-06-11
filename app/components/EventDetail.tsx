"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { homePath } from "@/lib/slug";
import type { EventItem } from "@/lib/eventsData";
import { evCatByKey, evCatLabel, manifIndexPath, manifCatPath, monthName } from "@/lib/events";

export type NearbyStay = { name: string; region: string; img: string; price: number; href: string };

export default function EventDetail({ ev, stays }: { ev: EventItem; stays: NearbyStay[] }) {
  const { lang, t } = useLang();
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";
  const c = evCatByKey(ev.category);
  const per = ev.periodText || monthName(ev.month, lang);
  const locParts = [ev.venue, ev.city, ev.region].filter(Boolean).join(", ");

  const ld: any = {
    "@context": "https://schema.org",
    "@type": "Festival",
    name: ev.name,
    description: ev.desc[lc] || ev.desc.sr,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: ev.venue || ev.city || "Srbija", address: { "@type": "PostalAddress", addressLocality: ev.city || undefined, addressRegion: ev.region || undefined, addressCountry: "RS" } },
    organizer: { "@type": "Organization", name: "Turizam Srbija", url: "https://turizamsrbija.com" },
  };
  if (ev.image) ld.image = ev.image;
  if (ev.startDate) ld.startDate = ev.startDate;
  if (ev.endDate) ld.endDate = ev.endDate;
  if (ev.website) ld.url = ev.website;

  const nearbyHeading = lang === "sr" ? "Smeštaj u blizini" : lang === "de" ? "Unterkünfte in der Nähe" : "Accommodation nearby";

  return (
    <main>
      {ev.startDate && <JsonLd data={ld} />}
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(180deg,rgba(15,61,46,.4),rgba(15,61,46,.75)),url('${ev.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80"}')` }}>
        <div className="container"><h1>{ev.name}{ev.featured && <span style={{ marginLeft: 8, color: "#ffd24a" }}>★</span>}</h1><p>{[per, ev.city, ev.region].filter(Boolean).join(" · ")}</p></div>
      </section>

      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: lang === "sr" ? "Manifestacije" : lang === "de" ? "Veranstaltungen" : "Events", href: manifIndexPath(lang) }, ...(c ? [{ name: evCatLabel(c, lang), href: manifCatPath(c, lang) }] : []), { name: ev.name }]} />
      </div>

      <div className="container" style={{ maxWidth: 820, paddingBottom: 8 }}>
        <div className="amen-filter" style={{ marginTop: 6 }}>
          {c && <span className="amen-chip on">{c.icon} {evCatLabel(c, lang)}</span>}
          {per && <span className="amen-chip">🗓 {per}</span>}
          {ev.city && <span className="amen-chip">📍 {ev.city}</span>}
          {ev.region && <span className="amen-chip">🗺 {ev.region}</span>}
        </div>

        <p style={{ marginTop: 16, lineHeight: 1.85, color: "var(--ink)", fontSize: "1.05rem" }}>{ev.desc[lc] || ev.desc.sr}</p>

        {locParts && <p style={{ color: "var(--slate)", marginTop: 6 }}><strong>{lang === "sr" ? "Lokacija" : lang === "de" ? "Ort" : "Location"}:</strong> {locParts}</p>}
        {!ev.startDate && per && <p style={{ color: "var(--slate)", marginTop: 6 }}><strong>{lang === "sr" ? "Period održavanja" : lang === "de" ? "Zeitraum" : "Typical period"}:</strong> {per} {lang === "sr" ? "(tačan datum proverite kod organizatora)" : lang === "de" ? "(genaues Datum beim Veranstalter prüfen)" : "(check exact dates with the organiser)"}</p>}

        {(ev.website || ev.phone || ev.email) && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
            {ev.website && <a className="btn btn--primary" href={ev.website} target="_blank" rel="noopener noreferrer nofollow">{lang === "sr" ? "Zvanični sajt" : lang === "de" ? "Offizielle Website" : "Official site"}</a>}
            {ev.phone && <a className="btn btn--outline" href={`tel:${ev.phone}`}>{lang === "sr" ? "Pozovi" : lang === "de" ? "Anrufen" : "Call"}</a>}
            {ev.email && <a className="btn btn--outline" href={`mailto:${ev.email}`}>Email</a>}
          </div>
        )}
      </div>

      {stays.length > 0 && (
        <section className="section section--soft" style={{ marginTop: 24 }}>
          <div className="container">
            <h2 className="section-title" style={{ marginBottom: 14 }}>🏠 {nearbyHeading}{ev.city ? ` — ${ev.city}` : ""}</h2>
            <div className="card-grid">
              {stays.map((s, i) => (
                <div className="card" key={i}>
                  <div className="card-media">{/* eslint-disable-next-line @next/next/no-img-element */}<img loading="lazy" src={s.img} alt={s.name} /></div>
                  <div className="card-body">
                    <span className="card-region">{s.region}</span>
                    <h3 className="card-title"><Link href={s.href} style={{ color: "inherit" }}>{s.name}</Link></h3>
                    {s.price > 0 && <div className="card-foot"><span className="price">€{s.price} <small>/ {lang === "sr" ? "noć" : lang === "de" ? "Nacht" : "night"}</small></span></div>}
                    <div style={{ marginTop: 8 }}><Link className="btn btn--primary" style={{ fontSize: ".82rem", padding: "7px 12px" }} href={s.href}>{lang === "sr" ? "Pogledaj" : lang === "de" ? "Ansehen" : "View"}</Link></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
