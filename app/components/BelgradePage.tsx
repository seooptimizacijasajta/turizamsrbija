"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";

export default function BelgradePage({ items }: { items: Listing[] }) {
  const { t, lang } = useLang();
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container">
          <h1>{t("nav_belgrade")}</h1>
          <p>{lang === "en" ? "Apartments across Belgrade's municipalities." : "Apartmani po svim beogradskim opštinama."}</p>
        </div>
      </section>
      <SectionExplorer items={items} kind="stay" />
    </>
  );
}
