import { getPost } from "@/lib/blog";
import BlogPost from "@/app/components/BlogPost";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await getPost(slug);
  if (!p || !p.title_en) return { title: "Blog — Turizam Srbija" };
  const languages: Record<string, string> = { "sr-Latn-RS": `/blog/${slug}`, en: `/en/blog/${slug}`, "x-default": `/blog/${slug}` };
  if (p.title_de) languages.de = `/de/blog/${slug}`;
  return { title: `${p.title_en} | Turizam Srbija`, description: p.excerpt_en || p.title_en, alternates: { canonical: `/en/blog/${slug}`, languages } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPost(slug);
  if (!post || !post.title_en) notFound();
  return <BlogPost post={post} />;
}
