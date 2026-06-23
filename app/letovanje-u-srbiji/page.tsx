import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/letovanje-u-srbiji", en: "/en/summer-holidays-serbia", de: "/de/sommerurlaub-serbien", "x-default": "/letovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Letovanje u Srbiji — jezera, banje i reke | Turizam Srbija",
  description: "Letovanje u Srbiji: peščane plaže na jezerima (Srebrno, Palić), banje sa bazenima (Vrnjačka, Sokobanja) i reke za rafting. Smeštaj, cene i saveti.",
  alternates: { canonical: "/letovanje-u-srbiji", languages: ALT },
  openGraph: { title: "Letovanje u Srbiji", description: "Jezera, banje i reke — letnji odmor u Srbiji.", images: [`/api/og?title=${encodeURIComponent("Letovanje u Srbiji")}&subtitle=${encodeURIComponent("Jezera, banje i reke")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="leto" all={all} />;
}
