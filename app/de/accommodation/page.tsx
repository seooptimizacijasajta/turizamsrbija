import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import FaqAccordion from "@/app/components/FaqAccordion";
import { sectionMeta } from "@/lib/seo";
import { sectionFaqs } from "@/lib/faq";
export const revalidate = 60;
export const generateMetadata = () => sectionMeta("de", "stay");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("stay"), getBanners("inlist", "stay")]);
  return (
    <>
      <SectionPage items={items} kind="stay" banners={banners} />
      <FaqAccordion items={sectionFaqs("stay", "de")} heading="Frequently asked questions" />
    </>
  );
}
