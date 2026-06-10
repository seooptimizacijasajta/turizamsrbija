"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import BelgradeSEO from "./BelgradeSEO";
import Breadcrumbs from "./Breadcrumbs";
import Link from "next/link";
import { homePath } from "@/lib/slug";
import { BG_AREAS, bgAreaLabel, bgAreaPath } from "@/lib/belgrade";
import { STRUCTURES, structLabel, structPath } from "@/lib/structure";

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
      <BelgradeSEO />
    </>
  );
}
