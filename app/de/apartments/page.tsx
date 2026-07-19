import type { Metadata } from "next";
import StayTypePage from "@/app/components/StayTypePage";
import { stayTypeByKey, stayTypeName, stayTypeLead, filterByStayType } from "@/lib/stayTypes";
import { getListings } from "@/lib/data";

export const revalidate = 60;
const ST = stayTypeByKey('apartman')!;
const ALT = { "sr-Latn-RS": "/apartmani", en: "/en/apartments", de: "/de/apartments", "x-default": "/apartmani" };

export function generateMetadata(): Metadata {
  const name = stayTypeName(ST, 'de');
  const lead = stayTypeLead(ST, 'de');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/de/apartments", languages: ALT },
    openGraph: { title, description: lead, images: [ST.hero] },
  };
}

export default async function Page() {
  const all = await getListings();
  return <StayTypePage st={ST} items={filterByStayType(all, ST)} />;
}
