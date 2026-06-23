import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/zimovanje-u-srbiji", en: "/en/winter-holidays-serbia", de: "/de/winterurlaub-serbien", "x-default": "/zimovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Zimovanje u Srbiji — Kopaonik, Zlatibor, Stara planina | Turizam Srbija",
  description: "Zimovanje u Srbiji: ski centri (Kopaonik, Zlatibor, Stara planina), planinski hoteli i apartmani, sankanje i wellness. Smeštaj, cene i saveti.",
  alternates: { canonical: "/zimovanje-u-srbiji", languages: ALT },
  openGraph: { title: "Zimovanje u Srbiji", description: "Ski centri i planinski smeštaj u Srbiji.", images: [`/api/og?title=${encodeURIComponent("Zimovanje u Srbiji")}&subtitle=${encodeURIComponent("Ski centri i planine")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="zima" all={all} />;
}
