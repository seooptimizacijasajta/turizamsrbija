"use client";
import { useEffect, useMemo, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import { HONEYPOT_STYLE } from "@/lib/antispam";
import JsonLd from "./JsonLd";

export default function UtisciPage() {
  const { lang, t } = useLang();
  const sb = getBrowserClient();
  const [list, setList] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [tBusy, setTBusy] = useState(false);
  const [fBusy, setFBusy] = useState(false);
  const [tSent, setTSent] = useState(false);
  const [fSent, setFSent] = useState(false);
  const [err, setErr] = useState("");

  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);

  useEffect(() => {
    if (!sb) return;
    sb.from("testimonials").select("*").eq("status", "approved").order("created_at", { ascending: false })
      .then(({ data }) => setList(data || []));
  }, [sb]);

  async function submitT(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sb) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim();
    const body = String(f.get("body") || "").trim();
    if (!name || !body) { setErr(L("Ime i utisak su obavezni.", "Name and review are required.", "Name und Eindruck sind erforderlich.")); return; }
    setTBusy(true); setErr("");
    const r = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "testimonial", name, city: String(f.get("city") || "").trim(), rating, body, lang, hp: String(f.get("hp") || "") }) });
    setTBusy(false);
    if (!r.ok) setErr(L("Greška pri slanju.", "Could not send.", "Senden fehlgeschlagen.")); else { setTSent(true); form.reset(); setRating(5); }
  }

  async function submitF(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sb) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const message = String(f.get("message") || "").trim();
    if (!message) return;
    setFBusy(true);
    const r = await fetch("/api/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "feedback", name: String(f.get("name") || "").trim(), email: String(f.get("email") || "").trim(), message, hp: String(f.get("hp") || "") }) });
    setFBusy(false);
    if (r.ok) { setFSent(true); form.reset(); }
  }

  const avg = useMemo(() => {
    const r = list.filter((x) => x.rating).map((x) => x.rating);
    return r.length ? Math.round((r.reduce((a, b) => a + b, 0) / r.length) * 10) / 10 : 0;
  }, [list]);

  const ld = list.length ? {
    "@context": "https://schema.org", "@type": "Organization", name: "Turizam Srbija", url: "https://turizamsrbija.com",
    ...(avg ? { aggregateRating: { "@type": "AggregateRating", ratingValue: avg, reviewCount: list.length, bestRating: 5 } } : {}),
    review: list.slice(0, 20).map((x) => ({ "@type": "Review", author: { "@type": "Person", name: x.name }, ...(x.rating ? { reviewRating: { "@type": "Rating", ratingValue: x.rating, bestRating: 5 } } : {}), reviewBody: x.body })),
  } : null;

  const heading = L("Utisci korisnika", "What users say", "Erfahrungen der Nutzer");
  const lead = L("Šta gosti i domaćini kažu o portalu — i vaše mesto da ostavite utisak ili predlog.",
    "What guests and hosts say about the portal — and your place to leave a review or suggestion.",
    "Was Gäste und Gastgeber über das Portal sagen — und Ihr Platz für Eindruck oder Vorschlag.");
  const stars = (n: number) => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);

  return (
    <>
      {ld && <JsonLd data={ld} />}
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.55),rgba(15,61,46,.75)),url('https://images.unsplash.com/photo-1521335629791-ce4aec67dd15?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} />
      </div>

      <div className="container" style={{ paddingBottom: 50 }}>
        {/* APPROVED TESTIMONIALS */}
        {list.length > 0 ? (
          <div className="card-grid" style={{ marginTop: 24 }}>
            {list.map((x) => (
              <div className="card" key={x.id} style={{ padding: 18 }}>
                {x.rating ? <div style={{ color: "#e8a13a", fontSize: "1.05rem", letterSpacing: 1 }}>{stars(x.rating)}</div> : null}
                <p style={{ margin: "8px 0 12px", fontStyle: "italic", color: "var(--ink)" }}>“{x.body}”</p>
                <div style={{ fontWeight: 700 }}>{x.name}{x.city ? <span style={{ color: "var(--slate)", fontWeight: 400 }}> · {x.city}</span> : null}</div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--slate)", marginTop: 24 }}>{L("Budite prvi koji će ostaviti utisak.", "Be the first to leave a review.", "Seien Sie der Erste mit einem Eindruck.")}</p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 24, marginTop: 40 }}>
          {/* TESTIMONIAL FORM */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 20 }}>
            <h2 style={{ marginTop: 0 }}>{L("Ostavite utisak", "Leave a review", "Eindruck hinterlassen")}</h2>
            {tSent ? (
              <div className="form-success show">{L("Hvala! Utisak će biti objavljen nakon odobrenja.", "Thank you! Your review will appear after approval.", "Danke! Ihr Eindruck erscheint nach Freigabe.")}</div>
            ) : (
              <form onSubmit={submitT} style={{ display: "grid", gap: 10 }}>
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
                <div className="field"><label>{L("Ime", "Name", "Name")} *</label><input name="name" required /></div>
                <div className="field"><label>{L("Grad (opciono)", "City (optional)", "Stadt (optional)")}</label><input name="city" /></div>
                <div className="field">
                  <label>{L("Ocena", "Rating", "Bewertung")}</label>
                  <div style={{ fontSize: "1.6rem", color: "#e8a13a", cursor: "pointer", userSelect: "none" }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} onClick={() => setRating(n)} title={String(n)}>{n <= rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
                <div className="field"><label>{L("Vaš utisak", "Your review", "Ihr Eindruck")} *</label><textarea name="body" rows={4} required /></div>
                {err && <p style={{ color: "var(--danger)", fontSize: ".9rem", margin: 0 }}>{err}</p>}
                <button className="btn btn--primary" type="submit" disabled={tBusy}>{tBusy ? "..." : L("Pošalji utisak", "Send review", "Eindruck senden")}</button>
              </form>
            )}
          </div>

          {/* FEEDBACK FORM */}
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 20, background: "var(--mist,#f7faf8)" }}>
            <h2 style={{ marginTop: 0 }}>{L("Predlog ili prijava problema", "Suggestion or report an issue", "Vorschlag oder Problem melden")}</h2>
            <p style={{ color: "var(--slate)", fontSize: ".9rem", marginTop: 0 }}>{L("Ovo ide direktno timu portala i ne prikazuje se javno.", "This goes straight to the portal team and is not shown publicly.", "Das geht direkt an das Portal-Team und wird nicht öffentlich angezeigt.")}</p>
            {fSent ? (
              <div className="form-success show">{L("Hvala na povratnoj informaciji!", "Thanks for your feedback!", "Danke für Ihr Feedback!")}</div>
            ) : (
              <form onSubmit={submitF} style={{ display: "grid", gap: 10 }}>
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
                <div className="field"><label>{L("Ime (opciono)", "Name (optional)", "Name (optional)")}</label><input name="name" /></div>
                <div className="field"><label>{L("Email (opciono)", "Email (optional)", "E-Mail (optional)")}</label><input name="email" type="email" /></div>
                <div className="field"><label>{L("Poruka", "Message", "Nachricht")} *</label><textarea name="message" rows={4} required /></div>
                <button className="btn btn--outline" type="submit" disabled={fBusy}>{fBusy ? "..." : L("Pošalji predlog", "Send suggestion", "Vorschlag senden")}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
