import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import { sectionMeta } from "@/lib/seo";
export const revalidate = 60;
export const generateMetadata = () => sectionMeta("en", "mountain");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("mountain"), getBanners("inlist", "mountain")]);
  return <SectionPage items={items} kind="mountain" banners={banners} />;
}
