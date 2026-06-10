"use client";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import SectionExplorer from "./SectionExplorer";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import { amenityByKey } from "@/lib/amenities";

const HERO: Record<string, string> = {
  vouchers: "1501785888041-af3ef285b470",
  pool: "1566073771259-6a8506099945",
  pet: "1450778869180-41d0601e046e",
  kids: "1476234251651-f353703a034d",
  wellness: "1540555700478-4be289fbecef",
};

export default function AmenityPage({ items, amenityKey }: { items: Listing[]; amenityKey: string }) {
  const { lang, t } = useLang();
  const a = amenityByKey(amenityKey);
  const title = a ? (lang !== "sr" ? a.en : a.sr) : "";
  const bg = HERO[amenityKey] || "1566073771259-6a8506099945";
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: `linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-${bg}?auto=format&fit=crop&w=1600&q=80')` }}>
        <div className="container"><h1>{a?.icon} {title}</h1><p>{lang !== "sr" ? `Accommodation across Serbia: ${title}.` : `Smeštaj širom Srbije: ${title}.`}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: title }]} /></div>
      <SectionExplorer items={items} kind="stay" />
    </>
  );
}
