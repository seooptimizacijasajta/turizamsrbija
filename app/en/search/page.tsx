import { getListings } from "@/lib/data";
import { getBusinesses } from "@/lib/businesses";
import { getProducts } from "@/lib/products";
import { getPosts } from "@/lib/blog";
import AISearch from "@/app/components/AISearch";
import { Suspense } from "react";
export const revalidate = 60;
export const metadata = { title: "Search (AI) — Turizam Srbija", description: "Search the whole portal: stays, destinations, businesses, local products and guides." };
export default async function Page() {
  const [items, businesses, products, posts] = await Promise.all([getListings(), getBusinesses(), getProducts(), getPosts()]);
  return <Suspense><AISearch listings={items} businesses={businesses} products={products} posts={posts as any} /></Suspense>;
}
