import type { Metadata } from "next";
import GdeNaOdmorPage from "@/app/components/GdeNaOdmorPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/gde-na-odmor-u-srbiji", en: "/en/where-to-go-in-serbia", de: "/de/wohin-in-serbien", "x-default": "/gde-na-odmor-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wohin in den Urlaub in Serbien — Orte und Ideen",
  description: "Wohin in Serbien — Berge, Seen, Flüsse, Kurorte und Ethno-Dörfer. Die schönsten Reiseziele und Ideen für Sommer, Winter und Wochenende, ohne Gästeprovision.",
  alternates: { canonical: "/de/wohin-in-serbien", languages: ALT },
  openGraph: { title: "Wohin in den Urlaub in Serbien", description: "Berge, Seen, Flüsse, Kurorte und Ethno-Dörfer — alle Urlaubsideen für Serbien.", images: [`/api/og?title=${encodeURIComponent("Wohin in Serbien")}&subtitle=${encodeURIComponent("Berge, Seen, Flüsse, Kurorte, Dörfer")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <GdeNaOdmorPage all={all} />;
}
