import { getListings } from "@/lib/data";
import SearchView from "@/app/components/SearchView";
import { Suspense } from "react";
export const revalidate = 60;
export const metadata = { title: "Pretraga smeštaja i destinacija — Turizam Srbija", description: "Pretražite sve destinacije i smeštaj u Srbiji po imenu, mestu i opštini." };
export default async function Page() { const items = await getListings(); return <Suspense><SearchView items={items} /></Suspense>; }
