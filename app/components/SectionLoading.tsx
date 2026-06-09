import SkeletonGrid from "./SkeletonGrid";
export default function SectionLoading() {
  return (
    <>
      <div className="sk sk-hero" />
      <div style={{ height: 18 }} />
      <SkeletonGrid />
    </>
  );
}
