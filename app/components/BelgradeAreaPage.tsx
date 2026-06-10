"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import Breadcrumbs from "./Breadcrumbs";
import { homePath, belgradePath } from "@/lib/slug";
import { BgArea, bgAreaLabel } from "@/lib/belgrade";

export default function BelgradeAreaPage({ items, area }: { items: Listing[]; area: BgArea }) {
  const { lang, t } = useLang();
  const name = bgAreaLabel(area, lang);
  const h = lang === "sr" ? `Apartmani Beograd ${name}` : lang === "de" ? `Apartments Belgrad ${name}` : `Belgrade apartments ${name}`;
  const lead = lang === "sr"
    ? `Stan na dan i apartmani u naselju ${name} — proveren smeštaj, bez provizije za gosta.`
    : lang === "de"
    ? `Tagesmiete und Apartments im Stadtteil ${name} — geprüfte Unterkünfte, ohne Gästeprovision.`
    : `Daily rentals and apartments in ${name} — verified stays, no guest commission.`;
  const intro = lang === "sr"
    ? `Tražite apartman u beogradskom naselju ${name}? Ovde pronađite stan na dan, studio i prostranije apartmane u kraju ${name} — sa fotografijama, lokacijom na mapi i direktnim kontaktom vlasnika. Idealno za turiste, poslovne goste i kratak boravak, uz bolju cenu od hotela i bez skrivenih troškova.`
    : lang === "de"
    ? `Sie suchen ein Apartment im Belgrader Stadtteil ${name}? Hier finden Sie Tagesmiete, Studios und größere Apartments in ${name} — mit Fotos, Kartenstandort und direktem Kontakt zum Gastgeber.`
    : `Looking for an apartment in the Belgrade district of ${name}? Find daily rentals, studios and larger apartments in ${name} — with photos, map location and direct host contact.`;

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{h}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_belgrade"), href: belgradePath(lang) }, { name }]} /></div>
      {items.length ? <SectionExplorer items={items} kind="stay" /> : (
        <div className="container"><div className="empty" style={{ margin: "20px 0" }}>{lang === "sr" ? `Trenutno nema oglasa za ${name}. Uskoro!` : lang === "de" ? `Derzeit keine Angebote für ${name}.` : `No listings for ${name} yet.`}</div></div>
      )}
      <section className="section"><div className="container" style={{ maxWidth: 820 }}><div className="prose"><p>{intro}</p></div></div></section>
    </>
  );
}
