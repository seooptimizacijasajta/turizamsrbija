import type { Metadata } from "next";
import UtisciPage from "@/app/components/UtisciPage";

const ALT = { "sr-Latn-RS": "/utisci-korisnika", en: "/en/reviews", de: "/de/erfahrungen", "x-default": "/utisci-korisnika" };

export const metadata: Metadata = {
  title: "Reviews — what users say about Turizam Srbija",
  description: "What guests and hosts say about the Turizam Srbija portal. Leave your review or send a suggestion.",
  alternates: { canonical: "/en/reviews", languages: ALT },
  openGraph: {
    title: "Reviews — Turizam Srbija",
    description: "Guest and host experiences with the Turizam Srbija portal.",
    images: [`/api/og?title=${encodeURIComponent("User reviews")}&subtitle=${encodeURIComponent("Guest & host experiences")}`],
  },
};

export default function Page() {
  return <UtisciPage />;
}
