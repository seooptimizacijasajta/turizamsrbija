import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import { listingPath, sectionPath } from "@/lib/slug";
import { LANDING_AMENITIES, amenityPath } from "@/lib/amenities";
import type { Kind } from "@/lib/types";

const BASE = "https://turizamsrbija.com";

export default async function sitemap() {
  const [all, posts] = await Promise.all([getListings(), getPosts()]);
  const urls: { url: string; lastModified: Date }[] = [];
  const add = (p: string) => urls.push({ url: BASE + p, lastModified: new Date() });

  ["/", "/en", "/apartmani-beograd", "/en/belgrade-apartments", "/oglasi-smestaj", "/en/list-your-space",
   "/blog", "/en/blog", "/de", "/de/blog", "/kontakt", "/en/contact", "/o-nama", "/en/about", "/uslovi", "/en/terms",
   "/privatnost", "/en/privacy", "/pijaca", "/en/marketplace", "/de/marketplace", "/vauceri", "/en/vouchers", "/de/vouchers"].forEach(add);

  (["mountain", "lake", "spa", "ethno", "stay"] as Kind[]).forEach((k) => { add(sectionPath(k, "sr")); add(sectionPath(k, "en")); add(sectionPath(k, "de")); });
  all.forEach((l) => { add(listingPath(l.type, l.name.sr, "sr")); add(listingPath(l.type, l.name.sr, "en")); add(listingPath(l.type, l.name.sr, "de")); });
  posts.forEach((p) => { add(`/blog/${p.slug}`); add(`/en/blog/${p.slug}`); add(`/de/blog/${p.slug}`); });
  LANDING_AMENITIES.forEach((k) => { add(amenityPath(k, "sr")); add(amenityPath(k, "en")); });

  return urls;
}
