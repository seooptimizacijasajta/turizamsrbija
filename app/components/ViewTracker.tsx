"use client";
import { useEffect } from "react";
import { getBrowserClient } from "@/lib/supabaseBrowser";
export default function ViewTracker({ id }: { id: string }) {
  useEffect(() => {
    if (!/^[0-9a-f-]{36}$/i.test(id)) return;
    try { const k = "ts_viewed_" + id; if (sessionStorage.getItem(k)) return; sessionStorage.setItem(k, "1"); } catch {}
    const sb = getBrowserClient();
    if (sb) sb.rpc("increment_views", { lid: id }).then(() => {}, () => {});
  }, [id]);
  return null;
}
