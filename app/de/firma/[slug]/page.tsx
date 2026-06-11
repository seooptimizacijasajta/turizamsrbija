import { getBusinesses } from "@/lib/businesses";
import BusinessDetail from "@/app/components/BusinessDetail";
import { bizSlug } from "@/lib/firme";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getBusinesses(); const b = all.find((x) => bizSlug(x.name) === slug);
  if (!b) return { title: "Firma — Turizam Srbija" };
  return { title: `${b.name}${b.city ? " — " + b.city : ""} | Turizam Srbija`, description: (b.desc.de || b.desc.en || b.name).slice(0, 160), alternates: { canonical: `/de/firma/${slug}`, languages: { "sr-Latn-RS": `/firma/${slug}`, en: `/en/business/${slug}`, de: `/de/firma/${slug}`, "x-default": `/firma/${slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getBusinesses(); const b = all.find((x) => bizSlug(x.name) === slug); if (!b) notFound();
  return <BusinessDetail b={b} />;
}
