"use client";

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { brand } from "@/lib/config";
import { getStoreAddress, getStoreHours, getStoreName, primaryStore } from "@/lib/stores";
import { withLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/useI18n";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function IconTelegram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21.5 4.3 2.9 11.5c-1 .4-1 1.3 0 1.6l4.7 1.5 1.8 5.6c.2.6.6.7 1.1.3l2.6-2.1 4.9 3.6c.6.3 1 .2 1.2-.5l3.2-15c.2-.9-.4-1.3-1.4-.9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="m8 14 9.5-6.5L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.4c.2-.5.4-.5.6-.5h.5c.2 0 .4 0 .6.5l.6 1.4c0 .2.1.4 0 .5l-.4.6c-.1.2-.2.3 0 .6.3.5.8 1.1 1.4 1.5.5.4.7.4.9.3l.6-.4c.2-.2.4-.1.6 0l1.3.7c.2.1.4.2.4.4 0 .5-.2 1.3-.7 1.5-.5.3-1.2.5-2.6-.1-1.9-.8-3.2-2.7-3.6-3.4-.3-.6-.7-1.6-.2-2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconTiktok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.6 5.82a4.28 4.28 0 0 1-1.05-2.82h-3.1v12.4a2.5 2.5 0 1 1-1.78-2.39V9.83a5.62 5.62 0 1 0 4.88 5.57V9.01a7.3 7.3 0 0 0 4.27 1.37V7.28a4.27 4.27 0 0 1-3.22-1.46Z" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M6.5 4h2l1.3 3.4-1.6 1.2a11 11 0 0 0 4.9 4.9l1.2-1.6L17.6 13v2c0 .8-.7 1.5-1.5 1.5A11.7 11.7 0 0 1 5 5.5C5 4.7 5.7 4 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconPin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 21c4-4 6-7 6-10a6 6 0 1 0-12 0c0 3 2 6 6 10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PayVisa() {
  return (
    <span className="inline-flex h-7 w-11 items-center justify-center rounded-md border border-stone-200 bg-white">
      <span className="text-[13px] font-bold italic tracking-tight text-[#1a1f71]">VISA</span>
    </span>
  );
}

function PayMastercard() {
  return (
    <span className="inline-flex h-7 w-11 items-center justify-center rounded-md border border-stone-200 bg-white">
      <svg viewBox="0 0 36 22" className="h-4 w-auto" aria-hidden="true">
        <circle cx="14" cy="11" r="7" fill="#EB001B" />
        <circle cx="22" cy="11" r="7" fill="#F79E1B" fillOpacity="0.9" />
        <path d="M18 5.5a7 7 0 0 1 0 11 7 7 0 0 1 0-11Z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function PayApple() {
  return (
    <span className="inline-flex h-7 w-11 items-center justify-center gap-[2px] rounded-md border border-stone-200 bg-white">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-stone-900" fill="currentColor" aria-hidden="true">
        <path d="M16.4 12.6c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.4 2 1 0 1.3-.6 2.5-.6s1.5.6 2.5.6 1.7-1 2.3-2c.7-1 1-2 1-2-.1 0-2.2-.8-2.2-3.4ZM14.7 6c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-1 1.6-.8 2.5.9.1 1.8-.4 2.4-1.1Z" />
      </svg>
      <span className="text-[11px] font-medium text-stone-900">Pay</span>
    </span>
  );
}

const socials = [
  { label: "Instagram", href: brand.social.instagram, Icon: IconInstagram },
  { label: "Telegram", href: brand.social.telegram, Icon: IconTelegram },
  { label: "WhatsApp", href: brand.social.whatsapp, Icon: IconWhatsApp },
  { label: "TikTok", href: brand.social.tiktok, Icon: IconTiktok },
];

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-400">
      {children}
    </h4>
  );
}

function FooterLinks({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="space-y-2.5 text-sm leading-snug text-stone-600">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="transition-colors duration-150 hover:text-stone-950">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  const locale = useLocale();
  const t = useT();
  const brandText = {
    tagline: locale === "ru" ? brand.tagline : locale === "ro" ? "Genți și accesorii italiene din piele naturală" : "Italian bags and accessories in genuine leather",
  };
  const storeHours = getStoreHours(primaryStore, locale)[0];
  const storeAddress = getStoreAddress(primaryStore, locale);
  const storeName = getStoreName(primaryStore, locale);
  const catalog = [
    { href: "/new", label: t("nav.new") },
    { href: "/bags", label: t("nav.bags") },
    { href: "/accessories", label: t("nav.accessories") },
  ];
  const info = [
    { href: "/info/o-nas", label: t("nav.about") },
    { href: "/info/nashi-magaziny", label: t("nav.stores") },
    { href: "/info/garantiya", label: t("nav.warranty") },
    { href: "/info/materialy-i-uhod", label: t("nav.materialsCare") },
    { href: "/info/oplata-i-dostavka", label: t("nav.paymentDelivery") },
    { href: "/info/vozvrat", label: t("nav.returns") },
  ];
  const legal = [
    { href: "/info/politika-konfidentsialnosti", label: t("nav.privacy") },
    { href: "/info/rekvizity", label: t("nav.requisites") },
    { href: "/info/publichnaya-oferta", label: t("nav.offer") },
  ];
  const localizeLinks = (links: { href: string; label: string }[]) =>
    links.map((link) => ({ ...link, href: withLocalePath(link.href, locale) }));
  return (
    <footer id="site-footer" className="relative overflow-hidden border-t border-stone-200 bg-[#f7f5f3]">
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[28%] max-w-[320px] select-none opacity-[0.28] xl:block [mask-image:linear-gradient(to_left,black_42%,transparent_92%)]"
        >
          <Image
            src="/footer-bag-cognac.png"
            alt=""
            fill
            sizes="320px"
            className="object-contain object-right-bottom translate-x-6 translate-y-4 scale-[0.88]"
          />
        </div>

        <div className="relative z-10 mx-auto grid max-w-7xl gap-x-8 gap-y-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:py-14">
          <div className="md:col-span-2 lg:col-span-4">
            <span className="font-serif text-[1.65rem] tracking-[0.16em] text-stone-950 sm:text-3xl sm:tracking-[0.18em]">
              {brand.name}
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
              {brandText.tagline}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 bg-white/70 text-stone-500 transition-colors duration-150 hover:border-stone-400 hover:text-stone-900"
                >
                  <Icon className="h-[17px] w-[17px]" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <FooterHeading>{t("nav.catalog")}</FooterHeading>
            <FooterLinks links={localizeLinks(catalog)} />
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{t("nav.info")}</FooterHeading>
            <FooterLinks links={localizeLinks(info)} />
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>{t("nav.contacts")}</FooterHeading>
            <ul className="space-y-3 text-sm leading-snug text-stone-600">
              <li className="flex items-start gap-2.5">
                <IconPhone className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                <a
                  href={`tel:${primaryStore.phone.replace(/\s/g, "")}`}
                  className="transition-colors duration-150 hover:text-stone-950"
                >
                  {primaryStore.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                <a
                  href={`mailto:${primaryStore.email}`}
                  className="transition-colors duration-150 hover:text-stone-950"
                >
                  {primaryStore.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconClock className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                <span className="text-stone-500">{storeHours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-stone-400" />
                <Link
                  href={withLocalePath("/info/nashi-magaziny", locale)}
                  className="max-w-[16rem] text-stone-500 transition-colors duration-150 hover:text-stone-950"
                >
                  <span className="block font-medium text-stone-700">{storeName}</span>
                  <span className="mt-0.5 block">{storeAddress}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-stone-200/80">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-7">
          <p className="text-xs leading-relaxed text-stone-400 lg:max-w-[18rem] lg:shrink-0">
            © {new Date().getFullYear()} {brand.legalName}.{" "}
            {locale === "ru"
              ? "Все права защищены."
              : locale === "ro"
                ? "Toate drepturile rezervate."
                : "All rights reserved."}
          </p>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-stone-400 lg:flex-1 lg:justify-center">
            {localizeLinks(legal).map((link, index) => (
              <span key={link.href} className="flex items-center gap-4">
                {index > 0 ? <span className="hidden text-stone-300 sm:inline" aria-hidden="true">|</span> : null}
                <Link href={link.href} className="transition-colors duration-150 hover:text-stone-700">
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2 lg:justify-end">
            <PayVisa />
            <PayMastercard />
            <PayApple />
          </div>
        </div>
      </div>
    </footer>
  );
}
