"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";

export default function ContactPage() {
  const { lang } = useLang();
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const en = lang === "en";
  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setBusy(true);
    const f = new FormData(ev.currentTarget);
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guest_name: f.get("name"), email: f.get("email"), phone: f.get("phone"), message: f.get("message") }) });
      if (res.ok) setSent(true);
    } finally { setBusy(false); }
  }
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{en ? "Contact" : "Kontakt"}</h1><p>{en ? "Get in touch with the Turizam Srbija team." : "Javite se timu Turizam Srbija."}</p></div>
      </section>
      <section className="section"><div className="container" style={{ maxWidth: 620 }}>
        <p style={{ color: "var(--slate)", marginBottom: 20 }}>📧 info@turizamsrbija.com · 📍 Beograd, Srbija</p>
        {sent ? <div className="form-success show">{en ? "Thank you! We'll reply soon." : "Hvala! Javljamo se uskoro."}</div> : (
          <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
            <div className="field"><label>{en ? "Name" : "Ime"}</label><input required name="name" /></div>
            <div className="field"><label>Email</label><input required type="email" name="email" /></div>
            <div className="field"><label>{en ? "Phone" : "Telefon"}</label><input name="phone" /></div>
            <div className="field"><label>{en ? "Message" : "Poruka"}</label><textarea required name="message" rows={5} /></div>
            <button className="btn btn--primary" disabled={busy} type="submit">{busy ? "..." : en ? "Send" : "Pošalji"}</button>
          </form>
        )}
      </div></section>
    </>
  );
}
