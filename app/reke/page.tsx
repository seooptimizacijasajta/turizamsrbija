import { getListings } from "@/lib/data";
import { getBanners } from "@/lib/banners";
import SectionPage from "@/app/components/SectionPage";
import FaqAccordion from "@/app/components/FaqAccordion";
import { sectionMeta } from "@/lib/seo";
import { sectionFaqs } from "@/lib/faq";
export const revalidate = 60;
export const generateMetadata = () => sectionMeta("sr", "river");
export default async function Page() {
  const [items, banners] = await Promise.all([getListings("river"), getBanners("inlist", "river")]);
  return (
    <>
      <SectionPage items={items} kind="river" banners={banners} />
      <FaqAccordion items={sectionFaqs("river", "sr")} heading="Često postavljana pitanja" />
    </>
  );
}
