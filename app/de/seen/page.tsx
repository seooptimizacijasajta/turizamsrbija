import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import FaqAccordion from "@/app/components/FaqAccordion";
import { sectionMeta } from "@/lib/seo";
import { sectionFaqs } from "@/lib/faq";
export const revalidate = 60;
export const generateMetadata = () => sectionMeta("de", "lake");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("lake"), getBanners("inlist", "lake")]);
  return (
    <>
      <SectionPage items={items} kind="lake" banners={banners} />
      <FaqAccordion items={sectionFaqs("lake", "de")} heading="Frequently asked questions" />
    </>
  );
}
