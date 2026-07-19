import type { Metadata } from "next";
import StayTypePage from "@/app/components/StayTypePage";
import { stayTypeByKey, stayTypeName, stayTypeLead, filterByStayType } from "@/lib/stayTypes";
import { getListings } from "@/lib/data";

export const revalidate = 60;
const ST = stayTypeByKey('hotel')!;
const ALT = { "sr-Latn-RS": "/hoteli", en: "/en/hotels", de: "/de/hotels", "x-default": "/hoteli" };

export function generateMetadata(): Metadata {
  const name = stayTypeName(ST, 'sr');
  const lead = stayTypeLead(ST, 'sr');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/hoteli", languages: ALT },
    openGraph: { title, description: lead, images: [ST.hero] },
  };
}

export default async function Page() {
  const all = await getListings();
  return <StayTypePage st={ST} items={filterByStayType(all, ST)} />;
}
