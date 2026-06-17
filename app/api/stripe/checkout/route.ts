import { NextRequest, NextResponse } from "next/server";
import { getStripe, siteOrigin } from "@/lib/stripe";
import { getServerClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates a Stripe Checkout Session for a guest booking.
 * The guest pays the full amount; Stripe routes the host's share to their
 * connected account and keeps the portal commission as an application fee.
 * Body: { listing_id, checkin, checkout, guests? }
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sb = getServerClient();
  if (!stripe || !sb) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "bad_json" }, { status: 400 }); }

  const listing_id = body?.listing_id;
  const checkin = body?.checkin;
  const checkout = body?.checkout;
  if (!listing_id || !checkin || !checkout) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const { data: listing } = await sb
    .from("listings")
    .select("id,name_sr,owner_id,price,deal_price")
    .eq("id", listing_id)
    .single();
  if (!listing) return NextResponse.json({ error: "listing_not_found" }, { status: 404 });

  const { data: prof } = await sb
    .from("profiles")
    .select("stripe_account_id,stripe_charges_enabled")
    .eq("id", listing.owner_id)
    .single();
  if (!prof?.stripe_account_id || !prof?.stripe_charges_enabled) {
    return NextResponse.json({ error: "host_not_connected" }, { status: 409 });
  }

  const ci = new Date(checkin);
  const co = new Date(checkout);
  const nights = Math.max(1, Math.round((co.getTime() - ci.getTime()) / 86400000));
  const unit = Number(listing.deal_price ?? listing.price ?? 0);
  const amountCents = Math.round(unit * nights * 100); // EUR cents
  if (amountCents <= 0) return NextResponse.json({ error: "no_price" }, { status: 422 });

  const { data: s } = await sb.from("settings").select("value").eq("key", "commission_pct").maybeSingle();
  const pct = Number(s?.value) || 10;
  const feeCents = Math.round((amountCents * pct) / 100);

  const origin = siteOrigin(req);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: amountCents,
        product_data: { name: `${listing.name_sr} — ${nights} noćenja (${checkin} → ${checkout})` },
      },
    }],
    payment_intent_data: {
      application_fee_amount: feeCents,
      transfer_data: { destination: prof.stripe_account_id },
    },
    success_url: `${origin}/rezervacija/uspeh?sid={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/nalog?stripe=cancel`,
    metadata: {
      listing_id,
      owner_id: listing.owner_id,
      checkin,
      checkout,
      guests: String(body?.guests || 1),
      commission_pct: String(pct),
      commission_amount: String(feeCents / 100),
      amount: String(amountCents / 100),
    },
  });

  return NextResponse.json({ url: session.url });
}
