import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/letovanje-u-srbiji", en: "/en/summer-holidays-serbia", de: "/de/sommerurlaub-serbien", "x-default": "/letovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Summer holidays in Serbia — lakes, spas and rivers | Turizam Srbija",
  description: "Summer in Serbia: sandy lake beaches (Silver Lake, Palić), spa towns with pools (Vrnjačka, Sokobanja) and rivers for rafting. Stays, prices and tips.",
  alternates: { canonical: "/en/summer-holidays-serbia", languages: ALT },
  openGraph: { title: "Summer holidays in Serbia", description: "Lakes, spas and rivers — a summer break in Serbia.", images: [`/api/og?title=${encodeURIComponent("Summer in Serbia")}&subtitle=${encodeURIComponent("Lakes, spas & rivers")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="leto" all={all} />;
}
