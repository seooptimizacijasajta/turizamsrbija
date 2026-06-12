import { getListings } from "@/lib/data";
import DealsPage from "@/app/components/DealsPage";
export const revalidate = 60;
export const metadata = { title: "Deals & discounts — accommodation in Serbia | Turizam Srbija", description: "Current discounts, first-minute and last-minute accommodation offers across Serbia — save on your holiday.", alternates: { canonical: "/en/deals", languages: { "sr-Latn-RS": "/akcije", en: "/en/deals", de: "/de/angebote", "x-default": "/akcije" } } };
export default async function Page() { const all = await getListings(); return <DealsPage items={all.filter((l) => l.deal)} />; }
