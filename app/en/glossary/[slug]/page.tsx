import type { Metadata } from "next";
import RecnikTerm from "@/app/components/RecnikTerm";
import { TERMS, termBySlug } from "@/lib/recnik";

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = termBySlug(slug);
  if (!term) return { title: "Tourism glossary — Turizam Srbija" };
  const alt = { "sr-Latn-RS": `/recnik/${slug}`, en: `/en/glossary/${slug}`, de: `/de/glossar/${slug}`, "x-default": `/recnik/${slug}` };
  return {
    title: `${term.en} — what does it mean? | Tourism glossary`,
    description: term.den,
    alternates: { canonical: `/en/glossary/${slug}`, languages: alt },
    openGraph: { title: term.en, description: term.den, images: [`/api/og?title=${encodeURIComponent(term.en)}&subtitle=${encodeURIComponent("Tourism glossary")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RecnikTerm slug={slug} />;
}
