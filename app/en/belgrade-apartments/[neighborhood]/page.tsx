import { getListings } from "@/lib/data";
import BelgradeAreaPage from "@/app/components/BelgradeAreaPage";
import { bgAreaBySlug, inBgArea } from "@/lib/belgrade";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params; const a = bgAreaBySlug(neighborhood);
  if (!a) return { title: "Belgrade apartments — Turizam Srbija" };
  return { title: `Belgrade apartments ${a.en} — daily rentals | Turizam Srbija`, description: `Apartments and daily rentals in ${a.en}, Belgrade. Verified stays with photos, map and direct host contact, no guest commission.`, alternates: { canonical: `/en/belgrade-apartments/${neighborhood}`, languages: { "sr-Latn-RS": `/apartmani-beograd/${neighborhood}`, en: `/en/belgrade-apartments/${neighborhood}`, de: `/de/belgrade-apartments/${neighborhood}`, "x-default": `/apartmani-beograd/${neighborhood}` } } };
}
export default async function Page({ params }: { params: Promise<{ neighborhood: string }> }) {
  const { neighborhood } = await params; const a = bgAreaBySlug(neighborhood); if (!a) notFound();
  const all = await getListings("stay");
  const items = all.filter((d) => inBgArea(d.municipality, a.slug));
  return <BelgradeAreaPage items={items} area={a} />;
}
