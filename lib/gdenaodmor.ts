import type { Lang } from "./types";

export const gdeNaOdmorPath = (lang: Lang) =>
  lang === "sr" ? "/gde-na-odmor-u-srbiji" : lang === "de" ? "/de/wohin-in-serbien" : "/en/where-to-go-in-serbia";
