import BgInfoPage from "@/app/components/BgInfoPage";
import { bgInfoBySlug } from "@/lib/bgInfo";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params; const t = bgInfoBySlug(tema);
  if (!t) return { title: "Belgrade info — Turizam Srbija" };
  return { title: `${t.title.en} | Turizam Srbija`, description: t.lead.en, alternates: { canonical: `/en/belgrade-info/${t.en_slug}`, languages: { "sr-Latn-RS": `/info-beograd/${t.slug}`, en: `/en/belgrade-info/${t.en_slug}`, de: `/de/belgrade-info/${t.en_slug}`, "x-default": `/info-beograd/${t.slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params; const t = bgInfoBySlug(tema); if (!t) notFound();
  return <BgInfoPage topic={t} />;
}
