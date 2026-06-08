"use client";
import { useCallback, useEffect, useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { ymd, monthMatrix, MONTHS_SR, DOW_SR } from "./cal-utils";

export default function AvailabilityCalendar({ sb, listingId, icalUrls, onClose }:
  { sb: SupabaseClient; listingId: string; icalUrls?: string[]; onClose: () => void }) {
  const [view, setView] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const [urls, setUrls] = useState<string[]>([icalUrls?.[0] || "", icalUrls?.[1] || "", icalUrls?.[2] || ""]);
  const [syncing, setSyncing] = useState(false);
  const [msg, setMsg] = useState("");
  const today = ymd(new Date());
  const exportUrl = (typeof window !== "undefined" ? window.location.origin : "") + `/api/ical/${listingId}`;

  const load = useCallback(async () => {
    const { data } = await sb.from("availability").select("day,is_blocked").eq("listing_id", listingId).eq("is_blocked", true);
    setBlocked(new Set((data || []).map((r: any) => (typeof r.day === "string" ? r.day.slice(0, 10) : new Date(r.day).toISOString().slice(0, 10)))));
  }, [sb, listingId]);
  useEffect(() => { load(); }, [load]);

  async function toggle(s: string) {
    if (s < today) return;
    const next = new Set(blocked);
    if (next.has(s)) { next.delete(s); await sb.from("availability").delete().eq("listing_id", listingId).eq("day", s); }
    else { next.add(s); await sb.from("availability").upsert({ listing_id: listingId, day: s, is_blocked: true, source: "manual" }, { onConflict: "listing_id,day" }); }
    setBlocked(next);
  }

  async function sync() {
    setSyncing(true); setMsg("");
    try {
      const { data } = await sb.auth.getSession();
      const token = data.session?.access_token;
      const res = await fetch("/api/ical-sync", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ listing_id: listingId, urls }) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || "err");
      setMsg(`Uvezeno ${j.imported} datuma. / Imported ${j.imported} dates.`); load();
    } catch (e: any) { setMsg("Greška pri sinhronizaciji. / Sync error."); } finally { setSyncing(false); }
  }

  return (
    <div style={{ border: "1px solid var(--line)", borderRadius: 14, padding: 18, marginTop: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>Kalendar dostupnosti / Availability</strong>
        <button className="btn btn--outline" onClick={onClose}>Zatvori / Close</button>
      </div>
      <p style={{ color: "var(--slate)", fontSize: ".85rem", margin: "6px 0 12px" }}>Kliknite na datum da ga označite kao zauzet/slobodan. / Click a date to block/unblock.</p>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <button className="btn btn--outline" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>‹</button>
        <strong>{MONTHS_SR[view.getMonth()]} {view.getFullYear()}</strong>
        <button className="btn btn--outline" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 5, maxWidth: 360 }}>
        {DOW_SR.map((d) => <div key={d} style={{ textAlign: "center", color: "var(--slate)", fontWeight: 700, fontSize: ".8rem" }}>{d}</div>)}
        {monthMatrix(view.getFullYear(), view.getMonth()).map((d, i) => {
          if (!d) return <div key={i} />;
          const s = ymd(d); const past = s < today; const isB = blocked.has(s);
          return <button key={i} disabled={past} onClick={() => toggle(s)} style={{
            padding: "8px 0", borderRadius: 6, cursor: past ? "default" : "pointer",
            background: isB ? "#fdecea" : past ? "transparent" : "var(--green-50)",
            color: isB ? "var(--danger)" : past ? "#c9d2cf" : "var(--green-700)",
            textDecoration: isB ? "line-through" : "none", border: "1px solid var(--line)" }}>{d.getDate()}</button>;
        })}
      </div>

      <div style={{ marginTop: 18 }}>
        <strong style={{ fontSize: ".92rem" }}>Sinhronizacija (iCal) / Sync</strong>
        <p style={{ color: "var(--slate)", fontSize: ".82rem", margin: "4px 0 8px" }}>
          Izvoz (zalepite na Booking/Airbnb) / Export URL:
        </p>
        <input readOnly value={exportUrl} onClick={(e) => (e.target as HTMLInputElement).select()} style={{ width: "100%", fontSize: ".82rem" }} />
        <p style={{ color: "var(--slate)", fontSize: ".82rem", margin: "10px 0 6px" }}>Uvoz iz Booking/Airbnb (iCal linkovi) / Import URLs:</p>
        {urls.map((u, i) => (
          <input key={i} value={u} placeholder="https://...ics" style={{ width: "100%", marginBottom: 6, fontSize: ".82rem" }}
            onChange={(e) => { const v = [...urls]; v[i] = e.target.value; setUrls(v); }} />
        ))}
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 6 }}>
          <button className="btn btn--primary" disabled={syncing} onClick={sync}>{syncing ? "..." : "Sinhronizuj / Sync"}</button>
          {msg && <span style={{ fontSize: ".85rem", color: "var(--slate)" }}>{msg}</span>}
        </div>
      </div>
    </div>
  );
}
