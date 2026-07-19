"use client";
import Link from "next/link";
import JsonLd from "./JsonLd";
export type Crumb = { name: string; href?: string };
const BASE = "https://turizamsrbija.com";

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items?.length) return null;
  const ld = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: BASE + (c.href === "/" ? "" : c.href) } : {}) })),
  };
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <JsonLd data={ld} />
      {items.map((c, i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span className="bc-sep">›</span>}
          {c.href ? <Link href={c.href}>{c.name}</Link> : <span className="bc-cur">{c.name}</span>}
        </span>
      ))}
    </nav>
  );
}

export const NAVKEY: Record<string, string> = { mountain: "nav_mountains", lake: "nav_lakes", river: "nav_rivers", monastery: "nav_monasteries", spa: "nav_spas", ethno: "nav_ethno", stay: "nav_stays" };
