import { stripLocaleFromPathname } from "@/lib/i18n";

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

export function isCatalogBannerPath(): boolean {
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
  const path = stripLocaleFromPathname(pathname);
  if (path === "/") return true;
  if (path === "/bags") return true;
  if (path === "/bags/clutches") return true;
  if (path === "/bags/vanity") return true;
  if (path === "/bags/bucket-bags-women") return true;
  if (path === "/bags/bowling-bags") return true;
  if (path === "/bags/handbags-women") return true;
  if (path === "/bags/rectangular-bags") return true;
  if (path === "/bags/tote-bags-women") return true;
  if (path === "/bags/shoulder-bags-women") return true;
  if (path === "/bags/crossbody-bags-women") return true;
  if (path.startsWith("/info/")) return INFO_HERO_OVERLAY_PAGES.has(path);
  return false;
}