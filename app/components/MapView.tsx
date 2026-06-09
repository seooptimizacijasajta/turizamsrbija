"use client";
import { useEffect, useRef } from "react";
import { Listing } from "@/lib/types";
import { useLang, L } from "@/lib/i18n";
import { listingPath } from "@/lib/slug";
declare global { interface Window { L?: any } }

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] as string));

export default function MapView({ items }: { items: Listing[] }) {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  useEffect(() => {
    let cancelled = false;
    function ensure(): Promise<any> {
      if (window.L) return Promise.resolve(window.L);
      return new Promise((res) => {
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link"); link.id = "leaflet-css"; link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"; document.head.appendChild(link);
        }
        const sc = document.createElement("script"); sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        sc.onload = () => res(window.L); document.body.appendChild(sc);
      });
    }
    ensure().then((Lf) => {
      if (cancelled || !ref.current || mapRef.current) return;
      const map = Lf.map(ref.current).setView([44.0, 20.9], 7);
      mapRef.current = map;
      Lf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap", maxZoom: 19 }).addTo(map);
      const pts: [number, number][] = [];
      items.forEach((it) => {
        if (typeof it.lat === "number" && typeof it.lng === "number") {
          const href = listingPath(it.type, it.name.sr, lang);
          const name = esc(L(it.name, lang));
          Lf.marker([it.lat, it.lng]).addTo(map).bindPopup(`<strong>${name}</strong><br/><a href="${href}">${lang === "en" ? "View ›" : "Pogledaj ›"}</a>`);
          pts.push([it.lat, it.lng]);
        }
      });
      if (pts.length) map.fitBounds(pts, { padding: [40, 40] });
      setTimeout(() => map.invalidateSize(), 200);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div ref={ref} style={{ height: "calc(100vh - 230px)", minHeight: 440, borderTop: "1px solid var(--line)" }} />;
}
