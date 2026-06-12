import { getListings } from "@/lib/data";
import DealsPage from "@/app/components/DealsPage";
export const revalidate = 60;
export const metadata = { title: "Angebote & Rabatte — Unterkünfte in Serbien | Turizam Srbija", description: "Aktuelle Rabatte, Frühbucher- und Last-Minute-Angebote für Unterkünfte in ganz Serbien — sparen Sie im Urlaub.", alternates: { canonical: "/de/angebote", languages: { "sr-Latn-RS": "/akcije", en: "/en/deals", de: "/de/angebote", "x-default": "/akcije" } } };
export default async function Page() { const all = await getListings(); return <DealsPage items={all.filter((l) => l.deal)} />; }
