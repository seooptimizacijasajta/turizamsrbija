import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { eventCityBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const c = eventCityBySlug(city);
  if (!c) return { title: "Events — Turizam Srbija" };
  return { title: `Events in ${c.name} 2026 — festivals & celebrations | Turizam Srbija`, description: `All events, festivals and celebrations in ${c.name} — calendar, dates and what to expect.`, alternates: { canonical: `/en/events/city/${c.slug}`, languages: { "sr-Latn-RS": `/manifestacije/grad/${c.slug}`, en: `/en/events/city/${c.slug}`, de: `/de/veranstaltungen/stadt/${c.slug}`, "x-default": `/manifestacije/grad/${c.slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params; const c = eventCityBySlug(city); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.city === c.name)} cat={null} cityName={c.name} />;
}
