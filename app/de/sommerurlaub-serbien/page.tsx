import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/letovanje-u-srbiji", en: "/en/summer-holidays-serbia", de: "/de/sommerurlaub-serbien", "x-default": "/letovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Sommerurlaub in Serbien — Seen, Kurorte und Flüsse | Turizam Srbija",
  description: "Sommer in Serbien: Sandstrände an Seen (Silbersee, Palić), Kurorte mit Pools (Vrnjačka, Sokobanja) und Flüsse zum Rafting. Unterkünfte, Preise und Tipps.",
  alternates: { canonical: "/de/sommerurlaub-serbien", languages: ALT },
  openGraph: { title: "Sommerurlaub in Serbien", description: "Seen, Kurorte und Flüsse — Sommerurlaub in Serbien.", images: [`/api/og?title=${encodeURIComponent("Sommer in Serbien")}&subtitle=${encodeURIComponent("Seen, Kurorte & Flüsse")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="leto" all={all} />;
}
