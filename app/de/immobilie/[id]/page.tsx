import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "@/app/components/PropertyDetail";
import { getPropertyById } from "@/lib/properties";
import { propTypeByKey, dealKindLabel } from "@/lib/nekretnine";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getPropertyById(id);
  if (!p) return { title: "Immobilien — Turizam Srbija" };
  const c = propTypeByKey(p.property_type);
  const desc = (p.description || `${dealKindLabel(p.deal_type, "de")} — ${[c?.de, p.city, p.area ? p.area + " m²" : ""].filter(Boolean).join(", ")}`).slice(0, 160);
  const alt = { "sr-Latn-RS": `/nekretnina/${p.id}`, en: `/en/property/${p.id}`, de: `/de/immobilie/${p.id}`, "x-default": `/nekretnina/${p.id}` };
  return {
    title: `${p.title} — ${p.city || "Serbien"} | Immobilien`,
    description: desc,
    alternates: { canonical: `/de/immobilie/${p.id}`, languages: alt },
    openGraph: { title: p.title, description: desc, type: "article", ...(p.image ? { images: [p.image] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPropertyById(id);
  if (!p) notFound();
  return <PropertyDetail item={p} />;
}
