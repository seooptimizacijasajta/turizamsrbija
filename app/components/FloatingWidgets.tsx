"use client";
import { useState, useEffect } from "react";

const WA = "381644598778";
const VIBER = "%2B381644598778";

export default function FloatingWidgets() {
  const aiEnabled = process.env.NEXT_PUBLIC_AI_ENABLED === "1";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const [msgs, setMsgs] = useState<{ role: "user" | "assistant"; content: string }[]>([
    { role: "assistant", content: "Zdravo! 👋 Ja sam asistent Turizam Srbija. Kako mogu da pomognem? (Hi! How can I help?)" },
  ]);
  const [val, setVal] = useState("");
  const [busy, setBusy] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = val.trim(); if (!text || busy) return;
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next); setVal(""); setBusy(true);
    try {
      const r = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: next }) });
      const j = await r.json();
      setMsgs([...next, { role: "assistant", content: j.reply || "..." }]);
    } catch { setMsgs([...next, { role: "assistant", content: "Greška. Pišite na info@turizamsrbija.com." }]); }
    finally { setBusy(false); }
  }

  return (
    <>
      <div className="fab-stack">
        {scrolled && <button className="fab fab-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Na vrh / Top" aria-label="Top" type="button">↑</button>}
        <a className="fab fab-wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" title="WhatsApp" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24"><path d="M.06 24l1.68-6.13A11.86 11.86 0 010 11.93C0 5.35 5.36 0 11.94 0a11.86 11.86 0 018.4 3.49 11.82 11.82 0 013.48 8.4c0 6.58-5.36 11.93-11.95 11.93a11.9 11.9 0 01-5.7-1.45L.06 24zM6.6 20.13l.36.22a9.9 9.9 0 005.02 1.38c5.48 0 9.94-4.45 9.94-9.93a9.93 9.93 0 00-16.96-7.02 9.86 9.86 0 00-2.9 7.02c0 1.9.55 3.76 1.6 5.37l.24.38-1 3.63 3.7-.97zM17.9 14.3c-.07-.12-.27-.2-.57-.35s-1.77-.87-2.04-.97-.47-.15-.66.15-.76.96-.93 1.16-.34.22-.63.07a8.13 8.13 0 01-2.4-1.48 9 9 0 01-1.66-2.06c-.17-.3 0-.45.13-.6.13-.13.3-.34.44-.5.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.18-.24-.58-.48-.5-.66-.5l-.57-.01c-.2 0-.52.07-.8.37s-1.05 1.02-1.05 2.5 1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42z"/></svg>
        </a>
        <a className="fab fab-viber" href={`viber://chat?number=${VIBER}`} title="Viber" aria-label="Viber">
          <svg viewBox="0 0 24 24"><path d="M11.4 0C9.5.03 5.4.34 3.1 2.45 1.4 4.13 .8 6.6.73 9.66c-.06 3.05-.14 8.78 5.38 10.33v2.37s-.04.96.6 1.15c.76.24 1.2-.49 1.93-1.27l1.36-1.53c3.78.31 6.68-.41 7-.52.77-.25 5.12-.8 5.83-6.58.73-5.96-.35-9.73-2.3-11.43l-.01-.01C20.04.96 18.5.4 16.04.1 16.04.1 14.2-.03 11.4 0zm.13 1.7c2.37-.02 3.97.1 3.97.1 2.08.25 3.32.7 4.2 1.46 1.65 1.42 2.49 4.82 1.88 9.8-.6 4.83-4.12 5.13-4.77 5.34-.28.09-2.82.72-6.03.51 0 0-2.4 2.9-3.15 3.64-.12.12-.25.16-.34.14-.13-.03-.16-.18-.16-.4l.02-3.95c-4.67-1.3-4.4-6.17-4.35-8.72.05-2.55.54-4.6 1.97-6 1.94-1.74 5.43-2 5.43-2l1.51-.06zm.6 2.84a.34.34 0 00-.34.33c0 .19.15.34.34.34a4.46 4.46 0 014.49 4.5c0 .19.15.34.34.34s.34-.16.34-.35a5.13 5.13 0 00-5.5-5.16zm-3.62.9a.6.6 0 00-.45.13l-.6.45c-.3.25-.55.6-.4 1.32 0 0 .42 1.6 1.92 3.3a9.1 9.1 0 003.45 2.46l.96.4c.7.23 1.07.05 1.35-.28l.43-.5c.2-.27.16-.55-.05-.74l-1.3-1.02c-.2-.13-.46-.1-.65.1l-.34.4c-.18.18-.5.18-.5.18s-1.06-.31-1.96-1.23c-.9-.92-1.2-1.97-1.2-1.97s0-.31.18-.5l.4-.34c.2-.18.22-.45.1-.65l-1-1.3a.55.55 0 00-.42-.18zm3.65.27a.34.34 0 100 .67 2.55 2.55 0 012.57 2.6.34.34 0 10.67 0 3.22 3.22 0 00-3.24-3.27zm.05 1.34a.33.33 0 00-.05.66c.6.07.86.34.92.94a.33.33 0 00.66-.07 1.43 1.43 0 00-1.53-1.53z"/></svg>
        </a>
        {aiEnabled && <button className="fab fab-chat" onClick={() => setOpen(true)} title="AI asistent" aria-label="Chat">💬</button>}
      </div>

      {aiEnabled && open && (
        <div className="chat-panel">
          <div className="chat-head"><span>TS asistent</span><button onClick={() => setOpen(false)} style={{ color: "#fff", fontSize: "1.2rem" }}>×</button></div>
          <div className="chat-msgs">
            {msgs.map((m, i) => <div key={i} className={"chat-msg " + (m.role === "user" ? "user" : "bot")}>{m.content}</div>)}
            {busy && <div className="chat-msg bot">…</div>}
          </div>
          <form className="chat-input" onSubmit={send}>
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Pitajte nešto… / Ask…" />
            <button className="btn btn--primary" disabled={busy} type="submit">›</button>
          </form>
        </div>
      )}
    </>
  );
}
