import { getListings } from "@/lib/data";
import HomeClient from "@/app/components/HomeClient";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("en");
export default async function Home() {
  const all = await getListings();
  return <HomeClient all={all} />;
}
