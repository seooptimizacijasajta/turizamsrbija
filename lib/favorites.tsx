"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
type Ctx = { favs: string[]; toggle: (id: string) => void; isFav: (id: string) => boolean };
const FavCtx = createContext<Ctx>({ favs: [], toggle: () => {}, isFav: () => false });
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => { try { const r = localStorage.getItem("ts_favs"); if (r) setFavs(JSON.parse(r)); } catch {} }, []);
  const toggle = (id: string) => setFavs((prev) => {
    const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    try { localStorage.setItem("ts_favs", JSON.stringify(next)); } catch {}
    return next;
  });
  const isFav = (id: string) => favs.includes(id);
  return <FavCtx.Provider value={{ favs, toggle, isFav }}>{children}</FavCtx.Provider>;
}
export const useFavorites = () => useContext(FavCtx);
