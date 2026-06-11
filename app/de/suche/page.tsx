import { getListings } from "@/lib/data";
import { getBusinesses } from "@/lib/businesses";
import { getProducts } from "@/lib/products";
import { getPosts } from "@/lib/blog";
import AISearch from "@/app/components/AISearch";
import { Suspense } from "react";
export const revalidate = 60;
export const metadata = { title: "Suche (KI) — Turizam Srbija", description: "Durchsuchen Sie das ganze Portal: Unterkünfte, Reiseziele, Firmen, Produkte und Reiseführer." };
export default async function Page() {
  const [items, businesses, products, posts] = await Promise.all([getListings(), getBusinesses(), getProducts(), getPosts()]);
  return <Suspense><AISearch listings={items} businesses={businesses} products={products} posts={posts as any} /></Suspense>;
}
