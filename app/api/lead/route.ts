import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { sendEmail, wrap, ADMIN_EMAIL } from "@/lib/email";
import { looksLikeSpam } from "@/lib/antispam";

/** Server-side handler for advertising / marketing leads.
 *  Runs with the service role (getServerClient) so RLS never blocks the insert,
 *  and always reports whether the row was persisted. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  if (looksLikeSpam(b)) return NextResponse.json({ ok: true, persisted: false });

  const name = String(b.name || "").trim();
  if (!name) return NextResponse.json({ error: "name required" }, { status: 422 });

  const row = {
    name: name.slice(0, 200),
    email: b.email ? String(b.email).slice(0, 200) : null,
    phone: b.phone ? String(b.phone).slice(0, 60) : null,
    business_type: b.business_type ? String(b.business_type).slice(0, 120) : null,
    package: b.package ? String(b.package).slice(0, 120) : null,
    message: b.message ? String(b.message).slice(0, 2000) : null,
  };

  const sb = getServerClient();
  let persisted = false;
  if (sb) {
    const { error } = await sb.from("marketing_leads").insert(row);
    if (error) console.error("[lead] insert error:", error.message);
    else persisted = true;
  }

  try {
    const rows: [string, any][] = [
      ["Ime / Name", row.name], ["Email", row.email], ["Telefon / Phone", row.phone],
      ["Tip biznisa / Business", row.business_type], ["Paket / Plan", row.package], ["Poruka / Message", row.message],
    ];
    await sendEmail(ADMIN_EMAIL, "Nov upit za oglašavanje / New advertising lead", wrap("Nov upit za oglašavanje", rows, "Lista je u Admin → Marketing upiti / Leads."), row.email || undefined);
  } catch (e: any) { console.error("[lead] email error", e?.message); }

  return NextResponse.json({ ok: true, persisted });
}
