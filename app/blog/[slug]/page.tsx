import { getPost } from "@/lib/blog";
import BlogPost from "@/app/components/BlogPost";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await getPost(slug);
  if (!p) return { title: "Blog — Turizam Srbija" };
  return { title: `${p.title_sr} | Turizam Srbija`, description: p.excerpt_sr || p.title_sr, alternates: { canonical: `/blog/${slug}`, languages: { "sr-Latn-RS": `/blog/${slug}`, en: `/en/blog/${slug}`, de: `/de/blog/${slug}`, "x-default": `/blog/${slug}` } } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPost(slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
