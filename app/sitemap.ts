import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import { listingPath, sectionPath } from "@/lib/slug";
import type { Kind } from "@/lib/types";

const BASE = "https://turizamsrbija.com";

export default async function sitemap() {
  const [all, posts] = await Promise.all([getListings(), getPosts()]);
  const urls: { url: string; lastModified: Date }[] = [];
  const add = (p: string) => urls.push({ url: BASE + p, lastModified: new Date() });

  ["/", "/en", "/apartmani-beograd", "/en/belgrade-apartments", "/oglasi-smestaj", "/en/list-your-space",
   "/blog", "/en/blog", "/kontakt", "/en/contact", "/o-nama", "/en/about", "/uslovi", "/en/terms",
   "/privatnost", "/en/privacy"].forEach(add);

  (["mountain", "lake", "spa", "ethno", "stay"] as Kind[]).forEach((k) => { add(sectionPath(k, "sr")); add(sectionPath(k, "en")); });
  all.forEach((l) => { add(listingPath(l.type, l.name.sr, "sr")); add(listingPath(l.type, l.name.sr, "en")); });
  posts.forEach((p) => { add(`/blog/${p.slug}`); add(`/en/blog/${p.slug}`); });

  return urls;
}
