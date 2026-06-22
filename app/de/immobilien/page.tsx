import type { Metadata } from "next";
import NekretninePage from "@/app/components/NekretninePage";
import { getProperties } from "@/lib/properties";

const ALT = { "sr-Latn-RS": "/nekretnine", en: "/en/real-estate", de: "/de/immobilien", "x-default": "/nekretnine" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Immobilien in Serbien — Verkauf und Vermietung | Turizam Srbija",
  description: "Immobilienanzeigen in Serbien: Wohnungen, Häuser, Grundstücke, Landgüter und Gewerbe — zum Verkauf und zur langfristigen Vermietung, mit Preisen und Kontakt.",
  alternates: { canonical: "/de/immobilien", languages: ALT },
  openGraph: { title: "Immobilien in Serbien", description: "Immobilien zum Verkauf und zur Miete in ganz Serbien.", images: [`/api/og?title=${encodeURIComponent("Immobilien")}&subtitle=${encodeURIComponent("Verkauf und Vermietung in Serbien")}`] },
};

export default async function Page() {
  const properties = await getProperties();
  return <NekretninePage properties={properties} />;
}
