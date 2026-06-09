import FaqAccordion from "@/app/components/FaqAccordion";
import { generalFaqs } from "@/lib/faq";
export const metadata = { title: "Često postavljana pitanja — Turizam Srbija", description: "Odgovori na najčešća pitanja o portalu, rezervaciji, oglašavanju i plaćanju." };
export default function Page() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>Često postavljana pitanja</h1><p>Sve što vas zanima o rezervaciji, oglašavanju i plaćanju.</p></div>
      </section>
      <FaqAccordion items={generalFaqs("sr")} heading="Opšta pitanja" />
    </>
  );
}
