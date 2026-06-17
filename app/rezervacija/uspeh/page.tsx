import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rezervacija potvrđena — Turizam Srbija",
  description: "Vaša rezervacija i uplata su uspešno primljene.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/rezervacija/uspeh" },
};

export default function ReservationSuccess() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 640, textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>✅</div>
        <h1>Rezervacija potvrđena</h1>
        <p style={{ color: "var(--slate)", marginTop: 12 }}>
          Hvala! Vaša uplata je uspešno primljena, a rezervacija je potvrđena.
          Domaćin je obavešten i kontaktiraće vas sa detaljima dolaska. Potvrdu
          ćete dobiti i na email.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link className="btn btn--primary" href="/">Nazad na početnu</Link>
          <Link className="btn btn--outline" href="/smestaj">Pogledaj još smeštaja</Link>
        </div>
      </div>
    </section>
  );
}
