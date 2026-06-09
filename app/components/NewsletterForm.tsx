"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function NewsletterForm() {
  const { lang, t } = useLang();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true);
    const f = new FormData(e.currentTarget);
    try { const r = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: f.get("email"), lang }) }); if (r.ok) setSent(true); } finally { setBusy(false); }
  }
  return (
    <div className="newsletter">
      <div>
        <h4 style={{ marginBottom: 4 }}>{t("news_title")}</h4>
        <p style={{ color: "#bfe0d3", fontSize: ".9rem" }}>{t("news_sub")}</p>
      </div>
      {sent ? <div style={{ color: "#fff", fontWeight: 700 }}>✓ {t("news_thanks")}</div> : (
        <form onSubmit={submit} className="newsletter-form">
          <input required type="email" name="email" placeholder="email@primer.com" />
          <button className="btn btn--primary" disabled={busy} type="submit">{busy ? "..." : t("news_btn")}</button>
        </form>
      )}
    </div>
  );
}
