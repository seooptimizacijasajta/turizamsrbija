"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import JsonLd from "./JsonLd";
import { WX_PLACES, wxName, weatherPath, weatherPlacePath, wmo, type WxPlace } from "@/lib/weather";

type Lang2 = "sr" | "en" | "de";
type Row = { slug: string; temp: number | null; code: number | null; tmax: number | null; tmin: number | null };

const GROUPS: { key: WxPlace["group"]; sr: string; en: string; de: string }[] = [
  { key: "planina", sr: "Planine", en: "Mountains", de: "Berge" },
  { key: "banja", sr: "Banje", en: "Spa towns", de: "Kurorte" },
  { key: "jezero", sr: "Jezera", en: "Lakes", de: "Seen" },
  { key: "reka", sr: "Reke i klisure", en: "Rivers & gorges", de: "Flüsse & Schluchten" },
  { key: "grad", sr: "Gradovi", en: "Cities", de: "Städte" },
];

const INTRO: Record<Lang2, string[]> = {
  sr: [
    "Vremenska prognoza za sve glavne turističke destinacije Srbije na jednom mestu — planine, banje, jezera, reke i gradove. Za svako mesto prikazujemo trenutnu temperaturu i detaljnu prognozu za narednih sedam dana: maksimalnu i minimalnu temperaturu, količinu padavina i brzinu vetra.",
    "Prognoza je posebno korisna kada planirate vikend na planini, kupanje na jezeru ili boravak u banji — kliknite na destinaciju za sedmodnevni pregled i predlog smeštaja u blizini.",
  ],
  en: [
    "Weather forecast for all of Serbia's main tourist destinations in one place — mountains, spa towns, lakes, rivers and cities. For each place we show the current temperature and a detailed seven-day forecast: highs and lows, precipitation and wind speed.",
    "It is especially useful when planning a weekend in the mountains, a swim at the lake or a spa stay — click a destination for the seven-day view and nearby accommodation.",
  ],
  de: [
    "Wettervorhersage für alle wichtigen Reiseziele Serbiens an einem Ort — Berge, Kurorte, Seen, Flüsse und Städte. Für jeden Ort zeigen wir die aktuelle Temperatur und eine ausführliche 7-Tage-Vorhersage: Höchst- und Tiefstwerte, Niederschlag und Windgeschwindigkeit.",
    "Besonders nützlich, wenn Sie ein Wochenende in den Bergen, einen Badetag am See oder einen Kuraufenthalt planen — klicken Sie auf ein Reiseziel für die 7-Tage-Ansicht.",
  ],
};

export default function WeatherIndex({ rows }: { rows: Row[] }) {
  const { lang, t } = useLang();
  const lc: Lang2 = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const L = (sr: string, en: string, de: string) => (lc === "sr" ? sr : lc === "de" ? de : en);
  const title = L("Vremenska prognoza za destinacije u Srbiji", "Weather forecast for destinations in Serbia", "Wettervorhersage für Reiseziele in Serbien");
  const byslug = new Map(rows.map((r) => [r.slug, r]));
  const heroImg = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1600&q=80";

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: WX_PLACES.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: wxName(p, lang),
      url: `https://turizamsrbija.com${weatherPlacePath(lang, p.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd data={ld} />
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${heroImg}') center/cover no-repeat` }}>
        <div className="container">
          <h1>{title}</h1>
          <p>{L("Trenutno vreme i prognoza za 7 dana za 50+ destinacija — planine, banje, jezera i gradove.",
                "Current weather and a 7-day forecast for 50+ destinations — mountains, spas, lakes and cities.",
                "Aktuelles Wetter und 7-Tage-Vorhersage für 50+ Reiseziele — Berge, Kurorte, Seen und Städte.")}</p>
        </div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[{ name: t("nav_home"), href: homePath(lang) }, { name: L("Vremenska prognoza", "Weather", "Wetter") }]} />
      </div>
      <div className="container" style={{ paddingBottom: 50 }}>
        <div style={{ maxWidth: 820 }}>
          {INTRO[lc].map((p, i) => <p key={i} style={{ lineHeight: 1.8, color: "var(--ink)" }}>{p}</p>)}
        </div>

        {GROUPS.map((g) => {
          const items = WX_PLACES.filter((p) => p.group === g.key);
          if (!items.length) return null;
          return (
            <section key={g.key} style={{ marginTop: 28 }}>
              <h2 className="section-title">{g[lc]}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12, marginTop: 12 }}>
                {items.map((p) => {
                  const r = byslug.get(p.slug);
                  const w = r?.code != null ? wmo(r.code) : null;
                  return (
                    <Link key={p.slug} href={weatherPlacePath(lang, p.slug)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                        border: "1px solid var(--line)", borderRadius: 14, padding: "12px 14px", background: "#fff", color: "inherit" }}>
                      <span>
                        <strong style={{ display: "block" }}>{wxName(p, lang)}</strong>
                        <span style={{ fontSize: 13, color: "var(--muted)" }}>{w ? w[lc] : "—"}</span>
                      </span>
                      <span style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                        <span style={{ fontSize: 22 }}>{w ? w.icon : "🌡️"}</span>{" "}
                        <strong style={{ fontSize: 18 }}>{r?.temp != null ? `${r.temp}°` : "—"}</strong>
                        {r?.tmax != null && <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>{r.tmax}° / {r.tmin}°</span>}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <p style={{ marginTop: 28, fontSize: 13, color: "var(--muted)" }}>
          {L("Izvor podataka: Open-Meteo. Podaci se osvežavaju na svakih 30 minuta.",
             "Data source: Open-Meteo. Data refreshes every 30 minutes.",
             "Datenquelle: Open-Meteo. Aktualisierung alle 30 Minuten.")}
        </p>
      </div>
    </>
  );
}
