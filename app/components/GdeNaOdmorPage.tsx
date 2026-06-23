"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath, sectionPath } from "@/lib/slug";
import { letovanjePath, zimovanjePath } from "@/lib/sezona";
import JsonLd from "./JsonLd";
import ListingCard from "./ListingCard";
import type { Listing, Kind } from "@/lib/types";

type Lang2 = "sr" | "en" | "de";
type Sec = { kind: Kind; title: string; intro: string };

const HERO = { heading: { sr: "Gde na odmor u Srbiji", en: "Where to go on holiday in Serbia", de: "Wohin in den Urlaub in Serbien" },
  lead: {
    sr: "Planine, jezera, reke, banje i etno sela — sve ideje za odmor u Srbiji na jednom mestu, sa smeštajem bez provizije za gosta.",
    en: "Mountains, lakes, rivers, spas and ethno villages — every holiday idea in Serbia in one place, with no guest commission on stays.",
    de: "Berge, Seen, Flüsse, Kurorte und Ethno-Dörfer — alle Urlaubsideen für Serbien an einem Ort, ohne Gästeprovision.",
  } };

const INTRO: Record<Lang2, string[]> = {
  sr: [
    "Ako ste u dilemi gde na odmor, Srbija nudi neverovatnu raznovrsnost na malom prostoru — od snežnih vrhova i smaragdnih reka, preko jezera sa peščanim plažama, do banja sa termalnim izvorima i etno sela koja čuvaju tradiciju. Bilo da planirate letovanje, zimovanje ili vikend predah, ovde su sve ideje na jednom mestu.",
    "U nastavku smo izdvojili najlepše destinacije po tipu odmora. Izaberite ono što vam najviše odgovara, pregledajte smeštaj i pošaljite upit direktno domaćinu — bez provizije za gosta.",
  ],
  en: [
    "If you're wondering where to go on holiday, Serbia packs incredible variety into a small space — from snowy peaks and emerald rivers, to lakes with sandy beaches, spa towns with thermal springs and ethno villages keeping tradition alive. Whether you're planning a summer break, a ski trip or a weekend escape, every idea is in one place.",
    "Below we've picked the finest destinations by type of holiday. Choose what suits you best, browse the accommodation and send an inquiry straight to the host — with no guest commission.",
  ],
  de: [
    "Wenn Sie überlegen, wohin in den Urlaub, bietet Serbien auf kleinem Raum unglaubliche Vielfalt — von verschneiten Gipfeln und smaragdgrünen Flüssen über Seen mit Sandstränden bis zu Kurorten mit Thermalquellen und Ethno-Dörfern, die Traditionen bewahren. Ob Sommerurlaub, Skireise oder Wochenendausflug — alle Ideen an einem Ort.",
    "Nachfolgend haben wir die schönsten Reiseziele nach Urlaubsart ausgewählt. Wählen Sie, was am besten passt, sehen Sie sich die Unterkünfte an und senden Sie die Anfrage direkt an den Gastgeber — ohne Gästeprovision.",
  ],
};

const SECTIONS: Record<Lang2, Sec[]> = {
  sr: [
    { kind: "mountain", title: "Odmor na planinama", intro: "Čist vazduh, planinarenje, skijanje i mir — Zlatibor sa bogatim sadržajem, Kopaonik kao najveći ski centar, Tara sa netaknutom prirodom, divlja Stara planina, Zlatar, Golija i Divčibare. Savršene i za leto i za zimovanje u Srbiji." },
    { kind: "lake", title: "Odmor na jezeru", intro: "Za vrele dane, jezera su prvi izbor: Srebrno jezero („srpsko more“) na Dunavu, Palić kod Subotice, Perućac, Vlasinsko i Zlatarsko jezero. Kupanje, ribolov, vožnja čamcem i mirne plaže za porodični odmor." },
    { kind: "river", title: "Odmor na rekama", intro: "Reke Srbije su raj za avanturiste i ribolovce: rafting na Drini i Tari, čuveni meandri Uvca, rečne plaže uz Dunav i mirne obale Ibra i Zapadne Morave. Vikendice i etno domaćinstva uz samu vodu." },
    { kind: "spa", title: "Odmor u banjama", intro: "Banje spajaju zdravlje i odmor: termalni izvori, wellness i bazeni u Vrnjačkoj Banji, Sokobanji, Banji Koviljači i Prolom Banji. Idealne za odmor sa decom, oporavak i opuštanje tokom cele godine." },
    { kind: "ethno", title: "Odmor na selu i u etno selima", intro: "Daleko od gradske gužve — tradicionalne brvnare, domaća hrana i mir. Drvengrad na Mokroj Gori, Sirogojno i Tršić, kao i seoska domaćinstva širom Srbije, čuvaju duh starog srpskog sela." },
  ],
  en: [
    { kind: "mountain", title: "Mountain holidays", intro: "Clean air, hiking, skiing and peace — Zlatibor with plenty to do, Kopaonik as the largest ski resort, Tara with pristine nature, the wild Stara Planina, Zlatar, Golija and Divčibare. Perfect for both summer and winter holidays in Serbia." },
    { kind: "lake", title: "Lake holidays", intro: "For hot days, lakes are the first choice: Silver Lake (the 'Serbian sea') on the Danube, Palić near Subotica, Perućac, Vlasina and Zlatar lakes. Swimming, fishing, boating and quiet beaches for a family holiday." },
    { kind: "river", title: "River holidays", intro: "Serbia's rivers are a paradise for adventurers and anglers: rafting on the Drina and Tara, the famous Uvac meanders, Danube river beaches and the calm banks of the Ibar and Zapadna Morava. Cottages and ethno homesteads right by the water." },
    { kind: "spa", title: "Spa holidays", intro: "Spa towns combine health and rest: thermal springs, wellness and pools in Vrnjačka Banja, Sokobanja, Banja Koviljača and Prolom Banja. Ideal for a family holiday, recovery and relaxation all year round." },
    { kind: "ethno", title: "Village & ethno holidays", intro: "Far from the city rush — traditional log houses, home-cooked food and quiet. Drvengrad on Mokra Gora, Sirogojno and Tršić, as well as homesteads across Serbia, keep the spirit of the old Serbian village alive." },
  ],
  de: [
    { kind: "mountain", title: "Urlaub in den Bergen", intro: "Klare Luft, Wandern, Skifahren und Ruhe — Zlatibor mit viel Programm, Kopaonik als größtes Skigebiet, Tara mit unberührter Natur, die wilde Stara Planina, Zlatar, Golija und Divčibare. Perfekt für Sommer- wie Winterurlaub in Serbien." },
    { kind: "lake", title: "Urlaub am See", intro: "An heißen Tagen sind Seen die erste Wahl: der Silbersee (das „serbische Meer“) an der Donau, Palić bei Subotica, Perućac, Vlasina- und Zlatar-See. Baden, Angeln, Bootfahren und ruhige Strände für den Familienurlaub." },
    { kind: "river", title: "Urlaub an den Flüssen", intro: "Serbiens Flüsse sind ein Paradies für Abenteurer und Angler: Rafting auf Drina und Tara, die berühmten Uvac-Mäander, Donau-Strände und die ruhigen Ufer von Ibar und Zapadna Morava. Ferienhäuser und Ethno-Höfe direkt am Wasser." },
    { kind: "spa", title: "Urlaub in Kurorten", intro: "Kurorte verbinden Gesundheit und Erholung: Thermalquellen, Wellness und Pools in Vrnjačka Banja, Sokobanja, Banja Koviljača und Prolom Banja. Ideal für Familienurlaub, Erholung und Entspannung das ganze Jahr." },
    { kind: "ethno", title: "Urlaub auf dem Land & in Ethno-Dörfern", intro: "Weit weg vom Stadttrubel — traditionelle Blockhäuser, Hausmannskost und Ruhe. Drvengrad auf der Mokra Gora, Sirogojno und Tršić sowie Höfe in ganz Serbien bewahren den Geist des alten serbischen Dorfes." },
  ],
};

const FAQ: Record<Lang2, { q: string; a: string }[]> = {
  sr: [
    { q: "Gde na odmor u Srbiji bez mora?", a: "Najpopularnije su planine (Zlatibor, Kopaonik, Tara), jezera sa plažama (Srebrno, Palić), banje sa bazenima (Vrnjačka, Sokobanja) i reke za rafting (Drina, Tara). Za miran odmor tu su etno sela i seoska domaćinstva." },
    { q: "Gde na odmor sa decom u Srbiji?", a: "Za porodice su idealni Zlatibor i Divčibare (blage staze, sadržaji za decu), banje sa bazenima poput Vrnjačke i Sokobanje, kao i jezera sa uređenim plažama (Palić, Srebrno jezero)." },
    { q: "Gde na odmor leti, a gde zimi?", a: "Leti se najviše biraju jezera, banje i reke (kupanje, rafting, wellness), a zimi planine sa ski centrima (Kopaonik, Zlatibor, Stara planina). Pogledajte naše strane Letovanje i Zimovanje u Srbiji." },
    { q: "Koliko košta odmor u Srbiji?", a: "Cene zavise od destinacije, sezone i tipa smeštaja. Na portalu upoređujete apartmane, vikendice, vile i hotele i šaljete upit direktno domaćinu — bez provizije za gosta." },
  ],
  en: [
    { q: "Where to holiday in Serbia without the sea?", a: "The most popular are mountains (Zlatibor, Kopaonik, Tara), lakes with beaches (Silver Lake, Palić), spa towns with pools (Vrnjačka, Sokobanja) and rivers for rafting (Drina, Tara). For a quiet break there are ethno villages and homesteads." },
    { q: "Where to go with children in Serbia?", a: "Families love Zlatibor and Divčibare (gentle slopes, kids' activities), spa towns with pools such as Vrnjačka and Sokobanja, and lakes with landscaped beaches (Palić, Silver Lake)." },
    { q: "Where to go in summer and where in winter?", a: "In summer lakes, spas and rivers are favourites (swimming, rafting, wellness); in winter the mountains with ski resorts (Kopaonik, Zlatibor, Stara Planina). See our Summer and Winter holidays in Serbia pages." },
    { q: "How much does a holiday in Serbia cost?", a: "Prices depend on the destination, season and type of stay. On the portal you compare apartments, cottages, villas and hotels and send an inquiry straight to the host — with no guest commission." },
  ],
  de: [
    { q: "Wohin in Serbien ohne Meer?", a: "Am beliebtesten sind Berge (Zlatibor, Kopaonik, Tara), Seen mit Stränden (Silbersee, Palić), Kurorte mit Pools (Vrnjačka, Sokobanja) und Flüsse zum Rafting (Drina, Tara). Für ruhigen Urlaub gibt es Ethno-Dörfer und Höfe." },
    { q: "Wohin mit Kindern in Serbien?", a: "Familien lieben Zlatibor und Divčibare (sanfte Pisten, Kinderangebote), Kurorte mit Pools wie Vrnjačka und Sokobanja sowie Seen mit angelegten Stränden (Palić, Silbersee)." },
    { q: "Wohin im Sommer und wohin im Winter?", a: "Im Sommer sind Seen, Kurorte und Flüsse beliebt (Baden, Rafting, Wellness); im Winter die Berge mit Skigebieten (Kopaonik, Zlatibor, Stara Planina). Siehe unsere Seiten Sommer- und Winterurlaub in Serbien." },
    { q: "Was kostet ein Urlaub in Serbien?", a: "Die Preise hängen von Reiseziel, Saison und Unterkunftsart ab. Auf dem Portal vergleichen Sie Apartments, Ferienhäuser, Villen und Hotels und senden die Anfrage direkt an den Gastgeber — ohne Gästeprovision." },
  ],
};

export default function GdeNaOdmorPage({ all }: { all: Listing[] }) {
  const { lang, t } = useLang();
  const lc: Lang2 = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const L = (sr: string, en: string, de: string) => (lc === "sr" ? sr : lc === "de" ? de : en);
  const hero = HERO.heading[lc];
  const faq = FAQ[lc];
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const heroImg = "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80";

  const quick = [
    { label: L("Planine", "Mountains", "Berge"), href: sectionPath("mountain", lang) },
    { label: L("Jezera", "Lakes", "Seen"), href: sectionPath("lake", lang) },
    { label: L("Reke", "Rivers", "Flüsse"), href: sectionPath("river", lang) },
    { label: L("Banje", "Spas", "Kurorte"), href: sectionPath("spa", lang) },
    { label: L("☀️ Letovanje", "☀️ Summer", "☀️ Sommer"), href: letovanjePath(lang) },
    { label: L("❄️ Zimovanje", "❄️ Winter", "❄️ Winter"), href: zimovanjePath(lang) },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${heroImg}') center/cover no-repeat` }}>
        <div className="container"><h1>{hero}</h1><p>{HERO.lead[lc]}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: hero }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 0 8px" }}>
          {quick.map((q) => <Link key={q.href} href={q.href} className="amen-chip on">{q.label}</Link>)}
        </div>
        <div style={{ maxWidth: 820 }}>
          {INTRO[lc].map((p, i) => <p key={i} style={{ lineHeight: 1.8, color: "var(--ink)" }}>{p}</p>)}
        </div>

        {SECTIONS[lc].map((sec) => {
          const items = all.filter((x) => x.type === sec.kind).slice(0, 4);
          return (
            <section key={sec.kind} style={{ marginTop: 30 }}>
              <h2 className="section-title">{sec.title}</h2>
              <p style={{ maxWidth: 820, lineHeight: 1.8, color: "var(--ink)" }}>{sec.intro}</p>
              <div style={{ margin: "8px 0 4px" }}>
                <Link href={sectionPath(sec.kind, lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>
                  {L("Pogledaj sve", "View all", "Alle ansehen")} →
                </Link>
              </div>
              {items.length > 0 && <div className="card-grid" style={{ marginTop: 12 }}>{items.map((d) => <ListingCard key={d.id} item={d} />)}</div>}
            </section>
          );
        })}

        <section className="section section--soft" style={{ marginTop: 36, borderRadius: 16 }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <h2 className="section-title" style={{ marginBottom: 18 }}>{L("Česta pitanja", "FAQ", "Häufige Fragen")}</h2>
            <div className="faq">
              {faq.map((f, i) => (
                <details key={i} className="faq-item"><summary><span>{f.q}</span><span className="faq-ic">+</span></summary><div className="faq-a">{f.a}</div></details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
