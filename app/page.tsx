import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import HomeClient from "@/app/components/HomeClient";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("sr");
export default async function Home() {
  const [all, posts] = await Promise.all([getListings(), getPosts()]);
  return <HomeClient all={all} posts={posts.slice(0, 3)} />;
}
