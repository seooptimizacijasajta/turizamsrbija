import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { sendEmail, wrap, ADMIN_EMAIL } from "@/lib/email";
import { looksLikeSpam } from "@/lib/antispam";

/** Server-side handler for visitor submissions: testimonials, feedback, travelogues.
 *  Runs with the service role so RLS never blocks the insert. Everything is stored
 *  as status "pending" and surfaces in the admin for moderation. Visitor links stay nofollow. */
export async function POST(req: NextRequest) {
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  if (looksLikeSpam(b)) return NextResponse.json({ ok: true, persisted: false });

  const kind = String(b.kind || "");
  const lang = b.lang === "en" ? "en" : b.lang === "de" ? "de" : "sr";
  const sb = getServerClient();
  const s = (v: any, n = 300) => (v ? String(v).slice(0, n) : null);

  let table = "", row: Record<string, any> = {}, subj = "", rows: [string, any][] = [];

  if (kind === "testimonial") {
    if (!b.name || !b.body) return NextResponse.json({ error: "name and body required" }, { status: 422 });
    table = "testimonials";
    row = { name: s(b.name, 200), city: s(b.city, 120), rating: Number(b.rating) || 5, body: s(b.body, 2000), lang, status: "pending" };
    subj = "Nov utisak korisnika / New review";
    rows = [["Ime / Name", row.name], ["Grad / City", row.city], ["Ocena / Rating", row.rating], ["Utisak / Review", row.body]];
  } else if (kind === "feedback") {
    if (!b.message) return NextResponse.json({ error: "message required" }, { status: 422 });
    table = "feedback";
    row = { name: s(b.name, 200), email: s(b.email, 200), message: s(b.message, 2000) };
    subj = "Nov predlog / New feedback";
    rows = [["Ime / Name", row.name], ["Email", row.email], ["Poruka / Message", row.message]];
  } else if (kind === "travelogue") {
    if (!b.name || !b.title || !b.message) return NextResponse.json({ error: "name, title, body required" }, { status: 422 });
    table = "travelogues";
    row = { author_name: s(b.name, 200), destination: s(b.destination, 160), title: s(b.title, 240), body: s(b.message, 8000), source_url: s(b.source, 500), lang, status: "pending" };
    subj = "Nov putopis od posetioca / New visitor travelogue";
    rows = [["Autor / Author", row.author_name], ["Destinacija / Destination", row.destination], ["Naslov / Title", row.title], ["Link", row.source_url], ["Tekst / Body", row.body]];
  } else {
    return NextResponse.json({ error: "unknown kind" }, { status: 400 });
  }

  let persisted = false;
  if (sb) {
    const { error } = await sb.from(table).insert(row);
    if (error) console.error(`[submit:${kind}] insert error:`, error.message);
    else persisted = true;
  }

  try { await sendEmail(ADMIN_EMAIL, subj, wrap(subj, rows, "Na čekanju je u Admin panelu — odobrite za objavu."), row.email || undefined); }
  catch (e: any) { console.error(`[submit:${kind}] email error`, e?.message); }

  return NextResponse.json({ ok: true, persisted });
}
