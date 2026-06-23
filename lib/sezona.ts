import type { Lang } from "./types";

export const letovanjePath = (lang: Lang) => lang === "sr" ? "/letovanje-u-srbiji" : lang === "de" ? "/de/sommerurlaub-serbien" : "/en/summer-holidays-serbia";
export const zimovanjePath = (lang: Lang) => lang === "sr" ? "/zimovanje-u-srbiji" : lang === "de" ? "/de/winterurlaub-serbien" : "/en/winter-holidays-serbia";
