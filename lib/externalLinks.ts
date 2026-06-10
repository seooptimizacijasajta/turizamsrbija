export type ExtLink = { label: string; url: string };
export type ExtGroup = { sr: string; en: string; links: ExtLink[] };

// Place-specific external/relevant links, shown on the matching blog guide and destination page.
export const EXTERNAL_LINKS: Record<string, ExtGroup[]> = {
  "banja-vrujci": [
    {
      sr: "Korisni sajtovi o Banji Vrujci",
      en: "Useful websites about Banja Vrujci",
      links: [
        { label: "banjavrujci.info", url: "https://www.banjavrujci.info" },
        { label: "vrujci.org", url: "https://www.vrujci.org" },
        { label: "banja-vrujci.org", url: "https://www.banja-vrujci.org" },
        { label: "banjavrujci.biz", url: "https://www.banjavrujci.biz" },
        { label: "banja-vrujci.net", url: "https://www.banja-vrujci.net" },
        { label: "banja-vrujci.co.rs", url: "https://www.banja-vrujci.co.rs" },
        { label: "banjavrujci.eu", url: "https://www.banjavrujci.eu" },
        { label: "Banja Vrujci — Wikipedia", url: "https://en.wikipedia.org/wiki/Banja_Vrujci" },
        { label: "mionica.co.rs/banja-vrujci", url: "https://mionica.co.rs/banja-vrujci" },
        { label: "divcibare.org.rs — Banja Vrujci", url: "https://divcibare.org.rs/okolina-divcibara/banja-vrujci" },
        { label: "beogradnet.net — Banja Vrujci", url: "https://www.beogradnet.net/firma/banja-vrujci" },
      ],
    },
    {
      sr: "Banja Vrujci na društvenim mrežama",
      en: "Banja Vrujci on social media",
      links: [
        { label: "Facebook stranica", url: "https://www.facebook.com/Banja.Vrujci" },
        { label: "Facebook grupa", url: "https://www.facebook.com/groups/banjavrujcismestaj" },
        { label: "Instagram", url: "https://www.instagram.com/banja.vrujci/" },
        { label: "YouTube", url: "https://www.youtube.com/@banjavrujci" },
        { label: "X (Twitter)", url: "https://twitter.com/banjavrujci" },
        { label: "TikTok", url: "https://www.tiktok.com/@banjavrujci" },
        { label: "Pinterest", url: "https://www.pinterest.com/banjavrujci/banja-vrujci/" },
        { label: "LinkedIn", url: "https://www.linkedin.com/company/banja-vrujci/" },
        { label: "Threads", url: "https://www.threads.com/@banja.vrujci" },
        { label: "Google Mapa", url: "https://www.google.com/maps/place/%D0%92%D1%80%D1%83%D1%98%D1%86%D0%B8/@44.2212733,20.1530292,17z" },
      ],
    },
  ],
};

export const externalLinksFor = (place: string): ExtGroup[] => EXTERNAL_LINKS[place] || [];
