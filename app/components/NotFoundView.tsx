"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { homePath, sectionPath } from "@/lib/slug";
import type { Kind } from "@/lib/types";

const CATS: { k: Kind; key: string }[] = [
  { k: "mountain", key: "nav_mountains" }, { k: "lake", key: "nav_lakes" }, { k: "river", key: "nav_rivers" }, { k: "monastery", key: "nav_monasteries" }, { k: "spa", key: "nav_spas" },
  { k: "ethno", key: "nav_ethno" }, { k: "stay", key: "nav_stays" },
];

export default function NotFoundView() {
  const { lang, t } = useLang();
  const en = lang !== "sr";
  return (
    <div className="container" style={{ padding: "90px 0", textAlign: "center", maxWidth: 680 }}>
      <div style={{ fontSize: "5.5rem", fontWeight: 800, color: "var(--green-600)", lineHeight: 1 }}>404</div>
      <h1 style={{ marginTop: 10 }}>{en ? "Page not found" : "Strana nije pronađena"}</h1>
      <p style={{ color: "var(--slate)", margin: "12px 0 26px" }}>
        {en ? "The page you're looking for doesn't exist or has moved." : "Strana koju tražite ne postoji ili je premeštena."}
      </p>
      <div className="hero-actions" style={{ justifyContent: "center" }}>
        <Link className="btn btn--primary" href={homePath(lang)}>{en ? "Home" : "Početna"}</Link>
        <Link className="btn btn--outline" href={lang === "sr" ? "/pretraga" : lang === "de" ? "/de/suche" : "/en/search"}>{en ? "Search" : "Pretraga"}</Link>
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 32 }}>
        {CATS.map((c) => <Link key={c.k} className="btn btn--outline" href={sectionPath(c.k, lang)}>{t(c.key)}</Link>)}
      </div>
    </div>
  );
}
