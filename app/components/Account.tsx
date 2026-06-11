"use client";
import { useCallback, useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { useLang } from "@/lib/i18n";
import ListingForm from "./ListingForm";
import Turnstile from "./Turnstile";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ProductForm from "./ProductForm";
import BusinessForm from "./BusinessForm";
import { bizCatByKey, bizCatLabel } from "@/lib/firme";
import { pcatLabel, pcatIcon } from "@/lib/pijaca";
import { accountPath } from "@/lib/slug";

export default function Account() {
  const { t, lang } = useLang();
  const sb = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string>("");
  const [rows, setRows] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [calFor, setCalFor] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showProd, setShowProd] = useState(false);
  const [editingProd, setEditingProd] = useState<any>(null);
  const [biz, setBiz] = useState<any[]>([]);
  const [showBiz, setShowBiz] = useState(false);
  const [editingBiz, setEditingBiz] = useState<any>(null);

  const loadListings = useCallback(async (uid: string) => {
    if (!sb) return;
    const { data: p } = await sb.from("profiles").select("role").eq("id", uid).single();
    const admin = p?.role === "admin";
    setIsAdmin(admin);
    let q = sb.from("listings").select("*, listing_images(url,sort)").order("created_at", { ascending: false });
    if (!admin) q = q.eq("owner_id", uid);
    const { data } = await q;
    setRows(data || []);
    let pq = sb.from("products").select("*").order("created_at", { ascending: false });
    if (!admin) pq = pq.eq("owner_id", uid);
    const { data: pr } = await pq;
    setProducts(pr || []);
    let bq = sb.from("businesses").select("*").order("created_at", { ascending: false });
    if (!admin) bq = bq.eq("owner_id", uid);
    const { data: bz } = await bq;
    setBiz(bz || []);
  }, [sb]);

  async function delProduct(id: string) {
    if (!sb || !userId) return;
    if (!confirm("Obrisati proizvod? / Delete product?")) return;
    await sb.from("products").delete().eq("id", id);
    loadListings(userId);
  }
  async function delBusiness(id: string) {
    if (!sb || !userId) return;
    if (!confirm("Obrisati firmu? / Delete business?")) return;
    await sb.from("businesses").delete().eq("id", id);
    loadListings(userId);
  }

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    sb.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      setUserId(u?.id || null);
      setEmail(u?.email || null);
      setReady(true);
      if (u) loadListings(u.id);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, session) => {
      const u = session?.user;
      setUserId(u?.id || null);
      setEmail(u?.email || null);
      if (u) loadListings(u.id); else setRows([]);
    });
    return () => sub.subscription.unsubscribe();
  }, [sb, loadListings]);

  async function auth(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    if (!sb) return;
    setErr(""); setMsg(""); setBusy(true);
    const f = new FormData(ev.currentTarget);
    const em = String(f.get("email") || "").trim();
    const pw = String(f.get("password") || "");
    try {
      if (mode === "signup") {
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(pw)) {
          setErr("Lozinka mora imati najmanje 8 znakova, malo i veliko slovo, broj i znak. / Password must be 8+ chars with lower, upper, number and symbol.");
          setBusy(false); return;
        }
        const { error } = await sb.auth.signUp({ email: em, password: pw, options: captchaToken ? { captchaToken } : undefined });
        if (error) throw error;
        setMsg(t("acc_check_email"));
      } else {
        const { error } = await sb.auth.signInWithPassword({ email: em, password: pw, options: captchaToken ? { captchaToken } : undefined });
        if (error) throw error;
      }
    } catch (e: any) {
      setErr(e?.message || "Error");
    } finally { setBusy(false); }
  }

  async function logout() { if (sb) await sb.auth.signOut(); }
  async function oauth(provider: "google" | "facebook") {
    if (!sb) return;
    const redirectTo = window.location.origin + accountPath(lang);
    await sb.auth.signInWithOAuth({ provider, options: { redirectTo } });
  }

  async function del(id: string) {
    if (!sb || !confirm(t("acc_confirm_delete"))) return;
    await sb.from("listings").delete().eq("id", id);
    if (userId) loadListings(userId);
  }

  async function togglePromo(r: any, field: "featured" | "featured_home" | "bold") {
    if (!sb || !userId) return;
    const untilField = ({ featured: "featured_until", featured_home: "featured_home_until", bold: "bold_until" } as const)[field];
    if (r[field]) {
      await sb.from("listings").update({ [field]: false, [untilField]: null }).eq("id", r.id);
    } else {
      const days = prompt("Na koliko dana uključiti promociju? / Promo for how many days?", "30");
      if (days === null) return;
      const n = Math.max(1, Number(days) || 30);
      const until = new Date(); until.setDate(until.getDate() + n);
      await sb.from("listings").update({ [field]: true, [untilField]: until.toISOString().slice(0, 10) }).eq("id", r.id);
    }
    loadListings(userId);
  }
  const promoNote = (r: any) => {
    const f = [r.bold && r.bold_until ? `Bold do ${r.bold_until}` : "", r.featured && r.featured_until ? `★Kat do ${r.featured_until}` : "", r.featured_home && r.featured_home_until ? `★Poč do ${r.featured_home_until}` : ""].filter(Boolean);
    return f.length ? f.join(" · ") : "";
  };

  function statusBadge(s: string) {
    const map: Record<string, string> = { pending: t("acc_pending"), approved: t("acc_approved"), rejected: t("acc_rejected") };
    const color: Record<string, string> = { pending: "var(--sun)", approved: "var(--green-600)", rejected: "var(--danger)" };
    return <span className="tag" style={{ background: "transparent", color: color[s] || "var(--slate)", border: "1px solid currentColor" }}>{map[s] || s}</span>;
  }

  if (!ready) return <div className="container" style={{ padding: "60px 0" }}>…</div>;

  if (!sb) {
    return (
      <div className="container" style={{ padding: "60px 0", maxWidth: 560 }}>
        <h1>{t("acc_title")}</h1>
        <p style={{ color: "var(--slate)", marginTop: 10 }}>
          Supabase nije konfigurisan (nedostaju ključevi). / Supabase is not configured (missing keys).
        </p>
      </div>
    );
  }

  // logged out -> auth forms
  if (!userId) {
    return (
      <div className="container" style={{ padding: "56px 0", maxWidth: 460 }}>
        <h1 style={{ marginBottom: 8 }}>{t("acc_title")}</h1>
        <p style={{ color: "var(--slate)", marginBottom: 20 }}>{t("acc_intro")}</p>
        <div className="booking" style={{ position: "static", boxShadow: "var(--shadow-sm)" }}>
          <h3 style={{ marginBottom: 4 }}>{mode === "login" ? t("acc_login") : t("acc_signup")}</h3>
          <form onSubmit={auth}>
            <div className="field"><label>{t("acc_email")}</label><input required type="email" name="email" /></div>
            <div className="field"><label>{t("acc_password")}</label><input required type="password" name="password" minLength={6} /></div>
            <Turnstile onToken={setCaptchaToken} />
            <button className="btn btn--primary btn--block" disabled={busy} type="submit">
              {busy ? "..." : mode === "login" ? t("acc_login_btn") : t("acc_signup_btn")}
            </button>
            <div style={{ textAlign: "center", color: "var(--slate)", fontSize: ".82rem", margin: "10px 0" }}>— ili / or —</div>
            <button type="button" className="btn btn--outline btn--block" onClick={() => oauth("google")} style={{ marginBottom: 8 }}>Nastavi sa Google</button>
            <button type="button" className="btn btn--outline btn--block" onClick={() => oauth("facebook")}>Nastavi sa Facebook</button>
          </form>
          {err && <p className="booking-note" style={{ color: "var(--danger)" }}>{err}</p>}
          {msg && <div className="form-success show">{msg}</div>}
          <p style={{ textAlign: "center", marginTop: 14 }}>
            <button onClick={() => { setMode(mode === "login" ? "signup" : "login"); setErr(""); setMsg(""); }}
              style={{ color: "var(--green-700)", fontWeight: 700, fontSize: ".9rem" }}>
              {mode === "login" ? t("acc_no_account") : t("acc_have_account")}
            </button>
          </p>
        </div>
      </div>
    );
  }

  // logged in -> dashboard
  return (
    <div className="container" style={{ padding: "48px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1>{t("acc_my_listings")}{isAdmin ? " — ADMIN (svi oglasi / all listings)" : ""}</h1>
          <p style={{ color: "var(--slate)", fontSize: ".92rem" }}>{email}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {!showForm && <button className="btn btn--primary" onClick={() => { setEditing(null); setShowForm(true); }}>{t("acc_add_listing")}</button>}
          <button className="btn btn--outline" onClick={logout}>{t("acc_logout")}</button>
        </div>
      </div>

      {showForm && (
        <ListingForm
          sb={sb} ownerId={userId} existing={editing}
          onSaved={() => { setShowForm(false); setEditing(null); loadListings(userId); }}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}

      {calFor && <AvailabilityCalendar sb={sb} listingId={calFor.id} icalUrls={calFor.ical_urls} onClose={() => setCalFor(null)} />}

      {!showForm && (
        <div style={{ marginTop: 24 }}>
          {rows.length === 0 ? (
            <div className="empty">{t("acc_no_listings")}</div>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {rows.map((r) => (
                <div key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", flexWrap: "wrap" }}>
                  <div>
                    <strong>{r.name_sr}</strong>{" "}
                    <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>· {t("type_" + r.kind)}{r.price ? ` · €${r.price}` : ""}{` · 👁 ${r.views || 0}`}</span>
                    <div style={{ marginTop: 6 }}>{statusBadge(r.status)}{isAdmin && promoNote(r) ? <span style={{ marginLeft: 8, color: "var(--green-600)", fontSize: ".78rem" }}>{promoNote(r)}</span> : null}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {isAdmin && (<>
                      <button className={"btn btn--outline" + (r.featured ? " promo-on" : "")} title="Izdvoj u kategoriji" onClick={() => togglePromo(r, "featured")}>★ Kat</button>
                      <button className={"btn btn--outline" + (r.featured_home ? " promo-on" : "")} title="Izdvoj na početnoj" onClick={() => togglePromo(r, "featured_home")}>★ Poč</button>
                      <button className={"btn btn--outline" + (r.bold ? " promo-on" : "")} title="Podebljaj" onClick={() => togglePromo(r, "bold")}>Bold</button>
                    </>)}
                    <button className="btn btn--outline" onClick={() => setCalFor(calFor?.id === r.id ? null : r)}>Kalendar</button>
                    <button className="btn btn--outline" onClick={() => { setEditing(r); setShowForm(true); }}>{t("acc_edit")}</button>
                    <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => del(r.id)}>{t("acc_delete")}</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <p className="booking-note" style={{ textAlign: "left", marginTop: 16 }}>{t("acc_pending_note")}</p>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>{t("nav_pijaca")} — {isAdmin ? "svi proizvodi / all products" : "moji proizvodi / my products"}</h2>
              {!showProd && <button className="btn btn--primary" onClick={() => { setEditingProd(null); setShowProd(true); }}>Dodaj proizvod / Add product</button>}
            </div>

            {showProd && userId && (
              <ProductForm sb={sb} ownerId={userId} existing={editingProd}
                onSaved={() => { setShowProd(false); setEditingProd(null); loadListings(userId); }}
                onCancel={() => { setShowProd(false); setEditingProd(null); }} />
            )}

            {!showProd && (
              products.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema proizvoda. / No products yet.</div> : (
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {products.map((p) => (
                    <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", flexWrap: "wrap" }}>
                      <div>
                        <strong>{p.name_sr}</strong>{" "}
                        <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>· {pcatIcon(p.category)} {pcatLabel(p.category, lang)}{p.price ? ` · €${p.price}/${p.unit}` : ""}</span>
                        <div style={{ marginTop: 6 }}>{statusBadge(p.status)}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button className="btn btn--outline" onClick={() => { setEditingProd(p); setShowProd(true); }}>{t("acc_edit")}</button>
                        <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delProduct(p.id)}>{t("acc_delete")}</button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>{t("nav_firme")} — {isAdmin ? "sve firme / all" : "moje firme / my businesses"}</h2>
              {!showBiz && <button className="btn btn--primary" onClick={() => { setEditingBiz(null); setShowBiz(true); }}>Dodaj firmu / Add business</button>}
            </div>
            {showBiz && userId && (
              <BusinessForm sb={sb} ownerId={userId} existing={editingBiz}
                onSaved={() => { setShowBiz(false); setEditingBiz(null); loadListings(userId); }}
                onCancel={() => { setShowBiz(false); setEditingBiz(null); }} />
            )}
            {!showBiz && (
              biz.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema firmi. / No businesses yet.</div> : (
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {biz.map((b) => {
                    const c = bizCatByKey(b.category);
                    return (
                      <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", flexWrap: "wrap" }}>
                        <div>
                          <strong>{b.name}</strong>{" "}
                          <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>· {c ? bizCatLabel(c, lang) : b.category}{b.city ? " · " + b.city : ""}</span>
                          <div style={{ marginTop: 6 }}>{statusBadge(b.status)}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <button className="btn btn--outline" onClick={() => { setEditingBiz(b); setShowBiz(true); }}>{t("acc_edit")}</button>
                          <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delBusiness(b.id)}>{t("acc_delete")}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
