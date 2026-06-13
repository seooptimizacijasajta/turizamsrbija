import { getBusinesses } from "@/lib/businesses";
import FirmePage from "@/app/components/FirmePage";
export const revalidate = 60;
export const metadata = { title: "Baza firmi — turizam u Srbiji | Turizam Srbija", description: "Turističke agencije, rent-a-car, vodiči, transferi, restorani i druge turističke usluge u Srbiji. Pronađite i kontaktirajte firmu.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Baza firmi — turizam")}&subtitle=${encodeURIComponent("Agencije, rent-a-car, vodiči, transferi")}`] }, alternates: { canonical: "/firme", languages: { "sr-Latn-RS": "/firme", en: "/en/businesses", de: "/de/firmen", "x-default": "/firme" } } };
export default async function Page() { const b = await getBusinesses(); return <FirmePage businesses={b} cat={null} />; }
