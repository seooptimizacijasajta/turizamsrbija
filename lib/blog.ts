import { getServerClient } from "./supabase";
export type Post = {
  id: string; slug: string; title_sr: string; title_en: string | null;
  excerpt_sr: string | null; excerpt_en: string | null;
  body_sr: string | null; body_en: string | null;
  title_de: string | null; excerpt_de: string | null; body_de: string | null;
  faq_sr: { q: string; a: string }[] | null; faq_en: { q: string; a: string }[] | null; faq_de: { q: string; a: string }[] | null;
  cover_image: string | null; status: string; created_at: string; updated_at: string | null;
  category: string | null;
};
export async function getPosts(): Promise<Post[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("posts").select("*").eq("status", "published").order("created_at", { ascending: false });
  return (data || []) as Post[];
}
export async function getPost(slug: string): Promise<Post | null> {
  const sb = getServerClient(); if (!sb) return null;
  const { data } = await sb.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
  return (data as Post) || null;
}

export async function getPostsByCategory(catId: string): Promise<Post[]> {
  const sb = getServerClient(); if (!sb) return [];
  const { data } = await sb.from("posts").select("*").eq("status", "published").eq("category", catId).order("created_at", { ascending: false });
  return (data || []) as Post[];
}
