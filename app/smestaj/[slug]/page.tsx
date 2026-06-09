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
  const item = await getListingBySlug("stay", slug);
  return listingMeta("sr", "stay", slug, item);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getListingBySlug("stay", slug);
  if (!item) notFound();
  const [all, sidebar, rev, google, blocked] = await Promise.all([
    getListings(), getBanners("sidebar"), getReviews(item.id), getGooglePlace(item.googlePlaceId), getBlockedDates(item.id),
  ]);
  const nearby = all
    .filter((d) => d.type === "stay" && d.id !== item.id &&
      (d.place === item.name.sr || d.region.sr === item.region.sr))
    .slice(0, 3);
  return <DetailView item={item} nearby={nearby} sidebarBanners={sidebar}
    reviews={rev.reviews} reviewAvg={rev.avg} reviewCount={rev.count} google={google} blocked={blocked} />;
}
