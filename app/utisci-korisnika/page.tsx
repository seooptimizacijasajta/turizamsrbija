import type { Metadata } from "next";
import UtisciPage from "@/app/components/UtisciPage";

export const metadata: Metadata = {
  title: "Utisci korisnika — Turizam Srbija",
  description: "Šta gosti i domaćini kažu o portalu Turizam Srbija. Ostavite svoj utisak ili pošaljite predlog za poboljšanje.",
  alternates: { canonical: "/utisci-korisnika" },
  openGraph: {
    title: "Utisci korisnika — Turizam Srbija",
    description: "Iskustva gostiju i domaćina sa portalom Turizam Srbija.",
    images: [`/api/og?title=${encodeURIComponent("Utisci korisnika")}&subtitle=${encodeURIComponent("Iskustva gostiju i domaćina")}`],
  },
};

export default function Page() {
  return <UtisciPage />;
}
