import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
export const revalidate = 60;
export const metadata = { title: "Events in Serbia — festivals and fairs 2026", description: "Calendar of events in Serbia: festivals, fairs, food and cultural events — when, where and what to expect.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Events in Serbia")}&subtitle=${encodeURIComponent("Festivals, fairs & celebrations")}`] }, alternates: { canonical: "/en/events", languages: { "sr-Latn-RS": "/manifestacije", en: "/en/events", de: "/de/veranstaltungen", "x-default": "/manifestacije" } } };
export default async function Page() { const e = await getEvents(); return <ManifestacijePage events={e} cat={null} />; }
