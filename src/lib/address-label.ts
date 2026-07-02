import { defaultLocale, type Locale } from "@/lib/i18n";
import { translate } from "@/lib/messages";

export interface AddressLabelPreset {
  // Stable value that is persisted to the database. Kept as the canonical
  // Russian string so existing saved addresses stay consistent without a migration.
  value: string;
  // Translation key used to render the localized display label.
  key: string;
}

export const addressLabelPresets: AddressLabelPreset[] = [
  { value: "Дом", key: "account.addressLabelHome" },
  { value: "Офис", key: "account.addressLabelOffice" },
  { value: "Работа", key: "account.addressLabelWork" },
];

// Maps known stored values (in any locale that might already exist in the data)
// to a translation key so the display can be localized at render time.
const knownLabelKeys: Record<string, string> = {
  "дом": "account.addressLabelHome",
  "home": "account.addressLabelHome",
  "acasă": "account.addressLabelHome",
  "acasa": "account.addressLabelHome",
  "офис": "account.addressLabelOffice",
  "office": "account.addressLabelOffice",
  "birou": "account.addressLabelOffice",
  "работа": "account.addressLabelWork",
  "work": "account.addressLabelWork",
  "serviciu": "account.addressLabelWork",
};

// Renders the localized display label for a stored address label. Recognized
// preset values are translated; truly custom labels fall back to the raw value.
export function getAddressLabelDisplay(label: string | undefined, locale: Locale = defaultLocale): string {
  const trimmed = (label ?? "").trim();
  if (!trimmed) return trimmed;
  const key = knownLabelKeys[trimmed.toLowerCase()];
  return key ? translate(locale, key) : trimmed;
}

// Localized preset choices for the address form. Each option saves a stable
// value while showing the user a translated label.
export function getAddressLabelOptions(locale: Locale = defaultLocale) {
  return addressLabelPresets.map((preset) => ({
    value: preset.value,
    label: translate(locale, preset.key),
  }));
}
