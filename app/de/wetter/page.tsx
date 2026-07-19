import type { Metadata } from "next";
import WeatherIndex from "@/app/components/WeatherIndex";
import { WX_PLACES, getWeather } from "@/lib/weather";

const ALT = { "sr-Latn-RS": "/vremenska-prognoza", en: "/en/weather", de: "/de/wetter", "x-default": "/vremenska-prognoza" };
export const revalidate = 1800;

export const metadata: Metadata = {
  title: 'Wetter Serbien — 50+ Reiseziele | Turizam Srbija',
  description: 'Wettervorhersage für Serbiens Berge, Kurorte, Seen, Flüsse und Städte. Aktuelles Wetter und ausführliche 7-Tage-Vorhersage — Kopaonik, Zlatibor, Vrnjačka Banja, Silbersee und mehr.',
  alternates: { canonical: '/de/wetter', languages: ALT },
  openGraph: { title: 'Wettervorhersage für Reiseziele in Serbien', description: '7-Tage-Vorhersage — Berge, Kurorte, Seen und Städte', images: [`/api/og?title=${encodeURIComponent('Wettervorhersage für Reiseziele in Serbien')}&subtitle=${encodeURIComponent('7-Tage-Vorhersage — Berge, Kurorte, Seen und Städte')}`] },
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
