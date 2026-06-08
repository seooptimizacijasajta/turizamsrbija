import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("en", "ethno");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("ethno"), getBanners("inlist", "ethno")]);
  return <SectionPage items={items} kind="ethno" banners={banners} />;
}
