import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }

  const { guest_name, email } = body || {};
  if (!guest_name || !email) {
    return NextResponse.json({ error: "name and email required" }, { status: 422 });
  }

  const row = {
    listing_id: body.listing_id && /^[0-9a-f-]{36}$/i.test(body.listing_id) ? body.listing_id : null,
    guest_name: String(guest_name).slice(0, 200),
    email: String(email).slice(0, 200),
    phone: body.phone ? String(body.phone).slice(0, 60) : null,
    checkin: body.checkin || null,
    checkout: body.checkout || null,
    guests: Number(body.guests) || 1,
    message: body.message ? String(body.message).slice(0, 2000) : null,
  };

  const sb = getServerClient();
  if (!sb) {
    // No DB configured yet — accept so the UI works in preview/fallback mode.
    console.warn("[inquiries] Supabase not configured; inquiry not persisted:", row.email);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const { error } = await sb.from("inquiries").insert(row);
  if (error) {
    console.error("[inquiries] insert error:", error.message);
    return NextResponse.json({ error: "could not save" }, { status: 500 });
  }

  // TODO Phase 2: push contact to HubSpot here using process.env.HUBSPOT_TOKEN
  return NextResponse.json({ ok: true, persisted: true });
}
