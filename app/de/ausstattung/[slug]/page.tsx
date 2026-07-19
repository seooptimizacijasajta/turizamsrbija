import { getListings } from "@/lib/data";
import AmenityPage from "@/app/components/AmenityPage";
import { amenityBySlug, amenityByKey, amenityPath, AMENITY_DE } from "@/lib/amenities";
import { notFound } from "next/navigation";
export const revalidate = 60;
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); const a = key ? amenityByKey(key) : null;
  if (!a) return { title: "Unterkünfte — Turizam Srbija" };
  const label = AMENITY_DE[key!] || a.en;
  const sr = amenityPath(key!, "sr"), en = amenityPath(key!, "en"), de = amenityPath(key!, "de");
  const title = `${label} — Unterkünfte in Serbien`;
  const description = `Unterkünfte in Serbien mit ${label.toLowerCase()}: Apartments, Ferienhäuser, Blockhütten, Villen und Hotels — Anfrage direkt an den Gastgeber, ohne Provision.`;
  return {
    title, description,
    alternates: { canonical: de, languages: { "sr-Latn-RS": sr, en, de, "x-default": sr } },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(label)}&subtitle=${encodeURIComponent("Unterkünfte in Serbien")}`] },
  };
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const key = amenityBySlug(slug); if (!key) notFound();
  const all = await getListings();
  const items = all.filter((d) => (d.amenities || []).includes(key));
  return <AmenityPage items={items} amenityKey={key} />;
}
