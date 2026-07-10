import { brand } from "@/lib/config";
import { defaultLocale, type Locale } from "@/lib/i18n";
import SocialIcon from "@/components/SocialIcon";
import { translate } from "@/lib/messages";

const links = [
  { name: "instagram" as const, href: brand.social.instagram, label: "Instagram" },
  { name: "tiktok" as const, href: brand.social.tiktok, label: "TikTok" },
  { name: "facebook" as const, href: brand.social.facebook, label: "Facebook" },
  { name: "telegram" as const, href: brand.social.telegram, label: "Telegram" },
  { name: "whatsapp" as const, href: brand.social.whatsapp, label: "WhatsApp" },
].filter((s) => s.href.trim().length > 0);

export default function ConsultationBlock({ locale = defaultLocale }: { locale?: Locale }) {
  return (
    <section className="mt-16 border-t border-stone-200 pt-14 sm:mt-20 sm:pt-16">
      <h2 className="text-center text-base font-semibold uppercase tracking-[0.28em] text-stone-950 sm:text-lg md:text-xl">
        {translate(locale, "common.consultation")}
      </h2>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 sm:mt-12 sm:gap-x-16">
        {links.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="text-stone-950 transition hover:text-stone-500 [&_svg]:h-8 [&_svg]:w-8 sm:[&_svg]:h-10 sm:[&_svg]:w-10"
          >
            <SocialIcon name={s.name} />
          </a>
        ))}
      </div>
    </section>
  );
}