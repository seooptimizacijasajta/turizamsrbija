"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabaseBrowser";

export default function ResetLozinka() {
  const sb = getBrowserClient();
  const [ready, setReady] = useState(false);
  const [canSet, setCanSet] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!sb) { setReady(true); return; }
    // Supabase detects the recovery token from the URL and creates a session.
    sb.auth.getSession().then(({ data }) => {
      if (data.session) setCanSet(true);
      setReady(true);
    });
    const { data: sub } = sb.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) setCanSet(true);
    });
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!sb) return;
    setErr("");
    const f = new FormData(e.currentTarget);
    const pw = String(f.get("password") || "");
    const pw2 = String(f.get("password2") || "");
    if (pw !== pw2) { setErr("Lozinke se ne poklapaju. / Passwords don't match."); return; }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/.test(pw)) {
      setErr("Lozinka mora imati najmanje 8 znakova, malo i veliko slovo, broj i znak. / Min 8 chars, lower, upper, number and symbol.");
      return;
    }
    setBusy(true);
    const { error } = await sb.auth.updateUser({ password: pw });
    setBusy(false);
    if (error) setErr(error.message);
    else setDone(true);
  }

  return (
    <div className="container" style={{ padding: "56px 0", maxWidth: 460 }}>
      <h1 style={{ marginBottom: 8 }}>Nova lozinka / New password</h1>
      <div className="booking" style={{ position: "static", boxShadow: "var(--shadow-sm)", marginTop: 16 }}>
        {!ready ? (
          <p style={{ color: "var(--slate)" }}>…</p>
        ) : done ? (
          <>
            <div className="form-success show">Lozinka je promenjena. / Password updated.</div>
            <p style={{ textAlign: "center", marginTop: 14 }}>
              <Link className="btn btn--primary btn--block" href="/nalog">Idi na prijavu / Go to login</Link>
            </p>
          </>
        ) : canSet ? (
          <form onSubmit={submit}>
            <div className="field"><label>Nova lozinka / New password</label><input required type="password" name="password" minLength={8} /></div>
            <div className="field"><label>Ponovi lozinku / Repeat password</label><input required type="password" name="password2" minLength={8} /></div>
            <button className="btn btn--primary btn--block" type="submit" disabled={busy}>{busy ? "..." : "Sačuvaj lozinku / Save password"}</button>
            {err && <p className="booking-note" style={{ color: "var(--danger)" }}>{err}</p>}
          </form>
        ) : (
          <p style={{ color: "var(--slate)" }}>
            Link za reset je istekao ili nije validan. Vratite se na{" "}
            <Link href="/nalog" style={{ color: "var(--green-700)", fontWeight: 700 }}>prijavu</Link>{" "}
            i kliknite „Zaboravili ste lozinku?" ponovo. / Reset link expired or invalid — request a new one from the login page.
          </p>
        )}
      </div>
    </div>
  );
}
