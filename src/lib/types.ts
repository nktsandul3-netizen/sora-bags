export type Section = "bags" | "accessories";
export type ProductStatus = "in_stock" | "out_of_stock" | "pre_order";

export interface CategoryDef {
  slug: string;
  name: string;
  section: Section;
}

export interface BrandDef {
  slug: string;
  name: string;
  section: Section | "both";
  about?: string;
}

export interface ProductColor {
  name: string;
  hex: string;
  status?: string;
  images?: ProductImageAsset[];
}

export interface ProductImageAsset {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  title: string;
  brandSlug: string;
  section: Section;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  status?: ProductStatus;
  colors: ProductColor[];
  images?: ProductImageAsset[];
  material: string;
  description: string;
  isNew?: boolean;
  hasVideo?: boolean;
  specs?: { label: string; value: string }[];
}