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

export interface CartItem {
  slug: string;
  title: string;
  brand: string;
  price: number;
  color: string;
  qty: number;
}

type CartState = { items: CartItem[] };

type Action =
  | { type: "add"; item: Omit<CartItem, "qty">; qty?: number }
  | { type: "remove"; slug: string; color: string }
  | { type: "setQty"; slug: string; color: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

const STORAGE_KEY = "luma-cart-v1";

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const idx = state.items.findIndex(
        (i) => i.slug === action.item.slug && i.color === action.item.color,
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
        items: state.items.filter(
          (i) => !(i.slug === action.slug && i.color === action.color),
        ),
      };
    case "setQty":
      return {
        items: state.items
          .map((i) =>
            i.slug === action.slug && i.color === action.color
              ? { ...i, qty: Math.max(1, action.qty) }
              : i,
          )
          .filter((i) => i.qty > 0),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (slug: string, color: string) => void;
  setQty: (slug: string, color: string, qty: number) => void;
  clear: () => void;
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
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
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
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const total = state.items.reduce((s, i) => s + i.qty * i.price, 0);
    return {
      items: state.items,
      count,
      total,
      isOpen,
      add: (item, qty) => {
        dispatch({ type: "add", item, qty });
        sendAnalyticsEvent({
          type: "cart_add",
          productSlug: item.slug,
          productTitle: item.title,
          quantity: qty ?? 1,
        });
      },
      remove: (slug, color) => dispatch({ type: "remove", slug, color }),
      setQty: (slug, color, qty) => dispatch({ type: "setQty", slug, color, qty }),
      clear: () => dispatch({ type: "clear" }),
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