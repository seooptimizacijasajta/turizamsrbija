"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

const NAV = [
  { href: "/", key: "nav_home" },
  { href: "/planine", key: "nav_mountains" },
  { href: "/jezera", key: "nav_lakes" },
  { href: "/banje", key: "nav_spas" },
  { href: "/etno-sela", key: "nav_ethno" },
  { href: "/smestaj", key: "nav_stays" },
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="container nav">
        <Link className="brand" href="/">
          <span className="mark">★</span>
          <span>Turizam<b>Srbija</b></span>
        </Link>
        <nav className={"nav-links" + (open ? " open" : "")}>
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={path === n.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          <div className="lang-toggle">
            <button className={lang === "sr" ? "active" : ""} onClick={() => setLang("sr")}>SR</button>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        </div>
      </div>
    </header>
  );
}
