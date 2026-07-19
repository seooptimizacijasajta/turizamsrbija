import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById('turisticke-agencije')!;
const ALT = { "sr-Latn-RS": "/turisticke-agencije", en: "/en/travel-agencies", de: "/de/reisebueros", "x-default": "/turisticke-agencije" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'de');
  const lead = tri(CAT.lead, 'de');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/de/reisebueros".replace("//", "/"), languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory('turisticke-agencije');
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
