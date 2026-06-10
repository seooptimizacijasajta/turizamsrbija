import seed from "./seed.json";
import { Listing, Kind } from "./types";
import { getServerClient } from "./supabase";
import { slugify } from "./slug";

const FALLBACK = seed as unknown as Listing[];

const IMG = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/* Map a Supabase `listings` row (+ joined images) to our Listing shape. */
function rowToListing(r: any): Listing {
  const gallery: string[] = (r.listing_images || [])
    .sort((a: any, b: any) => (a.sort || 0) - (b.sort || 0))
    .map((i: any) => i.url);
  return {
    id: r.id,
    type: r.kind,
    category: r.category || undefined,
    name: { sr: r.name_sr, en: r.name_en },
    region: { sr: r.region_sr || "", en: r.region_en || "" },
    short: { sr: r.short_sr || "", en: r.short_en || "" },
    desc: { sr: r.desc_sr || "", en: r.desc_en || "" },
    features: { sr: r.features_sr || [], en: r.features_en || [] },
    img: r.hero_image || IMG("1551524559-8af4e6624178"),
    gallery: gallery.length ? gallery : [],
    price: Number(r.price) || 0,
    rating: Number(r.rating) || 0,
    capacity: r.capacity || undefined,
    elevation: r.elevation || undefined,
    municipality: r.municipality || undefined,
    videoUrls: r.video_urls || [],
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    googlePlaceId: r.google_place_id || undefined,
    featured: !!r.featured,
    featuredHome: !!r.featured_home,
    bold: !!r.bold,
    createdAt: r.created_at || undefined,
    views: r.views || 0,
    amenities: r.amenities || [],
    priceUnit: r.price_unit || undefined,
    minNights: r.min_nights ?? null,
    minNightsWeekend: r.min_nights_weekend ?? null,
    deposit: r.deposit ?? null,
    discountWeekly: r.discount_weekly ?? null,
    discountMonthly: r.discount_monthly ?? null,
  };
}

export async function getListings(kind?: Kind): Promise<Listing[]> {
  const sb = getServerClient();
  if (sb) {
    let q = sb
      .from("listings")
      .select("*, listing_images(url,sort)")
      .eq("status", "approved").order("created_at", { ascending: false });
    if (kind) q = q.eq("kind", kind);
    const { data, error } = await q;
    if (!error && data && data.length) return data.map(rowToListing);
  }
  return kind ? FALLBACK.filter((l) => l.type === kind) : FALLBACK;
}

export async function getListing(id: string): Promise<Listing | null> {
  const sb = getServerClient();
  if (sb) {
    const { data } = await sb
      .from("listings")
      .select("*, listing_images(url,sort)")
      .eq("id", id)
      .maybeSingle();
    if (data) return rowToListing(data);
  }
  return FALLBACK.find((l) => l.id === id) || null;
}

/** Look up a listing by its category + friendly slug (e.g. mountain + "kopaonik"). */
export async function getListingBySlug(
  kind: Kind,
  slug: string
): Promise<Listing | null> {
  const items = await getListings(kind);
  return items.find((l) => slugify(l.name.sr) === slug) || null;
}

export function getFallback(): Listing[] {
  return FALLBACK;
}
