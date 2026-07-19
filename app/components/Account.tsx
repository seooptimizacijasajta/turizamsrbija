"use client";
import { useCallback, useEffect, useState } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";
import { useLang } from "@/lib/i18n";
import ListingForm from "./ListingForm";
import Turnstile from "./Turnstile";
import AvailabilityCalendar from "./AvailabilityCalendar";
import ProductForm from "./ProductForm";
import BusinessForm from "./BusinessForm";
import EventForm from "./EventForm";
import PropertyForm from "./PropertyForm";
import { propTypeByKey, propTypeLabel, dealKindLabel } from "@/lib/nekretnine";
import { bizCatByKey, bizCatLabel } from "@/lib/firme";
import { evCatByKey, evCatLabel } from "@/lib/events";
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
  const [evts, setEvts] = useState<any[]>([]);
  const [showEv, setShowEv] = useState(false);
  const [editingEv, setEditingEv] = useState<any>(null);
  const [props, setProps] = useState<any[]>([]);
  const [showProp, setShowProp] = useState(false);
  const [editingProp, setEditingProp] = useState<any>(null);
  const [stripeOk, setStripeOk] = useState(false);
  const [stripeAcct, setStripeAcct] = useState<string | null>(null);
  const [stripeBusy, setStripeBusy] = useState(false);
  const [pwBusy, setPwBusy] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const loadListings = useCallback(async (uid: string) => {
    if (!sb) return;
    const { data: p } = await sb.from("profiles").select("role, stripe_account_id, stripe_charges_enabled").eq("id", uid).single();
    const admin = p?.role === "admin";
    setIsAdmin(admin);
    setStripeOk(!!p?.stripe_charges_enabled);
    setStripeAcct((p?.stripe_account_id as string) || null);
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
    let eq = sb.from("events").select("*").order("created_at", { ascending: false });
    if (!admin) eq = eq.eq("owner_id", uid);
    const { data: ev } = await eq;
    setEvts(ev || []);
    let prq = sb.from("properties").select("*").order("created_at", { ascending: false });
    if (!admin) prq = prq.eq("owner_id", uid);
    const { data: prp } = await prq;
    setProps(prp || []);
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
  async function toggleBizFeatured(b: any) {
    if (!sb || !userId) return;
    if (b.featured) {
      await sb.from("businesses").update({ featured: false, featured_until: null }).eq("id", b.id);
    } else {
      const days = prompt("Izdvojiti firmu na koliko dana? / Feature for how many days?", "30");
      if (days === null) return;
      const n = Math.max(1, Number(days) || 30);
      const until = new Date(); until.setDate(until.getDate() + n);
      await sb.from("businesses").update({ featured: true, featured_until: until.toISOString().slice(0, 10) }).eq("id", b.id);
    }
    loadListings(userId);
  }
  async function toggleBizPaid(b: any) {
    if (!sb || !userId) return;
    if (b.paid) {
      if (!confirm("Isključiti plaćeni prikaz (kontakt i link)? / Turn off paid listing?")) return;
      await sb.from("businesses").update({ paid: false, paid_until: null }).eq("id", b.id);
    } else {
      const days = prompt("Plaćeni prikaz (kontakt + klikabilan link) na koliko dana? / Paid listing for how many days?", "365");
      if (days === null) return;
      const n = Math.max(1, Number(days) || 365);
      const until = new Date(); until.setDate(until.getDate() + n);
      await sb.from("businesses").update({ paid: true, paid_until: until.toISOString().slice(0, 10) }).eq("id", b.id);
    }
    loadListings(userId);
  }

  async function delEvent(id: string) {
    if (!sb || !userId) return;
    if (!confirm("Obrisati manifestaciju? / Delete event?")) return;
    await sb.from("events").delete().eq("id", id);
    loadListings(userId);
  }
  async function approveEvent(id: string) {
    if (!sb || !userId) return;
    await sb.from("events").update({ status: "approved" }).eq("id", id);
    loadListings(userId);
  }
  async function toggleEvFeatured(b: any) {
    if (!sb || !userId) return;
    if (b.featured) {
      await sb.from("events").update({ featured: false, featured_until: null }).eq("id", b.id);
    } else {
      const days = prompt("Izdvojiti manifestaciju na koliko dana? / Feature for how many days?", "30");
      if (days === null) return;
      const n = Math.max(1, Number(days) || 30);
      const until = new Date(); until.setDate(until.getDate() + n);
      await sb.from("events").update({ featured: true, featured_until: until.toISOString().slice(0, 10) }).eq("id", b.id);
    }
    loadListings(userId);
  }
  async function delProperty(id: string) {
    if (!sb || !userId) return;
    if (!confirm("Obrisati nekretninu? / Delete property?")) return;
    await sb.from("properties").delete().eq("id", id);
    loadListings(userId);
  }
  async function approveProperty(id: string) {
    if (!sb || !userId) return;
    await sb.from("properties").update({ status: "approved" }).eq("id", id);
    loadListings(userId);
  }
  async function togglePropFeatured(p: any) {
    if (!sb || !userId) return;
    if (p.featured) {
      await sb.from("properties").update({ featured: false, featured_until: null }).eq("id", p.id);
    } else {
      const days = prompt("Izdvojiti nekretninu na koliko dana? / Feature for how many days?", "30");
      if (days === null) return;
      const n = Math.max(1, Number(days) || 30);
      const until = new Date(); until.setDate(until.getDate() + n);
      await sb.from("properties").update({ featured: true, featured_until: until.toISOString().slice(0, 10) }).eq("id", p.id);
    }
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

  useEffect(() => {
    if (stripeAcct && !stripeOk) refreshStripeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripeAcct]);

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
  async function connectStripe() {
    if (!sb) return;
    setStripeBusy(true);
    try {
      const { data: { session } } = await sb.auth.getSession();
      const res = await fetch("/api/stripe/connect", { method: "POST", headers: { Authorization: `Bearer ${session?.access_token || ""}` } });
      const j = await res.json();
      if (j?.url) { window.location.href = j.url; return; }
      alert(j?.error === "not_configured" ? "Stripe još nije podešen na portalu." : (j?.error || "Greška"));
    } catch { /* noop */ }
    setStripeBusy(false);
  }
  async function refreshStripeStatus() {
    if (!sb) return;
    try {
      const { data: { session } } = await sb.auth.getSession();
      const res = await fetch("/api/stripe/account-status", { method: "POST", headers: { Authorization: `Bearer ${session?.access_token || ""}` } });
      const j = await res.json();
      if (j?.charges_enabled) setStripeOk(true);
    } catch { /* noop */ }
  }
  async function forgotPassword(e: React.MouseEvent<HTMLButtonElement>) {
    if (!sb) return;
    const form = e.currentTarget.closest("form");
    const em = form ? String(new FormData(form).get("email") || "").trim() : "";
    if (!em) {
      setErr(lang === "sr" ? "Prvo upišite email iznad, pa kliknite ponovo." : lang === "de" ? "Bitte oben die E-Mail eingeben." : "Enter your email above first, then click again.");
      return;
    }
    setErr(""); setMsg("");
    const { error } = await sb.auth.resetPasswordForEmail(em, { redirectTo: window.location.origin + "/reset-lozinka" });
    if (error) setErr(error.message);
    else setMsg(lang === "sr" ? "Poslali smo vam mejl za reset lozinke. Proverite inbox (i spam folder)." : lang === "de" ? "Wir haben Ihnen eine E-Mail zum Zurücksetzen gesendet. Prüfen Sie Ihren Posteingang (und Spam)." : "We've sent you a password reset email. Check your inbox (and spam).");
  }
  async function changePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sb) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const pw = String(f.get("newpw") || "");
    const pw2 = String(f.get("newpw2") || "");
    if (pw !== pw2) { setPwMsg({ ok: false, text: "Lozinke se ne poklapaju. / Passwords don't match." }); return; }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(pw)) {
      setPwMsg({ ok: false, text: "Min 8 znakova, malo i veliko slovo, broj i znak. / Min 8 chars incl. upper, lower, number, symbol." });
      return;
    }
    setPwBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw });
    setPwBusy(false);
    if (error) setPwMsg({ ok: false, text: error.message });
    else { setPwMsg({ ok: true, text: "Lozinka je promenjena! / Password changed!" }); form.reset(); }
  }
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
            {mode === "login" && (
              <p style={{ textAlign: "center", marginTop: 10 }}>
                <button type="button" onClick={forgotPassword} style={{ color: "var(--slate)", fontSize: ".82rem", textDecoration: "underline" }}>
                  {lang === "sr" ? "Zaboravili ste lozinku?" : lang === "de" ? "Passwort vergessen?" : "Forgot password?"}
                </button>
              </p>
            )}
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

      {userId && (
        <div style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", marginTop: 16, background: stripeOk ? "#f0f8f4" : "#fff8ef", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <div style={{ fontSize: ".92rem", maxWidth: 640 }}>
            {stripeOk
              ? <span style={{ color: "var(--green-600)" }}><b>✓ Stripe naplata aktivna.</b> Gosti mogu da rezervišu i plate online; vaš deo ide direktno na vaš Stripe nalog, a provizija portala se automatski odbija.</span>
              : <span><b>Online naplata (Stripe).</b> Povežite svoj Stripe nalog da biste primali rezervacije sa online plaćanjem. Gost plaća pun iznos, vaš deo stiže direktno vama, a provizija portala se automatski odbija.</span>}
          </div>
          {!stripeOk && <button className="btn btn--primary" onClick={connectStripe} disabled={stripeBusy}>{stripeBusy ? "…" : (stripeAcct ? "Nastavi povezivanje" : "Poveži Stripe")}</button>}
        </div>
      )}

      {userId && (
        <details style={{ marginTop: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px" }}>
          <summary style={{ cursor: "pointer", fontWeight: 700 }}>{lang === "sr" ? "Promeni lozinku" : lang === "de" ? "Passwort ändern" : "Change password"}</summary>
          <form onSubmit={changePassword} style={{ marginTop: 10, display: "grid", gap: 8, maxWidth: 360 }}>
            <input type="password" name="newpw" placeholder={lang === "sr" ? "Nova lozinka" : lang === "de" ? "Neues Passwort" : "New password"} minLength={8} required />
            <input type="password" name="newpw2" placeholder={lang === "sr" ? "Ponovi lozinku" : lang === "de" ? "Passwort wiederholen" : "Repeat password"} minLength={8} required />
            <button className="btn btn--primary" type="submit" disabled={pwBusy} style={{ width: "fit-content" }}>{pwBusy ? "..." : (lang === "sr" ? "Sačuvaj" : "Save")}</button>
            {pwMsg && <span style={{ fontSize: ".85rem", color: pwMsg.ok ? "var(--green-600)" : "var(--danger)" }}>{pwMsg.text}</span>}
          </form>
        </details>
      )}

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
                          <div style={{ marginTop: 6 }}>{statusBadge(b.status)}{isAdmin && b.featured && b.featured_until ? <span style={{ marginLeft: 8, color: "var(--green-600)", fontSize: ".78rem" }}>★ Izdvojeno do {b.featured_until}</span> : null}{isAdmin && b.paid && b.paid_until ? <span style={{ marginLeft: 8, color: "var(--green-700,#0f3d2e)", fontSize: ".78rem", fontWeight: 600 }}>💳 Plaćeno do {b.paid_until}</span> : null}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {isAdmin && <button className={"btn btn--outline" + (b.paid ? " promo-on" : "")} title="Plaćeni prikaz: kontakt + klikabilan link" onClick={() => toggleBizPaid(b)}>💳 Plaćeno</button>}
                          {isAdmin && <button className={"btn btn--outline" + (b.featured ? " promo-on" : "")} title="Izdvoj firmu" onClick={() => toggleBizFeatured(b)}>★ Izdvoj</button>}
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

          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>{lang === "sr" ? "Manifestacije" : lang === "de" ? "Veranstaltungen" : "Events"} — {isAdmin ? "sve / all" : "moje / mine"}</h2>
              {!showEv && <button className="btn btn--primary" onClick={() => { setEditingEv(null); setShowEv(true); }}>Dodaj manifestaciju / Add event</button>}
            </div>
            {showEv && userId && (
              <EventForm sb={sb} ownerId={userId} existing={editingEv}
                onSaved={() => { setShowEv(false); setEditingEv(null); loadListings(userId); }}
                onCancel={() => { setShowEv(false); setEditingEv(null); }} />
            )}
            {!showEv && (
              evts.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema manifestacija. / No events yet.</div> : (
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {evts.map((b) => {
                    const c = evCatByKey(b.category);
                    return (
                      <div key={b.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", flexWrap: "wrap" }}>
                        <div>
                          <strong>{b.name}</strong>{" "}
                          <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>· {c ? evCatLabel(c, lang) : b.category}{b.city ? " · " + b.city : ""}</span>
                          <div style={{ marginTop: 6 }}>{statusBadge(b.status)}{isAdmin && b.featured && b.featured_until ? <span style={{ marginLeft: 8, color: "var(--green-600)", fontSize: ".78rem" }}>★ Izdvojeno do {b.featured_until}</span> : null}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {isAdmin && b.status !== "approved" && <button className="btn btn--primary" onClick={() => approveEvent(b.id)}>✓ Odobri / Approve</button>}
                          {isAdmin && <button className={"btn btn--outline" + (b.featured ? " promo-on" : "")} title="Izdvoj" onClick={() => toggleEvFeatured(b)}>★ Izdvoj</button>}
                          <button className="btn btn--outline" onClick={() => { setEditingEv(b); setShowEv(true); }}>{t("acc_edit")}</button>
                          <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delEvent(b.id)}>{t("acc_delete")}</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}
          </div>

          <div style={{ marginTop: 40, borderTop: "1px solid var(--line)", paddingTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ margin: 0 }}>{lang === "sr" ? "Nekretnine" : lang === "de" ? "Immobilien" : "Real estate"} — {isAdmin ? "sve / all" : "moje / mine"}</h2>
              {!showProp && <button className="btn btn--primary" onClick={() => { setEditingProp(null); setShowProp(true); }}>Dodaj nekretninu / Add property</button>}
            </div>
            {showProp && userId && (
              <PropertyForm sb={sb} ownerId={userId} existing={editingProp}
                onSaved={() => { setShowProp(false); setEditingProp(null); loadListings(userId); }}
                onCancel={() => { setShowProp(false); setEditingProp(null); }} />
            )}
            {!showProp && (
              props.length === 0 ? <div className="empty" style={{ marginTop: 16 }}>Još nema nekretnina. / No properties yet.</div> : (
                <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
                  {props.map((p) => {
                    const c = propTypeByKey(p.property_type);
                    return (
                      <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: 12, padding: "14px 16px", flexWrap: "wrap" }}>
                        <div>
                          <strong>{p.title}</strong>{" "}
                          <span style={{ color: "var(--slate)", fontSize: ".85rem" }}>· {dealKindLabel(p.deal_type, lang)}{c ? " · " + propTypeLabel(c, lang) : ""}{p.city ? " · " + p.city : ""}{p.price != null ? ` · €${Number(p.price).toLocaleString("de-DE")}` : ""}</span>
                          <div style={{ marginTop: 6 }}>{statusBadge(p.status)}{isAdmin && p.featured && p.featured_until ? <span style={{ marginLeft: 8, color: "var(--green-600)", fontSize: ".78rem" }}>★ Izdvojeno do {p.featured_until}</span> : null}</div>
                        </div>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {isAdmin && p.status !== "approved" && <button className="btn btn--primary" onClick={() => approveProperty(p.id)}>✓ Odobri / Approve</button>}
                          {isAdmin && <button className={"btn btn--outline" + (p.featured ? " promo-on" : "")} title="Izdvoj" onClick={() => togglePropFeatured(p)}>★ Izdvoj</button>}
                          <button className="btn btn--outline" onClick={() => { setEditingProp(p); setShowProp(true); }}>{t("acc_edit")}</button>
                          <button className="btn btn--outline" style={{ color: "var(--danger)", borderColor: "var(--danger)" }} onClick={() => delProperty(p.id)}>{t("acc_delete")}</button>
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
