import type { Metadata } from "next";
import RecnikIndex from "@/app/components/RecnikIndex";

const ALT = { "sr-Latn-RS": "/recnik", en: "/en/glossary", de: "/de/glossar", "x-default": "/recnik" };

export const metadata: Metadata = {
  title: "Tourism glossary — terms explained | Turizam Srbija",
  description: "Explanations of tourism, accommodation and booking terms: half board, voucher, deposit, all-inclusive, tourist tax and more.",
  alternates: { canonical: "/en/glossary", languages: ALT },
  openGraph: {
    title: "Tourism glossary",
    description: "Key tourism and accommodation terms clearly explained.",
    images: [`/api/og?title=${encodeURIComponent("Tourism glossary")}&subtitle=${encodeURIComponent("Terms explained")}`],
  },
};

export default function Page() {
  return <RecnikIndex />;
}
