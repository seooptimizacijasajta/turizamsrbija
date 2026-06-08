import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  const rating = Number(b.rating);
  const name = String(b.author_name || "").trim();
  if (!name || !(rating >= 1 && rating <= 5) || !/^[0-9a-f-]{36}$/i.test(b.listing_id || "")) {
    return NextResponse.json({ error: "invalid" }, { status: 422 });
  }
  const sb = getServerClient();
  if (!sb) return NextResponse.json({ ok: true, persisted: false });
  const { error } = await sb.from("reviews").insert({
    listing_id: b.listing_id,
    author_name: name.slice(0, 120),
    rating,
    comment: b.comment ? String(b.comment).slice(0, 2000) : null,
  });
  if (error) return NextResponse.json({ error: "save failed" }, { status: 500 });
  return NextResponse.json({ ok: true, persisted: true });
}
