import { getProducts } from "@/lib/products";
import PijacaPage from "@/app/components/PijacaPage";
export const revalidate = 60;
export const metadata = { title: "Markt — heimische Produkte | Turizam Srbija", description: "Honig, Käse, Kajmak, Rakija, Wein und Handwerk direkt von heimischen Erzeugern aus Serbien.", alternates: { canonical: "/de/markt", languages: { "sr-Latn-RS": "/pijaca", en: "/en/marketplace", de: "/de/markt", "x-default": "/pijaca" } } };
export default async function Page() { const products = await getProducts(); return <PijacaPage products={products} />; }
