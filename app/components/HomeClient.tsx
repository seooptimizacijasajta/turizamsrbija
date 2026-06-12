"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { slugify, sectionPath, searchPath, voucherPath, marketingPath, hostGuidePath, listingPath, belgradePath } from "@/lib/slug";
import { firmeIndexPath } from "@/lib/firme";
import { pijacaPath } from "@/lib/pijaca";
import ListingCard from "./ListingCard";
import FaqAccordion from "./FaqAccordion";
import { generalFaqs } from "@/lib/faq";
import type { Post } from "@/lib/blog";
import type { EventItem } from "@/lib/eventsData";
import { eventPath, manifIndexPath, monthName, evCatByKey, evCatLabel } from "@/lib/events";

const CATS = [
  { kind: "mountain" as const, key: "nav_mountains", img: "1551524559-8af4e6624178", sub: "Kopaonik · Zlatibor · Tara" },
  { kind: "lake" as const, key: "nav_lakes", img: "1439066615861-d1af74d74000", sub: "Palić · Perućac · Vlasina" },
  { kind: "spa" as const, key: "nav_spas", img: "1540555700478-4be289fbecef", sub: "Vrnjačka · Sokobanja" },
  { kind: "ethno" as const, key: "nav_ethno", img: "1518780664697-55e3ad937233", sub: "Drvengrad · Sirogojno" },
  { kind: "stay" as const, key: "nav_stays", img: "1566073771259-6a8506099945", sub: "Hoteli · Apartmani" },
];

export default function HomeClient({ all, posts = [], events = [] }: { all: Listing[]; posts?: Post[]; events?: EventItem[] }) {
  const { t, lang } = useLang();
  const router = useRouter();
  const [type, setType] = useState<"mountain"|"lake"|"spa"|"ethno"|"stay">("mountain");
  const [q, setQ] = useState("");

  const featuredSlugs = ["kopaonik", "zlatibor", "tara", "vrnjacka-banja", "drvengrad-mecavnik", "srebrno-jezero"];
  const featured = featuredSlugs
    .map((slug) => all.find((d) => slugify(d.name.sr) === slug))
    .filter(Boolean) as Listing[];
  const fallbackFeatured = featured.length ? featured : all.filter((d) => d.type !== "stay").slice(0, 6);
  const featuredHome = all.filter((d) => d.featuredHome);
  const stays = all.filter((d) => d.type === "stay").slice(0, 4);
  const weekend = [...all].filter((d) => d.type === "stay").sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
  const destCount = all.filter((d) => d.type !== "stay").length;
  const stayCount = all.filter((d) => d.type === "stay").length;
  const regionsCount = new Set(all.map((d) => d.region.sr).filter(Boolean)).size;
  const newest = all.slice(0, 6);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>{t("hero_title")}</h1>
          <p>{t("hero_sub")}</p>
          <div className="hero-actions">
            <Link className="btn btn--primary btn--lg" href={sectionPath("mountain", lang)}>{t("hero_cta1")}</Link>
            <Link className="btn btn--ghost btn--lg" href={sectionPath("stay", lang)}>{t("hero_cta2")}</Link>
          </div>
          <form className="searchbar" onSubmit={(e) => { e.preventDefault(); router.push(`${searchPath(lang)}?q=${encodeURIComponent(q)}&type=${type}`); }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_ph")} />
            <select value={type} onChange={(e) => setType(e.target.value as "mountain"|"lake"|"spa"|"ethno"|"stay")}>
              <option value="mountain">{t("nav_mountains")}</option>
              <option value="lake">{t("nav_lakes")}</option>
              <option value="spa">{t("nav_spas")}</option>
              <option value="ethno">{t("nav_ethno")}</option>
              <option value="stay">{t("nav_stays")}</option>
            </select>
            <button className="btn btn--primary" type="submit">{t("search_btn")}</button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head section-head--center">
            <div className="eyebrow">{t("explore_eyebrow")}</div>
            <h2 className="section-title">{t("explore_title")}</h2>
            <p className="section-lead">{t("explore_lead")}</p>
          </div>
          <div className="cat-grid">
            {CATS.map((c) => (
              <Link key={c.kind} className="cat-tile" href={sectionPath(c.kind, lang)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://images.unsplash.com/photo-${c.img}?auto=format&fit=crop&w=600&q=80`} alt="" />
                <div className="cat-meta"><h3>{t(c.key)}</h3><span>{c.sub}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featuredHome.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">{t("promo_featured")}</div>
              <h2 className="section-title">{t("promo_home_title")}</h2>
            </div>
            <div className="card-grid">{featuredHome.slice(0, 8).map((d) => <ListingCard key={d.id} item={d} />)}</div>
          </div>
        </section>
      )}

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t("featured_eyebrow")}</div>
            <h2 className="section-title">{t("featured_title")}</h2>
            <p className="section-lead">{t("featured_lead")}</p>
          </div>
          <div className="card-grid">{fallbackFeatured.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t("newest_eyebrow")}</div>
            <h2 className="section-title">{t("newest_title")}</h2>
          </div>
          <div className="card-grid">{newest.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        </div>
      </section>

      {events.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">🎉 {lang === "sr" ? "Ne propustite" : lang === "de" ? "Nicht verpassen" : "Don't miss"}</div>
              <h2 className="section-title">{lang === "sr" ? "Predstojeće manifestacije" : lang === "de" ? "Bevorstehende Veranstaltungen" : "Upcoming events"}</h2>
            </div>
            <div className="card-grid">
              {events.map((e) => {
                const c = evCatByKey(e.category);
                const per = e.periodText || monthName(e.month, lang);
                const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";
                return (
                  <div className="card" key={e.id}>
                    <div className="card-media" style={e.image ? undefined : { background: "linear-gradient(135deg,#7c3aed,#0f3d2e)", display: "grid", placeItems: "center", minHeight: 140 }}>
                      {e.image
                        ? <Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={e.image} alt={e.name} style={{ objectFit: "cover" }} />
                        : <span style={{ fontSize: "2.6rem" }}>{c?.icon || "🎉"}</span>}
                      <span className="card-badge">{c?.icon} {c ? evCatLabel(c, lang) : e.category}</span>
                    </div>
                    <div className="card-body">
                      <span className="card-region">{[per, e.city].filter(Boolean).join(" · ")}</span>
                      <h3 className="card-title"><Link href={eventPath(e.name, lang)} style={{ color: "inherit" }}>{e.name}</Link></h3>
                      <p className="card-desc">{e.desc[lc]}</p>
                      <div style={{ marginTop: 8 }}><Link className="btn btn--primary" style={{ fontSize: ".82rem", padding: "7px 12px" }} href={eventPath(e.name, lang)}>{lang === "sr" ? "Detalji" : lang === "de" ? "Details" : "Details"}</Link></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Link className="btn btn--outline" href={manifIndexPath(lang)}>{lang === "sr" ? "Sve manifestacije" : lang === "de" ? "Alle Veranstaltungen" : "All events"}</Link>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="stat"><b>{destCount}</b><span>{t("stat_dest")}</span></div>
            <div className="stat"><b>{stayCount}</b><span>{t("stat_stays")}</span></div>
            <div className="stat"><b>{regionsCount}</b><span>{t("stat_regions")}</span></div>
            <div className="stat"><b>24/7</b><span>{t("stat_support")}</span></div>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{t("stays_eyebrow")}</div>
            <h2 className="section-title">{t("stays_title")}</h2>
            <p className="section-lead">{t("stays_lead")}</p>
          </div>
          <div className="card-grid">{stays.map((d) => <ListingCard key={d.id} item={d} />)}</div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <Link className="btn btn--outline" href={sectionPath("stay", lang)}>{t("view_all")}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>{t("cta_title")}</h2>
            <p>{t("cta_lead")}</p>
            <Link className="btn btn--primary btn--lg" href={sectionPath("stay", lang)}>{t("cta_btn")}</Link>
          </div>
        </div>
      </section>
      <section className="section section--soft">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{lang === "sr" ? "Sve na jednom mestu" : lang === "de" ? "Alles an einem Ort" : "All in one place"}</div>
            <h2 className="section-title">{lang === "sr" ? "Istražite portal" : lang === "de" ? "Portal entdecken" : "Explore the portal"}</h2>
          </div>
          <div className="card-grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))" }}>
            {[
              { icon: "🧳", label: t("nav_firme"), sub: lang === "sr" ? "Agencije, rent-a-car, vodiči…" : lang === "de" ? "Agenturen, Mietwagen, Guides…" : "Agencies, car rental, guides…", href: firmeIndexPath(lang) },
              { icon: "🍯", label: t("nav_pijaca"), sub: lang === "sr" ? "Domaći proizvodi" : lang === "de" ? "Heimische Produkte" : "Local products", href: pijacaPath(lang) },
              { icon: "🎟️", label: t("nav_vauceri"), sub: lang === "sr" ? "Odmor uz vaučere" : lang === "de" ? "Urlaub mit Gutscheinen" : "Holidays with vouchers", href: voucherPath(lang) },
              { icon: "📣", label: t("nav_marketing"), sub: lang === "sr" ? "Oglašavanje na portalu" : lang === "de" ? "Werben auf dem Portal" : "Advertise on the portal", href: marketingPath(lang) },
              { icon: "🏠", label: t("nav_hostguide"), sub: lang === "sr" ? "Oglasite svoj smeštaj" : lang === "de" ? "Unterkunft inserieren" : "List your property", href: hostGuidePath(lang) },
            ].map((x) => (
              <Link key={x.href} className="card" href={x.href} style={{ padding: 22 }}>
                <div style={{ fontSize: "1.9rem", marginBottom: 6 }}>{x.icon}</div>
                <h3 style={{ margin: "0 0 4px" }}>{x.label}</h3>
                <p style={{ color: "var(--slate)", fontSize: ".9rem" }}>{x.sub}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">{lang === "sr" ? "Najtraženije" : lang === "de" ? "Beliebt" : "Most popular"}</div>
            <h2 className="section-title">{lang === "sr" ? "Popularne destinacije" : lang === "de" ? "Beliebte Reiseziele" : "Popular destinations"}</h2>
          </div>
          <div className="kw-cloud" style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {[
              { l: "Kopaonik", h: listingPath("mountain", "Kopaonik", lang) },
              { l: "Zlatibor", h: listingPath("mountain", "Zlatibor", lang) },
              { l: "Tara", h: listingPath("mountain", "Tara", lang) },
              { l: "Divčibare", h: listingPath("mountain", "Divčibare", lang) },
              { l: "Stara planina", h: listingPath("mountain", "Stara planina", lang) },
              { l: "Vrnjačka Banja", h: listingPath("spa", "Vrnjačka Banja", lang) },
              { l: "Sokobanja", h: listingPath("spa", "Sokobanja", lang) },
              { l: "Srebrno jezero", h: listingPath("lake", "Srebrno jezero", lang) },
              { l: "Palić", h: listingPath("lake", "Palićko jezero", lang) },
              { l: "Drvengrad", h: listingPath("ethno", "Drvengrad (Mećavnik)", lang) },
              { l: lang === "sr" ? "Apartmani Beograd" : lang === "de" ? "Belgrad" : "Belgrade", h: belgradePath(lang) },
            ].map((x) => <Link key={x.l} href={x.h} className="kw-chip">{x.l}</Link>)}
          </div>
        </div>
      </section>
      {weekend.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">{lang !== "sr" ? "Weekend ideas" : "Predlozi za vikend"}</div>
              <h2 className="section-title">{lang !== "sr" ? "Popular this week" : "Popularno ove nedelje"}</h2>
            </div>
            <div className="card-grid">{weekend.map((d) => <ListingCard key={d.id} item={d} />)}</div>
          </div>
        </section>
      )}
      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">{lang !== "sr" ? "Travel guides" : "Vodiči za putovanja"}</div>
              <h2 className="section-title">{lang !== "sr" ? "From our blog" : "Sa našeg bloga"}</h2>
              <p className="section-lead">{lang !== "sr" ? "Detailed guides to Serbia's finest destinations." : "Detaljni vodiči kroz najlepše destinacije Srbije."}</p>
            </div>
            <div className="card-grid">
              {posts.map((p) => {
                const title = (lang !== "sr" ? p.title_en : p.title_sr) || p.title_sr;
                const ex = (lang !== "sr" ? p.excerpt_en : p.excerpt_sr) || p.excerpt_sr || "";
                const href = (lang === "sr" ? "/blog/" : `/${lang}/blog/`) + p.slug;
                return (
                  <Link key={p.id} className="card" href={href}>
                    {p.cover_image && <div className="card-media"><Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={p.cover_image} alt={title} style={{ objectFit: "cover" }} /></div>}
                    <div className="card-body"><h3 className="card-title">{title}</h3><p className="card-desc">{ex}</p></div>
                  </Link>
                );
              })}
            </div>
            <div style={{ textAlign: "center", marginTop: 30 }}>
              <Link className="btn btn--outline" href={lang === "sr" ? "/blog" : `/${lang}/blog`}>{lang === "sr" ? "Svi vodiči" : "All guides"}</Link>
            </div>
          </div>
        </section>
      )}
      <FaqAccordion items={generalFaqs(lang)} heading={lang !== "sr" ? "Frequently asked questions" : "Često postavljana pitanja"} />
    </>
  );
}
