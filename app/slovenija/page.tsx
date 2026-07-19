import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('slovenija')!;
const ALT = { "sr-Latn-RS": "/slovenija", en: "/en/slovenia", de: "/de/slowenien", "x-default": "/slovenija" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'sr');
  const lead = tri(CAT.lead, 'sr');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/slovenija".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('slovenija');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
