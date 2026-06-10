import { getListings } from "@/lib/data";
import BelgradeAreaPage from "@/app/components/BelgradeAreaPage";
import { bgAreaBySlug, inBgArea } from "@/lib/belgrade";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ naselje: string }> }) {
  const { naselje } = await params; const a = bgAreaBySlug(naselje);
  if (!a) return { title: "Apartmani Beograd — Turizam Srbija" };
  return { title: `Apartmani Beograd ${a.sr} — stan na dan | Turizam Srbija`, description: `Apartmani i stan na dan u naselju ${a.sr} u Beogradu. Proveren smeštaj sa fotografijama, mapom i direktnim kontaktom vlasnika, bez provizije za gosta.`, alternates: { canonical: `/apartmani-beograd/${naselje}`, languages: { "sr-Latn-RS": `/apartmani-beograd/${naselje}`, en: `/en/belgrade-apartments/${naselje}`, de: `/de/belgrade-apartments/${naselje}`, "x-default": `/apartmani-beograd/${naselje}` } } };
}
export default async function Page({ params }: { params: Promise<{ naselje: string }> }) {
  const { naselje } = await params; const a = bgAreaBySlug(naselje); if (!a) notFound();
  const all = await getListings("stay");
  const items = all.filter((d) => inBgArea(d.municipality, a.slug));
  return <BelgradeAreaPage items={items} area={a} />;
}
