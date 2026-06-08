"use client";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { sectionPath } from "@/lib/slug";

export default function Footer() {
  const { lang, t } = useLang();
  const col = (title: string, items: [string, string][]) => (
    <div>
      <h4>{title}</h4>
      {items.map(([label, href]) => (<Link key={label} href={href}>{label}</Link>))}
    </div>
  );
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><span className="mark">★</span> TurizamSrbija</div>
            <p style={{ maxWidth: 340, color: "#bfe0d3", fontSize: ".92rem" }}>{t("foot_about")}</p>
          </div>
          {col(t("foot_explore"), [
            [t("nav_mountains"), sectionPath("mountain", lang)],
            [t("nav_lakes"), sectionPath("lake", lang)],
            [t("nav_spas"), sectionPath("spa", lang)],
            [t("nav_ethno"), sectionPath("ethno", lang)],
            [t("nav_stays"), sectionPath("stay", lang)],
          ])}
          {col(t("foot_company"), [
            [t("foot_about_link"), "#"], [t("foot_contact"), "#"],
            [t("foot_terms"), "#"], [t("foot_privacy"), "#"],
          ])}
          {col(t("foot_follow"), [["Instagram", "#"], ["Facebook", "#"], ["YouTube", "#"]])}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} turizamsrbija.com — {t("foot_rights")}</span>
          <span>Beograd · Srbija</span>
        </div>
      </div>
    </footer>
  );
}
