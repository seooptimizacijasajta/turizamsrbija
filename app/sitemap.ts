import type { MetadataRoute } from "next";
import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import {
  listingPath, sectionPath, homePath, belgradePath, listPath, infoPath,
  voucherPath, marketingPath, blogPath, hostGuidePath,
} from "@/lib/slug";
import { LANDING_AMENITIES, amenityPath } from "@/lib/amenities";
import { pijacaPath } from "@/lib/pijaca";
import { BG_AREAS, bgAreaPath } from "@/lib/belgrade";
import { STRUCTURES, structPath } from "@/lib/structure";
import { BG_INFO, bgInfoPath } from "@/lib/bgInfo";
import { BIZ_CATS, firmeIndexPath, firmeCatPath, BIZ_CITIES, firmeCatCityPath, businessPath } from "@/lib/firme";
import { getBusinesses } from "@/lib/businesses";
import { EVENT_CATS, manifIndexPath, manifCatPath, eventPath, EVENT_CITIES, manifCityPath } from "@/lib/events";
import { getEvents } from "@/lib/eventsData";
import { dealsPath } from "@/lib/deals";
import { TERMS, termPath } from "@/lib/recnik";
import { getProperties } from "@/lib/properties";
import { PROP_TYPES, nekretnineIndexPath, propTypePath, propertyPath } from "@/lib/nekretnine";
import type { Kind } from "@/lib/types";

const BASE = "https://turizamsrbija.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [all, posts, biz, events, properties] = await Promise.all([getListings(), getPosts(), getBusinesses(), getEvents(), getProperties()]);
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
  tri("/utisci-korisnika", "/en/reviews", "/de/erfahrungen");
  tri("/recnik", "/en/glossary", "/de/glossar");
  TERMS.forEach((tm) => tri(termPath(tm.slug, "sr"), termPath(tm.slug, "en"), termPath(tm.slug, "de")));
  tri(nekretnineIndexPath("sr"), nekretnineIndexPath("en"), nekretnineIndexPath("de"));
  PROP_TYPES.forEach((c) => tri(propTypePath(c, "sr"), propTypePath(c, "en"), propTypePath(c, "de")));
  properties.forEach((p) => tri(propertyPath(p, "sr"), propertyPath(p, "en"), propertyPath(p, "de")));
  tri(blogPath("sr"), blogPath("en"), blogPath("de"));
  tri(pijacaPath("sr"), pijacaPath("en"), pijacaPath("de"));
  tri(dealsPath("sr"), dealsPath("en"), dealsPath("de"));
  tri(voucherPath("sr"), voucherPath("en"), voucherPath("de"));
  tri(marketingPath("sr"), marketingPath("en"), marketingPath("de"));
  tri(hostGuidePath("sr"), hostGuidePath("en"), hostGuidePath("de"));
  (["about", "contact", "terms", "privacy", "faq"] as const).forEach((w) =>
    tri(infoPath(w, "sr"), infoPath(w, "en"), infoPath(w, "de")));

  // Sections
  (["mountain", "lake", "spa", "ethno", "stay"] as Kind[]).forEach((k) =>
    tri(sectionPath(k, "sr"), sectionPath(k, "en"), sectionPath(k, "de")));

  // Listings
  all.forEach((l) =>
    tri(listingPath(l.type, l.name.sr, "sr"), listingPath(l.type, l.name.sr, "en"), listingPath(l.type, l.name.sr, "de")));

  // Blog posts
  posts.forEach((p) => {
    const L: Record<string, string> = { "sr-Latn-RS": BASE + `/blog/${p.slug}`, "x-default": BASE + `/blog/${p.slug}` };
    if (p.title_en) L.en = BASE + `/en/blog/${p.slug}`;
    if (p.title_de) L.de = BASE + `/de/blog/${p.slug}`;
    out.push({ url: BASE + `/blog/${p.slug}`, lastModified: p.updated_at ? new Date(p.updated_at) : now, changeFrequency: "weekly", priority: 0.7, alternates: { languages: L } });
  });

  // Amenity landing pages
  LANDING_AMENITIES.forEach((k) => tri(amenityPath(k, "sr"), amenityPath(k, "en"), amenityPath(k, "de")));

  // Belgrade neighbourhoods + structures
  BG_AREAS.forEach((a) => tri(bgAreaPath(a.slug, "sr"), bgAreaPath(a.slug, "en"), bgAreaPath(a.slug, "de")));
  STRUCTURES.forEach((st) => tri(structPath(st.slug, "sr"), structPath(st.slug, "en"), structPath(st.slug, "de")));

  // Belgrade info pages
  BG_INFO.forEach((x) => tri(bgInfoPath(x, "sr"), bgInfoPath(x, "en"), bgInfoPath(x, "de")));

  // Business directory
  tri(firmeIndexPath("sr"), firmeIndexPath("en"), firmeIndexPath("de"));
  BIZ_CATS.forEach((c) => tri(firmeCatPath(c, "sr"), firmeCatPath(c, "en"), firmeCatPath(c, "de")));
  BIZ_CATS.forEach((c) => BIZ_CITIES.forEach((ci) => tri(firmeCatCityPath(c, ci.slug, "sr"), firmeCatCityPath(c, ci.slug, "en"), firmeCatCityPath(c, ci.slug, "de"))));
  biz.forEach((b) => tri(businessPath(b.name, "sr"), businessPath(b.name, "en"), businessPath(b.name, "de")));

  // Manifestacije
  tri(manifIndexPath("sr"), manifIndexPath("en"), manifIndexPath("de"));
  EVENT_CATS.forEach((c) => tri(manifCatPath(c, "sr"), manifCatPath(c, "en"), manifCatPath(c, "de")));
  events.forEach((e) => tri(eventPath(e.name, "sr"), eventPath(e.name, "en"), eventPath(e.name, "de")));
  EVENT_CITIES.forEach((c) => tri(manifCityPath(c.slug, "sr"), manifCityPath(c.slug, "en"), manifCityPath(c.slug, "de")));

  return out;
}
