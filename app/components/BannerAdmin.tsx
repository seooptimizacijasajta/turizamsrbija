"use client";
import { useCallback, useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { slugify } from "@/lib/slug";
import Turnstile from "./Turnstile";

const POSITIONS = ["top", "sidebar", "bottom", "inlist"];
const KINDS = ["mountain", "lake", "river", "spa", "ethno", "stay"];

export default function BannerAdmin() {
  const sb = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [uid, setUid] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<"stats" | "banners" | "reviews" | "blog" | "leads" | "users" | "newsletter" | "bookings" | "utisci">("stats");
  const [users, setUsers] = useState<any[]>([]);
  const [uListings, setUListings] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [subs, setSubs] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [commPct, setCommPct] = useState("10");
  const [showBk, setShowBk] = useState(false);
  const [testis, setTestis] = useState<any[]>([]);
  const [feedbk, setFeedbk] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [postEditing, setPostEditing] = useState<any>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [pos, setPos] = useState("top");
  const [captchaToken, setCaptchaToken] = useState<string>("");

  const load = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("banners").select("*").order("position").order("sort");
    setRows(data || []);
  }, [sb]);
  const loadReviews = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("reviews").select("*, listings(name_sr)").order("created_at", { ascending: false });
    setReviews(data || []);
  }, [sb]);
  const loadPosts = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("posts").select("*").order("created_at", { ascending: false });
    setPosts(data || []);
  }, [sb]);
  const loadLeads = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("marketing_leads").select("*").order("created_at", { ascending: false });
    setLeads(data || []);
  }, [sb]);
  const loadSubs = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("newsletter").select("*").order("created_at", { ascending: false });
    setSubs(data || []);
  }, [sb]);
  const loadBookings = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("bookings").select("*, listings(name_sr, owner_id)").order("created_at", { ascending: false });
    setBookings(data || []);
  }, [sb]);
  const loadTestis = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("testimonials").select("*").order("created_at", { ascending: false });
    setTestis(data || []);
  }, [sb]);
  const loadFeedback = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("feedback").select("*").order("created_at", { ascending: false });
    setFeedbk(data || []);
  }, [sb]);
  async function approveTesti(id: string) { if (!sb) return; await sb.from("testimonials").update({ status: "approved" }).eq("id", id); loadTestis(); }
  async function delTesti(id: string) { if (!sb || !confirm("Obrisati utisak? / Delete review?")) return; await sb.from("testimonials").delete().eq("id", id); loadTestis(); }
  async function toggleFb(f: any) { if (!sb) return; await sb.from("feedback").update({ handled: !f.handled }).eq("id", f.id); loadFeedback(); }
  async function delFb(id: string) { if (!sb || !confirm("Obrisati predlog? / Delete feedback?")) return; await sb.from("feedback").delete().eq("id", id); loadFeedback(); }
  const loadSettings = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.from("settings").select("value").eq("key", "commission_pct").maybeSingle();
    if (data?.value) setCommPct(data.value);
  }, [sb]);
  async function saveCommPct() {
    if (!sb) return;
    await sb.from("settings").upsert({ key: "commission_pct", value: String(Number(commPct) || 0) });
    alert("Provizija sačuvana / Saved");
  }
  async function addBooking(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!sb) return;
    const f = new FormData(ev.currentTarget);
    const g = (k: string) => String(f.get(k) || "").trim();
    const amt = Number(g("amount")) || 0;
    const pct = Number(commPct) || 0;
    const { error } = await sb.from("bookings").insert({
      listing_id: g("listing_id"), guest_name: g("guest_name") || null, email: g("email") || null, phone: g("phone") || null,
      checkin: g("checkin") || null, checkout: g("checkout") || null, amount: amt, currency: "EUR",
      commission_pct: pct, commission_amount: Math.round(amt * pct) / 100, host_paid: false,
    });
    if (error) { alert(error.message); return; }
    setShowBk(false); loadBookings();
  }
  async function toggleHostPaid(b: any) {
    if (!sb) return;
    await sb.from("bookings").update({ host_paid: !b.host_paid }).eq("id", b.id); loadBookings();
  }
  async function delBooking(id: string) {
    if (!sb || !confirm("Obrisati rezervaciju? / Delete booking?")) return;
    await sb.from("bookings").delete().eq("id", id); loadBookings();
  }
  const loadUsers = useCallback(async () => {
    if (!sb) return;
    const { data } = await sb.rpc("admin_users");
    setUsers(data || []);
    const { data: ls } = await sb.from("listings").select("id,name_sr,owner_id,status,kind,bold,featured,featured_home").order("created_at", { ascending: false });
    setUListings(ls || []);
  }, [sb]);
  const loadStats = useCallback(async () => {
    if (!sb) return;
    const c = async (table: string, f?: (q: any) => any) => { let q = sb.from(table).select("*", { count: "exact", head: true }); if (f) q = f(q); const { count } = await q; return count || 0; };
    setStats({
      listings: await c("listings"),
      listingsPending: await c("listings", (q) => q.eq("status", "pending")),
      inquiries: await c("inquiries"),
      reviews: await c("reviews"),
      reviewsPending: await c("reviews", (q) => q.eq("status", "pending")),
      subscribers: await c("newsletter"),
      posts: await c("posts"),
      leads: await c("marketing_leads"),
    });
  }, [sb]);
  async function savePost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); if (!sb) return; setErr("");
    const f = new FormData(ev.currentTarget);
    const title_sr = String(f.get("title_sr") || "").trim();
    let slug = String(f.get("slug") || "").trim() || slugify(title_sr);
    const row: any = { slug, title_sr, title_en: String(f.get("title_en") || "") || null,
      excerpt_sr: String(f.get("excerpt_sr") || "") || null, excerpt_en: String(f.get("excerpt_en") || "") || null,
      body_sr: String(f.get("body_sr") || "") || null, body_en: String(f.get("body_en") || "") || null,
      cover_image: String(f.get("cover_image") || "") || null, status: String(f.get("status") || "draft") };
    try {
      if (postEditing?.id) { const { error } = await sb.from("posts").update(row).eq("id", postEditing.id); if (error) throw error; }
      else { const { error } = await sb.from("posts").insert(row); if (error) throw error; }
      setShowPostForm(false); setPostEditing(null); loadPosts();
    } catch (e: any) { setErr(e.message || "Error"); }
  }
  async function delPost(id: string) { if (!sb || !confirm("Obrisati post? / Delete post?")) return; await sb.from("posts").delete().eq("id", id); loadPosts(); }

  const checkAdmin = useCallback(async (id: string) => {
    if (!sb) return;
    const { data } = await sb.from("profiles").select("role").eq("id", id).single();
    const admin = data?.role === "admin";
    setIsAdmin(admin);
    if (admin) { load(); loadReviews(); loadPosts(); loadStats(); loadLeads(); loadUsers(); loadSubs(); loadBookings(); loadSettings(); loadTestis(); loadFeedback(); }
  }, [sb, load, loadReviews, loadPosts, loadStats, loadLeads, loadUsers]);

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(({ data }) => {
      const u = data.session?.user; setUid(u?.id || null); setReady(true);
      if (u) checkAdmin(u.id);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => {
      const u = s?.user; setUid(u?.id || null);
      if (u) checkAdmin(u.id); else { setIsAdmin(false); setRows([]); setReviews([]); }
    });
    return () => sub.subscription.unsubscribe();
  }, [sb, checkAdmin]);

  async function login(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault(); if (!sb) return; setErr(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const { error } = await sb.auth.signInWithPassword({ email: String(f.get("email")), password: String(f.get("password")), options: captchaToken ? { captchaToken } : undefined });
    if (error) setErr(error.message); setBusy(false);
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
  async function del(id: string) { if (!sb || !confirm("Obrisati baner? / Delete banner?")) return; await sb.from("banners").delete().eq("id", id); load(); }
  async function toggle(b: any) { if (!sb) return; await sb.from("banners").update({ active: !b.active }).eq("id", b.id); load(); }

  async function approveReview(r: any) {
    if (!sb) return;
    await sb.from("reviews").update({ status: "approved" }).eq("id", r.id);
    const { data } = await sb.from("reviews").select("rating").eq("listing_id", r.listing_id).eq("status", "approved");
    const arr = data || []; const avg = arr.length ? arr.reduce((s: number, x: any) => s + x.rating, 0) / arr.length : 0;
    await sb.from("listings").update({ rating: Number(avg.toFixed(1)) }).eq("id", r.listing_id);
    loadReviews();
  }
  async function rejectReview(r: any) { if (!sb) return; await sb.from("reviews").update({ status: "rejected" }).eq("id", r.id); loadReviews(); }
  async function delReview(r: any) { if (!sb || !confirm("Obrisati? / Delete?")) return; await sb.from("reviews").delete().eq("id", r.id); loadReviews(); }

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
            <Turnstile onToken={setCaptchaToken} />
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
        <p style={{ color: "var(--slate)", marginTop: 10 }}>Vaš nalog nije administrator. / Your account is not an admin.</p>
      </div>
    );
  }

  const e = editing;
  const tabBtn = (id: "stats" | "banners" | "reviews" | "blog" | "leads" | "users" | "newsletter" | "bookings" | "utisci", label: string) => (
    <button className={"btn " + (tab === id ? "btn--primary" : "btn--outline")} onClick={() => setTab(id)}>{label}</button>
  );

  return (
    <div className="container admin-wrap" style={{ padding: "40px 0" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {tabBtn("stats", "Statistika")}
        {tabBtn("banners", "Baneri / Banners")}
        {tabBtn("reviews", `Recenzije / Reviews${reviews.filter((r) => r.status === "pending").length ? " (" + reviews.filter((r) => r.status === "pending").length + ")" : ""}`)}
        {tabBtn("blog", "Blog")}
        {tabBtn("leads", `Marketing upiti / Leads${leads.length ? " (" + leads.length + ")" : ""}`)}
        {tabBtn("users", `Korisnici / Users${users.length ? " (" + users.length + ")" : ""}`)}
        {tabBtn("newsletter", `Newsletter${subs.length ? " (" + subs.length + ")" : ""}`)}
        {tabBtn("bookings", `Rezervacije${bookings.length ? " (" + bookings.length + ")" : ""}`)}
        {tabBtn("utisci", `Utisci${testis.filter((x) => x.status !== "approved").length ? " (" + testis.filter((x) => x.status !== "approved").length + ")" : ""}`)}
        <a href="/predracun" className="btn btn--outline" style={{ marginLeft: "auto" }}>🧾 Predračun</a>
      </div>

      {tab === "stats" && (
        <div>
          <h1 style={{ marginBottom: 20 }}>Statistika</h1>
          {!stats ? <div className="empty">Učitavanje… / Loading…</div> : (
            <div className="stats">
              <div className="stat"><b>{stats.listings}</b><span>Smeštaja / Listings</span></div>
              <div className="stat"><b style={{ color: stats.listingsPending ? "var(--sun)" : undefined }}>{stats.listingsPending}</b><span>Na čekanju / Pending</span></div>
              <div className="stat"><b>{stats.inquiries}</b><span>Upita / Inquiries</span></div>
              <div className="stat"><b>{stats.reviews}</b><span>Recenzija / Reviews</span></div>
              <div className="stat"><b style={{ color: stats.reviewsPending ? "var(--sun)" : undefined }}>{stats.reviewsPending}</b><span>Recenzije na čekanju</span></div>
              <div className="stat"><b>{stats.subscribers}</b><span>Newsletter prijava</span></div>
              <div className="stat"><b>{stats.posts}</b><span>Blog postova / Posts</span></div>
              <div className="stat"><b style={{ color: stats.leads ? "var(--green-600)" : undefined }}>{stats.leads}</b><span>Marketing upiti / Leads</span></div>
            </div>
          )}
        </div>
      )}

      {tab === "users" && (
        <div>
          <h1>Korisnici / Registered users</h1>
          {users.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Učitavanje… / Loading…</div> : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {users.map((u) => {
                const mine = uListings.filter((l) => l.owner_id === u.id);
                return (
                  <div key={u.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <strong>{u.email || "(bez email-a)"}</strong>{u.role === "admin" ? " · ADMIN" : ""}
                        <div style={{ color: "var(--slate)", fontSize: ".85rem" }}>
                          {u.full_name ? u.full_name + " · " : ""}{u.phone ? <a href={`tel:${u.phone}`}>{u.phone}</a> : "bez telefona"}{" · "}
                          {Number(u.listings)} oglasa · {Number(u.products)} proizvoda · od {new Date(u.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      {u.email && <a className="btn btn--outline" href={`mailto:${u.email}`} style={{ fontSize: ".8rem" }}>Email</a>}
                    </div>
                    {mine.length > 0 && (
                      <ul style={{ margin: "10px 0 0", paddingLeft: 18, fontSize: ".88rem" }}>
                        {mine.map((l) => (
                          <li key={l.id} style={{ marginBottom: 2 }}>
                            {l.name_sr} <span style={{ color: "var(--slate)" }}>· {l.status}</span>
                            {l.bold ? " · Bold" : ""}{l.featured ? " · ★Kat" : ""}{l.featured_home ? " · ★Poč" : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "leads" && (
        <div>
          <h1>Marketing upiti / Advertising leads</h1>
          {leads.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema upita. / No leads yet.</div> : (
            <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
              {leads.map((x) => (
                <div key={x.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                    <strong>{x.name}{x.business_type ? ` · ${x.business_type}` : ""}</strong>
                    <span style={{ color: "var(--slate)", fontSize: ".82rem" }}>{new Date(x.created_at).toLocaleString()}</span>
                  </div>
                  <div style={{ fontSize: ".9rem", marginTop: 4 }}>
                    {x.email && <a href={`mailto:${x.email}`}>{x.email}</a>}{x.email && x.phone ? " · " : ""}
                    {x.phone && <a href={`tel:${x.phone}`}>{x.phone}</a>}
                    {x.package ? ` · ${x.package}` : ""}
                  </div>
                  {x.message && <p style={{ marginTop: 8, color: "var(--ink)" }}>{x.message}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === "newsletter" && (
        <div>
          <h1>Newsletter pretplatnici / Subscribers ({subs.length})</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
            <button className="btn btn--outline" onClick={() => { navigator.clipboard?.writeText(subs.map((s) => s.email).join(", ")); alert("Kopirano! / Copied!"); }}>Kopiraj sve mejlove / Copy all</button>
            <button className="btn btn--outline" onClick={() => { const csv = "email,lang,created_at\n" + subs.map((s) => `${s.email},${s.lang || ""},${s.created_at}`).join("\n"); const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv); a.download = "newsletter.csv"; a.click(); }}>Preuzmi CSV / Download CSV</button>
          </div>
          {subs.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema prijava. / No subscribers yet.</div> : (
            <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
              {subs.map((s) => (
                <div key={s.id} style={{ display: "flex", justifyContent: "space-between", gap: 10, border: "1px solid var(--line)", borderRadius: 8, padding: "8px 12px", flexWrap: "wrap" }}>
                  <a href={`mailto:${s.email}`}>{s.email}</a>
                  <span style={{ color: "var(--slate)", fontSize: ".82rem" }}>{(s.lang || "sr").toUpperCase()} · {new Date(s.created_at).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {tab === "bookings" && (
        <div>
          <h1>Rezervacije i provizija / Bookings &amp; commission</h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", margin: "12px 0" }}>
            <label style={{ fontSize: ".9rem" }}>Provizija % (globalno):</label>
            <input type="number" min={0} step="0.5" value={commPct} onChange={(e) => setCommPct(e.target.value)} style={{ width: 90 }} />
            <button className="btn btn--outline" onClick={saveCommPct}>Sačuvaj % / Save</button>
            {!showBk && <button className="btn btn--primary" onClick={() => setShowBk(true)}>+ Dodaj rezervaciju</button>}
          </div>
          {showBk && (
            <form onSubmit={addBooking} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: 16, display: "grid", gap: 10, marginBottom: 16 }}>
              <div className="field"><label>Smeštaj / Listing</label>
                <select name="listing_id" required defaultValue="">
                  <option value="" disabled>— izaberi / select —</option>
                  {uListings.filter((l) => l.kind === "stay").map((l) => <option key={l.id} value={l.id}>{l.name_sr}</option>)}
                </select>
              </div>
              <div className="field-row">
                <div className="field"><label>Dolazak / Check-in</label><input type="date" name="checkin" required /></div>
                <div className="field"><label>Odlazak / Check-out</label><input type="date" name="checkout" required /></div>
                <div className="field"><label>Iznos € / Amount</label><input type="number" name="amount" min={0} step="0.01" required /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Gost / Guest</label><input name="guest_name" /></div>
                <div className="field"><label>Email</label><input name="email" type="email" /></div>
                <div className="field"><label>Telefon</label><input name="phone" /></div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn--primary" type="submit">Sačuvaj rezervaciju</button>
                <button className="btn btn--outline" type="button" onClick={() => setShowBk(false)}>Otkaži</button>
              </div>
            </form>
          )}
          {(() => {
            const owed: Record<string, { name: string; sum: number }> = {};
            bookings.filter((b) => !b.host_paid).forEach((b) => {
              const oid = b.listings?.owner_id || "?";
              const u = users.find((x: any) => x.id === oid);
              if (!owed[oid]) owed[oid] = { name: u?.email || oid, sum: 0 };
              owed[oid].sum += Number(b.commission_amount) || 0;
            });
            const rows = Object.values(owed);
            return rows.length ? (
              <div style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, background: "#f0f8f4" }}>
                <strong>Neplaćena provizija po domaćinu / Unpaid by host:</strong>
                <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>{rows.map((r, i) => <li key={i}>{r.name}: <b>€{r.sum.toFixed(2)}</b></li>)}</ul>
              </div>
            ) : null;
          })()}
          {bookings.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema rezervacija. / No bookings yet.</div> : (
            <div style={{ display: "grid", gap: 10 }}>
              {bookings.map((b) => {
                const u = users.find((x: any) => x.id === b.listings?.owner_id);
                return (
                  <div key={b.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <strong>{b.listings?.name_sr || "—"}</strong> <span style={{ color: "var(--slate)", fontSize: ".82rem" }}>· domaćin: {u?.email || "—"}</span>
                      <div style={{ fontSize: ".88rem", marginTop: 4 }}>{b.checkin} → {b.checkout} · €{Number(b.amount || 0).toFixed(2)} · provizija {b.commission_pct}% = <b>€{Number(b.commission_amount || 0).toFixed(2)}</b></div>
                      <div style={{ marginTop: 4, fontSize: ".85rem" }}>{b.host_paid ? <span style={{ color: "var(--green-600)" }}>✓ provizija plaćena</span> : <span style={{ color: "var(--danger)" }}>duguje proviziju</span>}</div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                      <button className="btn btn--outline" onClick={() => toggleHostPaid(b)}>{b.host_paid ? "Označi neplaćeno" : "Označi plaćeno"}</button>
                      <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delBooking(b.id)}>Obriši</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {tab === "banners" && (<>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <h1>Baneri / Banners</h1>
          {!showForm && <button className="btn btn--primary" onClick={() => { setEditing(null); setPos("top"); setShowForm(true); }}>+ Dodaj / Add</button>}
        </div>
        {showForm && (
          <form onSubmit={save} className="booking" style={{ position: "static", marginTop: 18, display: "grid", gap: 12 }}>
            <div className="field-row">
              <div className="field"><label>Pozicija / Position</label>
                <select value={pos} onChange={(ev) => setPos(ev.target.value)}>{POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}</select>
              </div>
              {pos === "inlist" && (
                <div className="field"><label>Kategorija / Category</label>
                  <select name="kind" defaultValue={e?.kind || ""}><option value="">— sve / all —</option>{KINDS.map((k) => <option key={k} value={k}>{k}</option>)}</select>
                </div>
              )}
            </div>
            <div className="field"><label>Naslov / Title</label><input name="title" defaultValue={e?.title || ""} /></div>
            <div className="field"><label>Slika URL / Image URL</label><input name="image_url" defaultValue={e?.image_url || ""} placeholder="https://..." /></div>
            <div className="field"><label>Link URL</label><input name="link_url" defaultValue={e?.link_url || ""} placeholder="https://..." /></div>
            <div className="field-row">
              <div className="field"><label>Redosled / Sort</label><input type="number" name="sort" defaultValue={e?.sort ?? 0} /></div>
              <div className="field"><label style={{ display: "flex", gap: 8, alignItems: "center" }}><input type="checkbox" name="active" defaultChecked={e ? e.active : true} style={{ width: "auto" }} /> Aktivno / Active</label></div>
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
                      <div style={{ fontSize: ".82rem", color: b.active ? "var(--green-600)" : "var(--slate)" }}>{b.active ? "aktivno" : "neaktivno"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn--outline" onClick={() => toggle(b)}>{b.active ? "Off" : "On"}</button>
                    <button className="btn btn--outline" onClick={() => { setEditing(b); setPos(b.position); setShowForm(true); }}>Edit</button>
                    <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => del(b.id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </>)}

      {tab === "reviews" && (
        <div style={{ display: "grid", gap: 10 }}>
          <h1>Recenzije / Reviews</h1>
          {reviews.length === 0 ? <div className="empty">Nema recenzija. / No reviews.</div> :
            reviews.map((r) => (
              <div key={r.id} className="admin-row">
                <div>
                  <strong>{r.author_name}</strong> <span style={{ color: "var(--sun)" }}>{"★".repeat(r.rating)}</span>{" "}
                  <span style={{ color: "var(--slate)", fontSize: ".82rem" }}>· {r.listings?.name_sr || ""} · <em>{r.status}</em></span>
                  {r.comment && <div style={{ color: "var(--slate)", fontSize: ".9rem", marginTop: 4 }}>{r.comment}</div>}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {r.status !== "approved" && <button className="btn btn--outline" style={{ color: "var(--green-700)", borderColor: "var(--green-600)" }} onClick={() => approveReview(r)}>Odobri / Approve</button>}
                  {r.status !== "rejected" && <button className="btn btn--outline" onClick={() => rejectReview(r)}>Odbij / Reject</button>}
                  <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delReview(r)}>Delete</button>
                </div>
              </div>
            ))}
        </div>
      )}

      {tab === "blog" && (<>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <h1>Blog</h1>
          {!showPostForm && <button className="btn btn--primary" onClick={() => { setPostEditing(null); setShowPostForm(true); }}>+ Novi post / New post</button>}
        </div>
        {showPostForm ? (
          <form onSubmit={savePost} className="booking" style={{ position: "static", marginTop: 16, display: "grid", gap: 12 }}>
            <div className="field"><label>Slug (opciono — auto iz naslova)</label><input name="slug" defaultValue={postEditing?.slug || ""} placeholder="npr. najlepse-planine-srbije" /></div>
            <div className="field-row">
              <div className="field"><label>Naslov (SR)</label><input name="title_sr" required defaultValue={postEditing?.title_sr || ""} /></div>
              <div className="field"><label>Naslov (EN)</label><input name="title_en" defaultValue={postEditing?.title_en || ""} /></div>
            </div>
            <div className="field-row">
              <div className="field"><label>Kratak opis (SR)</label><input name="excerpt_sr" defaultValue={postEditing?.excerpt_sr || ""} /></div>
              <div className="field"><label>Kratak opis (EN)</label><input name="excerpt_en" defaultValue={postEditing?.excerpt_en || ""} /></div>
            </div>
            <div className="field"><label>Naslovna slika (URL)</label><input name="cover_image" defaultValue={postEditing?.cover_image || ""} placeholder="https://..." /></div>
            <div className="field"><label>Tekst (SR)</label><textarea name="body_sr" rows={10} defaultValue={postEditing?.body_sr || ""} /></div>
            <div className="field"><label>Tekst (EN)</label><textarea name="body_en" rows={8} defaultValue={postEditing?.body_en || ""} /></div>
            <div className="field"><label>Status</label><select name="status" defaultValue={postEditing?.status || "draft"}><option value="draft">draft (nije objavljeno)</option><option value="published">published (objavljeno)</option></select></div>
            {err && <p style={{ color: "var(--danger)", fontSize: ".9rem" }}>{err}</p>}
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn--primary" type="submit">Sačuvaj / Save</button>
              <button className="btn btn--outline" type="button" onClick={() => { setShowPostForm(false); setPostEditing(null); }}>Otkaži / Cancel</button>
            </div>
          </form>
        ) : (
          <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
            {posts.length === 0 ? <div className="empty">Još nema postova. / No posts yet.</div> :
              posts.map((b) => (
                <div key={b.id} className="admin-row">
                  <div><strong>{b.title_sr}</strong> <span style={{ color: b.status === "published" ? "var(--green-600)" : "var(--slate)", fontSize: ".82rem" }}>· {b.status}</span><div style={{ color: "var(--slate)", fontSize: ".8rem" }}>/blog/{b.slug}</div></div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn btn--outline" onClick={() => { setPostEditing(b); setShowPostForm(true); }}>Izmeni / Edit</button>
                    <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delPost(b.id)}>Delete</button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </>)}

      {tab === "utisci" && (
        <div>
          <h1>Utisci i predlozi / Reviews &amp; feedback</h1>
          <h2 style={{ marginTop: 18 }}>Utisci korisnika ({testis.length})</h2>
          {testis.length === 0 ? <div className="empty" style={{ marginTop: 10 }}>Još nema utisaka.</div> : (
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {testis.map((x) => (
                <div key={x.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <strong>{x.name}</strong>{x.city ? <span style={{ color: "var(--slate)" }}> · {x.city}</span> : null} {x.rating ? <span style={{ color: "#e8a13a" }}>{"★".repeat(x.rating)}</span> : null}
                    <span style={{ marginLeft: 8, fontSize: ".78rem", color: x.status === "approved" ? "var(--green-600)" : "var(--sun)" }}>· {x.status}</span>
                    <div style={{ fontSize: ".9rem", marginTop: 4 }}>{x.body}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                    {x.status !== "approved" && <button className="btn btn--primary" onClick={() => approveTesti(x.id)}>✓ Odobri</button>}
                    <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delTesti(x.id)}>Obriši</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <h2 style={{ marginTop: 28 }}>Predlozi / Feedback ({feedbk.length})</h2>
          {feedbk.length === 0 ? <div className="empty" style={{ marginTop: 10 }}>Još nema predloga.</div> : (
            <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
              {feedbk.map((f) => (
                <div key={f.id} style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", opacity: f.handled ? 0.6 : 1 }}>
                  <div>
                    <strong>{f.name || "Anonimno"}</strong>{f.email ? <span style={{ color: "var(--slate)" }}> · {f.email}</span> : null}
                    <div style={{ fontSize: ".9rem", marginTop: 4 }}>{f.message}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                    <button className="btn btn--outline" onClick={() => toggleFb(f)}>{f.handled ? "Vrati" : "Rešeno"}</button>
                    <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delFb(f.id)}>Obriši</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
