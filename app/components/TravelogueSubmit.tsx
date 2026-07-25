"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

type L3 = { sr: string; en: string; de: string };
const tt = (o: L3, l: string) => (l === "sr" ? o.sr : l === "de" ? o.de : o.en);

/** Forma preko koje posetioci šalju svoj putopis. Ništa se ne objavljuje automatski —
 *  putopis stiže na info@ i administrator ga, ako je dobar, objavljuje kao blog post.
 *  Svi linkovi u objavljenom putopisu se prikazuju kao rel="nofollow ugc". */
export default function TravelogueSubmit() {
  const { lang } = useLang();
  const l = lang;
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) || "").trim();
    if (!g("name") || !g("title") || !g("message")) { setErr("*"); setBusy(false); return; }
    try {
      const r = await fetch("/api/submit", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "travelogue", name: g("name"), destination: g("destination"), title: g("title"), source: g("source"), message: g("message"), lang }),
      });
      if (!r.ok) throw new Error("save failed");
      setSent(true);
    } catch (x: any) { setErr(x.message || "Greška / Error"); } finally { setBusy(false); }
  }

  const heading = tt({ sr: "Podelite svoj putopis", en: "Share your travelogue", de: "Teilen Sie Ihren Reisebericht" }, l);

  return (
    <section className="section section--soft" style={{ marginTop: 34, borderRadius: 16 }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <h2 className="section-title" style={{ marginBottom: 6 }}>{heading}</h2>
        <p style={{ color: "var(--slate)", marginBottom: 18 }}>
          {tt({
            sr: "Bili ste negde u Srbiji ili regionu i imate priču? Pošaljite je — najbolje putopise objavljujemo na portalu, uz vaše ime.",
            en: "Been somewhere in Serbia or the region and have a story? Send it — we publish the best travelogues on the portal, with your name.",
            de: "Waren Sie irgendwo in Serbien oder der Region und haben eine Geschichte? Schicken Sie sie — die besten Reiseberichte veröffentlichen wir mit Ihrem Namen.",
          }, l)}
        </p>
        {sent ? (
          <div className="empty" style={{ color: "var(--green-600)" }}>
            ✓ {tt({ sr: "Hvala! Vaš putopis je poslat i čeka pregled pre objave.", en: "Thank you! Your travelogue has been sent and awaits review before publishing.", de: "Danke! Ihr Reisebericht wurde gesendet und wartet auf Prüfung vor der Veröffentlichung." }, l)}
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
            <div className="field-row">
              <div className="field"><label>{tt({ sr: "Vaše ime *", en: "Your name *", de: "Ihr Name *" }, l)}</label><input name="name" required /></div>
              <div className="field"><label>{tt({ sr: "Destinacija", en: "Destination", de: "Reiseziel" }, l)}</label><input name="destination" placeholder={tt({ sr: "npr. Tara, Grčka…", en: "e.g. Tara, Greece…", de: "z. B. Tara, Griechenland…" }, l)} /></div>
            </div>
            <div className="field"><label>{tt({ sr: "Naslov putopisa *", en: "Travelogue title *", de: "Titel des Reiseberichts *" }, l)}</label><input name="title" required /></div>
            <div className="field"><label>{tt({ sr: "Vaš putopis *", en: "Your travelogue *", de: "Ihr Reisebericht *" }, l)}</label><textarea name="message" rows={8} required placeholder={tt({ sr: "Ispričajte kako je bilo — rute, troškovi, utisci, saveti…", en: "Tell us how it was — routes, costs, impressions, tips…", de: "Erzählen Sie, wie es war — Routen, Kosten, Eindrücke, Tipps…" }, l)} /></div>
            <div className="field"><label>{tt({ sr: "Link ka slikama ili videu (opciono)", en: "Link to photos or video (optional)", de: "Link zu Fotos oder Video (optional)" }, l)}</label><input name="source" placeholder="https://…" /></div>
            {err && err !== "*" && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
            {err === "*" && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{tt({ sr: "Ime, naslov i tekst su obavezni.", en: "Name, title and text are required.", de: "Name, Titel und Text sind erforderlich." }, l)}</p>}
            <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>{busy ? "..." : tt({ sr: "Pošalji putopis", en: "Send travelogue", de: "Reisebericht senden" }, l)}</button>
            <p className="booking-note" style={{ textAlign: "center" }}>
              {tt({ sr: "Objavljujemo posle pregleda. Linkovi u putopisu se prikazuju kao „nofollow“.", en: "Published after review. Links in the travelogue are shown as \"nofollow\".", de: "Veröffentlichung nach Prüfung. Links im Bericht werden als „nofollow“ angezeigt." }, l)}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
