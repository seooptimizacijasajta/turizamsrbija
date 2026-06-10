"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const RATE = 117; // EUR -> RSD (approx., NBS dinar is effectively pegged)
type Cur = "EUR" | "RSD";
type Ctx = { cur: Cur; setCur: (c: Cur) => void; price: (eur: number | null | undefined) => string };
const CurCtx = createContext<Ctx>({ cur: "EUR", setCur: () => {}, price: () => "" });

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [cur, setCurState] = useState<Cur>("EUR");
  useEffect(() => { try { const r = localStorage.getItem("ts_cur"); if (r === "RSD" || r === "EUR") setCurState(r); } catch {} }, []);
  const setCur = (c: Cur) => { setCurState(c); try { localStorage.setItem("ts_cur", c); } catch {} };
  const price = (eur: number | null | undefined) => {
    if (eur == null) return "";
    if (cur === "RSD") return Math.round(eur * RATE).toLocaleString("sr-RS") + " RSD";
    return "€" + eur;
  };
  return <CurCtx.Provider value={{ cur, setCur, price }}>{children}</CurCtx.Provider>;
}
export const useCurrency = () => useContext(CurCtx);
