import { getBanners, Banner } from "@/lib/banners";

export function BannerImg({ b }: { b: Banner }) {
  return (
    <a className="banner" href={b.link_url} target="_blank" rel="noopener noreferrer sponsored">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={b.image_url} alt={b.title || "Oglas / Ad"} loading="lazy" />
    </a>
  );
}

export default async function BannerSlot({ position }: { position: "top" | "bottom" }) {
  const banners = await getBanners(position);
  if (!banners.length) return null;
  return (
    <div className="container">
      <div className={`banner-row banner-${position}`}>
        {banners.map((b) => <BannerImg key={b.id} b={b} />)}
      </div>
    </div>
  );
}
