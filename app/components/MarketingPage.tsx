"use client";
import { useState, useRef } from "react";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import { getBrowserClient } from "@/lib/supabaseBrowser";

type L3 = { sr: string; en: string; de: string };
const tt = (o: L3, l: string) => (l === "sr" ? o.sr : l === "de" ? o.de : o.en);

/** Paketi oglašavanja — cene u dinarima (mesečno). Godišnje = 2 meseca gratis. */
const PLANS: {
  id: string;
  name: L3;
  monthly: number;
  yearly: number;
  featured?: boolean;
  tagline: L3;
  features: L3[];
}[] = [
  {
    id: "osnovni",
    name: { sr: "Osnovni", en: "Basic", de: "Basis" },
    monthly: 1500,
    yearly: 15000,
    tagline: { sr: "Da vas gosti pronađu i pozovu", en: "So guests can find and call you", de: "Damit Gäste Sie finden und anrufen" },
    features: [
      { sr: "Klikabilan link ka vašem sajtu", en: "Clickable link to your website", de: "Klickbarer Link zu Ihrer Website" },
      { sr: "Prikazan telefon i Viber/WhatsApp", en: "Phone and Viber/WhatsApp shown", de: "Telefon und Viber/WhatsApp sichtbar" },
      { sr: "Vrh liste u vašoj kategoriji", en: "Top of the list in your category", de: "Oben in Ihrer Kategorie" },
      { sr: "Oznaka „Preporučeno“", en: "\"Recommended\" badge", de: "„Empfohlen“-Kennzeichen" },
    ],
  },
  {
    id: "plus",
    name: { sr: "Plus", en: "Plus", de: "Plus" },
    monthly: 3500,
    yearly: 35000,
    featured: true,
    tagline: { sr: "Najbolji odnos cene i vidljivosti", en: "Best value for visibility", de: "Bestes Preis-Sichtbarkeits-Verhältnis" },
    features: [
      { sr: "Sve iz paketa Osnovni", en: "Everything in Basic", de: "Alles aus Basis" },
      { sr: "Zlatni, istaknut oglas", en: "Gold, highlighted listing", de: "Goldenes, hervorgehobenes Angebot" },
      { sr: "Izdvojeno na početnoj strani", en: "Featured on the homepage", de: "Auf der Startseite hervorgehoben" },
      { sr: "Prednost u AI pretrazi", en: "Priority in AI search", de: "Priorität in der KI-Suche" },
    ],
  },
  {
    id: "premium",
    name: { sr: "Premium", en: "Premium", de: "Premium" },
    monthly: 7000,
    yearly: 70000,
    tagline: { sr: "Maksimalna vidljivost + sadržaj", en: "Maximum visibility + content", de: "Maximale Sichtbarkeit + Inhalt" },
    features: [
      { sr: "Sve iz paketa Plus", en: "Everything in Plus", de: "Alles aus Plus" },
      { sr: "Reklamni baner (bočni ili gornji)", en: "Ad banner (sidebar or top)", de: "Werbebanner (Sidebar oder oben)" },
      { sr: "PR članak na blogu (trajan)", en: "PR article on the blog (permanent)", de: "PR-Artikel im Blog (dauerhaft)" },
      { sr: "Objava na našim mrežama", en: "Post on our social media", de: "Beitrag in unseren sozialen Medien" },
    ],
  },
];

/** Dokupi po komadu — za one koji hoće samo jednu stvar. */
const ADDONS: { name: L3; price: L3 }[] = [
  { name: { sr: "Baner (gore / bok / dole)", en: "Banner (top / side / bottom)", de: "Banner (oben / Seite / unten)" }, price: { sr: "4.000 din / mesec", en: "RSD 4,000 / month", de: "4.000 RSD / Monat" } },
  { name: { sr: "PR članak na blogu (trajan)", en: "PR article on the blog (permanent)", de: "PR-Artikel im Blog (dauerhaft)" }, price: { sr: "6.000 din jednokratno", en: "RSD 6,000 one-off", de: "6.000 RSD einmalig" } },
  { name: { sr: "Objava na Instagramu / Facebooku", en: "Instagram / Facebook post", de: "Instagram-/Facebook-Beitrag" }, price: { sr: "2.000 din po objavi", en: "RSD 2,000 per post", de: "2.000 RSD pro Beitrag" } },
];

const BIZ: L3[] = [
  { sr: "Smeštajni objekat", en: "Accommodation", de: "Unterkunft" },
  { sr: "Ugostiteljski objekat", en: "Restaurant / café", de: "Gastronomie" },
  { sr: "Turistička atrakcija", en: "Tourist attraction", de: "Touristische Attraktion" },
  { sr: "Aktivnosti i najam", en: "Activities & rentals", de: "Aktivitäten & Verleih" },
  { sr: "Agencija ili vodič", en: "Agency or guide", de: "Agentur oder Reiseleiter" },
  { sr: "Proizvođač lokalnih proizvoda", en: "Local producer", de: "Lokaler Erzeuger" },
  { sr: "Event / organizator", en: "Event organiser", de: "Veranstalter" },
  { sr: "Mediji / influenser", en: "Media / influencer", de: "Medien / Influencer" },
  { sr: "Nekretnine / investitor", en: "Real estate / investor", de: "Immobilien / Investor" },
  { sr: "Ostalo", en: "Other", de: "Sonstiges" },
];

const fmt = (n: number) => n.toLocaleString("sr-RS");

export default function MarketingPage() {
  const { lang, t } = useLang();
  const l = lang;
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [chosen, setChosen] = useState<string>("");
  const formRef = useRef<HTMLDivElement | null>(null);
  const pkgSelect = useRef<HTMLSelectElement | null>(null);

  function pick(planName: string) {
    setChosen(planName);
    if (pkgSelect.current) pkgSelect.current.value = planName;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) || "").trim();
    if (!g("name")) { setErr("*"); setBusy(false); return; }
    try {
      const sb = getBrowserClient();
      if (sb) {
        const { error } = await sb.from("marketing_leads").insert({
          name: g("name"), email: g("email"), phone: g("phone"), business_type: g("business_type"), package: g("package"), message: g("message"),
        });
        if (error) throw error;
      }
      fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "lead", name: g("name"), email: g("email"), phone: g("phone"), business_type: g("business_type"), package: g("package"), message: g("message") }) }).catch(() => {});
      setSent(true);
    } catch (x: any) { setErr(x.message || "Greška / Error"); } finally { setBusy(false); }
  }

  const heading = tt({ sr: "Oglašavanje na Turizam Srbija", en: "Advertise on Turizam Srbija", de: "Werben auf Turizam Srbija" }, l);
  const lead = tt({ sr: "Vaša direktna veza sa turistima u Srbiji i regionu — istaknite svoj biznis pred publikom koja aktivno traži smeštaj i destinacije.", en: "Your direct line to travellers in Serbia and the region — put your business in front of an audience actively searching for stays and destinations.", de: "Ihre direkte Verbindung zu Reisenden in Serbien und der Region — präsentieren Sie Ihr Geschäft einer aktiv suchenden Zielgruppe." }, l);
  const perMonth = tt({ sr: "/ mesec", en: "/ month", de: "/ Monat" }, l);
  const yearlyNote = (y: number) => tt({ sr: `ili ${fmt(y)} din godišnje (2 meseca gratis)`, en: `or RSD ${fmt(y)} per year (2 months free)`, de: `oder ${fmt(y)} RSD/Jahr (2 Monate gratis)` }, l);

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.75)),url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(l) }, { name: heading }]} /></div>

      {/* Gratis banner */}
      <div className="container" style={{ marginTop: 8 }}>
        <div style={{ background: "linear-gradient(90deg,#0f3d2e,#1c6b4f)", color: "#fff", borderRadius: 14, padding: "14px 20px", textAlign: "center", fontWeight: 600 }}>
          🎁 {tt({ sr: "Prvih 30 dana paketa Osnovni je besplatno — aktivirajte link bez obaveze.", en: "The first 30 days of the Basic plan are free — activate your link with no obligation.", de: "Die ersten 30 Tage des Basis-Pakets sind kostenlos — aktivieren Sie Ihren Link unverbindlich." }, l)}
        </div>
      </div>

      {/* Paketi */}
      <section className="section"><div className="container">
        <div className="section-head">
          <div className="eyebrow">{tt({ sr: "Paketi oglašavanja", en: "Advertising plans", de: "Werbepakete" }, l)}</div>
          <h2 className="section-title">{tt({ sr: "Izaberite paket", en: "Choose a plan", de: "Paket wählen" }, l)}</h2>
          <p className="section-lead">{tt({ sr: "Jasne cene, bez skrivenih troškova. Plaćanje po dogovoru — uplatom na račun.", en: "Clear prices, no hidden costs. Payment by arrangement — bank transfer.", de: "Klare Preise, keine versteckten Kosten. Zahlung nach Vereinbarung — per Überweisung." }, l)}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18, alignItems: "stretch" }}>
          {PLANS.map((p) => (
            <div key={p.id} className="card" style={{ padding: 24, display: "flex", flexDirection: "column", border: p.featured ? "2px solid var(--green-600)" : "1px solid var(--line)", position: "relative" }}>
              {p.featured && (
                <span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "var(--green-600)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 999 }}>
                  {tt({ sr: "NAJPOPULARNIJI", en: "MOST POPULAR", de: "AM BELIEBTESTEN" }, l)}
                </span>
              )}
              <h3 style={{ margin: "4px 0 2px", fontSize: "1.3rem" }}>{tt(p.name, l)}</h3>
              <p style={{ color: "var(--slate)", fontSize: ".9rem", minHeight: 38 }}>{tt(p.tagline, l)}</p>
              <div style={{ margin: "10px 0 2px" }}>
                <span style={{ fontSize: "2rem", fontWeight: 800 }}>{fmt(p.monthly)}</span>
                <span style={{ color: "var(--slate)" }}> din {perMonth}</span>
              </div>
              <div style={{ fontSize: ".82rem", color: "var(--green-600)", marginBottom: 14 }}>{yearlyNote(p.yearly)}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "grid", gap: 8, flex: 1 }}>
                {p.features.map((f, i) => (
                  <li key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: ".95rem" }}>
                    <span style={{ color: "var(--green-600)", fontWeight: 700 }}>✓</span> {tt(f, l)}
                  </li>
                ))}
              </ul>
              <button className={p.featured ? "btn btn--primary" : "btn btn--outline"} onClick={() => pick(tt(p.name, "sr"))}>
                {tt({ sr: "Izaberi", en: "Choose", de: "Wählen" }, l)} {tt(p.name, l)}
              </button>
            </div>
          ))}
        </div>

        {/* Dokupi po komadu */}
        <div className="section-head" style={{ marginTop: 40 }}>
          <h2 className="section-title" style={{ fontSize: "1.3rem" }}>{tt({ sr: "Dokupi po komadu", en: "À la carte add-ons", de: "Einzeln dazubuchen" }, l)}</h2>
          <p className="section-lead">{tt({ sr: "Ako vam treba samo jedna stvar, uzmite je zasebno — bez paketa.", en: "If you only need one thing, take it on its own — no plan required.", de: "Wenn Sie nur eines brauchen, buchen Sie es einzeln — ohne Paket." }, l)}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          {ADDONS.map((a, i) => (
            <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "16px 18px", background: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <span>{tt(a.name, l)}</span>
              <strong style={{ whiteSpace: "nowrap", color: "var(--green-600)" }}>{tt(a.price, l)}</strong>
            </div>
          ))}
        </div>
      </div></section>

      {/* Forma */}
      <section className="section section--soft"><div className="container" style={{ maxWidth: 640 }} ref={formRef}>
        <h2 className="section-title" style={{ marginBottom: 8, textAlign: "center" }}>{tt({ sr: "Aktivirajte ili zatražite ponudu", en: "Activate or request a quote", de: "Aktivieren oder Angebot anfordern" }, l)}</h2>
        <p style={{ textAlign: "center", color: "var(--slate)", marginBottom: 20 }}>{tt({ sr: "Ostavite podatke i javljamo se u roku od 24h sa uputstvom za uplatu i aktivaciju.", en: "Leave your details and we'll reply within 24h with payment and activation instructions.", de: "Hinterlassen Sie Ihre Daten — wir melden uns binnen 24 Std. mit Zahlungs- und Aktivierungshinweisen." }, l)}</p>
        {sent ? (
          <div className="empty" style={{ color: "var(--green-600)" }}>✓ {tt({ sr: "Hvala! Vaš upit je poslat — javljamo se uskoro.", en: "Thank you! Your enquiry has been sent — we'll be in touch soon.", de: "Danke! Ihre Anfrage wurde gesendet — wir melden uns bald." }, l)}</div>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
            <div className="field"><label>{tt({ sr: "Ime i prezime *", en: "Full name *", de: "Name *" }, l)}</label><input name="name" required /></div>
            <div className="field-row">
              <div className="field"><label>Email</label><input name="email" type="email" /></div>
              <div className="field"><label>{tt({ sr: "Telefon", en: "Phone", de: "Telefon" }, l)}</label><input name="phone" /></div>
            </div>
            <div className="field"><label>{tt({ sr: "Tip biznisa", en: "Business type", de: "Art des Geschäfts" }, l)}</label>
              <select name="business_type">{BIZ.map((b, i) => <option key={i} value={b.sr}>{tt(b, l)}</option>)}</select>
            </div>
            <div className="field"><label>{tt({ sr: "Paket koji vas zanima", en: "Plan of interest", de: "Gewünschtes Paket" }, l)}</label>
              <select name="package" ref={pkgSelect} defaultValue={chosen}>
                {PLANS.map((p) => <option key={p.id} value={tt(p.name, "sr")}>{tt(p.name, l)} — {fmt(p.monthly)} din{perMonth}</option>)}
                <option value="Baner">{tt({ sr: "Samo baner", en: "Banner only", de: "Nur Banner" }, l)}</option>
                <option value="PR članak">{tt({ sr: "Samo PR članak", en: "PR article only", de: "Nur PR-Artikel" }, l)}</option>
                <option value="">{tt({ sr: "Nisam siguran/na", en: "Not sure yet", de: "Noch unsicher" }, l)}</option>
              </select>
            </div>
            <div className="field"><label>{tt({ sr: "Poruka", en: "Message", de: "Nachricht" }, l)}</label><textarea name="message" rows={4} /></div>
            {err && err !== "*" && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
            <button className="btn btn--primary btn--lg" type="submit" disabled={busy}>{busy ? "..." : tt({ sr: "Pošalji upit", en: "Send enquiry", de: "Anfrage senden" }, l)}</button>
            <p className="booking-note" style={{ textAlign: "center" }}>{tt({ sr: "Ili nas pozovite: +381 64 4598778", en: "Or call us: +381 64 4598778", de: "Oder rufen Sie uns an: +381 64 4598778" }, l)}</p>
          </form>
        )}
      </div></section>
    </>
  );
}
