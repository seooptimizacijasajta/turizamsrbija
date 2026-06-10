import { getListings } from "@/lib/data";
import BelgradeStructurePage from "@/app/components/BelgradeStructurePage";
import { structBySlug, isBelgrade } from "@/lib/structure";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params; const st = structBySlug(tip);
  if (!st) return { title: "Apartments Belgrad — Turizam Srbija" };
  return { title: `${st.de}-Apartments Belgrad — Tagesmiete | Turizam Srbija`, description: `${st.de}-Apartments und Tagesmiete in Belgrad. Geprüfte Unterkünfte mit Fotos, Karte und direktem Kontakt zum Gastgeber.`, alternates: { canonical: `/de/belgrad-apartments/typ/${tip}`, languages: { "sr-Latn-RS": `/apartmani-beograd/struktura/${tip}`, en: `/en/belgrade-apartments/type/${tip}`, de: `/de/belgrad-apartments/typ/${tip}`, "x-default": `/apartmani-beograd/struktura/${tip}` } } };
}
export default async function Page({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params; const st = structBySlug(tip); if (!st) notFound();
  const all = await getListings("stay");
  const items = all.filter((d) => d.structure === st.key && isBelgrade(d.municipality));
  return <BelgradeStructurePage items={items} struct={st} />;
}
