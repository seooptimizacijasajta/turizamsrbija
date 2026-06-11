import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { FavoritesProvider } from "@/lib/favorites";
import { CurrencyProvider } from "@/lib/currency";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BannerSlot from "@/app/components/BannerSlot";
import FloatingWidgets from "@/app/components/FloatingWidgets";
import CookieNotice from "@/app/components/CookieNotice";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/app/components/JsonLd";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://turizamsrbija.com"),
  title: "Turizam Srbija — Planine, jezera, banje i etno sela",
  description:
    "Turistički portal Srbije: planine, jezera, banje, etno sela, hoteli i privatni smeštaj iz cele Srbije.",
  openGraph: {
    type: "website", siteName: "Turizam Srbija", locale: "sr_RS",
    alternateLocale: ["en_US", "de_DE"],
    title: "Turizam Srbija — Planine, jezera, banje i etno sela",
    description: "Najlepše destinacije i smeštaj u Srbiji na jednom mestu.",
    images: ["https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=80"],
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: "FkL1chBzK51exF24gHos7fB2hbUeDZnW7X3FcPWJu7s",
    other: { "msvalidate.01": "7AFD696171A0EBB19318E47658526B8E" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Turizam Srbija", legalName: "Turizam Srbija", url: "https://turizamsrbija.com", logo: "https://turizamsrbija.com/icon.png", email: "info@turizamsrbija.com", identifier: { "@type": "PropertyValue", propertyID: "Company ID", value: "54801770" }, address: { "@type": "PostalAddress", streetAddress: "Karpatské námestie 7770/10A", addressLocality: "Bratislava – Rača", postalCode: "83106", addressCountry: "SK" }, contactPoint: { "@type": "ContactPoint", telephone: "+381644598778", contactType: "customer support", availableLanguage: ["sr", "en", "de"] }, sameAs: [] }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Turizam Srbija", url: "https://turizamsrbija.com", inLanguage: ["sr", "en", "de"], potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: "https://turizamsrbija.com/pretraga?q={search_term_string}" }, "query-input": "required name=search_term_string" } }} />
        <LanguageProvider>
          <FavoritesProvider>
          <CurrencyProvider>
          <Header />
          <BannerSlot position="top" />
          {children}
          <BannerSlot position="bottom" />
          <Footer />
          <FloatingWidgets />
          <CookieNotice />
          <Analytics />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-G0XYGYNTSC" strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-G0XYGYNTSC');`}</Script>
          </CurrencyProvider>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
