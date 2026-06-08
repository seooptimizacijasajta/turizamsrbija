import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { parseICalDates } from "@/lib/ical";
export async function POST(req: NextRequest) {
  const token = (req.headers.get("authorization") || "").replace("Bearer ", "");
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon || !token) return NextResponse.json({ error: "no auth" }, { status: 401 });
  let body: any; try { body = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  const { listing_id, urls } = body || {};
  if (!/^[0-9a-f-]{36}$/i.test(listing_id || "")) return NextResponse.json({ error: "bad id" }, { status: 422 });

  const sb = createClient(url, anon, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
  const { data: u } = await sb.auth.getUser();
  if (!u?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { data: l } = await sb.from("listings").select("id").eq("id", listing_id).maybeSingle();
  if (!l) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const clean = (urls || []).filter((x: string) => /^https?:\/\//.test(x)).slice(0, 5);
  const days = new Set<string>();
  for (const u2 of clean) {
    try { const res = await fetch(u2); const txt = await res.text(); parseICalDates(txt).forEach((d) => days.add(d)); } catch {}
  }
  await sb.from("availability").delete().eq("listing_id", listing_id).eq("source", "ical");
  if (days.size) {
    await sb.from("availability").upsert([...days].map((d) => ({ listing_id, day: d, is_blocked: true, source: "ical" })), { onConflict: "listing_id,day" });
  }
  await sb.from("listings").update({ ical_urls: clean }).eq("id", listing_id);
  return NextResponse.json({ ok: true, imported: days.size });
}
