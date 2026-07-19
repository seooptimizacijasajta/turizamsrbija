import { getListings } from "@/lib/data";
import { getBusinesses } from "@/lib/businesses";
import { getProducts } from "@/lib/products";
import { getPosts } from "@/lib/blog";
import AISearch from "@/app/components/AISearch";
import { Suspense } from "react";
import { pageMeta } from "@/lib/slug";
export const revalidate = 60;
const PATHS = { sr: "/pretraga", en: "/en/search", de: "/de/suche" };
export const metadata = pageMeta("de", PATHS, {
  title: "Suche — Unterkünfte, Reiseziele und Firmen | Turizam Srbija",
  description: "Durchsuchen Sie das ganze Portal an einem Ort: Unterkünfte und Apartments, Reiseziele, Tourismusfirmen, heimische Produkte und Blogbeiträge.",
  noindex: true,
});
export default async function Page() {
  const [items, businesses, products, posts] = await Promise.all([getListings(), getBusinesses(), getProducts(), getPosts()]);
  return <Suspense><AISearch listings={items} businesses={businesses} products={products} posts={posts as any} /></Suspense>;
}
