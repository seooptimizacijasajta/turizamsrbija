"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import { BLOG_CATS, catName, catPath } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";

export default function TopicsIndex({ counts }: { counts: Record<string, number> }) {
  const { lang, t } = useLang();
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const heroImg = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80";
  const abroad = BLOG_CATS.filter((c) => c.country);
  const rest = BLOG_CATS.filter((c) => !c.country);

  const card = (c: (typeof BLOG_CATS)[number]) => (
    <Link key={c.id} href={catPath(c, lang)}
      style={{ display: "block", border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", background: "#fff", color: "inherit" }}>
      <h3 style={{ margin: "0 0 6px" }}>{c.country ? `${c.country.flag} ` : ""}{catName(c, lang)}</h3>
      <p style={{ margin: 0, lineHeight: 1.7, color: "var(--ink)", fontSize: ".95rem" }}>{tri(c.lead, lang)}</p>
      <span style={{ display: "inline-block", marginTop: 8, fontSize: 13, color: "var(--muted)" }}>
        {counts[c.id] ?? 0} {L("tekstova", "articles", "Beiträge")}
      </span>
    </Link>
  );

  return (
    <>
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${heroImg}') center/cover no-repeat` }}>
        <div className="container">
          <h1>{L("Teme i kategorije", "Topics & categories", "Themen & Kategorien")}</h1>
          <p>{L("Sve teme portala na jednom mestu — destinacije u inostranstvu, gastronomija, manastiri, agencije, prevoz i saveti.",
                "All topics in one place — destinations abroad, food, monasteries, agencies, transport and travel tips.",
                "Alle Themen an einem Ort — Ziele im Ausland, Gastronomie, Klöster, Reisebüros, Transport und Tipps.")}</p>
        </div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: L("Teme", "Topics", "Themen") }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <h2 className="section-title" style={{ marginTop: 8 }}>{L("Destinacije u inostranstvu", "Destinations abroad", "Ziele im Ausland")}</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", marginTop: 12 }}>
          {abroad.map(card)}
        </div>
        <h2 className="section-title" style={{ marginTop: 30 }}>{L("Ostale teme", "Other topics", "Weitere Themen")}</h2>
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", marginTop: 12 }}>
          {rest.map(card)}
        </div>
      </div>
    </>
  );
}
