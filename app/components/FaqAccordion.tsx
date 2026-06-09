import JsonLd from "./JsonLd";
import type { Faq } from "@/lib/faq";

export default function FaqAccordion({ items, heading }: { items: Faq[]; heading: string }) {
  if (!items?.length) return null;
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <section className="section section--soft"><div className="container" style={{ maxWidth: 820 }}>
      <JsonLd data={ld} />
      <h2 className="section-title" style={{ marginBottom: 20 }}>{heading}</h2>
      <div className="faq">
        {items.map((f, i) => (
          <details key={i} className="faq-item">
            <summary><span>{f.q}</span><span className="faq-ic">+</span></summary>
            <div className="faq-a">{f.a}</div>
          </details>
        ))}
      </div>
    </div></section>
  );
}
