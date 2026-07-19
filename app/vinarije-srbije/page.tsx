import type { Metadata } from "next";
import BlogCategoryPage from "@/app/components/BlogCategoryPage";
import { catById, catName } from "@/lib/blogCategories";
import { tri } from "@/lib/inostranstvo";
import { getPostsByCategory } from "@/lib/blog";

export const revalidate = 60;
const CAT = catById("vinarije")!;
const ALT = { "sr-Latn-RS": "/vinarije-srbije", en: "/en/wineries-of-serbia", de: "/de/weingueter-serbien", "x-default": "/vinarije-srbije" };

export function generateMetadata(): Metadata {
  const name = catName(CAT, 'sr');
  const lead = tri(CAT.lead, 'sr');
  const title = `${name} — Turizam Srbija`;
  return {
    title, description: lead,
    alternates: { canonical: "/vinarije-srbije", languages: ALT },
    openGraph: { title, description: lead, images: [CAT.hero] },
  };
}

export default async function Page() {
  const posts = await getPostsByCategory("vinarije");
  return <BlogCategoryPage cat={CAT} posts={posts} />;
}
