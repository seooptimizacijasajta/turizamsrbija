import type { Metadata } from "next";
import WeatherIndex from "@/app/components/WeatherIndex";
import { WX_PLACES, getWeather } from "@/lib/weather";

const ALT = { "sr-Latn-RS": "/vremenska-prognoza", en: "/en/weather", de: "/de/wetter", "x-default": "/vremenska-prognoza" };
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Serbia weather — 55 destinations, 7-day forecast',
  description: "Forecast for Serbia's mountains, spa towns, lakes and cities: Kopaonik, Zlatibor, Vrnjačka Banja, Sokobanja, Silver Lake — current weather and 7 days ahead.",
  alternates: { canonical: '/en/weather', languages: ALT },
  openGraph: { title: 'Weather forecast for destinations in Serbia', description: '7-day forecast — mountains, spas, lakes and cities', images: [`/api/og?title=${encodeURIComponent('Weather forecast for destinations in Serbia')}&subtitle=${encodeURIComponent('7-day forecast — mountains, spas, lakes and cities')}`] },
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
