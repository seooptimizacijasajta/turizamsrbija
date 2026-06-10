"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import BelgradeSEO from "./BelgradeSEO";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";

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
      <BelgradeSEO />
    </>
  );
}
