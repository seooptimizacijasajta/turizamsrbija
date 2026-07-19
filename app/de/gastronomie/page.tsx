import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('gastronomija')!;
const ALT = { "sr-Latn-RS": "/gastronomija", en: "/en/food-and-drink", de: "/de/gastronomie", "x-default": "/gastronomija" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'de');
  const lead = tri(CAT.lead, 'de');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/de/gastronomie".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('gastronomija');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
