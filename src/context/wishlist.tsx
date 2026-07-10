"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { sendAnalyticsEvent } from "@/components/AnalyticsTracker";
import { canonicalizeProductSlugs } from "@/lib/product-slug-aliases";

const STORAGE_KEY = "sora-wishlist-v1";
const LEGACY_STORAGE_KEY = "luma-wishlist-v1";

interface WishlistValue {
  items: string[];
  count: number;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
}

const WishlistContext = createContext<WishlistValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<string[]>([]);
  const hydrated = useRef(false);
  const syncedForSession = useRef(false);

  // Гидрация из localStorage (гостевой режим / первый рендер).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
      // Однократная гидрация из localStorage при монтировании (внешний источник).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(canonicalizeProductSlugs(JSON.parse(raw)));
      if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    } catch {
      // ignore
    } finally {
      hydrated.current = true;
    }
  }, []);

  // Локальный кэш всегда поддерживаем в актуальном состоянии.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  // При входе: объединяем локальное избранное с аккаунтом, далее сервер — источник истины.
  useEffect(() => {
    if (status === "unauthenticated") {
      syncedForSession.current = false;
      return;
    }
    if (status !== "authenticated" || syncedForSession.current || !hydrated.current) {
      return;
    }
    syncedForSession.current = true;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slugs: items }),
        });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && Array.isArray(data.slugs)) setItems(data.slugs);
      } catch {
        // оффлайн — оставляем локальное состояние
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, items]);

  function persistRemote(next: string[]) {
    if (status !== "authenticated") return;
    fetch("/api/wishlist", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs: next }),
    }).catch(() => {
      // изменение уже в localStorage; синхронизируется при следующем заходе
    });
  }

  const value = useMemo<WishlistValue>(
    () => ({
      items,
      count: items.length,
      has: (slug) => items.includes(slug),
      toggle: (slug) =>
        setItems((prev) => {
          const isAdding = !prev.includes(slug);
          const next = prev.includes(slug)
            ? prev.filter((s) => s !== slug)
            : [...prev, slug];
          persistRemote(next);
          if (isAdding) {
            sendAnalyticsEvent({ type: "wishlist_add", productSlug: slug });
          }
          return next;
        }),
      remove: (slug) =>
        setItems((prev) => {
          const next = prev.filter((s) => s !== slug);
          persistRemote(next);
          return next;
        }),
    }),
    // persistRemote зависит только от status, поэтому пересоздаём при его смене
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, status],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}