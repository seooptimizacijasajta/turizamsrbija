import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
export const revalidate = 60;
export const metadata = { title: "Business directory — tourism in Serbia | Turizam Srbija", description: "Travel agencies, car rental, guides, transfers, restaurants and other tourism services in Serbia.", alternates: { canonical: "/en/businesses", languages: { "sr-Latn-RS": "/firme", en: "/en/businesses", de: "/de/firmen", "x-default": "/firme" } } };
export default async function Page() { const b = await getBusinesses(); return <FirmePage businesses={b} cat={null} />; }
