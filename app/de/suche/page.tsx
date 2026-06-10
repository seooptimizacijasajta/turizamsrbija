import { getListings } from "@/lib/data";
import SearchView from "@/app/components/SearchView";
import { Suspense } from "react";
export const revalidate = 60;
export const metadata = { title: "Search stays and destinations — Turizam Srbija", description: "Search all destinations and accommodation in Serbia by name, place and municipality." };
export default async function Page() { const items = await getListings(); return <Suspense><SearchView items={items} /></Suspense>; }
