import Account from "@/app/components/Account";
import { pageMeta } from "@/lib/slug";

const PATHS = { sr: "/nalog", en: "/en/nalog", de: "/de/konto" };
export const metadata = pageMeta("sr", PATHS, {
  title: "Moj nalog — vlasnički panel | Turizam Srbija",
  description: "Prijavite se ili se registrujte da biste dodali i uređivali svoje oglase za smeštaj, pratili upite i vodili kalendar zauzeća.",
  noindex: true,
});

export default function Page() {
  return <Account />;
}
