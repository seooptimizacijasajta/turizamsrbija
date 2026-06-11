export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/predracun", "/nalog", "/en/nalog", "/de/konto", "/sacuvano", "/en/saved", "/de/gespeichert"] }],
    sitemap: "https://turizamsrbija.com/sitemap.xml",
    host: "https://turizamsrbija.com",
  };
}
