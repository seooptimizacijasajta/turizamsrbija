import { getPost } from "@/lib/blog";
import BlogPost from "@/app/components/BlogPost";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await getPost(slug);
  if (!p || !p.title_de) return { title: "Blog — Turizam Srbija" };
  const languages: Record<string, string> = { "sr-Latn-RS": `/blog/${slug}`, de: `/de/blog/${slug}`, "x-default": `/blog/${slug}` };
  if (p.title_en) languages.en = `/en/blog/${slug}`;
  return { title: `${p.title_de} | Turizam Srbija`, description: p.excerpt_de || p.title_de, alternates: { canonical: `/de/blog/${slug}`, languages } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPost(slug);
  if (!post || !post.title_de) notFound();
  return <BlogPost post={post} />;
}
