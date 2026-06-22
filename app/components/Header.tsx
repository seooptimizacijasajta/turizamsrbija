"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { useCurrency } from "@/lib/currency";
import { homePath, sectionPath, switchLangPath, belgradePath, listPath, accountPath, mapPath, searchPath, savedPath, blogPath } from "@/lib/slug";
import { pijacaPath } from "@/lib/pijaca";
import { firmeIndexPath, firmeCatPath, BIZ_CATS, bizCatLabel } from "@/lib/firme";
import { manifIndexPath } from "@/lib/events";
import { dealsPath } from "@/lib/deals";
import { nekretnineIndexPath } from "@/lib/nekretnine";
import type { Kind } from "@/lib/types";

const DEST: { kind: Kind; key: string }[] = [
  { kind: "mountain", key: "nav_mountains" },
  { kind: "lake", key: "nav_lakes" },
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
            </div>
          </div>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (stayActive ? " active" : "")} onClick={() => toggle("stay")}>{t("nav_stays")} ▾</button>
            <div className={"nav-dd-panel" + (dd === "stay" ? " open" : "")}>
              <Link href={sectionPath("stay", lang)} onClick={close}>{allStays}</Link>
              <Link href={belgradePath(lang)} onClick={close}>{t("nav_belgrade")}</Link>
            </div>
          </div>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (firmeActive ? " active" : "")} onClick={() => toggle("firme")}>{t("nav_firme")} ▾</button>
            <div className={"nav-dd-panel" + (dd === "firme" ? " open" : "")}>
              <Link href={firmeIndexPath(lang)} onClick={close}><strong>{allFirme}</strong></Link>
              {BIZ_CATS.map((c) => <Link key={c.key} href={firmeCatPath(c, lang)} onClick={close}>{c.icon} {bizCatLabel(c, lang)}</Link>)}
            </div>
          </div>

          <Link href={pijacaPath(lang)} className={path === pijacaPath(lang) ? "active" : ""} onClick={close}>{t("nav_pijaca")}</Link>
          <Link href={manifIndexPath(lang)} className={path.includes("/manifestacij") || path.includes("/events") || path.includes("/veranstaltung") ? "active" : ""} onClick={close}>{lang === "sr" ? "Manifestacije" : lang === "de" ? "Veranstaltungen" : "Events"}</Link>
          <Link href={nekretnineIndexPath(lang)} className={path.includes("/nekretnin") || path.includes("/real-estate") || path.includes("/immobili") ? "active" : ""} onClick={close}>{lang === "sr" ? "Nekretnine" : lang === "de" ? "Immobilien" : "Real estate"}</Link>
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
