import { getListings } from "@/lib/data";
import SavedView from "@/app/components/SavedView";
import { pageMeta } from "@/lib/slug";

export const revalidate = 60;
const PATHS = { sr: "/sacuvano", en: "/en/saved", de: "/de/gespeichert" };
export const metadata = pageMeta("de", PATHS, {
  title: "Gespeicherte Angebote — Turizam Srbija",
  description: "Ihre Merkliste mit Unterkünften und Reisezielen. Vergleichen Sie Favoriten und fragen Sie direkt beim Gastgeber an — ohne Gästeprovision.",
  noindex: true,
});

export default async function Page() {
  const items = await getListings();
  return <SavedView items={items} />;
}
