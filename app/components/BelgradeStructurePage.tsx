"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import Breadcrumbs from "./Breadcrumbs";
import { homePath, belgradePath } from "@/lib/slug";
import { Struct, structLabel } from "@/lib/structure";

export default function BelgradeStructurePage({ items, struct }: { items: Listing[]; struct: Struct }) {
  const { lang, t } = useLang();
  const name = structLabel(struct, lang);
  const h = lang === "sr" ? `${name} apartmani Beograd` : lang === "de" ? `${name}-Apartments Belgrad` : `${name} apartments Belgrade`;
  const lead = lang === "sr"
    ? `${name} apartmani i stan na dan u Beogradu — proveren smeštaj, bez provizije za gosta.`
    : lang === "de"
    ? `${name}-Apartments und Tagesmiete in Belgrad — geprüfte Unterkünfte, ohne Gästeprovision.`
    : `${name} apartments and daily rentals in Belgrade — verified stays, no guest commission.`;
  const intro = lang === "sr"
    ? `Tražite ${name.toLowerCase()} apartman u Beogradu? Ovde pronađite ${name.toLowerCase()} apartmane i stanove na dan širom Beograda — sa fotografijama, lokacijom na mapi i direktnim kontaktom vlasnika. Idealno za turiste, parove, porodice i poslovne goste, po boljoj ceni od hotela.`
    : lang === "de"
    ? `Sie suchen ein ${name}-Apartment in Belgrad? Hier finden Sie ${name}-Apartments und Tagesmiete in ganz Belgrad — mit Fotos, Kartenstandort und direktem Kontakt zum Gastgeber.`
    : `Looking for a ${name.toLowerCase()} apartment in Belgrade? Find ${name.toLowerCase()} apartments and daily rentals across Belgrade — with photos, map location and direct host contact.`;

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{h}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_belgrade"), href: belgradePath(lang) }, { name }]} /></div>
      {items.length ? <SectionExplorer items={items} kind="stay" /> : (
        <div className="container"><div className="empty" style={{ margin: "20px 0" }}>{lang === "sr" ? `Trenutno nema ${name.toLowerCase()} apartmana. Uskoro!` : lang === "de" ? `Derzeit keine ${name}-Apartments.` : `No ${name.toLowerCase()} apartments yet.`}</div></div>
      )}
      <section className="section"><div className="container" style={{ maxWidth: 820 }}><div className="prose"><p>{intro}</p></div></div></section>
    </>
  );
}
