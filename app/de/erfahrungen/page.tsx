import type { Metadata } from "next";
import UtisciPage from "@/app/components/UtisciPage";

const ALT = { "sr-Latn-RS": "/utisci-korisnika", en: "/en/reviews", de: "/de/erfahrungen", "x-default": "/utisci-korisnika" };

export const metadata: Metadata = {
  title: "Erfahrungen — was Nutzer über Turizam Srbija sagen",
  description: "Was Gäste und Gastgeber über das Portal Turizam Srbija sagen. Hinterlassen Sie Ihren Eindruck oder senden Sie einen Vorschlag.",
  alternates: { canonical: "/de/erfahrungen", languages: ALT },
  openGraph: {
    title: "Erfahrungen — Turizam Srbija",
    description: "Erfahrungen von Gästen und Gastgebern mit dem Portal Turizam Srbija.",
    images: [`/api/og?title=${encodeURIComponent("Erfahrungen der Nutzer")}&subtitle=${encodeURIComponent("Gäste & Gastgeber")}`],
  },
};

export default function Page() {
  return <UtisciPage />;
}
