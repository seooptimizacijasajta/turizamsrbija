"use client";
import { useLang } from "@/lib/i18n";

const items = [
  { label: "Visa", bg: "#1a1f71", fg: "#fff" },
  { label: "Mastercard", bg: "#16110d", fg: "#fff" },
  { label: "DinaCard", bg: "#0a4a9e", fg: "#fff" },
  { label: "3-D Secure", bg: "#0f3d2e", fg: "#fff" },
  { label: "SSL", bg: "#2e7d32", fg: "#fff" },
];

export default function PaymentBadges({ compact = false }: { compact?: boolean }) {
  const { lang } = useLang();
  return (
    <div className="pay-badges" style={{ textAlign: compact ? "left" : "center" }}>
      {!compact && <div className="pay-badges-h">{lang !== "sr" ? "Secure payment" : "Sigurno plaćanje"}</div>}
      <div className="pay-badges-row">
        {items.map((b) => (
          <span key={b.label} className="pay-badge" style={{ background: b.bg, color: b.fg }}>{b.label}</span>
        ))}
      </div>
      <p className="pay-badges-note">
        {lang !== "sr"
          ? "Card payments are protected by 3-D Secure (Verified by Visa & Mastercard ID Check). We never store your card details."
          : "Plaćanje karticama zaštićeno je 3-D Secure tehnologijom (Verified by Visa i Mastercard ID Check). Podatke vaše kartice ne čuvamo."}
      </p>
    </div>
  );
}
