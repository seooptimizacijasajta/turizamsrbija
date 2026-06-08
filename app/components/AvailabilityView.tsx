"use client";
import { useState } from "react";
import { ymd, monthMatrix, MONTHS_SR, DOW_SR } from "./cal-utils";

export default function AvailabilityView({ blocked }: { blocked: string[] }) {
  const set = new Set(blocked);
  const [base] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const today = ymd(new Date());
  const months = [0, 1].map((o) => new Date(base.getFullYear(), base.getMonth() + o, 1));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
      {months.map((m) => (
        <div key={m.toISOString()}>
          <strong style={{ display: "block", marginBottom: 8 }}>{MONTHS_SR[m.getMonth()]} {m.getFullYear()}</strong>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, fontSize: ".8rem" }}>
            {DOW_SR.map((d) => <div key={d} style={{ textAlign: "center", color: "var(--slate)", fontWeight: 700 }}>{d}</div>)}
            {monthMatrix(m.getFullYear(), m.getMonth()).map((d, i) => {
              if (!d) return <div key={i} />;
              const s = ymd(d); const past = s < today; const isB = set.has(s);
              return <div key={i} style={{ textAlign: "center", padding: "6px 0", borderRadius: 6,
                background: isB ? "#fdecea" : past ? "transparent" : "var(--green-50)",
                color: isB ? "var(--danger)" : past ? "#c9d2cf" : "var(--green-700)",
                textDecoration: isB ? "line-through" : "none" }}>{d.getDate()}</div>;
            })}
          </div>
        </div>
      ))}
      <div style={{ gridColumn: "1/-1", display: "flex", gap: 16, fontSize: ".82rem", color: "var(--slate)" }}>
        <span><span style={{ color: "var(--green-700)" }}>■</span> slobodno / free</span>
        <span><span style={{ color: "var(--danger)" }}>■</span> zauzeto / busy</span>
      </div>
    </div>
  );
}
