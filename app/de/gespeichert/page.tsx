import { getListings } from "@/lib/data";
import SavedView from "@/app/components/SavedView";
export const revalidate = 60;
export const metadata = { title: "Saved — Turizam Srbija" };
export default async function Page() { const items = await getListings(); return <SavedView items={items} />; }
