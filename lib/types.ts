export type Kind = "mountain" | "lake" | "spa" | "ethno" | "stay";
export type Lang = "sr" | "en";
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
}
