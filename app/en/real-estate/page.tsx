import type { Metadata } from "next";
import NekretninePage from "@/app/components/NekretninePage";
import { getProperties } from "@/lib/properties";

const ALT = { "sr-Latn-RS": "/nekretnine", en: "/en/real-estate", de: "/de/immobilien", "x-default": "/nekretnine" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Real estate in Serbia — for sale and rent | Turizam Srbija",
  description: "Property listings in Serbia: apartments, houses, land, village estates and commercial property — for sale and long-term rent, with prices and contacts.",
  alternates: { canonical: "/en/real-estate", languages: ALT },
  openGraph: { title: "Real estate in Serbia", description: "Property for sale and rent across Serbia.", images: [`/api/og?title=${encodeURIComponent("Real estate")}&subtitle=${encodeURIComponent("For sale and rent in Serbia")}`] },
};

export default async function Page() {
  const properties = await getProperties();
  return <NekretninePage properties={properties} />;
}
