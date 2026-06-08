import { getListings } from "@/lib/data";
import SectionPage from "@/app/components/SectionPage";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("sr", "spa");
export default async function Page() {
  const items = await getListings("spa");
  return <SectionPage items={items} kind="spa" />;
}
