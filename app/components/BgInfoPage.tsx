"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath, belgradePath } from "@/lib/slug";
import { InfoTopic, BG_INFO, bgInfoPath, bgInfoTitle } from "@/lib/bgInfo";

export default function BgInfoPage({ topic }: { topic: InfoTopic }) {
  const { lang, t } = useLang();
  const lc = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const title = bgInfoTitle(topic, lang);
  const blocks = topic.body[lc];
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{topic.icon} {title}</h1><p>{lang === "sr" ? topic.lead.sr : lang === "de" ? topic.lead.de : topic.lead.en}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_belgrade"), href: belgradePath(lang) }, { name: title }]} /></div>
      <section className="section"><div className="container" style={{ maxWidth: 820 }}>
        <div className="prose">
          {blocks.map((b, i) => (
            <div key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.items && <ul style={{ lineHeight: 1.9, color: "var(--slate)" }}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 28, borderTop: "1px solid var(--line)", paddingTop: 18 }}>
          <h3 style={{ marginBottom: 10 }}>{lang === "sr" ? "Još o Beogradu" : lang === "de" ? "Mehr über Belgrad" : "More about Belgrade"}</h3>
          <ul style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", listStyle: "none", padding: 0 }}>
            {BG_INFO.filter((x) => x.slug !== topic.slug).map((x) => (
              <li key={x.slug}><Link href={bgInfoPath(x, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>→ {bgInfoTitle(x, lang)}</Link></li>
            ))}
          </ul>
        </div>
      </div></section>
    </>
  );
}
