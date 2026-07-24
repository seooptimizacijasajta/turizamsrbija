"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import JsonLd from "./JsonLd";
import { homePath } from "@/lib/slug";
import { BLOG_CATS, catName, catPath, type BlogCat } from "@/lib/blogCategories";
import { tri, triL } from "@/lib/inostranstvo";
import type { Post } from "@/lib/blog";

export default function BlogCategoryPage({ cat, posts, extra }: { cat: BlogCat; posts: Post[]; extra?: React.ReactNode }) {
  const { lang, t } = useLang();
  const lc = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const L = (sr: string, en: string, de: string) => (lc === "sr" ? sr : lc === "de" ? de : en);
  const name = catName(cat, lang);
  const co = cat.country;
  const base = lang === "sr" ? "/blog/" : `/${lang}/blog/`;
  const visible = lang === "sr" ? posts : posts.filter((p) => (lang === "de" ? p.title_de : p.title_en));

  const faq = co ? co.faq[lc] : [];
  const ld: Record<string, unknown>[] = [];
  if (faq.length) {
    ld.push({
      "@context": "https://schema.org", "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <>
      {ld.map((d, i) => <JsonLd key={i} data={d} />)}
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${cat.hero}') center/cover no-repeat` }}>
        <div className="container">
          <h1>{co ? `${co.flag} ` : ""}{name}</h1>
          <p>{tri(cat.lead, lang)}</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: t("nav_blog"), href: base.replace(/\/$/, "") }, { name }]} />
      </div>

      <div className="container" style={{ paddingBottom: 50 }}>
        {co && (
          <>
            <div style={{ maxWidth: 840 }}>
              {triL(co.intro, lang).map((p, i) => <p key={i} style={{ lineHeight: 1.85, color: "var(--ink)" }}>{p}</p>)}
            </div>

            <h2 className="section-title" style={{ marginTop: 26 }}>
              {L("Gde ići — najvažnije destinacije", "Where to go — the key destinations", "Wohin — die wichtigsten Ziele")}
            </h2>
            <div style={{ display: "grid", gap: 14, marginTop: 12 }}>
              {co.spots.map((s, i) => (
                <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", background: "#fff" }}>
                  <h3 style={{ margin: "0 0 6px" }}>{tri(s.name, lang)}</h3>
                  <p style={{ margin: 0, lineHeight: 1.8, color: "var(--ink)" }}>{tri(s.text, lang)}</p>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", marginTop: 22 }}>
              {[
                [L("Kada ići", "When to go", "Wann hinfahren"), tri(co.when, lang)],
                [L("Kako stići", "Getting there", "Anreise"), tri(co.travel, lang)],
                [L("Dokumenta i vize", "Documents & visas", "Dokumente & Visum"), tri(co.docs, lang)],
              ].map(([h, p]) => (
                <div key={h} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", background: "var(--sand,#faf7f2)" }}>
                  <h3 style={{ margin: "0 0 6px" }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.8 }}>{p}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="section-title" style={{ marginTop: 32 }}>
          {L(`Tekstovi — ${name}`, `Articles — ${name}`, `Beiträge — ${name}`)}
        </h2>
        {visible.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>
            {L("Uskoro objavljujemo tekstove u ovoj kategoriji.", "Articles in this category are coming soon.", "Beiträge in dieser Kategorie folgen in Kürze.")}
          </p>
        ) : (
          <div className="card-grid" style={{ marginTop: 12 }}>
            {visible.map((p) => {
              const title = (lang === "de" ? p.title_de : lang === "en" ? p.title_en : p.title_sr) || p.title_sr;
              const ex = (lang === "de" ? p.excerpt_de : lang === "en" ? p.excerpt_en : p.excerpt_sr) || p.excerpt_sr || "";
              return (
                <Link key={p.id} className="card" href={base + p.slug}>
                  {p.cover_image && <div className="card-media"><Image fill sizes="(max-width:640px) 100vw, 360px" src={p.cover_image} alt={title} style={{ objectFit: "cover" }} /></div>}
                  <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-desc">{ex}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {faq.length > 0 && (
          <section className="section section--soft" style={{ marginTop: 34, borderRadius: 16 }}>
            <div className="container" style={{ maxWidth: 840 }}>
              <h2 className="section-title" style={{ marginBottom: 18 }}>{L("Česta pitanja", "FAQ", "Häufige Fragen")}</h2>
              <div className="faq">
                {faq.map((f, i) => (
                  <details key={i} className="faq-item"><summary><span>{f.q}</span><span className="faq-ic">+</span></summary><div className="faq-a">{f.a}</div></details>
                ))}
              </div>
            </div>
          </section>
        )}

        {extra}

        <h2 className="section-title" style={{ marginTop: 34 }}>{L("Ostale teme", "Other topics", "Weitere Themen")}</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {BLOG_CATS.filter((x) => x.id !== cat.id).map((x) => (
            <Link key={x.id} href={catPath(x, lang)} className="amen-chip on">
              {x.country ? `${x.country.flag} ` : ""}{catName(x, lang)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
