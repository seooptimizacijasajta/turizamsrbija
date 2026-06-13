import { getPost } from "@/lib/blog";
import BlogPost from "@/app/components/BlogPost";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = await getPost(slug);
  if (!p) return { title: "Blog — Turizam Srbija" };
  const languages: Record<string, string> = { "sr-Latn-RS": `/blog/${slug}`, "x-default": `/blog/${slug}` };
  if (p.title_en) languages.en = `/en/blog/${slug}`;
  if (p.title_de) languages.de = `/de/blog/${slug}`;
  return { title: `${p.title_sr} | Turizam Srbija`, description: p.excerpt_sr || p.title_sr, openGraph: { images: [p.cover_image || `/api/og?title=${encodeURIComponent(p.title_sr)}`] }, alternates: { canonical: `/blog/${slug}`, languages } };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const post = await getPost(slug);
  if (!post) notFound();
  return <BlogPost post={post} />;
}
