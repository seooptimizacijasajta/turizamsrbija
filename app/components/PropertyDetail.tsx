"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import type { Property } from "@/lib/properties";
import { propTypeByKey, propTypeLabel, propTypePath, dealKindLabel, nekretnineIndexPath } from "@/lib/nekretnine";

const eur = (n: number) => "€" + Math.round(n).toLocaleString("de-DE");

export default function PropertyDetail({ item }: { item: Property }) {
  const { lang, t } = useLang();
  const pc = propTypeByKey(item.property_type);
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const gallery = item.image ? [item.image, ...item.images.filter((x) => x !== item.image)] : item.images;

  const specs: [string, string][] = [
    [L("Tip", "Type", "Typ"), pc ? propTypeLabel(pc, lang) : item.property_type],
    [L("Ponuda", "Offer", "Angebot"), dealKindLabel(item.deal_type, lang)],
    ...(item.area ? [[L("Površina", "Area", "Fläche"), `${item.area} m²`]] as [string, string][] : []),
    ...(item.land_area ? [[L("Plac", "Land", "Grundstück"), `${item.land_area} ari`]] as [string, string][] : []),
    ...(item.rooms ? [[L("Sobe", "Rooms", "Zimmer"), String(item.rooms)]] as [string, string][] : []),
    ...(item.city ? [[L("Lokacija", "Location", "Lage"), [item.city, item.municipality].filter(Boolean).join(", ")]] as [string, string][] : []),
  ];

  const ld = {
    "@context": "https://schema.org", "@type": "RealEstateListing",
    name: item.title, ...(item.description ? { description: item.description } : {}),
    ...(item.image ? { image: item.image } : {}),
    ...(item.price != null ? { offers: { "@type": "Offer", price: item.price, priceCurrency: "EUR", availability: "https://schema.org/InStock" } } : {}),
    ...(item.city ? { address: { "@type": "PostalAddress", addressLocality: item.city, addressCountry: "RS" } } : {}),
  };

  return (
    <>
      <JsonLd data={ld} />
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: L("Nekretnine", "Real estate", "Immobilien"), href: nekretnineIndexPath(lang) }, ...(pc ? [{ name: propTypeLabel(pc, lang), href: propTypePath(pc, lang) }] : []), { name: item.title }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50, display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 28, alignItems: "start" }}>
        <div>
          <span className="tag" style={{ background: "transparent", border: "1px solid var(--green-600)", color: "var(--green-700)" }}>{dealKindLabel(item.deal_type, lang)} · {pc ? propTypeLabel(pc, lang) : ""}</span>
          <h1 style={{ margin: "10px 0 6px" }}>{item.title}</h1>
          <div style={{ color: "var(--slate)" }}>{[item.address, item.city, item.municipality].filter(Boolean).join(" · ")}</div>

          {gallery.length > 0 && (
            <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", borderRadius: 14, overflow: "hidden", marginTop: 16 }}>
              <Image fill sizes="(max-width:1024px) 100vw, 700px" src={gallery[0]} alt={item.title} style={{ objectFit: "cover" }} />
            </div>
          )}
          {gallery.length > 1 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))", gap: 8, marginTop: 8 }}>
              {gallery.slice(1, 9).map((g, i) => (
                <div key={i} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 8, overflow: "hidden" }}>
                  <Image fill sizes="120px" src={g} alt={`${item.title} ${i + 2}`} style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}

          <h2 style={{ marginTop: 26 }}>{L("Detalji", "Details", "Details")}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 10, marginTop: 10 }}>
            {specs.map(([k, v], i) => (
              <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 10, padding: "10px 12px" }}>
                <div style={{ fontSize: ".78rem", color: "var(--slate)" }}>{k}</div>
                <div style={{ fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>

          {item.description && (<>
            <h2 style={{ marginTop: 26 }}>{L("Opis", "Description", "Beschreibung")}</h2>
            <p style={{ lineHeight: 1.75, whiteSpace: "pre-line", color: "var(--ink)" }}>{item.description}</p>
          </>)}

          {item.lat != null && item.lng != null && (<>
            <h2 style={{ marginTop: 26 }}>{L("Lokacija", "Location", "Lage")}</h2>
            <iframe title="map" style={{ width: "100%", height: 320, border: 0, borderRadius: 12, marginTop: 8 }} loading="lazy"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${item.lng - 0.01}%2C${item.lat - 0.01}%2C${item.lng + 0.01}%2C${item.lat + 0.01}&layer=mapnik&marker=${item.lat}%2C${item.lng}`} />
          </>)}
        </div>

        <aside className="booking" style={{ position: "sticky", top: 90 }}>
          {item.price != null && <div className="price-lg">{eur(item.price)}{item.deal_type === "najam" ? <small> / {L("mesec", "month", "Monat")}</small> : null}</div>}
          <h3 style={{ marginTop: 6 }}>{L("Kontakt", "Contact", "Kontakt")}</h3>
          <p style={{ color: "var(--slate)", fontSize: ".9rem" }}>{L("Javite se direktno oglašivaču.", "Contact the advertiser directly.", "Kontaktieren Sie den Anbieter direkt.")}</p>
          {item.phone && (
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <a className="btn btn--primary" style={{ flex: 1 }} href={`tel:${item.phone}`}>📞 {L("Pozovi", "Call", "Anrufen")}</a>
              <a className="btn btn--outline" style={{ flex: 1 }} href={`viber://chat?number=${encodeURIComponent(item.phone)}`}>Viber</a>
            </div>
          )}
          {item.email && <a className="btn btn--outline btn--block" style={{ marginTop: 8 }} href={`mailto:${item.email}`}>✉️ Email</a>}
          <Link className="btn btn--ghost btn--block" style={{ marginTop: 10 }} href={nekretnineIndexPath(lang)}>← {L("Sve nekretnine", "All real estate", "Alle Immobilien")}</Link>
        </aside>
      </div>
    </>
  );
}
