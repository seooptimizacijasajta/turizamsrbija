import { getListings } from "@/lib/data";
import SectionPage from "@/app/components/SectionPage";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("sr", "mountain");
export default async function Page() {
  const items = await getListings("mountain");
  return <SectionPage items={items} kind="mountain" />;
}
