"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import FaqAccordion from "./FaqAccordion";
import type { Faq } from "@/lib/faq";
import { homePath } from "@/lib/slug";
import { amenityPath } from "@/lib/amenities";

const FAQ: Record<"sr" | "en" | "de", Faq[]> = {
  sr: [
    { q: "Šta su turistički vaučeri?", a: "Turistički vaučeri su podsticaj države za odmor u Srbiji. Koriste se za plaćanje smeštaja kod ugostitelja koji su u sistemu vaučera, čime se umanjuje cena boravka." },
    { q: "Kolika je vrednost vaučera i ko ima pravo?", a: "Vrednost i uslovi se određuju svake godine i mogu se menjati. Najtačnije i najnovije informacije proverite na sajtu Ministarstva turizma i omladine ili kod svoje pošte/banke." },
    { q: "Kako se prijavljujem za vaučer?", a: "Prijava se obično podnosi na šalteru Pošte Srbije uz potrebnu dokumentaciju, u terminima koje objavi Ministarstvo. Broj vaučera je ograničen i dodeljuju se po redosledu prijava." },
    { q: "Kako da iskoristim vaučer na ovom portalu?", a: "Na našem portalu filtrirajte smeštaj koji prima vaučere (oznaka „Prima vaučere“), kontaktirajte domaćina i dogovorite boravak. Vaučer predajete ugostitelju koji ga dalje realizuje." },
    { q: "Koliko noći mora da traje boravak?", a: "Pravila o minimalnom broju noćenja propisuje Ministarstvo za svaku godinu (najčešće više uzastopnih noćenja). Proverite aktuelne uslove pre rezervacije." },
    { q: "Gde mogu da nađem smeštaj koji prima vaučere?", a: "Na ovoj strani kliknite na dugme ispod — prikazaćemo vam sav smeštaj na portalu sa oznakom „Prima vaučere“." },
  ],
  en: [
    { q: "What are tourism vouchers?", a: "Tourism vouchers are a state incentive for holidays in Serbia. They are used to pay for accommodation with hosts in the voucher system, reducing the cost of the stay." },
    { q: "What is the voucher value and who is eligible?", a: "The value and conditions are set each year and may change. For the most accurate, up-to-date information, check the website of the Ministry of Tourism and Youth, or your post office/bank." },
    { q: "How do I apply for a voucher?", a: "Applications are usually submitted at a Post of Serbia counter with the required documents, during periods announced by the Ministry. The number of vouchers is limited and allocated in order of application." },
    { q: "How do I use a voucher on this portal?", a: "On our portal, filter accommodation that accepts vouchers (the “Accepts vouchers” label), contact the host and arrange the stay. You hand the voucher to the host who redeems it." },
    { q: "How many nights must the stay last?", a: "The minimum number of nights is set by the Ministry each year (usually several consecutive nights). Check the current conditions before booking." },
    { q: "Where can I find accommodation that accepts vouchers?", a: "On this page click the button below — we will show you all accommodation on the portal labelled “Accepts vouchers”." },
  ],
  de: [
    { q: "Was sind Tourismus-Gutscheine?", a: "Tourismus-Gutscheine sind eine staatliche Förderung für den Urlaub in Serbien. Sie werden zur Bezahlung von Unterkünften bei teilnehmenden Gastgebern verwendet und senken die Kosten des Aufenthalts." },
    { q: "Wie hoch ist der Wert und wer ist berechtigt?", a: "Wert und Bedingungen werden jedes Jahr festgelegt und können sich ändern. Die genauesten und aktuellsten Informationen finden Sie auf der Website des Ministeriums für Tourismus und Jugend." },
    { q: "Wie beantrage ich einen Gutschein?", a: "Anträge werden in der Regel am Schalter der Post Serbiens mit den erforderlichen Unterlagen gestellt, in den vom Ministerium angekündigten Zeiträumen. Die Anzahl ist begrenzt." },
    { q: "Wie verwende ich einen Gutschein auf diesem Portal?", a: "Filtern Sie auf unserem Portal Unterkünfte, die Gutscheine akzeptieren (Kennzeichnung „Akzeptiert Gutscheine“), kontaktieren Sie den Gastgeber und vereinbaren Sie den Aufenthalt." },
    { q: "Wie viele Nächte muss der Aufenthalt dauern?", a: "Die Mindestnächtezahl legt das Ministerium jedes Jahr fest (meist mehrere aufeinanderfolgende Nächte). Prüfen Sie die aktuellen Bedingungen vor der Buchung." },
    { q: "Wo finde ich Unterkünfte, die Gutscheine akzeptieren?", a: "Klicken Sie auf dieser Seite auf die Schaltfläche unten — wir zeigen Ihnen alle Unterkünfte mit der Kennzeichnung „Akzeptiert Gutscheine“." },
  ],
};

export default function VouchersPage() {
  const { lang, t } = useLang();
  const lc = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const heading = lc === "sr" ? "Turistički vaučeri" : lc === "de" ? "Tourismus-Gutscheine" : "Tourism vouchers";
  const lead = lc === "sr" ? "Odmor u Srbiji uz državne vaučere — kako funkcionišu i kako da ih iskoristite." : lc === "de" ? "Urlaub in Serbien mit staatlichen Gutscheinen — wie sie funktionieren und wie Sie sie nutzen." : "Holidays in Serbia with state vouchers — how they work and how to use them.";
  const cta = lc === "sr" ? "Pogledaj smeštaj koji prima vaučere" : lc === "de" ? "Unterkünfte mit Gutschein ansehen" : "View accommodation that accepts vouchers";
  const faqHeading = lc === "sr" ? "Vaučeri — česta pitanja" : lc === "de" ? "Gutscheine — FAQ" : "Vouchers — FAQ";

  const intro = lc === "sr"
    ? "Turistički vaučeri su podsticaj države za odmor u Srbiji, kojim se umanjuje cena smeštaja kod ugostitelja u sistemu vaučera. Vrednost, uslovi i rokovi prijave određuju se svake godine, pa najnovije informacije uvek proverite na sajtu Ministarstva turizma i omladine. Na ovom portalu lako pronađete smeštaj koji prima vaučere — od planina i banja do etno sela i apartmana."
    : lc === "de"
    ? "Tourismus-Gutscheine sind eine staatliche Förderung für den Urlaub in Serbien, die die Unterkunftskosten bei teilnehmenden Gastgebern senkt. Wert, Bedingungen und Fristen werden jährlich festgelegt — die aktuellsten Informationen finden Sie auf der Website des Ministeriums für Tourismus und Jugend. Auf diesem Portal finden Sie leicht Unterkünfte, die Gutscheine akzeptieren."
    : "Tourism vouchers are a state incentive for holidays in Serbia that reduces accommodation costs with participating hosts. The value, conditions and application deadlines are set each year — always check the Ministry of Tourism and Youth website for the latest information. On this portal you can easily find accommodation that accepts vouchers.";

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>🎟️ {heading}</h1><p>{lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}><Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} /></div>
      <section className="section"><div className="container" style={{ maxWidth: 820 }}>
        <div className="prose"><p>{intro}</p></div>
        <div style={{ marginTop: 22 }}>
          <Link className="btn btn--primary btn--lg" href={amenityPath("vouchers", lang)}>{cta}</Link>
        </div>
      </div></section>
      <FaqAccordion items={FAQ[lc]} heading={faqHeading} />
    </>
  );
}
