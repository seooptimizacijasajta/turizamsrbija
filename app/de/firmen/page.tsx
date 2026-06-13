import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
export const revalidate = 60;
export const metadata = { title: "Firmenverzeichnis — Tourismus in Serbien | Turizam Srbija", description: "Reisebüros, Autovermietung, Reiseführer, Transfers, Restaurants und weitere Tourismusdienste in Serbien.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Firmenverzeichnis — Tourismus")}&subtitle=${encodeURIComponent("Agenturen, Mietwagen, Reiseführer")}`] }, alternates: { canonical: "/de/firmen", languages: { "sr-Latn-RS": "/firme", en: "/en/businesses", de: "/de/firmen", "x-default": "/firme" } } };
export default async function Page() { const b = await getBusinesses(); return <FirmePage businesses={b} cat={null} />; }
