import { getListingBySlug, getListings } from "@/lib/data";
import DetailView from "@/app/components/DetailView";
import { altMeta } from "@/lib/slug";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return altMeta("sr", "mountain", slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getListingBySlug("mountain", slug);
  if (!item) notFound();
  const all = await getListings();
  const nearby = all
    .filter((d) => d.type === "stay" && d.id !== item.id &&
      (d.place === item.name.sr || d.region.sr === item.region.sr))
    .slice(0, 3);
  return <DetailView item={item} nearby={nearby} />;
}
