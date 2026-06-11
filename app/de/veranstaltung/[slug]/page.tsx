import { getEvents, nearbyStays } from "@/lib/eventsData";
import EventDetail from "@/app/components/EventDetail";
import { evSlug } from "@/lib/events";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getEvents(); const ev = all.find((x) => evSlug(x.name) === slug);
  if (!ev) return { title: "Veranstaltung — Turizam Srbija" };
  return { title: `${ev.name}${ev.city ? " — " + ev.city : ""} | Turizam Srbija`, description: (ev.desc.de || ev.desc.sr || ev.name).slice(0, 160), alternates: { canonical: `/de/veranstaltung/${slug}`, languages: { "sr-Latn-RS": `/manifestacija/${slug}`, en: `/en/event/${slug}`, de: `/de/veranstaltung/${slug}`, "x-default": `/manifestacija/${slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const all = await getEvents(); const ev = all.find((x) => evSlug(x.name) === slug); if (!ev) notFound();
  const stays = await nearbyStays(ev, "de");
  return <EventDetail ev={ev} stays={stays} />;
}
