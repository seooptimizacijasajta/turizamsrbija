import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NekretninePage from "@/app/components/NekretninePage";
import { getProperties } from "@/lib/properties";
import { PROP_TYPES, propTypeBySlug } from "@/lib/nekretnine";

export const revalidate = 60;
export function generateStaticParams() { return PROP_TYPES.map((c) => ({ slug: c.enSlug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = propTypeBySlug(slug);
  if (!c) return { title: "Immobilien — Turizam Srbija" };
  const alt = { "sr-Latn-RS": `/nekretnine/${c.srSlug}`, en: `/en/real-estate/${c.enSlug}`, de: `/de/immobilien/${c.enSlug}`, "x-default": `/nekretnine/${c.srSlug}` };
  return {
    title: `${c.de} in Serbien — Verkauf und Vermietung | Turizam Srbija`,
    description: `${c.de} in Serbien — Anzeigen zum Verkauf und zur Miete, mit Preisen, Fläche, Lage und Kontakt des Anbieters.`,
    alternates: { canonical: `/de/immobilien/${c.enSlug}`, languages: alt },
    openGraph: { title: `${c.de} in Serbien`, images: [`/api/og?title=${encodeURIComponent(c.de)}&subtitle=${encodeURIComponent("Immobilien in Serbien")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = propTypeBySlug(slug);
  if (!c) notFound();
  const properties = await getProperties();
  return <NekretninePage properties={properties} type={c.key} />;
}
