import type { Metadata } from "next";
import StayTypePage from "@/app/components/StayTypePage";
import { stayTypeByKey, stayTypeName, stayTypeLead, filterByStayType } from "@/lib/stayTypes";
import { getListings } from "@/lib/data";

export const revalidate = 60;
const ST = stayTypeByKey('kuca')!;
const ALT = { "sr-Latn-RS": "/kuce-za-izdavanje", en: "/en/houses-for-rent", de: "/de/haeuser-zur-miete", "x-default": "/kuce-za-izdavanje" };

export function generateMetadata(): Metadata {
  const name = stayTypeName(ST, 'en');
  const lead = stayTypeLead(ST, 'en');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/en/houses-for-rent", languages: ALT },
    openGraph: { title, description: lead, images: [ST.hero] },
  };
}

export default async function Page() {
  const all = await getListings();
  return <StayTypePage st={ST} items={filterByStayType(all, ST)} />;
}
