import type { Metadata } from "next";
import GdeNaOdmorPage from "@/app/components/GdeNaOdmorPage";
import { getListings } from "@/lib/data";

const ALT = { "sr-Latn-RS": "/gde-na-odmor-u-srbiji", en: "/en/where-to-go-in-serbia", de: "/de/wohin-in-serbien", "x-default": "/gde-na-odmor-u-srbiji" };
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gde na odmor u Srbiji? Najlepša mesta i ideje | Turizam Srbija",
  description: "Gde na odmor u Srbiji — planine, jezera, reke, banje i etno sela. Najlepše destinacije i ideje za letovanje, zimovanje i vikend, sa smeštajem bez provizije za gosta.",
  alternates: { canonical: "/gde-na-odmor-u-srbiji", languages: ALT },
  openGraph: { title: "Gde na odmor u Srbiji", description: "Planine, jezera, reke, banje i etno sela — sve ideje za odmor u Srbiji.", images: [`/api/og?title=${encodeURIComponent("Gde na odmor u Srbiji")}&subtitle=${encodeURIComponent("Planine, jezera, reke, banje, etno sela")}`] },
};

export default async function Page() {
  const all = await getListings();
  return <GdeNaOdmorPage all={all} />;
}
