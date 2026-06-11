import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
import { bizCatBySlug, bizCityBySlug, cityMatches } from "@/lib/firme";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ kategorija: string; grad: string }> }) {
  const { kategorija, grad } = await params; const c = bizCatBySlug(kategorija); const ci = bizCityBySlug(grad);
  if (!c || !ci) return { title: "Firmen — Turizam Srbija" };
  return { title: `${c.de} ${ci.name} | Turizam Srbija`, description: `${c.de} in ${ci.name} — geprüfte Firmen, Kontakte und Dienste.`, alternates: { canonical: `/de/firmen/${c.enSlug}/${ci.slug}`, languages: { "sr-Latn-RS": `/firme/${c.srSlug}/${ci.slug}`, en: `/en/businesses/${c.enSlug}/${ci.slug}`, de: `/de/firmen/${c.enSlug}/${ci.slug}`, "x-default": `/firme/${c.srSlug}/${ci.slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ kategorija: string; grad: string }> }) {
  const { kategorija, grad } = await params; const c = bizCatBySlug(kategorija); const ci = bizCityBySlug(grad); if (!c || !ci) notFound();
  const all = await getBusinesses();
  return <FirmePage businesses={all.filter((b) => b.category === c.key && cityMatches(b.city, ci.slug))} cat={c} cityName={ci.name} />;
}
