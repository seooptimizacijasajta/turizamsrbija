import type { Metadata } from "next";
import RecnikIndex from "@/app/components/RecnikIndex";

const ALT = { "sr-Latn-RS": "/recnik", en: "/en/glossary", de: "/de/glossar", "x-default": "/recnik" };

export const metadata: Metadata = {
  title: "Tourismus-Glossar — Begriffe erklärt | Turizam Srbija",
  description: "Erklärungen zu Begriffen aus Tourismus, Unterkunft und Buchung: Halbpension, Gutschein, Kaution, All inclusive, Kurtaxe und mehr.",
  alternates: { canonical: "/de/glossar", languages: ALT },
  openGraph: {
    title: "Tourismus-Glossar",
    description: "Wichtige Begriffe aus Tourismus und Unterkunft klar erklärt.",
    images: [`/api/og?title=${encodeURIComponent("Tourismus-Glossar")}&subtitle=${encodeURIComponent("Begriffe erklärt")}`],
  },
};

export default function Page() {
  return <RecnikIndex />;
}
