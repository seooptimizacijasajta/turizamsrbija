import type { MetadataRoute } from "next";
import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import {
  listingPath, sectionPath, homePath, belgradePath, listPath, infoPath,
  voucherPath, marketingPath, blogPath,
} from "@/lib/slug";
import { LANDING_AMENITIES, amenityPath } from "@/lib/amenities";
import { pijacaPath } from "@/lib/pijaca";
import { BG_AREAS, bgAreaPath } from "@/lib/belgrade";
import { STRUCTURES, structPath } from "@/lib/structure";
import { BG_INFO, bgInfoPath } from "@/lib/bgInfo";
import type { Kind } from "@/lib/types";

const BASE = "https://turizamsrbija.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [all, posts] = await Promise.all([getListings(), getPosts()]);
  const now = new Date();
  const out: MetadataRoute.Sitemap = [];

  // One entry per page, carrying SR/EN/DE hreflang alternates
  const tri = (sr: string, en: string, de: string) => {
    out.push({
      url: BASE + sr, lastModified: now, changeFrequency: "weekly", priority: 0.7,
      alternates: { languages: { "sr-Latn-RS": BASE + sr, en: BASE + en, de: BASE + de, "x-default": BASE + sr } },
    });
  };

  // Core pages
  tri(homePath("sr"), homePath("en"), homePath("de"));
  tri(belgradePath("sr"), belgradePath("en"), belgradePath("de"));
  tri(listPath("sr"), listPath("en"), listPath("de"));
  tri(blogPath("sr"), blogPath("en"), blogPath("de"));
  tri(pijacaPath("sr"), pijacaPath("en"), pijacaPath("de"));
  tri(voucherPath("sr"), voucherPath("en"), voucherPath("de"));
  tri(marketingPath("sr"), marketingPath("en"), marketingPath("de"));
  (["about", "contact", "terms", "privacy", "faq"] as const).forEach((w) =>
    tri(infoPath(w, "sr"), infoPath(w, "en"), infoPath(w, "de")));

  // Sections
  (["mountain", "lake", "spa", "ethno", "stay"] as Kind[]).forEach((k) =>
    tri(sectionPath(k, "sr"), sectionPath(k, "en"), sectionPath(k, "de")));

  // Listings
  all.forEach((l) =>
    tri(listingPath(l.type, l.name.sr, "sr"), listingPath(l.type, l.name.sr, "en"), listingPath(l.type, l.name.sr, "de")));

  // Blog posts
  posts.forEach((p) => tri(`/blog/${p.slug}`, `/en/blog/${p.slug}`, `/de/blog/${p.slug}`));

  // Amenity landing pages
  LANDING_AMENITIES.forEach((k) => tri(amenityPath(k, "sr"), amenityPath(k, "en"), amenityPath(k, "de")));

  // Belgrade neighbourhoods + structures
  BG_AREAS.forEach((a) => tri(bgAreaPath(a.slug, "sr"), bgAreaPath(a.slug, "en"), bgAreaPath(a.slug, "de")));
  STRUCTURES.forEach((st) => tri(structPath(st.slug, "sr"), structPath(st.slug, "en"), structPath(st.slug, "de")));

  // Belgrade info pages
  BG_INFO.forEach((x) => tri(bgInfoPath(x, "sr"), bgInfoPath(x, "en"), bgInfoPath(x, "de")));

  return out;
}
