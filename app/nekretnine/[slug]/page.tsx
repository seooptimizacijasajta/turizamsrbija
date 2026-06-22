import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NekretninePage from "@/app/components/NekretninePage";
import { getProperties } from "@/lib/properties";
import { PROP_TYPES, propTypeBySlug } from "@/lib/nekretnine";

export const revalidate = 60;
export function generateStaticParams() { return PROP_TYPES.map((c) => ({ slug: c.srSlug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = propTypeBySlug(slug);
  if (!c) return { title: "Nekretnine — Turizam Srbija" };
  const alt = { "sr-Latn-RS": `/nekretnine/${c.srSlug}`, en: `/en/real-estate/${c.enSlug}`, de: `/de/immobilien/${c.enSlug}`, "x-default": `/nekretnine/${c.srSlug}` };
  return {
    title: `${c.sr} u Srbiji — prodaja i izdavanje | Turizam Srbija`,
    description: `${c.sr} u Srbiji — oglasi za prodaju i izdavanje, sa cenama, kvadraturom, lokacijom i kontaktom oglašivača.`,
    alternates: { canonical: `/nekretnine/${c.srSlug}`, languages: alt },
    openGraph: { title: `${c.sr} u Srbiji`, images: [`/api/og?title=${encodeURIComponent(c.sr)}&subtitle=${encodeURIComponent("Nekretnine u Srbiji")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = propTypeBySlug(slug);
  if (!c) notFound();
  const properties = await getProperties();
  return <NekretninePage properties={properties} type={c.key} />;
}
