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
  if (!c) return { title: "Real estate — Turizam Srbija" };
  const alt = { "sr-Latn-RS": `/nekretnine/${c.srSlug}`, en: `/en/real-estate/${c.enSlug}`, de: `/de/immobilien/${c.enSlug}`, "x-default": `/nekretnine/${c.srSlug}` };
  return {
    title: `${c.en} in Serbia — for sale and rent | Turizam Srbija`,
    description: `${c.en} in Serbia — listings for sale and rent, with prices, area, location and the advertiser's contact.`,
    alternates: { canonical: `/en/real-estate/${c.enSlug}`, languages: alt },
    openGraph: { title: `${c.en} in Serbia`, images: [`/api/og?title=${encodeURIComponent(c.en)}&subtitle=${encodeURIComponent("Real estate in Serbia")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = propTypeBySlug(slug);
  if (!c) notFound();
  const properties = await getProperties();
  return <NekretninePage properties={properties} type={c.key} />;
}
