import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WeatherPlace from "@/app/components/WeatherPlace";
import { WX_PLACES, wxBySlug, wxName, getWeather } from "@/lib/weather";
import { getListings } from "@/lib/data";

export const revalidate = 1800;
export function generateStaticParams() { return WX_PLACES.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = wxBySlug(slug);
  if (!p) return { title: "404" };
  const name = wxName(p, 'de');
  const title = 'Wetter {name} — 7 Tage | Turizam Srbija'.replace("{name}", name);
  const description = 'Wettervorhersage für {name}: aktuelle Temperatur, die nächsten sieben Tage, Niederschlag und Wind sowie Unterkünfte in der Nähe.'.replace("{name}", name);
  return {
    title, description,
    alternates: {
      canonical: `/de/wetter/${slug}`,
      languages: { "sr-Latn-RS": `/vremenska-prognoza/${slug}`, en: `/en/weather/${slug}`, de: `/de/wetter/${slug}`, "x-default": `/vremenska-prognoza/${slug}` },
    },
    openGraph: { title, description, images: [`/api/og?title=${encodeURIComponent(name)}&subtitle=${encodeURIComponent("7 dana")}`] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = wxBySlug(slug);
  if (!p) notFound();
  const [wx, all] = await Promise.all([getWeather(p.lat, p.lng), getListings()]);
  const key = p.sr.toLowerCase();
  const nearby = all
    .filter((d) => d.type === "stay" && ((d.place ?? "").toLowerCase().includes(key) || (d.region.sr ?? "").toLowerCase().includes(key)))
    .slice(0, 4);
  const others = WX_PLACES.filter((x) => x.group === p.group && x.slug !== p.slug).slice(0, 10);
  return <WeatherPlace place={p} wx={wx} nearby={nearby} others={others} />;
}
