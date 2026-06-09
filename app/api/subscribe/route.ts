import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  const email = String(b.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "invalid email" }, { status: 422 });
  const sb = getServerClient();
  if (!sb) return NextResponse.json({ ok: true, persisted: false });
  await sb.from("newsletter").upsert({ email, lang: b.lang === "en" ? "en" : "sr" }, { onConflict: "email" });
  return NextResponse.json({ ok: true });
}
