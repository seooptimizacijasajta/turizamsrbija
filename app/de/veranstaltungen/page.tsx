import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
export const revalidate = 60;
export const metadata = { title: "Veranstaltungen in Serbien — Festivals & Events | Turizam Srbija", description: "Veranstaltungskalender für Serbien: Festivals, Volksfeste, Gastro- und Kulturevents — wann, wo und was Sie erwartet.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Veranstaltungen in Serbien")}&subtitle=${encodeURIComponent("Festivals & Events")}`] }, alternates: { canonical: "/de/veranstaltungen", languages: { "sr-Latn-RS": "/manifestacije", en: "/en/events", de: "/de/veranstaltungen", "x-default": "/manifestacije" } } };
export default async function Page() { const e = await getEvents(); return <ManifestacijePage events={e} cat={null} />; }
