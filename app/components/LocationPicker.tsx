"use client";
import { useEffect, useRef } from "react";

declare global { interface Window { L?: any } }

export default function LocationPicker({ lat, lng, onChange }:
  { lat?: number; lng?: number; onChange: (la: number, ln: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    function ensureLeaflet(): Promise<any> {
      if (window.L) return Promise.resolve(window.L);
      return new Promise((resolve) => {
        if (!document.getElementById("leaflet-css")) {
          const link = document.createElement("link");
          link.id = "leaflet-css"; link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }
        const sc = document.createElement("script");
        sc.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        sc.onload = () => resolve(window.L);
        document.body.appendChild(sc);
      });
    }
    ensureLeaflet().then((L) => {
      if (cancelled || !ref.current || mapRef.current) return;
      const has = typeof lat === "number" && typeof lng === "number";
      const map = L.map(ref.current).setView(has ? [lat, lng] : [44.0165, 21.0059], has ? 13 : 7);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap", maxZoom: 19 }).addTo(map);
      if (has) markerRef.current = L.marker([lat, lng]).addTo(map);
      map.on("click", (e: any) => {
        const { lat: la, lng: ln } = e.latlng;
        if (markerRef.current) markerRef.current.setLatLng([la, ln]);
        else markerRef.current = L.marker([la, ln]).addTo(map);
        onChange(Number(la.toFixed(6)), Number(ln.toFixed(6)));
      });
      setTimeout(() => map.invalidateSize(), 200);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} style={{ height: 280, borderRadius: 12, border: "1px solid var(--line)", overflow: "hidden" }} />;
}
