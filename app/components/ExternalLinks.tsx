"use client";
import { useLang } from "@/lib/i18n";
import { externalLinksFor } from "@/lib/externalLinks";

export default function ExternalLinks({ place }: { place?: string }) {
  const { lang } = useLang();
  const groups = place ? externalLinksFor(place) : [];
  if (!groups.length) return null;
  return (
    <div className="ext-links" style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
      {groups.map((g) => (
        <div key={g.sr} style={{ marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 8px" }}>{lang === "en" ? g.en : g.sr}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 4 }}>
            {g.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="nofollow noopener noreferrer" style={{ color: "var(--green-600)", wordBreak: "break-word" }}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
