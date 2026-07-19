import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('crna-gora')!;
const ALT = { "sr-Latn-RS": "/crna-gora", en: "/en/montenegro", de: "/de/montenegro", "x-default": "/crna-gora" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'en');
  const lead = tri(CAT.lead, 'en');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/en/montenegro".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('crna-gora');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
