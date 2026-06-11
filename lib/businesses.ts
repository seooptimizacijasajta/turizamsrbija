import { getServerClient } from "./supabase";
export type Business = {
  id: string; category: string; name: string;
  desc: { sr: string; en: string; de: string };
  city: string | null; municipality: string | null; address: string | null;
  phone: string | null; email: string | null; website: string | null;
  image: string | null; featured: boolean;
};
function row(r: any): Business {
  const active = !r.featured_until || new Date(r.featured_until) >= new Date(new Date().toDateString());
  return {
    id: r.id, category: r.category, name: r.name,
    desc: { sr: r.desc_sr || "", en: r.desc_en || r.desc_sr || "", de: r.desc_de || r.desc_en || r.desc_sr || "" },
    city: r.city || null, municipality: r.municipality || null, address: r.address || null,
    phone: r.phone || null, email: r.email || null, website: r.website || null,
    image: r.image || null, featured: !!r.featured && active,
  };
}
export async function getBusinesses(): Promise<Business[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("businesses").select("*").eq("status", "approved").order("featured", { ascending: false }).order("created_at", { ascending: false });
  return (data || []).map(row);
}
