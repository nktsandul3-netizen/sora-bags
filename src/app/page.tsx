import Link from "next/link";
import Image from "next/image";
import { brand } from "@/lib/config";
import { newProducts } from "@/lib/data";
import HomeNewArrivals from "@/components/HomeNewArrivals";
import SocialIcon from "@/components/SocialIcon";

const heroTiles: {
  name: string;
  href: string;
  img: string;
  video?: string;
}[] = [
  { name: "Новинки", href: "/new", img: "/tile-new-orange-arch.png" },
  { name: "Сумки", href: "/bags", img: "/tile-bags-2.jpg" },
  {
    name: "Аксессуары",
    href: "/accessories",
    img: "/tile-accessories.png",
    video: "/tile-accessories.mp4",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-stone-100">
        <Image
          src="/hero-amalfi-street-hq.jpg"
          alt={brand.name}
          width={2400}
          height={1600}
          priority
          quality={100}
          sizes="100vw"
          className="h-auto w-full object-contain [filter:saturate(0.96)_contrast(1.01)]"
        />
      </section>

      {/* Тонкий разделитель между баннером и блоками */}
      <div className="mx-auto mt-[calc(1.5rem-1cm)] h-px w-full max-w-7xl bg-stone-200 sm:mt-[calc(2rem-1cm)]" />

      {/* Плитки разделов: Новинки / Сумки / Аксессуары */}
      <section className="mt-[1.5rem] w-full sm:mt-[2rem]">
        <div className="grid gap-0 md:grid-cols-3">
          {heroTiles.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group relative flex h-[78vh] min-h-[520px] items-center justify-center overflow-hidden md:h-[92vh] md:min-h-[680px]"
            >
              {t.video ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={t.img}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 [filter:saturate(0.82)_contrast(1.01)]"
                >
                  <source src={t.video} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={t.img}
                  alt={t.name}
                  width={1024}
                  height={1280}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  quality={90}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 [filter:saturate(0.82)_contrast(1.01)]"
                />
              )}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/35 group-focus-visible:bg-black/35" />
              <div className="relative flex flex-col items-center gap-5 text-white opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 max-md:opacity-100 max-md:translate-y-0">
                <span className="font-serif text-2xl font-normal uppercase tracking-[0.14em] drop-shadow-sm sm:text-3xl sm:leading-none">
                  {t.name}
                </span>
                <span className="border border-white px-8 py-2.5 text-[10px] font-normal uppercase tracking-[0.28em] transition group-hover:bg-white/10 group-focus-visible:bg-white/10">
                  Смотреть
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Новинки */}
      <HomeNewArrivals products={newProducts.slice(0, 8)} />

      {/* Соцсети / мессенджеры */}
      <section className="relative flex min-h-[calc(360px+6cm)] w-full items-center justify-center overflow-hidden sm:min-h-[calc(460px+6cm)]">
        <Image
          src="/social.jpg"
          alt={`${brand.name} в соцсетях`}
          width={1024}
          height={485}
          sizes="100vw"
          quality={90}
          className="absolute inset-0 h-full w-full object-cover [filter:saturate(0.82)_contrast(1.01)]"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative flex flex-col items-center px-4 text-center text-white">
          <h2 className="font-serif text-3xl tracking-wide drop-shadow sm:text-4xl">
            Наши мессенджеры
          </h2>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/85">
            Подписывайтесь
          </p>
          <div className="mt-6 flex items-center gap-4">
            {[
              { name: "whatsapp" as const, href: brand.social.whatsapp, label: "WhatsApp" },
              { name: "telegram" as const, href: brand.social.telegram, label: "Telegram" },
              { name: "facebook" as const, href: brand.social.facebook, label: "Facebook" },
              { name: "tiktok" as const, href: brand.social.tiktok, label: "TikTok" },
            ].map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 text-white backdrop-blur-[1px] transition hover:bg-white hover:text-stone-950"
              >
                <SocialIcon name={s.name} />
              </a>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
