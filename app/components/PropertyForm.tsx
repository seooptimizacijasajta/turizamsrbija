"use client";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";
import { PROP_TYPES } from "@/lib/nekretnine";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
async function sniff(file: File) {
  const b = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  const hex = Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (hex.startsWith("ffd8ff") || hex.startsWith("89504e47")) return true;
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return true;
  return String.fromCharCode(...b).includes("ftyp");
}

export default function PropertyForm({ sb, ownerId, existing, onSaved, onCancel }:
  { sb: SupabaseClient; ownerId: string; existing?: any; onSaved: () => void; onCancel: () => void }) {
  const { t } = useLang();
  const e = existing;
  const [propType, setPropType] = useState(e?.property_type || "stan");
  const [image, setImage] = useState<string>(e?.image || "");
  const [images, setImages] = useState<string[]>(Array.isArray(e?.images) ? e.images : []);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function upload(f: File): Promise<string | null> {
    if (!ALLOWED.includes(f.type)) { setErr("JPG, PNG, WEBP, AVIF."); return null; }
    if (f.size > 5 * 1024 * 1024) { setErr("Max 5MB."); return null; }
    if (!(await sniff(f))) { setErr("Fajl nije ispravna slika."); return null; }
    const ext = (f.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${ownerId}/np-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await sb.storage.from("listing-photos").upload(path, f, { contentType: f.type });
    if (error) { setErr(error.message); return null; }
    return sb.storage.from("listing-photos").getPublicUrl(path).data.publicUrl;
  }

  async function onCover(ev: React.ChangeEvent<HTMLInputElement>) {
    const f = ev.target.files?.[0]; ev.target.value = ""; if (!f) return;
    setErr(""); setUploading(true);
    try { const url = await upload(f); if (url) setImage(url); } finally { setUploading(false); }
  }
  async function onGallery(ev: React.ChangeEvent<HTMLInputElement>) {
    const fs = Array.from(ev.target.files || []); ev.target.value = ""; if (!fs.length) return;
    setErr(""); setUploading(true);
    try { for (const f of fs.slice(0, 8)) { const url = await upload(f); if (url) setImages((a) => [...a, url]); } } finally { setUploading(false); }
  }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget); const g = (k: string) => String(f.get(k) || "").trim();
    const num = (k: string) => { const v = g(k); return v ? Number(v) : null; };
    if (!g("title")) { setErr("Naslov oglasa je obavezan."); setBusy(false); return; }
    const row: any = {
      owner_id: ownerId, deal_type: "prodaja", property_type: propType, title: g("title"),
      description: g("description") || null,
      price: num("price"), area: num("area"), land_area: num("land_area"), rooms: num("rooms"),
      city: g("city") || null, municipality: g("municipality") || null, address: g("address") || null,
      lat: num("lat"), lng: num("lng"),
      phone: g("phone") || null, email: g("email") || null,
      image: image || null, images,
    };
    try {
      if (e?.id) { const { error } = await sb.from("properties").update(row).eq("id", e.id); if (error) throw error; }
      else {
        const { error } = await sb.from("properties").insert({ ...row, status: "pending" }); if (error) throw error;
        fetch("/api/notify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind: "property", name: g("title"), category: propType, city: g("city") }) }).catch(() => {});
      }
      onSaved();
    } catch (x: any) { setErr(x.message || "Greška."); } finally { setBusy(false); }
  }

  const fld = (n: string, label: string, val?: string, type = "text") => (
    <div className="field"><label>{label}</label><input name={n} type={type} defaultValue={val ?? ""} /></div>
  );

  return (
    <form onSubmit={submit} style={{ marginTop: 24, border: "1px solid var(--line)", borderRadius: 12, padding: 20 }}>
      <h3 style={{ marginBottom: 14 }}>{e?.id ? "Izmena nekretnine / Edit property" : "Nova nekretnina / New property"}</h3>
      <div className="field"><label>Tip nekretnine / Type</label>
        <select value={propType} onChange={(ev) => setPropType(ev.target.value)}>
          {PROP_TYPES.map((c) => <option key={c.key} value={c.key}>{c.icon} {c.sr}</option>)}
        </select>
      </div>
      {fld("title", "Naslov oglasa * (npr. Dvosoban stan na Vračaru, 58 m²)", e?.title)}
      <div className="field"><label>Opis</label><textarea name="description" rows={5} defaultValue={e?.description || ""} placeholder="Detaljan opis: stanje, grejanje, sprat, uknjiženost, okolina…" /></div>
      <div className="field-row">
        {fld("price", "Cena €", e?.price != null ? String(e.price) : "", "number")}
        {fld("area", "Površina (m²)", e?.area != null ? String(e.area) : "", "number")}
        {fld("land_area", "Plac (ari)", e?.land_area != null ? String(e.land_area) : "", "number")}
        {fld("rooms", "Broj soba", e?.rooms != null ? String(e.rooms) : "", "number")}
      </div>
      <div className="field-row">{fld("city", "Grad / City", e?.city)}{fld("municipality", "Opština / Naselje", e?.municipality)}{fld("address", "Adresa (opciono)", e?.address)}</div>
      <div className="field-row">{fld("lat", "Geo lat (opciono)", e?.lat != null ? String(e.lat) : "", "number")}{fld("lng", "Geo lng (opciono)", e?.lng != null ? String(e.lng) : "", "number")}</div>
      <div className="field-row">{fld("phone", "Telefon / Phone", e?.phone)}{fld("email", "Email", e?.email)}</div>

      <div className="field"><label>Naslovna slika / Cover</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={onCover} disabled={uploading} />
        {image && <div style={{ marginTop: 8 }}>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={image} alt="" style={{ width: 140, height: 90, objectFit: "cover", borderRadius: 8 }} /></div>}
      </div>
      <div className="field"><label>Galerija (više slika) / Gallery</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={onGallery} disabled={uploading} />
        {uploading && <span style={{ fontSize: ".85rem", color: "var(--slate)" }}> Otpremanje…</span>}
        {images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {images.map((g, i) => (
              <div key={i} style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g} alt="" style={{ width: 90, height: 64, objectFit: "cover", borderRadius: 6 }} />
                <button type="button" onClick={() => setImages((a) => a.filter((_, idx) => idx !== i))} style={{ position: "absolute", top: -6, right: -6, background: "var(--danger)", color: "#fff", borderRadius: "50%", width: 20, height: 20, lineHeight: "18px", fontSize: 12, border: 0, cursor: "pointer" }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn--primary" type="submit" disabled={busy || uploading}>{busy ? "..." : "Sačuvaj / Save"}</button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>{t("fo_cancel")}</button>
      </div>
    </form>
  );
}
