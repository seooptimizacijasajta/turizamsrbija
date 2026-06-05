import { getListings } from "@/lib/data";
import SectionPage from "@/app/components/SectionPage";

export const revalidate = 60;

export default async function Page() {
  const items = await getListings("stay");
  return <SectionPage items={items} kind="stay" />;
}
