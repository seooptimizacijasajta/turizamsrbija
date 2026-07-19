import { getListings } from "@/lib/data";
import BelgradePage from "@/app/components/BelgradePage";
export const revalidate = 60;
export const metadata = { title: "Apartmani Beograd — stan na dan i privatni smeštaj", description: "Apartmani u Beogradu i stan na dan — proveren privatni smeštaj po naseljima (Vračar, Novi Beograd, Zemun), od studija do luksuznih stanova. Bez provizije za gosta.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Apartmani Beograd")}&subtitle=${encodeURIComponent("Stan na dan i privatni smeštaj u prestonici")}`] }, alternates: { canonical: "/apartmani-beograd", languages: { "sr-Latn-RS": "/apartmani-beograd", en: "/en/belgrade-apartments", de: "/de/belgrad-apartments", "x-default": "/apartmani-beograd" } } };
export default async function Page() {
  const stays = await getListings("stay");
  return <BelgradePage items={stays.filter((s) => (s.municipality || "").startsWith("Beograd"))} />;
}
