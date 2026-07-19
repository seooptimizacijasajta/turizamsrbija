import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import FaqAccordion from "@/app/components/FaqAccordion";
import { sectionMeta } from "@/lib/seo";
import { sectionFaqs } from "@/lib/faq";
export const revalidate = 60;
export const generateMetadata = () => sectionMeta("sr", "monastery");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("monastery"), getBanners("inlist", "monastery")]);
  return (
    <>
      <SectionPage items={items} kind="monastery" banners={banners} />
      <FaqAccordion items={sectionFaqs("monastery", "sr")} heading="Često postavljana pitanja" />
    </>
  );
}
