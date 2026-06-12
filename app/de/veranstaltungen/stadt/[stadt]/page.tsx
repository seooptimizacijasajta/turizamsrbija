import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { eventCityBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ stadt: string }> }) {
  const { stadt } = await params; const c = eventCityBySlug(stadt);
  if (!c) return { title: "Veranstaltungen — Turizam Srbija" };
  return { title: `Veranstaltungen in ${c.name} 2026 — Festivals & Events | Turizam Srbija`, description: `Alle Veranstaltungen, Festivals und Events in ${c.name} — Kalender, Termine und was Sie erwartet.`, alternates: { canonical: `/de/veranstaltungen/stadt/${c.slug}`, languages: { "sr-Latn-RS": `/manifestacije/grad/${c.slug}`, en: `/en/events/city/${c.slug}`, de: `/de/veranstaltungen/stadt/${c.slug}`, "x-default": `/manifestacije/grad/${c.slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ stadt: string }> }) {
  const { stadt } = await params; const c = eventCityBySlug(stadt); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.city === c.name)} cat={null} cityName={c.name} />;
}
