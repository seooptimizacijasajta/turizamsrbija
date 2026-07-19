import { getPosts } from "@/lib/blog";
import BlogList from "@/app/components/BlogList";
import { pageMeta } from "@/lib/slug";

export const revalidate = 60;

const PATHS = { sr: "/blog", en: "/en/blog", de: "/de/blog" };

export const metadata = pageMeta("en", PATHS, {
  title: "Blog — a guide to Serbia | Turizam Srbija",
  description: "Guides and articles on Serbia's destinations: mountains, spas, monasteries, wine roads, festivals, food and practical travel advice.",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
});

export default async function Page() {
  const posts = await getPosts();
  return <BlogList posts={posts} />;
}
