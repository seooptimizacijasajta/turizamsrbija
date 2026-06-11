import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
import { bizCatBySlug } from "@/lib/firme";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = bizCatBySlug(kategorija);
  if (!c) return { title: "Firme — Turizam Srbija" };
  return { title: `${c.sr} u Srbiji | Turizam Srbija`, description: `${c.sr} — proverene firme, kontakti i usluge širom Srbije. Pronađite i kontaktirajte direktno.`, alternates: { canonical: `/firme/${c.srSlug}`, languages: { "sr-Latn-RS": `/firme/${c.srSlug}`, en: `/en/businesses/${c.enSlug}`, de: `/de/firmen/${c.enSlug}`, "x-default": `/firme/${c.srSlug}` } } };
}
export default async function Page({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = bizCatBySlug(kategorija); if (!c) notFound();
  const all = await getBusinesses();
  return <FirmePage businesses={all.filter((b) => b.category === c.key)} cat={c} />;
}
