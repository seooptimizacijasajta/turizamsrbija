"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import { TERMS, termLabel, termDef, termPath } from "@/lib/recnik";

export default function RecnikIndex() {
  const { lang, t } = useLang();
  const [q, setQ] = useState("");
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);

  const sorted = useMemo(() => [...TERMS].sort((a, b) => termLabel(a, lang).localeCompare(termLabel(b, lang), lang)), [lang]);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? sorted.filter((tm) => (termLabel(tm, lang) + " " + termDef(tm, lang)).toLowerCase().includes(s)) : sorted;
  }, [sorted, q, lang]);

  const heading = L("Rečnik turizma", "Tourism glossary", "Tourismus-Glossar");
  const lead = L("Objašnjenja najvažnijih pojmova iz turizma, smeštaja i rezervacija.",
    "Explanations of the key terms in tourism, accommodation and bookings.",
    "Erklärungen der wichtigsten Begriffe aus Tourismus, Unterkunft und Buchung.");

  const ld = {
    "@context": "https://schema.org", "@type": "DefinedTermSet", name: heading,
    hasDefinedTerm: TERMS.map((tm) => ({ "@type": "DefinedTerm", name: termLabel(tm, lang), description: termDef(tm, lang), url: "https://turizamsrbija.com" + termPath(tm.slug, lang) })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.5),rgba(15,61,46,.72)),url('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <div className="toolbar" style={{ marginTop: 8 }}>
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={L("Pretraga pojmova…", "Search terms…", "Begriffe suchen…")} />
        </div>
        {list.length ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginTop: 18 }}>
            {list.map((tm) => (
              <Link key={tm.slug} href={termPath(tm.slug, lang)} className="card" style={{ padding: 16, display: "block" }}>
                <div style={{ fontWeight: 700, color: "var(--green-700)" }}>{termLabel(tm, lang)}</div>
                <p style={{ margin: "6px 0 0", fontSize: ".9rem", color: "var(--slate)" }}>{termDef(tm, lang).slice(0, 92)}…</p>
              </Link>
            ))}
          </div>
        ) : <div className="empty" style={{ marginTop: 18 }}>{t("no_results")}</div>}
      </div>
    </>
  );
}
