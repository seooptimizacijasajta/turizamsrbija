import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { evCatBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; const c = evCatBySlug(category);
  if (!c) return { title: "Events — Turizam Srbija" };
  return { title: `${c.en} in Serbia | Turizam Srbija`, description: `${c.en} — events and festivals across Serbia. When and where they take place.`, alternates: { canonical: `/en/events/${c.enSlug}`, languages: { "sr-Latn-RS": `/manifestacije/${c.srSlug}`, en: `/en/events/${c.enSlug}`, de: `/de/veranstaltungen/${c.deSlug}`, "x-default": `/manifestacije/${c.srSlug}` } } };
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params; const c = evCatBySlug(category); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.category === c.key)} cat={c} />;
}
