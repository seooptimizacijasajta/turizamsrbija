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
import JsonLd from "@/app/components/JsonLd";

export const metadata: Metadata = {
  metadataBase: new URL("https://turizamsrbija.com"),
  title: "Turizam Srbija — Planine, jezera, banje i etno sela",
  description:
    "Turistički portal Srbije: planine, jezera, banje, etno sela, hoteli i privatni smeštaj iz cele Srbije.",
  openGraph: {
    type: "website", siteName: "Turizam Srbija", locale: "sr_RS",
    title: "Turizam Srbija — Planine, jezera, banje i etno sela",
    description: "Najlepše destinacije i smeštaj u Srbiji na jednom mestu.",
    images: ["https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?auto=format&fit=crop&w=1200&q=80"],
  },
  twitter: { card: "summary_large_image" },
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
        <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: "Turizam Srbija", url: "https://turizamsrbija.com", logo: "https://turizamsrbija.com/icon.png", contactPoint: { "@type": "ContactPoint", telephone: "+381644598778", contactType: "customer support" } }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Turizam Srbija", url: "https://turizamsrbija.com" }} />
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
          </CurrencyProvider>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
