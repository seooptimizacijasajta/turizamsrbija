"use client";
import { Listing } from "@/lib/types";
import { useFavorites } from "@/lib/favorites";
import { useLang } from "@/lib/i18n";
import ListingCard from "./ListingCard";
export default function SavedView({ items }: { items: Listing[] }) {
  const { favs } = useFavorites();
  const { lang } = useLang();
  const saved = items.filter((d) => favs.includes(d.id));
  return (
    <div className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: 18 }}>{lang === "en" ? "Saved" : "Sačuvano"} ♥</h1>
      {saved.length ? <div className="card-grid">{saved.map((d) => <ListingCard key={d.id} item={d} />)}</div>
        : <div className="empty">{lang === "en" ? "No saved items yet. Tap ♥ on a listing." : "Još nema sačuvanih. Klikni ♥ na nekom smeštaju."}</div>}
    </div>
  );
}
