import type { Metadata } from "next";
import StayTypePage from "@/app/components/StayTypePage";
import { stayTypeByKey, stayTypeName, stayTypeLead, filterByStayType } from "@/lib/stayTypes";
import { getListings } from "@/lib/data";

export const revalidate = 60;
const ST = stayTypeByKey('seosko')!;
const ALT = { "sr-Latn-RS": "/seoski-turizam", en: "/en/rural-tourism", de: "/de/landtourismus", "x-default": "/seoski-turizam" };

export function generateMetadata(): Metadata {
  const name = stayTypeName(ST, 'en');
  const lead = stayTypeLead(ST, 'en');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/en/rural-tourism", languages: ALT },
    openGraph: { title, description: lead, images: [ST.hero] },
  };
}

export default async function Page() {
  const all = await getListings();
  return <StayTypePage st={ST} items={filterByStayType(all, ST)} />;
}
