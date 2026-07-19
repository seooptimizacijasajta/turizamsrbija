"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import ListingCard from "./ListingCard";
import JsonLd from "./JsonLd";
import { homePath, sectionPath } from "@/lib/slug";
import { STAY_TYPES, stayTypeName, stayTypeLead, stayTypePath, stayTypeSeo, type StayType } from "@/lib/stayTypes";
import { amenityPath } from "@/lib/amenities";
import { MESTA, mestoName, apartmentsCityPath } from "@/lib/apartmanMesta";
import type { Listing } from "@/lib/types";

export default function StayTypePage({ st, items }: { st: StayType; items: Listing[] }) {
  const { lang, t } = useLang();
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const name = stayTypeName(st, lang);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description: stayTypeLead(st, lang),
    numberOfItems: items.length,
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${st.hero}') center/cover no-repeat` }}>
        <div className="container"><h1>{name}</h1><p>{stayTypeLead(st, lang)}</p></div>
      </section>

      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_stays"), href: sectionPath("stay", lang) }, { name }]} />
      </div>

      <div className="container" style={{ paddingBottom: 50 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "10px 0 18px" }}>
          {STAY_TYPES.filter((x) => x.key !== st.key).map((x) => (
            <Link key={x.key} href={stayTypePath(x, lang)} className="amen-chip on">{stayTypeName(x, lang)}</Link>
          ))}
          <Link href={amenityPath("pool", lang)} className="amen-chip on">🏊 {L("Sa bazenom", "With pool", "Mit Pool")}</Link>
          <Link href={amenityPath("vouchers", lang)} className="amen-chip on">🎟️ {L("Prima vaučere", "Accepts vouchers", "Gutscheine")}</Link>
        </div>

        {items.length > 0 ? (
          <div className="card-grid">{items.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        ) : (
          <p style={{ color: "var(--muted)" }}>
            {L("Trenutno nema oglasa u ovoj kategoriji. Vi ste vlasnik? Dodajte svoj objekat besplatno.",
               "There are no listings in this category yet. Are you an owner? Add your property for free.",
               "Derzeit keine Angebote in dieser Kategorie. Sie sind Eigentümer? Fügen Sie Ihr Objekt kostenlos hinzu.")}
          </p>
        )}

        {st.key === "apartman" && (
          <section style={{ marginTop: 30 }}>
            <h2 className="section-title">{L("Apartmani po mestima", "Apartments by destination", "Apartments nach Orten")}</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
              {MESTA.map((m) => (
                <Link key={m.slug} href={apartmentsCityPath(m.slug, lang)} className="amen-chip on">
                  {L("Apartmani", "Apartments", "Apartments")} {mestoName(m, lang)}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section style={{ marginTop: 34, maxWidth: 840 }}>
          {stayTypeSeo(st, lang).map((p, i) => (
            <p key={i} style={{ lineHeight: 1.85, color: "var(--ink)" }}>{p}</p>
          ))}
        </section>
      </div>
    </>
  );
}
