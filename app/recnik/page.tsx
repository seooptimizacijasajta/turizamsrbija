import type { Metadata } from "next";
import RecnikIndex from "@/app/components/RecnikIndex";

const ALT = { "sr-Latn-RS": "/recnik", en: "/en/glossary", de: "/de/glossar", "x-default": "/recnik" };

export const metadata: Metadata = {
  title: "Rečnik turizma — pojmovi objašnjeni | Turizam Srbija",
  description: "Objašnjenja pojmova iz turizma, smeštaja i rezervacija: polupansion, vaučer, depozit, all-inclusive, boravišna taksa i drugi.",
  alternates: { canonical: "/recnik", languages: ALT },
  openGraph: {
    title: "Rečnik turizma",
    description: "Pojmovi iz turizma i smeštaja jasno objašnjeni.",
    images: [`/api/og?title=${encodeURIComponent("Rečnik turizma")}&subtitle=${encodeURIComponent("Pojmovi objašnjeni")}`],
  },
};

export default function Page() {
  return <RecnikIndex />;
}
