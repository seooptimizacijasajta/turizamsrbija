import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyDetail from "@/app/components/PropertyDetail";
import { getPropertyByParam } from "@/lib/properties";
import { propTypeByKey, dealKindLabel, propertyPath } from "@/lib/nekretnine";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const p = await getPropertyByParam(id);
  if (!p) return { title: "Real estate — Turizam Srbija" };
  const c = propTypeByKey(p.property_type);
  const desc = (p.description || `${dealKindLabel(p.deal_type, "en")} — ${[c?.en, p.city, p.area ? p.area + " m²" : ""].filter(Boolean).join(", ")}`).slice(0, 160);
  const alt = { "sr-Latn-RS": propertyPath(p, "sr"), en: propertyPath(p, "en"), de: propertyPath(p, "de"), "x-default": propertyPath(p, "sr") };
  return {
    title: `${p.title} — ${p.city || "Serbia"} | Real estate`,
    description: desc,
    alternates: { canonical: propertyPath(p, "en"), languages: alt },
    openGraph: { title: p.title, description: desc, type: "article", ...(p.image ? { images: [p.image] } : {}) },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPropertyByParam(id);
  if (!p) notFound();
  return <PropertyDetail item={p} />;
}
