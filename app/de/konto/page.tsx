import Account from "@/app/components/Account";
import { pageMeta } from "@/lib/slug";

const PATHS = { sr: "/nalog", en: "/en/nalog", de: "/de/konto" };
export const metadata = pageMeta("de", PATHS, {
  title: "Mein Konto — Vermieterbereich | Turizam Srbija",
  description: "Melden Sie sich an oder registrieren Sie sich, um Ihre Unterkünfte einzustellen und zu bearbeiten, Anfragen zu verfolgen und den Belegungskalender zu pflegen.",
  noindex: true,
});

export default function Page() {
  return <Account />;
}
