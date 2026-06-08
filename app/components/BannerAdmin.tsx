"use client";
import { useCallback, useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";

const POSITIONS = ["top", "sidebar", "bottom", "inlist"];
const KINDS = ["mountain", "lake", "spa", "ethno", "stay"];

export default function BannerAdmin() {
  const sb = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState("top");

  const load = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("banners").select("*").order("position").order("sort");
    setRows(data || []);
  }, [sb]);

  const checkAdmin = useCallback(async (id: string) => {
    if (!sb) return;
    const { data } = await sb.from("profiles").select("role").eq("id", id).single();
    const admin = data?.role === "admin";
    setIsAdmin(admin);
    if (admin) load();
  }, [sb, load]);

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      setUid(u?.id || null); setReady(true);
      if (u) checkAdmin(u.id);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => {
      const u = s?.user; setUid(u?.id || null);
      if (u) checkAdmin(u.id); else { setIsAdmin(false); setRows([]); }
    });
    return () => sub.subscription.unsubscribe();
  }, [sb, checkAdmin]);

  async function login(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); if (!sb) return; setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const { error } = await sb.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")) });
    if (error) setErr(error.message);
    setBusy(false);
  }

  async function save(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); if (!sb) return; setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const row: any = {
      position: pos,
      kind: pos === "inlist" && f.get("kind") ? String(f.get("kind")) : null,
      title: String(f.get("title") || "") || null,
      image_url: String(f.get("image_url") || "").trim(),
      link_url: String(f.get("link_url") || "").trim(),
      sort: Number(f.get("sort")) || 0,
      active: f.get("active") === "on",
    };
    try {
      if (!row.image_url || !row.link_url) throw new Error("Image URL and Link URL are required.");
      if (editing?.id) { const { error } = await sb.from("banners").update(row).eq("id", editing.id); if (error) throw error; }
      else { const { error } = await sb.from("banners").insert(row); if (error) throw error; }
      setShowForm(false); setEditing(null); load();
    } catch (e: any) { setErr(e.message || "Error"); } finally { setBusy(false); }
  }

  async function del(id: string) {
    if (!sb || !confirm("Obrisati baner? / Delete banner?")) return;
    await sb.from("banners").delete().eq("id", id); load();
  }
  async function toggle(b: any) {
    if (!sb) return;
    await sb.from("banners").update({ active: !b.active }).eq("id", b.id); load();
  }

  if (!ready) return <div className="container" style={{ padding: "60px 0" }}>…</div>;
  if (!sb) return <div className="container" style={{ padding: "60px 0" }}><h1>Admin</h1><p>Supabase not configured.</p></div>;

  if (!uid) {
    return (
      <div className="container admin-wrap" style={{ padding: "56px 0" }}>
        <h1>Admin — prijava / login</h1>
        <div className="booking" style={{ position: "static", marginTop: 16 }}>
          <form onSubmit={login}>
            <div className="field"><label>Email</label><input required type="email" name="email" /></div>
            <div className="field"><label>Lozinka / Password</label><input required type="password" name="password" /></div>
            <button className="btn btn--primary btn--block" disabled={busy} type="submit">Prijava / Log in</button>
          </form>
          {err && <p className="booking-note" style={{ color: "var(--danger)" }}>{err}</p>}
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container admin-wrap" style={{ padding: "56px 0" }}>
        <h1>Admin</h1>
        <p style={{ color: "var(--slate)", marginTop: 10 }}>
          Vaš nalog nije administrator. / Your account is not an admin.
        </p>
        <p style={{ color: "var(--slate)", fontSize: ".9rem", marginTop: 8 }}>
          (Postavite <code>role = &apos;admin&apos;</code> za vaš nalog u Supabase tabeli <code>profiles</code>.)
        </p>
      </div>
    );
  }

  const e = editing;
  return (
    <div className="container admin-wrap" style={{ padding: "48px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <h1>Baneri / Banners</h1>
        {!showForm && <button className="btn btn--primary" onClick={() => { setEditing(null); setPos("top"); setShowForm(true); }}>+ Dodaj baner / Add banner</button>}
      </div>

      {showForm && (
        <form onSubmit={save} className="booking" style={{ position: "static", marginTop: 18, display: "grid", gap: 12 }}>
          <div className="field-row">
            <div className="field"><label>Pozicija / Position</label>
              <select value={pos} onChange={(ev) => setPos(ev.target.value)} name="position">
                {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            {pos === "inlist" && (
              <div className="field"><label>Kategorija / Category</label>
                <select name="kind" defaultValue={e?.kind || ""}>
                  <option value="">— sve / all —</option>
                  {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            )}
          </div>
          <div className="field"><label>Naslov / Title (opciono)</label><input name="title" defaultValue={e?.title || ""} /></div>
          <div className="field"><label>Slika URL / Image URL</label><input name="image_url" defaultValue={e?.image_url || ""} placeholder="https://..." /></div>
          <div className="field"><label>Link URL (cilj / target)</label><input name="link_url" defaultValue={e?.link_url || ""} placeholder="https://..." /></div>
          <div className="field-row">
            <div className="field"><label>Redosled / Sort (0 = prvi/first)</label><input type="number" name="sort" defaultValue={e?.sort ?? 0} /></div>
            <div className="field" style={{ justifyContent: "flex-end" }}>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="checkbox" name="active" defaultChecked={e ? e.active : true} style={{ width: "auto" }} /> Aktivno / Active
              </label>
            </div>
          </div>
          {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn--primary" disabled={busy} type="submit">Sačuvaj / Save</button>
            <button className="btn btn--outline" type="button" onClick={() => { setShowForm(false); setEditing(null); }}>Otkaži / Cancel</button>
          </div>
        </form>
      )}

      {!showForm && (
        <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
          {rows.length === 0 ? <div className="empty">Još nema banera. / No banners yet.</div> :
            rows.map((b) => (
              <div key={b.id} className="admin-row">
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="admin-thumb" src={b.image_url} alt="" />
                  <div>
                    <strong>{b.position}{b.kind ? ` · ${b.kind}` : ""}</strong> <span style={{ color: "var(--slate)", fontSize: ".82rem" }}>#{b.sort}</span>
                    <div style={{ fontSize: ".82rem", color: b.active ? "var(--green-600)" : "var(--slate)" }}>{b.active ? "aktivno / active" : "neaktivno / inactive"}</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button className="btn btn--outline" onClick={() => toggle(b)}>{b.active ? "Off" : "On"}</button>
                  <button className="btn btn--outline" onClick={() => { setEditing(b); setPos(b.position); setShowForm(true); }}>Izmeni / Edit</button>
                  <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => del(b.id)}>Obriši / Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
