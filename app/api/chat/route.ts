import { NextRequest, NextResponse } from "next/server";

const SYSTEM = `Ti si "TS asistent", ljubazni AI concierge portala Turizam Srbija (turizamsrbija.com).
JEZIK: odgovaraj UVEK na jeziku korisnika — srpski, engleski ili nemački. Kratko (2-4 rečenice), toplo i konkretno. Ne izmišljaj cene, dostupnost ni objekte kojih nema.

ŠTA PORTAL NUDI (i gde to korisnik nalazi):
- Destinacije i smeštaj: planine (/planine), jezera (/jezera), banje (/banje), etno sela (/etno-sela), sav smeštaj (/smestaj). Apartmani u Beogradu: /apartmani-beograd (po naseljima: Vračar, Novi Beograd, Zemun… i po strukturi: studio, jednosobni, dvosobni…).
- Firme (direktorijum): /firme — turističke agencije, rent-a-car, vodiči i ture, transferi/aerodrom, restorani, suveniri, putno osiguranje, iznajmljivanje opreme. Filtrira se po gradu.
- Pijaca (domaći proizvodi): /pijaca — med, sir, rakija, vino, zimnica, rukotvorine, direktno od proizvođača.
- Vaučeri: /vauceri — kako iskoristiti državne turističke vaučere; smeštaj koji prima vaučere se filtrira.
- Blog vodiči: /blog — detaljni vodiči o destinacijama i gradovima.
- Korisno za Beograd: aerodrom, gradski prevoz, važni telefoni (/info-beograd).

KAKO FUNKCIONIŠE:
- Za GOSTE je portal besplatan; rezervacija ide preko forme za upit na stranici smeštaja, domaćin odgovara obično u 24h. Nema obavezne online uplate.
- VLASNICI se besplatno registruju na /nalog (ili /vodic-za-vlasnike) i sami dodaju smeštaj (naslov, opis min 500 reči, do 20 slika, video, mapa, kalendar + iCal sync sa Booking/Airbnb). Proviziju plaćaju tek kad im dovedemo goste.
- Firme i proizvođači se takođe upisuju preko /nalog.
- Oglašavanje (baneri, izdvajanje, PR): /oglasavanje.
- Plaćanje karticom je zaštićeno 3-D Secure; podaci kartice se ne čuvaju.

PONAŠANJE: Predloži tačnu stranu/sekciju kad je relevantno. Ako ne znaš nešto specifično (tačna cena, slobodni termin), uputi na slanje upita ili kontakt: info@turizamsrbija.com, Viber/WhatsApp +381 64 4598778. Budi koristan i podstakni korisnika da istraži ili pošalje upit.`;

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
  const base = (process.env.AI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, "");
  const model = process.env.AI_MODEL || "gpt-4o-mini";
  const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-12)
    .map((m: any) => ({ role: m.role === "user" ? "user" : "assistant", content: String(m.content || "").slice(0, 2000) }));
  try {
    const r = await fetch(`${base}/chat/completions`, {
      method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role: "system", content: SYSTEM }, ...msgs], temperature: 0.4, max_tokens: 400 }),
    });
    const j = await r.json().catch(() => ({}));
    const reply = j?.choices?.[0]?.message?.content;
    if (reply) return NextResponse.json({ reply });
    const errMsg = j?.error?.message || j?.message || `HTTP ${r.status} ${r.statusText}`;
    console.error("[chat] provider error:", r.status, JSON.stringify(j).slice(0, 500));
    return NextResponse.json({ reply: "⚠️ " + errMsg });
  } catch { return NextResponse.json({ reply: "Greška u komunikaciji. Pišite na info@turizamsrbija.com." }); }
}
