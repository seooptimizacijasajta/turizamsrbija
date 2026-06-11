import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
import { bizCatBySlug } from "@/lib/firme";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = bizCatBySlug(kategorija);
  if (!c) return { title: "Businesses — Turizam Srbija" };
  return { title: `${c.en} in Serbia | Turizam Srbija`, description: `${c.en} — verified businesses, contacts and services across Serbia.`, alternates: { canonical: `/en/businesses/${c.enSlug}`, languages: { "sr-Latn-RS": `/firme/${c.srSlug}`, en: `/en/businesses/${c.enSlug}`, de: `/de/firmen/${c.enSlug}`, "x-default": `/firme/${c.srSlug}` } } };
}
export default async function Page({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = bizCatBySlug(kategorija); if (!c) notFound();
  const all = await getBusinesses();
  return <FirmePage businesses={all.filter((b) => b.category === c.key)} cat={c} />;
}
