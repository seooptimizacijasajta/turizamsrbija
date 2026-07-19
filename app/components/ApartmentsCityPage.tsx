"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import ListingCard from "./ListingCard";
import JsonLd from "./JsonLd";
import { homePath, sectionPath } from "@/lib/slug";
import { MESTA, mestoName, mestoHook, mestoImg, apartmentsCityPath, type Mesto } from "@/lib/apartmanMesta";
import { STAY_TYPES, stayTypeName, stayTypePath } from "@/lib/stayTypes";
import { weatherPlacePath } from "@/lib/weather";
import { WX_PLACES } from "@/lib/weather";
import type { Listing } from "@/lib/types";

const GROUP_TEXT: Record<Mesto["group"], [string, string, string]> = {
  grad: [
    "Apartman u gradu je najpraktičniji izbor za kratak boravak, poslovni put ili razgledanje: sopstvena kuhinja, mašina za veš i sloboda da dolazite i odlazite kad želite, po ceni koja je najčešće niža od hotelske sobe.",
    "A city apartment is the most practical choice for a short stay, business trip or sightseeing: your own kitchen, a washing machine and the freedom to come and go, usually cheaper than a hotel room.",
    "Ein Stadtapartment ist die praktischste Wahl für Kurzaufenthalte: eigene Küche, Waschmaschine und Freiheit, meist günstiger als ein Hotelzimmer.",
  ],
  planina: [
    "Na planini se apartmani biraju po udaljenosti od žičare ili centra, po grejanju i po tome da li imaju parking očišćen zimi. Za skijanje rezervišite ranije — najbolji termini se popune i mesec dana unapred.",
    "In the mountains, apartments are chosen by distance from the lift or centre, by heating and by whether parking is cleared in winter. Book early for the ski season.",
    "In den Bergen zählen Entfernung zum Lift, Heizung und geräumter Parkplatz im Winter. Für die Skisaison früh buchen.",
  ],
  banja: [
    "U banji apartman znači slobodu da sami organizujete obroke i terapije, uz cenu znatno nižu od pansiona. Proverite udaljenost od izvora, parka i banjskog centra.",
    "In a spa town, an apartment means organising your own meals and therapies at a much lower price than board. Check the distance to the springs, park and spa centre.",
    "In Kurorten bedeutet ein Apartment eigene Mahlzeiten und Therapien zu deutlich geringeren Kosten. Prüfen Sie die Entfernung zu Quellen und Kurzentrum.",
  ],
  jezero: [
    "Uz jezero je ključna udaljenost od plaže i da li objekat ima terasu, roštilj i parking. U julu i avgustu smeštaj se rezerviše i dva meseca unapred.",
    "By the lake, what matters is distance to the beach and whether there is a terrace, barbecue and parking. In July and August, book up to two months ahead.",
    "Am See zählen Strandnähe, Terrasse, Grill und Parkplatz. Im Juli und August bis zu zwei Monate im Voraus buchen.",
  ],
  reka: [
    "Uz reku se najviše traže objekti sa pogledom na vodu, terasom i roštiljem. Ako planirate rafting ili regatu, javite se domaćinu ranije — termini oko manifestacija se popune prvi.",
    "By the river, places with a water view, a terrace and a barbecue are most in demand. If you plan rafting or a regatta, contact the host early.",
    "Am Fluss sind Objekte mit Wasserblick, Terrasse und Grill am gefragtesten. Für Rafting früh anfragen.",
  ],
  selo: [
    "U etno destinacijama smeštaj je najčešće u brvnarama i seoskim domaćinstvima, uz domaću hranu i mir. Idealno za produženi vikend i porodice sa decom.",
    "In ethno destinations, accommodation is mostly in log cabins and homesteads, with home-cooked food and quiet. Ideal for a long weekend.",
    "In Ethno-Zielen sind es meist Blockhütten und Bauernhöfe mit Hausmannskost und Ruhe.",
  ],
};

export default function ApartmentsCityPage({ mesto, items }: { mesto: Mesto; items: Listing[] }) {
  const { lang, t } = useLang();
  const li = lang === "sr" ? 0 : lang === "de" ? 2 : 1;
  const L = (sr: string, en: string, de: string) => (lang === "sr" ? sr : lang === "de" ? de : en);
  const name = mestoName(mesto, lang);
  const title = L(`Apartmani ${name}`, `Apartments in ${name}`, `Apartments in ${name}`);
  const wx = WX_PLACES.find((w) => w.slug === mesto.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: mestoHook(mesto, lang),
    numberOfItems: items.length,
  };

  const nearby = MESTA.filter((m) => m.group === mesto.group && m.slug !== mesto.slug).slice(0, 12);

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${mestoImg(mesto)}') center/cover no-repeat` }}>
        <div className="container"><h1>{title}</h1><p>{mestoHook(mesto, lang)}</p></div>
      </section>

      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[
          { name: t("nav_home"), href: homePath(lang) },
          { name: t("nav_stays"), href: sectionPath("stay", lang) },
          { name: L("Apartmani", "Apartments", "Apartments"), href: stayTypePath(STAY_TYPES[0], lang) },
          { name },
        ]} />
      </div>

      <div className="container" style={{ paddingBottom: 50 }}>
        {items.length > 0 ? (
          <div className="card-grid" style={{ marginTop: 8 }}>{items.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        ) : (
          <p style={{ color: "var(--muted)", marginTop: 8 }}>
            {L(`Trenutno nema objavljenih apartmana za mesto ${name}. Ako izdajete smeštaj ovde, dodajte oglas besplatno — objavljujemo ga posle provere.`,
               `There are no published apartments for ${name} yet. If you rent here, add your listing for free — we publish it after review.`,
               `Derzeit keine Apartments für ${name}. Wenn Sie hier vermieten, fügen Sie Ihr Angebot kostenlos hinzu.`)}
          </p>
        )}

        <section style={{ marginTop: 30, maxWidth: 840 }}>
          <h2 className="section-title">{L(`Smeštaj u mestu ${name}`, `Staying in ${name}`, `Übernachten in ${name}`)}</h2>
          <p style={{ lineHeight: 1.85 }}>{mestoHook(mesto, lang)}</p>
          <p style={{ lineHeight: 1.85 }}>{GROUP_TEXT[mesto.group][li]}</p>
          <p style={{ lineHeight: 1.85 }}>
            {L("Upit šaljete direktno vlasniku — bez provizije za gosta i bez posrednika. Cenu, termin i način plaćanja dogovarate sa domaćinom.",
               "Enquiries go straight to the owner — no guest commission and no middlemen. You agree price, dates and payment with the host.",
               "Anfragen gehen direkt an den Eigentümer — ohne Gästeprovision. Preis, Termin und Zahlung vereinbaren Sie mit dem Gastgeber.")}
          </p>
          {wx && (
            <p style={{ lineHeight: 1.85 }}>
              <Link href={weatherPlacePath(lang, wx.slug)} style={{ color: "var(--green-600)", fontWeight: 600 }}>
                🌤️ {L(`Vremenska prognoza za ${name}`, `Weather forecast for ${name}`, `Wetter in ${name}`)} →
              </Link>
            </p>
          )}
        </section>

        <section style={{ marginTop: 26 }}>
          <h2 className="section-title">{L("Ostali tipovi smeštaja", "Other property types", "Weitere Unterkunftsarten")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {STAY_TYPES.map((s) => <Link key={s.key} href={stayTypePath(s, lang)} className="amen-chip on">{stayTypeName(s, lang)}</Link>)}
          </div>
        </section>

        <section style={{ marginTop: 26 }}>
          <h2 className="section-title">{L("Apartmani u okolini", "Apartments nearby", "Apartments in der Nähe")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {nearby.map((m) => (
              <Link key={m.slug} href={apartmentsCityPath(m.slug, lang)} className="amen-chip on">
                {L("Apartmani", "Apartments", "Apartments")} {mestoName(m, lang)}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
