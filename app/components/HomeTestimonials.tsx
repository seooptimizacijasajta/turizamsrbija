"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { useLang } from "@/lib/i18n";

export default function HomeTestimonials() {
  const { lang } = useLang();
  const sb = getBrowserClient();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (!sb) return;
    sb.from("testimonials").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(3)
      .then(({ data }) => setList(data || []));
  }, [sb]);

  if (!list.length) return null;
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const href = lang === "sr" ? "/utisci-korisnika" : lang === "de" ? "/de/erfahrungen" : "/en/reviews";

  return (
    <section className="section section--soft">
      <div className="container">
        <div className="section-head section-head--center">
          <h2 className="section-title">{L("Šta kažu korisnici", "What users say", "Was Nutzer sagen")}</h2>
        </div>
        <div className="card-grid">
          {list.map((x) => (
            <div className="card" key={x.id} style={{ padding: 18 }}>
              {x.rating ? <div style={{ color: "#e8a13a", fontSize: "1.05rem", letterSpacing: 1 }}>{"★".repeat(x.rating)}</div> : null}
              <p style={{ fontStyle: "italic", margin: "8px 0 12px", color: "var(--ink)" }}>“{x.body}”</p>
              <div style={{ fontWeight: 700 }}>{x.name}{x.city ? <span style={{ color: "var(--slate)", fontWeight: 400 }}> · {x.city}</span> : null}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 18 }}>
          <Link className="btn btn--outline" href={href}>{L("Svi utisci", "All reviews", "Alle Erfahrungen")}</Link>
        </div>
      </div>
    </section>
  );
}
