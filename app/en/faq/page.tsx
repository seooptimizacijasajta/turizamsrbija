import FaqAccordion from "@/app/components/FaqAccordion";
import { generalFaqs } from "@/lib/faq";
export const metadata = { title: "FAQ — Turizam Srbija", description: "Answers to common questions about the portal, booking, listing and payment." };
export default function Page() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>Frequently asked questions</h1><p>Everything about booking, listing and payment.</p></div>
      </section>
      <FaqAccordion items={generalFaqs("en")} heading="General questions" />
    </>
  );
}
