import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/zimovanje-u-srbiji", en: "/en/winter-holidays-serbia", de: "/de/winterurlaub-serbien", "x-default": "/zimovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Winterurlaub in Serbien — Kopaonik, Zlatibor, Stara Planina | Turizam Srbija",
  description: "Winter in Serbien: Skigebiete (Kopaonik, Zlatibor, Stara Planina), Berghotels und Apartments, Rodeln und Wellness. Unterkünfte, Preise und Tipps.",
  alternates: { canonical: "/de/winterurlaub-serbien", languages: ALT },
  openGraph: { title: "Winterurlaub in Serbien", description: "Skigebiete und Bergunterkünfte in Serbien.", images: [`/api/og?title=${encodeURIComponent("Winter in Serbien")}&subtitle=${encodeURIComponent("Skigebiete & Berge")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="zima" all={all} />;
}
