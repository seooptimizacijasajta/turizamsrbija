import { getProducts } from "@/lib/products";
import PijacaPage from "@/app/components/PijacaPage";
export const revalidate = 60;
export const metadata = { title: "Pijaca — domaći proizvodi | Turizam Srbija", description: "Med, sir, kajmak, rakija, vino i rukotvorine direktno od domaćih proizvođača iz Srbije.", alternates: { canonical: "/pijaca", languages: { "sr-Latn-RS": "/pijaca", en: "/en/marketplace", de: "/de/marketplace", "x-default": "/pijaca" } } };
export default async function Page() { const products = await getProducts(); return <PijacaPage products={products} />; }
