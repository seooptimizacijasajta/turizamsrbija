"use client";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";
import { SERBIA_MUNICIPALITIES } from "@/lib/places";
import { SETTLEMENTS, SETTLEMENT_MUNI } from "@/lib/settlements";
import LocationPicker from "./LocationPicker";
import { AMENITIES, PRICE_UNITS } from "@/lib/amenities";
import { STRUCTURES } from "@/lib/structure";

type Row = {
  id?: string;
  kind: string; category: string | null;
  name_sr: string; name_en: string;
  region_sr: string; region_en: string;
  municipality?: string | null;
  short_sr: string; short_en: string;
  desc_sr: string; desc_en: string;
  features_sr: string[]; features_en: string[];
  price: number; capacity: number | null;
  min_nights?: number | null; min_nights_weekend?: number | null; deposit?: number | null; discount_weekly?: number | null; discount_monthly?: number | null;
  amenities?: string[]; price_unit?: string | null; structure?: string | null; area_m2?: number | null;
  video_urls?: string[]; lat?: number | null; lng?: number | null; google_place_id?: string | null;
  listing_images?: { url: string; sort: number }[];
};

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_MB = 5;
const MAX_PHOTOS = 20;
const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

// Verify the file's real bytes match an image signature (defends against renamed/malicious files)
async function sniffImage(file: File): Promise<boolean> {
  const buf = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const hex = Array.from(buf.slice(0, 12)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (hex.startsWith("ffd8ff")) return true;                       // JPEG
  if (hex.startsWith("89504e470d0a1a0a")) return true;             // PNG
  if (hex.startsWith("52494646") && hex.slice(16, 24) === "57454250") return true; // RIFF...WEBP
  // AVIF / HEIF: ....ftyp + avif/avis brand
  const asc = String.fromCharCode(...buf);
  if (asc.includes("ftyp") && /avif|avis|mif1|heic/.test(asc)) return true;
  return false;
}

export default function ListingForm({
  sb, ownerId, existing, onSaved, onCancel,
}: {
  sb: SupabaseClient; ownerId: string; existing?: Row | null;
  onSaved: () => void; onCancel: () => void;
}) {
  const { t } = useLang();
  const e = existing;
  const [kind, setKind] = useState(e?.kind || "stay");
  const [category, setCategory] = useState(e?.category || "private");
  const [municipality, setMunicipality] = useState(e?.municipality || "");
  const [descSr, setDescSr] = useState(e?.desc_sr || "");
  const [photos, setPhotos] = useState<string[]>((e?.listing_images || []).map((i) => i.url));
  const [videos, setVideos] = useState<string[]>([e?.video_urls?.[0] || "", e?.video_urls?.[1] || "", e?.video_urls?.[2] || ""]);
  const [lat, setLat] = useState<number | undefined>(e?.lat ?? undefined);
  const [lng, setLng] = useState<number | undefined>(e?.lng ?? undefined);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [amenities, setAmenities] = useState<string[]>(e?.amenities || []);
  const [priceUnit, setPriceUnit] = useState(e?.price_unit || "night");
  const [structure, setStructure] = useState(e?.structure || "");
  const toggleAmenity = (k: string) => setAmenities((a) => a.includes(k) ? a.filter((x) => x !== k) : [...a, k]);
  const [err, setErr] = useState("");

  const descWords = wordCount(descSr);

  async function onFiles(ev: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(ev.target.files || []);
    ev.target.value = "";
    if (!files.length) return;
    setErr(""); setUploading(true);
    try {
      const next = [...photos];
      for (const file of files) {
        if (next.length >= MAX_PHOTOS) { setErr(`Maksimum ${MAX_PHOTOS} fotografija. / Max ${MAX_PHOTOS} photos.`); break; }
        if (!ALLOWED.includes(file.type)) { setErr(`Nedozvoljen tip fajla: ${file.name} (samo JPG, PNG, WEBP, AVIF).`); continue; }
        if (file.size > MAX_MB * 1024 * 1024) { setErr(`${file.name} je prevelik (> ${MAX_MB}MB).`); continue; }
        if (!(await sniffImage(file))) { setErr(`${file.name} nije ispravna slika (sadržaj fajla ne odgovara slici). / Not a valid image.`); continue; }
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
        const path = `${ownerId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await sb.storage.from("listing-photos").upload(path, file, { contentType: file.type, upsert: false });
        if (error) { setErr(error.message); continue; }
        const { data } = sb.storage.from("listing-photos").getPublicUrl(path);
        next.push(data.publicUrl);
      }
      setPhotos(next);
    } finally { setUploading(false); }
  }

  function removePhoto(url: string) { setPhotos(photos.filter((p) => p !== url)); }

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    const toArr = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);

    if (!get("name_sr") || !get("name_en")) { setErr(t("fo_required")); setBusy(false); return; }
    if (descWords < 500) { setErr(`Opis (srpski) mora imati bar 500 reči. Trenutno: ${descWords}. / Description must be at least 500 words.`); setBusy(false); return; }
    if (photos.length === 0) { setErr("Dodajte bar jednu fotografiju. / Add at least one photo."); setBusy(false); return; }

    const place = get("place");
    const row: any = {
      owner_id: ownerId,
      kind, category: kind === "stay" ? category : null,
      status: "pending",
      name_sr: get("name_sr"), name_en: get("name_en"),
      region_sr: place, region_en: place,
      municipality: municipality || null,
      short_sr: get("short_sr"), short_en: get("short_en"),
      desc_sr: descSr.trim(), desc_en: get("desc_en"),
      features_sr: toArr(get("features_sr")), features_en: toArr(get("features_en")),
      price: Number(get("price")) || 0, currency: "EUR",
      capacity: get("capacity") ? Number(get("capacity")) : null,
      min_nights: get("min_nights") ? Number(get("min_nights")) : null,
      min_nights_weekend: get("min_nights_weekend") ? Number(get("min_nights_weekend")) : null,
      deposit: get("deposit") ? Number(get("deposit")) : null,
      discount_weekly: get("discount_weekly") ? Number(get("discount_weekly")) : null,
      discount_monthly: get("discount_monthly") ? Number(get("discount_monthly")) : null,
      amenities, price_unit: priceUnit, structure: structure || null, area_m2: get("area_m2") ? Number(get("area_m2")) : null,
      hero_image: photos[0] || null,
      video_urls: videos.map((v) => v.trim()).filter(Boolean).slice(0, 3),
      lat: lat ?? null, lng: lng ?? null,
      google_place_id: get("google_place_id") || null,
    };

    try {
      let id = e?.id;
      if (id) {
        const { owner_id, ...upd } = row;
        void owner_id;
        const { error } = await sb.from("listings").update(upd).eq("id", id);
        if (error) throw error;
        await sb.from("listing_images").delete().eq("listing_id", id);
      } else {
        const { data, error } = await sb.from("listings").insert(row).select("id").single();
        if (error) throw error;
        id = data!.id;
      }
      if (photos.length && id) {
        await sb.from("listing_images").insert(photos.map((url, i) => ({ listing_id: id, url, sort: i })));
      }
      onSaved();
    } catch (e2: any) { setErr(e2?.message || "Error"); } finally { setBusy(false); }
  }

  const field = (name: string, label: string, val?: string, type = "text") => (
    <div className="field"><label>{label}</label><input name={name} type={type} defaultValue={val || ""} /></div>
  );

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 14, marginTop: 16 }}>
      <div className="field-row">
        <div className="field"><label>{t("fo_kind")}</label>
          <select value={kind} onChange={(ev) => setKind(ev.target.value)}>
            <option value="stay">{t("nav_stays")}</option>
            <option value="mountain">{t("nav_mountains")}</option>
            <option value="lake">{t("nav_lakes")}</option>
            <option value="spa">{t("nav_spas")}</option>
            <option value="ethno">{t("nav_ethno")}</option>
          </select>
        </div>
        {kind === "stay" && (
          <div className="field"><label>{t("fo_subcat")}</label>
            <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
              <option value="private">{t("cat_private")}</option>
              <option value="hotel">{t("cat_hotel")}</option>
            </select>
          </div>
        )}
      </div>

      <div className="field-row">{field("name_sr", t("fo_name"), e?.name_sr)}{field("name_en", t("fo_name_en"), e?.name_en)}</div>

      <div className="field-row">
        <div className="field"><label>Opština / Municipality</label>
          <select value={municipality} onChange={(ev) => setMunicipality(ev.target.value)}>
            <option value="">— izaberite / select —</option>
            {SERBIA_MUNICIPALITIES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Mesto / naselje (Place)</label>
          <input name="place" defaultValue={e?.region_sr || ""} list="rs-places" autoComplete="off" placeholder="počnite da kucate… / start typing…"
            onChange={(ev) => { const m = SETTLEMENT_MUNI[ev.target.value]; if (m && SERBIA_MUNICIPALITIES.includes(m)) setMunicipality(m); }} />
          <datalist id="rs-places">{SETTLEMENTS.map((pl) => <option key={pl} value={pl} />)}</datalist>
        </div>
      </div>

      <div className="field-row">{field("short_sr", t("fo_short"), e?.short_sr)}{field("short_en", t("fo_short_en"), e?.short_en)}</div>

      <div className="field">
        <label>{t("fo_desc")} — <span style={{ color: descWords >= 500 ? "var(--green-600)" : "var(--danger)" }}>{descWords} / 500 reči</span></label>
        <textarea rows={8} value={descSr} onChange={(ev) => setDescSr(ev.target.value)} />
      </div>
      <div className="field"><label>{t("fo_desc_en")}</label><textarea name="desc_en" rows={5} defaultValue={e?.desc_en || ""} /></div>

      <div className="field-row">{field("features_sr", t("fo_features"), (e?.features_sr || []).join(", "))}{field("features_en", t("fo_features_en"), (e?.features_en || []).join(", "))}</div>
      <div className="field-row">{field("price", t("fo_price"), e?.price ? String(e.price) : "", "number")}{field("capacity", t("fo_capacity"), e?.capacity ? String(e.capacity) : "", "number")}{field("area_m2", "Kvadratura m² / Area m²", e?.area_m2 ? String(e.area_m2) : "", "number")}</div>

      {/* Pravila smeštaja / House rules */}
      <h4 style={{ margin: "10px 0 2px", color: "var(--ink)" }}>Pravila rezervacije / Booking rules</h4>
      <div className="field-row">
        {field("min_nights", "Min. noćenja (radni dani) / Min nights (weekday)", e?.min_nights ? String(e.min_nights) : "", "number")}
        {field("min_nights_weekend", "Min. noćenja (vikend) / Min nights (weekend)", e?.min_nights_weekend ? String(e.min_nights_weekend) : "", "number")}
      </div>
      <div className="field-row">
        {field("deposit", "Depozit € (opciono) / Deposit € (optional)", e?.deposit ? String(e.deposit) : "", "number")}
        {field("discount_weekly", "Popust 7+ noćenja % / Weekly discount %", e?.discount_weekly ? String(e.discount_weekly) : "", "number")}
        {field("discount_monthly", "Popust 28+ noćenja % / Monthly discount %", e?.discount_monthly ? String(e.discount_monthly) : "", "number")}
      </div>

      <div className="field-row">
        <div className="field"><label>Jedinica cene / Price unit</label>
          <select value={priceUnit} onChange={(ev) => setPriceUnit(ev.target.value)}>
            {PRICE_UNITS.map((u) => <option key={u.key} value={u.key}>{u.sr} / {u.en}</option>)}
          </select>
        </div>
        <div className="field"><label>Struktura / Structure (za apartmane)</label>
          <select value={structure} onChange={(ev) => setStructure(ev.target.value)}>
            <option value="">—</option>
            {STRUCTURES.map((st) => <option key={st.key} value={st.key}>{st.sr} / {st.en}</option>)}
          </select>
        </div>
      </div>

      {/* Pogodnosti */}
      <div className="field"><label>Pogodnosti / Amenities</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))", gap: 6, marginTop: 6 }}>
          {AMENITIES.map((a) => (
            <label key={a.key} style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 400, cursor: "pointer" }}>
              <input type="checkbox" checked={amenities.includes(a.key)} onChange={() => toggleAmenity(a.key)} style={{ width: "auto" }} />
              <span>{a.icon} {a.sr}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Photos */}
      <div className="field">
        <label>Fotografije / Photos ({photos.length}/{MAX_PHOTOS}) — JPG, PNG, WEBP, AVIF · max {MAX_MB}MB</label>
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={onFiles} disabled={uploading || photos.length >= MAX_PHOTOS} />
        {uploading && <span style={{ fontSize: ".85rem", color: "var(--slate)" }}>Otpremanje… / Uploading…</span>}
        {photos.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(90px,1fr))", gap: 8, marginTop: 8 }}>
            {photos.map((u) => (
              <div key={u} style={{ position: "relative" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="" style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 8, border: "1px solid var(--line)" }} />
                <button type="button" onClick={() => removePhoto(u)} style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,.6)", color: "#fff", borderRadius: "50%", width: 22, height: 22 }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* YouTube */}
      <div className="field">
        <label>YouTube video linkovi (do 3 / up to 3)</label>
        {[0, 1, 2].map((i) => (
          <input key={i} value={videos[i]} placeholder="https://youtube.com/watch?v=..." style={{ marginTop: 6 }}
            onChange={(ev) => { const v = [...videos]; v[i] = ev.target.value; setVideos(v); }} />
        ))}
      </div>

      {/* Map */}
      <div className="field">
        <label>Lokacija na mapi / Map location {lat && lng ? `(${lat}, ${lng})` : "— kliknite na mapu / click the map"}</label>
        <LocationPicker lat={lat} lng={lng} onChange={(la, ln) => { setLat(la); setLng(ln); }} />
      </div>

      <div className="field">
        <label>Google Place ID (opciono / optional) — za prikaz Google recenzija</label>
        <input name="google_place_id" defaultValue={e?.google_place_id || ""} placeholder="ChIJ..." />
        <span style={{ fontSize: ".8rem", color: "var(--slate)" }}>Pronađite na: developers.google.com/maps/documentation/places/web-service/place-id</span>
      </div>
      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn--primary" type="submit" disabled={busy || uploading}>{busy ? "..." : t("fo_save")}</button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>{t("fo_cancel")}</button>
      </div>
    </form>
  );
}
