import type { Metadata } from "next";
import WeatherIndex from "@/app/components/WeatherIndex";
import { WX_PLACES, getWeather } from "@/lib/weather";

const ALT = { "sr-Latn-RS": "/vremenska-prognoza", en: "/en/weather", de: "/de/wetter", "x-default": "/vremenska-prognoza" };
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Vremenska prognoza Srbija — 55 destinacija, 7 dana',
  description: 'Prognoza za planine, banje, jezera i gradove Srbije: Kopaonik, Zlatibor, Vrnjačka Banja, Sokobanja, Srebrno jezero — trenutno vreme i 7 dana unapred.',
  alternates: { canonical: '/vremenska-prognoza', languages: ALT },
  openGraph: { title: 'Vremenska prognoza za destinacije u Srbiji', description: 'Prognoza za 7 dana — planine, banje, jezera i gradovi', images: [`/api/og?title=${encodeURIComponent('Vremenska prognoza za destinacije u Srbiji')}&subtitle=${encodeURIComponent('Prognoza za 7 dana — planine, banje, jezera i gradovi')}`] },
};

export default async function Page() {
  const results = await Promise.all(
    WX_PLACES.map(async (p) => {
      const w = await getWeather(p.lat, p.lng);
      return {
        slug: p.slug,
        temp: w?.now?.temp ?? null,
        code: w?.now?.code ?? (w?.days[0]?.code ?? null),
        tmax: w?.days[0]?.tmax ?? null,
        tmin: w?.days[0]?.tmin ?? null,
      };
    })
  );
  return <WeatherIndex rows={results} />;
}
