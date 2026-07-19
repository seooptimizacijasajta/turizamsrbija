import Account from "@/app/components/Account";
import { pageMeta } from "@/lib/slug";

const PATHS = { sr: "/nalog", en: "/en/nalog", de: "/de/konto" };
export const metadata = pageMeta("en", PATHS, {
  title: "My account — owner dashboard | Turizam Srbija",
  description: "Log in or sign up to add and edit your accommodation listings, follow enquiries and manage your availability calendar.",
  noindex: true,
});

export default function Page() {
  return <Account />;
}
