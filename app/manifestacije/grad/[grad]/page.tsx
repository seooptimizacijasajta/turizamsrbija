import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
import { eventCityBySlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ grad: string }> }) {
  const { grad } = await params; const c = eventCityBySlug(grad);
  if (!c) return { title: "Manifestacije — Turizam Srbija" };
  return { title: `Manifestacije u ${c.name} 2026 — festivali i događaji | Turizam Srbija`, description: `Sve manifestacije, festivali i događaji u ${c.name} — kalendar, datumi i šta da očekujete.`, alternates: { canonical: `/manifestacije/grad/${c.slug}`, languages: { "sr-Latn-RS": `/manifestacije/grad/${c.slug}`, en: `/en/events/city/${c.slug}`, de: `/de/veranstaltungen/stadt/${c.slug}`, "x-default": `/manifestacije/grad/${c.slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ grad: string }> }) {
  const { grad } = await params; const c = eventCityBySlug(grad); if (!c) notFound();
  const all = await getEvents();
  return <ManifestacijePage events={all.filter((e) => e.city === c.name)} cat={null} cityName={c.name} />;
}
