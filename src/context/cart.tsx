"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { sendAnalyticsEvent } from "@/components/AnalyticsTracker";
import {
  cartGroupCount,
  cartGroupTotal,
  getPurchaseKindBySlugAndColor,
  groupCartItems,
  normalizeCartItem,
  normalizeCartItemInput,
  type PurchaseKind,
} from "@/lib/purchase-kind";

export type { PurchaseKind };

export interface CartItem {
  slug: string;
  title: string;
  brand: string;
  price: number;
  color: string;
  qty: number;
  purchaseKind: PurchaseKind;
}

type CartState = { items: CartItem[] };

type Action =
  | { type: "add"; item: Omit<CartItem, "qty">; qty?: number }
  | { type: "remove"; slug: string; color: string; purchaseKind?: PurchaseKind }
  | { type: "setQty"; slug: string; color: string; qty: number; purchaseKind?: PurchaseKind }
  | { type: "clear" }
  | { type: "clearKind"; purchaseKind: PurchaseKind }
  | { type: "hydrate"; items: CartItem[] };

const STORAGE_KEY = "luma-cart-v2";

function matchesItem(
  item: CartItem,
  slug: string,
  color: string,
  purchaseKind?: PurchaseKind,
): boolean {
  if (item.slug !== slug || item.color !== color) return false;
  if (purchaseKind && item.purchaseKind !== purchaseKind) return false;
  return true;
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items.map(normalizeCartItem) };
    case "add": {
      const idx = state.items.findIndex(
        (i) =>
          i.slug === action.item.slug &&
          i.color === action.item.color &&
          i.purchaseKind === action.item.purchaseKind,
      );
      if (idx >= 0) {
        const items = [...state.items];
        items[idx] = { ...items[idx], qty: items[idx].qty + (action.qty ?? 1) };
        return { items };
      }
      return { items: [...state.items, { ...action.item, qty: action.qty ?? 1 }] };
    }
    case "remove":
      return {
        items: state.items.filter((i) => !matchesItem(i, action.slug, action.color, action.purchaseKind)),
      };
    case "setQty":
      return {
        items: state.items
          .map((i) =>
            matchesItem(i, action.slug, action.color, action.purchaseKind)
              ? { ...i, qty: Math.max(1, action.qty) }
              : i,
          )
          .filter((i) => i.qty > 0),
      };
    case "clearKind":
      return {
        items: state.items.filter(
          (i) => (i.purchaseKind ?? getPurchaseKindBySlugAndColor(i.slug, i.color)) !== action.purchaseKind,
        ),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  standardItems: CartItem[];
  preorderItems: CartItem[];
  count: number;
  total: number;
  standardTotal: number;
  preorderTotal: number;
  standardCount: number;
  preorderCount: number;
  isOpen: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, color: string, purchaseKind?: PurchaseKind) => void;
  setQty: (slug: string, color: string, qty: number, purchaseKind?: PurchaseKind) => void;
  clear: () => void;
  clearKind: (purchaseKind: PurchaseKind) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "hydrate", items: JSON.parse(raw) });
        return;
      }
      const legacyRaw = localStorage.getItem("luma-cart-v1");
      if (legacyRaw) {
        dispatch({ type: "hydrate", items: JSON.parse(legacyRaw) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const { standard: standardItems, preorder: preorderItems } = groupCartItems(state.items);
    const count = cartGroupCount(state.items);
    const total = cartGroupTotal(state.items);
    const standardTotal = cartGroupTotal(standardItems);
    const preorderTotal = cartGroupTotal(preorderItems);
    const standardCount = cartGroupCount(standardItems);
    const preorderCount = cartGroupCount(preorderItems);

    return {
      items: state.items,
      standardItems,
      preorderItems,
      count,
      total,
      standardTotal,
      preorderTotal,
      standardCount,
      preorderCount,
      isOpen,
      add: (item, qty) => {
        dispatch({ type: "add", item: normalizeCartItemInput(item), qty });
        sendAnalyticsEvent({
          type: "cart_add",
          productSlug: item.slug,
          productTitle: item.title,
          quantity: qty ?? 1,
        });
      },
      remove: (slug, color, purchaseKind) => dispatch({ type: "remove", slug, color, purchaseKind }),
      setQty: (slug, color, qty, purchaseKind) =>
        dispatch({ type: "setQty", slug, color, qty, purchaseKind }),
      clear: () => dispatch({ type: "clear" }),
      clearKind: (purchaseKind) => dispatch({ type: "clearKind", purchaseKind }),
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    };
  }, [isOpen, state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
