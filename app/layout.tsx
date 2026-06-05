import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Turizam Srbija — Planine, jezera, banje i etno sela",
  description:
    "Turistički portal Srbije: planine, jezera, banje, etno sela, hoteli i privatni smeštaj iz cele Srbije.",
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
        <LanguageProvider>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
