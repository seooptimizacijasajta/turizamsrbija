import { getServerClient } from "./supabase";
import { getListings } from "./data";
import { listingPath } from "./slug";
import type { Lang } from "./types";

export type EventItem = {
  id: string; category: string; name: string;
  desc: { sr: string; en: string; de: string };
  body: { sr: string; en: string; de: string };
  city: string | null; region: string | null; venue: string | null;
  startDate: string | null; endDate: string | null;
  periodText: string | null; month: number | null;
  website: string | null; phone: string | null; email: string | null;
  image: string | null; featured: boolean;
};

function row(r: any): EventItem {
  const active = !r.featured_until || new Date(r.featured_until) >= new Date(new Date().toDateString());
  return {
    id: r.id, category: r.category, name: r.name,
    desc: { sr: r.desc_sr || "", en: r.desc_en || r.desc_sr || "", de: r.desc_de || r.desc_en || r.desc_sr || "" },
    body: { sr: r.body_sr || "", en: r.body_en || "", de: r.body_de || "" },
    city: r.city || null, region: r.region || null, venue: r.venue || null,
    startDate: r.start_date || null, endDate: r.end_date || null,
    periodText: r.period_text || null, month: r.month ?? null,
    website: r.website || null, phone: r.phone || null, email: r.email || null,
    image: r.image || null, featured: !!r.featured && active,
  };
}

export async function getEvents(): Promise<EventItem[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("events").select("*").eq("status", "approved").order("featured", { ascending: false }).order("month", { ascending: true });
  return (data || []).map(row);
}

export async function nearbyStays(ev: EventItem, lang: Lang) {
  const all = await getListings();
  const stays = all.filter((x) => x.type === "stay");
  const key = (ev.city || ev.region || "").toLowerCase();
  const lc = lang === "sr" ? "sr" : "en";
  let m = stays.filter((s) => !!key && ((s.region.sr || "").toLowerCase().includes(key) || (s.municipality || "").toLowerCase().includes(key) || (s.name.sr || "").toLowerCase().includes(key)));
  if (m.length < 3) {
    const extra = stays.filter((s) => !m.some((x) => x.id === s.id)).sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    m = m.concat(extra);
  }
  return m.slice(0, 4).map((s) => ({
    name: (s.name as any)[lc] || s.name.sr,
    region: (s.region as any)[lc] || s.region.sr,
    img: s.img, price: s.price,
    href: listingPath(s.type, s.name.sr, lang),
  }));
}

export async function upcomingEvents(limit = 4): Promise<EventItem[]> {
  const all = await getEvents();
  const today = new Date().toISOString().slice(0, 10);
  const m = new Date().getMonth() + 1;
  const dated = all.filter((e) => e.startDate && e.startDate >= today).sort((a, b) => (a.startDate! < b.startDate! ? -1 : 1));
  if (dated.length >= limit) return dated.slice(0, limit);
  const undated = all.filter((e) => !e.startDate || e.startDate < today).sort((a, b) => {
    const am = ((((a.month || 13) - m) % 12) + 12) % 12;
    const bm = ((((b.month || 13) - m) % 12) + 12) % 12;
    return am - bm;
  });
  return [...dated, ...undated.filter((u) => !dated.some((d) => d.id === u.id))].slice(0, limit);
}
