/** Legacy LUMA → SÓRA product slug aliases (URL + storage migration). */
export const PRODUCT_SLUG_ALIASES: Record<string, string> = {
  "luma-tote-sand": "sora-tote-sand",
  "luma-backpack-black": "sora-backpack-black",
  "luma-belt-bag-black": "sora-belt-bag-black",
  "luma-cosmetic-bag-beige": "sora-cosmetic-bag-beige",
  "luma-bag-charm-cognac": "sora-bag-charm-cognac",
  "luma-gift-set-black": "sora-gift-set-black",
  "luma-pegasus-leather-bag-charm": "sora-pegasus-leather-bag-charm",
  "luma-dachshund-leather-bag-charm": "sora-dachshund-leather-bag-charm",
  "luma-silk-bow-bag-charm": "sora-silk-bow-bag-charm",
  "luma-dachshund-mix-bag-charm": "sora-dachshund-mix-bag-charm",
};

export function canonicalizeProductSlug(slug: string): string {
  return PRODUCT_SLUG_ALIASES[slug] ?? slug;
}

export function canonicalizeProductSlugs(slugs: string[]): string[] {
  return [...new Set(slugs.map(canonicalizeProductSlug))];
}
