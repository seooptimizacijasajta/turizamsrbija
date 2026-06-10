"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import { homePath, sectionPath, switchLangPath, belgradePath, listPath } from "@/lib/slug";
import { pijacaPath } from "@/lib/pijaca";
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
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const path = usePathname() || "/";
  const router = useRouter();
  const accountHref = lang === "sr" ? "/nalog" : `/${lang}/nalog`;
  const close = () => { setOpen(false); setDestOpen(false); };
  const destActive = DEST.some((d) => path === sectionPath(d.kind, lang));

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href={homePath(lang)} onClick={close}>
          <span className="mark">★</span><span>Turizam<b>Srbija</b></span>
        </Link>
        <nav className={"nav-links" + (open ? " open" : "")}>
          <Link href={homePath(lang)} className={path === homePath(lang) ? "active" : ""} onClick={close}>{t("nav_home")}</Link>

          <div className="nav-dd">
            <button className={"nav-dd-trigger" + (destActive ? " active" : "")} onClick={() => setDestOpen(!destOpen)}>
              {t("nav_destinations")} ▾
            </button>
            <div className={"nav-dd-panel" + (destOpen ? " open" : "")}>
              {DEST.map((d) => (
                <Link key={d.kind} href={sectionPath(d.kind, lang)} onClick={close}>{t(d.key)}</Link>
              ))}
            </div>
          </div>

          <Link href={lang === "sr" ? "/mapa" : `/${lang}/map`} className={path === (lang === "sr" ? "/mapa" : `/${lang}/map`) ? "active" : ""} onClick={close}>{t("nav_map")}</Link>
          <Link href={belgradePath(lang)} className={path === belgradePath(lang) ? "active" : ""} onClick={close}>{t("nav_belgrade")}</Link>
          <Link href={sectionPath("stay", lang)} className={path === sectionPath("stay", lang) ? "active" : ""} onClick={close}>{t("nav_stays")}</Link>
          <Link href={lang === "sr" ? "/blog" : `/${lang}/blog`} className={(path === "/blog" || path === "/en/blog" || path === "/de/blog") ? "active" : ""} onClick={close}>{t("nav_blog")}</Link>
          <Link href={pijacaPath(lang)} className={path === pijacaPath(lang) ? "active" : ""} onClick={close}>{t("nav_pijaca")}</Link>
        </nav>
        <div className="nav-right">
          <Link className="nav-search" href={lang === "sr" ? "/pretraga" : `/${lang}/search`} title="Pretraga / Search" aria-label="Search" onClick={close} style={{ fontSize: "1.2rem", padding: "0 6px" }}>🔍</Link>
          <Link className="nav-fav" href={lang === "sr" ? "/sacuvano" : `/${lang}/saved`} title="Sačuvano / Saved" aria-label="Saved" onClick={close}>♥{favs.length > 0 && <span className="fav-count">{favs.length}</span>}</Link>
          <Link className="btn btn--primary" href={listPath(lang)} style={{ padding: "8px 14px", fontSize: ".85rem" }} onClick={close}>{t("nav_list")}</Link>
          <div className="lang-toggle">
            <button className={lang === "sr" ? "active" : ""} onClick={() => router.push(switchLangPath(path, "sr"))}>SR</button>
            <button className={lang !== "sr" ? "active" : ""} onClick={() => router.push(switchLangPath(path, "en"))}>EN</button>
          </div>
          <Link className={"nav-account" + (path === accountHref ? " active" : "")} href={accountHref} onClick={close}>{t("nav_account")}</Link>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
    </header>
  );
}
