import { getListings } from "@/lib/data";
import AmenityPage from "@/app/components/AmenityPage";
import { amenityBySlug, amenityByKey, amenityPath } from "@/lib/amenities";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); const a = key ? amenityByKey(key) : null;
  if (!a) return { title: "Accommodation — Turizam Srbija" };
  const sr = amenityPath(key!, "sr"), en = amenityPath(key!, "en"), de = amenityPath(key!, "de");
  const title = `${a.en} — accommodation in Serbia`;
  const description = `Accommodation in Serbia with ${a.en.toLowerCase()}: apartments, cottages, log cabins, villas and hotels — enquiries go straight to the owner, no commission.`;
  return {
    title, description,
    alternates: { canonical: en, languages: { "sr-Latn-RS": sr, en, de, "x-default": sr } },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(a.en)}&subtitle=${encodeURIComponent("Accommodation in Serbia")}`] },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); if (!key) notFound();
  const all = await getListings();
  const items = all.filter((d) => (d.amenities || []).includes(key));
  return <AmenityPage items={items} amenityKey={key} />;
}
