import { getProducts } from "@/lib/products";
import PijacaPage from "@/app/components/PijacaPage";
export const revalidate = 60;
export const metadata = { title: "Marketplace — local products | Turizam Srbija", description: "Honey, cheese, kajmak, rakija, wine and crafts straight from local producers in Serbia.", openGraph: { images: [`/api/og?title=${encodeURIComponent("Marketplace — local products")}&subtitle=${encodeURIComponent("Honey, cheese, rakija, wine, crafts")}`] }, alternates: { canonical: "/en/marketplace", languages: { "sr-Latn-RS": "/pijaca", en: "/en/marketplace", de: "/de/markt", "x-default": "/pijaca" } } };
export default async function Page() { const products = await getProducts(); return <PijacaPage products={products} />; }
