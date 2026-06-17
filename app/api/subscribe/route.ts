import { NextRequest, NextResponse } from "next/server";
import { getServerClient } from "@/lib/supabase";
import { sendEmail, wrap, ADMIN_EMAIL } from "@/lib/email";
export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  const email = String(b.email || "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "invalid email" }, { status: 422 });
  const lang = b.lang === "en" ? "en" : b.lang === "de" ? "de" : "sr";
  const sb = getServerClient();
  if (!sb) return NextResponse.json({ ok: true, persisted: false });
  await sb.from("newsletter").upsert({ email, lang }, { onConflict: "email" });
  // Obavesti admina (best-effort, ne blokira odgovor)
  try {
    await sendEmail(
      ADMIN_EMAIL,
      "Nova prijava na newsletter",
      wrap("Nova prijava na newsletter", [
        ["Email", email],
        ["Jezik", lang.toUpperCase()],
        ["Vreme", new Date().toLocaleString("sr-RS")],
      ], "Lista svih pretplatnika je u Admin → Newsletter."),
      email,
    );
  } catch { /* ignore email failures */ }
  return NextResponse.json({ ok: true });
}
