import { getServerClient } from "./supabase";

export type Product = {
  id: string; category: string;
  name: { sr: string; en: string; de: string };
  desc: { sr: string; en: string; de: string };
  price: number | null; unit: string;
  region: { sr: string; en: string };
  producer: string | null; phone: string | null; image: string | null;
};

function row(r: any): Product {
  return {
    id: r.id, category: r.category,
    name: { sr: r.name_sr || "", en: r.name_en || r.name_sr || "", de: r.name_de || r.name_en || r.name_sr || "" },
    desc: { sr: r.desc_sr || "", en: r.desc_en || r.desc_sr || "", de: r.desc_de || r.desc_en || r.desc_sr || "" },
    price: r.price != null ? Number(r.price) : null, unit: r.unit || "kom",
    region: { sr: r.region_sr || "", en: r.region_en || r.region_sr || "" },
    producer: r.producer || null, phone: r.phone || null, image: r.image || null,
  };
}

export async function getProducts(): Promise<Product[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("products").select("*").eq("status", "approved").order("created_at", { ascending: false });
  return (data || []).map(row);
}
