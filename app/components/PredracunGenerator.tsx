"use client";
import { useEffect, useMemo, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";

const SELLER = {
  name: "Turizam Srbija",
  address: "Karpatské námestie 7770/10A, 83106 Bratislava – Rača",
  country: "Slovačka",
  companyId: "54801770",
  email: "info@turizamsrbija.com",
  web: "turizamsrbija.com",
  bankName: "Tatra banka a.s.",
  iban: "SK67 1100 0000 0029 3266 3057",
  swift: "TATRSKBX",
};

type Item = { opis: string; kol: number; cena: number };

function eur(n: number) {
  return "€" + (Math.round(n * 100) / 100).toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function today() { return new Date().toISOString().slice(0, 10); }
function plusDays(d: string, n: number) { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); }
function fmtDate(d: string) { if (!d) return ""; const [y, m, dd] = d.split("-"); return `${dd}.${m}.${y}.`; }

export default function PredracunGenerator() {
  const sb = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user;
      if (u) { const { data: p } = await sb.from("profiles").select("role").eq("id", u.id).single(); setIsAdmin(p?.role === "admin"); }
      setReady(true);
    });
  }, [sb]);

  const year = new Date().getFullYear();
  const [broj, setBroj] = useState(`PR-${year}-001`);
  const [datum, setDatum] = useState(today());
  const [rok, setRok] = useState(plusDays(today(), 8));
  const [iban, setIban] = useState(SELLER.iban);
  const [swift, setSwift] = useState(SELLER.swift);
  const [bankName, setBankName] = useState(SELLER.bankName);
  const [poziv, setPoziv] = useState("");

  const [kName, setKName] = useState("");
  const [kAddr, setKAddr] = useState("");
  const [kPib, setKPib] = useState("");
  const [kMb, setKMb] = useState("");
  const [kEmail, setKEmail] = useState("");

  const [items, setItems] = useState<Item[]>([{ opis: "Izdvajanje oglasa (bold/featured) — 30 dana", kol: 1, cena: 20 }]);
  const setItem = (i: number, patch: Partial<Item>) => setItems((a) => a.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  const addItem = () => setItems((a) => [...a, { opis: "", kol: 1, cena: 0 }]);
  const delItem = (i: number) => setItems((a) => a.length > 1 ? a.filter((_, idx) => idx !== i) : a);

  const total = useMemo(() => items.reduce((s, it) => s + (Number(it.kol) || 0) * (Number(it.cena) || 0), 0), [items]);

  if (!ready) return <div className="container" style={{ padding: "60px 0" }}>…</div>;
  if (!isAdmin) return (
    <div className="container" style={{ padding: "60px 0", maxWidth: 560 }}>
      <h1>Predračun</h1>
      <p style={{ color: "var(--slate)", marginTop: 10 }}>Ova stranica je dostupna samo administratoru. Prijavite se na <a href="/nalog" style={{ color: "var(--green-600)" }}>Moj nalog</a>.</p>
    </div>
  );

  const lbl: React.CSSProperties = { fontSize: ".8rem", color: "var(--slate)", display: "block", marginBottom: 3 };

  return (
    <div className="container" style={{ padding: "28px 0 60px" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden !important; }
          #pr-doc, #pr-doc * { visibility: visible !important; }
          #pr-doc { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; border: 0 !important; margin: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 16mm; }
        }
      `}} />

      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>🧾 Generator predračuna</h1>
        <button className="btn btn--primary" onClick={() => window.print()}>🖨 Štampaj / Sačuvaj PDF</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px,360px) 1fr", gap: 24, alignItems: "start" }}>
        {/* ---- FORM ---- */}
        <div className="no-print" style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 16, display: "grid", gap: 10 }}>
          <div><label style={lbl}>Broj predračuna</label><input value={broj} onChange={(e) => setBroj(e.target.value)} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><label style={lbl}>Datum izdavanja</label><input type="date" value={datum} onChange={(e) => setDatum(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label style={lbl}>Rok plaćanja</label><input type="date" value={rok} onChange={(e) => setRok(e.target.value)} /></div>
          </div>
          <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />
          <strong style={{ fontSize: ".9rem" }}>Kupac</strong>
          <div><label style={lbl}>Naziv / Ime</label><input value={kName} onChange={(e) => setKName(e.target.value)} placeholder="npr. Apartmani Sunce d.o.o." /></div>
          <div><label style={lbl}>Adresa</label><input value={kAddr} onChange={(e) => setKAddr(e.target.value)} placeholder="Ulica i broj, mesto" /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><label style={lbl}>PIB</label><input value={kPib} onChange={(e) => setKPib(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label style={lbl}>Matični broj</label><input value={kMb} onChange={(e) => setKMb(e.target.value)} /></div>
          </div>
          <div><label style={lbl}>Email (opciono)</label><input value={kEmail} onChange={(e) => setKEmail(e.target.value)} /></div>
          <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />
          <strong style={{ fontSize: ".9rem" }}>Stavke (EUR)</strong>
          {items.map((it, i) => (
            <div key={i} style={{ border: "1px solid var(--line)", borderRadius: 8, padding: 8, display: "grid", gap: 6 }}>
              <input value={it.opis} onChange={(e) => setItem(i, { opis: e.target.value })} placeholder="Opis usluge" />
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input type="number" min={1} step={1} value={it.kol} onChange={(e) => setItem(i, { kol: Number(e.target.value) })} style={{ width: 70 }} title="Količina" />
                <span style={{ color: "var(--slate)" }}>×</span>
                <input type="number" min={0} step="0.01" value={it.cena} onChange={(e) => setItem(i, { cena: Number(e.target.value) })} style={{ width: 100 }} title="Cena (€)" />
                <span style={{ marginLeft: "auto", fontWeight: 600 }}>{eur((Number(it.kol) || 0) * (Number(it.cena) || 0))}</span>
                <button className="btn btn--outline" style={{ padding: "4px 8px", color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delItem(i)}>×</button>
              </div>
            </div>
          ))}
          <button className="btn btn--outline" onClick={addItem}>+ Dodaj stavku</button>
          <hr style={{ border: 0, borderTop: "1px solid var(--line)" }} />
          <strong style={{ fontSize: ".9rem" }}>Podaci za uplatu</strong>
          <div><label style={lbl}>Banka</label><input value={bankName} onChange={(e) => setBankName(e.target.value)} /></div>
          <div><label style={lbl}>IBAN / Broj računa</label><input value={iban} onChange={(e) => setIban(e.target.value)} /></div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1 }}><label style={lbl}>SWIFT / BIC</label><input value={swift} onChange={(e) => setSwift(e.target.value)} /></div>
            <div style={{ flex: 1 }}><label style={lbl}>Poziv na broj</label><input value={poziv} onChange={(e) => setPoziv(e.target.value)} placeholder={broj} /></div>
          </div>
        </div>

        {/* ---- DOCUMENT ---- */}
        <div id="pr-doc" style={{ background: "#fff", color: "#111", border: "1px solid var(--line)", borderRadius: 12, padding: "36px 40px", boxShadow: "0 6px 24px rgba(0,0,0,.06)", fontSize: 14, lineHeight: 1.5 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #0f3d2e", paddingBottom: 16, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#0f3d2e" }}>★ Turizam Srbija</div>
              <div style={{ color: "#555", marginTop: 6, fontSize: 12.5 }}>
                {SELLER.address}<br />{SELLER.country}<br />
                Company ID: {SELLER.companyId}<br />
                {SELLER.email} · {SELLER.web}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: ".5px" }}>PREDRAČUN</div>
              <div style={{ marginTop: 6, fontSize: 13 }}><strong>{broj}</strong></div>
              <div style={{ color: "#555", fontSize: 12.5, marginTop: 4 }}>Datum: {fmtDate(datum)}<br />Rok plaćanja: {fmtDate(rok)}<br />Valuta: EUR</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginBottom: 22 }}>
            <div>
              <div style={{ fontSize: 11, textTransform: "uppercase", color: "#888", letterSpacing: ".5px", marginBottom: 4 }}>Kupac</div>
              <div style={{ fontWeight: 700 }}>{kName || "—"}</div>
              <div style={{ color: "#555", fontSize: 12.5 }}>
                {kAddr && <>{kAddr}<br /></>}
                {kPib && <>PIB: {kPib} </>}{kMb && <>· MB: {kMb}</>}
                {kEmail && <><br />{kEmail}</>}
              </div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#0f3d2e", color: "#fff" }}>
                <th style={{ textAlign: "left", padding: "8px 10px", width: 30 }}>#</th>
                <th style={{ textAlign: "left", padding: "8px 10px" }}>Opis usluge</th>
                <th style={{ textAlign: "right", padding: "8px 10px", width: 60 }}>Kol.</th>
                <th style={{ textAlign: "right", padding: "8px 10px", width: 90 }}>Cena</th>
                <th style={{ textAlign: "right", padding: "8px 10px", width: 100 }}>Iznos</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px 10px" }}>{i + 1}</td>
                  <td style={{ padding: "8px 10px" }}>{it.opis || "—"}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{it.kol}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{eur(it.cena)}</td>
                  <td style={{ padding: "8px 10px", textAlign: "right" }}>{eur((Number(it.kol) || 0) * (Number(it.cena) || 0))}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
            <div style={{ minWidth: 240 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "2px solid #0f3d2e", fontWeight: 800, fontSize: 16 }}>
                <span>UKUPNO</span><span>{eur(total)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, fontSize: 12.5, color: "#444" }}>
            <strong>Podaci za uplatu:</strong><br />
            Primalac: Turizam Srbija<br />
            Banka: {bankName}<br />
            IBAN / Broj računa: {iban}<br />
            SWIFT / BIC: {swift}<br />
            Poziv na broj: {poziv || broj}
          </div>

          <div style={{ marginTop: 16, fontSize: 11.5, color: "#777", borderTop: "1px solid #eee", paddingTop: 12 }}>
            Nije u sistemu PDV-a — obračun PDV-a nije izvršen.<br />
            Predračun nije fiskalni dokument i ne predstavlja osnov za odbitak prethodnog poreza. Plaćanjem predračuna smatra se da je usluga prihvaćena. Promocija se aktivira po evidentiranoj uplati.
          </div>
        </div>
      </div>
    </div>
  );
}
