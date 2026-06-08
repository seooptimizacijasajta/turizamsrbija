import { getServerClient } from "./supabase";
export async function getBlockedDates(listingId: string): Promise<string[]> {
  const sb = getServerClient();
  if (!sb || !listingId) return [];
  const { data } = await sb.from("availability").select("day").eq("listing_id", listingId).eq("is_blocked", true);
  return (data || []).map((r: any) => (typeof r.day === "string" ? r.day.slice(0, 10) : new Date(r.day).toISOString().slice(0, 10)));
}
