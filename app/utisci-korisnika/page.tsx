import type { Metadata } from "next";
import UtisciPage from "@/app/components/UtisciPage";

const ALT = { "sr-Latn-RS": "/utisci-korisnika", en: "/en/reviews", de: "/de/erfahrungen", "x-default": "/utisci-korisnika" };

export const metadata: Metadata = {
  title: "Utisci korisnika — Turizam Srbija",
  description: "Šta gosti i domaćini kažu o portalu Turizam Srbija. Ostavite svoj utisak ili pošaljite predlog za poboljšanje.",
  alternates: { canonical: "/utisci-korisnika", languages: ALT },
  openGraph: {
    title: "Utisci korisnika — Turizam Srbija",
    description: "Iskustva gostiju i domaćina sa portalom Turizam Srbija.",
    images: [`/api/og?title=${encodeURIComponent("Utisci korisnika")}&subtitle=${encodeURIComponent("Iskustva gostiju i domaćina")}`],
  },
};

export default function Page() {
  return <UtisciPage />;
}
