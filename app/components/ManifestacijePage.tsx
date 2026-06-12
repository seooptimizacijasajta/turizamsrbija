"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import Breadcrumbs from "./Breadcrumbs";
import { homePath } from "@/lib/slug";
import type { EventItem } from "@/lib/eventsData";
import { EVENT_CATS, EvCat, evCatByKey, evCatLabel, manifIndexPath, manifCatPath, eventPath, monthName, EVENT_CITIES, manifCityPath } from "@/lib/events";

const CAT_BG: Record<string, string> = {
  muzika: "#7c3aed", gastro: "#b45309", kultura: "#be123c", tradicija: "#0f766e", sport: "#1d4ed8", sajmovi: "#0369a1",
};

export default function ManifestacijePage({ events, cat, cityName }: { events: EventItem[]; cat?: EvCat | null; cityName?: string }) {
  const { lang, t } = useLang();
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");
  const [q, setQ] = useState("");
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";

  const cities = useMemo(() => {
    const s: string[] = [];
    events.forEach((e) => { if (e.city && !s.includes(e.city)) s.push(e.city); });
    return s.sort();
  }, [events]);

  const list = useMemo(() => events.filter((e) => {
    if (city && e.city !== city) return false;
    if (month && String(e.month || "") !== month) return false;
    if (q) { const h = (e.name + " " + (e.city || "") + " " + (e.region || "") + " " + e.desc[lc]).toLowerCase(); if (!h.includes(q.toLowerCase())) return false; }
    return true;
  }), [events, city, month, q, lc]);

  const heading = cityName ? (lang === "sr" ? `Manifestacije u ${cityName}` : lang === "de" ? `Veranstaltungen in ${cityName}` : `Events in ${cityName}`) : cat ? evCatLabel(cat, lang) : (lang === "sr" ? "Manifestacije u Srbiji" : lang === "de" ? "Veranstaltungen in Serbien" : "Events in Serbia");
  const lead = lang === "sr" ? "Festivali, sabori, gastro i kulturni događaji širom Srbije — kada su, gde su i šta da očekujete." : lang === "de" ? "Festivals, Volksfeste, Gastro- und Kulturevents in ganz Serbien — wann, wo und was Sie erwartet." : "Festivals, fairs, food and cultural events across Serbia — when, where and what to expect.";

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.35),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>{cat ? `${cat.icon} ${heading}` : `🎉 ${heading}`}</h1><p>{cityName ? (lang === "sr" ? `Festivali, sabori i događaji u ${cityName} — kalendar manifestacija.` : lang === "de" ? `Festivals und Events in ${cityName}.` : `Festivals and events in ${cityName}.`) : cat ? (lang === "sr" ? `${heading} — manifestacije širom Srbije.` : `${heading} in Serbia.`) : lead}</p></div>
      </section>
      <div className="container" style={{ paddingTop: 16 }}>
        <Breadcrumbs items={(cat || cityName) ? [{ name: t("nav_home"), href: homePath(lang) }, { name: lang === "sr" ? "Manifestacije" : lang === "de" ? "Veranstaltungen" : "Events", href: manifIndexPath(lang) }, { name: heading }] : [{ name: t("nav_home"), href: homePath(lang) }, { name: heading }]} />
      </div>

      <div className="container">
        <div className="amen-filter">
          {EVENT_CATS.map((c) => (
            <Link key={c.key} href={manifCatPath(c, lang)} className={"amen-chip" + (cat?.key === c.key ? " on" : "")}>{c.icon} {evCatLabel(c, lang)}</Link>
          ))}
        </div>
        {!cat && !cityName && (
          <div className="amen-filter" style={{ marginTop: 0, marginBottom: 6 }}>
            {EVENT_CITIES.map((ci) => (
              <Link key={ci.slug} href={manifCityPath(ci.slug, lang)} className="amen-chip">📍 {ci.name}</Link>
            ))}
          </div>
        )}
        <div className="toolbar">
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder={lang === "sr" ? "Pretraga manifestacija…" : lang === "de" ? "Veranstaltungen suchen…" : "Search events…"} />
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">{lang === "sr" ? "Svi meseci" : lang === "de" ? "Alle Monate" : "All months"}</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{monthName(m, lang)}</option>)}
          </select>
          {cities.length > 1 && !cityName && (
            <select value={city} onChange={(e) => setCity(e.target.value)}>
              <option value="">{lang === "sr" ? "Svi gradovi" : lang === "de" ? "Alle Städte" : "All cities"}</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
        </div>

        {list.length ? (
          <div className="card-grid" style={{ marginBottom: 40 }}>
            {list.map((e) => {
              const c = evCatByKey(e.category);
              const per = e.periodText || monthName(e.month, lang);
              return (
                <div className="card" key={e.id}>
                  <div className="card-media" style={e.image ? undefined : { background: `linear-gradient(135deg, ${CAT_BG[e.category] || "#0f3d2e"}, #0f3d2e)`, display: "grid", placeItems: "center", minHeight: 150 }}>
                    {e.image
                      ? <Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={e.image} alt={e.name} style={{ objectFit: "cover" }} />
                      : <span style={{ fontSize: "3rem" }}>{c?.icon || "🎉"}</span>}
                    <span className="card-badge">{c?.icon} {c ? evCatLabel(c, lang) : e.category}</span>
                    {e.featured && <span className="card-promo">★</span>}
                  </div>
                  <div className="card-body">
                    <span className="card-region">{[per, e.city, e.region].filter(Boolean).join(" · ")}</span>
                    <h3 className="card-title"><Link href={eventPath(e.name, lang)} style={{ color: "inherit" }}>{e.name}</Link></h3>
                    <p className="card-desc">{e.desc[lc]}</p>
                    <div style={{ marginTop: 8 }}>
                      <Link className="btn btn--primary" style={{ fontSize: ".82rem", padding: "7px 12px" }} href={eventPath(e.name, lang)}>{lang === "sr" ? "Detalji" : lang === "de" ? "Details" : "Details"}</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : <div className="empty">{t("no_results")}</div>}
      </div>
    </>
  );
}
