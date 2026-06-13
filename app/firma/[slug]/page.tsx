import { getBusinesses } from "@/lib/businesses";
import BusinessDetail from "@/app/components/BusinessDetail";
import { bizSlug } from "@/lib/firme";
import { geocode } from "@/lib/geocode";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getBusinesses(); const b = all.find((x) => bizSlug(x.name) === slug);
  if (!b) return { title: "Firma — Turizam Srbija" };
  return { title: `${b.name}${b.city ? " — " + b.city : ""} | Turizam Srbija`, description: (b.desc.sr || b.name).slice(0, 160), openGraph: { images: [b.image || `/api/og?title=${encodeURIComponent(b.name)}`] }, alternates: { canonical: `/firma/${slug}`, languages: { "sr-Latn-RS": `/firma/${slug}`, en: `/en/business/${slug}`, de: `/de/firma/${slug}`, "x-default": `/firma/${slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getBusinesses(); const b = all.find((x) => bizSlug(x.name) === slug); if (!b) notFound();
  const geo = b.address ? await geocode(`${b.address}, ${b.city || ""}, Srbija`) : null;
  const related = all.filter((x) => x.category === b.category && x.id !== b.id).sort((a, z) => Number(z.featured) - Number(a.featured)).slice(0, 5);
  return <BusinessDetail b={b} geo={geo} related={related} />;
}
