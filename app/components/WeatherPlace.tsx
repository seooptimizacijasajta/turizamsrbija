"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import ListingCard from "./ListingCard";
import { wxName, weatherPath, weatherPlacePath, wmo, type WxPlace, type Wx } from "@/lib/weather";
import type { Listing } from "@/lib/types";

type Lang2 = "sr" | "en" | "de";

const DOW: Record<Lang2, string[]> = {
  sr: ["ned", "pon", "uto", "sre", "čet", "pet", "sub"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  de: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
};

export default function WeatherPlace({ place, wx, nearby, others }:
  { place: WxPlace; wx: Wx | null; nearby: Listing[]; others: WxPlace[] }) {
  const { lang, t } = useLang();
  const lc: Lang2 = lang === "sr" ? "sr" : lang === "de" ? "de" : "en";
  const L = (sr: string, en: string, de: string) => (lc === "sr" ? sr : lc === "de" ? de : en);
  const name = wxName(place, lang);
  const nowW = wx?.now ? wmo(wx.now.code) : null;
  const heroImg = "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1600&q=80";

  return (
    <>
      <section className="page-hero" style={{ background: `linear-gradient(180deg,rgba(15,61,46,.45),rgba(15,61,46,.72)),url('${heroImg}') center/cover no-repeat` }}>
        <div className="container">
          <h1>{L(`Vremenska prognoza ${name}`, `Weather forecast for ${name}`, `Wettervorhersage ${name}`)}</h1>
          <p>{L("Trenutno vreme i prognoza za narednih 7 dana.", "Current weather and the 7-day forecast.", "Aktuelles Wetter und die 7-Tage-Vorhersage.")}</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={[
          { name: t("nav_home"), href: homePath(lang) },
          { name: L("Vremenska prognoza", "Weather", "Wetter"), href: weatherPath(lang) },
          { name },
        ]} />
      </div>

      <div className="container" style={{ paddingBottom: 50 }}>
        {wx ? (
          <>
            {wx.now && nowW && (
              <div style={{ display: "flex", alignItems: "center", gap: 18, border: "1px solid var(--line)", borderRadius: 16, padding: "18px 20px", background: "#fff", marginTop: 8 }}>
                <span style={{ fontSize: 52, lineHeight: 1 }}>{nowW.icon}</span>
                <span>
                  <strong style={{ fontSize: 40, display: "block", lineHeight: 1.1 }}>{wx.now.temp}°C</strong>
                  <span style={{ color: "var(--muted)" }}>{nowW[lc]} · {L("vetar", "wind", "Wind")} {wx.now.wind} km/h</span>
                </span>
              </div>
            )}

            <h2 className="section-title" style={{ marginTop: 28 }}>{L("Prognoza za 7 dana", "7-day forecast", "7-Tage-Vorhersage")}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 12, marginTop: 12 }}>
              {wx.days.map((d) => {
                const w = wmo(d.code);
                const dt = new Date(d.date + "T12:00:00");
                return (
                  <div key={d.date} style={{ border: "1px solid var(--line)", borderRadius: 14, padding: "12px 14px", background: "#fff", textAlign: "center" }}>
                    <div style={{ fontWeight: 700 }}>{DOW[lc][dt.getDay()]}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>{dt.getDate()}.{dt.getMonth() + 1}.</div>
                    <div style={{ fontSize: 32, margin: "6px 0" }}>{w.icon}</div>
                    <div><strong>{d.tmax}°</strong> <span style={{ color: "var(--muted)" }}>/ {d.tmin}°</span></div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{w[lc]}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)" }}>💧 {d.precip} mm · 💨 {d.wind} km/h</div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p style={{ marginTop: 16 }}>{L("Prognoza trenutno nije dostupna. Pokušajte ponovo kasnije.", "The forecast is currently unavailable. Please try again later.", "Die Vorhersage ist derzeit nicht verfügbar. Bitte später erneut versuchen.")}</p>
        )}

        {nearby.length > 0 && (
          <section style={{ marginTop: 34 }}>
            <h2 className="section-title">{L(`Smeštaj — ${name}`, `Accommodation — ${name}`, `Unterkünfte — ${name}`)}</h2>
            <div className="card-grid" style={{ marginTop: 12 }}>{nearby.map((d) => <ListingCard key={d.id} item={d} />)}</div>
          </section>
        )}

        <section style={{ marginTop: 34 }}>
          <h2 className="section-title">{L("Prognoza za druge destinacije", "Forecast for other destinations", "Vorhersage für andere Reiseziele")}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            {others.map((p) => (
              <Link key={p.slug} href={weatherPlacePath(lang, p.slug)} className="amen-chip on">{wxName(p, lang)}</Link>
            ))}
          </div>
          <p style={{ marginTop: 18 }}>
            <Link href={weatherPath(lang)} style={{ color: "var(--green-600)", fontWeight: 600 }}>
              {L("Sve destinacije", "All destinations", "Alle Reiseziele")} →
            </Link>
          </p>
        </section>

        <p style={{ marginTop: 26, fontSize: 13, color: "var(--muted)" }}>
          {L("Izvor podataka: Open-Meteo.", "Data source: Open-Meteo.", "Datenquelle: Open-Meteo.")}
        </p>
      </div>
    </>
  );
}
