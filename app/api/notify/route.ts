import { NextRequest, NextResponse } from "next/server";
import { sendEmail, wrap, ADMIN_EMAIL } from "@/lib/email";

export async function POST(req: NextRequest) {
  let b: any; try { b = await req.json(); } catch { return NextResponse.json({ error: "bad json" }, { status: 400 }); }
  const kind = String(b?.kind || "");
  const titles: Record<string, string> = {
    lead: "Novi marketing upit / New advertising lead",
    listing: "Nov oglas smeštaja / New accommodation listing",
    business: "Nova firma u direktorijumu / New business",
    product: "Nov proizvod (Pijaca) / New product",
  };
  if (!titles[kind]) return NextResponse.json({ error: "unknown kind" }, { status: 400 });
  const rows: [string, any][] = [
    ["Naziv / Name", b.name], ["Tip / Type", b.business_type || b.category], ["Paket / Package", b.package],
    ["Email", b.email], ["Telefon / Phone", b.phone], ["Grad / City", b.city], ["Poruka / Message", b.message],
  ];
  await sendEmail(ADMIN_EMAIL, titles[kind], wrap(titles[kind], rows, "Otvorite /admin za detalje."), b.email || undefined);
  return NextResponse.json({ ok: true });
}
