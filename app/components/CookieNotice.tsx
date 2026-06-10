"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { infoPath } from "@/lib/slug";

export default function CookieNotice() {
  const { lang } = useLang();
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem("ts_cookie")) setShow(true); } catch {} }, []);
  function accept() { try { localStorage.setItem("ts_cookie", "1"); } catch {} setShow(false); }
  if (!show) return null;
  const en = lang !== "sr";
  return (
    <div className="cookie">
      <p>
        {en ? "We use cookies to improve your experience on the site." : "Koristimo kolačiće da poboljšamo vaše iskustvo na sajtu."}{" "}
        <Link href={infoPath("privacy", lang)} style={{ textDecoration: "underline", color: "var(--green-700)" }}>{en ? "Learn more" : "Saznaj više"}</Link>
      </p>
      <button className="btn btn--primary" onClick={accept} type="button">{en ? "Accept" : "Prihvatam"}</button>
    </div>
  );
}
