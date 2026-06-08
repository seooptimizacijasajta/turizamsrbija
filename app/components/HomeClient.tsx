"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Listing } from "@/lib/types";
import { useLang } from "@/lib/i18n";
import { slugify, sectionPath } from "@/lib/slug";
import ListingCard from "./ListingCard";

const CATS = [
  { kind: "mountain" as const, key: "nav_mountains", img: "1551524559-8af4e6624178", sub: "Kopaonik · Zlatibor · Tara" },
  { kind: "lake" as const, key: "nav_lakes", img: "1439066615861-d1af74d74000", sub: "Palić · Perućac · Vlasina" },
  { kind: "spa" as const, key: "nav_spas", img: "1540555700478-4be289fbecef", sub: "Vrnjačka · Sokobanja" },
  { kind: "ethno" as const, key: "nav_ethno", img: "1518780664697-55e3ad937233", sub: "Drvengrad · Sirogojno" },
  { kind: "stay" as const, key: "nav_stays", img: "1566073771259-6a8506099945", sub: "Hoteli · Apartmani" },
];

export default function HomeClient({ all }: { all: Listing[] }) {
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
  const destCount = all.filter((d) => d.type !== "stay").length;
  const stayCount = all.filter((d) => d.type === "stay").length;

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
          <form className="searchbar" onSubmit={(e) => { e.preventDefault(); router.push(`${sectionPath(type, lang)}?q=${encodeURIComponent(q)}`); }}>
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
          <div className="stats">
            <div className="stat"><b>{destCount}+</b><span>{t("stat_dest")}</span></div>
            <div className="stat"><b>{stayCount}+</b><span>{t("stat_stays")}</span></div>
            <div className="stat"><b>15+</b><span>{t("stat_regions")}</span></div>
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
    </>
  );
}
