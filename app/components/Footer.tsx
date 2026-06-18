"use client";
import Link from "next/link";
import PaymentBadges from "./PaymentBadges";
import { useLang } from "@/lib/i18n";
import { sectionPath, infoPath, voucherPath, marketingPath, hostGuidePath } from "@/lib/slug";
import { dealsPath } from "@/lib/deals";
import { recnikPath } from "@/lib/recnik";
import { amenityPath } from "@/lib/amenities";
import { pijacaPath } from "@/lib/pijaca";
import { firmeIndexPath } from "@/lib/firme";
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
            <div style={{ display: "flex", gap: 16, marginTop: 14, fontWeight: 600 }}>
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="YouTube">YouTube</a>
            </div>
          </div>
          {col(t("foot_explore"), [
            [t("nav_mountains"), sectionPath("mountain", lang)],
            [t("nav_lakes"), sectionPath("lake", lang)],
            [t("nav_spas"), sectionPath("spa", lang)],
            [t("nav_ethno"), sectionPath("ethno", lang)],
            [t("nav_stays"), sectionPath("stay", lang)],
          ])}
          {col(t("foot_company"), [
            [lang === "sr" ? "🔥 Akcije i popusti" : lang === "de" ? "🔥 Angebote" : "🔥 Deals", dealsPath(lang)],
            [t("nav_pijaca"), pijacaPath(lang)],
            [t("nav_firme"), firmeIndexPath(lang)],
            [t("nav_vauceri"), voucherPath(lang)],
            [t("nav_marketing"), marketingPath(lang)],
            [t("nav_hostguide"), hostGuidePath(lang)],
            ["FAQ", infoPath("faq", lang)],
            [lang === "sr" ? "Utisci korisnika" : lang === "de" ? "Erfahrungen" : "Reviews", lang === "sr" ? "/utisci-korisnika" : lang === "de" ? "/de/erfahrungen" : "/en/reviews"],
            [lang === "sr" ? "Rečnik turizma" : lang === "de" ? "Tourismus-Glossar" : "Tourism glossary", recnikPath(lang)],
          ])}
          {col(lang === "sr" ? "Informacije" : lang === "de" ? "Informationen" : "Information", [
            [t("foot_about_link"), infoPath("about", lang)],
            [t("foot_contact"), infoPath("contact", lang)],
            [t("foot_terms"), infoPath("terms", lang)],
            [t("foot_privacy"), infoPath("privacy", lang)],
          ])}
        </div>
        <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px", fontSize: ".85rem", color: "#bfe0d3" }}>
          <span style={{ opacity: 0.7 }}>{lang === "sr" ? "Po pogodnosti:" : lang === "de" ? "Nach Ausstattung:" : "By amenity:"}</span>
          <Link href={amenityPath("vouchers", lang)}>{lang !== "sr" ? "Accepts vouchers" : "Prima vaučere"}</Link>
          <Link href={amenityPath("pool", lang)}>{lang !== "sr" ? "With pool" : "Sa bazenom"}</Link>
          <Link href={amenityPath("pet", lang)}>{lang !== "sr" ? "Pet friendly" : "Pet friendly"}</Link>
          <Link href={amenityPath("kids", lang)}>{lang !== "sr" ? "Family friendly" : "Za porodice sa decom"}</Link>
          <Link href={amenityPath("wellness", lang)}>{lang !== "sr" ? "With wellness" : "Sa wellness sadržajem"}</Link>
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
