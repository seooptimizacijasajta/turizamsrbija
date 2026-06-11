"use client";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";
import { BIZ_CATS } from "@/lib/firme";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function sniff(file: File) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (hex.startsWith("ffd8ff") || hex.startsWith("89504e47")) return true;
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return true;
  return String.fromCharCode(...b).includes("ftyp");
}

export default function BusinessForm({ sb, ownerId, existing, onSaved, onCancel }:
  { sb: SupabaseClient; ownerId: string; existing?: any; onSaved: () => void; onCancel: () => void }) {
  const { t } = useLang();
  const e = existing;
  const [category, setCategory] = useState(e?.category || BIZ_CATS[0].key);
  const [image, setImage] = useState<string>(e?.image || "");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0]; ev.target.value = ""; if (!f) return;
    setErr(""); if (!ALLOWED.includes(f.type)) { setErr("JPG, PNG, WEBP, AVIF."); return; }
    if (f.size > 5 * 1024 * 1024) { setErr("Max 5MB."); return; }
    if (!(await sniff(f))) { setErr("Fajl nije ispravna slika."); return; }
    setUploading(true);
    try {
      const path = `${ownerId}/biz-${Date.now()}-${Math.random().toString(36).slice(2)}.${(f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "")}`;
      const { error } = await sb.storage.from("listing-photos").upload(path, f, { contentType: f.type });
      if (error) { setErr(error.message); return; }
      setImage(sb.storage.from("listing-photos").getPublicUrl(path).data.publicUrl);
    } finally { setUploading(false); }
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) || "").trim();
    if (!g("name")) { setErr("Naziv firme je obavezan."); setBusy(false); return; }
    const row: any = {
      owner_id: ownerId, status: "approved", category, name: g("name"),
      desc_sr: g("desc_sr") || null, desc_en: g("desc_en") || null, desc_de: g("desc_de") || null,
      city: g("city") || null, municipality: g("municipality") || null, address: g("address") || null,
      phone: g("phone") || null, email: g("email") || null, website: g("website") || null, image: image || null,
    };
    try {
      if (e?.id) { const { error } = await sb.from("businesses").update(row).eq("id", e.id); if (error) throw error; }
      else { const { error } = await sb.from("businesses").insert(row); if (error) throw error; fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "business", name: g("name"), category, city: g("city") }) }).catch(() => {}); }
      onSaved();
    } catch (x: any) { setErr(x.message || "Greška."); } finally { setBusy(false); }
  }

  const fld = (n: string, label: string, val?: string, type = "text") => (
    <div className="field"><label>{label}</label><input name={n} type={type} defaultValue={val || ""} /></div>
  );

  return (
    <form onSubmit={submit} style={{ marginTop: 24, border: "1px solid var(--line)", borderRadius: 12, padding: 20 }}>
      <h3 style={{ marginBottom: 14 }}>{e?.id ? "Izmena firme / Edit business" : "Nova firma / New business"}</h3>
      <div className="field-row">
        <div className="field"><label>Kategorija / Category</label>
          <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
            {BIZ_CATS.map((c) => <option key={c.key} value={c.key}>{c.icon} {c.sr} / {c.en}</option>)}
          </select>
        </div>
        {fld("name", "Naziv firme *", e?.name)}
      </div>
      <div className="field"><label>Opis (SR)</label><textarea name="desc_sr" rows={3} defaultValue={e?.desc_sr || ""} /></div>
      <div className="field-row"><div className="field"><label>Description (EN)</label><textarea name="desc_en" rows={2} defaultValue={e?.desc_en || ""} /></div><div className="field"><label>Beschreibung (DE)</label><textarea name="desc_de" rows={2} defaultValue={e?.desc_de || ""} /></div></div>
      <div className="field-row">{fld("city", "Grad / City", e?.city)}{fld("municipality", "Opština (opciono)", e?.municipality)}{fld("address", "Adresa / Address", e?.address)}</div>
      <div className="field-row">{fld("phone", "Telefon / Phone", e?.phone)}{fld("email", "Email", e?.email)}{fld("website", "Web sajt", e?.website)}</div>
      <div className="field"><label>Logo / Slika</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={onFile} disabled={uploading} />
        {uploading && <span style={{ fontSize: ".85rem", color: "var(--slate)" }}> Otpremanje…</span>}
        {image && <div style={{ marginTop: 8 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={image} alt="" style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8 }} /></div>}
      </div>
      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn--primary" type="submit" disabled={busy || uploading}>{busy ? "..." : "Sačuvaj / Save"}</button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>{t("fo_cancel")}</button>
      </div>
    </form>
  );
}
