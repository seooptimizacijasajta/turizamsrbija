"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import { TERMS, termBySlug, termLabel, termDef, termPath, recnikPath } from "@/lib/recnik";

export default function RecnikTerm({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const term = termBySlug(slug);
  const heading = L("Rečnik turizma", "Tourism glossary", "Tourismus-Glossar");

  if (!term) {
    return (
      <div className="container" style={{ padding: "60px 0", maxWidth: 700 }}>
        <h1>{L("Pojam nije pronađen", "Term not found", "Begriff nicht gefunden")}</h1>
        <p style={{ marginTop: 10 }}><Link className="btn btn--outline" href={recnikPath(lang)}>← {heading}</Link></p>
      </div>
    );
  }

  const idx = TERMS.findIndex((x) => x.slug === term.slug);
  const related = [1, 2, 3, 4, 5, 6].map((o) => TERMS[(idx + o) % TERMS.length]).filter((x) => x.slug !== term.slug);

  const ld = {
    "@context": "https://schema.org", "@type": "DefinedTerm",
    name: termLabel(term, lang), description: termDef(term, lang),
    inDefinedTermSet: "https://turizamsrbija.com" + recnikPath(lang),
    url: "https://turizamsrbija.com" + termPath(term.slug, lang),
  };

  return (
    <>
      <JsonLd data={ld} />
      <div className="container" style={{ padding: "28px 0 60px", maxWidth: 760 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading, href: recnikPath(lang) }, { name: termLabel(term, lang) }]} />
        <h1 style={{ marginTop: 14 }}>{termLabel(term, lang)}</h1>
        <p style={{ fontSize: "1.08rem", lineHeight: 1.65, color: "var(--ink)" }}>{termDef(term, lang)}</p>

        <div style={{ marginTop: 30 }}>
          <h2 style={{ fontSize: "1.05rem", marginBottom: 10 }}>{L("Drugi pojmovi", "More terms", "Weitere Begriffe")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {related.map((x) => <Link key={x.slug} href={termPath(x.slug, lang)} className="amen-chip">{termLabel(x, lang)}</Link>)}
          </div>
          <p style={{ marginTop: 22 }}><Link className="btn btn--outline" href={recnikPath(lang)}>← {heading}</Link></p>
        </div>
      </div>
    </>
  );
}
