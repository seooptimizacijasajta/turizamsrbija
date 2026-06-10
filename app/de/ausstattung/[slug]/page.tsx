import { getListings } from "@/lib/data";
import AmenityPage from "@/app/components/AmenityPage";
import { amenityBySlug, amenityByKey } from "@/lib/amenities";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); const a = key ? amenityByKey(key) : null;
  if (!a) return { title: "Accommodation — Turizam Srbija" };
  return { title: `${a.en} — accommodation in Serbia | Turizam Srbija`, description: `Find accommodation in Serbia: ${a.en.toLowerCase()}. Apartments, villas, hotels and ethno homes with filters and reviews.`, alternates: { canonical: `/de/ausstattung/${slug}` } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); if (!key) notFound();
  const all = await getListings();
  const items = all.filter((d) => (d.amenities || []).includes(key));
  return <AmenityPage items={items} amenityKey={key} />;
}
