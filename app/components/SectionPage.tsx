"use client";
import { Listing, Kind } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";

const HERO: Record<Kind, { title: string; lead: string; bg: string }> = {
  mountain: { title: "nav_mountains", lead: "lead_mountain", bg: "1551524559-8af4e6624178" },
  lake: { title: "nav_lakes", lead: "lead_lake", bg: "1439066615861-d1af74d74000" },
  spa: { title: "nav_spas", lead: "lead_spa", bg: "1540555700478-4be289fbecef" },
  ethno: { title: "nav_ethno", lead: "lead_ethno", bg: "1518780664697-55e3ad937233" },
  stay: { title: "nav_stays", lead: "lead_stay", bg: "1566073771259-6a8506099945" },
};

export default function SectionPage({ items, kind }: { items: Listing[]; kind: Kind }) {
  const { t } = useLang();
  const h = HERO[kind];
  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: `linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-${h.bg}?auto=format&fit=crop&w=1600&q=80')` }}
      >
        <div className="container"><h1>{t(h.title)}</h1><p>{t(h.lead)}</p></div>
      </section>
      <SectionExplorer items={items} kind={kind} />
    </>
  );
}
