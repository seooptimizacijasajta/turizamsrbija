import FaqAccordion from "@/app/components/FaqAccordion";
import { generalFaqs } from "@/lib/faq";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { pageMeta } from "@/lib/slug";

const PATHS = { sr: "/faq", en: "/en/faq", de: "/de/faq" };
export const metadata = pageMeta("de", PATHS, {
  title: "Häufige Fragen — Buchung und Inserate | Turizam Srbija",
  description: "Antworten auf häufige Fragen: wie man den Gastgeber kontaktiert, wie man eine Unterkunft inseriert, ob Provision anfällt und wie Zahlung und Gutscheine funktionieren.",
  image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80",
});

export default function Page() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>Häufig gestellte Fragen</h1><p>Alles zu Anfrage, Inserat und Zahlung.</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: "Startseite", href: "/de" }, { name: "Häufig gestellte Fragen" }]} /></div>
      <FaqAccordion items={generalFaqs("de")} heading="Allgemeine Fragen" />
    </>
  );
}
