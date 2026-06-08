import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { datesToICal } from "@/lib/ical";
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = getServerClient();
  let blocked: string[] = [];
  if (sb) {
    const { data } = await sb.from("availability").select("day").eq("listing_id", id).eq("is_blocked", true);
    blocked = (data || []).map((r: any) => (typeof r.day === "string" ? r.day.slice(0, 10) : new Date(r.day).toISOString().slice(0, 10)));
  }
  return new NextResponse(datesToICal(blocked), {
    headers: { "Content-Type": "text/calendar; charset=utf-8", "Cache-Control": "public, max-age=900" },
  });
}
