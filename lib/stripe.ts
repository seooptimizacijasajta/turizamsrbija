import Stripe from "stripe";

let _stripe: Stripe | null = null;

/** Returns a server-side Stripe client, or null if STRIPE_SECRET_KEY is not set. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!_stripe) _stripe = new Stripe(key, { apiVersion: "2024-06-20" as Stripe.LatestApiVersion });
  return _stripe;
}

export function siteOrigin(req: { headers: { get(k: string): string | null } }): string {
  return (
    req.headers.get("origin") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://turizamsrbija.com"
  );
}
