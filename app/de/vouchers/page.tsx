import VouchersPage from "@/app/components/VouchersPage";
export const metadata = { title: "Tourismus-Gutscheine — Urlaub in Serbien | Turizam Srbija", description: "Wie Serbiens Tourismus-Gutscheine funktionieren und wie Sie Unterkünfte finden, die Gutscheine akzeptieren.", alternates: { canonical: "/de/vouchers", languages: { "sr-Latn-RS": "/vauceri", en: "/en/vouchers", de: "/de/vouchers", "x-default": "/vauceri" } } };
export default function Page() { return <VouchersPage />; }
