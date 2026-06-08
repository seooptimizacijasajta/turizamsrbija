"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span style={{ color: "var(--sun)", fontSize: size, letterSpacing: 1 }}>
      {"★★★★★".slice(0, full)}<span style={{ color: "var(--line)" }}>{"★★★★★".slice(full)}</span>
    </span>
  );
}

export default function ReviewForm({ listingId }: { listingId: string }) {
  const { t } = useLang();
  const [rating, setRating] = useState(5);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setBusy(true); setErr("");
    const f = new FormData(ev.currentTarget);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: listingId, author_name: f.get("name"), rating, comment: f.get("comment") }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch { setErr("Greška. / Error."); } finally { setBusy(false); }
  }

  if (sent) return <div className="form-success show">{t("rev_thanks")}</div>;
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 10, marginTop: 12, maxWidth: 460 }}>
      <strong>{t("rev_write")}</strong>
      <div className="field"><label>{t("rev_name")}</label><input required name="name" /></div>
      <div className="field">
        <label>{t("rev_rating")}</label>
        <div style={{ fontSize: 26, cursor: "pointer", color: "var(--sun)" }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span key={n} onClick={() => setRating(n)} style={{ opacity: n <= rating ? 1 : 0.3 }}>★</span>
          ))}
        </div>
      </div>
      <div className="field"><label>{t("rev_comment")}</label><textarea name="comment" rows={3} /></div>
      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <button className="btn btn--primary" disabled={busy} type="submit">{busy ? "..." : t("rev_submit")}</button>
    </form>
  );
}
