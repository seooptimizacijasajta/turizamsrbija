"use client";
import { useState } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { useLang } from "@/lib/i18n";

type Row = {
  id?: string;
  kind: string;
  category: string | null;
  name_sr: string; name_en: string;
  region_sr: string; region_en: string;
  short_sr: string; short_en: string;
  desc_sr: string; desc_en: string;
  features_sr: string[]; features_en: string[];
  price: number; capacity: number | null;
  hero_image: string;
  listing_images?: { url: string; sort: number }[];
};

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
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const gallery0 = (e?.listing_images || []).map((i) => i.url).join("\n");

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const get = (k: string) => String(f.get(k) || "").trim();
    if (!get("name_sr") || !get("name_en")) { setErr(t("fo_required")); setBusy(false); return; }

    const toArr = (s: string) => s.split(",").map((x) => x.trim()).filter(Boolean);
    const row: any = {
      owner_id: ownerId,
      kind,
      category: kind === "stay" ? category : null,
      status: "pending",
      name_sr: get("name_sr"), name_en: get("name_en"),
      region_sr: get("region_sr"), region_en: get("region_en"),
      short_sr: get("short_sr"), short_en: get("short_en"),
      desc_sr: get("desc_sr"), desc_en: get("desc_en"),
      features_sr: toArr(get("features_sr")), features_en: toArr(get("features_en")),
      price: Number(get("price")) || 0,
      currency: "EUR",
      capacity: get("capacity") ? Number(get("capacity")) : null,
      hero_image: get("hero_image") || null,
    };
    const gallery = get("gallery").split(/\n+/).map((x) => x.trim()).filter(Boolean);

    try {
      let listingId = e?.id;
      if (listingId) {
        const { error } = await sb.from("listings").update(row).eq("id", listingId);
        if (error) throw error;
        await sb.from("listing_images").delete().eq("listing_id", listingId);
      } else {
        const { data, error } = await sb.from("listings").insert(row).select("id").single();
        if (error) throw error;
        listingId = data!.id;
      }
      if (gallery.length && listingId) {
        await sb.from("listing_images").insert(
          gallery.map((url, i) => ({ listing_id: listingId, url, sort: i }))
        );
      }
      onSaved();
    } catch (e2: any) {
      setErr(e2?.message || "Error");
    } finally { setBusy(false); }
  }

  const field = (name: string, label: string, val?: string, type = "text") => (
    <div className="field">
      <label>{label}</label>
      <input name={name} type={type} defaultValue={val || ""} />
    </div>
  );
  const area = (name: string, label: string, val?: string) => (
    <div className="field">
      <label>{label}</label>
      <textarea name={name} rows={3} defaultValue={val || ""} />
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <div className="field-row">
        <div className="field">
          <label>{t("fo_kind")}</label>
          <select value={kind} onChange={(ev) => setKind(ev.target.value)}>
            <option value="stay">{t("nav_stays")}</option>
            <option value="mountain">{t("nav_mountains")}</option>
            <option value="lake">{t("nav_lakes")}</option>
            <option value="spa">{t("nav_spas")}</option>
            <option value="ethno">{t("nav_ethno")}</option>
          </select>
        </div>
        {kind === "stay" && (
          <div className="field">
            <label>{t("fo_subcat")}</label>
            <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
              <option value="private">{t("cat_private")}</option>
              <option value="hotel">{t("cat_hotel")}</option>
            </select>
          </div>
        )}
      </div>
      <div className="field-row">{field("name_sr", t("fo_name"), e?.name_sr)}{field("name_en", t("fo_name_en"), e?.name_en)}</div>
      <div className="field-row">{field("region_sr", t("fo_region"), e?.region_sr)}{field("region_en", t("fo_region_en"), e?.region_en)}</div>
      <div className="field-row">{field("short_sr", t("fo_short"), e?.short_sr)}{field("short_en", t("fo_short_en"), e?.short_en)}</div>
      {area("desc_sr", t("fo_desc"), e?.desc_sr)}
      {area("desc_en", t("fo_desc_en"), e?.desc_en)}
      <div className="field-row">{field("features_sr", t("fo_features"), (e?.features_sr || []).join(", "))}{field("features_en", t("fo_features_en"), (e?.features_en || []).join(", "))}</div>
      <div className="field-row">{field("price", t("fo_price"), e?.price ? String(e.price) : "", "number")}{field("capacity", t("fo_capacity"), e?.capacity ? String(e.capacity) : "", "number")}</div>
      {field("hero_image", t("fo_hero"), e?.hero_image)}
      {area("gallery", t("fo_gallery"), gallery0)}
      {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
      <div style={{ display: "flex", gap: 10 }}>
        <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? "..." : t("fo_save")}</button>
        <button className="btn btn--outline" type="button" onClick={onCancel}>{t("fo_cancel")}</button>
      </div>
    </form>
  );
}
