"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { homePath, sectionPath, switchLangPath, belgradePath, listPath } from "@/lib/slug";
import type { Kind } from "@/lib/types";

const SECTIONS: { kind: Kind; key: string }[] = [
  { kind: "mountain", key: "nav_mountains" },
  { kind: "lake", key: "nav_lakes" },
  { kind: "spa", key: "nav_spas" },
  { kind: "ethno", key: "nav_ethno" },
  { kind: "stay", key: "nav_stays" },
];

export default function Header() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const path = usePathname() || "/";
  const router = useRouter();
  const accountHref = lang === "en" ? "/en/nalog" : "/nalog";

  function go(target: "sr" | "en") {
    router.push(switchLangPath(path, target));
  }

  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href={homePath(lang)}>
          <span className="mark">★</span><span>Turizam<b>Srbija</b></span>
        </Link>
        <nav className={"nav-links" + (open ? " open" : "")}>
          <Link href={homePath(lang)} className={path === homePath(lang) ? "active" : ""} onClick={() => setOpen(false)}>{t("nav_home")}</Link>
          {SECTIONS.map((s) => {
            const href = sectionPath(s.kind, lang);
            return (
              <Link key={s.kind} href={href} className={path === href ? "active" : ""} onClick={() => setOpen(false)}>{t(s.key)}</Link>
            );
          })}
          <Link href={belgradePath(lang)} className={path === belgradePath(lang) ? "active" : ""} onClick={() => setOpen(false)}>{t("nav_belgrade")}</Link>
          <Link href={accountHref} className={path === accountHref ? "active" : ""} onClick={() => setOpen(false)}>{t("nav_account")}</Link>
        </nav>
        <div className="nav-right">
          <Link className="btn btn--primary" href={listPath(lang)} style={{ padding: "8px 14px", fontSize: ".85rem" }}>{t("nav_list")}</Link>
          <div className="lang-toggle">
            <button className={lang === "sr" ? "active" : ""} onClick={() => go("sr")}>SR</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => go("en")}>EN</button>
          </div>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
    </header>
  );
}
