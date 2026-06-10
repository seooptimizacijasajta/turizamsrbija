"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import BelgradeSEO from "./BelgradeSEO";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
import { homePath, belgradePath } from "@/lib/slug";
import { BG_AREAS, bgAreaLabel, bgAreaPath } from "@/lib/belgrade";
import { STRUCTURES, structLabel, structPath } from "@/lib/structure";
import { amenityPath } from "@/lib/amenities";
import { BG_INFO, bgInfoPath, bgInfoTitle } from "@/lib/bgInfo";

export default function BelgradePage({ items }: { items: Listing[] }) {
  const { t, lang } = useLang();
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container">
          <h1>{t("nav_belgrade")}</h1>
          <p>{lang !== "sr" ? "Apartments across Belgrade's municipalities." : "Apartmani po svim beogradskim opštinama."}</p>
        </div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_belgrade") }]} /></div>
      <SectionExplorer items={items} kind="stay" />
      <section className="section section--soft"><div className="container" style={{ maxWidth: 820 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>{lang === "sr" ? "Apartmani po naseljima Beograda" : lang === "de" ? "Apartments nach Belgrader Stadtteilen" : "Apartments by Belgrade district"}</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", listStyle: "none", padding: 0 }}>
          {BG_AREAS.map((a) => (
            <li key={a.slug}><Link href={bgAreaPath(a.slug, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>{bgAreaLabel(a, lang)}</Link></li>
          ))}
        </ul>
      </div></section>
      <section className="section"><div className="container" style={{ maxWidth: 820 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>{lang === "sr" ? "Apartmani po strukturi" : lang === "de" ? "Apartments nach Struktur" : "Apartments by structure"}</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", listStyle: "none", padding: 0 }}>
          {STRUCTURES.map((st) => (
            <li key={st.key}><Link href={structPath(st.slug, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>{structLabel(st, lang)}</Link></li>
          ))}
        </ul>
      </div></section>
      {(() => {
        const sr = lang === "sr", de = lang === "de";
        const kw: { l: string; h: string }[] = [
          { l: sr ? "Stan na dan Beograd" : de ? "Tagesmiete Belgrad" : "Daily rentals Belgrade", h: belgradePath(lang) },
          { l: sr ? "Studio apartmani Beograd" : de ? "Studio-Apartments Belgrad" : "Studio apartments Belgrade", h: structPath("studio", lang) },
          { l: sr ? "Jednosobni apartmani Beograd" : de ? "Ein-Zimmer Belgrad" : "One-bedroom Belgrade", h: structPath("jednosobni", lang) },
          { l: sr ? "Dvosobni apartmani Beograd" : de ? "Zwei-Zimmer Belgrad" : "Two-bedroom Belgrade", h: structPath("dvosobni", lang) },
          { l: sr ? "Apartmani Beograd Vračar" : de ? "Apartments Vračar" : "Apartments Vračar", h: bgAreaPath("vracar", lang) },
          { l: sr ? "Apartmani Beograd Centar" : de ? "Apartments Zentrum" : "Apartments City Centre", h: bgAreaPath("stari-grad", lang) },
          { l: sr ? "Apartmani Novi Beograd" : de ? "Apartments Neu-Belgrad" : "Apartments New Belgrade", h: bgAreaPath("novi-beograd", lang) },
          { l: sr ? "Apartmani sa đakuzijem" : de ? "Apartments mit Whirlpool" : "Apartments with jacuzzi", h: amenityPath("jacuzzi", lang) },
          { l: sr ? "Luksuzni apartmani Beograd" : de ? "Luxus-Apartments Belgrad" : "Luxury apartments Belgrade", h: amenityPath("luxury", lang) },
          { l: sr ? "Spa apartmani Beograd" : de ? "Spa-Apartments Belgrad" : "Spa apartments Belgrade", h: amenityPath("wellness", lang) },
          { l: sr ? "Apartmani koji primaju vaučere" : de ? "Apartments mit Gutschein" : "Apartments accepting vouchers", h: amenityPath("vouchers", lang) },
        ];
        return (
          <section className="section section--soft"><div className="container" style={{ maxWidth: 820 }}>
            <h2 className="section-title" style={{ marginBottom: 16 }}>{sr ? "Popularne pretrage" : de ? "Beliebte Suchen" : "Popular searches"}</h2>
            <div className="kw-cloud" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {kw.map((k) => <Link key={k.l} href={k.h} className="kw-chip">{k.l}</Link>)}
            </div>
          </div></section>
        );
      })()}
      <section className="section"><div className="container" style={{ maxWidth: 820 }}>
        <h2 className="section-title" style={{ marginBottom: 16 }}>{lang === "sr" ? "Korisno za goste Beograda" : lang === "de" ? "Nützlich für Belgrad-Besucher" : "Useful for Belgrade visitors"}</h2>
        <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", listStyle: "none", padding: 0 }}>
          {BG_INFO.map((x) => (
            <li key={x.slug}><Link href={bgInfoPath(x, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>{x.icon} {bgInfoTitle(x, lang)}</Link></li>
          ))}
        </ul>
      </div></section>
      <BelgradeSEO />
    </>
  );
}
