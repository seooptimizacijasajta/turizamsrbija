import { getListings } from "@/lib/data";
import SectionPage from "@/app/components/SectionPage";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("en", "lake");
export default async function Page() {
  const items = await getListings("lake");
  return <SectionPage items={items} kind="lake" />;
}
