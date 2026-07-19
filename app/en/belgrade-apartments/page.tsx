import { getListings } from "@/lib/data";
import BelgradePage from "@/app/components/BelgradePage";
export const revalidate = 60;
export const metadata = { title: "Belgrade apartments — daily rentals & private stays", description: "Belgrade apartments and daily rentals — verified private accommodation by neighbourhood (Vračar, New Belgrade, Zemun), from studios to luxury flats. No guest fees.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Belgrade apartments")}&subtitle=${encodeURIComponent("Daily rentals & private stays")}`] }, alternates: { canonical: "/en/belgrade-apartments", languages: { "sr-Latn-RS": "/apartmani-beograd", en: "/en/belgrade-apartments", de: "/de/belgrad-apartments", "x-default": "/apartmani-beograd" } } };
export default async function Page() {
  const stays = await getListings("stay");
  return <BelgradePage items={stays.filter((s) => (s.municipality || "").startsWith("Beograd"))} />;
}
