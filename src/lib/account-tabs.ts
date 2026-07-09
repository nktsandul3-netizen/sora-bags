export type AccountTab = "console" | "orders" | "wishlist" | "addresses" | "profile";

export const ACCOUNT_TABS: { id: AccountTab; label: string; menuLabel: string }[] = [
  { id: "console", label: "Личный кабинет", menuLabel: "Личный кабинет" },
  { id: "orders", label: "Мои заказы", menuLabel: "Мои заказы" },
  { id: "wishlist", label: "Избранное", menuLabel: "Избранное" },
  { id: "addresses", label: "Мои адреса", menuLabel: "Мои адреса" },
  { id: "profile", label: "Профиль", menuLabel: "Профиль" },
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