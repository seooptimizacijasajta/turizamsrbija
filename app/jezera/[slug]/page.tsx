import { getListingBySlug, getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import DetailView from "@/app/components/DetailView";
import { altMeta } from "@/lib/slug";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return altMeta("sr", "lake", slug);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getListingBySlug("lake", slug);
  if (!item) notFound();
  const [all, sidebar] = await Promise.all([getListings(), getBanners("sidebar")]);
  const nearby = all
    .filter((d) => d.type === "stay" && d.id !== item.id &&
      (d.place === item.name.sr || d.region.sr === item.region.sr))
    .slice(0, 3);
  return <DetailView item={item} nearby={nearby} sidebarBanners={sidebar} />;
}
