"use client";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";
import { PCATS } from "@/lib/pijaca";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function sniff(file: File) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (hex.startsWith("ffd8ff") || hex.startsWith("89504e47")) return true;
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return true;
  const asc = String.fromCharCode(...b); return asc.includes("ftyp");
}

export default function ProductForm({ sb, ownerId, existing, onSaved, onCancel }:
  { sb: SupabaseClient; ownerId: string; existing?: any; onSaved: () => void; onCancel: () => void }) {
  const { t } = useLang();
  const e = existing;
  const [category, setCategory] = useState(e?.category || PCATS[0].key);
  const [unit, setUnit] = useState(e?.unit || "kom");
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
      const path = `${ownerId}/prod-${Date.now()}-${Math.random().toString(36).slice(2)}.${(f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "")}`;
      const { error } = await sb.storage.from("listing-photos").upload(path, f, { contentType: f.type });
      if (error) { setErr(error.message); return; }
      setImage(sb.storage.from("listing-photos").getPublicUrl(path).data.publicUrl);
    } finally { setUploading(false); }
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) || "").trim();
    if (!g("name_sr")) { setErr("Naziv (srpski) je obavezan."); setBusy(false); return; }
    const row: any = {
      owner_id: ownerId, status: "approved", category, unit,
      name_sr: g("name_sr"), name_en: g("name_en") || null, name_de: g("name_de") || null,
      desc_sr: g("desc_sr") || null, desc_en: g("desc_en") || null, desc_de: g("desc_de") || null,
      price: g("price") ? Number(g("price")) : null,
      region_sr: g("region_sr") || null, region_en: g("region_en") || null,
      producer: g("producer") || null, phone: g("phone") || null, image: image || null,
    };
    try {
      if (e?.id) { const { error } = await sb.from("products").update(row).eq("id", e.id); if (error) throw error; }
      else { const { error } = await sb.from("products").insert(row); if (error) throw error; }
      onSaved();
    } catch (x: any) { setErr(x.message || "Greška."); } finally { setBusy(false); }
  }

  const fld = (n: string, label: string, val?: string, type = "text") => (
    <div className="field"><label>{label}</label><input name={n} type={type} defaultValue={val || ""} /></div>
  );

  return (
    <form onSubmit={submit} style={{ marginTop: 24, border: "1px solid var(--line)", borderRadius: 12, padding: 20 }}>
      <h3 style={{ marginBottom: 14 }}>{e?.id ? "Izmena proizvoda / Edit product" : "Novi proizvod / New product"}</h3>
      <div className="field-row">
        <div className="field"><label>Kategorija / Category</label>
          <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
            {PCATS.map((c) => <option key={c.key} value={c.key}>{c.icon} {c.sr} / {c.en}</option>)}
          </select>
        </div>
        <div className="field"><label>Jedinica / Unit</label>
          <select value={unit} onChange={(ev) => setUnit(ev.target.value)}>
            <option value="kom">kom / pc</option><option value="kg">kg</option><option value="L">L</option>
          </select>
        </div>
      </div>
      <div className="field-row">{fld("name_sr", "Naziv (SR) *", e?.name_sr)}{fld("name_en", "Name (EN)", e?.name_en)}{fld("name_de", "Name (DE)", e?.name_de)}</div>
      <div className="field"><label>Opis (SR)</label><textarea name="desc_sr" rows={3} defaultValue={e?.desc_sr || ""} /></div>
      <div className="field-row"><div className="field"><label>Description (EN)</label><textarea name="desc_en" rows={2} defaultValue={e?.desc_en || ""} /></div><div className="field"><label>Beschreibung (DE)</label><textarea name="desc_de" rows={2} defaultValue={e?.desc_de || ""} /></div></div>
      <div className="field-row">{fld("price", "Cena € / Price €", e?.price ? String(e.price) : "", "number")}{fld("producer", "Proizvođač / Producer", e?.producer)}{fld("phone", "Telefon / Phone", e?.phone)}</div>
      <div className="field-row">{fld("region_sr", "Mesto (SR)", e?.region_sr)}{fld("region_en", "Place (EN)", e?.region_en)}</div>
      <div className="field"><label>Slika / Image</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={onFile} disabled={uploading} />
        {uploading && <span style={{ fontSize: ".85rem", color: "var(--slate)" }}> Otpremanje…</span>}
        {image && <div style={{ marginTop: 8 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={image} alt="" style={{ width: 120, height: 90, objectFit: "cover", borderRadius: 8 }} /></div>}
      </div>
      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn--primary" type="submit" disabled={busy || uploading}>{busy ? "..." : "Sačuvaj / Save"}</button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>{t("fo_cancel")}</button>
      </div>
    </form>
  );
}
