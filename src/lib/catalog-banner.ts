export type CatalogBannerSection = "new" | "bags" | "accessories";

export const categoryBanners: Record<
  CatalogBannerSection,
  { image: string; imageAlt: string; aspect?: `${number}/${number}` }
> = {
  new: {
    image: "/banners/new-hero-v1-hq.jpg",
    imageAlt: "Новинки SÓRA",
    aspect: "5/2",
  },
  bags: {
    image: "/banners/bags-hero-v5-hq.jpg",
    imageAlt: "Сумки SÓRA",
    aspect: "5/2",
  },
  accessories: {
    image: "/banners/accessories-hero-v1-hq.jpg",
    imageAlt: "Аксессуары SÓRA",
    aspect: "5/2",
  },
};

export function isCatalogBannerPath(_pathname: string | null): boolean {
  return false;
}

const INFO_HERO_OVERLAY_PAGES = new Set([
  "/info/o-nas",
  "/info/oplata-i-dostavka",
  "/info/garantiya",
  "/info/podarochnye-sertifikaty",
]);

export function isHeroOverlayPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/") return true;
  if (pathname.startsWith("/info/")) return INFO_HERO_OVERLAY_PAGES.has(pathname);
  return false;
}