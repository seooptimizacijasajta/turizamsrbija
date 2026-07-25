import { NextRequest, NextResponse } from "next/server";
import { getServiceClient, getServerClient, hasServiceRole } from "@/lib/supabase";

/** Diagnostic endpoint — reports config booleans (never secret VALUES) and tests
 *  whether public writes actually persist. Gated by ?key=diag2026 so it's not casually public.
 *  GET /api/diag?key=diag2026  (add &write=1 to run a harmless insert/delete test) */
export async function GET(req: NextRequest) {
  if (req.nextUrl.searchParams.get("key") !== "diag2026")
    return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const env = {
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceRoleKey: hasServiceRole(),
    hasResendKey: !!process.env.RESEND_API_KEY,
    notifyEmail: process.env.NOTIFY_EMAIL || "(default banjavrujci@gmail.com)",
  };

  const counts: Record<string, string> = {};
  const sb = getServerClient();
  if (sb) {
    for (const tbl of ["newsletter", "marketing_leads", "inquiries", "testimonials", "feedback", "travelogues"]) {
      const { count, error } = await sb.from(tbl).select("*", { count: "exact", head: true });
      counts[tbl] = error ? `ERR: ${error.message}` : String(count ?? 0);
    }
  }

  const writeTest: Record<string, string> = {};
  if (req.nextUrl.searchParams.get("write") === "1") {
    const svc = getServiceClient();
    const client = svc || sb;
    if (!client) writeTest.status = "no client";
    else {
      const probe = `diag+${Date.now()}@turizamsrbija.com`;
      const ins = await client.from("newsletter").upsert({ email: probe, lang: "sr" }, { onConflict: "email" });
      writeTest.newsletterInsert = ins.error ? `ERR: ${ins.error.message}` : "OK";
      if (!ins.error) await client.from("newsletter").delete().eq("email", probe);
      writeTest.usedServiceRole = svc ? "yes" : "no (anon fallback)";
    }
  }

  return NextResponse.json({ env, counts, writeTest });
}
