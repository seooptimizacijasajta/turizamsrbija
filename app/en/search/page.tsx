import { getListings } from "@/lib/data";
import { getBusinesses } from "@/lib/businesses";
import { getProducts } from "@/lib/products";
import { getPosts } from "@/lib/blog";
import AISearch from "@/app/components/AISearch";
import { Suspense } from "react";
import { pageMeta } from "@/lib/slug";
export const revalidate = 60;
const PATHS = { sr: "/pretraga", en: "/en/search", de: "/de/suche" };
export const metadata = pageMeta("en", PATHS, {
  title: "Search — stays, destinations and businesses | Turizam Srbija",
  description: "Search the whole portal in one place: accommodation and apartments, destinations, tourism businesses, local products and blog articles.",
  noindex: true,
});
export default async function Page() {
  const [items, businesses, products, posts] = await Promise.all([getListings(), getBusinesses(), getProducts(), getPosts()]);
  return <Suspense><AISearch listings={items} businesses={businesses} products={products} posts={posts as any} /></Suspense>;
}
