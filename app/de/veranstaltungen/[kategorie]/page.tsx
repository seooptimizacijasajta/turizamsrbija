import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { evCatBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ kategorie: string }> }) {
  const { kategorie } = await params; const c = evCatBySlug(kategorie);
  if (!c) return { title: "Veranstaltungen — Turizam Srbija" };
  return { title: `${c.de} in Serbien | Turizam Srbija`, description: `${c.de} — Veranstaltungen und Festivals in ganz Serbien. Wann und wo sie stattfinden.`, alternates: { canonical: `/de/veranstaltungen/${c.deSlug}`, languages: { "sr-Latn-RS": `/manifestacije/${c.srSlug}`, en: `/en/events/${c.enSlug}`, de: `/de/veranstaltungen/${c.deSlug}`, "x-default": `/manifestacije/${c.srSlug}` } } };
}
export default async function Page({ params }: { params: Promise<{ kategorie: string }> }) {
  const { kategorie } = await params; const c = evCatBySlug(kategorie); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.category === c.key)} cat={c} />;
}
