import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { evCatBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = evCatBySlug(kategorija);
  if (!c) return { title: "Manifestacije — Turizam Srbija" };
  return { title: `${c.sr} u Srbiji | Turizam Srbija`, description: `${c.sr} — manifestacije, festivali i događaji širom Srbije. Kada su i gde se održavaju.`, alternates: { canonical: `/manifestacije/${c.srSlug}`, languages: { "sr-Latn-RS": `/manifestacije/${c.srSlug}`, en: `/en/events/${c.enSlug}`, de: `/de/veranstaltungen/${c.deSlug}`, "x-default": `/manifestacije/${c.srSlug}` } } };
}
export default async function Page({ params }: { params: Promise<{ kategorija: string }> }) {
  const { kategorija } = await params; const c = evCatBySlug(kategorija); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.category === c.key)} cat={c} />;
}
