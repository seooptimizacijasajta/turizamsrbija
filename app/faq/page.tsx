import FaqAccordion from "@/app/components/FaqAccordion";
import { generalFaqs } from "@/lib/faq";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { pageMeta } from "@/lib/slug";
const PATHS = { sr: "/faq", en: "/en/faq", de: "/de/faq" };
export const metadata = pageMeta("sr", PATHS, {
  title: "Česta pitanja — rezervacija i oglašavanje | Turizam Srbija",
  description: "Odgovori na najčešća pitanja o portalu: kako poslati upit domaćinu, kako oglasiti smeštaj, da li postoji provizija i kako funkcioniše plaćanje i vaučeri.",
  image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80",
});
export default function Page() {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>Često postavljana pitanja</h1><p>Sve što vas zanima o rezervaciji, oglašavanju i plaćanju.</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: "Početna", href: "/" }, { name: "Često postavljana pitanja" }]} /></div>
      <FaqAccordion items={generalFaqs("sr")} heading="Opšta pitanja" />
    </>
  );
}
