import { getListings } from "@/lib/data";
import SavedView from "@/app/components/SavedView";
import { pageMeta } from "@/lib/slug";

export const revalidate = 60;
const PATHS = { sr: "/sacuvano", en: "/en/saved", de: "/de/gespeichert" };
export const metadata = pageMeta("en", PATHS, {
  title: "Saved listings — Turizam Srbija",
  description: "Your shortlist of saved stays and destinations. Compare favourites and contact the host directly, with no guest commission.",
  noindex: true,
});

export default async function Page() {
  const items = await getListings();
  return <SavedView items={items} />;
}
