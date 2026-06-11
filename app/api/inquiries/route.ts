import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { sendEmail, wrap, ADMIN_EMAIL } from "@/lib/email";

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

  // Email notifications (owner + admin) — best effort, non-blocking failures
  try {
    let listingName = ""; let ownerEmail = "";
    if (row.listing_id) {
      const { data: lst } = await sb.from("listings").select("name_sr, owner_id").eq("id", row.listing_id).maybeSingle();
      listingName = lst?.name_sr || "";
      if (lst?.owner_id) {
        const { data: u } = await (sb as any).auth.admin.getUserById(lst.owner_id);
        ownerEmail = u?.user?.email || "";
      }
    }
    const rows: [string, any][] = [
      ["Smeštaj / Listing", listingName], ["Gost / Guest", row.guest_name], ["Email", row.email],
      ["Telefon / Phone", row.phone], ["Dolazak / Check-in", row.checkin], ["Odlazak / Check-out", row.checkout],
      ["Osoba / Guests", row.guests], ["Poruka / Message", row.message],
    ];
    const subj = `Novi upit za ${listingName || "smeštaj"} / New inquiry`;
    if (ownerEmail) await sendEmail(ownerEmail, subj, wrap(subj, rows, "Odgovorite gostu direktno na email ili telefon iznad."), row.email);
    await sendEmail(ADMIN_EMAIL, subj, wrap(subj, rows), row.email);
  } catch (e: any) { console.error("[inquiries] email error", e?.message); }

  return NextResponse.json({ ok: true, persisted: true });
}
