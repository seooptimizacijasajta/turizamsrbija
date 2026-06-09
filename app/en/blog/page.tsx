import { getPosts } from "@/lib/blog";
import BlogList from "@/app/components/BlogList";
export const revalidate = 60;
export const metadata = { title: "Blog — Turizam Srbija", description: "Articles about Serbia's destinations, cities and places." };
export default async function Page() { const posts = await getPosts(); return <BlogList posts={posts} />; }
