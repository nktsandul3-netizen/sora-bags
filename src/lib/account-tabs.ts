export type AccountTab = "console" | "orders" | "wishlist" | "addresses" | "profile";

export const ACCOUNT_TABS: { id: AccountTab; label: string; menuLabel: string }[] = [
  { id: "console", label: "Консоль", menuLabel: "Консоль" },
  { id: "orders", label: "Заказы", menuLabel: "Заказы" },
  { id: "wishlist", label: "Избранное", menuLabel: "Избранное" },
  { id: "addresses", label: "Адреса", menuLabel: "Адреса" },
  { id: "profile", label: "Личные данные", menuLabel: "Личные данные" },
];

export function parseAccountTab(value: string | undefined): AccountTab {
  if (value && ACCOUNT_TABS.some((t) => t.id === value)) {
    return value as AccountTab;
  }
  return "console";
}

export function accountTabHref(tab: AccountTab): string {
  return tab === "console" ? "/account" : `/account?tab=${tab}`;
}