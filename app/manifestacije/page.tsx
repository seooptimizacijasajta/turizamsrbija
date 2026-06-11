import { getEvents } from "@/lib/eventsData";
import ManifestacijePage from "@/app/components/ManifestacijePage";
export const revalidate = 60;
export const metadata = { title: "Manifestacije u Srbiji — festivali, sabori i događaji | Turizam Srbija", description: "Kalendar manifestacija u Srbiji: festivali, sabori, gastro i kulturni događaji — kada su, gde su i šta da očekujete.", alternates: { canonical: "/manifestacije", languages: { "sr-Latn-RS": "/manifestacije", en: "/en/events", de: "/de/veranstaltungen", "x-default": "/manifestacije" } } };
export default async function Page() { const e = await getEvents(); return <ManifestacijePage events={e} cat={null} />; }
