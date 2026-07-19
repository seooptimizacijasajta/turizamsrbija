import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApartmentsCityPage from "@/app/components/ApartmentsCityPage";
import { MESTA, mestoBySlug, mestoName, mestoHook, mestoImg, listingsForMesto } from "@/lib/apartmanMesta";
import { getListings } from "@/lib/data";

export const revalidate = 60;
export function generateStaticParams() { return MESTA.map((m) => ({ mesto: m.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ mesto: string }> }): Promise<Metadata> {
  const { mesto } = await params;
  const m = mestoBySlug(mesto);
  if (!m) return { title: "404" };
  const name = mestoName(m, 'en');
  const title = `Apartments in ${name} — rentals, prices and contact`;
  const description = mestoHook(m, 'en');
  return {
    title, description,
    alternates: {
      canonical: `/en/apartments/${m.slug}`,
      languages: { "sr-Latn-RS": `/apartmani/${m.slug}`, en: `/en/apartments/${m.slug}`, de: `/de/apartments/${m.slug}`, "x-default": `/apartmani/${m.slug}` },
    },
    openGraph: { title, description, images: [mestoImg(m)] },
  };
}

export default async function Page({ params }: { params: Promise<{ mesto: string }> }) {
  const { mesto } = await params;
  const m = mestoBySlug(mesto);
  if (!m) notFound();
  const all = await getListings();
  return <ApartmentsCityPage mesto={m} items={listingsForMesto(all, m)} />;
}
