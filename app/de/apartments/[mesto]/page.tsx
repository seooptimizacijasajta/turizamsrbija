import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApartmentsCityPage from "@/app/components/ApartmentsCityPage";
import { MESTA, mestoBySlug, mestoName, mestoHook, listingsForMesto } from "@/lib/apartmanMesta";
import { getListings } from "@/lib/data";

export const revalidate = 60;
export function generateStaticParams() { return MESTA.map((m) => ({ mesto: m.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ mesto: string }> }): Promise<Metadata> {
  const { mesto } = await params;
  const m = mestoBySlug(mesto);
  if (!m) return { title: "404" };
  const name = mestoName(m, 'de');
  const title = `Apartments in ${name} — Vermietung, Preise und Kontakt`;
  const description = mestoHook(m, 'de');
  return {
    title, description,
    alternates: {
      canonical: `/de/apartments/${m.slug}`,
      languages: { "sr-Latn-RS": `/apartmani/${m.slug}`, en: `/en/apartments/${m.slug}`, de: `/de/apartments/${m.slug}`, "x-default": `/apartmani/${m.slug}` },
    },
    openGraph: { title, description },
  };
}

export default async function Page({ params }: { params: Promise<{ mesto: string }> }) {
  const { mesto } = await params;
  const m = mestoBySlug(mesto);
  if (!m) notFound();
  const all = await getListings();
  return <ApartmentsCityPage mesto={m} items={listingsForMesto(all, m)} />;
}
