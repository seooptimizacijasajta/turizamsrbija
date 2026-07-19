"use client";
import { Listing, Kind } from "@/lib/types";
import type { Banner } from "@/lib/banners";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import SectionSEO from "./SectionSEO";
import Link from "next/link";
import { guidesForKind, blogHref } from "@/lib/guides";
import Breadcrumbs, { NAVKEY } from "./Breadcrumbs";
import { homePath } from "@/lib/slug";

const HERO: Record<Kind, { title: string; lead: string; bg: string }> = {
  mountain: { title: "nav_mountains", lead: "lead_mountain", bg: "1551524559-8af4e6624178" },
  lake: { title: "nav_lakes", lead: "lead_lake", bg: "1439066615861-d1af74d74000" },
  river: { title: "nav_rivers", lead: "lead_river", bg: "1437482078695-73f5ca6c96e2" },
  monastery: { title: "nav_monasteries", lead: "lead_monastery", bg: "1548013146-72479768bada" },
  spa: { title: "nav_spas", lead: "lead_spa", bg: "1540555700478-4be289fbecef" },
  ethno: { title: "nav_ethno", lead: "lead_ethno", bg: "1518780664697-55e3ad937233" },
  stay: { title: "nav_stays", lead: "lead_stay", bg: "1566073771259-6a8506099945" },
};

export default function SectionPage({ items, kind, banners = [] }: { items: Listing[]; kind: Kind; banners?: Banner[] }) {
  const { t, lang } = useLang();
  const h = HERO[kind];
  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: `linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-${h.bg}?auto=format&fit=crop&w=1600&q=80')` }}
      >
        <div className="container"><h1>{t(h.title)}</h1><p>{t(h.lead)}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t(NAVKEY[kind]) }]} /></div>
      <SectionExplorer items={items} kind={kind} banners={banners} />
      <SectionSEO kind={kind} />
      {guidesForKind(kind).length > 0 && (
        <section className="section section--soft"><div className="container" style={{ maxWidth: 820 }}>
          <h2 className="section-title" style={{ marginBottom: 16 }}>{lang !== "sr" ? "Destination guides" : "Vodiči za destinacije"}</h2>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", listStyle: "none", padding: 0 }}>
            {guidesForKind(kind).map((g) => (
              <li key={g.slug}><Link href={blogHref(g.slug, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>→ {lang !== "sr" ? g.en : g.sr}</Link></li>
            ))}
          </ul>
        </div></section>
      )}
    </>
  );
}
