import { getListings } from "@/lib/data";
import AmenityPage from "@/app/components/AmenityPage";
import { amenityBySlug, amenityByKey, amenityPath } from "@/lib/amenities";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); const a = key ? amenityByKey(key) : null;
  if (!a) return { title: "Smeštaj — Turizam Srbija" };
  const sr = amenityPath(key!, "sr"), en = amenityPath(key!, "en"), de = amenityPath(key!, "de");
  const title = `${a.sr} — smeštaj u Srbiji`;
  const description = `Smeštaj u Srbiji: ${a.sr.toLowerCase()}. Apartmani, vikendice, brvnare, vile i hoteli sa ovom pogodnošću — upit šaljete direktno vlasniku, bez provizije.`;
  return {
    title, description,
    alternates: { canonical: sr, languages: { "sr-Latn-RS": sr, en, de, "x-default": sr } },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(a.sr)}&subtitle=${encodeURIComponent("Smeštaj u Srbiji")}`] },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); if (!key) notFound();
  const all = await getListings();
  const items = all.filter((d) => (d.amenities || []).includes(key));
  return <AmenityPage items={items} amenityKey={key} />;
}
