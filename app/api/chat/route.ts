import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `Ti si "TS asistent", AI vodič portala Turizam Srbija (turizamsrbija.com).
Odgovaraj na jeziku korisnika (srpski ili engleski), ljubazno, kratko i korisno.
Portal nudi: planine, jezera, banje, etno sela, apartmane u Beogradu i smeštaj širom Srbije.
Vlasnici smeštaja se BESPLATNO registruju na /nalog i sami dodaju smeštaj (naslov, opis, do 20 slika, video, mapa, kalendar dostupnosti); proviziju plaćaju tek kada im dovedemo goste.
Gosti šalju upit preko forme na stranici smeštaja; nema obavezne online uplate.
Kontakt: info@turizamsrbija.com, Viber/WhatsApp +381 64 4598778.
Ako ne znaš nešto specifično, predloži slanje upita ili kontakt. Ne izmišljaj cene ni dostupnost.`;

const rateHits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now(); const win = 10 * 60 * 1000; const max = 25;
  const arr = (rateHits.get(ip) || []).filter((t) => now - t < win);
  arr.push(now); rateHits.set(ip, arr);
  return arr.length > max;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") || "0").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ reply: "Previše poruka u kratkom roku. Pokušajte malo kasnije ili nas kontaktirajte. / Too many messages, please try again later." }, { status: 429 });
  let body: any; try { body = await req.json(); } catch { return NextResponse.json({ error: "bad" }, { status: 400 }); }
  const key = process.env.AI_API_KEY;
  if (!key) return NextResponse.json({ reply: "AI asistent još nije aktiviran. Pišite nam na info@turizamsrbija.com ili Viber/WhatsApp +381 64 4598778. · The AI assistant isn't active yet." });
  const base = process.env.AI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
    .map((m: any) => ({ role: m.role === "user" ? "user" : "assistant", content: String(m.content || "").slice(0, 2000) }));
  try {
    const r = await fetch(`${base}/chat/completions`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role: "system", content: SYSTEM }, ...msgs], temperature: 0.4, max_tokens: 400 }),
    });
    const j = await r.json();
    const reply = j?.choices?.[0]?.message?.content || "Izvinite, pokušajte ponovo.";
    return NextResponse.json({ reply });
  } catch { return NextResponse.json({ reply: "Greška u komunikaciji. Pišite na info@turizamsrbija.com." }); }
}
