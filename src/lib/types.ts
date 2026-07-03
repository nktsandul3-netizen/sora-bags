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
  /** Перекрывает product.galleryFit для отдельных фото (например lifestyle → cover) */
  fit?: "cover" | "contain";
}

export interface Product {
  slug: string;
  title: string;
  brandSlug: string;
  section: Section;
  categorySlug: string;
  /** Extra category slugs this product should also appear under (e.g. a hobo bag is also a shoulder bag). */
  additionalCategorySlugs?: string[];
  price: number;
  oldPrice?: number;
  status?: ProductStatus;
  colors: ProductColor[];
  images?: ProductImageAsset[];
  material: string;
  description: string;
  /** Short, factual bullet points shown between the description and the specs table. */
  highlights?: string[];
  isNew?: boolean;
  isVintage?: boolean;
  hasVideo?: boolean;
  /** "contain" shows the full photo without cropping wide/tall product shots */
  galleryFit?: "cover" | "contain";
  specs?: { label: string; value: string }[];
}