import type { Metadata } from "next";
import RecnikTerm from "@/app/components/RecnikTerm";
import { TERMS, termBySlug } from "@/lib/recnik";

export function generateStaticParams() {
  return TERMS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const term = termBySlug(slug);
  if (!term) return { title: "Rečnik turizma — Turizam Srbija" };
  const alt = { "sr-Latn-RS": `/recnik/${slug}`, en: `/en/glossary/${slug}`, de: `/de/glossar/${slug}`, "x-default": `/recnik/${slug}` };
  return {
    title: `${term.sr} — šta znači? | Rečnik turizma`,
    description: term.dsr,
    alternates: { canonical: `/recnik/${slug}`, languages: alt },
    openGraph: { title: term.sr, description: term.dsr, images: [`/api/og?title=${encodeURIComponent(term.sr)}&subtitle=${encodeURIComponent("Rečnik turizma")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <RecnikTerm slug={slug} />;
}
