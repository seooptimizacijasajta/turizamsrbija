export type GoogleReview = { author: string; rating: number; text: string; time: number; photo?: string; url?: string };
export type GooglePlace = { rating: number; total: number; url: string; reviews: GoogleReview[] };

export async function getGooglePlace(placeId?: string | null): Promise<GooglePlace | null> {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key || !placeId) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=rating,user_ratings_total,reviews,url&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const j = await res.json();
    if (j.status !== "OK" || !j.result) return null;
    const r = j.result;
    return {
      rating: r.rating || 0,
      total: r.user_ratings_total || 0,
      url: r.url || "",
      reviews: (r.reviews || []).map((x: any) => ({
        author: x.author_name, rating: x.rating, text: x.text, time: x.time,
        photo: x.profile_photo_url, url: x.author_url,
      })),
    };
  } catch { return null; }
}
