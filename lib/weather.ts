import type { Lang } from "./types";

export type WxPlace = {
  slug: string;
  sr: string;
  en: string;
  de: string;
  lat: number;
  lng: number;
  group: "planina" | "banja" | "jezero" | "reka" | "grad";
};

/** ~50 glavnih turističkih destinacija Srbije sa koordinatama. */
export const WX_PLACES: WxPlace[] = [
  // Planine
  { slug: "kopaonik", sr: "Kopaonik", en: "Kopaonik", de: "Kopaonik", lat: 43.2853, lng: 20.8125, group: "planina" },
  { slug: "zlatibor", sr: "Zlatibor", en: "Zlatibor", de: "Zlatibor", lat: 43.7289, lng: 19.7017, group: "planina" },
  { slug: "tara", sr: "Tara", en: "Tara", de: "Tara", lat: 43.8853, lng: 19.4064, group: "planina" },
  { slug: "stara-planina", sr: "Stara planina", en: "Stara Planina", de: "Stara Planina", lat: 43.3833, lng: 22.6167, group: "planina" },
  { slug: "divcibare", sr: "Divčibare", en: "Divčibare", de: "Divčibare", lat: 44.1053, lng: 19.9878, group: "planina" },
  { slug: "goc", sr: "Goč", en: "Goč", de: "Goč", lat: 43.5500, lng: 20.8167, group: "planina" },
  { slug: "zlatar", sr: "Zlatar", en: "Zlatar", de: "Zlatar", lat: 43.4000, lng: 19.7833, group: "planina" },
  { slug: "rtanj", sr: "Rtanj", en: "Rtanj", de: "Rtanj", lat: 43.7758, lng: 21.8919, group: "planina" },
  { slug: "fruska-gora", sr: "Fruška gora", en: "Fruška Gora", de: "Fruška Gora", lat: 45.1583, lng: 19.7000, group: "planina" },
  { slug: "golija", sr: "Golija", en: "Golija", de: "Golija", lat: 43.3500, lng: 20.3000, group: "planina" },
  { slug: "mokra-gora", sr: "Mokra Gora", en: "Mokra Gora", de: "Mokra Gora", lat: 43.7997, lng: 19.4964, group: "planina" },
  { slug: "avala", sr: "Avala", en: "Avala", de: "Avala", lat: 44.6897, lng: 20.5147, group: "planina" },
  { slug: "kucaj", sr: "Kučajske planine", en: "Kučaj mountains", de: "Kučaj-Gebirge", lat: 43.9500, lng: 21.7500, group: "planina" },
  { slug: "besna-kobila", sr: "Besna Kobila", en: "Besna Kobila", de: "Besna Kobila", lat: 42.5333, lng: 22.2500, group: "planina" },

  // Banje
  { slug: "vrnjacka-banja", sr: "Vrnjačka Banja", en: "Vrnjačka Banja", de: "Vrnjačka Banja", lat: 43.6222, lng: 20.8956, group: "banja" },
  { slug: "sokobanja", sr: "Sokobanja", en: "Sokobanja", de: "Sokobanja", lat: 43.6431, lng: 21.8703, group: "banja" },
  { slug: "banja-vrujci", sr: "Banja Vrujci", en: "Banja Vrujci", de: "Banja Vrujci", lat: 44.2564, lng: 20.1006, group: "banja" },
  { slug: "banja-koviljaca", sr: "Banja Koviljača", en: "Banja Koviljača", de: "Banja Koviljača", lat: 44.5083, lng: 19.2167, group: "banja" },
  { slug: "niska-banja", sr: "Niška Banja", en: "Niška Banja", de: "Niška Banja", lat: 43.2939, lng: 22.0011, group: "banja" },
  { slug: "prolom-banja", sr: "Prolom Banja", en: "Prolom Banja", de: "Prolom Banja", lat: 43.0206, lng: 21.3183, group: "banja" },
  { slug: "lukovska-banja", sr: "Lukovska Banja", en: "Lukovska Banja", de: "Lukovska Banja", lat: 43.1794, lng: 21.0331, group: "banja" },
  { slug: "ribarska-banja", sr: "Ribarska Banja", en: "Ribarska Banja", de: "Ribarska Banja", lat: 43.4547, lng: 21.3372, group: "banja" },
  { slug: "banja-junakovic", sr: "Banja Junaković", en: "Banja Junaković", de: "Banja Junaković", lat: 45.7500, lng: 19.1000, group: "banja" },
  { slug: "gornja-trepca", sr: "Atomska banja Gornja Trepča", en: "Gornja Trepča spa", de: "Heilbad Gornja Trepča", lat: 43.9994, lng: 20.4194, group: "banja" },
  { slug: "mataruska-banja", sr: "Mataruška Banja", en: "Mataruška Banja", de: "Mataruška Banja", lat: 43.6667, lng: 20.6167, group: "banja" },
  { slug: "bukovicka-banja", sr: "Bukovička Banja (Aranđelovac)", en: "Bukovička Banja", de: "Bukovička Banja", lat: 44.3072, lng: 20.5606, group: "banja" },
  { slug: "banja-kanjiza", sr: "Banja Kanjiža", en: "Kanjiža spa", de: "Heilbad Kanjiža", lat: 46.0656, lng: 20.0500, group: "banja" },

  // Jezera
  { slug: "srebrno-jezero", sr: "Srebrno jezero", en: "Silver Lake", de: "Silbersee", lat: 44.6606, lng: 21.4139, group: "jezero" },
  { slug: "palicko-jezero", sr: "Palićko jezero", en: "Lake Palić", de: "Palić-See", lat: 46.1006, lng: 19.7639, group: "jezero" },
  { slug: "perucac", sr: "Perućačko jezero", en: "Lake Perućac", de: "Perućac-See", lat: 43.9569, lng: 19.4142, group: "jezero" },
  { slug: "vlasinsko-jezero", sr: "Vlasinsko jezero", en: "Vlasina Lake", de: "Vlasina-See", lat: 42.7181, lng: 22.3339, group: "jezero" },
  { slug: "zlatarsko-jezero", sr: "Zlatarsko jezero", en: "Zlatar Lake", de: "Zlatar-See", lat: 43.4181, lng: 19.7639, group: "jezero" },
  { slug: "gazivode", sr: "Gazivode (Ujmansko jezero)", en: "Gazivode Lake", de: "Gazivode-See", lat: 42.9333, lng: 20.6000, group: "jezero" },
  { slug: "borsko-jezero", sr: "Borsko jezero", en: "Bor Lake", de: "Bor-See", lat: 44.0417, lng: 22.0333, group: "jezero" },
  { slug: "zaovine", sr: "Zaovinsko jezero", en: "Zaovine Lake", de: "Zaovine-See", lat: 43.8833, lng: 19.4500, group: "jezero" },
  { slug: "gruzansko-jezero", sr: "Gružansko jezero", en: "Gruža Lake", de: "Gruža-See", lat: 43.9333, lng: 20.7333, group: "jezero" },
  { slug: "celije", sr: "Ćelije", en: "Ćelije Lake", de: "Ćelije-See", lat: 43.4667, lng: 21.1667, group: "jezero" },

  // Reke i klisure
  { slug: "drina-bajina-basta", sr: "Drina (Bajina Bašta)", en: "Drina (Bajina Bašta)", de: "Drina (Bajina Bašta)", lat: 43.9714, lng: 19.5675, group: "reka" },
  { slug: "uvac", sr: "Uvac", en: "Uvac", de: "Uvac", lat: 43.3906, lng: 19.9522, group: "reka" },
  { slug: "djerdap", sr: "Đerdap (Donji Milanovac)", en: "Iron Gates (Donji Milanovac)", de: "Eisernes Tor", lat: 44.4667, lng: 22.1500, group: "reka" },
  { slug: "golubac", sr: "Golubac", en: "Golubac", de: "Golubac", lat: 44.6553, lng: 21.6386, group: "reka" },

  // Gradovi
  { slug: "beograd", sr: "Beograd", en: "Belgrade", de: "Belgrad", lat: 44.7866, lng: 20.4489, group: "grad" },
  { slug: "novi-sad", sr: "Novi Sad", en: "Novi Sad", de: "Novi Sad", lat: 45.2671, lng: 19.8335, group: "grad" },
  { slug: "nis", sr: "Niš", en: "Niš", de: "Niš", lat: 43.3209, lng: 21.8958, group: "grad" },
  { slug: "kragujevac", sr: "Kragujevac", en: "Kragujevac", de: "Kragujevac", lat: 44.0128, lng: 20.9114, group: "grad" },
  { slug: "subotica", sr: "Subotica", en: "Subotica", de: "Subotica", lat: 46.1000, lng: 19.6650, group: "grad" },
  { slug: "kraljevo", sr: "Kraljevo", en: "Kraljevo", de: "Kraljevo", lat: 43.7256, lng: 20.6894, group: "grad" },
  { slug: "uzice", sr: "Užice", en: "Užice", de: "Užice", lat: 43.8583, lng: 19.8486, group: "grad" },
  { slug: "valjevo", sr: "Valjevo", en: "Valjevo", de: "Valjevo", lat: 44.2708, lng: 19.8897, group: "grad" },
  { slug: "cacak", sr: "Čačak", en: "Čačak", de: "Čačak", lat: 43.8914, lng: 20.3497, group: "grad" },
  { slug: "zrenjanin", sr: "Zrenjanin", en: "Zrenjanin", de: "Zrenjanin", lat: 45.3836, lng: 20.3819, group: "grad" },
  { slug: "sremski-karlovci", sr: "Sremski Karlovci", en: "Sremski Karlovci", de: "Sremski Karlovci", lat: 45.2019, lng: 19.9333, group: "grad" },
  { slug: "novi-pazar", sr: "Novi Pazar", en: "Novi Pazar", de: "Novi Pazar", lat: 43.1367, lng: 20.5122, group: "grad" },
  { slug: "vrsac", sr: "Vršac", en: "Vršac", de: "Vršac", lat: 45.1167, lng: 21.3033, group: "grad" },
  { slug: "sokobanja-grad", sr: "Knjaževac", en: "Knjaževac", de: "Knjaževac", lat: 43.5675, lng: 22.2569, group: "grad" },
];

export const wxBySlug = (slug: string) => WX_PLACES.find((p) => p.slug === slug);
export const wxName = (p: WxPlace, l: Lang) => (l === "sr" ? p.sr : l === "de" ? p.de : p.en);

export const weatherPath = (l: Lang) =>
  l === "sr" ? "/vremenska-prognoza" : l === "de" ? "/de/wetter" : "/en/weather";
export const weatherPlacePath = (l: Lang, slug: string) => `${weatherPath(l)}/${slug}`;

export type Day = {
  date: string;
  tmax: number;
  tmin: number;
  code: number;
  precip: number;
  wind: number;
};
export type Wx = {
  now: { temp: number; code: number; wind: number } | null;
  days: Day[];
};

/** Open-Meteo — bez API ključa, besplatno za nekomercijalnu i komercijalnu upotrebu uz atribuciju. */
export async function getWeather(lat: number, lng: number): Promise<Wx | null> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}` +
    `&current=temperature_2m,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max` +
    `&timezone=Europe%2FBelgrade&forecast_days=7`;
  try {
    const r = await fetch(url, { next: { revalidate: 1800 } });
    if (!r.ok) return null;
    const j = await r.json();
    const d = j.daily;
    if (!d?.time) return null;
    return {
      now: j.current
        ? { temp: Math.round(j.current.temperature_2m), code: j.current.weather_code, wind: Math.round(j.current.wind_speed_10m) }
        : null,
      days: d.time.map((t: string, i: number) => ({
        date: t,
        tmax: Math.round(d.temperature_2m_max[i]),
        tmin: Math.round(d.temperature_2m_min[i]),
        code: d.weather_code[i],
        precip: Math.round((d.precipitation_sum[i] ?? 0) * 10) / 10,
        wind: Math.round(d.wind_speed_10m_max[i] ?? 0),
      })),
    };
  } catch {
    return null;
  }
}

/** WMO weather code → emoji + opis na 3 jezika */
export function wmo(code: number): { icon: string; sr: string; en: string; de: string } {
  const m: Record<number, [string, string, string, string]> = {
    0: ["☀️", "Vedro", "Clear sky", "Klar"],
    1: ["🌤️", "Pretežno vedro", "Mainly clear", "Überwiegend klar"],
    2: ["⛅", "Delimično oblačno", "Partly cloudy", "Teils bewölkt"],
    3: ["☁️", "Oblačno", "Overcast", "Bedeckt"],
    45: ["🌫️", "Magla", "Fog", "Nebel"],
    48: ["🌫️", "Ledena magla", "Rime fog", "Reifnebel"],
    51: ["🌦️", "Slaba rosulja", "Light drizzle", "Leichter Nieselregen"],
    53: ["🌦️", "Rosulja", "Drizzle", "Nieselregen"],
    55: ["🌧️", "Jaka rosulja", "Dense drizzle", "Dichter Nieselregen"],
    61: ["🌦️", "Slaba kiša", "Light rain", "Leichter Regen"],
    63: ["🌧️", "Kiša", "Rain", "Regen"],
    65: ["🌧️", "Jaka kiša", "Heavy rain", "Starker Regen"],
    66: ["🌧️", "Ledena kiša", "Freezing rain", "Gefrierender Regen"],
    67: ["🌧️", "Jaka ledena kiša", "Heavy freezing rain", "Starker gefrierender Regen"],
    71: ["🌨️", "Slab sneg", "Light snow", "Leichter Schneefall"],
    73: ["❄️", "Sneg", "Snow", "Schneefall"],
    75: ["❄️", "Jak sneg", "Heavy snow", "Starker Schneefall"],
    77: ["🌨️", "Snežna zrna", "Snow grains", "Schneegriesel"],
    80: ["🌦️", "Pljuskovi", "Rain showers", "Regenschauer"],
    81: ["🌧️", "Jaki pljuskovi", "Heavy showers", "Kräftige Schauer"],
    82: ["⛈️", "Vrlo jaki pljuskovi", "Violent showers", "Heftige Schauer"],
    85: ["🌨️", "Snežni pljuskovi", "Snow showers", "Schneeschauer"],
    86: ["🌨️", "Jaki snežni pljuskovi", "Heavy snow showers", "Starke Schneeschauer"],
    95: ["⛈️", "Grmljavina", "Thunderstorm", "Gewitter"],
    96: ["⛈️", "Grmljavina sa gradom", "Thunderstorm with hail", "Gewitter mit Hagel"],
    99: ["⛈️", "Jaka grmljavina sa gradom", "Severe thunderstorm with hail", "Schweres Gewitter mit Hagel"],
  };
  const v = m[code] ?? ["🌡️", "Nepoznato", "Unknown", "Unbekannt"];
  return { icon: v[0], sr: v[1], en: v[2], de: v[3] };
}
