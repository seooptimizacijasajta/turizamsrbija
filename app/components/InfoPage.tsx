"use client";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";

const CONTENT: Record<string, { sr: [string, string]; en: [string, string]; de: [string, string] }> = {
  about: {
    sr: ["O nama", "Turizam Srbija je portal posvećen promociji najlepših destinacija i smeštaja u Srbiji — planina, jezera, banja, etno sela i apartmana. Naš cilj je da na jednom mestu, na srpskom, engleskom i nemačkom jeziku, povežemo goste iz zemlje i sveta sa domaćinima širom Srbije. Vlasnici smeštaja oglašavaju besplatno, a plaćaju tek kada im dovedemo goste."],
    en: ["About us", "Turizam Srbija is a portal dedicated to promoting Serbia's finest destinations and accommodation — mountains, lakes, spas, ethno villages and apartments. Our goal is to connect guests from Serbia and abroad with hosts across the country, in Serbian, English and German. Hosts list for free and pay only when we bring them guests."],
    de: ["Über uns", "Turizam Srbija ist ein Portal zur Förderung der schönsten Reiseziele und Unterkünfte Serbiens — Berge, Seen, Kurorte, Ethno-Dörfer und Apartments. Unser Ziel ist es, an einem Ort, auf Serbisch, Englisch und Deutsch, Gäste aus dem In- und Ausland mit Gastgebern in ganz Serbien zu verbinden. Vermieter inserieren kostenlos und zahlen erst, wenn wir ihnen Gäste bringen."],
  },
  terms: {
    sr: ["Uslovi korišćenja", "Korišćenjem portala Turizam Srbija prihvatate ove uslove. Portal povezuje goste i domaćine; rezervacije i plaćanja se dogovaraju između strana. Domaćini su odgovorni za tačnost svojih oglasa. Zadržavamo pravo uklanjanja sadržaja koji krši pravila. (Napomena: ovo je osnovni šablon — preporučujemo da konačne uslove pregleda pravnik.)"],
    en: ["Terms of use", "By using the Turizam Srbija portal you accept these terms. The portal connects guests and hosts; bookings and payments are arranged between the parties. Hosts are responsible for the accuracy of their listings. We reserve the right to remove content that violates the rules. (Note: this is a basic template — we recommend a lawyer reviews the final terms.)"],
    de: ["Nutzungsbedingungen", "Mit der Nutzung des Portals Turizam Srbija akzeptieren Sie diese Bedingungen. Das Portal verbindet Gäste und Gastgeber; Buchungen und Zahlungen werden zwischen den Parteien vereinbart. Gastgeber sind für die Richtigkeit ihrer Inserate verantwortlich. Wir behalten uns das Recht vor, Inhalte zu entfernen, die gegen die Regeln verstoßen. (Hinweis: Dies ist eine Grundvorlage — wir empfehlen, die endgültigen Bedingungen von einem Juristen prüfen zu lassen.)"],
  },
  privacy: {
    sr: ["Politika privatnosti", "Prikupljamo samo podatke neophodne za funkcionisanje portala (ime, email, telefon kod upita i recenzija). Podatke ne prodajemo trećim licima. Možete zatražiti brisanje svojih podataka na info@turizamsrbija.com. (Napomena: uskladiti sa GDPR/Zakonom o zaštiti podataka uz pravnu proveru.)"],
    en: ["Privacy policy", "We collect only the data necessary to run the portal (name, email, phone for inquiries and reviews). We do not sell data to third parties. You may request deletion of your data at info@turizamsrbija.com. (Note: align with GDPR/data-protection law with legal review.)"],
    de: ["Datenschutzerklärung", "Wir erheben nur die für den Betrieb des Portals notwendigen Daten (Name, E-Mail, Telefon bei Anfragen und Bewertungen). Wir verkaufen keine Daten an Dritte. Sie können die Löschung Ihrer Daten unter info@turizamsrbija.com beantragen. (Hinweis: mit DSGVO/Datenschutzrecht nach rechtlicher Prüfung abzustimmen.)"],
  },
};

export default function InfoPage({ page }: { page: "about" | "terms" | "privacy" }) {
  const { lang } = useLang();
  const [title, body] = CONTENT[page][lang === "sr" ? "sr" : lang === "de" ? "de" : "en"];
  return (
    <section className="section"><div className="container" style={{ maxWidth: 760 }}>
      <Breadcrumbs items={[{ name: lang === "sr" ? "Početna" : lang === "de" ? "Startseite" : "Home", href: homePath(lang) }, { name: title }]} />
      <h1 style={{ marginBottom: 18 }}>{title}</h1>
      <p style={{ color: "var(--slate)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{body}</p>
    </div></section>
  );
}
