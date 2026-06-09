export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/nalog", "/en/nalog"] }],
    sitemap: "https://turizamsrbija.com/sitemap.xml",
  };
}
