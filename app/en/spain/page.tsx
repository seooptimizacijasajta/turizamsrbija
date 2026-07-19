import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('spanija')!;
const ALT = { "sr-Latn-RS": "/spanija", en: "/en/spain", de: "/de/spanien", "x-default": "/spanija" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'en');
  const lead = tri(CAT.lead, 'en');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/en/spain".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('spanija');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
