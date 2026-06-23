import type { Metadata } from "next";
import SeasonPage from "@/app/components/SeasonPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/zimovanje-u-srbiji", en: "/en/winter-holidays-serbia", de: "/de/winterurlaub-serbien", "x-default": "/zimovanje-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Winter holidays in Serbia — Kopaonik, Zlatibor, Stara Planina | Turizam Srbija",
  description: "Winter in Serbia: ski resorts (Kopaonik, Zlatibor, Stara Planina), mountain hotels and apartments, sledding and wellness. Stays, prices and tips.",
  alternates: { canonical: "/en/winter-holidays-serbia", languages: ALT },
  openGraph: { title: "Winter holidays in Serbia", description: "Ski resorts and mountain stays in Serbia.", images: [`/api/og?title=${encodeURIComponent("Winter in Serbia")}&subtitle=${encodeURIComponent("Ski resorts & mountains")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <SeasonPage season="zima" all={all} />;
}
