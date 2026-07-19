import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('crkve-i-manastiri')!;
const ALT = { "sr-Latn-RS": "/crkve-i-manastiri", en: "/en/churches-and-monasteries", de: "/de/kirchen-und-kloester", "x-default": "/crkve-i-manastiri" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'sr');
  const lead = tri(CAT.lead, 'sr');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/crkve-i-manastiri".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('crkve-i-manastiri');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
