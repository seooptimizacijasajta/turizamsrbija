import { getListings } from "@/lib/data";
import BelgradePage from "@/app/components/BelgradePage";
export const revalidate = 60;
export const metadata = { title: "Apartments in Belgrad — Tagesmiete & Privatzimmer", description: "Apartments in Belgrad zur Tagesmiete — geprüfte Privatunterkünfte nach Stadtvierteln (Vračar, Neu-Belgrad, Zemun), vom Studio bis zur Luxuswohnung.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Apartments in Belgrad")}&subtitle=${encodeURIComponent("Tagesmiete & Privatunterkünfte")}`] }, alternates: { canonical: "/de/belgrad-apartments", languages: { "sr-Latn-RS": "/apartmani-beograd", en: "/en/belgrade-apartments", de: "/de/belgrad-apartments", "x-default": "/apartmani-beograd" } } };
export default async function Page() {
  const stays = await getListings("stay");
  return <BelgradePage items={stays.filter((s) => (s.municipality || "").startsWith("Beograd"))} />;
}
