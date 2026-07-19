import type { Metadata } from "next";
import TopicsIndex from "@/app/components/TopicsIndex";
import { getPosts } from "@/lib/blog";

export const revalidate = 60;
const ALT = { "sr-Latn-RS": "/teme", en: "/en/topics", de: "/de/themen", "x-default": "/teme" };
export const metadata: Metadata = {
  title: 'Themen & Kategorien — Turizam Srbija',
  description: 'Alle Themen: Griechenland, Montenegro, Kroatien, Bosnien, Slowenien, Spanien, Kirchen & Klöster, Gastronomie, Reisebüros, Transport, Tipps.',
  alternates: { canonical: "/de/themen", languages: ALT },
};

export default async function Page() {
  const posts = await getPosts();
  const counts: Record<string, number> = {};
  posts.forEach((p) => { if (p.category) counts[p.category] = (counts[p.category] || 0) + 1; });
  return <TopicsIndex counts={counts} />;
}
