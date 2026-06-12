"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { eventPath, evCatByKey, evCatLabel, monthName } from "@/lib/events";

export default function NearbyEvents({ nameSr, municipality }: { nameSr: string; municipality?: string }) {
  const { lang } = useLang();
  const sb = getBrowserClient();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    if (!sb) return;
    let alive = true;
    (async () => {
      const { data } = await sb.from("events").select("*").eq("status", "approved");
      const dn = (nameSr || "").toLowerCase().trim();
      const dm = (municipality || "").toLowerCase().trim();
      const filtered = (data || []).filter((e: any) => {
        const c = (e.city || "").toLowerCase().trim();
        if (!c) return false;
        return (dn && (dn.includes(c) || c.includes(dn))) || (dm && (dm.includes(c) || c.includes(dm)));
      });
      if (alive) setRows(filtered.slice(0, 3));
    })();
    return () => { alive = false; };
  }, [sb, nameSr, municipality]);

  if (rows.length === 0) return null;
  const lc = lang === "de" ? "de" : lang === "en" ? "en" : "sr";
  const heading = lang === "sr" ? "Manifestacije u blizini" : lang === "de" ? "Veranstaltungen in der Nähe" : "Events nearby";

  return (
    <div className="detail-section">
      <h2>🎉 {heading}</h2>
      <div className="card-grid">
        {rows.map((e) => {
          const c = evCatByKey(e.category);
          const per = e.period_text || monthName(e.month, lang);
          return (
            <div className="card" key={e.id}>
              <div className="card-media" style={e.image ? undefined : { background: "linear-gradient(135deg,#7c3aed,#0f3d2e)", display: "grid", placeItems: "center", minHeight: 130 }}>
                {e.image
                  ? <Image fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 360px" src={e.image} alt={e.name} style={{ objectFit: "cover" }} />
                  : <span style={{ fontSize: "2.4rem" }}>{c?.icon || "🎉"}</span>}
                <span className="card-badge">{c?.icon} {c ? evCatLabel(c, lang) : e.category}</span>
              </div>
              <div className="card-body">
                <span className="card-region">{[per, e.city].filter(Boolean).join(" · ")}</span>
                <h3 className="card-title"><Link href={eventPath(e.name, lang)} style={{ color: "inherit" }}>{e.name}</Link></h3>
                <p className="card-desc">{e["desc_" + lc] || e.desc_sr}</p>
                <div style={{ marginTop: 8 }}><Link className="btn btn--primary" style={{ fontSize: ".82rem", padding: "7px 12px" }} href={eventPath(e.name, lang)}>{lang === "sr" ? "Detalji" : lang === "de" ? "Details" : "Details"}</Link></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
