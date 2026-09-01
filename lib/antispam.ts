/** Besplatna anti-spam zaštita (honeypot) — bez eksternih servisa i ključeva.
 *  Forme imaju skriveno polje `hp` koje ljudi ne vide; botovi ga popune.
 *  Ako je popunjeno → tretiramo kao spam i tiho odbacujemo (bez upisa i mejla). */
export function looksLikeSpam(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const hp = (body as Record<string, unknown>).hp;
  return typeof hp === "string" && hp.trim() !== "";
}

/** Inline stil za skriveno honeypot polje (van ekrana, van tab reda). */
import type { CSSProperties } from "react";
export const HONEYPOT_STYLE: CSSProperties = {
  position: "absolute",
  left: "-9999px",
  width: 1,
  height: 1,
  opacity: 0,
  overflow: "hidden",
};
