import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getServerClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the logged-in host's Stripe Connect status and syncs
 * profiles.stripe_charges_enabled. Called by the dashboard after the host
 * returns from Stripe onboarding (so the green "active" badge updates without
 * needing a connected-account webhook).
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
  const acct = (prof?.stripe_account_id as string | null) || null;
  if (!acct) return NextResponse.json({ connected: false, charges_enabled: false });

  let chargesEnabled = false;
  try {
    const account = await stripe.accounts.retrieve(acct);
    chargesEnabled = !!account.charges_enabled;
  } catch {
    return NextResponse.json({ connected: true, charges_enabled: false });
  }

  await sb.from("profiles").update({ stripe_charges_enabled: chargesEnabled }).eq("id", user.id);
  return NextResponse.json({ connected: true, charges_enabled: chargesEnabled });
}
