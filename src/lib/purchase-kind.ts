import { getProduct } from "@/lib/data";
import type { CartItem } from "@/context/cart";
import type { Product } from "@/lib/types";

export type PurchaseKind = "standard" | "preorder";

const PREORDER_COLOR_STATUS = "Доставка 7–14 дней";

export function isColorPreorderStatus(status?: string): boolean {
  return status === PREORDER_COLOR_STATUS;
}

export function getPurchaseKind(product: Pick<Product, "status">): PurchaseKind {
  return product.status === "in_stock" ? "standard" : "preorder";
}

export function getPurchaseKindForItem(product: Product, colorName: string): PurchaseKind {
  if (product.status !== "in_stock") {
    return getPurchaseKind(product);
  }

  const color = product.colors.find((c) => c.name === colorName);
  return color && isColorPreorderStatus(color.status) ? "preorder" : "standard";
}

export function getPurchaseKindBySlug(slug: string): PurchaseKind {
  const product = getProduct(slug);
  return product ? getPurchaseKind(product) : "standard";
}

export function getPurchaseKindBySlugAndColor(slug: string, color: string): PurchaseKind {
  const product = getProduct(slug);
  return product ? getPurchaseKindForItem(product, color) : "standard";
}

export function groupCartItems(items: CartItem[]): {
  standard: CartItem[];
  preorder: CartItem[];
} {
  const standard: CartItem[] = [];
  const preorder: CartItem[] = [];
  for (const item of items) {
    const kind = item.purchaseKind ?? getPurchaseKindBySlugAndColor(item.slug, item.color);
    if (kind === "preorder") preorder.push(item);
    else standard.push(item);
  }
  return { standard, preorder };
}

export function cartGroupTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty * item.price, 0);
}

export function cartGroupCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

export function normalizeCartItem(item: CartItem): CartItem {
  return {
    ...item,
    purchaseKind: getPurchaseKindBySlugAndColor(item.slug, item.color),
  };
}

export function normalizeCartItemInput(item: Omit<CartItem, "qty">): Omit<CartItem, "qty"> {
  return {
    ...item,
    purchaseKind: getPurchaseKindBySlugAndColor(item.slug, item.color),
  };
}
