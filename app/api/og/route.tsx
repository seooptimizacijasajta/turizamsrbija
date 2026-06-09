import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") || "Turizam Srbija").slice(0, 90);
  const subtitle = (searchParams.get("subtitle") || "").slice(0, 130);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", background: "linear-gradient(135deg,#0f3d2e 0%,#1b6b4c 55%,#1f8fb3 100%)", color: "#ffffff", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 32, opacity: 0.92, marginBottom: 18, display: "flex" }}>★ TurizamSrbija</div>
        <div style={{ fontSize: 66, fontWeight: 800, lineHeight: 1.08, display: "flex" }}>{title}</div>
        {subtitle ? <div style={{ fontSize: 32, marginTop: 22, opacity: 0.92, display: "flex" }}>{subtitle}</div> : null}
        <div style={{ fontSize: 28, marginTop: "auto", opacity: 0.8, display: "flex" }}>turizamsrbija.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
