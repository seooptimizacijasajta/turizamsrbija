import { NextRequest, NextResponse } from "next/server";
import { getStripe, siteOrigin } from "@/lib/stripe";
import { getServerClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Creates (or reuses) a Stripe Express connected account for the logged-in host
 * and returns a Stripe-hosted onboarding link.
 * Requires the caller's Supabase access token in the Authorization header.
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const sb = getServerClient();
  if (!stripe || !sb) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const jwt = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "").trim();
  const { data: u } = await sb.auth.getUser(jwt);
  const user = u?.user;
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { data: prof } = await sb.from("profiles").select("stripe_account_id").eq("id", user.id).single();
  let acct = (prof?.stripe_account_id as string | null) || null;

  if (!acct) {
    const account = await stripe.accounts.create({
      type: "express",
      email: user.email || undefined,
      business_type: "individual",
      capabilities: { transfers: { requested: true }, card_payments: { requested: true } },
      metadata: { owner_id: user.id },
    });
    acct = account.id;
    await sb.from("profiles").update({ stripe_account_id: acct }).eq("id", user.id);
  }

  const origin = siteOrigin(req);
  const link = await stripe.accountLinks.create({
    account: acct,
    refresh_url: `${origin}/nalog?stripe=refresh`,
    return_url: `${origin}/nalog?stripe=done`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: link.url });
}
