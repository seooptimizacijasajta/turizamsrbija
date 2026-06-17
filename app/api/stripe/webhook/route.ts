import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServerClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Stripe webhook. Set the endpoint in the Stripe dashboard to
 *   https://turizamsrbija.com/api/stripe/webhook
 * and put the signing secret in STRIPE_WEBHOOK_SECRET.
 * Handles:
 *  - checkout.session.completed → records a paid booking (commission already collected)
 *  - account.updated            → marks the host as able to receive charges
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sb = getServerClient();
  if (!stripe || !sb) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature") || "";
  const whsec = process.env.STRIPE_WEBHOOK_SECRET || "";
  const raw = await req.text();

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, whsec);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const s = event.data.object as any;
      const m = s.metadata || {};
      // Idempotency: skip if we already recorded this session.
      const { data: existing } = await sb.from("bookings").select("id").eq("stripe_session_id", s.id).maybeSingle();
      if (!existing) {
        await sb.from("bookings").insert({
          listing_id: m.listing_id || null,
          checkin: m.checkin || null,
          checkout: m.checkout || null,
          guests: Number(m.guests) || 1,
          amount: Number(m.amount) || (s.amount_total ? s.amount_total / 100 : 0),
          currency: (s.currency || "eur").toUpperCase(),
          commission_pct: m.commission_pct ? Number(m.commission_pct) : null,
          commission_amount: m.commission_amount ? Number(m.commission_amount) : null,
          host_paid: true, // commission auto-collected by Stripe at payment time
          status: "paid",
          stripe_session_id: s.id,
          guest_name: s.customer_details?.name || null,
          email: s.customer_details?.email || null,
          phone: s.customer_details?.phone || null,
        });
      }
    } else if (event.type === "account.updated") {
      const acct = event.data.object as any;
      await sb
        .from("profiles")
        .update({ stripe_charges_enabled: !!acct.charges_enabled })
        .eq("stripe_account_id", acct.id);
    }
  } catch (e: any) {
    console.error("[stripe webhook] handler error:", e?.message);
    return NextResponse.json({ error: "handler_error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
