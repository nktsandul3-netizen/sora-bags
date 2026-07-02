"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type MenuOpenContextValue = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const MenuOpenContext = createContext<MenuOpenContextValue | null>(null);

export function MenuOpenProvider({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <MenuOpenContext.Provider value={{ menuOpen, setMenuOpen }}>
      {children}
    </MenuOpenContext.Provider>
  );
}

export function useMenuOpen() {
  const ctx = useContext(MenuOpenContext);
  if (!ctx) {
    throw new Error("useMenuOpen must be used within MenuOpenProvider");
  }
  return ctx;
}
