import VouchersPage from "@/app/components/VouchersPage";
export const metadata = { title: "Tourism vouchers — holidays in Serbia | Turizam Srbija", description: "How Serbia's tourism vouchers work and how to find accommodation that accepts vouchers. Conditions, application and use.", alternates: { canonical: "/en/vouchers", languages: { "sr-Latn-RS": "/vauceri", en: "/en/vouchers", de: "/de/vouchers", "x-default": "/vauceri" } } };
export default function Page() { return <VouchersPage />; }
