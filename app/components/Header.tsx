"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { useCurrency } from "@/lib/currency";
import { homePath, sectionPath, switchLangPath, belgradePath, listPath, accountPath, mapPath, searchPath, savedPath, blogPath } from "@/lib/slug";
import { pijacaPath } from "@/lib/pijaca";
import { STAY_TYPES, stayTypeName, stayTypePath } from "@/lib/stayTypes";
import { BLOG_CATS, catName, catPath, catsIndexPath } from "@/lib/blogCategories";
import { weatherPath } from "@/lib/weather";
import { firmeIndexPath, firmeCatPath, BIZ_CATS, bizCatLabel } from "@/lib/firme";
import { manifIndexPath } from "@/lib/events";
import { dealsPath } from "@/lib/deals";
import { nekretnineIndexPath } from "@/lib/nekretnine";
import { letovanjePath, zimovanjePath } from "@/lib/sezona";
import { gdeNaOdmorPath } from "@/lib/gdenaodmor";
import type { Kind } from "@/lib/types";

const DEST: { kind: Kind; key: string }[] = [
  { kind: "mountain", key: "nav_mountains" },
  { kind: "lake", key: "nav_lakes" },
  { kind: "river", key: "nav_rivers" },
  { kind: "monastery", key: "nav_monasteries" },
  { kind: "spa", key: "nav_spas" },
  { kind: "ethno", key: "nav_ethno" },
];

export default function Header() {
  const { lang, t } = useLang();
  const { favs } = useFavorites();
  const { cur, setCur } = useCurrency();
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState<string | null>(null);
  const path = usePathname() || "/";
  const router = useRouter();
  const accountHref = accountPath(lang);
  const close = () => { setOpen(false); setDd(null); };
  const toggle = (id: string) => setDd((d) => (d === id ? null : id));

  const destActive = DEST.some((d) => path === sectionPath(d.kind, lang)) || path === mapPath(lang);
  const stayActive = path === sectionPath("stay", lang) || path === belgradePath(lang);
  const firmeActive = path === firmeIndexPath(lang) || path.includes("/firme") || path.includes("/businesses") || path.includes("/firmen");

  const allStays = lang === "sr" ? "Sav smeštaj" : lang === "de" ? "Alle Unterkünfte" : "All accommodation";
  const allFirme = lang === "sr" ? "Sve firme" : lang === "de" ? "Alle Firmen" : "All businesses";

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href={homePath(lang)} onClick={close}>
          <span className="mark">★</span><span>Turizam<b>Srbija</b></span>
        </Link>
        <nav className={"nav-links" + (open ? " open" : "")}>
          <Link href={homePath(lang)} className={path === homePath(lang) ? "active" : ""} onClick={close}>{t("nav_home")}</Link>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (destActive ? " active" : "")} onClick={() => toggle("dest")}>{t("nav_destinations")} ▾</button>
            <div className={"nav-dd-panel" + (dd === "dest" ? " open" : "")}>
              {DEST.map((d) => <Link key={d.kind} href={sectionPath(d.kind, lang)} onClick={close}>{t(d.key)}</Link>)}
              <Link href={mapPath(lang)} onClick={close}>🗺 {t("nav_map")}</Link>
              <Link href={letovanjePath(lang)} onClick={close} style={{ borderTop: "1px solid rgba(0,0,0,.08)", marginTop: 4, paddingTop: 8 }}>☀️ {lang === "sr" ? "Letovanje" : lang === "de" ? "Sommerurlaub" : "Summer holidays"}</Link>
              <Link href={zimovanjePath(lang)} onClick={close}>❄️ {lang === "sr" ? "Zimovanje" : lang === "de" ? "Winterurlaub" : "Winter holidays"}</Link>
            </div>
          </div>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (stayActive ? " active" : "")} onClick={() => toggle("stay")}>{t("nav_stays")} ▾</button>
            <div className={"nav-dd-panel" + (dd === "stay" ? " open" : "")}>
              <Link href={sectionPath("stay", lang)} onClick={close}>{allStays}</Link>
              <Link href={belgradePath(lang)} onClick={close}>{t("nav_belgrade")}</Link>
              {STAY_TYPES.map((s2) => (
                <Link key={s2.key} href={stayTypePath(s2, lang)} onClick={close}>{stayTypeName(s2, lang)}</Link>
              ))}
            </div>
          </div>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (firmeActive ? " active" : "")} onClick={() => toggle("firme")}>{t("nav_firme")} ▾</button>
            <div className={"nav-dd-panel" + (dd === "firme" ? " open" : "")}>
              <Link href={firmeIndexPath(lang)} onClick={close}><strong>{allFirme}</strong></Link>
              {BIZ_CATS.map((c) => <Link key={c.key} href={firmeCatPath(c, lang)} onClick={close}>{c.icon} {bizCatLabel(c, lang)}</Link>)}
              <Link href={nekretnineIndexPath(lang)} onClick={close} style={{ borderTop: "1px solid rgba(0,0,0,.08)", marginTop: 4, paddingTop: 8, fontWeight: 600 }}>🏠 {lang === "sr" ? "Nekretnine (prodaja)" : lang === "de" ? "Immobilien (Verkauf)" : "Real estate (sale)"}</Link>
            </div>
          </div>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + ((path === pijacaPath(lang) || path.includes("/manifestacij") || path.includes("/events") || path.includes("/veranstaltung") || path.includes("/pijaca") || path.includes("/markt") || path.includes("/marketplace")) ? " active" : "")} onClick={() => toggle("info")}>Info ▾</button>
            <div className={"nav-dd-panel" + (dd === "info" ? " open" : "")}>
              <Link href={gdeNaOdmorPath(lang)} onClick={close}>{lang === "sr" ? "Gde na odmor?" : lang === "de" ? "Wohin in den Urlaub?" : "Where to go?"}</Link>
              <Link href={manifIndexPath(lang)} onClick={close}>{lang === "sr" ? "Manifestacije" : lang === "de" ? "Veranstaltungen" : "Events"}</Link>
              <Link href={pijacaPath(lang)} onClick={close}>{t("nav_pijaca")}</Link>
              <Link href={weatherPath(lang)} onClick={close} style={{ borderTop: "1px solid rgba(0,0,0,.08)", marginTop: 4, paddingTop: 8 }}>🌤️ {lang === "sr" ? "Vremenska prognoza" : lang === "de" ? "Wetter" : "Weather"}</Link>
              <Link href={catsIndexPath(lang)} onClick={close}><strong>🌍 {lang === "sr" ? "Sve teme" : lang === "de" ? "Alle Themen" : "All topics"}</strong></Link>
              {BLOG_CATS.filter((c2) => c2.country).map((c2) => (
                <Link key={c2.id} href={catPath(c2, lang)} onClick={close}>{c2.country!.flag} {catName(c2, lang)}</Link>
              ))}
              {BLOG_CATS.filter((c2) => !c2.country).map((c2) => (
                <Link key={c2.id} href={catPath(c2, lang)} onClick={close}>{catName(c2, lang)}</Link>
              ))}
            </div>
          </div>
          <Link href={dealsPath(lang)} className={path.includes("/akcije") || path.includes("/deals") || path.includes("/angebote") ? "active" : ""} onClick={close} style={{ color: "#e0492f", fontWeight: 700 }}>🔥 {lang === "sr" ? "Akcije" : lang === "de" ? "Angebote" : "Deals"}</Link>
          <Link href={blogPath(lang)} className={(path === "/blog" || path === "/en/blog" || path === "/de/blog") ? "active" : ""} onClick={close}>{t("nav_blog")}</Link>

          <div className="nav-mobile-extra">
            <Link className="btn btn--primary" href={listPath(lang)} onClick={close} style={{ textAlign: "center" }}>{t("nav_list")}</Link>
            <Link className={"nav-account" + (path === accountHref ? " active" : "")} href={accountHref} onClick={close}>{t("nav_account")}</Link>
            <div style={{ display: "flex", gap: 10, padding: "4px 0" }}>
              <div className="lang-toggle">
                <button className={lang === "sr" ? "active" : ""} onClick={() => { close(); router.push(switchLangPath(path, "sr")); }}>SR</button>
                <button className={lang === "en" ? "active" : ""} onClick={() => { close(); router.push(switchLangPath(path, "en")); }}>EN</button>
                <button className={lang === "de" ? "active" : ""} onClick={() => { close(); router.push(switchLangPath(path, "de")); }}>DE</button>
              </div>
              <div className="lang-toggle">
                <button className={cur === "EUR" ? "active" : ""} onClick={() => setCur("EUR")}>€</button>
                <button className={cur === "RSD" ? "active" : ""} onClick={() => setCur("RSD")}>RSD</button>
              </div>
            </div>
          </div>
        </nav>
        <div className="nav-right">
          <Link className="nav-search" href={searchPath(lang)} title="AI Pretraga / AI Search" aria-label="AI Search" onClick={close} style={{ fontSize: "1.2rem", padding: "0 6px" }}>🔍</Link>
          <Link className="nav-fav" href={savedPath(lang)} title="Sačuvano / Saved" aria-label="Saved" onClick={close}>♥{favs.length > 0 && <span className="fav-count">{favs.length}</span>}</Link>
          <Link className="btn btn--primary" href={listPath(lang)} style={{ padding: "8px 14px", fontSize: ".85rem" }} onClick={close}>{t("nav_list")}</Link>
          <div className="lang-toggle">
            <button className={lang === "sr" ? "active" : ""} onClick={() => router.push(switchLangPath(path, "sr"))}>SR</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => router.push(switchLangPath(path, "en"))}>EN</button>
            <button className={lang === "de" ? "active" : ""} onClick={() => router.push(switchLangPath(path, "de"))}>DE</button>
          </div>
          <div className="lang-toggle">
            <button className={cur === "EUR" ? "active" : ""} onClick={() => setCur("EUR")}>€</button>
            <button className={cur === "RSD" ? "active" : ""} onClick={() => setCur("RSD")}>RSD</button>
          </div>
          <Link className={"nav-account" + (path === accountHref ? " active" : "")} href={accountHref} onClick={close}>{t("nav_account")}</Link>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
    </header>
  );
}
