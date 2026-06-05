import { getListings } from "@/lib/data";
import HomeClient from "@/app/components/HomeClient";

export const revalidate = 60;

export default async function Home() {
  const all = await getListings();
  return <HomeClient all={all} />;
}
