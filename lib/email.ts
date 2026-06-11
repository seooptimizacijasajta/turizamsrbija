export const ADMIN_EMAIL = process.env.NOTIFY_EMAIL || "banjavrujci@gmail.com";
const FROM = process.env.MAIL_FROM || "Turizam Srbija <info@turizamsrbija.com>";

export async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) return false;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
    });
    if (!r.ok) console.error("[email] resend error", r.status, await r.text().catch(() => ""));
    return r.ok;
  } catch (e: any) { console.error("[email] send failed", e?.message); return false; }
}

export function wrap(title: string, rows: [string, string | null | undefined][], note?: string) {
  const body = rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:4px 10px 4px 0;color:#64748b">${k}</td><td style="padding:4px 0;font-weight:600">${String(v)}</td></tr>`).join("");
  return `<div style="font-family:system-ui,Arial,sans-serif;max-width:560px;margin:0 auto">
    <div style="background:#0f3d2e;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0"><b>★ Turizam Srbija</b></div>
    <div style="border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px;padding:20px">
      <h2 style="margin:0 0 14px;font-size:1.2rem">${title}</h2>
      <table style="font-size:.95rem">${body}</table>
      ${note ? `<p style="margin-top:16px;color:#64748b;font-size:.85rem">${note}</p>` : ""}
    </div></div>`;
}
