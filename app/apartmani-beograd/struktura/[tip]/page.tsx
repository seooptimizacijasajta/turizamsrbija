import { getListings } from "@/lib/data";
import BelgradeStructurePage from "@/app/components/BelgradeStructurePage";
import { structBySlug, isBelgrade } from "@/lib/structure";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params; const st = structBySlug(tip);
  if (!st) return { title: "Apartmani Beograd — Turizam Srbija" };
  return { title: `${st.sr} apartmani Beograd — stan na dan | Turizam Srbija`, description: `${st.sr} apartmani i stan na dan u Beogradu. Proveren smeštaj sa fotografijama, mapom i direktnim kontaktom vlasnika, bez provizije za gosta.`, alternates: { canonical: `/apartmani-beograd/struktura/${tip}`, languages: { "sr-Latn-RS": `/apartmani-beograd/struktura/${tip}`, en: `/en/belgrade-apartments/type/${tip}`, de: `/de/belgrade-apartments/type/${tip}`, "x-default": `/apartmani-beograd/struktura/${tip}` } } };
}
export default async function Page({ params }: { params: Promise<{ tip: string }> }) {
  const { tip } = await params; const st = structBySlug(tip); if (!st) notFound();
  const all = await getListings("stay");
  const items = all.filter((d) => d.structure === st.key && isBelgrade(d.municipality));
  return <BelgradeStructurePage items={items} struct={st} />;
}
