import { getListings } from "@/lib/data";
import SavedView from "@/app/components/SavedView";
import { pageMeta } from "@/lib/slug";

export const revalidate = 60;
const PATHS = { sr: "/sacuvano", en: "/en/saved", de: "/de/gespeichert" };
export const metadata = pageMeta("sr", PATHS, {
  title: "Sačuvani oglasi — Turizam Srbija",
  description: "Vaša lista sačuvanog smeštaja i destinacija. Uporedite favorite i pošaljite upit domaćinu direktno, bez provizije za gosta.",
  noindex: true,
});

export default async function Page() {
  const items = await getListings();
  return <SavedView items={items} />;
}
