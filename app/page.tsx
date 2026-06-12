import { getListings } from "@/lib/data";
import { getPosts } from "@/lib/blog";
import { upcomingEvents } from "@/lib/eventsData";
import HomeClient from "@/app/components/HomeClient";
import { altMeta } from "@/lib/slug";
export const revalidate = 60;
export const generateMetadata = () => altMeta("sr");
export default async function Home() {
  const [all, posts, events] = await Promise.all([getListings(), getPosts(), upcomingEvents(4)]);
  return <HomeClient all={all} posts={posts.slice(0, 3)} events={events} />;
}
