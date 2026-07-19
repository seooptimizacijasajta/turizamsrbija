import { getListings } from "@/lib/data";
import MapView from "@/app/components/MapView";
import { pageMeta } from "@/lib/slug";
export const revalidate = 60;
const PATHS = { sr: "/mapa", en: "/en/map", de: "/de/karte" };
export const metadata = pageMeta("sr", PATHS, {
  title: "Mapa Srbije — destinacije i smeštaj | Turizam Srbija",
  description: "Interaktivna mapa Srbije sa planinama, jezerima, rekama, banjama, manastirima i smeštajem — pronađite objekat po lokaciji i pošaljite upit domaćinu.",
  image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80",
});
export default async function Page() {
  const items = (await getListings()).filter((d) => typeof d.lat === "number" && typeof d.lng === "number");
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "linear-gradient(180deg,rgba(15,61,46,.3),rgba(15,61,46,.7)),url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80')" }}>
        <div className="container"><h1>Mapa Srbije</h1><p>Sve destinacije i smeštaj na jednom mestu.</p></div>
      </section>
      <MapView items={items} />
    </>
  );
}
