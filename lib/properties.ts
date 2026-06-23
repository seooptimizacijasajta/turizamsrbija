import { getServerClient } from "./supabase";
import { slugify } from "./slug";

export type Property = {
  id: string;
  deal_type: string;
  property_type: string;
  title: string;
  description: string | null;
  price: number | null;
  area: number | null;
  land_area: number | null;
  rooms: number | null;
  city: string | null;
  municipality: string | null;
  address: string | null;
  lat: number | null;
  lng: number | null;
  image: string | null;
  images: string[];
  phone: string | null;
  email: string | null;
  featured: boolean;
  bold: boolean;
  created_at: string;
};

function row(r: any): Property {
  const act = (u: string | null) => !u || new Date(u) >= new Date(new Date().toDateString());
  return {
    id: r.id, deal_type: r.deal_type || "prodaja", property_type: r.property_type || "stan",
    title: r.title || "", description: r.description || null,
    price: r.price != null ? Number(r.price) : null,
    area: r.area != null ? Number(r.area) : null,
    land_area: r.land_area != null ? Number(r.land_area) : null,
    rooms: r.rooms != null ? Number(r.rooms) : null,
    city: r.city || null, municipality: r.municipality || null, address: r.address || null,
    lat: r.lat != null ? Number(r.lat) : null, lng: r.lng != null ? Number(r.lng) : null,
    image: r.image || null, images: Array.isArray(r.images) ? r.images : [],
    phone: r.phone || null, email: r.email || null,
    featured: !!r.featured && act(r.featured_until),
    bold: !!r.bold && act(r.bold_until),
    created_at: r.created_at,
  };
}

export async function getProperties(): Promise<Property[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("properties").select("*").eq("status", "approved")
    .order("featured", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map(row);
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const sb = getServerClient(); if (!sb) return null;
  const { data } = await sb.from("properties").select("*").eq("id", id).eq("status", "approved").maybeSingle();
  return data ? row(data) : null;
}

/** Resolve a property from a URL slug like "seosko-domacinstvo-kod-ivanjice".
 *  Also matches older links that had an id suffix (slug-...). */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const s = (slug || "").toLowerCase();
  const all = await getProperties();
  return all.find((x) => { const base = slugify(x.title); return s === base || s.startsWith(base + "-"); }) || null;
}
