import { getServerClient } from "./supabase";
import type { Kind } from "./types";

export type Banner = {
  id: string;
  position: "top" | "sidebar" | "bottom" | "inlist";
  kind: Kind | null;
  title: string | null;
  image_url: string;
  link_url: string;
  sort: number;
  active: boolean;
};

export async function getBanners(position: Banner["position"], kind?: Kind): Promise<Banner[]> {
  const sb = getServerClient();
  if (!sb) return [];
  const { data, error } = await sb
    .from("banners")
    .select("*")
    .eq("position", position)
    .eq("active", true)
    .order("sort", { ascending: true });
  if (error || !data) return [];
  const rows = data as Banner[];
  if (position === "inlist" && kind) return rows.filter((b) => !b.kind || b.kind === kind);
  return rows;
}
