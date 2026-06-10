"use client";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import { getBrowserClient } from "@/lib/supabaseBrowser";

type L3 = { sr: string; en: string; de: string };
const tt = (o: L3, l: string) => l === "sr" ? o.sr : l === "de" ? o.de : o.en;

const PACKAGES: { icon: string; title: L3; desc: L3 }[] = [
  { icon: "⭐", title: { sr: "Izdvojeno u kategoriji", en: "Featured in category", de: "Hervorgehoben in der Kategorie" },
    desc: { sr: "Vaš oglas na vrhu liste u svojoj kategoriji (planine, banje, apartmani…), ispred konkurencije.", en: "Your listing at the top of its category (mountains, spas, apartments…), ahead of the competition.", de: "Ihr Angebot oben in seiner Kategorie (Berge, Kurorte, Apartments…), vor der Konkurrenz." } },
  { icon: "🏠", title: { sr: "Izdvojeno na početnoj", en: "Featured on homepage", de: "Auf der Startseite hervorgehoben" },
    desc: { sr: "Pozicija u izdvojenoj sekciji na naslovnoj strani — maksimalna vidljivost svim posetiocima.", en: "A spot in the featured section on the homepage — maximum visibility to all visitors.", de: "Ein Platz im Empfehlungsbereich der Startseite — maximale Sichtbarkeit." } },
  { icon: "🔆", title: { sr: "Podebljan (zlatni) oglas", en: "Bold (gold) listing", de: "Hervorgehobenes (goldenes) Angebot" },
    desc: { sr: "Zlatni okvir i istaknut stil koji privlači pažnju u svakoj listi i pretrazi.", en: "A gold frame and standout style that draws attention in every list and search.", de: "Ein goldener Rahmen und auffälliger Stil in jeder Liste und Suche." } },
  { icon: "🖼️", title: { sr: "Baneri", en: "Banners", de: "Banner" },
    desc: { sr: "Reklamni baner na vidljivim mestima — gornji, bočni (sidebar) ili donji, na desktopu i mobilnom.", en: "Ad banners in prominent spots — top, sidebar or bottom, on desktop and mobile.", de: "Werbebanner an sichtbaren Stellen — oben, Sidebar oder unten, Desktop und mobil." } },
  { icon: "📰", title: { sr: "PR / sponzorisani članci", en: "PR / sponsored articles", de: "PR / gesponserte Artikel" },
    desc: { sr: "Trajan članak na našem blogu o vašem objektu ili usluzi — donosi posete i SEO dugoročno.", en: "A permanent article on our blog about your property or service — brings visits and SEO long-term.", de: "Ein dauerhafter Artikel in unserem Blog über Ihr Objekt — bringt langfristig Besuche und SEO." } },
  { icon: "📣", title: { sr: "Promocija na mrežama", en: "Social media promotion", de: "Promotion in sozialen Medien" },
    desc: { sr: "Objave i promocija vašeg sadržaja na našim društvenim mrežama i u newsletteru.", en: "Posts and promotion of your content on our social media and newsletter.", de: "Beiträge und Promotion Ihrer Inhalte in unseren sozialen Medien und im Newsletter." } },
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

export default function MarketingPage() {
  const { lang, t } = useLang();
  const l = lang;
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

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
      setSent(true);
    } catch (x: any) { setErr(x.message || "Greška / Error"); } finally { setBusy(false); }
  }

  const heading = tt({ sr: "Oglašavanje na Turizam Srbija", en: "Advertise on Turizam Srbija", de: "Werben auf Turizam Srbija" }, l);
  const lead = tt({ sr: "Vaša direktna veza sa turistima u Srbiji i regionu — istaknite svoj biznis pred publikom koja aktivno traži smeštaj i destinacije.", en: "Your direct line to travellers in Serbia and the region — put your business in front of an audience actively searching for stays and destinations.", de: "Ihre direkte Verbindung zu Reisenden in Serbien und der Region — präsentieren Sie Ihr Geschäft einer aktiv suchenden Zielgruppe." }, l);

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.75)),url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(l) }, { name: heading }]} /></div>

      <section className="section"><div className="container">
        <div className="section-head"><div className="eyebrow">{tt({ sr: "Opcije oglašavanja", en: "Advertising options", de: "Werbeoptionen" }, l)}</div>
          <h2 className="section-title">{tt({ sr: "Kako da istaknete svoj biznis", en: "How to put your business in the spotlight", de: "So rücken Sie Ihr Geschäft ins Rampenlicht" }, l)}</h2></div>
        <div className="card-grid">
          {PACKAGES.map((p, i) => (
            <div className="card" key={i} style={{ padding: 24 }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 8 }}>{p.icon}</div>
              <h3 style={{ marginBottom: 8 }}>{tt(p.title, l)}</h3>
              <p style={{ color: "var(--slate)" }}>{tt(p.desc, l)}</p>
            </div>
          ))}
        </div>
      </div></section>

      <section className="section section--soft"><div className="container" style={{ maxWidth: 640 }}>
        <h2 className="section-title" style={{ marginBottom: 8, textAlign: "center" }}>{tt({ sr: "Zatražite ponudu", en: "Request a quote", de: "Angebot anfordern" }, l)}</h2>
        <p style={{ textAlign: "center", color: "var(--slate)", marginBottom: 20 }}>{tt({ sr: "Ostavite podatke i javljamo se sa predlogom saradnje prilagođenim vašem budžetu.", en: "Leave your details and we'll reply with a proposal tailored to your budget.", de: "Hinterlassen Sie Ihre Daten — wir melden uns mit einem auf Ihr Budget zugeschnittenen Vorschlag." }, l)}</p>
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
            <div className="field"><label>{tt({ sr: "Opcija koja vas zanima", en: "Option of interest", de: "Gewünschte Option" }, l)}</label>
              <select name="package">{PACKAGES.map((p, i) => <option key={i} value={p.title.sr}>{tt(p.title, l)}</option>)}<option value="">{tt({ sr: "Nisam siguran/na", en: "Not sure yet", de: "Noch unsicher" }, l)}</option></select>
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
