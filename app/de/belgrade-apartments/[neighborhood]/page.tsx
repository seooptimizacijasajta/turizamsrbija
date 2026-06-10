import { getListings } from "@/lib/data";
import BelgradeAreaPage from "@/app/components/BelgradeAreaPage";
import { bgAreaBySlug, inBgArea } from "@/lib/belgrade";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params; const a = bgAreaBySlug(neighborhood);
  if (!a) return { title: "Apartments Belgrad — Turizam Srbija" };
  return { title: `Apartments Belgrad ${a.de} — Tagesmiete | Turizam Srbija`, description: `Apartments und Tagesmiete im Stadtteil ${a.de}, Belgrad. Geprüfte Unterkünfte mit Fotos, Karte und direktem Kontakt zum Gastgeber.`, alternates: { canonical: `/de/belgrade-apartments/${neighborhood}`, languages: { "sr-Latn-RS": `/apartmani-beograd/${neighborhood}`, en: `/en/belgrade-apartments/${neighborhood}`, de: `/de/belgrade-apartments/${neighborhood}`, "x-default": `/apartmani-beograd/${neighborhood}` } } };
}
export default async function Page({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params; const a = bgAreaBySlug(neighborhood); if (!a) notFound();
  const all = await getListings("stay");
  const items = all.filter((d) => inBgArea(d.municipality, a.slug));
  return <BelgradeAreaPage items={items} area={a} />;
}
