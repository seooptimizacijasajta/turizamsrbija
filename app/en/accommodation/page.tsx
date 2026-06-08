import { getListings } from "@/lib/data";
import SectionPage from "@/app/components/SectionPage";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("en", "stay");
export default async function Page() {
  const items = await getListings("stay");
  return <SectionPage items={items} kind="stay" />;
}
