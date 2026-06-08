import { getServerClient } from "./supabase";
export type Review = { id: string; author_name: string; rating: number; comment: string | null; created_at: string };

export async function getReviews(listingId: string): Promise<{ reviews: Review[]; avg: number; count: number }> {
  const sb = getServerClient();
  if (!sb || !listingId) return { reviews: [], avg: 0, count: 0 };
  const { data } = await sb
    .from("reviews")
    .select("id,author_name,rating,comment,created_at")
    .eq("listing_id", listingId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });
  const reviews = (data || []) as Review[];
  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { reviews, avg, count };
}
