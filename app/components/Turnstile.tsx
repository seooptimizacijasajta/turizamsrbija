"use client";
import { useEffect, useRef } from "react";
declare global { interface Window { turnstile?: any } }

export default function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  useEffect(() => {
    if (!siteKey || !ref.current) return;
    let timer: any;
    const render = () => { if (window.turnstile && ref.current && !ref.current.hasChildNodes()) window.turnstile.render(ref.current, { sitekey: siteKey, callback: onToken }); };
    if (window.turnstile) render();
    else if (!document.getElementById("cf-ts")) {
      const sc = document.createElement("script"); sc.id = "cf-ts"; sc.src = "https://challenges.cloudflare.com/turnstile/v0/api.js"; sc.async = true; sc.onload = render; document.body.appendChild(sc);
    } else timer = setInterval(() => { if (window.turnstile) { clearInterval(timer); render(); } }, 200);
    return () => { if (timer) clearInterval(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!siteKey) return null;
  return <div ref={ref} style={{ marginTop: 8 }} />;
}
