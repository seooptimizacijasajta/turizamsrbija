function nextDay(ymd: string): string {
  const d = new Date(ymd + "T00:00:00Z"); d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
const fmt = (c: string) => `${c.slice(0, 4)}-${c.slice(4, 6)}-${c.slice(6, 8)}`;

export function datesToICal(blocked: string[]): string {
  const s = [...new Set(blocked)].sort();
  const ev: string[] = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (j + 1 < s.length && nextDay(s[j]) === s[j + 1]) j++;
    const dtstart = s[i].replace(/-/g, "");
    const dtend = nextDay(s[j]).replace(/-/g, ""); // DTEND exclusive
    ev.push(["BEGIN:VEVENT", `UID:${dtstart}-${dtend}@turizamsrbija.com`,
      `DTSTART;VALUE=DATE:${dtstart}`, `DTEND;VALUE=DATE:${dtend}`,
      "SUMMARY:Zauzeto / Busy", "END:VEVENT"].join("\r\n"));
    i = j + 1;
  }
  return ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//turizamsrbija//EN", "CALSCALE:GREGORIAN", ...ev, "END:VCALENDAR"].join("\r\n");
}

export function parseICalDates(text: string): string[] {
  const out = new Set<string>();
  const events = text.split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    const ds = ev.match(/DTSTART[^:]*:(\d{8})/); if (!ds) continue;
    const de = ev.match(/DTEND[^:]*:(\d{8})/);
    let cur = fmt(ds[1]);
    const end = de ? fmt(de[1]) : nextDay(cur);
    let g = 0;
    while (cur < end && g++ < 800) { out.add(cur); cur = nextDay(cur); }
  }
  return [...out];
}
