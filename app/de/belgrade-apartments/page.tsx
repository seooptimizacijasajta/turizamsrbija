import { getListings } from "@/lib/data";
import BelgradePage from "@/app/components/BelgradePage";
export const revalidate = 60;
export const metadata = { title: "Belgrade apartments — Turizam Srbija" };
export default async function Page() {
  const stays = await getListings("stay");
  return <BelgradePage items={stays.filter((s) => (s.municipality || "").startsWith("Beograd"))} />;
}
