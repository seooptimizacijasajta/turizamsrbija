import { getListingBySlug, getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import { getReviews } from "@/lib/reviews";
import { getGooglePlace } from "@/lib/google";
import { getBlockedDates } from "@/lib/availability";
import DetailView from "@/app/components/DetailView";
import { listingMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getListingBySlug("spa", slug);
  return listingMeta("de", "spa", slug, item);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getListingBySlug("spa", slug);
  if (!item) notFound();
  const [all, sidebar, rev, google, blocked] = await Promise.all([
    getListings(), getBanners("sidebar"), getReviews(item.id), getGooglePlace(item.googlePlaceId), getBlockedDates(item.id),
  ]);
  const nearby = all.filter((d) => d.type === "stay" && d.id !== item.id && (d.place === item.name.sr || d.region.sr === item.region.sr)).slice(0, 3);
  const nearbyIds = new Set(nearby.map((n) => n.id));
  const related = all.filter((d) => d.type === item.type && d.id !== item.id && !nearbyIds.has(d.id)).slice(0, 4);
  return <DetailView item={item} nearby={nearby} related={related} sidebarBanners={sidebar}
    reviews={rev.reviews} reviewAvg={rev.avg} reviewCount={rev.count} google={google} blocked={blocked} />;
}
