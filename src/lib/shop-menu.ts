import type { CategoryDef } from "./types";

/** Virtual / combined catalog slugs → underlying product categorySlug values. */
export const categorySlugAliases: Record<string, string[]> = {
  "clutch-evening": ["clutches", "handbags-women"],
  "wallets-cardholders": ["womens-wallets-women", "card-holders-women"],
};

export function resolveCategorySlugs(slug: string): string[] {
  return categorySlugAliases[slug] ?? [slug];
}

/** Bag categories shown in shop menu + catalog subnav (order matters). */
export const shopBagMenuCategories: CategoryDef[] = [
  { slug: "tote-bags-women", name: "Tote", section: "bags" },
  { slug: "shoulder-bags-women", name: "Shoulder bags", section: "bags" },
  { slug: "bucket-bags-women", name: "Secchiello", section: "bags" },
  { slug: "clutch-evening", name: "Evening bags", section: "bags" },
];

/** Accessory categories shown in shop menu + catalog subnav (order matters). */
export const shopAccessoryMenuCategories: CategoryDef[] = [
  { slug: "womens-scarves-women", name: "Foulard", section: "accessories" },
  { slug: "wallets-cardholders", name: "Wallets", section: "accessories" },
  { slug: "bag-charms", name: "Charms", section: "accessories" },
];

export const virtualBagCategories: CategoryDef[] = [
  { slug: "clutch-evening", name: "Evening bags", section: "bags" },
];

export const virtualAccessoryCategories: CategoryDef[] = [
  { slug: "wallets-cardholders", name: "Wallets", section: "accessories" },
];

/** Curated bestsellers for /bestsellers. */
export const curatedBestsellersOrder = [
  "womens-pebbled-leather-heart-shaped-handbag",
  "womens-woven-crescent-hobo-bag",
  "womens-pebbled-leather-baguette-bag",
  "womens-woven-oval-handle-tote-bag-mokko",
  "womens-pebbled-leather-turn-lock-flap-shoulder-tote-bag",
  "womens-woven-zip-crossbody-bag",
  "womens-pebbled-leather-half-moon-shoulder-bag",
  "womens-woven-base-round-bucket-bag",
  "womens-pebbled-leather-kiss-lock-pouch-bag-light-blue",
  "womens-pebbled-leather-turn-lock-top-handle-bag",
  "womens-woven-leather-zip-around-wallet",
  "womens-pebbled-leather-snap-strap-rfid-wallet-sage",
  "womens-metallic-leather-bifold-cardholder-electric-blue",
  "womens-lavender-wave-silk-scarf",
  "la-via-firenze-flower-bag-charm",
  "luma-pegasus-leather-bag-charm",
];
