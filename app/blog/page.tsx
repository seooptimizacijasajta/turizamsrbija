import { getPosts } from "@/lib/blog";
import BlogList from "@/app/components/BlogList";
import { pageMeta } from "@/lib/slug";

export const revalidate = 60;

const PATHS = { sr: "/blog", en: "/en/blog", de: "/de/blog" };

export const metadata = pageMeta("sr", PATHS, {
  title: "Blog — vodič kroz Srbiju | Turizam Srbija",
  description: "Tekstovi i vodiči o destinacijama Srbije: planine, banje, manastiri, vinski putevi, manifestacije, gastronomija i praktični saveti za putovanje.",
  image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
});

export default async function Page() {
  const posts = await getPosts();
  return <BlogList posts={posts} />;
}
