"use client";
import { useEffect, useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);
  const u = encodeURIComponent(url), t = encodeURIComponent(title);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, bg: "#1877F2" },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`, bg: "#111111" },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, bg: "#25D366" },
    { label: "Viber", href: `viber://forward?text=${t}%20${u}`, bg: "#7360f2" },
  ];
  async function copy() { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch {} }
  return (
    <div className="share">
      <span className="share-label">Podeli / Share:</span>
      {links.map((l) => <a key={l.label} className="share-btn" href={l.href} target="_blank" rel="noopener noreferrer" style={{ background: l.bg }}>{l.label}</a>)}
      <button className="share-btn" style={{ background: "var(--slate)" }} onClick={copy} type="button">{copied ? "✓ Kopirano" : "Kopiraj link"}</button>
    </div>
  );
}
