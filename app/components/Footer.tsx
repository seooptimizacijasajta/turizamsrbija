"use client";
import Link from "next/link";
import PaymentBadges from "./PaymentBadges";
import { useLang } from "@/lib/i18n";
import { sectionPath, infoPath } from "@/lib/slug";
import { amenityPath } from "@/lib/amenities";
import NewsletterForm from "./NewsletterForm";

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
        <NewsletterForm />
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
            ["FAQ", infoPath("faq", lang)],
            [t("foot_about_link"), infoPath("about", lang)], [t("foot_contact"), infoPath("contact", lang)],
            [t("foot_terms"), infoPath("terms", lang)], [t("foot_privacy"), infoPath("privacy", lang)],
          ])}
          {col(lang === "en" ? "By amenity" : "Po pogodnosti", [
            [lang === "en" ? "Accepts vouchers" : "Prima vaučere", amenityPath("vouchers", lang)],
            [lang === "en" ? "With pool" : "Sa bazenom", amenityPath("pool", lang)],
            [lang === "en" ? "Pet friendly" : "Pet friendly", amenityPath("pet", lang)],
            [lang === "en" ? "Family friendly" : "Za porodice sa decom", amenityPath("kids", lang)],
            [lang === "en" ? "With wellness" : "Sa wellness sadržajem", amenityPath("wellness", lang)],
          ])}
          {col(t("foot_follow"), [["Instagram", "#"], ["Facebook", "#"], ["YouTube", "#"]])}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 24, paddingTop: 18 }}><PaymentBadges compact /></div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} turizamsrbija.com — {t("foot_rights")}</span>
          <span>Beograd · Srbija</span>
        </div>
      </div>
    </footer>
  );
}
