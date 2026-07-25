import { createClient, SupabaseClient } from "@supabase/supabase-js";

/** Server-side client. Uses service role if present (for writes), else anon.
 *  When it falls back to anon, RLS will block most public inserts — so we warn. */
export function getServerClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = service || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!service) console.warn("[supabase] SUPABASE_SERVICE_ROLE_KEY missing — using anon key; RLS will block public writes.");
  return createClient(url, key, { auth: { persistSession: false } });
}

/** Service-role-only client. Returns null if the service role key is not set.
 *  Use for public writes (newsletter, leads, testimonials…) so RLS never blocks them. */
export function getServiceClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !service) return null;
  return createClient(url, service, { auth: { persistSession: false } });
}

/** True when a real service-role key is configured (used by diagnostics). */
export function hasServiceRole(): boolean {
  return !!process.env.SUPABASE_SERVICE_ROLE_KEY;
}
