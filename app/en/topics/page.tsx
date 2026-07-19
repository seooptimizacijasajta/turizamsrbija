import type { Metadata } from "next";
import TopicsIndex from "@/app/components/TopicsIndex";
import { getPosts } from "@/lib/blog";

export const revalidate = 60;
const ALT = { "sr-Latn-RS": "/teme", en: "/en/topics", de: "/de/themen", "x-default": "/teme" };
export const metadata: Metadata = {
  title: 'Topics & categories — Turizam Srbija',
  description: 'All topics: Greece, Montenegro, Croatia, Bosnia, Slovenia, Spain, churches & monasteries, food, travel agencies, transport, tips and travelogues.',
  alternates: { canonical: "/en/topics", languages: ALT },
};

export default async function Page() {
  const posts = await getPosts();
  const counts: Record<string, number> = {};
  posts.forEach((p) => { if (p.category) counts[p.category] = (counts[p.category] || 0) + 1; });
  return <TopicsIndex counts={counts} />;
}
