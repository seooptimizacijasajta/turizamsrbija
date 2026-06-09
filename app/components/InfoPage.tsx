"use client";
import { useLang } from "@/lib/i18n";

const CONTENT: Record<string, { sr: [string, string]; en: [string, string] }> = {
  about: {
    sr: ["O nama", "Turizam Srbija je portal posvećen promociji najlepših destinacija i smeštaja u Srbiji — planina, jezera, banja, etno sela i apartmana. Naš cilj je da na jednom mestu, na srpskom i engleskom jeziku, povežemo goste iz zemlje i sveta sa domaćinima širom Srbije. Vlasnici smeštaja oglašavaju besplatno, a plaćaju tek kada im dovedemo goste."],
    en: ["About us", "Turizam Srbija is a portal dedicated to promoting Serbia's finest destinations and accommodation — mountains, lakes, spas, ethno villages and apartments. Our goal is to connect guests from Serbia and abroad with hosts across the country, in Serbian and English. Hosts list for free and pay only when we bring them guests."],
  },
  terms: {
    sr: ["Uslovi korišćenja", "Korišćenjem portala Turizam Srbija prihvatate ove uslove. Portal povezuje goste i domaćine; rezervacije i plaćanja se dogovaraju između strana. Domaćini su odgovorni za tačnost svojih oglasa. Zadržavamo pravo uklanjanja sadržaja koji krši pravila. (Napomena: ovo je osnovni šablon — preporučujemo da konačne uslove pregleda pravnik.)"],
    en: ["Terms of use", "By using the Turizam Srbija portal you accept these terms. The portal connects guests and hosts; bookings and payments are arranged between the parties. Hosts are responsible for the accuracy of their listings. We reserve the right to remove content that violates the rules. (Note: this is a basic template — we recommend a lawyer reviews the final terms.)"],
  },
  privacy: {
    sr: ["Politika privatnosti", "Prikupljamo samo podatke neophodne za funkcionisanje portala (ime, email, telefon kod upita i recenzija). Podatke ne prodajemo trećim licima. Možete zatražiti brisanje svojih podataka na info@turizamsrbija.com. (Napomena: uskladiti sa GDPR/Zakonom o zaštiti podataka uz pravnu proveru.)"],
    en: ["Privacy policy", "We collect only the data necessary to run the portal (name, email, phone for inquiries and reviews). We do not sell data to third parties. You may request deletion of your data at info@turizamsrbija.com. (Note: align with GDPR/data-protection law with legal review.)"],
  },
};

export default function InfoPage({ page }: { page: "about" | "terms" | "privacy" }) {
  const { lang } = useLang();
  const [title, body] = CONTENT[page][lang];
  return (
    <section className="section"><div className="container" style={{ maxWidth: 760 }}>
      <h1 style={{ marginBottom: 18 }}>{title}</h1>
      <p style={{ color: "var(--slate)", lineHeight: 1.8, whiteSpace: "pre-line" }}>{body}</p>
    </div></section>
  );
}
