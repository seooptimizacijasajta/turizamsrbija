import type { Metadata } from "next";
import NekretninePage from "@/app/components/NekretninePage";
import { getProperties } from "@/lib/properties";

const ALT = { "sr-Latn-RS": "/nekretnine", en: "/en/real-estate", de: "/de/immobilien", "x-default": "/nekretnine" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Nekretnine u Srbiji — prodaja i izdavanje | Turizam Srbija",
  description: "Oglasi za nekretnine u Srbiji: stanovi, kuće, placevi, seoska domaćinstva i poslovni prostor — prodaja i dugoročno izdavanje, sa cenama i kontaktom.",
  alternates: { canonical: "/nekretnine", languages: ALT },
  openGraph: { title: "Nekretnine u Srbiji", description: "Prodaja i izdavanje nekretnina širom Srbije.", images: [`/api/og?title=${encodeURIComponent("Nekretnine")}&subtitle=${encodeURIComponent("Prodaja i izdavanje u Srbiji")}`] },
};

export default async function Page() {
  const properties = await getProperties();
  return <NekretninePage properties={properties} />;
}
