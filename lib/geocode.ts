// Best-effort geocoding via OpenStreetMap Nominatim (free, no key). Server-side only.
export async function geocode(q: string): Promise<{ lat: number; lng: number } | null> {
  if (!q || !q.trim()) return null;
  try {
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), 4000);
    const r = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`, {
      headers: { "User-Agent": "TurizamSrbija/1.0 (turizamsrbija.com)" },
      signal: ctrl.signal,
      next: { revalidate: 604800 }, // cache 7 days
    } as any);
    clearTimeout(to);
    if (!r.ok) return null;
    const j = await r.json();
    if (Array.isArray(j) && j[0]?.lat && j[0]?.lon) return { lat: Number(j[0].lat), lng: Number(j[0].lon) };
    return null;
  } catch { return null; }
}
