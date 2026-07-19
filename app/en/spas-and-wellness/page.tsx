import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById("banje")!;
const ALT = { "sr-Latn-RS": "/banje-i-wellness", en: "/en/spas-and-wellness", de: "/de/kurorte-und-wellness", "x-default": "/banje-i-wellness" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'en');
  const lead = tri(CAT.lead, 'en');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/en/spas-and-wellness", languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory("banje");
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
