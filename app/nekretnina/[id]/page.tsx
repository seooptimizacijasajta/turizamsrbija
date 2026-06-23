import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "@/app/components/PropertyDetail";
import { getPropertyBySlug } from "@/lib/properties";
import { propTypeByKey, dealKindLabel, propertyPath } from "@/lib/nekretnine";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getPropertyBySlug(id);
  if (!p) return { title: "Nekretnine — Turizam Srbija" };
  const c = propTypeByKey(p.property_type);
  const desc = (p.description || `${dealKindLabel(p.deal_type, "sr")} — ${[c?.sr, p.city, p.area ? p.area + " m²" : ""].filter(Boolean).join(", ")}`).slice(0, 160);
  const alt = { "sr-Latn-RS": propertyPath(p, "sr"), en: propertyPath(p, "en"), de: propertyPath(p, "de"), "x-default": propertyPath(p, "sr") };
  return {
    title: `${p.title} — ${p.city || "Srbija"} | Nekretnine`,
    description: desc,
    alternates: { canonical: propertyPath(p, "sr"), languages: alt },
    openGraph: { title: p.title, description: desc, type: "article", ...(p.image ? { images: [p.image] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPropertyBySlug(id);
  if (!p) notFound();
  return <PropertyDetail item={p} />;
}
