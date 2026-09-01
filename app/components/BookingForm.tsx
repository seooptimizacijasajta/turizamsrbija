"use client";
import { useState } from "react";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import { useCurrency } from "@/lib/currency";
import { HONEYPOT_STYLE } from "@/lib/antispam";

export default function BookingForm({ item }: { item: Listing }) {
  const { lang, t } = useLang();
  const { price } = useCurrency();
  const isStay = item.type === "stay";
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError("");
    const fd = new FormData(e.currentTarget);
    const payload = {
      listing_id: item.id,
      listing_name: L(item.name, "sr"),
      guest_name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      checkin: fd.get("checkin") || null,
      checkout: fd.get("checkout") || null,
      guests: Number(fd.get("guests")) || 1,
      children: Number(fd.get("children")) || 0,
      message: fd.get("message"),
      hp: fd.get("hp"),
    };
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("bad status");
      setSent(true);
    } catch {
      setError(lang === "sr"
        ? "Greška pri slanju. Pokušajte ponovo."
        : "Could not send. Please try again.");
    } finally { setBusy(false); }
  }

  async function payNow(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const fd = new FormData(form);
    const checkin = fd.get("checkin");
    const checkout = fd.get("checkout");
    if (!checkin || !checkout) {
      setError(lang === "sr" ? "Izaberite datume dolaska i odlaska." : lang === "de" ? "Bitte An- und Abreisedatum wählen." : "Please choose check-in and check-out dates.");
      return;
    }
    setBusy(true); setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ listing_id: item.id, checkin, checkout, guests: Number(fd.get("guests")) || 1 }),
      });
      const j = await res.json().catch(() => ({}));
      if (res.ok && j.url) { window.location.href = j.url; return; }
      if (j.error === "host_not_connected" || j.error === "not_configured") {
        setError(lang === "sr"
          ? "Online plaćanje trenutno nije dostupno za ovaj smeštaj — pošaljite upit ispod, domaćin će vam odgovoriti."
          : lang === "de"
          ? "Online-Zahlung ist für diese Unterkunft noch nicht verfügbar — senden Sie unten eine Anfrage."
          : "Online payment isn't available for this place yet — send an inquiry below.");
      } else {
        setError(lang === "sr" ? "Greška, pokušajte ponovo." : "Something went wrong, please try again.");
      }
    } catch {
      setError(lang === "sr" ? "Greška, pokušajte ponovo." : "Something went wrong, please try again.");
    } finally { setBusy(false); }
  }

  return (
    <aside className="booking">
      {isStay ? (
        item.deal && item.dealPrice != null ? (
          <div className="price-lg"><s style={{ color: "var(--slate)", fontWeight: 400, fontSize: "1rem" }}>{price(item.price)}</s> <span style={{ color: "#e0492f" }}>{price(item.dealPrice)}</span> <small>/ {t("per_night")}</small></div>
        ) : (
          <div className="price-lg">{price(item.price)} <small>/ {t("per_night")}</small></div>
        )
      ) : (
        <div className="price-lg" style={{ color: "var(--green-600)", fontSize: "1.2rem" }}>{t("free_entry")}</div>
      )}
      <h3 style={{ marginTop: 6 }}>{isStay ? t("book_title") : t("inquire_title")}</h3>
      {!sent ? (
        <form onSubmit={onSubmit}>
          <input type="text" name="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" style={HONEYPOT_STYLE} />
          <div className="field"><label>{t("f_name")} *</label><input required name="name" placeholder={t("f_name")} /></div>
          <div className="field"><label>{t("f_email")} *</label><input required type="email" name="email" placeholder="email@example.com" /></div>
          <div className="field"><label>{t("f_phone")} *</label><input required name="phone" placeholder="+381 ..." /></div>
          {isStay && (
            <div className="field-row">
              <div className="field"><label>{t("f_checkin")} *</label><input required type="date" name="checkin" /></div>
              <div className="field"><label>{t("f_checkout")} *</label><input required type="date" name="checkout" /></div>
            </div>
          )}
          <div className="field"><label>{lang === "sr" ? "Odrasli" : lang === "de" ? "Erwachsene" : "Adults"}</label><input type="number" min={1} defaultValue={2} name="guests" /></div>
          <div className="field"><label>{lang === "sr" ? "Deca" : lang === "de" ? "Kinder" : "Children"}</label><input type="number" min={0} defaultValue={0} name="children" /></div>
          <div className="field"><label>{t("f_message")}</label><textarea rows={3} name="message" /></div>
          {isStay && (
            <button type="button" className="btn btn--primary btn--block" onClick={payNow} disabled={busy} style={{ marginBottom: 8 }}>
              {busy ? "..." : (lang === "sr" ? "Rezerviši i plati online" : lang === "de" ? "Buchen & online bezahlen" : "Book & pay online")}
            </button>
          )}
          <button className={"btn btn--block " + (isStay ? "btn--outline" : "btn--primary")} type="submit" disabled={busy}>
            {busy ? "..." : (isStay ? (lang === "sr" ? "Ili pošalji upit (bez plaćanja)" : lang === "de" ? "Oder Anfrage senden" : "Or send inquiry") : t("f_submit"))}
          </button>
          {error && <p className="booking-note" style={{ color: "var(--danger)" }}>{error}</p>}
          <p className="booking-note">{t("f_note")}</p>
        </form>
      ) : (
        <div className="form-success show">{t("f_success")}</div>
      )}
    </aside>
  );
}
