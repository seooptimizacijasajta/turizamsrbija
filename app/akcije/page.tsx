import { getListings } from "@/lib/data";
import DealsPage from "@/app/components/DealsPage";
export const revalidate = 60;
export const metadata = { title: "Akcije i popusti — smeštaj u Srbiji | Turizam Srbija", description: "Aktuelni popusti, first minute i last minute ponude za smeštaj širom Srbije — uštedite na odmoru.", alternates: { canonical: "/akcije", languages: { "sr-Latn-RS": "/akcije", en: "/en/deals", de: "/de/angebote", "x-default": "/akcije" } } };
export default async function Page() { const all = await getListings(); return <DealsPage items={all.filter((l) => l.deal)} />; }
