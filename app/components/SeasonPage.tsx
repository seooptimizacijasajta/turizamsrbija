"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath, sectionPath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import ListingCard from "./ListingCard";
import type { Listing, Kind } from "@/lib/types";

type Block = { heading: string; lead: string; intro: string[]; faq: { q: string; a: string }[] };
const C: Record<"leto" | "zima", Record<Lang2, Block>> = {
  zima: {
    sr: {
      heading: "Zimovanje u Srbiji",
      lead: "Ski centri, planinski hoteli i zimske čarolije — Kopaonik, Zlatibor, Stara planina, Tara i Divčibare na jednom mestu.",
      intro: [
        "Zimovanje u Srbiji znači uređene ski staze, čist planinski vazduh i toplinu domaćih hotela i apartmana. Najveći ski centar je Kopaonik sa preko 55 km staza, dok Zlatibor i Stara planina (Babin Zub) nude moderne žičare, sankanje i šetnje kroz sneg.",
        "Za porodice sa decom idealni su Divčibare i Zlatibor — blage staze, škole skijanja i mnogo sadržaja van staza. Ljubitelji netaknute prirode biraju Taru, a oni koji žele wellness uz sneg kombinuju skijanje sa banjama u blizini.",
        "Rezervišite smeštaj na vreme — u sezoni (praznici, raspusti) najbolji apartmani i hoteli se brzo popune. Pošaljite upit direktno domaćinu, bez provizije za gosta.",
      ],
      faq: [
        { q: "Koji je najbolji ski centar u Srbiji?", a: "Kopaonik je najveći i najpoznatiji, sa preko 55 km uređenih staza i pouzdanim snegom. Zlatibor (Tornik) i Stara planina su odlične alternative, a Divčibare su idealne za početnike i porodice." },
        { q: "Kada je sezona skijanja u Srbiji?", a: "Obično od kraja decembra do marta, u zavisnosti od snežnih uslova. Najveća gužva je za novogodišnje i zimske praznike, pa se rana rezervacija isplati." },
        { q: "Ima li zimovanja bez skijanja?", a: "Naravno — sankanje, šetnje, vožnja žičarom, wellness i spa, kao i obilazak etno sela i lokalne kuhinje. Zlatibor i Tara su odlični i za mirniji zimski odmor." },
      ],
    },
    en: {
      heading: "Winter holidays in Serbia",
      lead: "Ski resorts, mountain hotels and winter magic — Kopaonik, Zlatibor, Stara Planina, Tara and Divčibare in one place.",
      intro: [
        "A winter holiday in Serbia means groomed ski slopes, crisp mountain air and the warmth of local hotels and apartments. The largest ski resort is Kopaonik with over 55 km of runs, while Zlatibor and Stara Planina (Babin Zub) offer modern lifts, sledding and snowy walks.",
        "Families with children love Divčibare and Zlatibor — gentle slopes, ski schools and plenty to do off the piste. Nature lovers choose Tara, and those after wellness pair skiing with nearby spas.",
        "Book early — in peak season the best apartments and hotels fill up fast. Send an inquiry directly to the host, with no guest commission.",
      ],
      faq: [
        { q: "Which is the best ski resort in Serbia?", a: "Kopaonik is the largest and most popular, with 55+ km of groomed runs and reliable snow. Zlatibor (Tornik) and Stara Planina are great alternatives, while Divčibare suits beginners and families." },
        { q: "When is the ski season in Serbia?", a: "Usually late December to March, depending on snow. The busiest periods are the New Year and winter school breaks, so booking early pays off." },
        { q: "Is there a winter holiday without skiing?", a: "Of course — sledding, walks, cable-car rides, wellness and spa, plus ethno villages and local cuisine. Zlatibor and Tara are great for a quieter winter break." },
      ],
    },
    de: {
      heading: "Winterurlaub in Serbien",
      lead: "Skizentren, Berghotels und Winterzauber — Kopaonik, Zlatibor, Stara Planina, Tara und Divčibare an einem Ort.",
      intro: [
        "Winterurlaub in Serbien bedeutet präparierte Pisten, klare Bergluft und die Gemütlichkeit heimischer Hotels und Apartments. Das größte Skigebiet ist Kopaonik mit über 55 km Pisten, während Zlatibor und Stara Planina (Babin Zub) moderne Lifte, Rodeln und Winterwanderungen bieten.",
        "Familien mit Kindern lieben Divčibare und Zlatibor — sanfte Pisten, Skischulen und viel Programm abseits der Piste. Naturfreunde wählen Tara, und wer Wellness sucht, kombiniert Skifahren mit nahen Kurorten.",
        "Buchen Sie früh — in der Hochsaison sind die besten Apartments und Hotels schnell ausgebucht. Senden Sie Ihre Anfrage direkt an den Gastgeber, ohne Gästeprovision.",
      ],
      faq: [
        { q: "Welches ist das beste Skigebiet in Serbien?", a: "Kopaonik ist das größte und bekannteste mit über 55 km Pisten und zuverlässigem Schnee. Zlatibor (Tornik) und Stara Planina sind tolle Alternativen, Divčibare eignet sich für Anfänger und Familien." },
        { q: "Wann ist die Skisaison in Serbien?", a: "Meist von Ende Dezember bis März, je nach Schneelage. Am vollsten ist es zu Neujahr und in den Winterferien — frühes Buchen lohnt sich." },
        { q: "Gibt es Winterurlaub ohne Skifahren?", a: "Natürlich — Rodeln, Spaziergänge, Seilbahnfahrten, Wellness und Spa sowie Ethno-Dörfer und lokale Küche. Zlatibor und Tara sind ideal für einen ruhigeren Winterurlaub." },
      ],
    },
  },
  leto: {
    sr: {
      heading: "Letovanje u Srbiji",
      lead: "Jezera, banje i reke — peščane plaže, wellness i svež vazduh. Palić, Srebrno jezero, Vlasina, Vrnjačka i Sokobanja.",
      intro: [
        "Letovanje u Srbiji ne mora da znači more. Srebrno jezero („srpsko more“) na Dunavu i Palićko jezero kod Subotice nude peščane plaže, kupanje i vodene sportove, dok Vlasinsko i Perućačko jezero mame netaknutom prirodom i svežinom.",
        "Banje su savršen izbor za letnji odmor uz zdravlje — Vrnjačka Banja i Sokobanja spajaju termalne izvore, bazene i wellness sa bogatim kulturnim i zabavnim programom. Za avanturu tu su reke: rafting na Drini i Tari, splavarenje i plaže uz Dunav.",
        "Pronađite smeštaj uz vodu ili u centru banje i pošaljite upit direktno domaćinu. Leti se najbolje ponude brzo popune, pa rezervišite na vreme.",
      ],
      faq: [
        { q: "Gde na letovanje u Srbiji pored vode?", a: "Najpopularniji su Srebrno jezero na Dunavu i Palićko jezero kod Subotice — peščane plaže i kupanje. Vlasinsko jezero i Perućac biraju ljubitelji mirnije prirode, a uz Dunav ima i uređenih rečnih plaža." },
        { q: "Da li su banje dobre za letnji odmor?", a: "Jesu — Vrnjačka Banja i Sokobanja imaju bazene, termalne izvore, wellness i bogat letnji program (festivali, šetnje, izleti), uz prijatnu klimu i zelenilo." },
        { q: "Ima li kupanja i vodenih sportova?", a: "Ima. Na jezerima i Dunavu su mogući kupanje, čamci, kajak i SUP, a na Drini i Tari rafting i splavarenje. U svakom oglasu vidite blizinu vode." },
      ],
    },
    en: {
      heading: "Summer holidays in Serbia",
      lead: "Lakes, spas and rivers — sandy beaches, wellness and fresh air. Palić, Silver Lake, Vlasina, Vrnjačka and Sokobanja.",
      intro: [
        "A summer holiday in Serbia doesn't have to mean the sea. Silver Lake (the 'Serbian sea') on the Danube and Lake Palić near Subotica offer sandy beaches, swimming and water sports, while Vlasina and Perućac lakes lure you with pristine nature and cool air.",
        "Spa towns are perfect for a healthy summer break — Vrnjačka Banja and Sokobanja combine thermal springs, pools and wellness with a rich cultural and entertainment programme. For adventure, head to the rivers: rafting on the Drina and Tara, river rafts and Danube beaches.",
        "Find accommodation by the water or in the heart of a spa town and send an inquiry straight to the host. The best summer deals go fast, so book early.",
      ],
      faq: [
        { q: "Where to go for a summer holiday by the water in Serbia?", a: "The most popular are Silver Lake on the Danube and Lake Palić near Subotica — sandy beaches and swimming. Vlasina Lake and Perućac suit lovers of quieter nature, and the Danube has landscaped river beaches." },
        { q: "Are spa towns good for a summer break?", a: "Yes — Vrnjačka Banja and Sokobanja have pools, thermal springs, wellness and a lively summer programme (festivals, walks, excursions), with a pleasant climate and greenery." },
        { q: "Is there swimming and water sports?", a: "Yes. On the lakes and the Danube you can swim, boat, kayak and SUP, and on the Drina and Tara there's rafting. Each listing shows how close it is to water." },
      ],
    },
    de: {
      heading: "Sommerurlaub in Serbien",
      lead: "Seen, Kurorte und Flüsse — Sandstrände, Wellness und frische Luft. Palić, Silbersee, Vlasina, Vrnjačka und Sokobanja.",
      intro: [
        "Sommerurlaub in Serbien muss nicht das Meer bedeuten. Der Silbersee (das „serbische Meer“) an der Donau und der Palić-See bei Subotica bieten Sandstrände, Baden und Wassersport, während die Seen Vlasina und Perućac mit unberührter Natur und kühler Luft locken.",
        "Kurorte sind perfekt für einen gesunden Sommerurlaub — Vrnjačka Banja und Sokobanja verbinden Thermalquellen, Pools und Wellness mit einem reichen Kultur- und Unterhaltungsprogramm. Für Abenteuer sorgen die Flüsse: Rafting auf Drina und Tara sowie Donau-Strände.",
        "Finden Sie eine Unterkunft am Wasser oder im Zentrum eines Kurorts und senden Sie die Anfrage direkt an den Gastgeber. Die besten Sommerangebote sind schnell weg — buchen Sie früh.",
      ],
      faq: [
        { q: "Wohin in Serbien für einen Sommerurlaub am Wasser?", a: "Am beliebtesten sind der Silbersee an der Donau und der Palić-See bei Subotica — Sandstrände und Baden. Der Vlasina-See und Perućac sind etwas ruhiger, an der Donau gibt es angelegte Flussstrände." },
        { q: "Eignen sich Kurorte für den Sommerurlaub?", a: "Ja — Vrnjačka Banja und Sokobanja haben Pools, Thermalquellen, Wellness und ein lebhaftes Sommerprogramm (Festivals, Spaziergänge, Ausflüge), bei angenehmem Klima und viel Grün." },
        { q: "Gibt es Baden und Wassersport?", a: "Ja. An den Seen und der Donau können Sie schwimmen, Boot fahren, Kajak und SUP, an Drina und Tara gibt es Rafting. Jede Anzeige zeigt die Nähe zum Wasser." },
      ],
    },
  },
};
type Lang2 = "sr" | "en" | "de";

const WINTER_KINDS: Kind[] = ["mountain"];
const SUMMER_KINDS: Kind[] = ["lake", "spa"];
const MOUNT_RE = /(zlatibor|kopaonik|tara|divčibare|divcibare|stara planina|zlatar|golija)/i;

export default function SeasonPage({ season, all }: { season: "leto" | "zima"; all: Listing[] }) {
  const { lang, t } = useLang();
  const b = C[season][lang === "sr" ? "sr" : lang === "de" ? "de" : "en"];
  const isWinter = season === "zima";
  const kinds = isWinter ? WINTER_KINDS : SUMMER_KINDS;
  const destinations = all.filter((x) => kinds.includes(x.type)).slice(0, 8);
  const stayPool = all.filter((x) => x.type === "stay");
  const stays = (isWinter ? stayPool.filter((s) => MOUNT_RE.test(s.region.sr || "") || MOUNT_RE.test(s.place || "")) : stayPool.filter((s) => !MOUNT_RE.test(s.region.sr || "")));
  const staysShown = (stays.length ? stays : stayPool).slice(0, 6);

  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: b.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const heroImg = isWinter ? "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1600&q=80" : "https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1600&q=80";
  const quick: { label: string; href: string }[] = isWinter
    ? [{ label: L("Planine", "Mountains", "Berge"), href: sectionPath("mountain", lang) }, { label: L("Sav smeštaj", "All stays", "Alle Unterkünfte"), href: sectionPath("stay", lang) }]
    : [{ label: L("Jezera", "Lakes", "Seen"), href: sectionPath("lake", lang) }, { label: L("Banje", "Spas", "Kurorte"), href: sectionPath("spa", lang) }, { label: L("Sav smeštaj", "All stays", "Alle Unterkünfte"), href: sectionPath("stay", lang) }];

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${heroImg}') center/cover no-repeat` }}>
        <div className="container"><h1>{b.heading}</h1><p>{b.lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: b.heading }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, margin: "12px 0 8px" }}>
          {quick.map((q) => <Link key={q.href} href={q.href} className="amen-chip on">{q.label}</Link>)}
        </div>
        <div style={{ maxWidth: 820 }}>
          {b.intro.map((p, i) => <p key={i} style={{ lineHeight: 1.8, color: "var(--ink)" }}>{p}</p>)}
        </div>

        {destinations.length > 0 && (<>
          <h2 className="section-title" style={{ marginTop: 28 }}>{isWinter ? L("Planinske destinacije", "Mountain destinations", "Bergregionen") : L("Jezera i banje", "Lakes & spas", "Seen & Kurorte")}</h2>
          <div className="card-grid" style={{ marginTop: 14 }}>{destinations.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        </>)}

        {staysShown.length > 0 && (<>
          <h2 className="section-title" style={{ marginTop: 32 }}>{L("Smeštaj", "Where to stay", "Unterkünfte")}</h2>
          <div className="card-grid" style={{ marginTop: 14 }}>{staysShown.map((s) => <ListingCard key={s.id} item={s} />)}</div>
        </>)}

        <section className="section section--soft" style={{ marginTop: 36, borderRadius: 16 }}>
          <div className="container" style={{ maxWidth: 820 }}>
            <h2 className="section-title" style={{ marginBottom: 18 }}>{L("Česta pitanja", "FAQ", "Häufige Fragen")}</h2>
            <div className="faq">
              {b.faq.map((f, i) => (
                <details key={i} className="faq-item"><summary><span>{f.q}</span><span className="faq-ic">+</span></summary><div className="faq-a">{f.a}</div></details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
