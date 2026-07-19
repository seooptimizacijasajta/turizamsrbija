import type { Metadata } from "next";
import GdeNaOdmorPage from "@/app/components/GdeNaOdmorPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/gde-na-odmor-u-srbiji", en: "/en/where-to-go-in-serbia", de: "/de/wohin-in-serbien", "x-default": "/gde-na-odmor-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Where to go on holiday in Serbia — best places & ideas",
  description: "Where to go in Serbia: mountains, lakes, rivers, spas and ethno villages — the finest destinations and ideas for summer, winter and weekend breaks.",
  alternates: { canonical: "/en/where-to-go-in-serbia", languages: ALT },
  openGraph: { title: "Where to go on holiday in Serbia", description: "Mountains, lakes, rivers, spas and ethno villages — every holiday idea in Serbia.", images: [`/api/og?title=${encodeURIComponent("Where to go in Serbia")}&subtitle=${encodeURIComponent("Mountains, lakes, rivers, spas, villages")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <GdeNaOdmorPage all={all} />;
}
