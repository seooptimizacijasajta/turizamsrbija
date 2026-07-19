export type Kind = "mountain" | "lake" | "river" | "monastery" | "spa" | "ethno" | "stay";
export type Lang = "sr" | "en" | "de";
export interface Bi { sr: string; en: string }
export interface Listing {
  id: string;
  type: Kind;
  category?: "hotel" | "private";
  place?: string;
  name: Bi;
  region: Bi;
  short: Bi;
  desc: Bi;
  features: { sr: string[]; en: string[] };
  img: string;
  gallery: string[];
  price: number;
  rating: number;
  capacity?: number;
  elevation?: number;
  municipality?: string;
  videoUrls?: string[];
  lat?: number;
  lng?: number;
  googlePlaceId?: string;
  featured?: boolean;
  featuredHome?: boolean;
  bold?: boolean;
  createdAt?: string;
  views?: number;
  amenities?: string[];
  priceUnit?: string;
  structure?: string;
  areaM2?: number | null;
  minNights?: number | null; minNightsWeekend?: number | null; deposit?: number | null; discountWeekly?: number | null; discountMonthly?: number | null;
  dealType?: string | null; dealPrice?: number | null; dealUntil?: string | null; dealNote?: string | null; deal?: boolean;
}
